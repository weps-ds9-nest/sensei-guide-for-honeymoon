import { SiteNav } from "@/components/SiteNav";
import { useRouter } from "@/lib/router";
import { isSection } from "@/lib/content";
import { Home } from "@/pages/Home";
import { NotFound, SectionDetail, SectionList } from "@/pages/Sections";

function Routes() {
  const { path } = useRouter();
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return <Home />;
  const [section, slug] = parts;
  if (!isSection(section) || parts.length > 2) return <NotFound />;
  return slug ? <SectionDetail section={section} slug={decodeURIComponent(slug)} /> : <SectionList section={section} />;
}

export default function App() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-(--max-width) px-(--gutter) pt-5 pb-28 sm:pb-12">
        <Routes />
      </main>
    </>
  );
}
