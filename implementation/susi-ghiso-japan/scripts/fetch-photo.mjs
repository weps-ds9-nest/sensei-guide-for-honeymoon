// Download a free-licence photo from Wikimedia Commons into public/media/ (blueprint: routes.md).
// Usage: npm run photo -- "<search words>" <folder/name> [--pick N]
//   npm run photo -- "Shibuya crossing at night" routes/shibuya-crossing
// Prints the Markdown line to paste into a route stage (with the credit the licence asks for).
// Resizes to 1600px and recompresses under 400 KB with macOS `sips`. CSP allows local images only.
import { writeFile, stat, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const pickAt = args.indexOf("--pick");
const pick = pickAt >= 0 ? Number(args.splice(pickAt, 2)[1]) : 1;
const [query, name] = args;
if (!query || !name) {
  console.error('Usage: npm run photo -- "<search words>" <folder/name> [--pick N]');
  process.exit(1);
}

const api = new URL("https://commons.wikimedia.org/w/api.php");
Object.entries({
  action: "query", format: "json", generator: "search", gsrnamespace: "6", gsrlimit: "8", gsrsearch: `${query} filetype:bitmap`,
  prop: "imageinfo", iiprop: "url|extmetadata", iiextmetadatafilter: "LicenseShortName|Artist", iiurlwidth: "1600",
}).forEach(([k, v]) => api.searchParams.set(k, v));
const headers = { "User-Agent": "SusiGhisoGuide/1.0 (private build script)" };
const data = await (await fetch(api, { headers })).json();
const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => a.index - b.index);
if (!pages.length) throw new Error(`No Commons photos for "${query}"`);
const strip = (s = "") => s.replace(/<[^>]+>/g, "").trim();
pages.forEach((p, i) => {
  const m = p.imageinfo[0].extmetadata ?? {};
  console.log(`${i + 1 === pick ? "→" : " "} ${i + 1}. ${p.title.replace(/^File:/, "")} (${strip(m.LicenseShortName?.value)})`);
});
const chosen = pages[pick - 1];
if (!chosen) throw new Error(`--pick ${pick} is out of range`);
const info = chosen.imageinfo[0];
const meta = info.extmetadata ?? {};
const credit = `Photo: ${strip(meta.Artist?.value) || "Wikimedia Commons"}, ${strip(meta.LicenseShortName?.value)}, Wikimedia Commons`;

const out = path.join(ROOT, "public", "media", `${name}.jpg`);
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, Buffer.from(await (await fetch(info.thumburl, { headers })).arrayBuffer()));
for (const q of ["normal", "low"]) {
  execFileSync("sips", ["-Z", "1600", "-s", "format", "jpeg", "-s", "formatOptions", q, out, "--out", out], { stdio: "ignore" });
  if ((await stat(out)).size <= 400 * 1024) break;
}
console.log(`\nSaved public/media/${name}.jpg (${Math.round((await stat(out)).size / 1024)} KB). Paste under the stage heading:\n`);
console.log(`![${query}](/media/${name}.jpg "${credit.replace(/"/g, "'")}")`);
