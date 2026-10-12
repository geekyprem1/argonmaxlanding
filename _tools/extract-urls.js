const fs = require("fs");
const path = require("path");

const file = process.argv[2] || "page_original.html";
const html = fs.readFileSync(path.resolve(file), "utf8");

const urlRe = /https?:\/\/[^\s"'()<>\\]+/g;
const found = html.match(urlRe) || [];

const byDomain = new Map();
for (let u of found) {
  u = u.replace(/&amp;/g, "&").replace(/[.,;]+$/, "");
  let domain;
  try {
    domain = new URL(u).hostname;
  } catch {
    continue;
  }
  if (!byDomain.has(domain)) byDomain.set(domain, new Map());
  const map = byDomain.get(domain);
  map.set(u, (map.get(u) || 0) + 1);
}

const summary = [];
for (const [domain, map] of [...byDomain.entries()].sort()) {
  summary.push(`${domain}: ${map.size} unique URLs`);
}
console.log(summary.join("\n"));

const outDir = path.dirname(path.resolve(file));
const manifest = {};
for (const [domain, map] of byDomain) {
  manifest[domain] = [...map.keys()];
}
fs.writeFileSync(path.join(outDir, "_tools", "urls.json"), JSON.stringify(manifest, null, 2));
console.log("\nFull manifest: _tools/urls.json");

console.log("\n--- non-convertri domains sample ---");
for (const [domain, map] of byDomain) {
  if (!domain.includes("convertri")) {
    console.log(`\n[${domain}]`);
    for (const u of [...map.keys()].slice(0, 10)) console.log("  " + u.slice(0, 160));
  }
}
