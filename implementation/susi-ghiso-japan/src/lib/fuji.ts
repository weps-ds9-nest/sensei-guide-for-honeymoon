// Fuji visibility estimate from Open-Meteo cloud and visibility forecasts (blueprint: fuji.md, data-model.md).
// Scoring is pure and testable; the hook handles the cache, the single request and offline fallback.
import { useEffect, useState } from "react";
import { japanDate } from "@/lib/journey";

// ---- Tunable constants (fuji.md § Scoring) ----
export const SUMMIT = { id: "summit", lat: 35.3606, lon: 138.7274 } as const;
export const VIEWPOINTS = [
  { id: "tokyo", label: "Tokyo (city observation decks)", lat: 35.6896, lon: 139.7006, minVisibilityM: 20_000 },
  { id: "takao", label: "Mount Takao (summit)", lat: 35.6251, lon: 139.2437, minVisibilityM: 15_000 },
  { id: "mitake", label: "Mount Mitake", lat: 35.7808, lon: 139.149, minVisibilityM: 20_000 },
  // Shichirigahama, between Kamakura's beaches and Enoshima.
  { id: "kamakura", label: "Kamakura beaches & Enoshima", lat: 35.306, lon: 139.51, minVisibilityM: 20_000 },
  { id: "hakone", label: "Hakone (Lake Ashi)", lat: 35.2048, lon: 139.025, minVisibilityM: 10_000 },
  { id: "kawaguchiko", label: "Lake Kawaguchiko", lat: 35.517, lon: 138.752, minVisibilityM: 10_000 },
  // Nihondaira plateau, above Miho no Matsubara.
  { id: "shizuoka", label: "Shizuoka (Nihondaira, Miho)", lat: 34.9716, lon: 138.466, minVisibilityM: 15_000 },
] as const;
export const THRESHOLDS = {
  summitLowMax: 30, // % — summit low cloud must be below this
  summitMidMax: 40, // % — summit mid cloud must be below this
  viewLowMax: 40, // % — viewpoint low cloud must be below this
  firstHour: 6, // daylight window, Japan time, inclusive
  lastHour: 16,
  goodMinHours: 3, // clear hours for "Good"; 1 or more is "Maybe"
};
const FRESH_MS = 60 * 60 * 1000;
const MAX_SHOW_MS = 24 * 60 * 60 * 1000;
export const FUJI_KEY = "sgj:fuji:v1";

const POINTS = [SUMMIT, ...VIEWPOINTS];
export const FUJI_URL =
  "https://api.open-meteo.com/v1/forecast?" +
  new URLSearchParams({
    latitude: POINTS.map((p) => p.lat).join(","),
    longitude: POINTS.map((p) => p.lon).join(","),
    hourly: "cloud_cover_low,cloud_cover_mid,visibility",
    timezone: "Asia/Tokyo",
    forecast_days: "2",
  }).toString();

// ---- Types ----
export type Hourly = {
  time: string[];
  cloud_cover_low: (number | null)[];
  cloud_cover_mid: (number | null)[];
  visibility: (number | null)[];
};
export type FujiCache = { fetchedAt: string; points: string[]; hourly: Hourly[] };
export type Verdict = "Good" | "Maybe" | "Unlikely";
export type DayEstimate = { date: string; verdict: Verdict; best: string | null } | null;
export type ViewpointEstimate = { id: string; label: string; days: [DayEstimate, DayEstimate] };

// ---- Scoring ----
const pad = (h: number) => String(h).padStart(2, "0");

function estimateDay(summit: Hourly, view: Hourly, minVis: number, date: string): DayEstimate {
  const clearHours: number[] = [];
  let seen = 0;
  view.time.forEach((t, i) => {
    if (!t.startsWith(date)) return;
    const hour = Number(t.slice(11, 13));
    if (hour < THRESHOLDS.firstHour || hour > THRESHOLDS.lastHour) return;
    const j = summit.time.indexOf(t);
    if (j < 0) return;
    seen++;
    const sLow = summit.cloud_cover_low[j];
    const sMid = summit.cloud_cover_mid[j];
    const vLow = view.cloud_cover_low[i];
    const vis = view.visibility[i];
    if (sLow == null || sMid == null || vLow == null || vis == null) return;
    if (sLow < THRESHOLDS.summitLowMax && sMid < THRESHOLDS.summitMidMax && vLow < THRESHOLDS.viewLowMax && vis >= minVis) {
      clearHours.push(hour);
    }
  });
  if (seen === 0) return null;

  // Longest run of consecutive clear hours.
  let best: [number, number] | null = null;
  let start = -1;
  clearHours.forEach((h, k) => {
    if (k === 0 || h !== clearHours[k - 1] + 1) start = h;
    if (!best || h - start > best[1] - best[0]) best = [start, h];
  });

  const n = clearHours.length;
  const verdict: Verdict = n >= THRESHOLDS.goodMinHours ? "Good" : n >= 1 ? "Maybe" : "Unlikely";
  const range = best as [number, number] | null;
  return { date, verdict, best: range ? `${pad(range[0])}:00–${pad(range[1] + 1)}:00` : null };
}

export function scoreFuji(data: FujiCache, today: string, tomorrow: string): ViewpointEstimate[] {
  const summit = data.hourly[data.points.indexOf(SUMMIT.id)];
  return VIEWPOINTS.map((vp) => {
    const view = data.hourly[data.points.indexOf(vp.id)];
    const days: [DayEstimate, DayEstimate] =
      summit && view
        ? [estimateDay(summit, view, vp.minVisibilityM, today), estimateDay(summit, view, vp.minVisibilityM, tomorrow)]
        : [null, null];
    return { id: vp.id, label: vp.label, days };
  });
}

// ---- Storage ----
function readCache(): FujiCache | null {
  try {
    const raw = window.localStorage.getItem(FUJI_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (typeof c?.fetchedAt !== "string" || !Array.isArray(c?.points) || !Array.isArray(c?.hourly)) return null;
    // A forecast saved for a different set of viewpoints (e.g. before one was added) is treated as missing,
    // so the widget refetches instead of showing "—" for the new rows.
    if (c.points.join(",") !== POINTS.map((p) => p.id).join(",") || c.hourly.length !== POINTS.length) return null;
    return c;
  } catch {
    return null;
  }
}

function writeCache(c: FujiCache) {
  try {
    window.localStorage.setItem(FUJI_KEY, JSON.stringify(c));
  } catch {
    /* storage unavailable: the forecast still shows for this visit */
  }
}

const ageMs = (c: FujiCache) => Date.now() - Date.parse(c.fetchedAt);

// ---- Hook ----
export type FujiState =
  | { status: "loading" }
  | { status: "none" }
  | { status: "fresh" | "saved"; data: FujiCache };

export function useFuji(): FujiState {
  const [state, setState] = useState<FujiState>(() => {
    const c = readCache();
    if (!c || ageMs(c) > MAX_SHOW_MS) return { status: "loading" };
    return { status: ageMs(c) < FRESH_MS ? "fresh" : "saved", data: c };
  });

  useEffect(() => {
    const cached = readCache();
    if (cached && ageMs(cached) < FRESH_MS) return;
    const ctrl = new AbortController();
    fetch(FUJI_URL, { credentials: "omit", referrerPolicy: "no-referrer", signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json) => {
        const list = Array.isArray(json) ? json : [json];
        if (list.length !== POINTS.length || !list.every((p) => Array.isArray(p?.hourly?.time))) throw new Error("unexpected shape");
        const data: FujiCache = {
          fetchedAt: new Date().toISOString(),
          points: POINTS.map((p) => p.id),
          hourly: list.map((p) => ({
            time: p.hourly.time,
            cloud_cover_low: p.hourly.cloud_cover_low,
            cloud_cover_mid: p.hourly.cloud_cover_mid,
            visibility: p.hourly.visibility,
          })),
        };
        writeCache(data);
        setState({ status: "fresh", data });
      })
      .catch((err) => {
        if (ctrl.signal.aborted && err?.name === "AbortError") return;
        setState((prev) => (prev.status === "loading" ? { status: "none" } : prev.status === "fresh" ? { ...prev, status: "saved" } : prev));
      });
    return () => ctrl.abort();
  }, []);

  return state;
}

export function fujiDates(now: Date): [string, string] {
  return [japanDate(now), japanDate(new Date(now.getTime() + 24 * 60 * 60 * 1000))];
}
