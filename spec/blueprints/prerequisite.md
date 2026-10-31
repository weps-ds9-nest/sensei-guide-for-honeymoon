# Prerequisites

_Purpose: list the accounts, services and credentials needed before implementation and deployment. Values are never stored in this file._

## 1. Vercel account

- The user creates or reuses a personal Vercel account.
- The Vercel CLI is installed (`npm i -g vercel`) and logged in on the developer's machine with `vercel login`. This is an interactive step the user runs.
- A Vercel project is created for the site with the random name described in `deployment.md`.
- **Produces:** a logged-in CLI session. No token is copied into the repository.

## 2. Free exchange-rate source

- A free public source that publishes daily EUR/JPY rates, with no account, no key and no payment, is chosen during implementation.
- The chosen source must meet every rule in `integrations.md`.
- **Produces:** the source name, recorded in `rates.json` at build time.
- **Credential:** none, if the source needs no key. If a key is ever required, the key goes in `.env.local` and is added to the registry below before use.

## 3. Itinerary file

- The user supplies `content/itinerary.json` after the first stages are running.
- This is not needed to start implementation. It is needed to finish the homepage state logic (`homepage.md`).
- **Produces:** the itinerary data itself, committed to the repository.

## 4. Passphrase (phases 3–4, deferred)

- A passphrase is given to the friends in phase 3–4.
- It is not needed now and is not required for implementation of phases 1–2.
- When phase 3–4 starts, the passphrase is set as a Vercel environment variable and added to this registry.

## Credentials Registry

| Variable | Status | Consumed by |
|---|---|---|
| _none required in phases 1–2_ | — | — |
| `SITE_PASSPHRASE` (phase 3–4, deferred) | not yet required | Vercel project environment; build step that encrypts content |

Values are never written in this file or in the repository.

## Readiness Checklist

- [ ] Vercel account exists and the user can open its dashboard.
- [ ] Vercel CLI is logged in on the developer's machine.
- [ ] Vercel project created with the random name from `deployment.md`.
- [ ] Free exchange-rate source chosen and confirmed to need no key or payment.
- [ ] Itinerary JSON received (needed before the homepage state logic can be finished, not before implementation starts).
