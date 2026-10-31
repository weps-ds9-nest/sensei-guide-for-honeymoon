// Yen conversion table at the build-time daily rate (blueprint: homepage.md, integrations.md).
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rate } from "@/lib/rates";

const JPY_ROWS = [1000, 5000, 10000, 50000, 100000];
const EUR_ROWS = [10, 50, 100];
const DAY_MS = 24 * 60 * 60 * 1000;

const eur = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const jpy = (n: number) => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(n);

export function YenWidget() {
  const rateAgeDays = Math.floor((Date.now() - Date.parse(rate.rateDate)) / DAY_MS);
  const outdated = rate.stale || rateAgeDays > 7;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yen, quick reference</CardTitle>
        <p className="text-xs text-muted-foreground">
          Rate of {rate.rateDate} · {rate.source}
          {rate.stale ? " · last saved rate" : ""}
        </p>
        {outdated && <p className="text-xs font-medium text-destructive">Rate may be out of date.</p>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-6 text-sm">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">JPY → EUR</p>
            <ul className="grid gap-1">
              {JPY_ROWS.map((y) => (
                <li key={y} className="flex justify-between tabular-nums">
                  <span>{jpy(y)}</span>
                  <span className="font-medium">≈ {eur(y * rate.eurPerJpy)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">EUR → JPY</p>
            <ul className="grid gap-1">
              {EUR_ROWS.map((e) => (
                <li key={e} className="flex justify-between tabular-nums">
                  <span>{eur(e)}</span>
                  <span className="font-medium">≈ {jpy(Math.round(e / rate.eurPerJpy / 100) * 100)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
