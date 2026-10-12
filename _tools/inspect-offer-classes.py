from pathlib import Path
import re
s=Path('index.html').read_text(encoding='utf-8')
for c in ['d131','d133','d135']:
 print(c, len(re.findall(r'class="[^"]*\b'+c+r'\b',s)))
for m in re.finditer(r'\.d131\s*\{[^}]+\}',s):print(m.group())
