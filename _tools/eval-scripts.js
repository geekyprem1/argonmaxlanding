JSON.stringify({
  scripts: Array.from(document.querySelectorAll('script')).map(function (s) { return s.src || '(inline:' + s.textContent.trim().slice(0, 60).replace(/\s+/g, ' ') + ')'; }),
  stylesheets: Array.from(document.styleSheets).map(function (s) { return s.href || '(inline)'; }),
  yallSrc: typeof window.yall === 'function' ? window.yall.toString().slice(0, 300) : null,
  yallVersion: window.yall && window.yall.version ? window.yall.version : null,
  loadedScripts: performance.getEntriesByType('resource').filter(function (r) { return r.initiatorType === 'script' || /\.js/.test(r.name); }).map(function (r) { return r.name; })
});
