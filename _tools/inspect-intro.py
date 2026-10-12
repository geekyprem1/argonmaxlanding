from pathlib import Path
s=Path('index.html').read_text(encoding='utf-8')
for text in ['Lucky For You','Starting Today','code red']:
 i=s.find(text); print(text,i); print(s[max(0,i-550):i+2600])
