// Yen headline rate and JPY → EUR table at the daily rate, live with build-time fallback (blueprint: homepage.md, integrations.md).
import { useId } from "react";
import { useRate } from "@/lib/rates";

const JPY_ROWS = [1000, 5000, 10000, 50000, 100000];
const DAY_MS = 24 * 60 * 60 * 1000;

const eur = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const jpy = (n: number) => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(n);

export function YenWidget() {
  const headingId = useId();
  const rate = useRate();
  const rateAgeDays = Math.floor((Date.now() - Date.parse(rate.rateDate)) / DAY_MS);
  const outdated = rate.stale || rateAgeDays > 7;
  const yenPerEur = Math.round(1 / rate.eurPerJpy);

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="flex flex-col gap-1">
          <h2 id={headingId} className="text-xl font-semibold tracking-tight">
            Yen, quick reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Rate of {rate.rateDate} · {rate.source}
            {rate.stale ? " · last saved rate" : ""}
          </p>
          {outdated && <p className="text-sm font-medium text-alert">Rate may be out of date.</p>}
        </div>
        <p className="text-3xl font-bold leading-none tracking-tight tabular-nums sm:text-4xl" aria-label={`1 euro equals ${yenPerEur} yen`}>
          1 € = {yenPerEur} ¥
        </p>
      </div>

      <div>
        <p className="border-b-2 border-foreground pb-1 text-sm font-semibold">JPY → EUR</p>
        <ul className="flex flex-col">
          {JPY_ROWS.map((y) => (
            <li key={y} className="flex justify-between gap-2 border-b border-border py-2 text-sm tabular-nums">
              <span>{jpy(y)}</span>
              <span className="font-semibold">≈ {eur(y * rate.eurPerJpy)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
