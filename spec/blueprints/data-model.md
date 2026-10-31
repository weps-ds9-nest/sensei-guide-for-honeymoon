# Data model

_Purpose: define the structure of every data file the site reads. The itinerary format is provisional until the user supplies the real JSON._

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
- The example dates and places above are placeholders, not the real trip.

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

## 5. Content — `src/generated/content.json`

Built from the Markdown entries. Shape per entry: `slug`, `title`, `summary`, `cover`, `order`, `tags`, `city`, `html`. Frontmatter rules are in `content-engine.md`.

## Acceptance criteria

- [ ] A build with a non-Tokyo `timezone` fails with a message naming the field.
- [ ] A build with duplicate `days` dates fails and names the date.
- [ ] `rates.json` contains no key other than those listed above.
- [ ] Clearing `localStorage` returns every checklist item to unticked.
