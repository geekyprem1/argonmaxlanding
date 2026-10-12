(() => {
  'use strict';
  const config = window.ARGON_JV_CONFIG || {};
  const $ = id => document.getElementById(id);
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const launchDate = /^\d{4}-\d{2}-\d{2}$/.test(config.launchDate || '') ? config.launchDate : '2026-10-16';
  const friendlyDate = new Date(`${launchDate}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const validWebUrl = value => { try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; } };
  const validContactUrl = value => validWebUrl(value) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
  if (validWebUrl(config.affiliateUrl)) document.querySelectorAll('[data-affiliate]').forEach(link => { link.href = config.affiliateUrl; });
  [['review', validWebUrl], ['support', validContactUrl]].forEach(([kind, validate]) => {
    if (config[`${kind}Text`]) $(`${kind}-status`).textContent = config[`${kind}Text`];
    if (validate(config[`${kind}Url`])) { $(`${kind}-link`).href = config[`${kind}Url`]; $(`${kind}-link`).hidden = false; }
  });
  const moduleIcons = {"AI Chat":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 11a8 8 0 0 1-8 8H7l-5 3 1.5-6A8 8 0 1 1 21 11Z\"/></svg>","AI Writer":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m16 3 5 5-13 13H3v-5L16 3Zm-2 2 5 5M3 21l5-1\"/></svg>","Code Generator":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18\"/></svg>","Templates":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg>","Chat with PDF":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z\"/><path d=\"M14 2v6h6M8 13h8m-8 4h6\"/></svg>","Bulk Generator":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5\"/></svg>","Creative Studio":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8\" cy=\"8\" r=\"1.5\"/><path d=\"m21 16-5-5L5 21\"/></svg>","Training":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"/><path d=\"m10 8 6 4-6 4V8Z\"/></svg>","Agency":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M8 7V3h8v4M3 12c6 4 12 4 18 0m-9 1v4\"/></svg>","Team":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M1 21v-3a6 6 0 0 1 12 0v3M17 3a4 4 0 0 1 0 8m1 3a5 5 0 0 1 5 5v2\"/></svg>","Branding":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 3 9 9-9 9-9-9 9-9Z\"/><path d=\"m8 12 4-4 4 4-4 4-4-4Z\"/></svg>","Reseller":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 17 17 7M7 7h10v10\"/></svg>"};
  const modules = [
    ['AI Chat', 'Explore ideas, ask questions and work through your next project.', 'YOUR EVERYDAY AI ASSISTANT', '✧', 'blue'],
    ['AI Writer', 'Draft articles, sales copy, emails and scripts in one place.', 'WORDS THAT MOVE IDEAS FORWARD', '✎', 'purple'],
    ['Code Generator', 'Create code drafts and starting points for your development work.', 'FROM AN IDEA TO YOUR NEXT BUILD', '〈/〉', 'blue'],
    ['Templates', 'Start with expert-inspired prompts and ready-to-adapt workflows.', 'SKIP THE BLANK PAGE', '▦', 'orange'],
    ['Chat with PDF', 'Ask questions, find key points and explore your documents.', 'GIVE YOUR DOCUMENTS A VOICE', '▤', 'blue'],
    ['Bulk Generator', 'Prepare batches of content for campaigns and publishing plans.', 'MAKE ROOM FOR MORE OUTPUT', '▥', 'purple'],
    ['Creative Studio', 'Develop image and video assets for your next creative project.', 'PUT YOUR IMAGINATION TO WORK', '✳', 'pink'],
    ['Training', 'Explore practical lessons on using the tools and finding your audience.', 'A CLEARER NEXT STEP', '▷', 'orange'],
    ['Agency', 'Organize client work in a dedicated agency workspace.', 'BUILT AROUND YOUR CLIENTS', '◈', 'blue'],
    ['Team', 'Bring collaborators and assistants into your shared workspace.', 'GOOD WORK HAPPENS TOGETHER', '♧', 'purple'],
    ['Branding', 'Make the workspace your own with custom branding options.', 'YOUR NAME. YOUR EXPERIENCE.', '◇', 'pink'],
    ['Reseller', 'Explore the planned reseller edition and its licensing options.', 'A NEW WAY TO PARTNER', '↗', 'orange']
  ];
  const colors = { blue: ['#edf4ff', '#487bc4'], purple: ['#f3eefb', '#9878bd'], orange: ['#fff3e6', '#bd8a53'], pink: ['#fdf0f7', '#bd7b9b'] };
  modules.forEach(([name, description, caption, icon, color]) => {
    const card = document.createElement('article'); card.className = 'module-card';
    card.style.setProperty('--module-tint', colors[color][0]); card.style.setProperty('--module-accent', colors[color][1]);
    const symbol = document.createElement('span'); symbol.className = 'module-icon'; symbol.setAttribute('aria-hidden', 'true'); symbol.innerHTML = moduleIcons[name];
    const title = document.createElement('h3'); title.textContent = name;
    const copy = document.createElement('p'); copy.textContent = description;
    const label = document.createElement('small'); label.textContent = caption;
    card.append(symbol, title, copy, label); $('module-grid').append(card);
  });
  const funnel = [
    { step: 'FRONT END', name: 'ArgonMax Commercial', cents: 1700, note: 'The entry offer', front: true },
    { step: 'BUMP', name: 'Template Mega Pack', cents: 995, note: 'An optional checkout add-on' },
    { step: 'OTO 1', name: 'Unlimited Pro', cents: 4700, note: 'Unlimited words plus Pro, PDF and vision features', featured: true, ds: ['Unlimited Pro Lite', 2700] },
    { step: 'OTO 2', name: 'Creative PRO — Gold', cents: 8700, note: 'AI image and video creation', ds: ['Creative PRO Silver', 4700] },
    { step: 'OTO 3', name: 'DFY Pack', cents: 6700, note: 'Done-for-you pack', ds: ['DS DFY Lite', 3700] },
    { step: 'OTO 4', name: 'Automation / Bulk', cents: 3900, note: 'Automation and bulk workflows', ds: ['DS Automation Lite', 2700] },
    { step: 'OTO 5', name: 'Traffic / Leads', cents: 4700, note: 'Traffic and lead generation', ds: ['DS Traffic Lite', 2700] },
    { step: 'OTO 6', name: 'Agency', cents: 9700, note: 'For freelancers and agency owners', ds: ['DS Agency Lite', 6700] },
    { step: 'OTO 7', name: 'Reseller', cents: 6700, note: 'Reseller edition; subject to license terms', ds: ['DS Reseller Lite', 4700] },
    { step: 'OTO 8', name: 'Whitelabel', cents: 19700, note: 'Custom branding and domain options', ds: ['DS Whitelabel Lite', 9700] },
    { step: 'OTO 9', name: 'Enterprise / Team', cents: 12700, note: 'For growing teams and organizations', ds: ['DS Enterprise Lite', 7700] },
    { step: 'OTO 10', name: 'VIP DFY + Coaching', cents: 9700, note: 'Done-for-you service with coaching', ds: ['DS VIP Lite', 4700] },
    { step: 'BUNDLE', name: 'Everything Bundle', cents: 24700, maxCents: 29700, note: 'Alternative to buying the offers individually; excluded from the main-funnel total', bundle: true }
  ];
  funnel.forEach(item => {
    const row = document.createElement('tr'); if (item.front) row.className = 'front-end'; if (item.bundle) row.className = 'bundle';
    const half = cents => money(Math.round(cents / 2) / 100);
    const price = item.maxCents ? `${money(item.cents / 100)}–${money(item.maxCents / 100)}` : money(item.cents / 100);
    const share = item.maxCents ? `${half(item.cents)}–${half(item.maxCents)}` : half(item.cents);
    const values = [item.step, item.featured ? `${item.name} · Featured` : item.name, price, item.ds ? `${item.ds[0]} · ${money(item.ds[1] / 100)}` : '—', share];
    values.forEach((value, index) => { const cell = document.createElement('td'); cell.textContent = value; if (index === 1) { const note = document.createElement('small'); note.textContent = item.note; cell.append(note); } row.append(cell); });
    $('funnel-body').append(row);
  });
  const cartCents = funnel.filter(item => !item.bundle).reduce((total, item) => total + item.cents, 0);
  $('cart-total').textContent = money(cartCents / 100);
  $('commission-total').textContent = money(Math.round(cartCents / 2) / 100);
  const calculate = () => {
    const cart = $('cart-value').valueAsNumber, buyers = $('buyer-count').valueAsNumber;
    const valid = Number.isFinite(cart) && Number.isFinite(buyers) && cart >= 0 && cart <= 100000 && buyers >= 0 && buyers <= 100000 && Number.isInteger(buyers);
    $('calculated-commission').textContent = valid ? money(cart * buyers * 0.5) : '—';
  };
  $('cart-value').addEventListener('input', calculate); $('buyer-count').addEventListener('input', calculate);
  const menu = document.querySelector('.menu-toggle');
  const navLinks = [...$('main-nav').querySelectorAll('a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { navLinks.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) navObserver.observe(section); });
  }
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); $('main-nav').classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); $('main-nav').classList.toggle('is-open', open); });
  $('main-nav').querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if (!document.querySelector('.site-header').contains(event.target)) closeMenu(); });

  // Email copy and all subject options from ArgonMAX AI - Email Swipes.docx.
  const swipes = [
  {
    "title": "01 · Live now",
    "stage": "LAUNCH DAY",
    "subjects": [
      "🚀 LIVE NOW: Create Anything With Gemini — Unlimited For Life",
      "♾️ Gemini Is Now Unlimited… For LIFE",
      "🤯 Unlimited Gemini For Life? Yes, It’s Finally Here",
      "♾️ You Can Now Create With Gemini… Without Limits",
      "🔥 Argonmax AI Is LIVE — And This Is BIG"
    ],
    "body": "Hello {{ First Name }},\n\nOkay, this is something you’re definitely going to want to check out.\n\nArgonmax AI is now LIVE. 🔥\n\nAnd the best part?\n\nYou can now use the power of Gemini to create pretty much anything you want — unlimited, for life. ♾️\n\nNo worrying about running out of credits.\nNo constantly checking your usage.\nNo jumping between different Gemini subscriptions.\n\n👉 Check Out Argonmax AI Now\n\nYou get access to the latest Gemini models, including:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ All previous Gemini models\n\nSo whether you want to build a website, create an app, make cinematic videos, design images, write an ebook, build an AI game or create a sales funnel…\n\nYou can just tell Gemini what you want and start creating. 🚀\n\nAnd there’s even more…\n\n🎁 You also get Claude Opus 5.5, ClaudeFable 5.1 & GPT-6 Astra F’REE.\n\nBasically, you’re getting a whole lot of AI power in one place.\n\nUnlimited.\nFor life.\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "02 · Unlimited for life",
    "stage": "UNLIMITED ACCESS",
    "subjects": [
      "🤯 Wait… Unlimited Gemini For LIFE?!",
      "🔥 Gemini Without Limits Is Finally Here",
      "♾️ Gemini. Unlimited. For Life.",
      "🚨 Unlimited Gemini For Life Is HERE!",
      "🔥 Unlimited Gemini Access — For Life"
    ],
    "body": "Hello {{ First Name }},\n\nUnlimited Gemini. For Life. ♾️\n\nYep… you read that right. 👀\n\nCheck Out Argonmax AI Now ->\n\nWith Argonmax AI, you can unlock the power of Gemini’s most powerful models and keep using them without worrying about credits or monthly limits.\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6 + previous models\n\nJust UNLIMITED Gemini access — FOR LIFE. ♾️🔥\n\nAnd you can use it to create:\n\n🌐 Websites & Funnels\n🎬 Cinematic Videos & AI Movies\n💻 Web Apps & AI Games\n🎨 Images & Designs\n📚 Ebooks & Digital Products\n📊 Presentations & more\n\nPlus, Claude Opus 5.5 + ClaudeFable 5.1 + GPT-6 Astra FREE. 🎁\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "03 · Create without limits",
    "stage": "CREATE WITHOUT LIMITS",
    "subjects": [
      "👀 This Is What Unlimited AI Actually Looks Like…",
      "🔥 Wait… You Can Really Create Without Limits?",
      "🚀 You Won’t Believe What Argonmax AI Lets You Create",
      "🤯 No Credits Left? You Need To See This…",
      "♾️ Unlimited AI For Life? Here’s The Catch…"
    ],
    "body": "Hello {{ First Name }},\n\nI know you already have a LOT of AI tools. 😅\n\nBut there’s one problem they ALL seem to have…\n\nLIMITS. 😩\n\nYou’re creating something…\n\nAnd suddenly — credits gone. 🤦‍♂️\n\nIt’s frustrating. And honestly, we ALL deal with it.\n\nSo I found something for you…\n\n🔥 Check Out Argonmax AI Now ->\n\nIt gives you Gemini access for a LIFETIME. ♾️\n\nAnd the best part?\n\nCREATE. WHATEVER. YOU WANT.\n\n🌐 Websites\n🎬 Videos\n🎨 Images\n💻 Apps\n🎮 Games\n📚 Ebooks & more\n\nUnlimited. 🔥\n\nPlus, you get Claude Opus 5.5 + ClaudeFable 5.1 + GPT-6 Astra F’REE. 🎁\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "04 · Stop renting your AI",
    "stage": "LIFETIME ACCESS",
    "subjects": [
      "🔥 STOP RENTING YOUR AI.",
      "😩 Your AI Gets Better. Your Bill Gets Bigger.",
      "🚨 How Long Are You Going To Keep Paying Monthly?",
      "♾️ What If You Could Keep Your AI For LIFE?",
      "🤯 Stop Paying. Start Owning Your AI."
    ],
    "body": "Hello {{ First Name }},\n\nThe AI keeps getting better.\n\nBut your subscription?\n\nKeeps charging you. 😩\n\nEvery. Single. Month.\n\nAnd the moment you stop paying…\n\nYour access stops too.\n\n🔥 STOP RENTING YOUR AI.\n\nThat’s why Argonmax AI caught my attention.\n\nCheck it Now ->\n\nIt gives you UNLIMITED Gemini access — FOR LIFE. ♾️\n\nIncluding:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nNo monthly fees.\nNo credit limits.\nNo constant subscription payments.\n\nAnd you also get:\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\n\nOne access. Unlimited use. For life. ♾️🔥\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "05 · The AI race",
    "stage": "MODEL LINEUP",
    "subjects": [
      "🚨 The AI Race Just Changed AGAIN…",
      "🤯 Google Just Unleashed Gemini 4 Argon",
      "🔥 Gemini 4 Argon Is Here…",
      "👀 Google Just Made A BIG Move",
      "♾️ The New Gemini — Unlimited For Life?"
    ],
    "body": "Hello {{ First Name }},\n\nTHE AI RACE JUST CHANGED AGAIN. 🚨\n\nChatGPT is evolving.\nClaude is evolving.\nGrok is evolving.\n\nAnd now…\n\nGoogle has pushed Gemini into a whole new generation with Gemini 4 Argon. 🔥\n\nAnd I’ve got something pretty exciting for you…\n\n🔥 Check Out Argonmax AI Now ->\n\nIt gives you UNLIMITED & LIFETIME access to Gemini’s powerful models:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ All Previous Gemini Models\n\nNo credit limits.\nNo monthly fees.\nNo worrying about running out. ♾️\n\nAnd you’re not done yet…\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\nALL included as bonuses. 🔥\n\nGoogle is pushing Gemini into its next era.\n\nNow you can get in — Unlimited & For Life. ♾️\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "06 · AI subscription costs",
    "stage": "SUBSCRIPTION SAVINGS",
    "subjects": [
      "💸 Add Up Your AI Subscriptions. Seriously.",
      "😳 $20 Here. $30 There. It Adds Up.",
      "🤯 How Many AI Subscriptions Are You Paying For?",
      "🚨 Your AI Stack Is Costing More Than You Think",
      "💰 One Less AI Subscription To Pay Every Month"
    ],
    "body": "Hello {{ First Name }},\n\nTry something for me… 👀\n\nOpen your bank statement.\n\nNow look at everything you’re paying for AI each month.\n\nOne for writing.\nOne for images.\nOne for video.\nAnother one you subscribed to just to try. 😅\n\nEach one doesn’t look like much…\n\nBut together?\n\nThat monthly bill adds up FAST. 💸\n\nAnd that’s exactly what Argonmax AI is here to change.\n\nCheck It Now ->\n\nYou get UNLIMITED, LIFETIME access to Gemini’s powerful AI models. ♾️\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nNo monthly renewal.\nNo credit limits.\nNo subscription stack.\n\nAnd you also get 3 powerful AI models FREE:\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\n\nOne payment. Unlimited Gemini. For life. ♾️\n\nMaybe it’s time to stop stacking AI subscriptions. 🔥\n\nClick Here to Learn More Details About Argonmax AI >>\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "07 · No credit limits",
    "stage": "NO CREDIT LIMITS",
    "subjects": [
      "🚨 “You’ve Run Out Of Credits.”",
      "😩 Ever Hit An AI Limit Mid-Project?",
      "🔥 No Credit Counters. Ever.",
      "🤯 Your AI Just Ran Out… Again?",
      "♾️ What If AI Never Said “You’ve Hit Your Limit”?"
    ],
    "body": "Hello {{ First Name }},\n\nYou’re right in the middle of something good…\n\nEverything is going perfectly.\n\nAnd then suddenly:\n\n“You’ve reached your limit.” 😩\n\nSeriously?\n\nNow you either wait… or pay more. 💸\n\nAnd that’s one of the most frustrating things about AI subscriptions.\nIt’s not just the monthly fee.\n\nIt’s the credits. The caps. The limits.\n\nThat’s why Argonmax AI caught my attention. 👀\n\nCheck it Now ->\n\nYou get LIFETIME + UNLIMITED access to powerful Gemini models:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nNo credit limits.\nNo monthly fees.\nNo paying extra when you actually want to use it. ♾️\n\nPlus, you get:\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\n\nUse Gemini as much as you want. For life. 🔥\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "08 · A second look",
    "stage": "FOLLOW-UP",
    "subjects": [
      "👀 Did You See Argonmax AI Yet?",
      "🔥 I Didn’t Want You To Miss This One…",
      "♾️ Your Lifetime Gemini Access Is Waiting",
      "🤯 This Gemini Deal Deserves A Second Look",
      "🚀 Still Thinking About Argonmax AI?"
    ],
    "body": "Hello {{ First Name }},\n\nJust wanted to put Argonmax AI back on your radar. 👀\n\nBecause honestly, this is one of those AI tools you’ll want to know about.\n\nCheck it Now ->\n\nYou’re getting Gemini’s most powerful models — UNLIMITED & FOR LIFE. ♾️🔥\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nAnd yes…\n\nUnlimited means unlimited. 😎\n\nNo monthly fees.\nNo credit limits.\nNo juggling multiple subscriptions.\n\nPlus, you get Claude Opus 5.5 + ClaudeFable 5.1 + GPT-6 Astra FREE. 🎁\n\nIf you’ve been meaning to check it out…\n\nThis is your reminder. 😉\n\nClick Here to Learn More Details About Argonmax AI >>\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "09 · One more look",
    "stage": "FOLLOW-UP",
    "subjects": [
      "👀 One More Look At Argonmax AI…",
      "🔥 This One Is Still On My Mind…",
      "🤯 Argonmax AI Is A BIG One…",
      "♾️ The “For Life” Part Is What Got Me…",
      "🚀 You Might Want To See This…"
    ],
    "body": "Hello {{ First Name }},\n\nI had to bring this one up again. 👀\n\nBecause getting access to powerful AI is one thing…\n\nGetting it UNLIMITED & FOR LIFE is another. ♾️\n\nThat’s what makes Argonmax AI so interesting\n.\nCheck It Now ->\nYou get:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nFor life.\n\nAnd there’s more waiting inside… 👇\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\n\nNo need to keep adding another AI subscription to your list.\n\nArgonmax AI gives you one powerful place to work with these models. 🔥\n\nClick Here to Learn More Details About Argonmax AI >>\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  },
  {
    "title": "10 · Last call",
    "stage": "FINAL REMINDER",
    "subjects": [
      "🚨 LAST CALL: Argonmax AI Won’t Wait Forever",
      "⏰ Final Reminder — Don’t Miss Argonmax AI",
      "🔥 This Is Your Last Chance To Get Argonmax AI",
      "🚨 Before You Miss This…",
      "⚠️ Closing Soon: Unlimited Gemini For Life"
    ],
    "body": "Hello {{ First Name }},\n\nOkay, this is the final reminder. ⏰\n\nI’ve told you about Argonmax AI…\n\nNow it’s simply up to you.\n\nBecause getting UNLIMITED Gemini access FOR LIFE isn’t something I’d casually pass on. ♾️🔥\n\nGrab It Now ->\n\nYou get:\n\n⚡ Gemini 4.0 Argon\n⚡ Gemini 3.8 Flash\n⚡ Gemini 3.7 Flash\n⚡ Gemini 3.6\n⚡ Previous Gemini models\n\nPlus:\n\n🎁 Claude Opus 5.5\n🎁 ClaudeFable 5.1\n🎁 GPT-6 Astra\n\nOne access. No monthly fees. Unlimited use. For life.\n\nBut this offer won’t stay open forever. 🚨\n\nIf you’ve been thinking about getting it…\n\nNow is the time.\n\nClick Here to Learn More Details About Argonmax AI >>\n\nDiscount Coupon -\n\n& Here’s The Best Part…\n\nTo make this deal irresistible, I’m adding Incredible Bonuses that you won’t find anywhere else:\n\nBonus #1 –\nBonus #2 –\nBonus #3 –\nBonus #4 –\nBonus #5 –\n\n👉Get Instant Access of Argonmax AI + All Bonuses Right Now >>\n\nDiscount Coupon -\nCheers,\nName"
  }
];
  swipes.forEach((swipe, index) => { const option = document.createElement('option'); option.value = String(index); option.textContent = swipe.title; $('swipe-select').append(option); });
  const personalize = value => value
    .replace(/^(.*(?:->|>>|Check Out Argonmax AI Now))[ \t]*$/gmi, '$1\n[AFFILIATE LINK]')
    .replace(/Name\s*$/, '[YOUR NAME]')
    .replaceAll('[AFFILIATE LINK]', () => $('affiliate-url').value.trim() || '[YOUR APPROVED AFFILIATE LINK]')
    .replaceAll('[YOUR NAME]', () => $('sender-name').value.trim() || '[YOUR NAME]');
  const selectedSwipe = () => swipes[Number($('swipe-select').value)] || swipes[0];
  const selectedSubject = () => selectedSwipe().subjects[Number($('swipe-subject-select').value)] || selectedSwipe().subjects[0];
  const renderSwipe = () => { const swipe = selectedSwipe(); $('swipe-stage').textContent = swipe.stage; $('swipe-subject').textContent = selectedSubject(); $('swipe-body').textContent = personalize(swipe.body); $('swipe-error').hidden = !$('affiliate-url').value.trim() || validWebUrl($('affiliate-url').value.trim()); };
  const renderSubjects = () => {
    $('swipe-subject-select').replaceChildren();
    selectedSwipe().subjects.forEach((subject, index) => { const option = document.createElement('option'); option.value = String(index); option.textContent = subject; $('swipe-subject-select').append(option); });
    renderSwipe();
  };
  $('swipe-select').addEventListener('change', renderSubjects); $('swipe-subject-select').addEventListener('change', renderSwipe); $('affiliate-url').addEventListener('input', renderSwipe); $('sender-name').addEventListener('input', renderSwipe); renderSubjects();
  let toastTimer;
  const toast = message => { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 3500); };
  const canExport = () => { if ($('affiliate-url').value.trim() && !validWebUrl($('affiliate-url').value.trim())) { $('swipe-error').hidden = false; $('affiliate-url').focus(); toast('Use a complete http:// or https:// affiliate link.'); return false; } return true; };
  const copyText = async text => {
    if (navigator.clipboard && window.isSecureContext) { try { await navigator.clipboard.writeText(text); return true; } catch { /* Fall back for file previews and restricted clipboard permissions. */ } }
    const area = document.createElement('textarea'); area.value = text; area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'; area.setAttribute('aria-label', 'Email text to copy'); document.body.append(area); area.focus(); area.select();
    let copied = false; try { copied = document.execCommand('copy'); } catch { copied = false; } area.remove(); $('copy-swipe').focus(); return copied;
  };
  $('copy-swipe').addEventListener('click', async () => { if (!canExport()) return; const swipe = selectedSwipe(); const copied = await copyText(`Subject: ${selectedSubject()}\n\n${personalize(swipe.body)}`); toast(copied ? 'Email copied. Review and personalize before sending.' : 'Copy unavailable. Select the email text to copy it.'); });
  const download = (filename, content, type = 'text/plain;charset=utf-8') => { const url = URL.createObjectURL(new Blob([content], { type })); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  $('download-swipes').addEventListener('click', () => {
    if (!canExport()) return;
    const intro = `ARGONMAX AI — ${swipes.length} EMAIL SWIPES · 5 SUBJECT LINES EACH\nLaunch: ${friendlyDate}\n\nDraft promotional copy. Verify final pricing, product capabilities and deadlines before sending. Insert your approved tracking link. Closing emails require a confirmed deadline; do not send placeholders. Include any affiliate disclosures required by your platform and audience.\n\n`;
    download('argonmax-ai-email-swipes.txt', intro + swipes.map(swipe => `${'='.repeat(65)}\n${swipe.title}\n${swipe.stage}\n\nSUBJECT LINES\n${swipe.subjects.map((subject, index) => `${index + 1}. ${subject}`).join('\n')}\n\nMAIL BODY\n${personalize(swipe.body)}\n`).join('\n')); toast(`Your ${swipes.length}-email swipe pack is ready.`);
  });
  $('download-banners').addEventListener('click', () => { const link = document.createElement('a'); link.href = 'assets/jv/argonmax-ai-banner-pack.zip'; link.download = 'argonmax-ai-banner-pack.zip'; document.body.append(link); link.click(); link.remove(); toast('Your three-size SVG banner pack is ready.'); });
  $('save-date').addEventListener('click', () => {
    const compact = launchDate.replaceAll('-', ''); const next = new Date(`${launchDate}T00:00:00Z`); next.setUTCDate(next.getUTCDate() + 1); const end = next.toISOString().slice(0, 10).replaceAll('-', '');
    const stamp = new Date().toISOString().replaceAll(/[-:]/g, '').replace(/\.\d{3}/, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ArgonMAX AI//JV Launch//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:argonmax-ai-${compact}@launchpadjv.com`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${compact}`, `DTEND;VALUE=DATE:${end}`, 'SUMMARY:ArgonMAX AI launch', 'DESCRIPTION:ArgonMAX AI launch day. Exact opening time and timezone to be confirmed.', `URL:${validWebUrl(config.affiliateUrl) ? config.affiliateUrl : 'https://launchpadjv.com/'}`, 'TRANSP:TRANSPARENT', 'END:VEVENT', 'END:VCALENDAR'];
    download('argonmax-ai-launch.ics', lines.join('\r\n') + '\r\n', 'text/calendar;charset=utf-8'); toast('Launch day saved. Exact opening time is coming soon.');
  });
})();
