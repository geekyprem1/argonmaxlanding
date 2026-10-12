from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8')
s=s.replace('YOUR IDEAS. YOUR BRAND. YOUR NEXT MOVE.','ArgonMAX / Gemini 4.0 Argon')
s=s.replace('Your next big idea<br> deserves a <em>launch.</em>','Build it with Argon.<br> <em>Sell it as your own.</em>')
s=s.replace('Put <strong>Gemini Argon</strong> to work.<br> Create websites, content &amp; digital products you can use, publish or sell.','Websites, ebooks &amp; content for your business or your next client. <strong>One AI workspace. Yours for a one-time payment.</strong>')
s=s.replace('✦ Gemini 4.0 Argon at the core','Gemini 4.0 Argon included').replace('✓ Commercial license included','Commercial license included').replace('✓ One payment. No monthly fees.','No monthly fees')
s=s.replace('Give your ideas room to grow.','30 days to try ArgonMAX.')
p.write_text(s,encoding='utf-8')
