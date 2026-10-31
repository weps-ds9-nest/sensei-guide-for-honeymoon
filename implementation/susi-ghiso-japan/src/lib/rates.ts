// Yen rate: build-time value, refreshed live from the browser (blueprint: integrations.md, data-model.md).
// The shown rate is the newest of: live response, localStorage cache, build-time rate.
import { useEffect, useState } from "react";
import ratesData from "@/generated/rates.json";

export type Rate = {
  fetchedAt: string;
  rateDate: string;
  source: string;
  eurPerJpy: number;
  stale: boolean;
};

export const rate = ratesData as Rate;

export const RATE_KEY = "sgj:rate:v1";
export const RATE_URL = "https://api.frankfurter.dev/v1/latest?base=JPY&symbols=EUR";
const SOURCE = "Frankfurter (ECB reference rates)";
const MAX_CACHE_AGE_MS = 6 * 60 * 60 * 1000;

function readCache(): Rate | null {
  try {
    const raw = window.localStorage.getItem(RATE_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw);
    return typeof r?.eurPerJpy === "number" && typeof r?.rateDate === "string" && typeof r?.fetchedAt === "string" ? r : null;
  } catch {
    return null;
  }
}

function writeCache(r: Rate) {
  try {
    window.localStorage.setItem(RATE_KEY, JSON.stringify(r));
  } catch {
    /* storage unavailable: the live rate still shows for this visit */
  }
}

const newest = (a: Rate, b: Rate | null) => (b && b.rateDate > a.rateDate ? b : a);

export function useRate(): Rate {
  const [current, setCurrent] = useState<Rate>(() => newest(rate, readCache()));

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - Date.parse(cached.fetchedAt) < MAX_CACHE_AGE_MS) return;
    const ctrl = new AbortController();
    fetch(RATE_URL, { credentials: "omit", referrerPolicy: "no-referrer", signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json) => {
        const eurPerJpy = json?.rates?.EUR;
        if (typeof eurPerJpy !== "number" || typeof json?.date !== "string") return;
        const live: Rate = { fetchedAt: new Date().toISOString(), rateDate: json.date, source: SOURCE, eurPerJpy, stale: false };
        writeCache(live);
        setCurrent((prev) => (live.rateDate >= prev.rateDate ? live : prev));
      })
      .catch(() => {
        /* offline or blocked: keep the cached or build-time rate */
      });
    return () => ctrl.abort();
  }, []);

  return current;
}
