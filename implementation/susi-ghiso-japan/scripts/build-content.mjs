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

const SECTIONS = ["guides", "routes", "tools", "shop"];
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

// Routes (blueprint: routes.md): text before the first "##" is the intro; each "##" is a stage.
// An image on its own line right under the heading becomes the stage photo in the header.
const STAGE_IMAGE = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/m;
function splitStages(body, label) {
  const [intro, ...parts] = body.split(/^## +/m);
  if (parts.length === 0) fail(`${label}: a route needs at least one "## Stage" heading`);
  const stages = parts.map((part) => {
    const nl = part.indexOf("\n");
    const title = (nl < 0 ? part : part.slice(0, nl)).trim();
    let rest = nl < 0 ? "" : part.slice(nl + 1);
    let image = null;
    const m = rest.match(STAGE_IMAGE);
    if (m && rest.slice(0, m.index).trim() === "") {
      image = { src: m[2], alt: m[1], credit: m[3] ?? "" };
      if (!m[1]) warn(`${label}: stage "${title}" photo has no alt text`);
      rest = rest.slice(m.index + m[0].length);
    } else warn(`${label}: stage "${title}" has no photo (the header keeps the previous one)`);
    return { title, image, html: marked.parse(rest) };
  });
  return { intro: marked.parse(intro), stages };
}

// Tips (blueprint: tips.md): each guides/<chip>.md file is one chip; each "##" inside is one tip.
function splitTips(body, label) {
  const parts = body.split(/^## +/m).slice(1);
  if (parts.length === 0) warn(`${label}: no "## Tip" headings, so this chip is empty`);
  return parts.map((part) => {
    const nl = part.indexOf("\n");
    return { title: (nl < 0 ? part : part.slice(0, nl)).trim(), html: marked.parse(nl < 0 ? "" : part.slice(nl + 1)) };
  });
}

async function buildSection(section) {
  const dir = path.join(CONTENT, section);
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort();
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
    if (data.cover) await checkImage(String(data.cover), label);
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
      ...(section === "routes" ? splitStages(body, label) : {}),
      ...(section === "guides" ? { tips: splitTips(body, label) } : {}),
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

// Day-trip picker (blueprint: daytrips.md). content/daytrips/<city>.json + destinations/<slug>.md.
const LINK_LINE = /^\s*[-*]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*$/;
const comboKey = (ids) => [...ids].sort().join("+");

function combinationsOf(ids, k) {
  if (k === 0) return [[]];
  return ids.flatMap((id, i) => combinationsOf(ids.slice(i + 1), k - 1).map((rest) => [id, ...rest]));
}

async function buildDaytrips() {
  const dir = path.join(CONTENT, "daytrips");
  const destDir = path.join(dir, "destinations");
  const destinations = {};
  if (existsSync(destDir)) {
    for (const file of (await readdir(destDir)).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort()) {
      const label = `daytrips/destinations/${file}`;
      const slug = file.replace(/\.md$/, "");
      if (!SLUG.test(slug)) fail(`${label}: file name "${slug}" must be lowercase letters, digits and hyphens`);
      const parsed = parseFrontmatter(await readFile(path.join(destDir, file), "utf8"), label);
      if (!parsed) continue;
      const { data, body } = parsed;
      if (!data.title) fail(`${label}: "title" is required`);
      let image = data.image ? String(data.image) : null;
      if (image && !existsSync(path.join(PUBLIC, image))) {
        warn(`${label}: image not found in public/: ${image} (showing a plain colour instead)`);
        image = null;
      } else if (image) await checkImage(image, label);
      const links = [];
      for (const line of body.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/)) {
        if (!line.trim()) continue;
        const m = line.match(LINK_LINE);
        if (!m) {
          warn(`${label}: ignored line "${line.trim()}" (links must look like "- [Text](https://...)")`);
          continue;
        }
        if (!m[2].startsWith("https://")) fail(`${label}: link "${m[2]}" must start with https://`);
        links.push({ label: m[1].trim(), url: m[2] });
      }
      destinations[slug] = { slug, title: String(data.title ?? slug), summary: data.summary ? String(data.summary) : "", image, links };
    }
  }

  const cities = [];
  const cityFiles = existsSync(dir) ? (await readdir(dir)).filter((f) => f.endsWith(".json") && !f.startsWith("_")).sort() : [];
  for (const file of cityFiles) {
    const label = `daytrips/${file}`;
    const city = await readJsonIfExists(path.join(dir, file));
    if (!city) continue;
    const id = file.replace(/\.json$/, "");
    const optionIds = new Set();
    for (const o of city.options ?? []) {
      if (!o.id || !o.label) fail(`${label}: every option needs "id" and "label"`);
      if (optionIds.has(o.id)) fail(`${label}: duplicate option id "${o.id}"`);
      optionIds.add(o.id);
    }
    if (optionIds.size < 3) fail(`${label}: needs at least 3 options`);
    const results = {};
    for (const c of city.combinations ?? []) {
      const pick = Array.isArray(c.pick) ? c.pick : [];
      const where = `${label}: combination [${pick.join(", ")}]`;
      if (pick.length !== 3 || new Set(pick).size !== 3) fail(`${where} must list exactly 3 different options`);
      for (const p of pick) if (!optionIds.has(p)) fail(`${where} uses unknown option "${p}"`);
      const key = comboKey(pick);
      if (key in results) fail(`${where} is listed twice`);
      const result = String(c.result ?? "");
      if (!result) warn(`${where} has no result yet`);
      else if (!destinations[result]) fail(`${where}: result "${result}" has no file daytrips/destinations/${result}.md`);
      results[key] = result || null;
    }
    for (const combo of combinationsOf([...optionIds], 3)) {
      if (!(comboKey(combo) in results)) warn(`${label}: combination [${combo.join(", ")}] is not listed`);
    }
    cities.push({ id, label: String(city.label ?? id), order: typeof city.order === "number" ? city.order : 999, options: city.options ?? [], results });
  }
  cities.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
  return { cities, destinations };
}

async function main() {
  const content = {};
  for (const s of SECTIONS) content[s] = await buildSection(s);
  // Route tags (blueprint: routes.md): only ids from content/routes/_tags.json are allowed.
  const routeTags = (await readJsonIfExists(path.join(CONTENT, "routes", "_tags.json")))?.tags ?? [];
  const allowed = new Set(routeTags.map((t) => t.id));
  for (const r of content.routes) {
    if (r.tags.length === 0) fail(`routes/${r.slug}.md: needs at least one tag (${[...allowed].join(", ")})`);
    for (const t of r.tags) if (!allowed.has(t)) fail(`routes/${r.slug}.md: tag "${t}" is not allowed; use: ${[...allowed].join(", ")}`);
  }
  const itinerary = validateItinerary(await readJsonIfExists(path.join(CONTENT, "itinerary.json")));
  const checklists = validateChecklists(await readJsonIfExists(path.join(CONTENT, "checklists.json")));
  const daytrips = await buildDaytrips();

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
  await writeFile(path.join(GENERATED, "route-tags.json"), JSON.stringify(routeTags));
  await writeFile(path.join(GENERATED, "itinerary.json"), JSON.stringify(itinerary));
  await writeFile(path.join(GENERATED, "checklists.json"), JSON.stringify(checklists));
  await writeFile(path.join(GENERATED, "daytrips.json"), JSON.stringify(daytrips));
  console.log(`[content] written src/generated (${counts}; itinerary ${itinerary ? "present" : "absent"})`);
}

main().catch((err) => {
  console.error(`[content] ${err.message}`);
  process.exit(1);
});
