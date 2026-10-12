const fs = require("fs");
const html = fs.readFileSync("page_original.html", "utf8");

console.log("=== '.lazy-bg-loaded' occurrences:", (html.match(/lazy-bg-loaded/g) || []).length);
console.log("=== ':not(.lazy-bg-loaded)':", (html.match(/:not\(\.lazy-bg-loaded\)/g) || []).length);

console.log("\n--- samples of selectors containing background-image:url(http ---");
let idx = 0, n = 0;
while (n < 4) {
  idx = html.indexOf("background-image:url(http", idx);
  if (idx === -1) break;
  console.log(html.slice(Math.max(0, idx - 260), idx + 120).replace(/\n/g, "\\n"));
  console.log("........");
  idx += 30; n++;
}

console.log("\n=== script [2] convertriParameters (full) ===");
let m = /var convertriParameters=\{[\s\S]*?\};/.exec(html);
console.log(m ? m[0].slice(0, 1200) : "not found");

console.log("\n=== search: createElement('script') / loadScript / document.write ===");
for (const pat of ["createElement('script')", 'createElement("script")', "loadScript", "document.write", "appendChild"]) {
  const c = (html.match(new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  console.log(`  ${pat}: ${c}`);
}

console.log("\n=== context around appendChild/script-creation ===");
idx = html.indexOf("loadScript");
if (idx === -1) idx = html.indexOf("createElement('script')");
if (idx !== -1) console.log(html.slice(Math.max(0, idx - 400), idx + 600).replace(/\n/g, "\\n"));

console.log("\n=== unique hrefs (non # / javascript / mailto) ===");
const hrefs = new Map();
for (const mm of html.matchAll(/<a[^>]*href=["']([^"']+)["']/gi)) {
  const h = mm[1];
  if (h.startsWith("#") || h.startsWith("javascript:") || h.startsWith("mailto:")) continue;
  hrefs.set(h, (hrefs.get(h) || 0) + 1);
}
for (const [h, c] of [...hrefs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(`  (${c}x) ${h.slice(0, 180)}`);

console.log("\n=== data-offer / data-page / data-downsell samples ===");
idx = html.indexOf("data-offer");
if (idx !== -1) console.log(html.slice(Math.max(0, idx - 300), idx + 300).replace(/\n/g, "\\n"));

console.log("\n=== '<button' count:", (html.match(/<button/gi) || []).length, " | '<input' count:", (html.match(/<input/gi) || []).length, " | '<select' count:", (html.match(/<select/gi) || []).length, " | '<textarea' count:", (html.match(/<textarea/gi) || []).length);

console.log("\n=== head <script src> full tags ===");
for (const mm of html.matchAll(/<script[^>]*src=[^>]*>/gi)) console.log("  " + mm[0].slice(0, 300));
