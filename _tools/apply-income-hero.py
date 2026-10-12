from pathlib import Path
p=Path('index.html'); s=p.read_text(encoding='utf-8')
Path('_tools/index-before-income-hero.html').write_text(s,encoding='utf-8')
i=s.index('<section id="argon-hero"'); j=s.index('</section>',i)+len('</section>')
hero='''<section id="argon-hero" class="am-hero" aria-labelledby="am-headline">
  <div class="am-shell">
    <a class="am-brand" href="#argon-hero" aria-label="ArgonMAX home"><img src="assets/argonmax-logo.png" alt="ArgonMAX AI" width="340" fetchpriority="high"></a>
    <p class="am-eyebrow"><span aria-hidden="true">✦</span> ONE IDEA. YOUR NEXT INCOME STREAM.</p>
    <h1 id="am-headline">Turn Your Ideas Into<br><span class="am-rainbow">Digital Products</span><br class="am-mobile-break"> You Can <span class="am-sell">Sell.<svg viewBox="0 0 230 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11 Q105 1 227 7 M15 15 Q118 7 212 11" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span></h1>
    <p class="am-description">Create websites, ebooks, designs &amp; marketing content with Gemini-powered AI. <strong>Sell them to clients. Launch your own products. Build a business around your ideas.</strong></p>
    <div class="am-actions"><a class="am-primary" href="#box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc">See What You Can Build <span aria-hidden="true">↗</span></a><p>Pay once. Create more. <b>Keep what you earn.</b></p></div>
    <ul class="am-benefits"><li><span aria-hidden="true">✓</span> Commercial license included</li><li><span aria-hidden="true">✓</span> No monthly fees</li><li><span aria-hidden="true">✓</span> No coding or design skills needed</li></ul>
    <div class="am-opportunities" aria-label="What you can create and sell">
      <article class="am-card am-web"><div class="am-card-top"><span>BUILD FOR BUSINESSES</span><span aria-hidden="true">↗</span></div><div class="am-preview am-site" aria-hidden="true"><div class="am-browser-dots"><i></i><i></i><i></i></div><div class="am-site-body"><div><small>THE EVERYDAY STUDIO</small><b>A brighter<br>brand starts here.</b><span class="am-mini-button">Explore the collection →</span></div><div class="am-site-art"><span>✳</span></div></div></div><h2>Websites that win clients.</h2><p>Create landing pages, business websites &amp; sales funnels you can offer as a service.</p><span class="am-card-tag">Your next client project</span></article>
      <article class="am-card am-products"><div class="am-card-top"><span>LAUNCH YOUR OWN PRODUCTS</span><span aria-hidden="true">↗</span></div><div class="am-preview am-books" aria-hidden="true"><div class="am-book am-book-back"><small>THE CREATOR’S</small><b>IDEA<br>PLAYBOOK</b><span>MAKE SOMETHING THAT MATTERS</span></div><div class="am-book am-book-front"><small>FROM IDEA TO ACTION</small><b>CREATE.<br>PACKAGE.<br>SELL.</b><span>YOUR DIGITAL PRODUCT TOOLKIT</span></div></div><h2>Ideas worth putting on sale.</h2><p>Turn what you know into ebooks, guides &amp; digital products under your own brand.</p><span class="am-card-tag">Your own product line</span></article>
      <article class="am-card am-content"><div class="am-card-top"><span>OFFER CREATIVE SERVICES</span><span aria-hidden="true">↗</span></div><div class="am-preview am-creative" aria-hidden="true"><div class="am-ad"><small>MAKE YOUR BRAND</small><b>IMPOSSIBLE<br>TO IGNORE.</b><span>✺</span></div><div class="am-caption"><span>✦ Campaign ready</span><i></i><i></i><i></i><b>Copy + visuals<br>One clear message.</b></div></div><h2>Content businesses can use.</h2><p>Build a service around social graphics, ad copy &amp; marketing content for clients.</p><span class="am-card-tag">Your creative service offer</span></article>
    </div>
    <p class="am-bottom-line"><span>Create it.</span> <span>Package it.</span> <span>Put it to work.</span> <b>All with ArgonMAX.</b></p>
  </div>
</section>'''
p.write_text(s[:i]+hero+s[j:],encoding='utf-8')
