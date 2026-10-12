JSON.stringify({
  yallFull: window.yall ? window.yall.toString() : null,
  kinetic: typeof window.Kinetic,
  unloadedImgs: Array.from(document.querySelectorAll('img[data-src]')).filter(function (i) { return !i.naturalWidth; }).length,
  totalDataSrc: document.querySelectorAll('img[data-src]').length,
  imgsSample: Array.from(document.querySelectorAll('img[data-src]')).slice(0, 8).map(function (i) { var r = i.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), nat: i.naturalWidth, cls: i.className.slice(0, 80), ds: (i.getAttribute('data-src') || '').slice(0, 80) }; }),
  notifByFlag: Array.from(document.querySelectorAll('img[src*="flagcdn"]')).slice(0, 3).map(function (i) { var p = i; for (var k = 0; k < 5 && p.parentElement; k++) p = p.parentElement; return p.outerHTML.slice(0, 2500); }),
  purchasedEls: Array.from(document.querySelectorAll('div,section')).filter(function (el) { return el.children.length <= 4 && /purchased Chat 6\.0 Astra/.test(el.textContent); }).slice(0, 2).map(function (el) { return el.outerHTML.slice(0, 2500); }),
  forgeClasses: Array.from(document.querySelectorAll('.forgeContainer')).slice(0, 2).map(function (e) { return { parentCls: e.parentElement.className.slice(0, 100), ownCls: e.className, prev: e.previousElementSibling ? e.previousElementSibling.tagName : null }; }),
  lpStyleTags: Array.from(document.querySelectorAll('head style')).filter(function (s) { return s.textContent.indexOf('btn-forge') !== -1; }).length
});
