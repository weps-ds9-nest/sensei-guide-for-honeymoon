# Data model

_Purpose: define the structure of every data file and local-storage key the site reads._

## 1. Itinerary — `content/itinerary.json`

Drives the homepage (phases 1–2) and the events section (phase 2). Read at build time.

```json
{
  "timezone": "Asia/Tokyo",
  "flights": [
    {
      "id": "outbound",
      "departs": "2026-11-01T11:30:00+01:00",
      "arrives": "2026-11-02T07:00:00+09:00",
      "from": "FCO",
      "to": "NRT"
    }
  ],
  "days": [
    { "date": "2026-11-02", "location": "Tokyo", "notes": "optional" }
  ],
  "events": [
    {
      "date": "2026-11-05",
      "location": "Kyoto",
      "title": "Example event",
      "time": "18:00",
      "url": "https://example.org/event"
    }
  ]
}
```

Rules:
- `timezone` must be `Asia/Tokyo`. Any other value fails the build.
- `date` values are Japan-local calendar dates, `YYYY-MM-DD`.
- `departs` and `arrives` are instants with an explicit offset.
- `flights` is ordered by departure. The outbound flight is the first entry.
- `days` has one entry per calendar date. Duplicate dates fail the build.
- `events` is read only in phase 2. Events are shown for the current Japan date and the matching `location`.
- The example above shows the format. The real file currently lists only `days` (Tokyo 5–10 Nov, Osaka 11–16, Okinawa 17–26, Tokyo 27–29); `flights` are added when known, and the user corrects dates directly in the file.

## 2. Checklists — `content/checklists.json`

```json
{
  "preflight": [{ "id": "passport", "label": "Passport in hand" }],
  "flight": [{ "id": "boarding-pass", "label": "Boarding pass saved offline" }]
}
```

- `id` is unique within its list, lowercase with hyphens.
- Items are shown in array order.

## 3. Exchange rate — `src/generated/rates.json`

Written by the build. Never edited by hand.

```json
{
  "fetchedAt": "2026-11-01T06:00:00Z",
  "rateDate": "2026-10-31",
  "source": "name of the free source",
  "eurPerJpy": 0.0061,
  "stale": false
}
```

- `stale` is `true` when the build fell back to `content/rates.last.json`.

## 4. Local state — `localStorage["sgj:checks:v1"]`

Browser-only. Written when a checklist item is ticked.

```json
{ "preflight": { "passport": true }, "flight": { "boarding-pass": false } }
```

- Missing keys mean unticked.
- Nothing in this key is sent anywhere.

## 4b. Cached live rate — `localStorage["sgj:rate:v1"]`

Written by the yen widget after a successful browser fetch. Same shape as `rates.json` (`fetchedAt`, `rateDate`, `source`, `eurPerJpy`, `stale: false`). Used when younger than 6 hours; otherwise refreshed (see `integrations.md`).

## 4c. Cached Fuji forecast — `localStorage["sgj:fuji:v1"]`

```json
{ "fetchedAt": "2026-11-06T08:40:00+09:00", "points": ["summit", "tokyo", "takao", "mitake", "kamakura", "hakone", "kawaguchiko", "shizuoka"], "hourly": [{ "time": ["…"], "cloud_cover_low": [0], "cloud_cover_mid": [0], "visibility": [24000] }] }
```

- `hourly` holds one entry per point, in `points` order, as returned by Open-Meteo.
- Used when younger than 60 minutes; shown as "Last saved forecast" up to 24 hours; ignored after that (see `fuji.md`).
- Every read is guarded: an unreadable or malformed value is treated as missing.

## 5. Content — `src/generated/content.json`

Built from the Markdown entries. Shape per entry: `slug`, `title`, `summary`, `cover`, `order`, `tags`, `city`, `html`. Frontmatter rules are in `content-engine.md`.

## Acceptance criteria

- [ ] A build with a non-Tokyo `timezone` fails with a message naming the field.
- [ ] A build with duplicate `days` dates fails and names the date.
- [ ] `rates.json` contains no key other than those listed above.
- [ ] Clearing `localStorage` returns every checklist item to unticked and removes cached rate and forecast.
