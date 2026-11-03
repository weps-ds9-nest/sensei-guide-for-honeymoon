// Route detail page (blueprint: routes.md): photo header that follows the current stage,
// a sticky vertical progress rail, and stages that reveal on scroll.
import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import type { Item } from "@/lib/content";

export function RouteView({ item }: { item: Item }) {
  const stages = item.stages ?? [];
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const sections = [...list.querySelectorAll<HTMLElement>("[data-stage]")];
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -15% 0px" },
    );
    sections.forEach((s) => reveal.observe(s));

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      let current = 0;
      sections.forEach((s, i) => s.getBoundingClientRect().top <= line && (current = i));
      setActive(current);
      const box = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (line - box.top) / Math.max(1, box.height))));
    };
    const onScroll = () => (frame ||= requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      reveal.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [item.slug]);

  // The header keeps the last photo seen so far when a stage has none.
  let photoIndex = -1;
  for (let i = 0; i <= active && i < stages.length; i++) if (stages[i].image) photoIndex = i;
  const goTo = (i: number) =>
    listRef.current?.querySelectorAll("[data-stage]")[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <article className="route">
      <Link to="/routes" className="text-sm font-semibold text-muted-foreground hover:underline">
        ← Routes
      </Link>

      <header className="route-hero" aria-live="polite">
        {item.cover && <img className={`route-hero-img ${photoIndex < 0 ? "is-on" : ""}`} src={item.cover} alt="" />}
        {stages.map((s, i) =>
          s.image ? <img key={i} className={`route-hero-img ${i === photoIndex ? "is-on" : ""}`} src={s.image.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" /> : null,
        )}
        <div className="route-hero-text">
          {item.city && <p className="route-hero-city">{item.city}</p>}
          <h1 className="route-hero-title">{item.title}</h1>
          {stages[active] && (
            <p key={active} className="route-hero-stage">
              Stage {active + 1} of {stages.length} · {stages[active].title}
            </p>
          )}
        </div>
        {stages[photoIndex]?.image?.credit && <p className="route-hero-credit">{stages[photoIndex].image!.credit}</p>}
      </header>

      {item.intro && <div className="prose-sgj route-intro" dangerouslySetInnerHTML={{ __html: item.intro }} />}

      <div className="route-body">
        <nav className="route-rail" aria-label="Route stages">
          <div className="route-rail-track" aria-hidden="true">
            <div className="route-rail-fill" style={{ transform: `scaleY(${progress})` }} />
          </div>
          <ol>
            {stages.map((s, i) => (
              <li key={i}>
                <button type="button" onClick={() => goTo(i)} className={i < active ? "is-done" : i === active ? "is-active" : ""} aria-current={i === active ? "step" : undefined}>
                  <span className="route-rail-dot" aria-hidden="true" />
                  <span className="route-rail-label">
                    <span className="route-rail-num">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="route-stages" ref={listRef}>
          {stages.map((s, i) => (
            <li key={i} data-stage className="route-stage">
              <p className="route-stage-kicker">Stage {i + 1}</p>
              <h2 className="route-stage-title">{s.title}</h2>
              {s.image && <img className="route-stage-img" src={s.image.src} alt={s.image.alt} loading="lazy" decoding="async" />}
              <div className="prose-sgj" dangerouslySetInnerHTML={{ __html: s.html }} />
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
