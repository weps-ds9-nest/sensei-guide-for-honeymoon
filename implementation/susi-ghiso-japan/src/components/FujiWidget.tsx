// Fuji visibility estimate, one component for the homepage and /tools (blueprint: fuji.md).
// Ruled rows like the checklists; verdicts are text, never colour alone.
import { useId, useState } from "react";
import { Link } from "@/lib/router";
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

// compact (homepage): one viewpoint at a time via a dropdown, plus a link to the full list on /tools.
export function FujiWidget({ compact = false }: { compact?: boolean }) {
  const headingId = useId();
  const selectId = useId();
  const state = useFuji();
  const [picked, setPicked] = useState<string | null>(null);

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
          {(() => {
            const all = scoreFuji(state.data, ...fujiDates(new Date()));
            const current = all.find((vp) => vp.id === picked) ?? all[0];
            const shown = compact ? (current ? [current] : []) : all;
            return (
              <>
                {compact && all.length > 1 && (
                  <div className="flex flex-col gap-1">
                    <label htmlFor={selectId} className="text-xs text-muted-foreground">Viewpoint</label>
                    <select
                      id={selectId}
                      value={current?.id}
                      onChange={(e) => setPicked(e.target.value)}
                      className="rounded-md border border-border bg-card px-3 py-2 text-sm"
                    >
                      {all.map((vp) => (
                        <option key={vp.id} value={vp.id}>{vp.label}</option>
                      ))}
                    </select>
                  </div>
                )}
          <ul className="flex flex-col">
            {shown.map((vp) => (
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
              </>
            );
          })()}
          <p className="text-xs text-muted-foreground">
            {state.status === "saved" ? "Last saved forecast" : "Forecast"} {TIME_JP.format(new Date(state.data.fetchedAt))}, Japan time · Open-Meteo
          </p>
        </>
      )}

      {compact && (
        <Link to="/tools" className="text-sm font-semibold text-muted-foreground hover:underline">
          All viewpoints in Tools →
        </Link>
      )}
    </section>
  );
}
