// Daily yen rate (blueprint: integrations.md, data-model.md).
// Fetches at build time from Frankfurter (free, no key, no account; ECB reference rates).
// On failure, falls back to content/rates.last.json and marks the output stale.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAST = path.join(ROOT, "content", "rates.last.json");
const OUT = path.join(ROOT, "src", "generated", "rates.json");
const URL_RATES = "https://api.frankfurter.dev/v1/latest?base=JPY&symbols=EUR";
const SOURCE = "Frankfurter (ECB reference rates)";

async function fetchRate() {
  const res = await fetch(URL_RATES, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const rate = json?.rates?.EUR;
  if (typeof rate !== "number" || !json.date) throw new Error("unexpected response shape");
  return { fetchedAt: new Date().toISOString(), rateDate: json.date, source: SOURCE, eurPerJpy: rate, stale: false };
}

async function main() {
  await mkdir(path.dirname(OUT), { recursive: true });
  try {
    const rate = await fetchRate();
    await writeFile(LAST, JSON.stringify(rate, null, 2) + "\n");
    await writeFile(OUT, JSON.stringify(rate));
    console.log(`[rates] ${rate.eurPerJpy} EUR per JPY (rate date ${rate.rateDate})`);
  } catch (err) {
    const last = JSON.parse(await readFile(LAST, "utf8"));
    await writeFile(OUT, JSON.stringify({ ...last, stale: true }));
    console.warn(`[rates] fetch failed (${err.message}); using committed rate from ${last.rateDate}, marked stale`);
  }
}

main();
