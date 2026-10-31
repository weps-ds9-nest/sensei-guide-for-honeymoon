import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { RouterProvider } from "@/lib/router";
import "@/styles/theme.css";
import "@/styles/content.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
);

// Offline cache (blueprint: performance.md). Production builds over HTTPS only.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
