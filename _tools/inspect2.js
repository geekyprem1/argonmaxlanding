const fs = require("fs");
const html = fs.readFileSync("page_original.html", "utf8");

console.log("=== LAST 3000 chars of file ===");
console.log(html.slice(-3000));

console.log("\n\n=== 'cdn.min.js' occurrences ===");
console.log((html.match(/cdn\.min\.js/g) || []).length);
let idx = html.indexOf("cdn.min.js");
while (idx !== -1 && idx < html.length) {
  console.log("  ...", html.slice(Math.max(0, idx - 200), idx + 200).replace(/\n/g, "\\n"));
  idx = html.indexOf("cdn.min.js", idx + 1);
  if (idx > 2000000) break;
}

console.log("\n=== 'convertri-deferred' occurrences ===");
console.log((html.match(/convertri-deferred/g) || []).length);

console.log("\n=== background-image:url( count ===");
console.log((html.match(/background-image:\s*url\(/g) || []).length);
const bgs = [...html.matchAll(/background-image:\s*url\((['"]?)(https?:[^'")]+)\1\)/g)].map((m) => m[2]);
console.log("unique bg urls:", new Set(bgs).size);
console.log(bgs.slice(0, 8).join("\n"));

console.log("\n=== data- attribute names used ===");
const attrs = new Set();
for (const m of html.matchAll(/\s(data-[a-z-]+)=/g)) attrs.add(m[1]);
console.log([...attrs].sort().join(", "));

console.log("\n=== noscript blocks ===");
const nos = [...html.matchAll(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi)];
nos.forEach((m, i) => console.log(`  [${i}] ${m[1].slice(0, 300).replace(/\s+/g, " ")}`));
