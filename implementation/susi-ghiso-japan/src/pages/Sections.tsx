// Lists and detail pages for guides, routes, tools and shop (blueprint: frontend.md, content-engine.md).
import { DayTripPicker } from "@/components/DayTripPicker";
import { FujiWidget } from "@/components/FujiWidget";
import { Cover, ItemCard } from "@/components/ItemCard";
import { RouteView } from "@/components/RouteView";
import { TipsBoard } from "@/components/TipsBoard";
import { Link } from "@/lib/router";
import { useState } from "react";
import { content, routeTags, type Section } from "@/lib/content";

const TITLES: Record<Section, string> = { guides: "Tips", routes: "Routes", tools: "Tools", shop: "Shop" };
const INTROS: Record<Section, string> = {
  guides: "Quick tips worth knowing before you go out. Pick a topic.",
  routes: "Suggested routes, stage by stage, with where to eat and what to see.",
  tools: "Things that make Japan easier.",
  shop: "",
};

export function SectionList({ section }: { section: Section }) {
  const [tag, setTag] = useState<string | null>(null);
  if (section === "guides") return <TipsBoard intro={INTROS.guides} />;
  const items = content[section].filter((i) => !tag || i.tags.includes(tag));
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{TITLES[section]}</h1>
        {INTROS[section] && <p className="mt-1 text-muted-foreground">{INTROS[section]}</p>}
      </header>
      {section === "routes" && (
        <div className="tips-chips" role="toolbar" aria-label="Filter routes">
          <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>All</button>
          {routeTags.map((t) => (
            <button key={t.id} type="button" aria-pressed={tag === t.id} onClick={() => setTag(tag === t.id ? null : t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      )}
      {section === "tools" && <FujiWidget />}
      {section === "tools" && <DayTripPicker />}
      {items.length === 0 ? (
        section === "tools" ? null : <p className="py-16 text-center text-muted-foreground">{tag ? "No routes with this tag yet." : "Coming soon."}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 min-[900px]:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.slug} item={item} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionDetail({ section, slug }: { section: Section; slug: string }) {
  const item = content[section].find((i) => i.slug === slug);
  if (!item) return <NotFound />;
  if (section === "guides") return <TipsBoard intro={INTROS.guides} initial={slug} />;
  if (section === "routes") return <RouteView item={item} />;
  return (
    <article className="grid gap-4">
      <Link to={`/${section}`} className="text-sm font-semibold text-muted-foreground hover:underline">
        ← {TITLES[section]}
      </Link>
      <header>
        {item.city && <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.city}</p>}
        <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
        {item.summary && <p className="mt-2 text-lg text-muted-foreground">{item.summary}</p>}
      </header>
      {item.cover && <Cover item={item} className="aspect-16/10 w-full rounded-lg object-cover" />}
      <div className="prose-sgj" dangerouslySetInnerHTML={{ __html: item.html }} />
    </article>
  );
}

export function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="mt-2 text-muted-foreground">
        That page does not exist. <Link to="/" className="font-semibold underline">Back to start</Link>
      </p>
    </div>
  );
}
