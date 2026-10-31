# Deployment

_Purpose: define the hosting setup, the headers that keep the site out of search engines and protect the travellers' browsers, and how a deploy is run._

## Platform

Platform: Vercel

- A **static project** on Vercel. No serverless functions are used.
- Build command: `npm run build`. Output directory: `dist`.
- The project name is a random, non-descriptive slug, so the default `*.vercel.app` address is hard to guess. No custom domain in phases 1–2.
- Only **production** deployments are shared. Preview deployment URLs are never shared with the travellers.

## Deploy

- A deploy is run with `vercel --prod` from `implementation/[repo-name]/` (Mode C).
- The Vercel CLI must be installed and logged in on the developer's machine (see `prerequisite.md`).

## Daily rate refresh

- The browser fetches the live rate (see `integrations.md`); the daily rebuild keeps the build-time fallback recent.
- A scheduled trigger on Vercel's free scheduler starts a production rebuild once a day. The trigger calls the project's deploy hook.
- The exact mechanism (cron entry, deploy hook URL) is confirmed during implementation and must be free on the current plan.

## Crawler and bot protection

Applied in three places, so no single layer is relied on:

1. **`public/robots.txt`:**
   ```
   User-agent: *
   Disallow: /
   ```
2. **Page metadata** in `index.html`: `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`.
3. **HTTP headers** in `vercel.json` (below).

## HTTP headers and rewrites (`vercel.json`)

Applied to every path:
- `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex`
- `Referrer-Policy: no-referrer`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy`: camera, microphone, geolocation and interest-cohort all disabled.
- `Content-Security-Policy`: `default-src 'self'`; scripts from `'self'` only; styles from `'self'` and `'unsafe-inline'`; images from `'self'` and `data:`; `connect-src 'self' https://api.frankfurter.dev https://api.open-meteo.com` (exactly the allow-list in `integrations.md`); `frame-ancestors 'none'`; `base-uri 'none'`; `form-action 'none'`.

Cache headers are set as described in `performance.md`.

Rewrites: any path that is not an asset, media file, `robots.txt`, `sw.js`, or the favicon is served `index.html`, so the single-page routes load directly.

## Environment variables

- **Phases 1–2:** none are required.
- **Phase 3–4:** the passphrase is added as a Vercel environment variable (see `prerequisite.md`).

## Acceptance criteria

- [ ] `https://[site]/robots.txt` returns the disallow-all rule.
- [ ] Every response carries the `X-Robots-Tag` and `Referrer-Policy` headers (checked in browser developer tools).
- [ ] The page's HTML contains the robots meta tag.
- [ ] The `Content-Security-Policy` header's `connect-src` lists exactly `'self'`, `https://api.frankfurter.dev` and `https://api.open-meteo.com`.
- [ ] A direct visit to `/suggestions/tokyo-first-days` loads the page, not a 404.
- [ ] A production deploy runs with `vercel --prod` and is logged in the implementation log.
