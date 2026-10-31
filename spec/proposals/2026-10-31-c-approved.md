# Proposal draft: Susi Ghiso Japan

_Drafted: 2026-10-31 by the evolution agent (`/generate-proposal`, after conversation save 005). Not yet approved. Written over by the next `/generate-proposal` or `/update-proposal` run until `/approve-proposal` archives it._

**Inputs synthesized:** 1 new since the last approval (`spec/proposals/2026-10-31-b-approved.md`) — `spec/docs/normalized/2026-10-31-conversation-save-005.md` (itinerary, homepage rework, browser calls to free data sources). Carried forward from earlier approvals: `spec/docs/normalized/2026-10-31-requirements.md` (requirements drop, approved), `spec/docs/normalized/2026-10-31-conversation-save-001.md` (review of the first draft), `spec/docs/normalized/2026-10-31-conversation-save-002.md` (answers to open questions), `spec/docs/normalized/2026-10-31-conversation-save-003.md` (design start and itinerary file), and `spec/docs/normalized/2026-10-31-conversation-save-004.md` (yen widget stays visible in Japan).
**Baseline:** `spec/proposal.md` (original project paragraph, immutable).

---

## What Has Evolved

The project began as one paragraph: a small React single-page Japan guide for friends on their honeymoon, private from crawlers and bots, on Vercel, with a simple login if needed.

The requirements made it concrete: a homepage dashboard and four pages (**Guides**, **Tools**, **Suggestions**, **Shop**), a Markdown content engine, shadcn as the base, and a `design.md` governing look and aesthetic. The first review shaped the shell. Navigation is a top bar with a home link and the four pages; on mobile it becomes a bar fixed to the bottom, with home centred. The homepage is dynamic and opens with a clock for Japan and Rome, a preflight to-do list, a flight checklist, and a yen widget. A phase-2 events section will read the same itinerary file.

The later answers settle the remaining points. Third-party use is restricted to what is free and does not track people. Performance has no numeric target; the aim is as little transfer and as much caching as possible, because the friends are on e-SIM. The access gate is deferred to phases 3–4, as an untrackable passphrase. One itinerary file, supplied by the user once the first stages run, defines the date and location for each day; the dashboard rearranges itself from it on Japan time, and the events section reads the same file. The visual design starts as a neutral placeholder and must be changeable quickly from one place, with the system reacting rapidly to each change.

During Spec Review the user decided the yen widget must stay visible while they are in Japan. Approved R8 had hidden it after landing; that is revised here.

During implementation (conversation save 005) the user supplied the itinerary and reshaped the homepage. The trip runs Tokyo 5–10 Nov, Osaka 11–16, Okinawa 17–26, Tokyo 27–29, with the travellers back in Italy on 30 Nov. The preflight list disappears entirely from landing day. The clock and yen widget now share one row, followed by a single checklist section where a Preflight | Flight switch picks the list. The yen widget leads with a large "1 € = N ¥" daily rate and keeps only the JPY → EUR table. The user also extended the privacy rule: the travellers' browsers may call free data sources directly when the only thing exposed is generic request data such as the IP address. This lifts the build-time-only approach for the yen rate (Frankfurter) and opens the Fuji visibility tool (Open-Meteo), which the user now wants built.

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
- **R26 — Fuji visibility tool (new, this iteration):** an estimate of whether Mt Fuji is likely visible today and tomorrow (e.g. Good / Maybe / Unlikely, with best hours), from free weather data (Open-Meteo cloud cover and visibility) fetched by the browser under R17. Labelled as an estimate, not a guarantee. Built as one reusable component shown in two places: on the homepage and as an entry on the Tools page.

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
- [ ] The Fuji tool shows a dated visibility estimate for today and tomorrow, labelled as an estimate, from the same component on the homepage and the Tools page (R26)
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

## Soul implication

**Yes (proposed).** The privacy principle ("as private as possible") gains a stated boundary:
1. Private from crawlers and trackers, not from the network: browser requests to free data sources are acceptable when they expose only generic request data such as the IP address.

If approved, this would be appended to `soul.md`. The two principles from the first approval (data-light by default; design governed by `design.md`) are already in `soul.md` and are not repeated.

## Roadmap items (proposed backlog)

- Fetch the yen rate live in the browser, with the build-time rate as fallback (R8, R17).
- Build the Fuji visibility tool (R26) and open the CSP `connect-src` to the two allow-listed hosts.
- Add outbound/return flight times to the itinerary so the in-transit state works (R4, R7).
- Populate Tools with hotel cards (later iteration).
- Implement the passphrase gate (phase 3–4).
- Populate Shop (user-defined).

## Open questions for the user

None. Answered on 2026-10-31:
1. **Yen widget after the trip:** stays visible (R8).
2. **Fuji tool placement:** one component used on both the homepage and the Tools page (R26).
3. **Itinerary dates:** the user will fix the exact dates in the itinerary file when confirmed; no spec change needed (R4).
