# Conversation save 006: open questions answered, more Fuji viewpoints

_Captured: 2026-10-31 from the live Claude Code session. Raw artifact, immutable once written._

## Answers to the draft's open questions (before approval c)

The user answered the three open questions in the proposal draft:

> "Yes to the first question, Fuji tool should be a component that is used in both the homepage and in the tool section. Don't worry about the dates, I will fix them when I am reminded of the right dates"

- The yen widget stays visible after the trip ends.
- The Fuji tool is one component used on both the homepage and the Tools page.
- The user will correct the itinerary dates in the file later; no spec change needed.

These answers were folded into the draft and approved (`spec/proposals/2026-10-31-c-approved.md`); this capture records the user's words.

## More Fuji viewpoints (after implementation C005)

After the Fuji tool shipped with three viewpoints (Tokyo, Lake Kawaguchiko, Hakone), the user asked:

> "To the Fuji tool, also add several other cities and locations like: Kamakura (beach area and Enoshima), Mount Takao summit, Shizuoka Area, Mount Mitaka"

The assistant asked which place "Mount Mitaka" meant (no mountain has that name). The user chose **Mount Mitake (御岳山)**, western Tokyo.

Implemented in `src/lib/fuji.ts` (same single Open-Meteo request, now 8 points):
- Mount Takao (summit) — 35.6251, 139.2437, visibility ≥ 15 km
- Mount Mitake — 35.7808, 139.1490, visibility ≥ 20 km
- Kamakura beaches & Enoshima — one row at Shichirigahama (35.306, 139.510), between the two, visibility ≥ 20 km
- Shizuoka (Nihondaira, Miho) — Nihondaira plateau (34.9716, 138.466), visibility ≥ 15 km

Existing viewpoints kept: Tokyo, Hakone (Lake Ashi), Lake Kawaguchiko. A live request returned all 8 points. The `fuji.md` blueprint still lists three viewpoints and needs regenerating.
