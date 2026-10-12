const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  try {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'], acceptDownloads: true });
    const page = await context.newPage();
    const errors = [], failedAssets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failedAssets.push(response.url()); });
    await page.route('https://**/*', route => route.abort());
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto('http://127.0.0.1:8140/jv.html');
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: innerWidth, pageWidth: document.documentElement.scrollWidth,
        moduleCount: document.querySelectorAll('.module-card').length + document.querySelectorAll('.module-feature').length,
        rows: document.querySelectorAll('#funnel-body tr').length,
        swipes: document.querySelectorAll('#swipe-select option').length,
        brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).length,
        missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash && !document.getElementById(a.hash.slice(1))).map(a => a.hash),
        affiliateLinks: [...document.querySelectorAll('[data-affiliate]')].every(a => a.href === 'https://launchpadjv.com/'),
        fontReady: document.fonts.check('16px Argon')
      }));
      assert.ok(layout.pageWidth <= width + 1, `Page overflow: ${JSON.stringify(layout)}`);
      assert.equal(layout.moduleCount, 13); assert.equal(layout.rows, 13); assert.equal(layout.swipes, 15);
      assert.equal(layout.brokenImages, 0); assert.equal(layout.missingAnchors.length, 0); assert.ok(layout.affiliateLinks); assert.ok(layout.fontReady);
      assert.equal(await page.locator('#cart-total').innerText(), '$898.95');
      assert.equal(await page.locator('#commission-total').innerText(), '$449.48');
      await page.screenshot({ path: `_tools/shots/jv-hero-${width}.png` });
      if (width === 390) {
        await page.locator('.menu-toggle').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
        await page.locator('.menu-toggle').click();
        await page.locator('#main-nav a[href="#funnel"]').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
        await page.locator('#contest').screenshot({ path: '_tools/shots/jv-contest-390.png', style: '.site-header,.toast,.skip-link{visibility:hidden!important}' });
      }
      console.log(`PASS layout ${width}px: 13 modules, 13 offer rows, 15 swipes, no page overflow or missing assets`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:8140/jv.html');
    await page.locator('#cart-value').fill('97'); await page.locator('#buyer-count').fill('20');
    assert.equal(await page.locator('#calculated-commission').innerText(), '$970.00');
    await page.locator('#buyer-count').fill('-1'); assert.equal(await page.locator('#calculated-commission').innerText(), '—');
    await page.locator('#buyer-count').fill('1.5'); assert.equal(await page.locator('#calculated-commission').innerText(), '—');
    await page.locator('#buyer-count').fill('0'); assert.equal(await page.locator('#calculated-commission').innerText(), '$0.00');
    await page.locator('#buyer-count').fill('10');
    await page.locator('#affiliate-url').fill('https://example.com/argon?affiliate=demo');
    await page.locator('#sender-name').fill('Demo Partner');
    await page.locator('#swipe-select').selectOption('4');
    assert.match(await page.locator('#swipe-body').innerText(), /https:\/\/example.com\/argon\?affiliate=demo/);
    assert.match(await page.locator('#swipe-body').innerText(), /Demo Partner/);
    await page.locator('#copy-swipe').click();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(clipboard, /^Subject: What if your next prompt started a website\?/);
    assert.match(clipboard, /Demo Partner/);
    await page.locator('#affiliate-url').fill('javascript:alert(1)');
    await page.locator('#copy-swipe').click(); assert.ok(await page.locator('#swipe-error').isVisible());
    await page.locator('#affiliate-url').fill('https://example.com/argon?affiliate=demo');
    await page.locator('#sender-name').fill('<img src=x onerror=alert(1)>');
    assert.equal(await page.locator('#swipe-body img').count(), 0);
    await page.locator('#sender-name').fill('Demo Partner');
    const getDownload = async id => {
      const pending = page.waitForEvent('download'); await page.locator(id).click(); const download = await pending;
      assert.equal(await download.failure(), null); return { name: download.suggestedFilename(), content: await fs.readFile(await download.path()) };
    };
    const swipePack = await getDownload('#download-swipes'); assert.match(swipePack.name, /email-swipes\.txt$/);
    assert.equal((swipePack.content.toString().match(/Subject: /g) || []).length, 15); assert.match(swipePack.content.toString(), /Demo Partner/);
    const guide = await getDownload('#download-guide'); assert.match(guide.content.toString(), /\$898\.95/); assert.match(guide.content.toString(), /October 16, 2026/);
    const banners = await getDownload('#download-banners'); assert.equal(banners.content.subarray(0, 2).toString(), 'PK');
    const calendar = await getDownload('#save-date'); const ics = calendar.content.toString();
    assert.match(ics, /DTSTART;VALUE=DATE:20261016/); assert.match(ics, /DTEND;VALUE=DATE:20261017/); assert.ok(ics.includes('\r\n'));
    await page.locator('.faq-items summary').first().click(); assert.equal(await page.locator('.faq-items details').first().getAttribute('open'), '');
    await page.locator('#resources').screenshot({ path: '_tools/shots/jv-resources-1440.png', style: '.site-header,.toast,.skip-link{visibility:hidden!important}' });
    await page.goto('http://127.0.0.1:8140/jv/?demo=1#funnel'); await page.waitForURL('**/jv.html?demo=1#funnel');
    await page.emulateMedia({ reducedMotion: 'reduce' }); assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.deepEqual(errors, []); assert.deepEqual(failedAssets, []);
    console.log('PASS interactions: calculator, personalization, safe text, clipboard, validation, 4 downloads, calendar dates, FAQ, alias redirect, reduced motion; no runtime errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
