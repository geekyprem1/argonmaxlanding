const {chromium}=require('playwright');
const path=require('path');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const page=await browser.newPage();
await page.route('https://**/*',route=>route.abort());
const results=[];
for(const width of [1440,390,768]){
await page.setViewportSize({width,height:1000});
await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'),{waitUntil:'load'});
await page.locator("#argon-hero").screenshot({path:`_tools/shots/argon-hero-${width}.png`});
results.push(await page.evaluate(()=>{
const hero=document.getElementById('argon-hero'), main=document.querySelector('.main-page'), demo=document.getElementById('box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc');
return {width:innerWidth,heroHeight:hero.getBoundingClientRect().height,heroOverflow:hero.scrollWidth>innerWidth,demoGap:demo.getBoundingClientRect().top-hero.getBoundingClientRect().bottom,logoLoaded:hero.querySelector('img').naturalWidth>0,heroFont:getComputedStyle(hero).fontFamily,oldHeroHidden:getComputedStyle(document.getElementById('box91b9a7db-ef76-a5b4-bb89-4d8ae8eae778')).display};
}));
await page.getByRole('tab',{name:'Code',exact:true}).click();
if(!await page.locator('#am-output-code').isVisible())throw Error('Code tab failed');
await page.getByRole('tab',{name:'Code',exact:true}).press('ArrowRight');
if(await page.getByRole('tab',{name:'Audio',exact:true}).getAttribute('aria-selected')!=='true')throw Error('Keyboard tab failed');
await page.emulateMedia({reducedMotion:'reduce'}); await page.locator('.am-secondary').click();
results.at(-1).demoReached=await page.evaluate(()=>Math.abs(document.getElementById('box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc').getBoundingClientRect().top)<2);
}
console.log(JSON.stringify(results,null,2));await browser.close();
})();
