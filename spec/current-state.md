# Current State: Susi Ghiso Japan

_Last updated: 2026-10-31 by: /approve-proposal (archive `spec/proposals/2026-10-31-e-approved.md`)_

## Lifecycle State

Implementation (Refinement)

## What Is Being Resolved

Private React Japan honeymoon guide for friends, hosted on Vercel, hidden from crawlers and bots. A homepage dashboard driven by the itinerary file on Japan time (clock and yen in one row, then a merged Preflight | Flight checklist section, plus a Fuji visibility estimate) and four pages (Guides, Tools, Suggestions, Shop), built on shadcn with a swappable visual system and a `design.md` contract. Free data sources may be called from the browser when only generic request data such as the IP address is exposed.

## Requirements

- **R1 — Navigation (desktop/tablet):** a top bar with a home link (inactive on the homepage) and the four pages (Guides, Tools, Suggestions, Shop) horizontally.
- **R2 — Navigation (mobile):** the same bar fixed to the bottom of the screen, with home centred between the four links.
- **R3 — Homepage is dynamic:** its content is arranged by the travellers' calendar date and location, read from the itinerary file (R4), evaluated on Japan time.
- **R4 — Single itinerary file (supplied):** one JSON file defining the calendar date and location for each day of the trip. It drives both the dashboard (R3) and the events section (R9). Current content: Tokyo 5–10 Nov, Osaka 11–16 Nov, Okinawa 17–26 Nov, Tokyo 27–29 Nov; after the trip from 30 Nov (back in Italy). The user will correct the exact dates in the file later; this is not a blocker. Flight times are not yet supplied.
- **R5 — Clock (revised):** showing the current time in Japan and in Rome. Sits in the first homepage row, side by side with the yen widget (R8); stacked on mobile.
- **R6 — Checklists (revised):** one homepage section, after the clock/yen row, holding the preflight to-do list and the flight checklist (R7). When both apply, a Preflight | Flight segmented control picks which one shows. The preflight list is shown only before the trip; from landing day (5 Nov) it does not exist on the page.
- **R7 — Flight checklist:** shown before and while the travellers are travelling; hidden once they have landed. Lives in the checklist section (R6). Driven by R3.
- **R8 — Yen widget (revised):** beside the clock (R5). A large "1 € = N ¥" headline at the daily rate next to the widget title, and a JPY → EUR table only (e.g. 1000 JPY ≈ 5 EUR); the EUR → JPY table is removed. The rate may be fetched live by the browser (R17), falling back to the build-time rate. Stays visible while the travellers are in Japan and after the trip ends.
- **R9 — Events (phase 2):** an events section listing events at the travellers' current location, read from the itinerary file (R4).
- **R10 — Guides:** a cards grid of a few suggestions and best tricks; opening a guide shows its content on the same page.
- **R11 — Content engine:** each entry is a Markdown file. The engine turns these files into content with no code change per entry.
- **R12 — Guide authoring skill:** a skill stored in the project repository describes how to write a new guide, with a layout template for the content engine.
- **R13 — Tools page:** exists. Future tools: hotel address cards (by dates and city; details supplied later). The Fuji visibility tool is now its own requirement (R26).
- **R14 — Suggestions page:** city routes with tips on where to go, what to see and where to eat; high visual reference, a photo per stop.
- **R15 — Shop page:** exists; contents left blank for now (user will define).
- **R16 — Privacy:** not traceable by any crawler or bot; as private as possible.
- **R17 — Third-party services (extended):** no paid third-party services, no structural services (CMS, databases), and nothing that tracks users. Free data sources are allowed, including direct requests from the travellers' browsers when the only thing exposed is generic request data such as the IP address: no accounts, keys, cookies, tracking or identifying payloads. Applies to the yen rate (Frankfurter) and the Fuji tool (Open-Meteo).
- **R18 — Performance:** as little data transfer as possible, with as much caching as possible, for travellers on e-SIM. No numeric target.
- **R19 — Access gate (phase 3–4):** a simple passphrase given to the friends, untrackable and untraceable. Deferred from the current iteration.
- **R20 — Visual system:** the look is set in one place and can be changed easily. Starts as a neutral placeholder; the shadcn style is not yet chosen.
- **R21 — Fast feedback:** the system reacts to the user's changes rapidly, so the loop from editing a file to seeing the result is short.
- **R22 — Stack:** built on shadcn as the base component system.
- **R23 — Hosting:** Vercel.
- **R24 — Design governance:** a `design.md` dictates how the project looks and feels; the implementation follows it.
- **R25 — Timebox:** set up within about 4 hours.
- **R26 — Fuji visibility tool:** an estimate of whether Mt Fuji is likely visible today and tomorrow (e.g. Good / Maybe / Unlikely, with best hours), from free weather data (Open-Meteo cloud cover and visibility) fetched by the browser under R17, in a single request. Labelled as an estimate, not a guarantee. Viewpoints (seven): Tokyo (city observation decks), Mount Takao (summit), Mount Mitake, Kamakura beaches & Enoshima (one shared row), Hakone (Lake Ashi), Lake Kawaguchiko, and Shizuoka (Nihondaira, Miho). Built as one reusable component shown in two places: on the homepage and as an entry on the Tools page. Each verdict is paired with a small decorative icon (Good: Fuji with sun; Maybe: sun half behind a cloud; Unlikely: clouds over the summit), drawn inline with colours from the theme (R20) and no extra requests (R18); the text verdict always stays. A forecast saved on the device is reused only if it covers exactly the current viewpoints.

## Technical Constraints

- Frontend: React, with shadcn as the base component system (R22). Styling is swappable from one place (R20).
- Hosting: Vercel (R23).
- Content: Markdown files as the single source for guides, routes and other entries (R11); the itinerary is a single JSON file read by both the dashboard and events (R4, R9).
- Dates: the dashboard logic evaluates dates on Japan time (R3, R4).
- Iteration speed: edits must show up quickly in development (R21).
- Third parties: free sources only, no tracking, no paid or structural services (R17). Changing data (the daily yen rate, Fuji visibility) may be fetched by the browser from an allow-listed free host (`api.frankfurter.dev`, `api.open-meteo.com`); the site's Content-Security-Policy `connect-src` names exactly those hosts. Requests carry no keys, cookies or identifying parameters. A build-time value remains as the offline fallback for the yen rate.
- Caching: static output, cacheable assets, and minimal payload per page (R18).
- Design: all visual decisions reference `design.md` (R24). `design.md` is to be produced as a blueprint, not in this proposal.

## Acceptance Criteria

- [ ] Top bar on desktop, fixed bottom bar on mobile, with home centred between the four pages (R1, R2)
- [ ] Home link is inactive on the homepage (R1)
- [ ] Homepage content is arranged from the itinerary file for the current Japan date (R3, R4)
- [ ] Clock shows Japan and Rome time, side by side with the yen widget (stacked on mobile) (R5)
- [ ] Checklists are one section after the clock/yen row, with a Preflight | Flight switch when both apply; preflight is absent from landing day (R6)
- [ ] Flight checklist is shown before landing and hidden after (R7)
- [ ] Yen widget shows a "1 € = N ¥" headline and a JPY → EUR table at the daily rate, and stays visible in Japan and after the trip (R8)
- [ ] Events section (phase 2) lists events for the current location from the same itinerary file (R9)
- [ ] Guides render as a cards grid; opening a guide shows its content on the same page (R10)
- [ ] Adding a new Markdown file adds a new entry with no site-code change (R11)
- [ ] A repo skill with a layout template for new guides exists (R12)
- [ ] Tools and Shop pages exist (R13, R15)
- [ ] Suggestions show city routes with a photo per stop (R14)
- [ ] The deployed site returns a noindex / disallow-all signal to crawlers (R16)
- [ ] No paid, structural or tracking services are used; browser requests go only to allow-listed free hosts and carry no keys, cookies or identifying data (R17)
- [ ] The Fuji tool shows a dated visibility estimate for today and tomorrow, labelled as an estimate, for each of the seven viewpoints, from the same component on the homepage and the Tools page (R26)
- [ ] Each Fuji verdict shows its matching icon next to the text label, in light and dark mode, with no extra network request (R26)
- [ ] Changing the viewpoint list never shows blank rows from a previously saved forecast (R26)
- [ ] Repeat visits are served from cache where possible (R18)
- [ ] Access passphrase is implemented in phase 3–4 (R19), not in this iteration
- [ ] The visual style can be changed from one place, and changes appear quickly (R20, R21)
- [ ] The project is built on shadcn components (R22)
- [ ] The site is deployed on Vercel (R23)
- [ ] `design.md` exists and the built site matches it (R24)

## Out of Scope (this iteration)

- Phase-2 events content (R9).
- Passphrase gate (R19, phase 3–4).
- Hotel address cards and Shop contents (later iteration).
- Live cameras or embedded third-party widgets for Fuji (R26 is a weather-based estimate only).
- Writing guide, route and tip contents (user-authored through the content engine).
- Choosing the shadcn style (set later, through the one-place visual system from R20).
- Any backend, database or user accounts.

## Latest Evolution Log Entry

2026-10-31 — Proposal approved (archive `spec/proposals/2026-10-31-e-approved.md`): R26 adds a small decorative Fuji icon per verdict (sun / sun behind cloud / clouded summit), theme-coloured with no extra requests, and reuses a saved forecast only when it covers the current viewpoints. Lifecycle: Implementation (Refinement).

## Known Blockers

None. Exact itinerary dates will be corrected by the user in the itinerary file; not a blocker.
