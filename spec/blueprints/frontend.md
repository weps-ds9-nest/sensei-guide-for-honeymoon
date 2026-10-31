# Frontend

_Purpose: define the routing, layout, navigation and component structure of the React single-page app._

## Stack

- **Build:** Vite, React and TypeScript. Output is static files.
- **Styling:** Tailwind CSS, with **shadcn/ui** components copied into `src/components/ui/`. The look is governed by `design.md`.
- **Routing:** a small history-API router written in `src/lib/router.tsx`. No routing library.
- **Dependencies:** React, React DOM, and the shadcn/Tailwind tooling. No other runtime dependency unless a blueprint update adds it.

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Homepage | Dynamic; see `homepage.md` |
| `/guides` | Guides list | Cards grid |
| `/guides/:slug` | Guide detail | Opens on the same page as the list is replaced |
| `/tools` | Tools list | Empty state: "Coming soon." until entries exist |
| `/suggestions` | Suggestions list | City cards |
| `/suggestions/:slug` | Route detail | Numbered stops; see `content-engine.md` |
| `/shop` | Shop list | Empty state: "Coming soon." until entries exist |
| anything else | Not found | Link back to `/` |

Each route change scrolls to the top. The browser back button works.

## Navigation

**Desktop and tablet (viewport ≥ 640px):** a sticky top bar.
- Left: home link, then the four page links in this order: Guides, Tools, Suggestions, Shop.
- The active page link is highlighted.
- On `/`, the home link is inactive: rendered as text, not a link, with `aria-disabled="true"`.

**Mobile (viewport < 640px):** a fixed bottom bar with five items.
- Order: Guides, Tools, **Home (centred)**, Suggestions, Shop.
- The bar respects the device safe-area inset at the bottom.
- Each item is at least 44px tall.
- The home item is inactive on `/`, as on desktop.
- Page content has bottom padding so the bar never covers it.

## Layout

- Single column on mobile, with a 16px side gutter.
- Content width caps at 880px and is centred.
- No horizontal scrolling at any width.
- Grids: guides and suggestions cards use 1 column below 560px, 2 columns from 560px, and 3 columns from 900px.

## Component structure

- `SiteNav` — renders the top bar on desktop and the bottom bar on mobile from one item list.
- `Home` — composes the homepage modules in the order given in `homepage.md`.
- `SectionList` — generic list for guides, tools, suggestions and shop, driven by the content data.
- `SectionDetail` — generic detail for the same sections. Suggestion entries use the route layout.
- `ItemCard` — one card: cover image or placeholder, title, summary, tags or city.
- `EmptyState` — the "Coming soon." message for empty sections.

## Data fetching

- Content is imported as static data from `src/generated/content.json`. There is no fetch at run time.
- The itinerary and checklists are imported as static data from `src/generated/`.

## Acceptance criteria

- [ ] All seven routes render; an unknown path renders the not-found page.
- [ ] Desktop shows the top bar; mobile shows only the bottom bar.
- [ ] On `/`, the home link is inactive on both bars.
- [ ] The bottom bar keeps home in the middle position at 320px and 390px widths.
- [ ] No horizontal scrollbar appears at 320px width.
- [ ] Tools and Shop show "Coming soon." while empty.
