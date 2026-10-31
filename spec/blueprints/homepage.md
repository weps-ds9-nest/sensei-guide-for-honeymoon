# Homepage

_Purpose: define what the homepage shows, in what order, and how the travellers' date and place decide which modules appear._

## Modules, top to bottom

1. **Header** — the site title and, when known, the current location ("Today: Osaka" in Japan; the first location before the trip).
2. **Clock + yen row** — the clock and the yen widget side by side from 768px width; stacked below that, clock first.
3. **Checklists** — one section holding the preflight and flight checklists, with a segmented control when both apply.
4. **Fuji visibility** — the `FujiWidget` from `fuji.md`.
5. **Events** — phase 2 only. Lists events at the travellers' current location.

Modules that are hidden for the current state are removed from the page. They are not greyed out or collapsed.

## Date and place state

The state is worked out from `content/itinerary.json` (see `data-model.md`), using the current instant and Japan time.

| State | Condition | Current location |
|---|---|---|
| `pre-trip` | Before the outbound flight's departure; without flights, Japan date before the first `days` entry | The first listed location |
| `in-transit` | After the outbound departure and before its arrival (only when flights are listed) | "In transit" |
| `in-japan` | After arrival (or from the first day), and on or before the last day in `days` | The `days` entry for the current Japan date; if none matches, the most recent earlier entry |
| `after-trip` | Japan date after the last day in `days` | None |

- Dates are compared as Japan-local calendar dates (`YYYY-MM-DD`), formatted in `Asia/Tokyo`.
- Flight times are instants with an explicit offset, so the in-transit check is exact.
- The state is recalculated on page load, every 60 seconds, and when the tab becomes visible again.

## Visibility per state

| Module | pre-trip | in-transit | in-japan | after-trip |
|---|---|---|---|---|
| Clock | yes | yes | yes | yes |
| Yen widget | yes | yes | yes | yes |
| Preflight checklist | yes | no | no | no |
| Flight checklist | yes | yes | no | no |
| Fuji visibility | yes | yes | yes | no |
| Events (phase 2) | no | no | yes | no |

- With the current itinerary, preflight disappears on 5 November (landing day) and the trip ends after 29 November.
- The checklist section is removed entirely when neither list applies.

## Fallback without an itinerary

Without `content/itinerary.json`, the state is `pre-trip` and the modules follow the pre-trip column. The homepage must still render in full.

## Checklists section

- Items come from `content/checklists.json`: a `preflight` list and a `flight` list, each item with an `id` and a `label`.
- **Both lists apply:** the heading reads "Checklists"; a segmented control **Preflight | Flight** below it picks the list. Preflight is selected on load. The control is a tab list (`role="tablist"`, each option `role="tab"` with `aria-selected`), each option at least 44px tall.
- **One list applies:** no control; the heading is that list's name.
- If the selected list stops applying (e.g. preflight at landing), the section falls back to the remaining list.
- The header shows "N of M done" for the visible list.
- Each item can be ticked. Ticks are stored in `localStorage` under `sgj:checks:v1` (see `data-model.md`). A failed or missing read leaves all items unticked.

## Clock

- Shows two times with weekday and date: Japan (`Asia/Tokyo`) and Rome (`Europe/Rome`), 24-hour format.
- Updates once per second while the tab is visible, and stops while it is hidden.

## Yen widget

- **Headline:** a large "1 € = N ¥" next to the widget title, N rounded to a whole yen. On narrow widths it wraps below the title.
- **Table:** JPY → EUR only. Rows: 1,000, 5,000, 10,000, 50,000 and 100,000 JPY, each with its EUR value rounded to the nearest euro. There is no EUR → JPY table.
- **Rate:** live from the browser, falling back to the cache and then the build-time rate (see `integrations.md`).
- Shows the rate date and source. If the rate is more than 7 days old, it shows "Rate may be out of date."

## Acceptance criteria

- [ ] Modules appear in the order given above.
- [ ] From 768px the clock and yen widget share one row; below it they stack, clock first.
- [ ] With a pre-trip date, the checklist section shows the Preflight | Flight control with Preflight selected.
- [ ] With a date of 5 November or later (Japan time), no preflight checklist exists in the page.
- [ ] Within a flight's departure and arrival, only the flight checklist shows, without the control.
- [ ] After the trip, the clock and yen widget remain; checklists and Fuji are removed.
- [ ] The yen widget shows "1 € = N ¥" and only the JPY → EUR table.
- [ ] The clock's Japan date uses Asia/Tokyo even when the device is set to another zone.
- [ ] Ticks survive a page reload.
