const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const map = JSON.parse(fs.readFileSync("_tools/url-map.json", "utf8"));

function sanitize(name, max = 60) {
  let n = decodeURIComponent(name).replace(/[^A-Za-z0-9._-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  if (!n) n = "file";
  if (n.length > max) n = n.slice(0, max);
  return n;
}

const dir = "assets/css";
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  let t = fs.readFileSync(p, "utf8");
  let fixed = 0;
  t = t.replace(/\.\.\/fonts\/[a-f0-9]{10}-\.bin(\/[^\s"')]+)/g, (m, suffix) => {
    const fullUrl = "https://fonts.gstatic.com" + suffix;
    if (map[fullUrl]) {
      fixed++;
      return path.posix.relative("assets/css", map[fullUrl]);
    }
    // fallback: compute path deterministically
    const base = path.posix.basename(fullUrl);
    const hash = crypto.createHash("sha1").update(fullUrl).digest("hex").slice(0, 10);
    const rel = `assets/fonts/${hash}-${sanitize(base)}`;
    if (fs.existsSync(rel)) {
      fixed++;
      return path.posix.relative("assets/css", rel);
    }
    console.log("  NO LOCAL FILE for", fullUrl.slice(0, 120));
    return m;
  });
  fs.writeFileSync(p, t);
  console.log(f, "fixed:", fixed);
}
