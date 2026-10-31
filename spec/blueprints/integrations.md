# Integrations

_Purpose: define every outside source the site uses, and the rules that keep them within the approved constraints: free, not paid, no CMS or database, and no tracking of the travellers._

## Rules for any integration

1. **Free.** No paid tier, no paid plan, no billing account.
2. **No structural services.** No CMS, no database, no hosted backend.
3. **No tracking.** No analytics, no advertising, no session recording, no error-reporting SDK in the browser.
4. **Build-time only by default.** Data that changes is fetched during the build and stored in the site. The travellers' browsers do not contact the source.
5. **No key in the browser.** Any key needed at build time is held in the environment, never shipped to the browser.

## Daily yen exchange rate

- **Used by:** the yen widget (`homepage.md`).
- **When fetched:** during `npm run build` (the `prebuild` step).
- **Source:** a free public exchange-rate source that needs no account and no key. The exact source is chosen during implementation and must meet rules 1–5. Its name is recorded in `rates.json`.
- **Output:** `src/generated/rates.json` (see `data-model.md`).
- **Daily refresh:** the site is rebuilt once a day by a scheduled trigger on the hosting platform's free scheduler (see `deployment.md`). The mechanism is confirmed during implementation.
- **Fallback:** if the fetch fails, the build copies `content/rates.last.json` (committed) into `rates.json` with `stale: true`. The build does not fail for this reason alone.
- **Staleness:** the widget labels the rate as possibly out of date when its date is more than 7 days old.

## Fuji visibility tool (later iteration)

- **Used by:** the Tools page, as a future entry.
- **Approach:** the same as the exchange rate. Fetch during build from reliable, free public sources, store the result, and show it with its date.
- **Not allowed:** a browser request to a weather or camera service at run time.
- **Open detail for its own blueprint:** the list of locations and the sources, decided when the tool is built.

## Hotel address cards (later iteration)

- **Used by:** the Tools page, as a future entry.
- **Data:** the user's own list of addresses, by date and city, supplied as a file. No external API.

## Maps

- Places in suggestions may link to a map. The link opens the travellers' own maps app only when tapped.
- No embedded maps. An embedded map loads a third-party page, which breaks rule 3 and costs data.

## Explicitly excluded

- Analytics, tag managers and advertising scripts.
- Web-font services (fonts are system fonts).
- Embedded third-party widgets, comment systems and social embeds.
- Paid APIs and any service with a paid tier.
- CMS and database services.

## Acceptance criteria

- [ ] `package.json` contains no analytics, advertising, error-reporting or CMS package.
- [ ] The built site makes no request to any third-party host at run time.
- [ ] A forced fetch failure during build produces `rates.json` with `stale: true` and the build still succeeds.
- [ ] The chosen exchange-rate source requires no account, no key and no payment.
