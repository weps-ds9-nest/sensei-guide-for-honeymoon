// Day-trip picker for /tools (blueprint: daytrips.md). Pick a city, choose exactly 3 interests, get one day trip.
// All options, combinations and destination cards are edited in content/daytrips/.
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dayTripCities, PICKS, resolveDayTrip, type Destination } from "@/lib/daytrips";

const toggleBase =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";
const toggleOn = "border-primary bg-primary text-primary-foreground";
const toggleOff = "border-border bg-card text-card-foreground hover:bg-accent";

function ResultCard({ destination }: { destination: Destination }) {
  return (
    <article className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-lg bg-linear-135 from-shell to-maple text-on-image shadow-sm">
      {destination.image && (
        <img src={destination.image} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-scrim/90 via-scrim/45 to-scrim/0" />
      <div className="relative flex flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Your day trip</p>
        <h3 className="text-3xl font-bold leading-tight tracking-tight">{destination.title}</h3>
        {destination.summary && <p className="text-sm leading-relaxed opacity-90">{destination.summary}</p>}
        {destination.links.length > 0 && (
          <ul className="mt-2 flex flex-col">
            {destination.links.map((link) => (
              <li key={link.url} className="border-t border-on-image/25">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex min-h-11 items-center justify-between gap-3 text-sm font-semibold hover:underline"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function DayTripPicker() {
  const headingId = useId();
  const [cityId, setCityId] = useState(dayTripCities[0]?.id);
  const [picked, setPicked] = useState<string[]>([]);
  const city = dayTripCities.find((c) => c.id === cityId);
  if (!city) return null;

  const full = picked.length === PICKS;
  const left = PICKS - picked.length;
  const result = full ? resolveDayTrip(city, picked) : undefined;

  const chooseCity = (id: string) => {
    setCityId(id);
    setPicked([]);
  };
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < PICKS ? [...p, id] : p));

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-b-2 border-foreground pb-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight">
          Pick a day trip
        </h2>
        <p className="text-sm text-muted-foreground">Choose a base city, then the {PICKS} things you want most from the day.</p>
      </div>

      {dayTripCities.length > 1 && (
        <div role="group" aria-label="Base city" className="inline-flex w-fit rounded-md border border-border bg-card p-1">
          {dayTripCities.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={c.id === city.id}
              onClick={() => chooseCity(c.id)}
              className={cn(
                "min-h-11 rounded-sm px-5 text-sm font-semibold transition-colors",
                c.id === city.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold" aria-live="polite">
            Pick {PICKS}
            <span className="font-normal text-muted-foreground"> · {full ? "done" : `${left} left`}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {city.options.map((o) => {
              const on = picked.includes(o.id);
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={on}
                  disabled={full && !on}
                  onClick={() => toggle(o.id)}
                  className={cn(toggleBase, on ? toggleOn : toggleOff)}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {picked.length > 0 && (
            <button type="button" onClick={() => setPicked([])} className="w-fit min-h-11 text-sm font-semibold text-muted-foreground underline">
              Start over
            </button>
          )}
        </div>

        <div aria-live="polite">
          {!full ? (
            <Placeholder>
              Pick {left} more {left === 1 ? "interest" : "interests"} to see your day trip.
            </Placeholder>
          ) : result ? (
            <ResultCard key={result.slug} destination={result} />
          ) : (
            <Placeholder>No suggestion for this mix yet. Try swapping one pick.</Placeholder>
          )}
        </div>
      </div>
    </section>
  );
}
