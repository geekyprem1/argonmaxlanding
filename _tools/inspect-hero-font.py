from pathlib import Path
import re
s=Path('index.html').read_text(encoding='utf-8')
for c in ['d13','d16','d21','d30','d32','m14','m20','m31','m34']:
 print(c, re.findall(r'\.'+c+r'\s*\{[^}]*\}',s)[:2])
for m in list(re.finditer('Brand New',s)):
 print(s[max(0,m.start()-300):m.start()+450])
