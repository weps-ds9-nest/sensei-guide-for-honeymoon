---
date: 2026-10-31
agent: Claude
platform: other
---

# Conversation save 007 (normalized)

Source: `spec/docs/2026-10-31-conversation-save-007.md` (raw, immutable). Recorded from a live Claude Code session.

## Key claims

1. **Forecast cache must match the viewpoint set (deepens R26 / fuji.md caching):** a saved forecast whose point list differs from the current viewpoints is treated as missing and refetched, so adding a viewpoint never shows blank rows.
2. **Verdict icons (deepens R26):** each verdict shows a small inline SVG — Good: Fuji with sun; Maybe: sun half behind a cloud; Unlikely: clouds over the summit, no sun. Decorative only; the text verdict remains. Zero extra requests, about 0.5 kB gzipped.
3. **Icon colours set in the theme (confirms R20):** four new `--fuji-*` tokens in `theme.css` with light and dark values; the sun uses the existing accent.
4. **Phone layout for Fuji rows:** place name on its own line, Today and Tomorrow side by side below; one line per viewpoint from 640px.

## Classification input

- Claims 1, 2 and 4 add depth to R26 without changing it; the blueprint `fuji.md` (caching, component layout) needs updating.
- Claim 3 follows R20 (look set in one place) and R18 (no extra transfer).
- Nothing contradicts current-state.md.
