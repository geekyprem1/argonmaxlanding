JSON.stringify({
  lazyLoaded: document.querySelectorAll('.lazy-bg.lazy-bg-loaded').length,
  lazyTotal: document.querySelectorAll('.lazy-bg').length,
  imgsWithSrc: document.querySelectorAll('img[src]').length,
  imgsDataSrc: document.querySelectorAll('img[data-src]').length,
  iframesSrc: document.querySelectorAll('iframe[src]').length,
  sampleBg: (function () {
    var el = document.querySelector('.lazy-bg');
    var el2 = document.querySelectorAll('.lazy-bg')[5];
    var el3 = document.querySelectorAll('.lazy-bg')[50];
    function info(e) {
      if (!e) return null;
      var cs = getComputedStyle(e);
      return { cls: e.className.slice(0, 120), bg: cs.backgroundImage.slice(0, 200), bgc: cs.backgroundColor };
    }
    return [info(el), info(el2), info(el3)];
  })(),
  forgeHTMLs: Array.from(document.querySelectorAll('.forgeContainer')).map(function (e) { return e.innerHTML; }),
  injectedStyles: Array.from(document.querySelectorAll('style')).filter(function (s) { return s.textContent.indexOf('btn-forge') !== -1 || s.textContent.indexOf('price-wrap') !== -1; }).map(function (s) { return s.textContent.slice(0, 4000); }),
  lpLinks: Array.from(document.querySelectorAll('link[rel=stylesheet]')).map(function (l) { return l.href; }).filter(function (h) { return h.indexOf('launchpadjv') !== -1; })
});
