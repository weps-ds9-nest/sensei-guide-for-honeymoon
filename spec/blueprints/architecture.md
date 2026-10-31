# Architecture

_Purpose: define the system topology, the build-time and run-time boundaries, and the data flow for Susi Ghiso Japan._

## System topology

- The product is a **static single-page site**. The build produces files in `dist/`; those files are served by Vercel.
- There is **no server code**: no API routes, no serverless functions, no database, no CMS.
- The **browser** is the only runtime. It reads the built files, the travellers' own local state, and two allow-listed free data APIs (see `integrations.md`).

## Build-time inputs

All of these are read once, during `npm run build`:

| Input | Location | Purpose |
|---|---|---|
| Guide, route, tool and shop entries | `content/guides/`, `content/suggestions/`, `content/tools/`, `content/shop/` (Markdown) | Page content (see `content-engine.md`) |
| Itinerary | `content/itinerary.json` | Drives the homepage and, in phase 2, events (see `data-model.md`) |
| Checklists | `content/checklists.json` | Preflight and flight to-do items (see `homepage.md`) |
| Daily exchange rate | fetched during build from Frankfurter (see `integrations.md`) | Yen widget fallback |
| Last known rate | `content/rates.last.json`, committed | Fallback when the fetch fails |

The build writes generated modules under `src/generated/`. Generated files are never edited by hand.

## Run-time boundaries

- **Runtime network calls** go only to the site's own origin and to the two allow-listed data hosts, `api.frankfurter.dev` (yen rate) and `api.open-meteo.com` (Fuji forecast). These requests expose only generic request data such as the IP address (R17).
- **Local state only.** The browser stores checklist ticks and cached rate and forecast responses in `localStorage` (see `data-model.md`). Nothing is sent back.
- **Time zones.** All date logic that decides what the travellers see uses **Asia/Tokyo**. The Rome clock uses **Europe/Rome** for display only.

## Phase gating

- **Phases 1–2:** the site is public at its URL. Crawlers are asked to stay away (see `deployment.md`). Content is not encrypted.
- **Phases 3–4:** a passphrase gate is added. Content is encrypted at build and decrypted in the browser after the passphrase is entered. The gate design is written as a blueprint update in phase 3.
- **Known gap until phases 3–4:** anyone who knows the URL can read the content. Crawler blocking is the only protection in this window. This is accepted.

## Data flow

```
content/*.md ─┐
content/*.json─┼─► build (validate, render, fetch rate) ─► dist/ (static files)
rates fetch ──┘                                              │
                                                             ▼
                                              Vercel (static hosting)
                                                             │
                                                             ▼
                              browser: render pages, compute Japan-date state,
                              store checklist ticks and cached data in localStorage
                                                             │
                                          GET (no cookies, no referrer)
                                                             ▼
                                   api.frankfurter.dev · api.open-meteo.com
```

## Acceptance criteria

- [ ] `npm run build` produces a `dist/` folder with no server code.
- [ ] The built site makes no network requests except to its own origin and the two allow-listed data hosts (verified in the browser network panel).
- [ ] No database, CMS, analytics or paid API appears in `package.json` or in the built output.
- [ ] Changing `content/itinerary.json` changes the homepage after a rebuild, with no code edit.
