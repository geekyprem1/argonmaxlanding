from pathlib import Path
p=Path('index.html'); s=p.read_text(encoding='utf-8')
Path('_tools/index-before-gemini-hero.html').write_text(s,encoding='utf-8')
hero='''<section id="argon-hero" class="am-hero" aria-labelledby="am-headline">
  <div class="am-shell">
    <a class="am-brand" href="#argon-hero" aria-label="ArgonMAX home"><img src="assets/argonmax-logo.png" alt="ArgonMAX AI" width="380" fetchpriority="high"></a>
    <div class="am-intro"><p><span class="am-google" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span> Has Just Entered a New AI Era — Meet <strong>Gemini 4 Argon.</strong></p><p>Explore a new generation of AI. <b>All from one simple workspace.</b></p></div>
    <div class="am-headline-panel">
      <p class="am-badge">🚀 BREAKTHROUGH AI APP</p>
      <h1 id="am-headline"><span class="am-line">Gives You <mark class="am-lifetime">LIFETIME,</mark> <mark class="am-unlimited">Unlimited ACCESS</mark> To</span><span class="am-line"><span class="am-gemini">Gemini’s</span> Most Powerful AI Models</span></h1>
      <p class="am-no-fees">Without Paying Any Monthly Fees.<svg viewBox="0 0 700 18" preserveAspectRatio="none" aria-hidden="true"><path d="M4 12 Q230 1 694 7 M15 16 Q330 7 680 11" fill="none" stroke="#05a7e9" stroke-width="4" stroke-linecap="round"/></svg></p>
    </div>
    <div class="am-models" aria-label="Included Gemini models"><span class="am-unlock">🔓 Unlock</span><div class="am-model"><span class="am-star" aria-hidden="true">✦</span><span>Gemini 4.0<br>Argon</span></div><div class="am-model"><span class="am-star" aria-hidden="true">✦</span><span>Gemini 3.8<br>Flash</span></div><div class="am-model"><span class="am-star" aria-hidden="true">✦</span><span>Gemini 3.7<br>Flash</span></div><div class="am-model"><span class="am-star" aria-hidden="true">✦</span><span>Gemini 3.6<br>Google</span></div><div class="am-model"><span class="am-star" aria-hidden="true">✦</span><span>All Future &amp;<br>Previous Models</span></div></div>
    <p class="am-capabilities"><span>Explore</span> · <span>Research</span> · <span>Create</span> · <span>Design</span> · <span>Write</span> · <span>Build</span></p>
    <ul class="am-benefits"><li><span aria-hidden="true">✓</span> NO MONTHLY FEES</li><li><span aria-hidden="true">✓</span> NO MULTIPLE SUBSCRIPTIONS</li><li><span aria-hidden="true">✓</span> NO CREDIT LIMIT</li></ul>
    <div class="am-bonus"><p>PLUS: GET <strong>3 MORE POWERFUL AI MODELS</strong> — FREE</p><div><span>✦ Claude Opus 5.5</span><span>✦ ClaudeFable 5.1</span><span>✦ GPT-6 Astra</span></div></div>
  </div>
</section>'''
s=s.replace('</head>','<link rel="stylesheet" href="assets/argon-hero.css"></head>',1)
s=s.replace('<body class="">','<body class="">'+hero,1)
s=s.replace('</body>','<script src="assets/argon-hero.js"></script></body>',1)
p.write_text(s,encoding='utf-8')
