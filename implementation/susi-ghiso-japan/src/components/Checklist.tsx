// Checklists with ticks stored on this device (blueprint: homepage.md, data-model.md).
// One section; when more than one list is available a segmented control picks which one shows.
// Ruled rows, not cards: each row is a 44px tap target with its own divider.
import { useId, useState } from "react";
import { readChecks, writeChecks, type Checks } from "@/lib/checks";

export type ChecklistItem = { id: string; label: string };
export type ChecklistList = { group: keyof Checks; title: string; items: ChecklistItem[] };

export function Checklist({ lists }: { lists: ChecklistList[] }) {
  const [checks, setChecks] = useState<Checks>(() => readChecks());
  const [selected, setSelected] = useState<keyof Checks | null>(null);
  const headingId = useId();
  const panelId = useId();

  if (lists.length === 0) return null;
  // Fall back to the first list if the selected one is no longer available (e.g. preflight after departure).
  const active = lists.find((l) => l.group === selected) ?? lists[0];
  const { group, items } = active;
  const done = items.filter((i) => checks[group][i.id]).length;
  const segmented = lists.length > 1;

  const toggle = (id: string, value: boolean) => {
    const next: Checks = { ...checks, [group]: { ...checks[group], [id]: value } };
    setChecks(next);
    writeChecks(next);
  };

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-foreground pb-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight">
          {segmented ? "Checklists" : active.title}
        </h2>
        {items.length > 0 && <p className="text-sm tabular-nums text-muted-foreground">{done} of {items.length} done</p>}
      </div>

      {segmented && (
        <div role="tablist" aria-label="Checklist" className="flex w-full rounded-(--radius) bg-muted p-1 sm:w-auto sm:self-start">
          {lists.map((l) => {
            const isActive = l.group === group;
            return (
              <button
                key={l.group}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setSelected(l.group)}
                className={
                  "min-h-11 flex-1 rounded-[calc(var(--radius)-4px)] px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring sm:flex-none " +
                  (isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")
                }
              >
                {l.title}
              </button>
            );
          })}
        </div>
      )}

      <div id={panelId} role={segmented ? "tabpanel" : undefined}>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing on the list yet.</p>
        ) : (
          <ul className="flex flex-col">
            {items.map((item) => {
              const checked = Boolean(checks[group][item.id]);
              return (
                <li key={item.id} className="border-b border-border last:border-b-0">
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 py-2 hover:bg-accent">
                    <input
                      type="checkbox"
                      className="size-5 shrink-0"
                      checked={checked}
                      onChange={(e) => toggle(item.id, e.target.checked)}
                    />
                    <span className={checked ? "text-muted-foreground line-through" : ""}>{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
