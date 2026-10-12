JSON.stringify({
  title: document.title,
  yall: typeof window.yall,
  jquery: typeof window.jQuery,
  lazyTotal: document.querySelectorAll('.lazy-bg').length,
  lazyLoaded: document.querySelectorAll('.lazy-bg.lazy-bg-loaded').length,
  imgsTotal: document.querySelectorAll('img').length,
  imgsWithSrc: document.querySelectorAll('img[src]').length,
  imgsDataSrc: document.querySelectorAll('img[data-src]').length,
  iframesSrc: document.querySelectorAll('iframe[src]').length,
  forgeCount: document.querySelectorAll('.forgeContainer').length,
  forgeFilled: Array.from(document.querySelectorAll('.forgeContainer')).filter(e => e.children.length > 0).length,
  forgeSample: (Array.from(document.querySelectorAll('.forgeContainer')).find(e => e.children.length > 0) || {}).innerHTML ? Array.from(document.querySelectorAll('.forgeContainer')).find(e => e.children.length > 0).innerHTML.slice(0, 1200) : null,
  bodyScrollHeight: document.body.scrollHeight,
  docScrollHeight: document.documentElement.scrollHeight,
  countdownText: (document.querySelector('[data-countdown]') || {}).textContent,
  countdownHTML: (document.querySelector('[data-countdown]') || {}).innerHTML ? document.querySelector('[data-countdown]').innerHTML.slice(0, 800) : null
});
