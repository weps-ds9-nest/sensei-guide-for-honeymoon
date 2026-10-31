# Prerequisites

_Purpose: list the accounts, services and credentials needed before implementation and deployment. Values are never stored in this file._

## 1. Vercel account

- The user creates or reuses a personal Vercel account.
- The Vercel CLI is installed (`npm i -g vercel`) and logged in on the developer's machine with `vercel login`. This is an interactive step the user runs.
- A Vercel project is created for the site with the random name described in `deployment.md`.
- **Produces:** a logged-in CLI session. No token is copied into the repository.

## 2. Free exchange-rate source

- Chosen: **Frankfurter** (ECB reference rates), `api.frankfurter.dev`. No account, no key, no payment.
- Used at build time and from the browser (see `integrations.md`).
- **Produces:** the source name, recorded in `rates.json` at build time.
- **Credential:** none, if the source needs no key. If a key is ever required, the key goes in `.env.local` and is added to the registry below before use.

## 3. Free weather source

- Chosen: **Open-Meteo** forecast API, `api.open-meteo.com`. No account, no key, no payment.
- Used from the browser by the Fuji tool (see `fuji.md`).
- **Credential:** none.

## 4. Itinerary file

- Supplied: `content/itinerary.json` holds the trip days. The user will correct exact dates in the file when confirmed; flight times are added when known.
- **Produces:** the itinerary data itself, committed to the repository.

## 5. Passphrase (phases 3–4, deferred)

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
- [x] Free exchange-rate source chosen (Frankfurter) and confirmed to need no key or payment.
- [x] Free weather source chosen (Open-Meteo) and confirmed to need no key or payment.
- [x] Itinerary JSON received (dates to be corrected by the user; not a blocker).
