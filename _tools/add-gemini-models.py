from pathlib import Path
p=Path('index.html'); s=p.read_text(encoding='utf-8')
s=s.replace('<p class="am-eyebrow"><span aria-hidden="true">✦</span> ONE IDEA. YOUR NEXT INCOME STREAM.</p>','<p class="am-eyebrow"><span class="am-gemini-mark" aria-hidden="true">✦</span> POWERED BY <strong>GEMINI 4.0 ARGON</strong></p><p class="am-product-caption">Your main AI engine. Your next income stream starts with an idea.</p>',1)
s=s.replace('Create websites, ebooks, designs &amp; marketing content with Gemini-powered AI.','Put <strong>Gemini Argon</strong> to work creating websites, ebooks, designs &amp; marketing content.',1)
strips='''<div class="am-model-access" aria-label="Included Gemini models">
      <span class="am-unlock-label">🔓 Unlock</span>
      <div class="am-model-item am-main-model"><span class="am-gemini-mark" aria-hidden="true">✦</span><span>Gemini 4.0<br>Argon<small>YOUR MAIN AI</small></span></div>
      <div class="am-model-item"><span class="am-gemini-mark" aria-hidden="true">✦</span><span>Gemini 3.8<br>Flash</span></div>
      <div class="am-model-item"><span class="am-gemini-mark" aria-hidden="true">✦</span><span>Gemini 3.7<br>Flash</span></div>
      <div class="am-model-item"><span class="am-gemini-mark" aria-hidden="true">✦</span><span>Gemini 3.6<br>Google</span></div>
      <div class="am-model-item"><span class="am-gemini-mark" aria-hidden="true">✦</span><span>All Future &amp;<br>Previous Models</span></div>
    </div>
    <div class="am-free-bonus" aria-label="Three free bonus AI models">
      <div class="am-bonus-gift" aria-hidden="true"><span>🎁</span><b>BONUS</b></div>
      <div class="am-bonus-body"><p>PLUS: GET <strong>3 MORE POWERFUL AI MODELS</strong> — FREE</p><ul><li><span class="am-claude-mark" aria-hidden="true">✳</span>Claude Opus 5.5</li><li><span class="am-claude-mark" aria-hidden="true">✳</span>ClaudeFable 5.1</li><li><span class="am-gpt-mark" aria-hidden="true">⬡</span>GPT-6 Astra</li></ul></div>
    </div>
    '''
s=s.replace('<div class="am-opportunities"',strips+'<div class="am-opportunities"',1)
p.write_text(s,encoding='utf-8')
