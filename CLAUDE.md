# Project: Susi Ghiso Japan

## What This Project Is

This is a small React single-page guide my friends can use while in Japan on their honeymoon, in which I include my knowledge and suggestions. There are no limits besides this being a small project I need to set up within the next 4 hours, and it's going on Vercel with a simple login page (if necessary). The explicit limit I want to put is that it shouldn't be traceable by any crawler or any bot. It should be as private as possible.

## Lifecycle State

Implementation

<!-- Valid states: Brainstorm | Proposal | Spec Review | Implementation | Deployed | Paused | Done -->
<!-- Auto-transitions: /generate-proposal → Proposal | /create-specs → Spec Review | /implement-specs → Implementation | /deploy (confirmed success) → Deployed -->
<!-- Loop-back: Spec Review → Proposal (via /generate-proposal, if rework is needed before implementation) -->
<!-- Paused / Done are settable from any state and override the flow above -->

## Status

Building

<!-- Only meaningful when Lifecycle State is Implementation (Building | Refinement) or Deployed (Stable | Refinement) -->
<!-- Refinement = a spec change was accepted after this phase started; returns to Building/Stable on the next /implement-specs or /deploy run -->

## Active Agents

- Evolution agent — active
- Creation agent — inactive

## Current Spec

See `spec/current-state.md` for the latest synthesis.
Last version: v0 — no version checkpoint yet (project created 2026-10-31)

## Agent Rules

_No project-specific rules yet. Add constraints here as they emerge — e.g., "don't propose a version until X is resolved", "creation agent may only touch src/feature-x/"._

## Blocked On

_Nothing yet. Add blockers here that require human input before agents can proceed._

## Quick Reference

_App root: `implementation/susi-ghiso-japan/` (run all npm commands there). Human-facing table of every editable file: that folder's `README.md` § Edit the Content._

**Where content lives (edit these, never `src/generated/`):**

| Content | File(s) | Blueprint |
|---|---|---|
| Guides / routes / tools / shop entries | `content/{guides,suggestions,tools,shop}/*.md` (frontmatter + Markdown) | `content-engine.md`, `data-model.md` |
| Trip days and locations | `content/itinerary.json` | `homepage.md`, `data-model.md` |
| Checklists | `content/checklists.json` (ids must stay stable) | `homepage.md` |
| Day-trip picker | `content/daytrips/<city>.json` (options + all 3-pick combinations), `content/daytrips/destinations/<slug>.md` (cards; `_TEMPLATE.md` ignored) | `daytrips.md` |
| Photos | `public/media/` (local only: CSP `img-src 'self'`; ≤ 400 KB) | `performance.md` |

**Where code lives:**

- Content engine: `scripts/build-content.mjs` reads `content/`, validates it (errors fail the build, warnings don't) and writes `src/generated/{content,itinerary,checklists,daytrips}.json`.
- Routing: `src/App.tsx` + `src/lib/router.tsx` (`/`, `/<section>`, `/<section>/<slug>`; sections in `src/lib/content.ts`).
- Tools page: `src/pages/Sections.tsx` renders `FujiWidget` + `DayTripPicker` when section is `tools`.
- Feature logic: `src/lib/fuji.ts` (tunable constants at top), `src/lib/rates.ts`, `src/lib/daytrips.ts`, `src/lib/journey.ts`, `src/lib/checks.ts`.
- Look: `src/styles/theme.css` only. No hex colours, raw radii or font names in components (`design.md`).
- Privacy: `vercel.json` (noindex headers, no-referrer, CSP allowlist: only Frankfurter + Open-Meteo), `public/robots.txt`. External links use `rel="noopener noreferrer"`. A new external request must be added to the CSP and to `integrations.md`.

**Commands:** `npm run content:check` (validate), `npm run dev`, `npm run build` (rates → content → tsc → vite).

**Adding a feature:** write or extend its blueprint in `spec/blueprints/`, keep editable data in `content/` (validated in `build-content.mjs`), and add a row to the table above and to the README § Edit the Content.

---

_Brain Version: 0.11_
