---
date: 2026-10-31
agent: Claude
platform: other
---

# Conversation save 005 (normalized)

Source: `spec/docs/2026-10-31-conversation-save-005.md` (raw, immutable). Recorded from a live Claude Code session during implementation.

## Key claims

1. **Browser calls to free data sources (revises the build-time-only approach):** run-time requests from the travellers' browsers to free external data sources are allowed when they expose only generic request information (e.g. IP address) — no accounts, keys, cookies, tracking or identifying payloads. Applies to the yen exchange rate (Frankfurter) and the Fuji visibility tool (Open-Meteo).
2. **Itinerary supplied:** Tokyo 5–10 Nov, Osaka 11–16 Nov, Okinawa 17–26 Nov, Tokyo 27–29 Nov; back in Italy 30 Nov (after-trip from that date). Osaka length and the Okinawa → Tokyo date are assumptions awaiting user confirmation. No flight times yet.
3. **Preflight checklist:** rendered only before the trip; from landing day (5 Nov) it does not exist on the page.
4. **Yen widget:** EUR → JPY table removed; JPY → EUR table kept; a large "1 € = N ¥" daily-rate headline next to the title.
5. **Homepage layout:** clock and yen widget in one row (stacked on mobile); preflight and flight checklists merged into one section with a Preflight | Flight segmented control, placed after the clock/yen row.
6. **Fuji visibility tool** is requested now (previously a later iteration on the Tools page), as a weather-based estimate.

## Classification input

- Claim 1 contradicts the current-state technical constraint that changing data "may be fetched at build time so that friends' browsers make no extra requests", and blueprint `integrations.md` rules 4 and "Not allowed: a browser request to a weather or camera service at run time". R17 itself (free, no tracking) is unchanged.
- Claim 5 contradicts R5 ("clock directly before the checklist") and R6 ("preflight to-do list at the top of the homepage content").
- Claim 4 deepens R8 (conversion table at the daily rate).
- Claim 2 supplies the itinerary file that R4 deferred.
- Claim 6 moves the Fuji tool forward from "later iteration" (R13, Out of Scope).
