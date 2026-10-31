# Contradictions: Susi Ghiso Japan

_Maintained by the evolution agent. Append-only. Each entry names the claim that contradicts a prior conclusion and how it was resolved._

---

## 2026-10-31 — Third-party restriction revised (conversation save 002)

- **Contradicting claim:** "No paid third party services, nor structure services such as CMS and databases or anything that tracks user data." Free third-party data sources are not excluded. Source: `spec/docs/normalized/2026-10-31-conversation-save-002.md`, claim 1.
- **Prior conclusion contradicted:** "No trackers, analytics or external requests" (R9/R17 in `spec/docs/normalized/2026-10-31-requirements.md`, and the 2026-10-31 draft).
- **Status:** resolved by user clarification in the same input. The restriction is narrowed to paid, structural and user-tracking services.
- **Still to decide in the blueprint:** whether external data (the daily yen rate, the Fuji visibility tool) is fetched at build time or by the browser. Browser fetches would still send requests to the data provider, so this is a design choice, not a contradiction.

## 2026-10-31 — Yen widget visible in Japan (conversation save 004)

- **Contradicting claim:** "Yes, of course I want the yen widget to be present in Japan too." Source: `spec/docs/normalized/2026-10-31-conversation-save-004.md`, claim 1.
- **Prior conclusion contradicted:** approved R8 in `spec/current-state.md`: the yen widget is hidden after landing.
- **Status:** resolved by user decision. R8 is revised in the refreshed draft. Whether the widget shows after the trip is an open question.

## 2026-10-31 — Browser calls to free data sources (conversation save 005)

- **Contradicting claim:** "I want to extend the privacy clause so that we can make these calls to external websites if it's just generic things like their IP. Both for the fuji tool and the currency exchange." Source: `spec/docs/normalized/2026-10-31-conversation-save-005.md`, claim 1.
- **Prior conclusion contradicted:** `spec/current-state.md` § Technical Constraints ("Data that changes … may be fetched at build time so that friends' browsers make no extra requests"), and blueprint `integrations.md` rule 4 plus "Not allowed: a browser request to a weather or camera service at run time".
- **Status:** resolved by user decision. R17 is unchanged (free, no tracking); the build-time-only approach is lifted for requests that expose only generic data such as IP.

## 2026-10-31 — Homepage order (conversation save 005)

- **Contradicting claim:** clock and yen widget in one row, followed by a single checklist section with a Preflight | Flight segmented control. Source: `spec/docs/normalized/2026-10-31-conversation-save-005.md`, claim 5.
- **Prior conclusion contradicted:** R5 ("clock … directly before the checklist") and R6 ("preflight to-do list at the top of the homepage content") in `spec/current-state.md`.
- **Status:** resolved by user decision (implemented at the user's request).
