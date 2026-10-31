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
