// Content engine (blueprint: content-engine.md, data-model.md).
// Reads content/ (Markdown entries, itinerary, checklists), validates it, and writes
// src/generated/*.json. Run with --check to validate without writing.
import { readFile, readdir, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");
const GENERATED = path.join(ROOT, "src", "generated");
const CHECK_ONLY = process.argv.includes("--check");

const SECTIONS = ["guides", "suggestions", "tools", "shop"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_IMAGE_BYTES = 400 * 1024;
const errors = [];
const warnings = [];

const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return fail(`${file}: missing frontmatter block (--- ... ---)`), null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) {
      fail(`${file}: cannot parse frontmatter line "${line}"`);
      continue;
    }
    const value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[kv[1]] = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[kv[1]] = Number(value);
    } else {
      data[kv[1]] = value.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body: m[2] };
}

const marked = new Marked({
  renderer: {
    image({ href, title, text }) {
      if (!text) warn(`image ${href} has no alt text`);
      const t = title ? ` title="${title}"` : "";
      return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async" />`;
    },
  },
});

async function checkImage(href, file) {
  if (!href.startsWith("/")) return;
  const local = path.join(PUBLIC, href);
  if (!existsSync(local)) return fail(`${file}: image not found in public/: ${href}`);
  const { size } = await stat(local);
  if (size > MAX_IMAGE_BYTES) warn(`${file}: ${href} is ${Math.round(size / 1024)} KB (limit 400 KB)`);
}

async function buildSection(section) {
  const dir = path.join(CONTENT, section);
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
  const seen = new Set();
  const items = [];
  for (const file of files) {
    const label = `${section}/${file}`;
    const slug = file.replace(/\.md$/, "");
    if (!SLUG.test(slug)) fail(`${label}: slug "${slug}" must be lowercase letters, digits and hyphens`);
    if (seen.has(slug)) fail(`${label}: duplicate slug "${slug}"`);
    seen.add(slug);
    const parsed = parseFrontmatter(await readFile(path.join(dir, file), "utf8"), label);
    if (!parsed) continue;
    const { data, body } = parsed;
    if (!data.title) fail(`${label}: "title" is required`);
    const html = marked.parse(body);
    for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) await checkImage(m[1], label);
    items.push({
      slug,
      title: String(data.title ?? slug),
      summary: data.summary ? String(data.summary) : "",
      cover: data.cover ? String(data.cover) : null,
      order: typeof data.order === "number" ? data.order : 999,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      city: data.city ? String(data.city) : null,
      html,
    });
  }
  items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  return items;
}

async function readJsonIfExists(file) {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    fail(`${path.relative(ROOT, file)}: invalid JSON (${err.message})`);
    return null;
  }
}

function validateItinerary(it) {
  if (!it) return null;
  if (it.timezone !== "Asia/Tokyo") fail(`content/itinerary.json: "timezone" must be "Asia/Tokyo"`);
  const dates = new Set();
  for (const d of it.days ?? []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) fail(`content/itinerary.json: day date "${d.date}" must be YYYY-MM-DD`);
    if (dates.has(d.date)) fail(`content/itinerary.json: duplicate day "${d.date}"`);
    dates.add(d.date);
  }
  return it;
}

function validateChecklists(cl) {
  if (!cl) return { preflight: [], flight: [] };
  for (const list of ["preflight", "flight"]) {
    const ids = new Set();
    for (const item of cl[list] ?? []) {
      if (!SLUG.test(item.id)) fail(`content/checklists.json: ${list} id "${item.id}" must be lowercase with hyphens`);
      if (ids.has(item.id)) fail(`content/checklists.json: ${list} duplicate id "${item.id}"`);
      ids.add(item.id);
    }
  }
  return { preflight: cl.preflight ?? [], flight: cl.flight ?? [] };
}

async function main() {
  const content = {};
  for (const s of SECTIONS) content[s] = await buildSection(s);
  const itinerary = validateItinerary(await readJsonIfExists(path.join(CONTENT, "itinerary.json")));
  const checklists = validateChecklists(await readJsonIfExists(path.join(CONTENT, "checklists.json")));

  for (const w of warnings) console.warn(`[content] WARNING ${w}`);
  if (errors.length) {
    for (const e of errors) console.error(`[content] ERROR ${e}`);
    process.exit(1);
  }
  const counts = SECTIONS.map((s) => `${s}: ${content[s].length}`).join(", ");
  if (CHECK_ONLY) {
    console.log(`[content] check passed (${counts}; itinerary ${itinerary ? "present" : "absent"})`);
    return;
  }
  await mkdir(GENERATED, { recursive: true });
  await writeFile(path.join(GENERATED, "content.json"), JSON.stringify(content));
  await writeFile(path.join(GENERATED, "itinerary.json"), JSON.stringify(itinerary));
  await writeFile(path.join(GENERATED, "checklists.json"), JSON.stringify(checklists));
  console.log(`[content] written src/generated (${counts}; itinerary ${itinerary ? "present" : "absent"})`);
}

main().catch((err) => {
  console.error(`[content] ${err.message}`);
  process.exit(1);
});
