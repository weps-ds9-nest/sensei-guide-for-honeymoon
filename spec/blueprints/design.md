# Design

_Purpose: define how the site looks and how its look is changed. The visual style is a neutral placeholder until the user chooses a direction._

## Status

**Placeholder.** The shadcn style is not chosen. This document fixes the *system* for changing the look, not the look itself. Replacing the placeholder values is a later, single-file change.

## Single source of visual truth

- All colours, radii, font stacks and layout measures live in **one file**: `src/styles/theme.css`.
- Values are declared as CSS custom properties on `:root`, with dark values under `.dark` and under the `prefers-color-scheme: dark` media query.
- Tailwind and shadcn read these properties. Components never hard-code a colour, radius or font.
- Changing the look means editing `theme.css`. No component code changes for a look change.

## Placeholder values

- **Palette:** neutral greys with one accent colour. Light background, dark text. Names follow shadcn's default variables (`background`, `foreground`, `card`, `muted`, `primary`, `border`, `ring`), so a swap to any shadcn theme is a paste into `theme.css`.
- **Illustration tokens:** the Fuji verdict icons use four extra tokens in `theme.css` — `--fuji-mountain`, `--fuji-snow`, `--fuji-cloud`, `--fuji-cloud-edge` — each with a dark-mode value; their sun uses the accent (`--maple`). See `fuji.md`.
- **Radius:** one base value, 12px, used by cards, buttons and inputs.
- **Typography:** system font stack only. Base size 16px; line height 1.6 for reading text; headings are bold and tight.
- **Layout measures:** content gutter 16px; content max width 880px; top bar height 56px; bottom bar height 64px.

## Modes

- Light and dark follow the device setting by default.
- The `.dark` class forces dark mode and is reserved for a later toggle. No toggle is built now.

## Iteration

- Edits to `theme.css` appear in the open browser tab without a manual reload, through the Vite dev server.
- The target for a visible change after saving is under one second on the developer's machine.

## Interaction and accessibility

- Text contrast meets WCAG AA in both modes.
- Focus rings are visible on every interactive element.
- Touch targets are at least 44 px.
- Empty sections show a short "Coming soon." message, not a blank page.
- Motion is limited to the card press feedback, and it is disabled when the device requests reduced motion.

## Changing the design later

1. Replace the placeholder values in `src/styles/theme.css`.
2. Check the light and dark views of the homepage, one guide, one route and the bottom bar.
3. Record the chosen direction in this file, replacing the Status section.

## Acceptance criteria

- [ ] No component source file contains a hex colour, a raw pixel radius, or a font name.
- [ ] Changing one value in `theme.css` changes the look across all pages.
- [ ] Text contrast passes WCAG AA in both light and dark modes.
- [ ] Every interactive element shows a focus ring.
