from pathlib import Path
import re
s=Path('index.html').read_text(encoding='utf-8')
for m in re.finditer('purchase-notification',s):
 if 'script' in s[max(0,m.start()-300):m.start()] or 'getElementById' in s[max(0,m.start()-80):m.start()]:
  print(s[max(0,m.start()-150):m.start()+750])
