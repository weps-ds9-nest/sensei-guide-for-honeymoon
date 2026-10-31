import { useEffect, useState } from "react";

const ZONES = [
  { label: "Japan", zone: "Asia/Tokyo" },
  { label: "Rome", zone: "Europe/Rome" },
] as const;

const TIME = (zone: string) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
const DATE = (zone: string) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", day: "2-digit", month: "short" });

export function Clock() {
  const [now, setNow] = useState(() => new Date());

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
    <section aria-label="Current time" className="grid grid-cols-2 gap-3">
      {ZONES.map(({ label, zone }) => (
        <div key={zone} className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{TIME(zone).format(now)}</p>
          <p className="text-xs text-muted-foreground">{DATE(zone).format(now)}</p>
        </div>
      ))}
    </section>
  );
}
