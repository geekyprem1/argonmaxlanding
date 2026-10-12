import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

img_matches = list(re.finditer(r'<img[^>]+>', content))
for i in range(min(7, len(img_matches))):
    m = img_matches[i]
    tag = m.group(0)
    start = max(0, m.start() - 400)
    end = min(len(content), m.end() + 200)
    print(f"==================== IMG {i} ====================")
    print("TAG:", tag)
    print("CONTEXT:\n", content[start:end])
