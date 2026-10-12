from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8');needle='<section id="argon-hero" class="am-hero" aria-labelledby="am-headline">'
art='''
  <div class="am-creative-backdrop" aria-hidden="true">
    <svg class="am-idea-trails" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMin slice"><defs><linearGradient id="am-trail-color"><stop stop-color="#27b5eb"/><stop offset=".5" stop-color="#aa7df3"/><stop offset="1" stop-color="#f695bc"/></linearGradient></defs><path d="M-40 660 C230 700 265 580 176 482 S70 224 280 172"/><path d="M1480 194 C1270 153 1170 274 1275 405 S1370 610 1170 729"/><circle cx="176" cy="482" r="7"/><circle cx="1275" cy="405" r="6"/></svg>
    <div class="am-floating-work am-float-site"><span class="am-float-note">An idea → a client project</span><div class="am-float-window"><div class="am-float-toolbar"><i></i><i></i><i></i><span>YOUR NEXT LAUNCH</span></div><div class="am-float-site-content"><span>THE WEEKEND CO.</span><b>Good things.<br>Great beginnings.</b><div class="am-float-landscape"><i></i><i></i><span>✺</span></div><span class="am-float-cta">Discover something new ↗</span><div class="am-float-lines"><i></i><i></i></div></div></div><span class="am-floating-sticker">Made with an idea ✦</span></div>
    <div class="am-floating-work am-float-product"><span class="am-float-note">Knowledge → your own product</span><div class="am-float-cover"><small>THE INDEPENDENT CREATOR</small><b>MAKE<br>YOUR<br>MARK.</b><div class="am-cover-flower">✳</div><span>A FIELD GUIDE TO BIG IDEAS</span></div><div class="am-float-cover-back"></div><span class="am-floating-sticker">Ready to make it yours?</span></div>
    <div class="am-orbit-chip am-chip-code"><span>⟨ / ⟩</span> Build something.</div>
    <div class="am-orbit-chip am-chip-design"><span>✳</span> Give it your style.</div>
    <span class="am-background-spark am-spark-one">✦</span><span class="am-background-spark am-spark-two">✧</span>
  </div>'''
assert needle in s
s=s.replace(needle,needle+art,1);p.write_text(s,encoding='utf-8')
