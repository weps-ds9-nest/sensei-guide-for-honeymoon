# Conversation save 007: stale Fuji cache fix, verdict icons

_Captured: 2026-10-31 from the live Claude Code session. Raw artifact, immutable once written._

## Missing data for new viewpoints

The user asked:

> "Why are Kamakura, Enoshima, Mount Takao and Mount Mitake displaying no data or estimate?"

Diagnosis: the forecast is cached in the browser for 60 minutes. A forecast saved before the new viewpoints were added held only the original four points (summit, Tokyo, Kawaguchiko, Hakone), so the new rows rendered "—". The live API returned data for all eight points.

Fix (implemented in `src/lib/fuji.ts`): a cached forecast is used only if its point list matches the current viewpoint set exactly; otherwise it is treated as missing and refetched.

## Verdict icons

The user asked: "What would it cost to add a small svg icon of Mt Fuji paired with the sun or clouds and match it with the prediction?" The assistant estimated about 1 KB once (inline SVG, no requests, cached with the app) and about 30 minutes of work, and proposed three icons next to every verdict. The user replied:

> "yes, build the 3-icon version"

Implemented:
- `src/components/FujiIcon.tsx`: inline SVG, one per verdict — **Good**: Fuji with a red sun; **Maybe**: sun half behind a small cloud; **Unlikely**: no sun, clouds over the summit. Decorative (`aria-hidden`); the text verdict stays and carries the meaning.
- Colours from new theme tokens in `src/styles/theme.css` (`--fuji-mountain`, `--fuji-snow`, `--fuji-cloud`, `--fuji-cloud-edge`, light and dark), sun uses `--maple`.
- Layout: on phones each viewpoint row puts the place name on its own line with Today and Tomorrow side by side below; from 640px one line per viewpoint.
- Cost measured: app chunk 18.6 → 19.2 kB gzipped.
