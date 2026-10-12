from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8')
Path('_tools/index-before-hero.html').write_text(s,encoding='utf-8')
hero=Path('_tools/hero-section.html').read_text(encoding='utf-8-sig')
s=s.replace('</head>','<link rel="stylesheet" href="assets/argon-hero.css"></head>',1)
s=s.replace('<body class="">','<body class="">'+hero,1)
s=s.replace('</body>','<script src="assets/argon-hero.js"></script></body>',1)
p.write_text(s,encoding='utf-8')
print('Hero markup, stylesheet, and interactive preview added.')
