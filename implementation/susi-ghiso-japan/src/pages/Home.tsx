// Homepage dashboard (blueprint: homepage.md). Modules are removed, not greyed out, when hidden.
import { useEffect, useState } from "react";
import checklistData from "@/generated/checklists.json";
import { Checklist } from "@/components/Checklist";
import { Clock } from "@/components/Clock";
import { YenWidget } from "@/components/YenWidget";
import { computeJourney, itinerary } from "@/lib/journey";

const checklists = checklistData as { preflight: { id: string; label: string }[]; flight: { id: string; label: string }[] };
const MINUTE = 60_000;

export function Home() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const refresh = () => {
      if (!document.hidden) setNow(new Date());
    };
    const id = window.setInterval(refresh, MINUTE);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const journey = computeJourney(itinerary, now);
  const showFlight = journey.state === "pre-trip" || journey.state === "in-transit";

  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Japan · Honeymoon</p>
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        {journey.location && <p className="mt-1 text-sm text-muted-foreground">{journey.state === "in-japan" ? `Today: ${journey.location}` : journey.location}</p>}
      </header>

      <Checklist title="Preflight" group="preflight" items={checklists.preflight} />
      <Clock />
      {showFlight && <Checklist title="Flight" group="flight" items={checklists.flight} />}
      <YenWidget />
    </div>
  );
}
