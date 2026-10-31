// Japan and Rome time, side by side. Japan carries the maple "now" rule (the signature).
import { useEffect, useId, useState } from "react";

const ZONES = [
  { label: "Japan", zone: "Asia/Tokyo", now: true },
  { label: "Rome", zone: "Europe/Rome", now: false },
] as const;

const TIME = (zone: string) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
const DATE = (zone: string) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", day: "2-digit", month: "short" });

export function Clock() {
  const [now, setNow] = useState(() => new Date());
  const headingId = useId();

  useEffect(() => {
    const tick = () => {
      if (!document.hidden) setNow(new Date());
    };
    const id = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="text-xl font-semibold tracking-tight">
        Time
      </h2>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 sm:gap-6">
        {ZONES.map(({ label, zone, now: isNow }) => (
          <div key={zone} className={isNow ? "border-t-2 border-maple pt-3" : "border-t border-border pt-3"}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums sm:text-3xl">{TIME(zone).format(now)}</p>
            <p className="text-sm text-muted-foreground">{DATE(zone).format(now)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
