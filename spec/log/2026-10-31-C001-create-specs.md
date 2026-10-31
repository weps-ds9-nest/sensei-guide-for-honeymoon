---
run: 2026-10-31-C001
stage: create-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T20:00:00+01:00
proposal_ref: spec/proposals/2026-10-31-approved.md
---

## Blueprints generated

- `architecture.md` — static-site topology, build-time vs. run-time boundaries, phase gating, and the data flow.
- `frontend.md` — stack, the seven routes, top bar (desktop) and bottom bar (mobile) with home centred, layout, components.
- `homepage.md` — homepage module order, Japan-date state (pre-trip, in-transit, in-japan, after-trip), visibility per state, clock, yen widget rules.
- `content-engine.md` — Markdown folders and frontmatter, body conventions (route stops), build validation, image rules, the guide-authoring skill.
- `data-model.md` — itinerary JSON (provisional), checklists JSON, exchange-rate output, localStorage state, content shape.
- `integrations.md` — rules for any outside source; build-time daily exchange rate; later Fuji and hotel tools; excluded services.
- `performance.md` — no runtime third-party calls, system fonts, lazy images, built-in content, HTTP and service-worker caching.
- `design.md` — placeholder design status, one-file visual system (`src/styles/theme.css`), modes, iteration speed, accessibility.
- `deployment.md` — Vercel static project, crawler and bot protection in three layers, security headers, daily rebuild for the rate, deploy command.
- `prerequisite.md` — Vercel account and CLI login, exchange-rate source, itinerary file, deferred passphrase, Credentials Registry (no values), readiness checklist.

## Key decisions captured

- Static site on Vercel with no server code, no database and no CMS.
- Routing uses a small history-API router, not a routing library.
- Top bar on desktop (home first, then Guides, Tools, Suggestions, Shop). Fixed bottom bar on mobile in the order Guides, Tools, Home, Suggestions, Shop.
- Homepage module order: preflight to-do, clock, flight checklist, yen widget, events (phase 2).
- Japan-time state machine from the single itinerary file: pre-trip, in-transit, in-japan, after-trip. Modules are removed when hidden.
- Yen rate fetched during build from a free source with no key; committed fallback with a `stale` flag; daily rebuild by a free scheduled trigger.
- Checklist ticks kept in `localStorage` only.
- Markdown compiled at build; `##` headings are numbered stops on suggestion routes; images WebP, at most 400 KB, at most 1600 px wide.
- Visual look changed only through `src/styles/theme.css`; neutral placeholder values.
- Three crawler layers: `robots.txt`, meta robots tag, and `X-Robots-Tag` header.
- Project name on Vercel is a random slug; only production deploys are shared.

## Deferred to implementation

- The exact free exchange-rate source (must meet `integrations.md` rules).
- The scheduled-rebuild mechanism on Vercel (must be free on the current plan).
- The itinerary JSON format is provisional and is replaced by the user's file when it arrives.
- The shadcn style (set later through `theme.css`).
- Measurement targets: baseline transfer sizes are recorded, not capped.
- The passphrase gate design (phase 3–4 blueprint update).
- Whether the yen widget stays visible in Japan (approved requirement R8 says hidden after landing; flagged for the user).
- Phase-2 events layout (phase 2).
