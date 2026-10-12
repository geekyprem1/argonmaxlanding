from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8');Path('_tools/index-before-offer-redesign.html').write_text(s,encoding='utf-8')
# Every repeated offer uses the same 605px backdrop class in the source layout.
pattern=r'<div class="(?P<cls>[^"]*\bd131\b[^"]*)" id="(?P<id>[^"]+)"><div\b[^>]*></div></div>'
checkout='https://launchpadjv.com/product/checkout/5519?page=4655&amp;offer=558&amp;offerProduct=6408'
markup='''<section class="am-offer" aria-label="Get ArgonMAX access"><div class="am-offer-atmosphere" aria-hidden="true"><i></i><i></i><i></i><span>✦</span></div><div class="am-offer-inner"><div class="am-offer-copy"><span class="am-offer-kicker">YOUR IDEAS. YOUR BRAND. YOUR NEXT MOVE.</span><h2>Your next big idea<br>deserves a <em>launch.</em></h2><p>Put <strong>Gemini Argon</strong> to work.<br>Create websites, content &amp; digital products you can use, publish or sell.</p><div class="am-offer-promise"><span>✦ Gemini 4.0 Argon at the core</span><span>✓ Commercial license included</span><span>✓ One payment. No monthly fees.</span></div></div><div class="am-offer-checkout"><div class="am-offer-access-label"><span>ARGONMAX ACCESS</span><span>PAY ONCE</span></div><div class="am-offer-price"><span class="am-offer-currency">$</span><strong>12</strong><div><span>one-time payment</span><s>Regular price $197</s></div></div><a class="am-offer-button" href="CHECKOUT" target="_blank" rel="noopener">Get ArgonMAX Access <span aria-hidden="true">↗</span></a><p class="am-offer-checkout-note">Checkout powered by Launchpad</p><div class="am-offer-guarantee"><span class="am-offer-shield" aria-hidden="true">✓</span><div><strong>30-day money-back guarantee</strong><span>Give your ideas room to grow.</span></div></div><div class="am-offer-cards"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>Discover</span></div></div></div></section>'''.replace('CHECKOUT',checkout)
ids=[]
def replace(m):
 ids.append(m['id'])
 return '<div class="'+m['cls']+' am-offer-host" id="'+m['id']+'">'+markup+'</div>'
s=re.sub(pattern,replace,s);assert len(ids)==13,len(ids)
# The individual legacy heading, blue panel, guarantee image and embeds are replaced by the component.
old_ids=[]
for m in re.finditer(r'<div class="[^"]*\bd135\b[^"]*" id="([^"]+)"',s):
 region=s[m.end():m.end()+9000]
 forge=region.index('class="forgeContainer"')
 boxes=list(re.finditer(r'<div class="[^"]*cvt-1568371626-box[^"]*" id="([^"]+)"',region[:forge]))
 assert boxes
 old_ids.append(boxes[-1][1])
for old_id in old_ids:
 s=re.sub(r'(<div class=")([^"]+)(" id="'+re.escape(old_id)+r'")',r'\1\2 am-offer-old\3',s,count=1)
s=s.replace('</head>','<link rel="stylesheet" href="assets/argon-offers.css"></head>',1)
p.write_text(s,encoding='utf-8')
print('Rebuilt',len(ids),'repeated offers; replaced',len(old_ids),'legacy checkout embeds.')
