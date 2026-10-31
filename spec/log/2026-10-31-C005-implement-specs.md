---
run: 2026-10-31-C005
stage: implement-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T20:10:00+01:00
repo_scaffolded: false
---

## What was implemented

- CSP `connect-src` now allows exactly `https://api.frankfurter.dev` and `https://api.open-meteo.com`.
- Live yen rate: `useRate()` reads the `sgj:rate:v1` cache, refetches from Frankfurter when older than 6 hours (no credentials, no referrer), and shows the newest of live, cache and build-time rate. `YenWidget` uses it.
- Fuji tool: `src/lib/fuji.ts` (viewpoints and thresholds in one constants block, one Open-Meteo request for summit + 3 viewpoints, clear-hour scoring 06:00–16:00, Good/Maybe/Unlikely, best-hours range, 60-minute cache, "Last saved forecast" up to 24 hours, offline message) and `src/components/FujiWidget.tsx`.
- `FujiWidget` placed after the checklists on the homepage (hidden after the trip) and at the top of `/tools` ("Coming soon." no longer shows there).
- Homepage items already implemented earlier this session and now matching the blueprint: clock + yen row, merged checklist section with Preflight | Flight control, preflight only pre-trip, yen headline and JPY → EUR table only, itinerary days.
- README Stack and Project Structure refreshed.

## Blueprint → implementation mapping

- deployment.md §HTTP headers → implementation/susi-ghiso-japan/vercel.json
- integrations.md §Daily yen exchange rate, data-model.md §4b → src/lib/rates.ts, src/components/YenWidget.tsx
- fuji.md (all), data-model.md §4c → src/lib/fuji.ts, src/components/FujiWidget.tsx
- homepage.md §Modules, §Visibility per state → src/pages/Home.tsx, src/components/Checklist.tsx
- frontend.md §Routes (/tools) → src/pages/Sections.tsx

## Verification

- `tsc --noEmit` and `npm run build` pass (JS 18.5 kB + 68.3 kB vendor gzipped).
- Scoring checked on synthetic data: cloudy summit → Unlikely at every viewpoint; 4 clear morning hours → Good "07:00–11:00"; 1 clear hour → Maybe; viewpoint below its visibility threshold → Unlikely.
- One live Open-Meteo request confirmed the multi-point response shape (array of 4) and produced verdicts; max visibility in the response was 75 km, so the 20 km Tokyo threshold is reachable.
- Not verified: rendering in a browser, and the CSP header on a Vercel deployment (headers only apply once deployed).

## What was not implemented (and why)

- Calibration of the Fuji thresholds against past days: deferred to implementation follow-up per blueprint; current values are the blueprint's starting values.
- Flight times in the itinerary: awaiting the user.

## Recommended next step

Open the site with `npm run dev`, check the Fuji card and yen widget on the homepage and `/tools`, then deploy with `/deploy` and confirm the CSP header in the browser.
