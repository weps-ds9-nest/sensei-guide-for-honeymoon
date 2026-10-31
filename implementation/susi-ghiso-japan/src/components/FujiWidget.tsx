// Fuji visibility estimate, one component for the homepage and /tools (blueprint: fuji.md).
// Ruled rows like the checklists; verdicts are text, never colour alone.
import { useId } from "react";
import { FujiIcon } from "@/components/FujiIcon";
import { fujiDates, scoreFuji, useFuji, type DayEstimate, type Verdict } from "@/lib/fuji";

const TIME_JP = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false });

const VERDICT_CLASS: Record<Verdict, string> = {
  Good: "font-semibold text-foreground",
  Maybe: "font-semibold text-alert",
  Unlikely: "text-muted-foreground",
};

function Day({ label, day }: { label: string; day: DayEstimate }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      {day ? (
        <div className="flex items-center gap-2">
          <FujiIcon verdict={day.verdict} className="h-6 w-8 shrink-0" />
          <div className="flex flex-col">
            <span className={VERDICT_CLASS[day.verdict]}>{day.verdict}</span>
            {day.best && <span className="text-xs tabular-nums text-muted-foreground">{day.best}</span>}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground">—</span>
      )}
    </div>
  );
}

export function FujiWidget() {
  const headingId = useId();
  const state = useFuji();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 border-b-2 border-foreground pb-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight">
          Fuji today
        </h2>
        <p className="text-sm text-muted-foreground">Estimate from cloud forecasts, not a camera.</p>
      </div>

      {state.status === "loading" && <p className="text-sm text-muted-foreground">Loading forecast…</p>}
      {state.status === "none" && <p className="text-sm text-muted-foreground">Forecast unavailable offline.</p>}

      {(state.status === "fresh" || state.status === "saved") && (
        <>
          <ul className="flex flex-col">
            {scoreFuji(state.data, ...fujiDates(new Date())).map((vp) => (
              <li
                key={vp.id}
                className="grid grid-cols-2 items-start gap-x-3 gap-y-2 border-b border-border py-3 text-sm last:border-b-0 sm:grid-cols-[minmax(0,1fr)_8.5rem_8.5rem]"
              >
                <span className="col-span-2 font-medium sm:col-span-1">{vp.label}</span>
                <Day label="Today" day={vp.days[0]} />
                <Day label="Tomorrow" day={vp.days[1]} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            {state.status === "saved" ? "Last saved forecast" : "Forecast"} {TIME_JP.format(new Date(state.data.fetchedAt))}, Japan time · Open-Meteo
          </p>
        </>
      )}
    </section>
  );
}
