# Current State: Susi Ghiso Japan

_Last updated: 2026-10-31 by: /approve-proposal (archive `spec/proposals/2026-10-31-b-approved.md`)_

## Lifecycle State

Proposal

## What Is Being Resolved

Private React single-page Japan honeymoon guide for friends, hosted on Vercel, hidden from crawlers and bots. The approved proposal extends it into a four-page guide (Guides, Tools, Suggestions, Shop) with a homepage dashboard driven by a single itinerary file read on Japan time, built on shadcn with a swappable visual system and a `design.md` contract.

## Requirements

- **R1 — Navigation (desktop/tablet):** a top bar with a home link (inactive on the homepage) and the four pages (Guides, Tools, Suggestions, Shop) horizontally.
- **R2 — Navigation (mobile):** the same bar fixed to the bottom of the screen, with home centred between the four links.
- **R3 — Homepage is dynamic:** its content is arranged by the travellers' calendar date and location, read from the itinerary file (R4), evaluated on Japan time.
- **R4 — Single itinerary file:** one JSON file, supplied by the user after the first stages, defining the calendar date and location for each day of the trip. It drives both the dashboard (R3) and the events section (R9).
- **R5 — Clock:** on the homepage, directly before the checklist, showing the current time in Japan and in Rome.
- **R6 — Preflight to-do list:** at the top of the homepage content, a simple to-do list used as a preflight check.
- **R7 — Flight checklist:** shown while the travellers are travelling; hidden once they have landed. Driven by R3.
- **R8 — Yen widget (revised):** after the flight checklist. Shows a small conversion table at the daily exchange rate (e.g. 1000 JPY ≈ 5 EUR, 10000 JPY ≈ 50 EUR) plus a quick reference. Stays visible while the travellers are in Japan; it is not hidden after landing. Whether it shows after the trip ends is an open question.
- **R9 — Events (phase 2):** an events section listing events at the travellers' current location, read from the itinerary file (R4).
- **R10 — Guides:** a cards grid of a few suggestions and best tricks; opening a guide shows its content on the same page.
- **R11 — Content engine:** each entry is a Markdown file. The engine turns these files into content with no code change per entry.
- **R12 — Guide authoring skill:** a skill stored in the project repository describes how to write a new guide, with a layout template for the content engine.
- **R13 — Tools page:** exists; contents left blank for now. Future tools: hotel address cards (by dates and city; details supplied later) and a Fuji visibility tool (reliable sources, various locations).
- **R14 — Suggestions page:** city routes with tips on where to go, what to see and where to eat; high visual reference, a photo per stop.
- **R15 — Shop page:** exists; contents left blank for now (user will define).
- **R16 — Privacy:** not traceable by any crawler or bot; as private as possible.
- **R17 — Third-party services:** no paid third-party services, no structural services (CMS, databases), and nothing that tracks users. Free data sources are allowed.
- **R18 — Performance:** as little data transfer as possible, with as much caching as possible, for travellers on e-SIM. No numeric target.
- **R19 — Access gate (phase 3–4):** a simple passphrase given to the friends, untrackable and untraceable. Deferred from the current iteration.
- **R20 — Visual system:** the look is set in one place and can be changed easily. Starts as a neutral placeholder; the shadcn style is not yet chosen.
- **R21 — Fast feedback:** the system reacts to the user's changes rapidly, so the loop from editing a file to seeing the result is short.
- **R22 — Stack:** built on shadcn as the base component system.
- **R23 — Hosting:** Vercel.
- **R24 — Design governance:** a `design.md` dictates how the project looks and feels; the implementation follows it.
- **R25 — Timebox:** set up within about 4 hours.

## Technical Constraints

- Frontend: React, with shadcn as the base component system (R22). Styling is swappable from one place (R20).
- Hosting: Vercel (R23).
- Content: Markdown files as the single source for guides, routes and other entries (R11); the itinerary is a single JSON file read by both the dashboard and events (R4, R9).
- Dates: the dashboard logic evaluates dates on Japan time (R3, R4).
- Iteration speed: edits must show up quickly in development (R21).
- Third parties: free sources only, no tracking, no paid or structural services (R17). Data that changes (the daily yen rate, Fuji visibility) may be fetched at build time so that friends' browsers make no extra requests. This is a blueprint decision, not a requirement.
- Caching: static output, cacheable assets, and minimal payload per page (R18).
- Design: all visual decisions reference `design.md` (R24). `design.md` is to be produced as a blueprint, not in this proposal.

## Acceptance Criteria

- [ ] Top bar on desktop, fixed bottom bar on mobile, with home centred between the four pages (R1, R2)
- [ ] Home link is inactive on the homepage (R1)
- [ ] Homepage content is arranged from the itinerary file for the current Japan date (R3, R4)
- [ ] Clock shows Japan and Rome time directly before the checklist (R5)
- [ ] Preflight to-do list sits at the top of the homepage (R6)
- [ ] Flight checklist is shown before landing and hidden after (R7)
- [ ] Yen widget shows a conversion table at the daily rate and stays visible while the travellers are in Japan (R8)
- [ ] Events section (phase 2) lists events for the current location from the same itinerary file (R9)
- [ ] Guides render as a cards grid; opening a guide shows its content on the same page (R10)
- [ ] Adding a new Markdown file adds a new entry with no site-code change (R11)
- [ ] A repo skill with a layout template for new guides exists (R12)
- [ ] Tools and Shop pages exist and are empty for now (R13, R15)
- [ ] Suggestions show city routes with a photo per stop (R14)
- [ ] The deployed site returns a noindex / disallow-all signal to crawlers (R16)
- [ ] No paid, structural or tracking services are used (R17)
- [ ] Repeat visits are served from cache where possible (R18)
- [ ] Access passphrase is implemented in phase 3–4 (R19), not in this iteration
- [ ] The visual style can be changed from one place, and changes appear quickly (R20, R21)
- [ ] The project is built on shadcn components (R22)
- [ ] The site is deployed on Vercel (R23)
- [ ] `design.md` exists and the built site matches it (R24)

## Out of Scope (this iteration)

- The itinerary JSON itself (user will provide it after the first stages; R4 covers building the system that reads it).
- Phase-2 events content (R9).
- Passphrase gate (R19, phase 3–4).
- Contents of Tools and Shop (hotel cards and Fuji tool follow in a later iteration).
- Writing guide, route and tip contents (user-authored through the content engine).
- Choosing the shadcn style (set later, through the one-place visual system from R20).
- Any backend, database or user accounts.

## Latest Evolution Log Entry

2026-10-31 — Proposal approved again (archive `spec/proposals/2026-10-31-b-approved.md`), with R8 revised: the yen widget stays visible in Japan. Lifecycle State unchanged (Proposal). Open: whether the yen widget shows after the trip ends.

## Known Blockers

None. The itinerary JSON is requested from the user after the first stages are running; it is not a blocker for the current iteration.
