---
run: 2026-10-31-C008
stage: create-specs
status: success
triggered_by: manual
timestamp: 2026-10-31T20:20:00+01:00
proposal_ref: spec/proposals/2026-10-31-e-approved.md
---

## Blueprints generated

- fuji.md — updated: saved-forecast validity requires a matching point list; new "Verdict icons" section (three inline SVGs, decorative, theme tokens); phone row layout; three new acceptance criteria.
- design.md — updated: the four `--fuji-*` illustration tokens are part of the one-file visual system.
- All other blueprints — unchanged; still current against approval e.

## Key decisions captured

- Cache validity: `points` must equal the current ids in order; otherwise refetch.
- Icons are inline SVG, `aria-hidden`, ~32 × 24 px, coloured only from theme tokens; the sun reuses the accent.
- Fuji rows stack name above the two days below 640px.

## Deferred to implementation

- Fuji threshold calibration against past days, as before.
