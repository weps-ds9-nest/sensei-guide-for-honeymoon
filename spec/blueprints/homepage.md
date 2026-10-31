# Homepage

_Purpose: define what the homepage shows, in what order, and how the travellers' date and place decide which modules appear._

## Modules, top to bottom

1. **Preflight to-do list** — a simple checklist at the very top, used before leaving.
2. **Clock** — the current time in Japan and in Rome, directly before the flight checklist.
3. **Flight checklist** — shown only while the travellers are travelling.
4. **Yen widget** — shown in every stage of the trip, including while in Japan (see the visibility table).
5. **Events** — phase 2 only. Lists events at the travellers' current location.

Modules that are hidden for the current state are removed from the page. They are not greyed out.

## Date and place state

The state is worked out from `content/itinerary.json` (see `data-model.md`), using the current instant and Japan time.

| State | Condition | Current location |
|---|---|---|
| `pre-trip` | Japan date is before the outbound flight's departure date (in Japan time) | None until the first day; show the first listed location |
| `in-transit` | Current instant is after the outbound departure and before its arrival | "In transit" |
| `in-japan` | After arrival, and on or before the last day in `days` | The `days` entry for the current Japan date; if none matches, the most recent earlier entry |
| `after-trip` | After the last day in `days` | None |

- Dates are compared as Japan-local calendar dates (`YYYY-MM-DD`), formatted in `Asia/Tokyo`.
- Flight times are instants with an explicit offset, so the in-transit check is exact.
- The state is recalculated on page load, every 60 seconds, and when the tab becomes visible again.

## Visibility per state

| Module | pre-trip | in-transit | in-japan | after-trip |
|---|---|---|---|---|
| Preflight to-do | yes | yes | yes | yes |
| Clock | yes | yes | yes | yes |
| Flight checklist | yes | yes | no | no |
| Yen widget | yes | yes | yes | **deferred to the user** |
| Events (phase 2) | no | no | yes | no |

- The yen widget is visible from departure preparation through to arrival and the whole stay in Japan (approved requirement R8, revised 2026-10-31).
- The after-trip column is not decided. The user has been asked whether the widget should show after the trip ends. Until they answer, the widget is shown in the `after-trip` state, so nothing is lost. This is a placeholder, not a decision; it changes once the user answers.

## Fallback without an itinerary

Until `content/itinerary.json` is supplied, the state is `pre-trip` and the modules follow the pre-trip column. The homepage must still render in full.

## Preflight and flight checklists

- Items come from `content/checklists.json`: a `preflight` list and a `flight` list, each item with an `id` and a `label`.
- Each item can be ticked. Ticks are stored in `localStorage` under `sgj:checks:v1` (see `data-model.md`).
- A failed or missing `localStorage` read leaves all items unticked. The page still works.

## Clock

- Shows two times with weekday and date: Japan (`Asia/Tokyo`) and Rome (`Europe/Rome`), 24-hour format.
- Updates once per second while the tab is visible, and stops while it is hidden.

## Yen widget

- Shows a table at the rate from `src/generated/rates.json` (see `integrations.md`).
- Rows: 1,000 JPY, 5,000 JPY, 10,000 JPY, 50,000 JPY, 100,000 JPY, each with its EUR value rounded to the nearest euro.
- A reverse row shows 10 EUR, 50 EUR, 100 EUR in JPY, rounded to the nearest 100 yen.
- Shows the rate date and a "last updated" note. If the rate is more than 7 days old, it shows a "rate may be out of date" label.

## Acceptance criteria

- [ ] Modules appear in the order given above.
- [ ] With the itinerary set to a pre-trip date, only the pre-trip modules appear.
- [ ] Setting the test date within a flight's departure and arrival shows the flight checklist and the yen widget.
- [ ] Setting the test date to any day in Japan shows the yen widget and removes the flight checklist.
- [ ] The clock shows Japan and Rome time, and the Japan date uses Asia/Tokyo even when the device is set to another zone.
- [ ] Ticks survive a page reload.
