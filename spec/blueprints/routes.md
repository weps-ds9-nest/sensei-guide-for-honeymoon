# Blueprint — Routes

Replaces the old "Suggestions" section (renamed 2026-11-02). URL: `/routes`, `/routes/:slug`. Content: `content/routes/<slug>.md`.

## Page

- **Header:** photo hero, sticky under the top bar. Title = route `title`. Subtitle = "Stage N of M · <current stage>". The photo cross-fades to the current stage's photo (keeps the last one if a stage has none; `cover` before the first stage). Photo credit in the top-right corner.
- **Intro:** Markdown before the first `##`.
- **Progress rail:** sticky vertical bar left of the stages. One numbered dot per stage (labels from 760px, numbers only below). The line fills with scroll; done stages outlined in maple, current stage filled. Tapping a dot scrolls to that stage.
- **Stages:** each `##` heading. Kicker "Stage N", title, photo, description. Elements fade up when the stage enters the viewport (IntersectionObserver adds `.is-visible`, CSS does the animation). Off with `prefers-reduced-motion`.

## Authoring

- Copy `content/routes/_TEMPLATE.md` (files starting with `_` are ignored).
- Stage photo = an image on its own line directly under the `##` heading: `![alt](/media/routes/x.jpg "credit")`. The title text is the credit.
- Photos must be local (CSP `img-src 'self'`), ≤ 400 KB. `npm run photo -- "<search>" routes/<name> [--pick N]` (`scripts/fetch-photo.mjs`) fetches a free-licence photo from Wikimedia Commons at build-time on the author's machine (macOS `sips` resize) and prints the line to paste. No request to Commons is made by the site.

## Engine

`splitStages()` in `scripts/build-content.mjs` adds `intro` and `stages[] { title, image { src, alt, credit } | null, html }` to every route. Error if a route has no `##`; warning if a stage has no photo.

## Acceptance

- [ ] `/routes/tokyo-first-night` shows 4 stages; the header subtitle and rail follow scroll.
- [ ] Each stage animates in once; reduced motion shows it statically.
- [ ] No external image requests (CSP unchanged).

## Tags and filter (2026-11-03)

- Allowed tags live in `content/routes/_tags.json` (`id` + `label`; order = chip order): anime, shopping, nature, temples-history, food.
- Every route needs ≥ 1 tag, and only allowed ids; otherwise the build fails.
- `/routes` shows chips ("All" + one per tag, single select, tap again to clear); cards show tag labels.
