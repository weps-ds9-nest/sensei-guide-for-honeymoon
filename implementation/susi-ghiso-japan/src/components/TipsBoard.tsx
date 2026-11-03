// Tips page (blueprint: tips.md): chips filter quick tips; each content/guides/*.md is one chip.
import { useState } from "react";
import { content } from "@/lib/content";

export function TipsBoard({ intro, initial }: { intro: string; initial?: string }) {
  const chips = content.guides;
  const [active, setActive] = useState<string | null>(initial && chips.some((c) => c.slug === initial) ? initial : null);
  const shown = chips.filter((c) => !active || c.slug === active);

  return (
    <div className="grid gap-5">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Tips</h1>
        <p className="mt-1 text-muted-foreground">{intro}</p>
      </header>
      <div className="tips-chips" role="toolbar" aria-label="Filter tips">
        <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>All</button>
        {chips.map((c) => (
          <button key={c.slug} type="button" aria-pressed={active === c.slug} onClick={() => setActive(active === c.slug ? null : c.slug)}>
            {c.title}
          </button>
        ))}
      </div>
      <ul className="tips-list">
        {shown.flatMap((c) =>
          (c.tips ?? []).map((t) => (
            <li key={`${c.slug}-${t.title}`} className="tips-card">
              {!active && <p className="tips-card-chip">{c.title}</p>}
              <h2 className="tips-card-title">{t.title}</h2>
              <div className="prose-sgj" dangerouslySetInnerHTML={{ __html: t.html }} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
