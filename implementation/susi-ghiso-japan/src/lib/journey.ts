// Japan-time state machine (blueprint: homepage.md, data-model.md).
import itineraryData from "@/generated/itinerary.json";

export type Flight = { id: string; departs: string; arrives: string; from: string; to: string };
export type Day = { date: string; location: string; notes?: string };
export type Itinerary = { timezone: string; flights?: Flight[]; days?: Day[] } | null;

export type JourneyState = "pre-trip" | "in-transit" | "in-japan" | "after-trip";

export type Journey = {
  state: JourneyState;
  location: string | null;
};

export const itinerary = itineraryData as Itinerary;

// YYYY-MM-DD for a given instant, as a calendar date in Japan.
export function japanDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function computeJourney(it: Itinerary, now: Date): Journey {
  if (!it) return { state: "pre-trip", location: null };
  const days = [...(it.days ?? [])].sort((a, b) => a.date.localeCompare(b.date));
  const firstDay = days[0];
  const lastDay = days[days.length - 1];
  const today = japanDate(now);
  const outbound = it.flights?.[0];

  if (outbound) {
    if (now.getTime() < Date.parse(outbound.departs)) {
      return { state: "pre-trip", location: firstDay?.location ?? null };
    }
    if (now.getTime() < Date.parse(outbound.arrives)) {
      return { state: "in-transit", location: "In transit" };
    }
  } else if (firstDay && today < firstDay.date) {
    return { state: "pre-trip", location: firstDay.location };
  }

  if (!lastDay || today > lastDay.date) return { state: "after-trip", location: null };

  const exact = days.find((d) => d.date === today);
  const earlier = days.filter((d) => d.date <= today).at(-1);
  return { state: "in-japan", location: (exact ?? earlier)?.location ?? null };
}
