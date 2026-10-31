# Susi Ghiso Japan

A small private guide for friends on their honeymoon in Japan: a homepage dashboard, guides, route suggestions, tools and shop, built to use very little data on an e-SIM.

## What This Project Does

A static React site. Markdown entries under `content/` are compiled at build time, together with a single itinerary file and the checklists, into a static site that is deployed on Vercel. The homepage shows the time in Japan and Rome beside a yen widget (live daily rate), the preflight and flight checklists under one switch until landing, and a Fuji visibility estimate for seven viewpoints (Tokyo, Mount Takao, Mount Mitake, Kamakura & Enoshima, Hakone, Lake Kawaguchiko, Shizuoka), each verdict with a small inline Mt Fuji icon, which also sits on the Tools page. The Tools page also has a day-trip picker: choose Tokyo or Osaka, pick 3 interests, get one hand-picked day trip. Checkbox state and cached rate and forecast are kept on the device; the browser contacts only two free data APIs (Frankfurter, Open-Meteo) besides the site itself.

## Stack

- Vite, React and TypeScript (static output)
- Tailwind CSS and shadcn/ui-style components (the look is set in `src/styles/theme.css`)
- Markdown rendered at build time with `marked`
- Exchange rate from Frankfurter (free, no key): at build time as fallback, and live from the browser
- Fuji forecast from Open-Meteo (free, no key), fetched by the browser and cached for an hour
- Vercel for hosting, with a service worker for offline caching

## Edit the Content

Everything a reader sees comes from the files below. Edit them in any text editor, then run `npm run content:check`. It names the file and the problem if something is wrong.

| What you want to change | File | Notes |
|---|---|---|
| A guide (tips, essentials) | `content/guides/<name>.md` | Frontmatter: `title` (required), `summary`, `cover`, `order`, `tags`, `city`. File name = URL. |
| A route suggestion | `content/suggestions/<name>.md` | Same frontmatter. Each `##` heading becomes a numbered stop. |
| Tools / Shop entries | `content/tools/<name>.md`, `content/shop/<name>.md` | Same frontmatter. Empty for now. |
| Trip days and city per day | `content/itinerary.json` | `days[]`: `date` (YYYY-MM-DD) and `location`. Drives "Today: …" and the before/during/after states on the homepage. |
| Preflight and flight checklists | `content/checklists.json` | `preflight[]` / `flight[]`: `id` (lowercase-hyphen, keep stable or saved ticks are lost) and `label`. |
| Day-trip picker: interests and answers | `content/daytrips/tokyo.json`, `content/daytrips/osaka.json` | `options` = the buttons, in display order. `combinations` = every 3-pick: `pick` (3 option ids, any order) and `result` (a destination file name, or `""` for "no suggestion yet"). Add a city by adding another `<city>.json`; `order` sets the tab order. |
| Day-trip picker: result cards | `content/daytrips/destinations/<name>.md` | Copy `_TEMPLATE.md`. Frontmatter: `title`, `image`, `summary`; body: one `- [Text](https://…)` line per link. |
| Photos | `public/media/…` (day trips in `public/media/daytrips/`) | JPG, under 400 KB, referenced as `/media/…`. They must be local files: the site's security policy blocks images from other websites. |
| Fuji viewpoints and thresholds | `src/lib/fuji.ts` (constants at the top) | Code, not content. See `spec/blueprints/fuji.md`. |
| Colours, radius, fonts | `src/styles/theme.css` | The only place for visual values. |
| Section titles and intros | `src/pages/Sections.tsx` (`TITLES`, `INTROS`) | Code. |

To write a new guide or route with Claude, use the `new-guide` skill (`.claude/skills/new-guide/`).

## Project Structure

- `content/`: everything editable (see the table above). `rates.last.json` is generated, so don't edit it.
- `scripts/`: `build-content.mjs` (content engine: reads `content/`, validates it, writes `src/generated/*.json`; `--check` validates only) and `fetch-rates.mjs`
- `src/generated/`: build output, overwritten on every `dev`/`build`. Never edit by hand.
- `src/pages/`: homepage (`Home.tsx`) and the section list/detail pages (`Sections.tsx`)
- `src/components/`: navigation, clock, checklist, yen widget, Fuji widget and icon, day-trip picker, cards, `ui/` (shadcn-style button and card)
- `src/lib/`: router, journey state (Japan time), checklist storage, content types, live rate (`rates.ts`), Fuji scoring and fetch (`fuji.ts`), day-trip lookup (`daytrips.ts`)
- `src/styles/`: `theme.css` (visual tokens, change the look here), `content.css` (article and route typography)
- `public/`: `robots.txt`, `sw.js`, manifest, favicon, `media/` for photos
- `vercel.json`: privacy headers (noindex, no-referrer, CSP) and rewrites
- `.claude/skills/new-guide/`: skill and templates for writing a new entry

## Setup

```
npm install
npm run dev          # local site, reloads on save
npm run content:check   # validate content without building
npm run build        # fetch the rate, build content, type-check, build the site
```

Run the commands from this folder. Node and npm are required.

---

_Spec version: 2026-10-31-e-approved (proposal approved 2026-10-31)_
_Soul version: 2026-10-31 (proposal approval)_
