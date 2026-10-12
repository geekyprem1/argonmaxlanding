const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve("page_original.html"), "utf8");

console.log("=== FILE SIZE:", html.length, "chars ===\n");

console.log("=== <script src> tags ===");
for (const m of html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)) {
  console.log("  " + m[1].slice(0, 200));
}

console.log("\n=== <link rel=stylesheet> ===");
for (const m of html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi)) {
  const tag = m[0];
  const href = /href=["']([^"']+)["']/i.exec(tag);
  console.log("  " + (href ? href[1].slice(0, 200) : tag.slice(0, 120)));
}

console.log("\n=== inline <script> count:", (html.match(/<script(?![^>]*src=)/gi) || []).length);
const inline = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
inline.slice(0, 40).forEach((m, i) => {
  const code = m[1].replace(/\s+/g, " ").trim();
  if (code) console.log(`  [${i}] ${code.slice(0, 160)}`);
});

console.log("\n=== <form> tags ===");
for (const m of html.matchAll(/<form[^>]*>/gi)) console.log("  " + m[0].slice(0, 300));

console.log("\n=== <img> count:", (html.match(/<img[^>]*>/gi) || []).length);
const imgSrcs = [...html.matchAll(/<img[^>]*src=["']([^"']+)["']/gi)].map((m) => m[1]);
console.log("  first 15 img srcs:");
imgSrcs.slice(0, 15).forEach((s) => console.log("    " + s.slice(0, 140)));

console.log("\n=== <iframe> tags ===");
for (const m of html.matchAll(/<iframe[^>]*>/gi)) console.log("  " + m[0].slice(0, 220));

console.log("\n=== body visible text (first 4000 chars) ===");
const bodyMatch = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html);
const body = bodyMatch ? bodyMatch[1] : html;
const text = body
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#39;|&rsquo;/g, "'")
  .replace(/&quot;/g, '"')
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean)
  .join(" | ");
console.log(text.slice(0, 4000));

console.log("\n\n=== first 1500 chars of <body> opening ===");
console.log(body.slice(0, 1500));

console.log("\n=== body classes:", /<body[^>]*class=["']([^"']*)["']/i.exec(html)?.[1]);
console.log("=== html id:", /<html[^>]*id=["']([^"']*)["']/i.exec(html)?.[1]);
