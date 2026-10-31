# Fuji visibility tool

_Purpose: define the Fuji visibility estimate (R26): its data, scoring, states, caching and the one component that shows it on both the homepage and the Tools page._

## What it shows

- A verdict for **today** and **tomorrow** (Japan dates): **Good**, **Maybe** or **Unlikely**.
- One verdict per viewpoint, for seven viewpoints (below), plus the **best hours** of each day when the verdict is Good or Maybe (e.g. "07:00–10:00").
- The time the forecast was fetched ("Forecast 08:40, Japan time").
- A fixed caption: "Estimate from cloud forecasts, not a camera." The tool never promises a view.

## Viewpoints

| Viewpoint | Coordinates | Visibility needed |
|---|---|---|
| Tokyo (city observation decks) | 35.6896, 139.7006 | ≥ 20 km |
| Mount Takao (summit) | 35.6251, 139.2437 | ≥ 15 km |
| Mount Mitake (御岳山) | 35.7808, 139.1490 | ≥ 20 km |
| Kamakura beaches & Enoshima | 35.3060, 139.5100 (Shichirigahama, between the two) | ≥ 20 km |
| Hakone (Lake Ashi) | 35.2048, 139.0250 | ≥ 10 km |
| Lake Kawaguchiko | 35.5170, 138.7520 | ≥ 10 km |
| Shizuoka (Nihondaira, Miho) | 34.9716, 138.4660 (Nihondaira plateau) | ≥ 15 km |

Rows are shown in this order. Kamakura and Enoshima share one row because they are a few km apart and fall in the same forecast cell. The visibility needed grows with distance from Fuji.

The summit point **35.3606, 138.7274** is fetched with them, because the mountain itself must be clear for any viewpoint to see it.

## Data source

- **Open-Meteo forecast API**, `https://api.open-meteo.com/v1/forecast`. Free, no account, no key.
- **One request** covers all eight points, the summit plus the seven viewpoints (comma-separated `latitude` and `longitude` lists).
- Parameters: `hourly=cloud_cover_low,cloud_cover_mid,visibility`, `timezone=Asia/Tokyo`, `forecast_days=2`. No other parameters.
- The request is a plain `GET` with `credentials: "omit"` and `referrerPolicy: "no-referrer"`. It carries no cookie, key or identifier (R17).

## Scoring

Only daylight hours count: **06:00 to 16:00** Japan time.

An hour is **clear** for a viewpoint when all of these hold:
- summit low cloud < 30%
- summit mid cloud < 40%
- viewpoint low cloud < 40%
- viewpoint visibility ≥ the viewpoint's threshold (table above)

Day verdict per viewpoint:
- **Good:** 3 or more clear hours.
- **Maybe:** 1 or 2 clear hours.
- **Unlikely:** no clear hours.

Best hours: the longest run of consecutive clear hours, shown as a start–end range.

All thresholds live in one constants block in the scoring module, so they can be tuned without touching the component.

## Caching and failure

- The response is cached in `localStorage` under `sgj:fuji:v1` with its fetch time (see `data-model.md`).
- A cached forecast younger than **60 minutes** is used without a new request.
- On load, an older cache is shown at once and a refresh is requested in the background.
- **Offline or failed request:** show the cached forecast with its fetch time and the label "Last saved forecast". With no cache at all, show "Forecast unavailable offline." The rest of the page is unaffected.
- A cached forecast older than **24 hours** is not shown; the no-cache message appears instead.
- The service worker does not handle this request (it only handles the site's own origin).

## Component

- One component, `FujiWidget`, used unchanged in both places.
- **Homepage:** after the checklist section (see `homepage.md`). Shown in the `pre-trip`, `in-transit` and `in-japan` states; removed `after-trip`.
- **Tools page:** shown at the top of `/tools`, above any Markdown tool entries, in every state (see `frontend.md`).
- Layout: a heading "Fuji today", the caption, then one row per viewpoint with today's and tomorrow's verdict and best hours. Verdicts carry a text label, never colour alone.

## Acceptance criteria

- [ ] Opening the homepage makes at most one request to `api.open-meteo.com` per 60 minutes.
- [ ] The request URL contains only the parameters listed above, and no cookie is sent.
- [ ] With hourly data where the summit is cloudy all day, every viewpoint shows Unlikely.
- [ ] With 4 consecutive clear morning hours at Kawaguchiko, it shows Good with that hour range.
- [ ] With the network off and a cache under 24 hours old, the forecast shows with "Last saved forecast".
- [ ] With the network off and no cache, "Forecast unavailable offline." shows and the page still renders.
- [ ] The same component renders on `/` and `/tools`, with one row for each of the seven viewpoints in the order above.
- [ ] One request returns data for all eight points.
- [ ] The caption "Estimate from cloud forecasts, not a camera." is always visible.
