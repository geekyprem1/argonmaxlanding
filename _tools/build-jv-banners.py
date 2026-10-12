"""Build the downloadable ArgonMAX JV banner pack from the existing brand logo."""
from pathlib import Path
import base64
import zipfile

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'jv'
OUT.mkdir(parents=True, exist_ok=True)
LOGO = base64.b64encode((ROOT / 'assets' / 'argonmax-logo.png').read_bytes()).decode()

def banner(width, height, name):
    square = width == height
    compact = width <= 600
    logo_width = 240 if compact else 350 if square else 330
    x = 42 if compact else 65
    headline_y = 140 if compact else 395 if square else 280
    font = 40 if compact else 82 if square else 68
    lines = ['One workspace.', 'More possibilities.']
    line_height = font * 1.12
    headline = ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else line_height}">{line}</tspan>' for i, line in enumerate(lines))
    date_y = headline_y + line_height + (44 if compact else 72)
    button_y = date_y + (25 if compact else 50)
    button_width = 238 if compact else 300
    button_height = 40 if compact else 59
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">ArgonMAX AI — One workspace. More possibilities.</title><desc id="desc">13 AI modules. Launching October 16, 2026. Explore the launch.</desc>
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#eefaff"/><stop offset="1" stop-color="#e9e3ff"/></linearGradient><linearGradient id="button"><stop stop-color="#1766e5"/><stop offset="1" stop-color="#625add"/></linearGradient></defs>
<rect width="{width}" height="{height}" fill="url(#bg)"/><circle cx="{width}" cy="{height}" r="{height * .75}" fill="#cce7ff" opacity=".4"/>
<image x="{x}" y="{25 if compact else 55}" width="{logo_width}" height="{logo_width / 3}" href="data:image/png;base64,{LOGO}"/>
<text x="{x}" y="{headline_y}" font-family="Arial,sans-serif" font-size="{font}" font-weight="700" letter-spacing="-2" fill="#153355">{headline}</text>
<text x="{x}" y="{date_y}" font-family="Arial,sans-serif" font-size="{13 if compact else 22}" fill="#607896">13 AI modules · Launching October 16, 2026</text>
<rect x="{x}" y="{button_y}" width="{button_width}" height="{button_height}" rx="8" fill="url(#button)"/><text x="{x + 23}" y="{button_y + button_height * .65}" fill="white" font-family="Arial,sans-serif" font-size="{13 if compact else 19}" font-weight="600">Explore ArgonMAX AI ↗</text>
</svg>'''
    (OUT / name).write_text(svg, encoding='utf-8')

banner(1200, 628, 'argonmax-social-1200x628.svg')
banner(1080, 1080, 'argonmax-square-1080x1080.svg')
banner(600, 320, 'argonmax-email-600x320.svg')
(OUT / 'README.txt').write_text('ArgonMAX AI promotional banners\n\nIncludes social 1200x628, square 1080x1080 and email 600x320 SVG artwork.\nUse your approved affiliate link when placing these banners.\nFor email clients that do not display SVG, export the artwork as PNG in your image editor.\nDate shown: October 16, 2026. Confirm final product terms before promotion.\n', encoding='utf-8')
with zipfile.ZipFile(OUT / 'argonmax-ai-banner-pack.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(OUT.glob('*.svg')):
        archive.write(path, path.name)
    archive.write(OUT / 'README.txt', 'README.txt')
print('Built 3 branded SVG banners and ZIP pack.')
