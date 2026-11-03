# Blueprint — Tips

Replaces one-page-per-guide (2026-11-02). Nav label "Tips", URL `/guides` (and `/guides/:chip` opens with that chip selected).

- `content/guides/<chip>.md` = one chip: `title` = label, `order` = position. Each `##` = one tip card (title + Markdown body). `_TEMPLATE.md` ignored.
- Page: title, intro, horizontally scrollable chips ("All" + one per file), cards grid (1 column, 2 from 760px). Under "All" each card shows its chip name. Tapping the active chip returns to "All".
- Engine: `splitTips()` adds `tips[] { title, html }` to each guide; warning if a file has no `##`.
- Skills: `/new-tip` here, `/new-route` for routes (`routes.md`).
