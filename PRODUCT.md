# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Friends travelling in Japan on a honeymoon. They use the guide on their phones, on the go, usually over an e-SIM with limited data. They are not technical and will not configure anything; they open the link and read.

## Product Purpose

A small private guide: a homepage dashboard (preflight to-do list, clock for Japan and Rome, flight checklist while travelling, yen conversion widget), plus four sections: Guides, Tools, Suggestions and Shop. Success means the friends can find what they need in a few taps, with almost no data use, and never have to ask where something is.

## Positioning

A hand-curated guide written by a personal guide, not a generic travel site. Its content reflects the author's own knowledge and suggestions, and it is deliberately not public: it stays invisible to crawlers and search engines.

## Operating Context

- Used on a phone, often while walking, commuting or queuing, on an e-SIM with limited data.
- Used before leaving (preflight list), during the flight (flight checklist) and during the stay (yen widget, clock, routes).
- Reached through a link shared with friends; no accounts, no backend.
- The homepage content follows a single itinerary file (`content/itinerary.json`) supplied by the author; until it exists, the homepage shows the pre-trip state.

## Capabilities and Constraints

- Static site: React, Vite, Tailwind, shadcn-style components, deployed on Vercel. Markdown entries under `content/` are compiled at build time.
- No third-party trackers, analytics, or external requests from the friends' browsers. Exchange rate is fetched at build time only.
- No paid services, no CMS, no database, no user accounts.
- Works offline after the first visit (service worker caching).
- Access passphrase is deferred to a later phase (not part of the current iteration).
- Phase 2: events at the travellers' current location, from the same itinerary file.
- Undecided: whether the yen widget should show after the trip ends.
- Terminology: "Guides", "Tools", "Suggestions", "Shop", "preflight", "flight checklist", "yen widget".

## Brand Commitments

- Site title: **"Sensei's Honeymoon guide to Japan Galaxy"**. This is the title the author chose. The project and repository are currently named "Susi Ghiso Japan", and `index.html` still reads "Japan"; those are not yet aligned with the chosen title.
- Voice: personal, in the first person, like a friend's note. The author will replace the placeholder content with their own once the site is packaged and launched.
- Languages: Italian and English. Every entry is published in both.
- Whether the couple's names appear on the site is not decided. Do not add names, photos of the couple, or other identifying details without confirmation.

## Evidence on Hand

- Guides: `content/guides/eating-smart.md`, `content/guides/getting-around.md` (English placeholder entries; to be rewritten by the author in both languages).
- Suggestions: `content/suggestions/tokyo-first-days.md` (one city route, placeholder).
- Tools and Shop: empty (`.gitkeep` only). Contents to be defined later by the author.
- Checklists: `content/checklists.json` (preflight and flight lists).
- Itinerary: not supplied yet.
- Photos for suggestion stops: none yet. `public/media/` is empty. Do not invent or substitute stock imagery as if it were the author's own places; mark photo slots as pending.
- Exchange rate: `content/rates.last.json` (last fetched value, refreshed at build time).

## Product Principles

- Private by default: invisible to crawlers and bots, with no tracking and no extra requests from the friends' browsers.
- Light on data: as little transfer as possible, as much caching as possible.
- Fast to change: content is Markdown, the look is set in one place, and edits show up quickly.
- Written by the author, not generated: content comes from the author's own knowledge, and placeholders are labelled as such.

## Accessibility & Inclusion

- Usable on small phone screens, with a bottom navigation bar and touch targets of at least 44 px.
- Text contrast meets WCAG AA in light and dark modes; focus rings are visible on every interactive element; motion is reduced when the device requests it.
- Content is in Italian and English, so both languages must stay in sync.
