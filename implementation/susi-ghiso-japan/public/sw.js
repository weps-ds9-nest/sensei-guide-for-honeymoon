// Service worker (blueprint: performance.md). Versioned cache name: bump on breaking changes.
// - App shell: network first, cached copy when offline.
// - Hashed build files and photos: cache first.
const CACHE = "japan-v1";
const SHELL = ["/", "/index.html", "/favicon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function remember(request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((c) => c.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const immutable = url.pathname.startsWith("/assets/") || url.pathname.startsWith("/media/");
  if (immutable) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((r) => remember(request, r))));
    return;
  }

  event.respondWith(
    fetch(request)
      .then((r) => remember(request, r))
      .catch(() => caches.match(request).then((hit) => hit || (request.mode === "navigate" ? caches.match("/index.html") : undefined))),
  );
});
