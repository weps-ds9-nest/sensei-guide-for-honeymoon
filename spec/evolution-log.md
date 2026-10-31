# Evolution Log: Susi Ghiso Japan

_Append-only. Never delete entries. Maintained by the evolution agent._

---

## 2026-10-31 — Project created

- Event: project_setup
- Lifecycle state: Proposal
- Brain version: 0.11
- Proposal recorded in spec/proposal.md
- No evolution runs yet.

## 2026-10-31 — Requirements drop (EXTENDS)

- Event: doc_drop
- Classification: EXTENDS
- Source: spec/docs/normalized/2026-10-31-requirements.md
- Run log: spec/log/2026-10-31-002-evolution.md
- Summary: The user approved a requirements drop introducing the page structure (homepage dashboard, Guides, Tools, Suggestions, Shop), a Markdown content engine, passphrase login with anti-crawler privacy, a performance priority for e-SIM data, shadcn as the base, Vercel hosting, and a design.md governing look and aesthetic. Nothing prior is contradicted.

## 2026-10-31 — Conversation save 001: navigation, homepage, tools, guide skill (EXTENDS)

- Event: conversation_save
- Classification: EXTENDS
- Source: spec/docs/normalized/2026-10-31-conversation-save-001.md
- Run log: spec/log/2026-10-31-003-evolution.md
- Summary: The user specified the navigation (top bar; fixed bottom bar on mobile with home centred), a dynamic homepage (Japan and Rome clock, preflight to-do list, yen conversion widget hidden after landing, phase-2 events driven by YAML/JSON), future tools (hotel cards, Fuji visibility), and a repo skill for guide authoring. Tension flagged: the Fuji scraper vs. the no-third-party-requests requirement. Nothing prior is contradicted.

## 2026-10-31 — Conversation save 002: third parties, performance, access, itinerary, aesthetics (CONTRADICTS)

- Event: conversation_save
- Classification: CONTRADICTS
- Source: spec/docs/normalized/2026-10-31-conversation-save-002.md
- Run log: spec/log/2026-10-31-004-evolution.md
- Contradictions: spec/contradictions.md (resolved by user clarification)
- Summary: Third-party restriction narrowed to paid services, structural services and user tracking (free data sources allowed). Performance: as low as possible, cache as much as possible, no numeric target. Access gate deferred to phase 3–4 (untrackable passphrase). Itinerary JSON (after first stages) rearranges the dashboard on Japan time. Visual system must be easy to change; shadcn style not yet chosen.

## 2026-10-31 — Conversation save 003: placeholder design, fast feedback, single itinerary file (EXTENDS)

- Event: conversation_save
- Classification: EXTENDS
- Source: spec/docs/normalized/2026-10-31-conversation-save-003.md
- Run log: spec/log/2026-10-31-005-evolution.md
- Summary: Visual design starts as a neutral placeholder; changes must show quickly (fast feedback loop). One itinerary file feeds both the dashboard and the events section. Nothing prior is contradicted.

## 2026-10-31 — Proposal approved

- Event: proposal approved
- Archive: spec/proposals/2026-10-31-approved.md (copy of draft.md; draft.md kept as the working copy)
- Lifecycle state: Proposal (unchanged; advances only when /create-specs runs)
- Summary: The draft's requirements (R1–R25), technical constraints, acceptance criteria and out-of-scope items were adopted into spec/current-state.md. The soul implications (data-light by default; design governed by design.md) were appended to spec/soul.md. Seven backlog items were appended to spec/roadmap.md. spec/proposal.md, spec/docs/ and implementation/ were not changed.

## 2026-10-31 — Conversation save 004: yen widget stays visible in Japan (CONTRADICTS)

- Event: conversation_save
- Classification: CONTRADICTS
- Source: spec/docs/normalized/2026-10-31-conversation-save-004.md
- Run log: spec/log/2026-10-31-006-evolution.md
- Contradictions: spec/contradictions.md (resolved by user decision)
- Summary: The user decided the yen widget must stay visible in Japan, revising approved R8 ("hidden after landing"). Whether it shows after the trip is an open question. Lifecycle returned to Proposal for the rework.

## 2026-10-31 — Proposal approved (second approval, R8 revised)

- Event: proposal approved
- Archive: spec/proposals/2026-10-31-b-approved.md (copy of draft.md; draft.md kept as the working copy)
- Lifecycle state: Proposal (unchanged; advances only when /create-specs runs)
- Summary: The refreshed draft was adopted into spec/current-state.md. R8 is revised: the yen widget stays visible while the travellers are in Japan. Soul implications and roadmap items were already appended by the first approval and were not repeated. spec/proposal.md, spec/docs/ and implementation/ were not changed. Open: whether the yen widget shows after the trip ends.

## 2026-10-31 — Conversation save 005: itinerary, homepage layout, browser calls to free data sources (CONTRADICTS)

- Event: conversation_save
- Classification: CONTRADICTS
- Source: spec/docs/normalized/2026-10-31-conversation-save-005.md
- Run log: spec/log/2026-10-31-007-evolution.md
- Contradictions: spec/contradictions.md (resolved by user decision)
- Summary: The user allowed browser requests to free data sources that expose only generic request data such as IP (yen rate via Frankfurter, Fuji visibility via Open-Meteo), replacing the build-time-only approach. Itinerary supplied (Tokyo 5–10 Nov, Osaka 11–16, Okinawa 17–26, Tokyo 27–29, Italy 30 Nov). Homepage reworked: preflight removed from landing day, yen widget headline rate with JPY → EUR table only, clock and yen in one row, checklists merged under a Preflight | Flight switch after that row (revises R5, R6). Fuji tool requested now.

## 2026-10-31 — Proposal approved (third approval)

- Event: proposal approved
- Archive: spec/proposals/2026-10-31-c-approved.md (copy of draft.md; draft.md kept as the working copy)
- Lifecycle state: Implementation (Refinement) (unchanged by approval)
- Summary: The draft built from conversation save 005 was adopted into spec/current-state.md. R4 now holds the supplied itinerary; R5, R6, R7 and R8 describe the reworked homepage (clock and yen in one row, merged checklist section with a Preflight | Flight switch, preflight absent from landing day, yen headline rate with JPY → EUR table only, visible after the trip); R13 hands the Fuji tool to new R26 (one component on the homepage and the Tools page); R17 is extended to allow browser requests to free data sources that expose only generic data such as IP, and the technical constraint now allow-lists api.frankfurter.dev and api.open-meteo.com. One soul principle was appended; three backlog items were added to spec/roadmap.md. spec/proposal.md, spec/docs/ and implementation/ were not changed.

## 2026-10-31 — Conversation save 006: open questions answered, more Fuji viewpoints (CONFIRMS)

- Event: conversation_save
- Classification: CONFIRMS
- Source: spec/docs/normalized/2026-10-31-conversation-save-006.md
- Run log: spec/log/2026-10-31-008-evolution.md
- Summary: Records the user's answers that were folded into approval c (yen visible after the trip; one Fuji component on homepage and Tools; itinerary dates fixed in the file). Deepens R26 with four more Fuji viewpoints — Mount Takao summit, Mount Mitake (御岳山), Kamakura beaches & Enoshima, Shizuoka (Nihondaira, Miho) — for seven in total, already implemented. Blueprint fuji.md lags and needs regenerating. Confirms streak: 1.

## 2026-10-31 — Proposal approved (fourth approval)

- Event: proposal approved
- Archive: spec/proposals/2026-10-31-d-approved.md (copy of draft.md; draft.md kept as the working copy)
- Lifecycle state: Implementation (Refinement) (unchanged by approval)
- Summary: The draft built from conversation save 006 was adopted into spec/current-state.md. R26 now names the seven Fuji viewpoints — Tokyo, Mount Takao (summit), Mount Mitake, Kamakura beaches & Enoshima (one row), Hakone, Lake Kawaguchiko and Shizuoka (Nihondaira, Miho) — still fetched in a single request, and its acceptance criterion covers each viewpoint. No soul implication and no new roadmap items, so soul.md and roadmap.md were not changed. spec/proposal.md, spec/docs/ and implementation/ were not changed.

## 2026-10-31 — Conversation save 007: stale Fuji cache fix, verdict icons (CONFIRMS)

- Event: conversation_save
- Classification: CONFIRMS
- Source: spec/docs/normalized/2026-10-31-conversation-save-007.md
- Run log: spec/log/2026-10-31-009-evolution.md
- Summary: Deepens R26. A saved forecast is discarded when its viewpoint set differs from the current one (fixes blank rows after adding viewpoints). Each Fuji verdict gets an inline SVG icon (Good: sun; Maybe: sun behind cloud; Unlikely: clouded summit), decorative next to the text verdict, coloured from new `--fuji-*` theme tokens (R20), ~0.5 kB and no requests (R18). Phone layout puts the place name on its own line. All implemented; blueprint fuji.md lags. Confirms streak: 2.

## 2026-10-31 — Proposal approved (fifth approval)

- Event: proposal approved
- Archive: spec/proposals/2026-10-31-e-approved.md (copy of draft.md; draft.md kept as the working copy)
- Lifecycle state: Implementation (Refinement) (unchanged by approval)
- Summary: The draft built from conversation save 007 was adopted into spec/current-state.md. R26 now pairs each Fuji verdict with a small decorative icon (Good: Fuji with sun; Maybe: sun half behind a cloud; Unlikely: clouds over the summit), drawn inline with theme colours and no extra requests, and reuses a saved forecast only when it covers exactly the current viewpoints. Two acceptance criteria were added for these. No soul implication and no new roadmap items, so soul.md and roadmap.md were not changed. spec/proposal.md, spec/docs/ and implementation/ were not changed.
