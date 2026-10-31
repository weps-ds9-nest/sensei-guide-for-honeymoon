---
run: 2026-10-31-C006
stage: create-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T20:05:00+01:00
proposal_ref: spec/proposals/2026-10-31-d-approved.md
---

## Blueprints generated

- fuji.md — updated: seven viewpoints (adds Mount Takao summit, Mount Mitake, Kamakura beaches & Enoshima, Shizuoka) with coordinates, visibility thresholds and display order; one request for eight points.
- data-model.md — updated: the `sgj:fuji:v1` example lists all eight point ids.
- All other blueprints — unchanged; still current against approval d.

## Key decisions captured

- Kamakura and Enoshima share one row at Shichirigahama (same forecast cell).
- Shizuoka is represented by the Nihondaira plateau above Miho no Matsubara.
- Visibility thresholds scale with distance from Fuji: 10 km (Hakone, Kawaguchiko), 15 km (Takao, Shizuoka), 20 km (Tokyo, Mitake, Kamakura).

## Deferred to implementation

- Threshold calibration against past days, as before.
