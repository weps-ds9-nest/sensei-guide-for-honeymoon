// Lists and detail pages for guides, suggestions, tools and shop (blueprint: frontend.md, content-engine.md).
import { DayTripPicker } from "@/components/DayTripPicker";
import { FujiWidget } from "@/components/FujiWidget";
import { Cover, ItemCard } from "@/components/ItemCard";
import { Link } from "@/lib/router";
import { content, type Section } from "@/lib/content";

const TITLES: Record<Section, string> = { guides: "Guides", suggestions: "Suggestions", tools: "Tools", shop: "Shop" };
const INTROS: Record<Section, string> = {
  guides: "Essentials and tricks worth knowing before you go out.",
  suggestions: "Routes and places, with where to eat and what to see.",
  tools: "Things that make Japan easier.",
  shop: "",
};

export function SectionList({ section }: { section: Section }) {
  const items = content[section];
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{TITLES[section]}</h1>
        {INTROS[section] && <p className="mt-1 text-muted-foreground">{INTROS[section]}</p>}
      </header>
      {section === "tools" && <FujiWidget />}
      {section === "tools" && <DayTripPicker />}
      {items.length === 0 ? (
        section === "tools" ? null : <p className="py-16 text-center text-muted-foreground">Coming soon.</p>
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
  const isRoute = section === "suggestions";
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
      <div className={`prose-sgj ${isRoute ? "route-sgj" : ""}`} dangerouslySetInnerHTML={{ __html: item.html }} />
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
