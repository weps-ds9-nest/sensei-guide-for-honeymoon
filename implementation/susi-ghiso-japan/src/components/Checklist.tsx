// Checklist with ticks stored on this device (blueprint: homepage.md, data-model.md).
// Ruled rows, not cards: each row is a 44px tap target with its own divider.
import { useId, useState } from "react";
import { readChecks, writeChecks, type Checks } from "@/lib/checks";

export type ChecklistItem = { id: string; label: string };

export function Checklist({ title, group, items }: { title: string; group: keyof Checks; items: ChecklistItem[] }) {
  const [checks, setChecks] = useState<Checks>(() => readChecks());
  const headingId = useId();
  const done = items.filter((i) => checks[group][i.id]).length;

  const toggle = (id: string, value: boolean) => {
    const next: Checks = { ...checks, [group]: { ...checks[group], [id]: value } };
    setChecks(next);
    writeChecks(next);
  };

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-foreground pb-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {items.length > 0 && <p className="text-sm tabular-nums text-muted-foreground">{done} of {items.length} done</p>}
      </div>

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
    </section>
  );
}
