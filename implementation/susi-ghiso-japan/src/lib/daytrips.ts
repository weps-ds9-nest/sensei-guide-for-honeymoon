// Day-trip picker data and lookup (blueprint: daytrips.md). Data comes from content/daytrips via build-content.mjs.
import generated from "@/generated/daytrips.json";

export const PICKS = 3;

export type DayTripOption = { id: string; label: string };
export type DayTripCity = { id: string; label: string; options: DayTripOption[]; results: Record<string, string | null> };
export type Destination = { slug: string; title: string; summary: string; image: string | null; links: { label: string; url: string }[] };

const data = generated as unknown as { cities: DayTripCity[]; destinations: Record<string, Destination> };
export const dayTripCities = data.cities;

/** undefined = combination not listed or empty; Destination = the answer. Pick order does not matter. */
export function resolveDayTrip(city: DayTripCity, picked: string[]): Destination | undefined {
  const slug = city.results[[...picked].sort().join("+")];
  return slug ? data.destinations[slug] : undefined;
}
