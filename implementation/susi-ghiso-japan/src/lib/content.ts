import generated from "@/generated/content.json";

export const SECTIONS = ["guides", "suggestions", "tools", "shop"] as const;
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
};

export const content = generated as Record<Section, Item[]>;
