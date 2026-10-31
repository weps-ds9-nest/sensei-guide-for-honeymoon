# Conversation save 005: itinerary dates, homepage layout, browser calls to free data sources

_Captured: 2026-10-31 from the live Claude Code session (implementation work on the homepage). Raw artifact, immutable once written._

## Itinerary

The user asked to wire the homepage to the real trip dates:

> "they'll be landing in Tokyo the 5th of November, stay about 6 days in Tokyo. Then move to Osaka for another 5-6 days and then move to Okinawa to come back to Tokyo around the end of Novemeber. Make the 30th as the date when they are back in italy"

The assistant wrote `content/itinerary.json` (days only, no flights yet): Tokyo 5–10 Nov, Osaka 11–16 Nov, Okinawa 17–26 Nov, Tokyo 27–29 Nov, after-trip from 30 Nov. Osaka length (6 days) and the Okinawa → Tokyo date (27 Nov) were assumed and flagged to the user for confirmation.

## Homepage changes requested and implemented

1. > "Make sure that after the 5th, the preflight checklist is collapsed and non existent"

   The preflight checklist is rendered only before the trip (pre-trip state); from landing day it is not rendered at all.

2. > "For the Yen widget, I need you to remove the EUr to yen conversion table and just leave the yen to eur. Instead, next to the title I need you to add a big title block that shows the daily conversion rater: 1 Eur = XXX yen"

   The EUR → JPY table was removed; the JPY → EUR table stays; a large "1 € = N ¥" headline sits next to the widget title.

3. > "now put in the same row the date time widget and the conversion yen widget and put the checklists in the same section with a segmented control to allow to select if it's a preflight checklist or flight checklist"

   Clock and yen widget share a row (stacked on mobile). Preflight and flight checklists are one section with a Preflight | Flight segmented control, placed after the clock/yen row. When only one list applies, the control is hidden.

## Fuji visibility tool and privacy

The user asked: "No chance to have a 'Fuji visibility' tool?" The assistant proposed a weather-based estimate (Open-Meteo cloud cover and visibility) and noted that the site currently makes no browser requests to outside hosts (build-time data only, CSP `connect-src 'self'`). It offered a Vercel server-side proxy (recommended) or direct browser calls.

The user decided:

> "I want to extend the privacy clause so that we can make these calls to external websites if it's just generic things like their IP. Both for the fuji tool and the currency exchange"

Meaning: browser (run-time) requests to free external data sources are allowed when the only thing they expose is generic request information such as the travellers' IP address — no accounts, keys, cookies, tracking or identifying payloads. This applies to the Fuji visibility tool (Open-Meteo) and the yen exchange rate (Frankfurter).
