import generated from "@/generated/content.json";
import routeTagList from "@/generated/route-tags.json";

export const SECTIONS = ["guides", "routes", "tools", "shop"] as const;
export type Section = (typeof SECTIONS)[number];

export function isSection(value: string): value is Section {
  return (SECTIONS as readonly string[]).includes(value);
}

export type Item = {
  slug: string;
  title: string;
  summary: string;
  cover: string | null;
  order: number;
  tags: string[];
  city: string | null;
  html: string;
  /** Routes only: text before the first stage, and one entry per "##" stage. */
  intro?: string;
  stages?: Stage[];
  /** Guides only: one entry per "##" tip. */
  tips?: Tip[];
};

export type Tip = { title: string; html: string };

export type Stage = { title: string; image: { src: string; alt: string; credit: string } | null; html: string };

export const content = generated as Record<Section, Item[]>;

export type RouteTag = { id: string; label: string };
export const routeTags = routeTagList as RouteTag[];
export const tagLabel = (id: string) => routeTags.find((t) => t.id === id)?.label ?? id;
