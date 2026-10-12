const fs = require("fs");
const path = require("path");
const ROOT = process.cwd();

const map = JSON.parse(fs.readFileSync("_tools/url-map.json", "utf8"));
const htmlPath = path.join(ROOT, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const newMap = {};
let renamed = 0, reverted = 0;

for (const [url, rel] of Object.entries(map)) {
  let u;
  try { u = new URL(url); } catch { newMap[url] = rel; continue; }
  const isBareHost = !u.pathname || u.pathname === "/";
  if (isBareHost) {
    // failed preconnect targets: point back to the original URL in HTML
    if (html.includes(rel)) {
      html = html.split(rel).join(url);
      reverted++;
    }
    continue; // drop from map
  }
  if (rel.endsWith(".bin") && /fonts\.googleapis\.com/.test(url)) {
    const newRel = rel.replace(/\.bin$/, ".css");
    const oldFile = path.join(ROOT, rel.split("/").join(path.sep));
    const newFile = path.join(ROOT, newRel.split("/").join(path.sep));
    if (fs.existsSync(oldFile)) {
      fs.renameSync(oldFile, newFile);
    }
    if (html.includes(rel)) {
      html = html.split(rel).join(newRel);
    }
    newMap[url] = newRel;
    renamed++;
    continue;
  }
  newMap[url] = rel;
}

fs.writeFileSync(htmlPath, html);
fs.writeFileSync("_tools/url-map.json", JSON.stringify(newMap, null, 1));
console.log("renamed css:", renamed, "| reverted preconnects:", reverted);
console.log("remaining .bin refs in html:", (html.match(/\.bin/g) || []).length);
for (const m of html.matchAll(/\.bin/g)) {
  const i = m.index;
  console.log("  ...", html.slice(Math.max(0, i - 90), i + 10).replace(/\n/g, ""));
}
