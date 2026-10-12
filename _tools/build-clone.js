const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = process.cwd();
const OUT_HTML = path.join(ROOT, "index.html");
const ASSETS = path.join(ROOT, "assets");

const MIRROR_HOSTS = new Set([
  "convertri.imgix.net",
  "cdn.convertri.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "i1.ytimg.com",
]);
const PATH_ALLOWED = new Set(["launchpadjv.com/js/embed.js", "launchpadjv.com/css/embed.css"]);

const urlMap = new Map();
const failed = [];
const stats = { downloaded: 0, skipped: 0, bytes: 0 };

function sanitize(name, max = 60) {
  let n = decodeURIComponent(name).replace(/[^A-Za-z0-9._-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  if (!n) n = "file";
  if (n.length > max) n = n.slice(0, max);
  return n;
}

function localPathFor(url) {
  if (urlMap.has(url)) return urlMap.get(url);
  const u = new URL(url);
  const hostKey = { "convertri.imgix.net": "imgix", "cdn.convertri.com": "cdn", "fonts.googleapis.com": "css", "fonts.gstatic.com": "fonts", "i1.ytimg.com": "thumbs", "launchpadjv.com": "launchpadjv", "flagcdn.com": "flags", "www.youtube.com": "yt" }[u.hostname] || "misc";
  let base = path.posix.basename(u.pathname);
  if (!path.posix.extname(base)) base += ".bin";
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);
  const rel = `assets/${hostKey}/${hash}-${sanitize(base)}`;
  urlMap.set(url, rel);
  return rel;
}

async function download(url, rel) {
  const dest = path.join(ROOT, rel.split("/").join(path.sep));
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    stats.skipped++;
    return fs.readFileSync(dest);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Referer": "https://chat60astra.com/regular" },
        redirect: "follow",
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      stats.downloaded++;
      stats.bytes += buf.length;
      return buf;
    } catch (e) {
      if (attempt === 3) {
        failed.push({ url, error: String(e) });
        console.log("  FAILED:", url.slice(0, 120), "-", e.message);
        return null;
      }
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
}

function extractUrls(text) {
  const re = /https?:\/\/[^\s"'()<>\\`]+/g;
  const urls = new Set();
  let m;
  while ((m = re.exec(text))) {
    let u = m[0];
    if (u.includes("${")) continue;
    if (/[.,;:]+$/.test(u)) u = u.replace(/[.,;:]+$/, "");
    if (!/^https?:\/\//.test(u)) continue;
    urls.add(u);
  }
  return [...urls];
}

function shouldMirror(url) {
  try {
    const u = new URL(url);
    if (MIRROR_HOSTS.has(u.hostname)) return true;
    const key = u.hostname + u.pathname;
    if (PATH_ALLOWED.has(key)) return true;
    return false;
  } catch {
    return false;
  }
}

async function pool(items, worker, limit = 8) {
  let idx = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (idx < items.length) {
      const cur = idx++;
      await worker(items[cur], cur);
    }
  });
  await Promise.all(runners);
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8").replace(/^\uFEFF/, ""));
}

(async function main() {
  console.log("=== STEP 1: read inputs ===");
  let html = fs.readFileSync(path.join(ROOT, "page_original.html"), "utf8");
  const forgeData = JSON.parse(readJson("_tools/forge-extract.json"));
  const yallFull = JSON.parse(readJson("_tools/extract2.json")).yallFull;
  const finalCheck = JSON.parse(readJson("_tools/final-check.json"));
  console.log("forge buttons:", forgeData.forgeHTMLs.length, "| yall source:", yallFull.length, "chars");

  console.log("=== STEP 2: collect URLs from raw HTML ===");
  const rawUrls = extractUrls(html).filter(shouldMirror);
  console.log("mirrorable URLs in HTML:", rawUrls.length);

  const forgeUrls = forgeData.forgeHTMLs.flatMap((h2) => extractUrls(h2)).filter((u) => /launchpadjv\.com\/(images|js|css)/.test(u));
  console.log("mirrorable URLs in forge HTML:", new Set(forgeUrls).size);

  const allUrls = [...new Set([...rawUrls, ...forgeUrls, "https://launchpadjv.com/css/embed.css", "https://launchpadjv.com/js/embed.js"])];
  console.log("total URLs to mirror:", allUrls.length);

  console.log("=== STEP 3: download assets ===");
  const cssToRewrite = [];
  await pool(allUrls, async (url) => {
    const rel = localPathFor(url);
    const buf = await download(url, rel);
    if (buf && (url.startsWith("https://fonts.googleapis.com") || url.endsWith(".css"))) {
      cssToRewrite.push({ url, rel, text: buf.toString("utf8") });
    }
  });
  console.log(`downloaded ${stats.downloaded}, reused ${stats.skipped}, failed ${failed.length}, bytes ${(stats.bytes / 1048576).toFixed(1)}MB`);

  console.log("=== STEP 4: second-level URLs from CSS files (fonts) ===");
  const level2 = new Set();
  for (const css of cssToRewrite) {
    for (const u of extractUrls(css.text)) {
      if (/fonts\.gstatic\.com|fonts\.googleapis\.com/.test(u)) level2.add(u);
    }
  }
  console.log("level-2 URLs:", level2.size);
  await pool([...level2], async (url) => {
    await download(url, localPathFor(url));
  });

  console.log("=== STEP 5: rewrite CSS files with local font paths ===");
  for (const css of cssToRewrite) {
    let text = css.text;
    for (const [url, rel] of urlMap) {
      if (text.includes(url)) {
        const from = path.posix.dirname(css.rel);
        const relToFont = path.posix.relative(from, rel);
        text = text.split(url).join(relToFont);
      }
    }
    fs.writeFileSync(path.join(ROOT, css.rel.split("/").join(path.sep)), text);
  }
  console.log("CSS files rewritten:", cssToRewrite.length);

  console.log("=== STEP 6: download notification flags ===");
  const notifScript = finalCheck.notifScriptText || "";
  const flags = [...new Set([...notifScript.matchAll(/flag:"([a-z]{2})"/g)].map((m) => m[1]))];
  console.log("flags:", flags.length, flags.join(","));
  await pool(flags, async (f) => {
    const url = `https://flagcdn.com/64x48/${f}.png`;
    await download(url, `assets/flags/${f}.png`);
    urlMap.set(url, `assets/flags/${f}.png`);
  });

  console.log("=== STEP 7: HTML transforms ===");
  let out = html;

  // 7a. unwrap deferred stylesheet noscript -> real link
  out = out.replace(/<noscript id="convertri-deferred-styles">\s*<link rel="stylesheet" href="([^"]+)"\/?>\s*<\/noscript>/i, '<link id="convertri-deferred-styles" rel="stylesheet" href="$1"/>');

  // 7b. bake forge containers + drop embed.js script tags
  let forgeIdx = 0;
  out = out.replace(/<div class="forgeContainer"([^>]*)><\/div>/g, (m, attrs) => {
    const inner = forgeData.forgeHTMLs[forgeIdx] || "";
    forgeIdx++;
    return `<div class="forgeContainer"${attrs}>${inner}</div>`;
  });
  console.log("forge containers filled:", forgeIdx);
  out = out.replace(/\s*<script src="https:\/\/launchpadjv\.com\/js\/embed\.js"><\/script>/g, "");

  // 7c. insert launchpadjv embed.css local link + injected styles before </head>
  let injectHead = '<link rel="stylesheet" href="https://launchpadjv.com/css/embed.css">';
  const injected = (forgeData.injectedStyles || []).join("\n");
  if (injected) injectHead += "<style>" + injected + "</style>";
  out = out.replace("</head>", injectHead + "</head>");

  // 7d. patch flagcdn template to local
  out = out.split("https://flagcdn.com/64x48/${flag}.png").join("assets/flags/${flag}.png");

  // 7e. insert yall definition + full-load helper before final yall() call
  const helper = `(function(){function f(){var l=document.querySelectorAll('.lazy-bg');for(var i=0;i<l.length;i++){var el=l[i];if(!el.hasAttribute('data-background')){el.classList.remove('lazy-bg');el.classList.add('lazy-bg-loaded')}}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',f)}else{f()}})();`;
  const insert = `<script>${yallFull ? "window.yall=" + yallFull + ";" : ""}${helper}</script>`;
  out = out.replace('<script>document.addEventListener("DOMContentLoaded",function(){yall()})</script>', insert + '<script>document.addEventListener("DOMContentLoaded",function(){yall()})</script>');

  // 7f. static copy data-src -> src / data-srcset -> srcset for <img>
  let imgTouched = 0;
  out = out.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\ssrc="/.test(tag)) return tag;
    const ds = /\sdata-src="([^"]+)"/.exec(tag);
    if (!ds) return tag;
    imgTouched++;
    let t = tag.replace("<img", `<img src="${ds[1]}"`);
    const dss = /\sdata-srcset="([^"]+)"/.exec(tag);
    if (dss && !/\ssrcset="/.test(tag)) t = t.replace("<img", `<img srcset="${dss[1]}"`);
    return t;
  });
  console.log("img tags given src:", imgTouched);

  // 7g. global URL rewrite to local paths
  let rewritten = 0;
  out = out.replace(/https?:\/\/[^\s"'()<>\\`]+/g, (m) => {
    let key = m.replace(/&amp;/g, "&").replace(/[.,;:]+$/, "");
    if (urlMap.has(key)) {
      rewritten++;
      return urlMap.get(key);
    }
    return m;
  });
  console.log("URL references rewritten:", rewritten);

  console.log("=== STEP 8: sanity checks ===");
  const remaining = extractUrls(out).filter((u) => /^(convertri\.imgix\.net|cdn\.convertri\.com|fonts\.gstatic\.com|fonts\.googleapis\.com|i1\.ytimg\.com)/.test(u.replace(/^https?:\/\//, "")));
  console.log("remaining mirrorable URLs in final HTML:", remaining.length);
  for (const r of remaining.slice(0, 10)) console.log("  ", r.slice(0, 140));

  fs.writeFileSync(OUT_HTML, out);
  fs.writeFileSync(path.join(ROOT, "_tools", "url-map.json"), JSON.stringify(Object.fromEntries(urlMap), null, 1));
  console.log("=== DONE ===");
  console.log("index.html:", (out.length / 1048576).toFixed(2), "MB");
  console.log("failed downloads:", failed.length);
  fs.writeFileSync(path.join(ROOT, "_tools", "failed-downloads.json"), JSON.stringify(failed, null, 1));
})();
