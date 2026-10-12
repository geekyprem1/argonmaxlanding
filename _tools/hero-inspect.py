from html.parser import HTMLParser
import re
from pathlib import Path
s=Path('index.html').read_text(encoding='utf-8')
class P(HTMLParser):
 def __init__(self): super().__init__(); self.stack=[]; self.boxes=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='div':
   b=None
   if 'cvt-1568371626-box' in a.get('class','').split():
    b={'id':a.get('id'),'classes':a['class'],'text':''}; self.boxes.append(b)
   self.stack.append(b)
 def handle_endtag(self,t):
  if t=='div' and self.stack:self.stack.pop()
 def handle_data(self,d):
  for b in self.stack:
   if b:b['text']+=d
p=P();p.feed(s)
for b in p.boxes:
 props=' '.join(' '.join(re.findall(r'\.'+c+r'\s*\{([^}]*)\}',s)) for c in b['classes'].split() if re.fullmatch(r'd\d+',c))
 tops=re.findall(r'(?<!-)\btop:\s*([\d.]+)px',props)
 if tops and float(tops[-1])<1900:
  print(b['id'],props,'TEXT:',re.sub(r'\s+',' ',b['text'])[:180])
