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
