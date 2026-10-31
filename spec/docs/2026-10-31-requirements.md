# Requirements drop: Susi Ghiso Japan

_Dropped: 2026-10-31. Raw input from the user. Immutable once dropped._

## Product

A small private single-page guide for friends on their honeymoon in Japan. Four pages besides a homepage dashboard, mobile-friendly, performance as the top priority: the friends travel on an e-SIM, so every byte counts.

- **Homepage (dashboard):** entry point with a tile per section and a short "latest" list.
- **Guides:** a few suggestions and best tricks, shown as a cards grid. Opening a guide shows its content on the same page.
- **Tools:** a few useful things for Japan. Leave blank for now; the user will define contents later.
- **Suggestions:** where to go, what to see, where to eat. The most visual part: city routes with a high visual reference (photos per stop).
- **Shop:** leave blank for now; the user will define it later.

## Content engine

- Content is authored as Markdown files, one file per entry, so new entries can be added without touching the site code.
- The engine turns those files into the pages above at build time.

## Privacy and access

- Must not be traceable by any crawler or bot. As private as possible.
- A simple login page (passphrase) if necessary.
- No third-party trackers, analytics, or external requests.

## Performance and data

- Mobile-first, works well on a phone on e-SIM data.
- Minimal transfer size; repeat visits should cost almost nothing.

## Stack and tooling

- **Base:** build the project using **shadcn** as the base component system.
- **Hosting:** Vercel.
- **Design source of truth:** a `design.md` must dictate how the project works in terms of look and aesthetic. The implementation must follow it.

## Deadline

Set up within the next 4 hours (per the original proposal).
