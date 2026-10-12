JSON.stringify({
  lazyBgLoadedNow: document.querySelectorAll('.lazy-bg-loaded').length,
  lazyBgStillLazy: document.querySelectorAll('.lazy-bg').length,
  imgsWithSrcAndData: document.querySelectorAll('img[data-src][src]').length,
  notifExists: !!document.getElementById('purchase-notification'),
  notifOuter: (document.getElementById('purchase-notification') || {}).outerHTML,
  notifParentCls: document.getElementById('purchase-notification') ? document.getElementById('purchase-notification').parentElement.className.slice(0, 120) : null,
  notifStyle: (function () { var el = document.getElementById('purchase-notification'); if (!el) return null; var cs = getComputedStyle(el); return { pos: cs.position, z: cs.zIndex, disp: cs.display, w: cs.width }; })(),
  lpLinksInDom: Array.from(document.querySelectorAll('link[href*="launchpadjv"]')).map(function (l) { return l.outerHTML.slice(0, 200); }).slice(0, 2),
  messagesScriptText: (function () { var s = Array.from(document.scripts).find(function (s) { return s.textContent.indexOf('const messages=') !== -1; }); return s ? s.textContent : null; })(),
  notifScriptText: (function () { var s = Array.from(document.scripts).find(function (s) { return s.textContent.indexOf('purchase-notification') !== -1; }); return s ? s.textContent : null; })(),
  scrollY: window.scrollY
});
