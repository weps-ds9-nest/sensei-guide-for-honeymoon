# Day-trip picker

_Purpose: define the day-trip picker on the Tools page: choose a base city, pick exactly 3 interests, get one hand-picked day trip shown as a photo card with links._

## What it shows

- A city selector (Tokyo, Osaka). Switching city clears the picks.
- Two columns, stacked on narrow screens:
  - **Left:** the city's interests as toggle buttons. Exactly 3 can be picked; once 3 are picked the rest are disabled. A counter reads "Pick 3 · N left".
  - **Right:** before 3 picks, a placeholder ("Pick N more interests…"). After 3, the result card: background photo under a dark scrim, the destination name as title, a short description, and a list of links. If the combination has no answer yet: "No suggestion for this mix yet."
- Results are written by hand for every combination. Nothing is scored or computed.

## Files (edited by hand, no AI needed)

| File | Holds |
|---|---|
| `content/daytrips/<city>.json` | `label`, `order`, `options` (`id`, `label`; display order), `combinations` (`pick`: 3 option ids in any order, `result`: destination file name or `""`) |
| `content/daytrips/destinations/<slug>.md` | Frontmatter `title`, `image`, `summary`; body: one `- [Text](https://…)` line per link |
| `content/daytrips/destinations/_TEMPLATE.md` | Copy-me template with instructions (ignored by the build) |
| `public/media/daytrips/` | Background photos, ≤ 400 KB |

## Build and validation

`scripts/build-content.mjs` reads these files and writes `src/generated/daytrips.json`.

- **Errors (build fails):** unknown option id, a pick that is not 3 different ids, a combination listed twice, a `result` with no destination file, a destination without `title`, a link not starting with `https://`.
- **Warnings:** empty `result`, a 3-combination not listed, image file missing (card falls back to a plain gradient), unrecognised body line.

## Privacy

Links open in a new tab with `rel="noopener noreferrer"` and `referrerPolicy="no-referrer"`, so destination sites never see the guide's URL (R17). Photos are self-hosted; no external request is made by the tool.

## Acceptance criteria

- [ ] On `/tools`, Tokyo: Fuji + Nature + Momiji → Mt. Takao; Fuji + History + Momiji → Fujikawaguchiko; History + Nature + Momiji → Nikko, whatever the click order.
- [ ] A 4th interest cannot be picked; unpicking one re-enables the others.
- [ ] Switching city clears the picks and shows that city's interests.
- [ ] A combination with an empty result shows "No suggestion for this mix yet."
- [ ] A destination with no image shows the gradient card with readable text in light and dark mode.
- [ ] A broken data file (unknown option, missing destination) fails `npm run content:check` with a message naming the file and the combination.
- [ ] At 375px width the two columns stack and nothing scrolls horizontally.
- [ ] No component source contains a hex colour (the photo tokens `--on-image` and `--scrim` live in `theme.css`).
