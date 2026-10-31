---
run: 2026-10-31-C004
stage: create-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T19:55:00+01:00
proposal_ref: spec/proposals/2026-10-31-c-approved.md
---

## Blueprints generated

- fuji.md — new: the Fuji visibility estimate (viewpoints, Open-Meteo request, scoring, caching/offline, one `FujiWidget` on the homepage and Tools page).
- integrations.md — rewritten: browser requests allowed to an allow-list of two free hosts (Frankfurter, Open-Meteo) exposing only generic request data; live yen rate with cache and build-time fallback.
- homepage.md — rewritten: new module order (clock + yen row, checklist section with Preflight | Flight control, Fuji), visibility per state, yen headline and JPY → EUR table only, yen visible after the trip.
- architecture.md — updated: runtime boundary now includes the two allow-listed data hosts; data-flow diagram extended.
- data-model.md — updated: real itinerary noted; new localStorage keys `sgj:rate:v1` and `sgj:fuji:v1`.
- deployment.md — updated: CSP `connect-src` lists exactly the two hosts; daily rebuild kept as fallback refresh.
- performance.md — updated: runtime data requests limited and cached instead of forbidden.
- frontend.md — updated: `/tools` shows the Fuji tool; new components `Checklist`, `YenWidget`, `FujiWidget`; data-fetching rules.
- prerequisite.md — updated: Frankfurter and Open-Meteo chosen; itinerary received.
- content-engine.md, design.md — unchanged; still current.

## Key decisions captured

- Allow-list of exactly two hosts, enforced by CSP `connect-src`; requests use `credentials: "omit"` and `referrerPolicy: "no-referrer"`.
- Yen rate: browser fetch cached 6 h; shown rate is the newest of live, cache and build-time.
- Fuji: one Open-Meteo request for summit + three viewpoints (Tokyo, Kawaguchiko, Hakone); clear-hour scoring on low/mid cloud and visibility, 06:00–16:00; Good ≥ 3 clear hours, Maybe 1–2, Unlikely 0; cache 60 min, shown offline up to 24 h.
- Fuji widget hidden on the homepage after the trip, always shown on `/tools`.
- Preflight shown only pre-trip; flight checklist pre-trip and in transit; checklist section removed when neither applies.

## Deferred to implementation

- Calibrating the Fuji thresholds against a few past days (constants block in the scoring module).
- Exact visual treatment of the Fuji verdict rows, within `design.md`.
