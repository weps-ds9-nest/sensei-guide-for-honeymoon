# Content engine

_Purpose: define how Markdown files become the guides, route pages and other entries, so new content needs no code change._

## Sections and folders

| Section | Folder | Route | Layout |
|---|---|---|---|
| Guides | `content/guides/` | `/guides/:slug` | Standard article |
| Suggestions | `content/suggestions/` | `/suggestions/:slug` | Route (numbered stops) |
| Tools | `content/tools/` | `/tools/:slug` | Standard article |
| Shop | `content/shop/` | `/shop/:slug` | Standard article |

One file is one entry. The slug is the file name without `.md`.

## File format

Each file starts with a frontmatter block, then the Markdown body.

```yaml
---
title: Getting around          # required
summary: One line for the card  # optional
cover: /media/getting-around.webp  # optional, file in public/media/
order: 1                       # optional, lower first; default 999
tags: [transport, essentials]  # optional
city: Tokyo                    # optional, suggestions only
---
```

- Frontmatter values are plain strings, numbers, or single-line `[a, b]` lists.
- Slugs use lowercase letters, digits and hyphens. Anything else fails the build.
- Two files in the same folder with the same slug fail the build.

## Body conventions

- **Standard article:** `##` and `###` headings for sections. Lists, blockquotes and code are allowed.
- **Route layout (suggestions):** each `##` heading is one numbered stop. Use `###` for sub-sections inside a stop (for example "Where to eat"). Each stop carries its photo, full width.
- **Images:** written as `![alt text](/media/file.webp)`. Alt text is required; the build warns when it is missing.

## Build step

1. Read every `.md` file in the four folders.
2. Parse the frontmatter and check required fields and slug rules.
3. Render the body to HTML at build time. The browser never parses Markdown.
4. Check that each referenced image exists in `public/media/`.
5. Write all entries to `src/generated/content.json`, sorted by `order` then title.

Validation rules:
- **Fail the build:** missing `title`, invalid slug, duplicate slug, missing referenced image.
- **Warn only:** image over 400 KB, missing alt text, `order` missing on a file that has siblings.

The same script also builds the day-trip picker data (`content/daytrips/` → `src/generated/daytrips.json`) with its own rules. See `daytrips.md`.

## Image rules

- Format: WebP.
- Width: at most 1600 px. Height is chosen by the photo.
- Size: at most 400 KB per file.
- Images are lazy-loaded (see `performance.md`).

## Authoring skill

The project repository contains a Claude Code skill that writes new entries:

- Location: `implementation/.claude/skills/new-guide/SKILL.md`.
- Templates: `implementation/.claude/skills/new-guide/templates/guide.md` and `route.md`. Each template is the layout the skill fills in.
- The skill asks for title, summary, order, tags and, for a route, the city and stops. It then writes the file and runs the content check.
- Content check: `npm run content:check` runs the validation step above without building the site.

## Acceptance criteria

- [ ] Adding a Markdown file to `content/guides/` adds a guide with no code edit, after a rebuild.
- [ ] A file with a duplicate slug or a missing title stops the build with a message naming the file.
- [ ] A suggestions file renders each `##` heading as a numbered stop.
- [ ] `npm run content:check` reports the same errors as the build.
- [ ] The skill's templates match the frontmatter and body conventions above.
