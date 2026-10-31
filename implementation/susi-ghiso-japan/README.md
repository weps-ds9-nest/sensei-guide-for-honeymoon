# Susi Ghiso Japan

A small private guide for friends on their honeymoon in Japan: a homepage dashboard, guides, route suggestions, tools and shop, built to use very little data on an e-SIM.

## What This Project Does

A static React site. Markdown entries under `content/` are compiled at build time, together with a single itinerary file and the checklists, into a static site that is deployed on Vercel. The homepage shows a preflight list, the time in Japan and Rome, a flight checklist while travelling, and a yen conversion widget. Checkbox state is kept on the device.

## Stack

- Vite, React and TypeScript (static output)
- Tailwind CSS and shadcn/ui-style components (the look is set in `src/styles/theme.css`)
- Markdown rendered at build time with `marked`
- Exchange rate fetched at build time from Frankfurter (free, no key, no account)
- Vercel for hosting, with a service worker for offline caching

## Project Structure

- `content/` — Markdown entries (guides, suggestions, tools, shop), `itinerary.json` (when supplied), `checklists.json`, `rates.last.json`
- `scripts/` — `build-content.mjs` (content engine, `--check` to validate only) and `fetch-rates.mjs`
- `src/pages/` — homepage and the section pages
- `src/components/` — navigation, clock, checklist, yen widget, cards
- `src/lib/` — router, journey state (Japan time), checklist storage, content types
- `src/styles/` — `theme.css` (visual tokens, change the look here), `content.css` (article and route typography)
- `public/` — `robots.txt`, `sw.js`, manifest, favicon, `media/` for photos
- `.claude/skills/new-guide/` — skill and templates for writing a new entry

## Setup

```
npm install
npm run dev          # local site, reloads on save
npm run content:check   # validate content without building
npm run build        # fetch the rate, build content, type-check, build the site
```

Run the commands from this folder. Node and npm are required.

---

_Spec version: 2026-10-31-b-approved (proposal approved 2026-10-31)_
_Soul version: 2026-10-31 (proposal approval)_
