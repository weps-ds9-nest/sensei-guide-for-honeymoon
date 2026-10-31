---
run: 2026-10-31-C003
stage: implement-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T22:30:00+01:00
repo_scaffolded: true
---

## What was implemented

- App scaffolded at `implementation/susi-ghiso-japan/`, with its own README and `.npmrc` (`registry=https://registry.npmjs.org/`), which moved from `implementation/`.
- Vite, React, TypeScript, Tailwind and shadcn-style components (`button`, `card`) written to the shadcn structure. The shadcn CLI was not run.
- Content engine (`scripts/build-content.mjs`): reads `content/`, validates, renders Markdown, writes `src/generated/`. `--check` mode for `npm run content:check`.
- Daily yen rate (`scripts/fetch-rates.mjs`): fetched from Frankfurter (free, no key, ECB reference rates) on `predev` and `prebuild`. Falls back to `content/rates.last.json` marked `stale`.
- Routes: `/`, `/guides`, `/guides/:slug`, `/tools`, `/suggestions`, `/suggestions/:slug`, `/shop`, not-found.
- Navigation: top bar on desktop, fixed bottom bar on mobile with home centred. Home inactive on `/`.
- Homepage: preflight checklist (tick and untick, saved on the device), clock for Japan and Rome, flight checklist (pre-trip and in-transit), yen widget (visible in all states, after-trip is a placeholder pending the user's answer).
- Journey state from `content/itinerary.json` on Japan time. The file is absent for now, so the state is `pre-trip`.
- Example content: two guides, one route (three stops), starter preflight and flight lists for the user to edit. Tools and Shop are empty.
- `new-guide` skill with `guide.md` and `route.md` templates in `.claude/skills/new-guide/`.
- Performance and privacy: `robots.txt` disallow-all, robots meta, `vercel.json` headers (X-Robots-Tag, CSP, Referrer-Policy and others), service worker with network-first shell and cache-first assets, HTTP cache headers.
- Project `.gitignore` gained `**/src/generated/`.

## Blueprint → implementation mapping

- `architecture.md` §Build-time inputs → `scripts/build-content.mjs`, `scripts/fetch-rates.mjs`, `src/generated/`
- `architecture.md` §Run-time boundaries → `src/lib/checks.ts` (localStorage only), `src/lib/journey.ts` (Asia/Tokyo)
- `frontend.md` §Routes → `src/App.tsx`, `src/pages/Sections.tsx`, `src/lib/router.tsx`
- `frontend.md` §Navigation → `src/components/SiteNav.tsx`
- `homepage.md` §Modules and §Visibility → `src/pages/Home.tsx`, `src/lib/journey.ts`
- `homepage.md` §Clock → `src/components/Clock.tsx`
- `homepage.md` §Preflight and flight checklists → `src/components/Checklist.tsx`, `content/checklists.json`
- `homepage.md` §Yen widget → `src/components/YenWidget.tsx`, `src/lib/rates.ts`
- `content-engine.md` → `scripts/build-content.mjs`, `content/`, `.claude/skills/new-guide/`
- `data-model.md` §1–§4 → `content/itinerary.json` (absent), `content/checklists.json`, `src/generated/rates.json`, `localStorage["sgj:checks:v1"]`
- `integrations.md` → `scripts/fetch-rates.mjs`, `content/rates.last.json`
- `performance.md` → `public/sw.js`, `src/main.tsx` (registration), `vercel.json`
- `design.md` → `src/styles/theme.css` (one-file tokens), `src/styles/content.css`
- `deployment.md` → `vercel.json`, `public/robots.txt`, `index.html` meta robots
- `prerequisite.md` → no credentials needed; registry unchanged

## What was not implemented (and why)

- **Events section (phase 2):** not built, per the blueprint.
- **Passphrase gate (phase 3–4):** not built, per the approved proposal.
- **Hotel cards and Fuji tool:** later iteration, per the approved proposal.
- **Itinerary-driven states beyond pre-trip:** the code exists, but no `itinerary.json` was supplied, so only the pre-trip path has run.
- **Trip-end yen widget:** shown as a placeholder until the user answers.
- **Deployment:** not run. This is Mode C.

## Verification

- `npm run content:check`: passes.
- `npm run rates`: fetched 0.0056922 EUR per JPY, rate date 2026-10-30.
- `tsc --noEmit`: passes.
- `vite build`: passes. Output: app 48 KB, vendor 219 KB (68 KB gzipped).
- Browser checks against the preview build (Chrome, Playwright): 24 of 24 pass. They cover ticks surviving reloads, desktop and mobile navigation, the route stop count, tools empty state, no horizontal scroll at 390 px, the service worker, offline reload, same-origin requests only, and no console errors.

## Recommended next step

Edit `content/checklists.json` to match your real lists, then run `npm run dev` from `implementation/susi-ghiso-japan/` and review the homepage on a phone. Send the itinerary JSON when ready, then check the in-transit and in-japan states.
