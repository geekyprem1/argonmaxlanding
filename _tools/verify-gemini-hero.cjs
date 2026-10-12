const {chromium}=require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
 const page=await browser.newPage();await page.route('https://**/*',route=>route.abort());
 for(const width of [1440,390,768]){
 await page.setViewportSize({width,height:1100});await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'),{waitUntil:'load'});
 await page.locator('#argon-hero').screenshot({path:`_tools/shots/gemini-hero-${width}.png`});
 if(width===1440)await page.screenshot({path:'_tools/shots/argon-heading-restored.png',clip:{x:0,y:0,width:1440,height:780}});
 console.log(await page.evaluate(()=>{const h=document.getElementById('argon-hero'),d=document.getElementById('box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc');return {width:innerWidth,overflow:h.scrollWidth>innerWidth,logo:h.querySelector('img').naturalWidth,height:h.offsetHeight,demoGap:Math.round(d.getBoundingClientRect().top-h.getBoundingClientRect().bottom),hiddenHero:document.querySelectorAll('[data-am-old-hero]').length}}));
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.am-primary').click();
 const demoTop=await page.locator('#box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc').evaluate(el=>Math.round(el.getBoundingClientRect().top));
 if(Math.abs(demoTop)>2)throw new Error('Hero CTA did not reach demo: '+demoTop);
 console.log('Hero CTA reaches demo video.');
 await browser.close();
})();



