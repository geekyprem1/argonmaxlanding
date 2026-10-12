const fs = require("fs");
const html = fs.readFileSync("page_original.html", "utf8");

function ctx(needle, before = 120, after = 200, max = 6) {
  let idx = 0, n = 0;
  while (n < max) {
    idx = html.indexOf(needle, idx);
    if (idx === -1) break;
    console.log(`--- "${needle}" @${idx}`);
    console.log(html.slice(Math.max(0, idx - before), idx + after).replace(/\n/g, "\\n"));
    idx += needle.length;
    n++;
  }
  if (!n) console.log(`--- "${needle}": not found`);
}

console.log("=========== cdn.convertri.com URLs ===========");
const urls = JSON.parse(fs.readFileSync("_tools/urls.json", "utf8"));
console.log((urls["cdn.convertri.com"] || []).join("\n"));

console.log("\n=========== fonts.googleapis context ===========");
ctx("fonts.googleapis.com/css", 100, 260, 6);

console.log("\n=========== gstatic context ===========");
ctx("fonts.gstatic.com/s", 80, 120, 3);

console.log("\n=========== needsJQuery = definition ===========");
ctx("var needsJQuery=", 40, 700, 1);

console.log("\n=========== yall ===========");
ctx("yall", 100, 150, 6);

console.log("\n=========== countdown attr sample ===========");
ctx("data-countdown-id", 300, 400, 2);

console.log("\n=========== countdown script ===========");
ctx("countdown", 100, 200, 8);

console.log("\n=========== facebook/pixel/gtag ===========");
ctx("facebook", 80, 150, 5);
ctx("gtag", 60, 120, 3);
ctx("pixel", 60, 120, 5);

console.log("\n=========== bootstrap / css links in head ===========");
ctx("<link", 40, 200, 20);
