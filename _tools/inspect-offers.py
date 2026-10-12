from pathlib import Path
import re
s=Path('index.html').read_text(encoding='utf-8')
for m in re.finditer('Get Started With This Revolutionary',s):
 start=s.rfind('<div class=" cvt-1568371626-box',0,m.start())
 print(s[start:m.start()+210])
print('forge containers',len(re.findall('forgeContainer',s)))
for m in re.finditer('forgeContainer',s):
 print(s[max(0,m.start()-420):m.start()+220])
