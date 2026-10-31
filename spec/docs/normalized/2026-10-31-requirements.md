---
date: 2026-10-31
agent: Other
platform: other
---

# Requirements (user-authored drop, normalized)

Source: `spec/docs/2026-10-31-requirements.md` (raw, immutable). Approved by the user on 2026-10-31.

## Key claims

1. **Product scope:** a homepage dashboard plus four pages — Guides, Tools, Suggestions, Shop. Mobile-friendly; performance is the top priority because friends travel on an e-SIM and must limit data.
2. **Guides:** a few suggestions and best tricks shown as a cards grid; opening a guide shows its content on the same page.
3. **Content engine:** content is written as Markdown files, one per entry, so new entries can be added without changing site code.
4. **Tools and Shop:** created as empty pages for now; contents will be defined by the user later.
5. **Suggestions:** tips on where to go, what to see and where to eat, presented as city routes with a high visual reference (photos per stop). This is the most visual part of the site.
6. **Privacy:** not traceable by any crawler or bot; as private as possible. A simple login page (passphrase) if necessary. No third-party trackers, analytics or external requests.
7. **Stack:** built on shadcn as the base component system; hosted on Vercel.
8. **Design:** a `design.md` dictates look and aesthetic, and the implementation must follow it.
9. **Deadline:** set up within about 4 hours.
