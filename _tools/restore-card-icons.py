from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8')
old='<div class="am-offer-cards"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>Discover</span></div>'
new='<div class="am-offer-cards" aria-label="Accepted payment cards"><img src="assets/launchpadjv/36798a4c22-22.png" alt="American Express"><img src="assets/launchpadjv/f0e26ab681-10.png" alt="Discover and Diners Club"><img src="assets/launchpadjv/fd68624d41-16.png" alt="JCB"><img src="assets/launchpadjv/b5ce9022af-2.png" alt="Mastercard"><img src="assets/launchpadjv/ccc19a93f5-1.png" alt="Visa"></div>'
assert s.count(old)==13
p.write_text(s.replace(old,new),encoding='utf-8')
print('Restored original payment card icons in all 13 offer blocks.')
