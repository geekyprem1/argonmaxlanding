from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8');removed=0
def disable(m):
 global removed
 if 'const notification=document.getElementById("purchase-notification")' in m.group(0):
  removed+=1
  return '<!-- Purchase notification disabled. -->'
 return m.group(0)
s=re.sub(r'<script\b[^>]*>[\s\S]*?</script>',disable,s)
assert removed==1, f'Expected one notification script, found {removed}'
s=s.replace('</head>','<style id="disable-purchase-notification">#purchase-notification{display:none!important;animation:none!important;pointer-events:none!important}</style></head>',1)
p.write_text(s,encoding='utf-8')
print('Disabled the purchase popup scheduler and hid its container.')
