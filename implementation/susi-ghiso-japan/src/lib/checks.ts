// Checklist ticks, stored on this device only (blueprint: data-model.md).
// Storage can be blocked (private mode, cleared data): every access is guarded.
export type Checks = { preflight: Record<string, boolean>; flight: Record<string, boolean> };

export const CHECKS_KEY = "sgj:checks:v1";

export function readChecks(): Checks {
  try {
    const raw = window.localStorage.getItem(CHECKS_KEY);
    if (!raw) return { preflight: {}, flight: {} };
    const parsed = JSON.parse(raw);
    return { preflight: parsed.preflight ?? {}, flight: parsed.flight ?? {} };
  } catch {
    return { preflight: {}, flight: {} };
  }
}

export function writeChecks(checks: Checks) {
  try {
    window.localStorage.setItem(CHECKS_KEY, JSON.stringify(checks));
  } catch {
    /* storage unavailable: the tick still shows for this visit */
  }
}
