// Top bar (≥640px) and fixed bottom bar (<640px), built from one item list.
// Home sits first in the top bar and centred in the bottom bar (blueprint: frontend.md).
import { Home } from "lucide-react";
import { Link, useRouter } from "@/lib/router";
import { cn } from "@/lib/utils";

const PAGES = [
  { to: "/guides", label: "Tips" },
  { to: "/tools", label: "Tools" },
  { to: "/routes", label: "Routes" },
  { to: "/shop", label: "Shop" },
];

function HomeItem({ active, compact }: { active: boolean; compact: boolean }) {
  const label = "Home";
  if (active) {
    return (
      <span aria-disabled="true" aria-current="page" className={cn("flex items-center gap-1.5 rounded-md bg-shell-foreground px-2 py-2 text-sm font-semibold text-shell", compact && "flex-col text-xs")}>
        <Home className="size-5" aria-hidden="true" />
        {label}
      </span>
    );
  }
  return (
    <Link to="/" className={cn("flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium hover:bg-shell-foreground/10", compact && "flex-col text-xs")}>
      <Home className="size-5" aria-hidden="true" />
      {label}
    </Link>
  );
}

function PageItem({ to, label, active, compact }: { to: string; label: string; active: boolean; compact: boolean }) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-11 items-center justify-center rounded-md px-3 text-sm font-medium",
        active ? "bg-shell-foreground font-semibold text-shell" : "hover:bg-shell-foreground/10",
        compact && "flex-1 px-1 text-xs",
      )}
    >
      {label}
    </Link>
  );
}

export function SiteNav() {
  const { path } = useRouter();
  const isActive = (to: string) => path === to || path.startsWith(`${to}/`);
  const onHome = path === "/";

  return (
    <>
      <header className="sticky top-0 z-20 hidden h-(--top-bar-height) items-center gap-4 bg-shell px-6 text-shell-foreground sm:flex">
        <nav aria-label="Main" className="flex w-full max-w-(--max-width) mx-auto items-center gap-2">
          <HomeItem active={onHome} compact={false} />
          <div className="ml-auto flex items-center gap-1">
            {PAGES.map((p) => (
              <PageItem key={p.to} {...p} active={isActive(p.to)} compact={false} />
            ))}
          </div>
        </nav>
      </header>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-20 bg-shell text-shell-foreground sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-(--bottom-bar-height) max-w-(--max-width) items-center gap-1 px-2">
          <PageItem {...PAGES[0]} active={isActive(PAGES[0].to)} compact />
          <PageItem {...PAGES[1]} active={isActive(PAGES[1].to)} compact />
          <div className="flex-1">
            <HomeItem active={onHome} compact />
          </div>
          <PageItem {...PAGES[2]} active={isActive(PAGES[2].to)} compact />
          <PageItem {...PAGES[3]} active={isActive(PAGES[3].to)} compact />
        </div>
      </nav>
    </>
  );
}
