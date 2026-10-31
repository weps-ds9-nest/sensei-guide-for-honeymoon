---
date: 2026-10-31
agent: Claude
platform: other
---

# Conversation save 001 (normalized)

Source: `spec/docs/2026-10-31-conversation-save-001.md` (raw, immutable). Recorded from a live Claude Code session during proposal review.

## Key claims

1. **Navigation:** a top bar with a home link (inactive on the homepage) and the four pages (Guides, Tools, Suggestions, Shop) side by side. On mobile, the bar is fixed at the bottom of the screen, with the home link centred between the four links.
2. **Homepage is dynamic:** its content reacts to the traveller's date and location. At the top sits a simple to-do list that works as a preflight check.
3. **Clock:** placed on the homepage, directly before the checklist, showing the current time in Japan and in Rome.
4. **Yen widget:** placed after the flight checklist. Shows a small conversion table (e.g. 1000 JPY ≈ 5 EUR, 10000 JPY ≈ 50 EUR) based on the daily exchange rate. Hidden once the traveller has landed, so it shows only when relevant to their time and place.
5. **Events (phase 2):** an events section listing what is happening where the travellers are now, fed by a YAML or JSON file that gives dates and locations. The homepage reacts to that file.
6. **Future tools:** (a) hotel address cards, based on the dates and the city they are staying in, with details supplied later by the user; (b) a small tool that pulls from reliable sources to say whether Mount Fuji is visible from various locations.
7. **Guide authoring:** a skill stored in the project repository that describes how to write a new guide, with a layout template for the content engine.

## Classification input

- Topics not present in `current-state.md`: navigation, homepage behaviour, clock, currency widget, events, future tools, guide-authoring skill.
- Potential tension to surface, not classified as a contradiction: item 6(b) fetches external sources, while the approved requirement R9 says "no third-party requests". Resolution depends on whether such data is fetched at build time and stored in the site, or fetched by the browser. The user should decide.
