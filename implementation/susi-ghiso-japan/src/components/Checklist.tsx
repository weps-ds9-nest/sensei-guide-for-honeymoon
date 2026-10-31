// Checklist with ticks stored on this device (blueprint: homepage.md, data-model.md).
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { readChecks, writeChecks, type Checks } from "@/lib/checks";

export type ChecklistItem = { id: string; label: string };

export function Checklist({ title, group, items }: { title: string; group: keyof Checks; items: ChecklistItem[] }) {
  const [checks, setChecks] = useState<Checks>(() => readChecks());
  const done = items.filter((i) => checks[group][i.id]).length;

  const toggle = (id: string, value: boolean) => {
    const next: Checks = { ...checks, [group]: { ...checks[group], [id]: value } };
    setChecks(next);
    writeChecks(next);
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Nothing on the list yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {done} of {items.length} done
        </p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-1">
          {items.map((item) => {
            const checked = Boolean(checks[group][item.id]);
            return (
              <li key={item.id}>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-accent">
                  <input
                    type="checkbox"
                    className="size-5 shrink-0 accent-[var(--primary)]"
                    checked={checked}
                    onChange={(e) => toggle(item.id, e.target.checked)}
                  />
                  <span className={checked ? "text-sm text-muted-foreground line-through" : "text-sm"}>{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
