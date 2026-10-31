# Performance and caching

_Purpose: keep the data the travellers download as low as possible, and reuse what they already have. They are on e-SIM data. No numeric budget is set; the rules below are the target._

## Rules

1. **No runtime third-party requests** (see `integrations.md`).
2. **System fonts only.** No web fonts are downloaded.
3. **Minimal JavaScript.** One vendor chunk (React and DOM) and one application chunk. Icons come only from individually imported icons, never a full icon set.
4. **Images are small and lazy.**
   - WebP, at most 1600 px wide, at most 400 KB (see `content-engine.md`).
   - Every image has `loading="lazy"` and `decoding="async"`, except the one above the fold on the homepage and on a detail page.
   - Every image has an explicit aspect ratio so the layout does not shift as images load.
5. **Content is built in.** Text, route data, itinerary and checklists ship inside the app bundle. Opening a page never needs a second request for data.

## Caching

**HTTP caching (set in `vercel.json`, see `deployment.md`):**
- `/assets/*` (hashed build files): cached for one year, marked immutable.
- `/media/*` (photos): cached for seven days.
- `/`, `/index.html`, `/sw.js`, `/content*` and `/rates*`: revalidated on every request, so a new build reaches the travellers.

**Service worker (`public/sw.js`):**
- **App shell** (the HTML page): network first, falling back to the cached copy when offline.
- **Hashed build files and photos:** cache first. A file is downloaded once and reused.
- The service worker is registered only in production builds, and only on HTTPS.
- Each new build renames the cache version, so old caches are removed on activation.

**Result for the travellers:** the first visit downloads the app. Repeat visits download only what changed, and the app opens offline once it has been visited.

## Measurement

- Before the trip, the site is checked once in a browser: first load and repeat-visit transfer sizes are recorded in the implementation log.
- No target is set. The recorded numbers are the baseline for later decisions.

## Acceptance criteria

- [ ] No web-font file is requested by the built site.
- [ ] A repeat visit on the same browser downloads no hashed build files again.
- [ ] Images below the first screen carry `loading="lazy"`.
- [ ] With the network disabled after a visit, the homepage and the visited guide still render.
- [ ] First-load and repeat-visit transfer sizes are recorded in the implementation log.
