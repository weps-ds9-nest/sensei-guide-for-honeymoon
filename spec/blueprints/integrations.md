# Integrations

_Purpose: define every outside source the site uses, and the rules that keep them within the approved constraints: free, not paid, no CMS or database, no tracking of the travellers, and browser requests that expose only generic request data._

## Rules for any integration

1. **Free.** No paid tier, no paid plan, no billing account.
2. **No structural services.** No CMS, no database, no hosted backend.
3. **No tracking.** No analytics, no advertising, no session recording, no error-reporting SDK in the browser.
4. **Browser requests are allowed only to allow-listed free data hosts** (R17). A request may expose generic request data, such as the travellers' IP address, and nothing more: no account, key, cookie, identifier or personal data in the URL, headers or body. Every such request is a plain `GET` with `credentials: "omit"` and `referrerPolicy: "no-referrer"`.
5. **Allow-list.** Exactly two hosts: `api.frankfurter.dev` and `api.open-meteo.com`. The Content-Security-Policy `connect-src` names exactly these (see `deployment.md`). Adding a host needs a blueprint update.
6. **No key in the browser.** Any key needed at build time is held in the environment, never shipped to the browser.
7. **Graceful failure.** A failed browser request never breaks a page; each integration defines its fallback.

## Daily yen exchange rate

- **Used by:** the yen widget (`homepage.md`).
- **Source:** Frankfurter (ECB reference rates), `https://api.frankfurter.dev/v1/latest?base=JPY&symbols=EUR`. Free, no account, no key.
- **Build time:** the `prebuild` step fetches the rate and writes `src/generated/rates.json` (see `data-model.md`). If the fetch fails, the build copies `content/rates.last.json` (committed) with `stale: true`. The build does not fail for this reason alone.
- **Run time:** on load, the yen widget fetches the same URL from the browser. The result is cached in `localStorage` under `sgj:rate:v1` (see `data-model.md`); a cached rate younger than **6 hours** is used without a new request.
- **Which rate is shown:** the one with the latest `rateDate` among the live response, the cache and the build-time rate. The build-time rate is always available, so the widget never shows an empty state.
- **Staleness:** the widget labels the rate as possibly out of date when the shown rate's date is more than 7 days old.
- **Daily rebuild:** kept, so the build-time fallback stays recent (see `deployment.md`).

## Fuji visibility tool

- **Used by:** the homepage and the Tools page (`fuji.md`).
- **Source:** Open-Meteo forecast API, `https://api.open-meteo.com/v1/forecast`. Free, no account, no key.
- **Run time only.** No build-time copy: a forecast fetched at build would be stale within hours.
- Request shape, scoring, caching and fallback are defined in `fuji.md`.

## Hotel address cards (later iteration)

- **Used by:** the Tools page, as a future entry.
- **Data:** the user's own list of addresses, by date and city, supplied as a file. No external API.

## Maps

- Places in suggestions may link to a map. The link opens the travellers' own maps app only when tapped.
- No embedded maps. An embedded map loads a third-party page, which breaks rule 3 and costs data.

## Explicitly excluded

- Analytics, tag managers and advertising scripts.
- Web-font services (fonts are system fonts).
- Embedded third-party widgets, live cameras, comment systems and social embeds.
- Paid APIs and any service with a paid tier.
- CMS and database services.

## Acceptance criteria

- [ ] `package.json` contains no analytics, advertising, error-reporting or CMS package.
- [ ] In the browser network panel, the only third-party hosts contacted are `api.frankfurter.dev` and `api.open-meteo.com`.
- [ ] Those requests carry no cookie, no key and no `Referer` header.
- [ ] A forced fetch failure during build produces `rates.json` with `stale: true` and the build still succeeds.
- [ ] With the network off, the yen widget shows the cached or build-time rate.
- [ ] Both sources require no account, no key and no payment.
