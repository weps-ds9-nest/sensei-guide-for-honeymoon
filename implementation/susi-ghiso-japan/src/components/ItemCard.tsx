import type { CSSProperties } from "react";
import { Link } from "@/lib/router";
import type { Item, Section } from "@/lib/content";

function hueFor(slug: string): number {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash % 360;
}

export function Cover({ item, className }: { item: Item; className: string }) {
  if (item.cover) {
    return <img className={className} src={item.cover} alt="" loading="lazy" decoding="async" />;
  }
  return (
    <div
      aria-hidden="true"
      className={`${className} grid place-items-center text-4xl font-bold text-white`}
      style={{ background: `linear-gradient(135deg, hsl(${hueFor(item.slug)} 55% 60%), hsl(${(hueFor(item.slug) + 40) % 360} 50% 40%))` } as CSSProperties}
    >
      {item.title.charAt(0)}
    </div>
  );
}

export function ItemCard({ item, section }: { item: Item; section: Section }) {
  return (
    <Link to={`/${section}/${item.slug}`} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-transform active:scale-[0.98]">
      <Cover item={item} className="aspect-4/3 w-full object-cover" />
      <div className="p-4">
        {item.city && <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.city}</p>}
        <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
        {item.summary && <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>}
        {item.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
