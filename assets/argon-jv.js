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
    const symbol = document.createElement('span'); symbol.className = 'module-icon'; symbol.setAttribute('aria-hidden', 'true'); symbol.textContent = icon;
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
    const values = [item.step, item.featured ? `${item.name} ★` : item.name, price, item.ds ? `${item.ds[0]} · ${money(item.ds[1] / 100)}` : '—', share];
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
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); $('main-nav').classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); $('main-nav').classList.toggle('is-open', open); });
  $('main-nav').querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if (!document.querySelector('.site-header').contains(event.target)) closeMenu(); });

  const swipes = [
    { title: '01 · The first look', stage: 'PRE-LAUNCH', subject: 'Your AI tools called. They want a little less company.', body: `One tab for writing.\nAnother for images.\nAnother for code.\nAnother for the PDF you need to read.\n\nSound familiar?\n\nOn ${friendlyDate}, ArgonMAX AI is bringing a different approach: a connected workspace for content, creative assets, code and client projects.\n\nI've got a first look at the offer here:\n[AFFILIATE LINK]\n\nTake a look at the tools and see where they could fit into your work.\n\n[YOUR NAME]` },
    { title: '02 · Save the date', stage: 'PRE-LAUNCH', subject: 'Put October 16 on your calendar', body: `An idea is easy to start.\nGetting it across five different tools? Less so.\n\nArgonMAX AI launches on ${friendlyDate}.\n\nIt brings AI chat, writing, a Build Engine, code generation, document tools and creative workflows together in one place.\n\nThe planned launch entry price is $17, with advanced upgrades available separately. Final pricing and access are shown on the offer.\n\nHere's your first look:\n[AFFILIATE LINK]\n\n[YOUR NAME]` },
    { title: '03 · Launch-day introduction', stage: 'LAUNCH DAY', subject: 'Meet ArgonMAX AI: one workspace for your next big idea', body: `If your AI workflow involves a small army of browser tabs, this is worth a look.\n\nMeet ArgonMAX AI.\n\nOne place to explore ideas, draft content, create assets and start building your next project.\n\nThe platform brings together 13 modules, including:\n→ AI Chat and AI Writer\n→ Build Engine and Code Generator\n→ Creative Studio and Chat with PDF\n→ Bulk workflows, templates and training\n→ Agency, team, branding and reseller editions\n\nSee the product and current launch offer:\n[AFFILIATE LINK]\n\nCheck the edition details to choose the access you need.\n\n[YOUR NAME]` },
    { title: '04 · The subscription angle', stage: 'EARLY LAUNCH', subject: 'How many tools does one idea really need?', body: `Open your browser.\nCount the AI tabs.\n\nThere's probably a writer, an image tool, a coding assistant and something for documents.\n\nEach one has its own login. Its own workflow. Often its own bill.\n\nArgonMAX AI is designed to bring those everyday creative jobs into one workspace.\n\nThat doesn't mean every person needs every module. It means you can take a closer look at one connected toolkit instead of collecting another disconnected tool.\n\nExplore the offer here:\n[AFFILIATE LINK]\n\n[YOUR NAME]` },
    { title: '05 · Build something', stage: 'PRODUCT ANGLE', subject: 'What if your next prompt started a website?', body: `A headline is a good start.\nA page you can build on is even better.\n\nThe ArgonMAX AI Build Engine is designed for website, funnel, app and game starting points.\n\nTell it what you have in mind. Explore the output. Refine it for your project.\n\nIf you're a freelancer, creator or business owner, that's an interesting way to get past the blank page.\n\nSee the Build Engine and the editions available:\n[AFFILIATE LINK]\n\nAlways review and test generated work before publishing or delivering it.\n\n[YOUR NAME]` },
    { title: '06 · For content creators', stage: 'AUDIENCE ANGLE', subject: 'Your next campaign could start in one place', body: `A blog post.\nA launch email.\nA short video script.\nA week's worth of ideas.\n\nContent comes in a lot of formats. Your workflow doesn't have to be scattered across quite so many places.\n\nArgonMAX AI brings AI Writer, Templates and Bulk Generator workflows into the same platform.\n\nUse it to get a first draft moving, then add your own examples, experience and voice.\n\nExplore the content toolkit:\n[AFFILIATE LINK]\n\nCheck the selected edition for usage limits and bulk access.\n\n[YOUR NAME]` },
    { title: '07 · For freelancers & agencies', stage: 'AUDIENCE ANGLE', subject: 'A workspace with room for your client projects', body: `Client work means keeping a lot of things moving.\n\nThe copy. The creative. The website idea. The next revision.\n\nArgonMAX AI pairs its creative tools with planned agency, team and branding editions.\n\nIf you work with clients, take a look at how those editions could fit into your process.\n\nExplore the agency options:\n[AFFILIATE LINK]\n\nAgency, seats and custom branding depend on the purchased edition. Choose the setup that fits your actual workload.\n\n[YOUR NAME]` },
    { title: '08 · The document workflow', stage: 'PRODUCT ANGLE', subject: 'That PDF has answers. Ask it a question.', body: `You know the document has the answer.\nYou just don't know which page it's on.\n\nArgonMAX AI includes a planned Chat with PDF workflow for exploring documents, finding key points and asking questions.\n\nIt sits alongside the writing and chat tools, so your research can become a starting point for your next piece of work.\n\nTake a closer look:\n[AFFILIATE LINK]\n\nConfirm important details against the original document and check the edition's document limits.\n\n[YOUR NAME]` },
    { title: '09 · The creative studio', stage: 'PRODUCT ANGLE', subject: 'Give that idea something people can see', body: `Some ideas need more than a paragraph.\n\nA visual direction. An image concept. An asset for the next campaign.\n\nArgonMAX AI Creative Studio is part of a workspace built to connect your content and creative workflow.\n\nStart with the idea, explore the tools, and make the result your own.\n\nSee the Creative Studio offer:\n[AFFILIATE LINK]\n\nImage and video features, output allowances and premium options vary by edition.\n\n[YOUR NAME]` },
    { title: '10 · The objection email', stage: 'MID-LAUNCH', subject: 'Already have an AI tool? Here is what to look at.', body: `You may already have an AI tool you like.\n\nSo the question is simple:\n\nWould a connected workspace make your process easier?\n\nThat's what I'd look for in ArgonMAX AI. Not just another chat box, but writing, building, creative and document workflows in the same place.\n\nCompare the tools with what you already use.\nCheck the edition details.\nChoose based on the work you actually do.\n\nHere's the product overview:\n[AFFILIATE LINK]\n\n[YOUR NAME]` },
    { title: '11 · Choose your edition', stage: 'MID-LAUNCH', subject: 'Start with what you need. Keep room to grow.', body: `A solo creator doesn't need the same setup as an agency.\n\nThat's why the ArgonMAX AI launch plan includes an entry offer and separate upgrades for unlimited writing, AI image and video, done-for-you packs, automation and bulk, traffic and leads, agency, reseller, whitelabel, enterprise teams and VIP coaching.\n\nStart by asking what you want to make.\nThen check which edition includes the tools and allowances you need.\n\nSee the offer breakdown:\n[AFFILIATE LINK]\n\nFinal prices and entitlements are displayed on the offer.\n\n[YOUR NAME]` },
    { title: '12 · Show the product', stage: 'PROOF & REVIEW', subject: 'Take a closer look before you decide', body: `Words can explain an idea.\nA product walkthrough helps you assess it.\n\nBefore you decide about ArgonMAX AI, take a closer look at the workspace and the tools on offer.\n\nLook for the use cases that matter to you:\n→ Can it help you start your next project?\n→ Does the workflow make sense for your day?\n→ Does the edition include what you need?\n\nExplore the product here:\n[AFFILIATE LINK]\n\n[YOUR NAME]` },
    { title: '13 · The final 48 hours', stage: 'CLOSING DRAFT · CONFIRM DEADLINE', subject: 'Your ArgonMAX AI launch reminder', body: `A quick reminder if ArgonMAX AI is on your shortlist.\n\nThe confirmed launch-offer deadline is:\n[CLOSE DATE & TIME — INCLUDING TIMEZONE]\n\nIf the workspace looks like a fit, now is a good time to check the final offer, review the edition details and make your decision.\n\nSee the current offer:\n[AFFILIATE LINK]\n\nOnly use this reminder after the vendor confirms the deadline.\n\n[YOUR NAME]` },
    { title: '14 · The final day', stage: 'CLOSING DRAFT · CONFIRM DEADLINE', subject: 'One last look at the ArgonMAX AI launch offer', body: `Still thinking about a simpler creative workflow?\n\nThe ArgonMAX AI launch offer is scheduled to end at:\n[CLOSE DATE & TIME — INCLUDING TIMEZONE]\n\nTake one last look at the tools, the pricing and the edition that fits your work.\n\nYour next idea might need a writer, a builder, a creative toolkit or a place to explore a document. This workspace brings those possibilities together.\n\nReview the current offer here:\n[AFFILIATE LINK]\n\nSend this email only on the confirmed final day.\n\n[YOUR NAME]` },
    { title: '15 · The final reminder', stage: 'CLOSING DRAFT · CONFIRM DEADLINE', subject: 'Final reminder: review the ArgonMAX AI offer', body: `This is my final reminder about the ArgonMAX AI launch offer.\n\nThe confirmed deadline is:\n[CLOSE DATE & TIME — INCLUDING TIMEZONE]\n\nIf you've reviewed the product and it fits your plans, here's the link:\n[AFFILIATE LINK]\n\nCheck the current terms and choose the edition you need.\n\nThanks for taking a look.\n\n[YOUR NAME]\n\nUse this draft only after the vendor confirms the close. Do not add an unverified price increase or deadline.` }
  ];
  swipes.forEach((swipe, index) => { const option = document.createElement('option'); option.value = String(index); option.textContent = swipe.title; $('swipe-select').append(option); });
  const personalize = value => value.replaceAll('[AFFILIATE LINK]', $('affiliate-url').value.trim() || '[YOUR APPROVED AFFILIATE LINK]').replaceAll('[YOUR NAME]', $('sender-name').value.trim() || '[YOUR NAME]');
  const selectedSwipe = () => swipes[Number($('swipe-select').value)] || swipes[0];
  const renderSwipe = () => { const swipe = selectedSwipe(); $('swipe-stage').textContent = swipe.stage; $('swipe-subject').textContent = swipe.subject; $('swipe-body').textContent = personalize(swipe.body); $('swipe-error').hidden = !$('affiliate-url').value.trim() || validWebUrl($('affiliate-url').value.trim()); };
  $('swipe-select').addEventListener('change', renderSwipe); $('affiliate-url').addEventListener('input', renderSwipe); $('sender-name').addEventListener('input', renderSwipe); renderSwipe();
  let toastTimer;
  const toast = message => { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 3500); };
  const canExport = () => { if ($('affiliate-url').value.trim() && !validWebUrl($('affiliate-url').value.trim())) { $('swipe-error').hidden = false; $('affiliate-url').focus(); toast('Use a complete http:// or https:// affiliate link.'); return false; } return true; };
  const copyText = async text => {
    if (navigator.clipboard && window.isSecureContext) { try { await navigator.clipboard.writeText(text); return true; } catch { /* Fall back for file previews and restricted clipboard permissions. */ } }
    const area = document.createElement('textarea'); area.value = text; area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'; area.setAttribute('aria-label', 'Email text to copy'); document.body.append(area); area.focus(); area.select();
    let copied = false; try { copied = document.execCommand('copy'); } catch { copied = false; } area.remove(); $('copy-swipe').focus(); return copied;
  };
  $('copy-swipe').addEventListener('click', async () => { if (!canExport()) return; const swipe = selectedSwipe(); const copied = await copyText(`Subject: ${swipe.subject}\n\n${personalize(swipe.body)}`); toast(copied ? 'Email copied. Review and personalize before sending.' : 'Copy unavailable. Select the email text to copy it.'); });
  const download = (filename, content, type = 'text/plain;charset=utf-8') => { const url = URL.createObjectURL(new Blob([content], { type })); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  $('download-swipes').addEventListener('click', () => {
    if (!canExport()) return;
    const intro = `ARGONMAX AI — 15 EMAIL SWIPES\nLaunch: ${friendlyDate}\n\nDraft promotional copy. Verify final pricing, product capabilities and deadlines before sending. Insert your approved tracking link. Closing emails require a confirmed deadline; do not send placeholders. Include any affiliate disclosures required by your platform and audience.\n\n`;
    download('argonmax-ai-email-swipes.txt', intro + swipes.map(swipe => `${'='.repeat(65)}\n${swipe.title}\n${swipe.stage}\n\nSubject: ${swipe.subject}\n\n${personalize(swipe.body)}\n`).join('\n')); toast('Your 15-email swipe pack is ready.');
  });
  $('download-guide').addEventListener('click', () => {
    const guide = `# ArgonMAX AI — JV Quick Guide\n\nLaunch date: ${friendlyDate}\nExact opening time / timezone / close: to be confirmed.\nAffiliate platform: ${validWebUrl(config.affiliateUrl) ? config.affiliateUrl : 'https://launchpadjv.com/'}\nReview access: ${config.reviewText || 'Coming soon'}\nSupport: ${config.supportText || 'Demo contact — coming soon'}\n\n## The angle\nA connected AI workspace for content, code, creative assets and client work. Lead with less tool switching and the practical use case your audience needs.\n\n## 13 platform modules\nBuild Engine — Sites, funnels, apps and games starting points.\n${modules.map(m => `${m[0]} — ${m[1]}`).join('\n')}\n\n## Proposed funnel — 50% commissions\n${funnel.map(item => `${item.step} | ${item.name} | ${item.maxCents ? `${money(item.cents / 100)}–${money(item.maxCents / 100)}` : money(item.cents / 100)} | ${item.maxCents ? `${money(Math.round(item.cents / 2) / 100)}–${money(Math.round(item.maxCents / 2) / 100)}` : money(Math.round(item.cents / 2) / 100)}${item.ds ? ` | Downsell: ${item.ds[0]} ${money(item.ds[1] / 100)}` : ''}${item.bundle ? ' | Alternative to buying individually, excluded from main total' : ''}`).join('\n')}\n\nMain-funnel total (front end through OTO 10): ${money(cartCents / 100)}.\nIllustrative commission: ${money(Math.round(cartCents / 2) / 100)}.\nAssumes all main offers are purchased; not an earnings forecast. Actual commissions depend on purchases, refunds and final platform terms.\n\n## Proposed $2,000 contest\nOpening, first 72 hours: 1st $1,000; 2nd $400; 3rd $200. No minimums proposed.\nClosing, final 48 hours: 1st $300; 2nd $100.\nFinal eligibility, sales counting, ties, payout dates and precise timing must be confirmed.\n\n## Promotion checklist\n- Review the product and confirm edition entitlements.\n- Get the approved affiliate tracking link from Launchpad JV.\n- Confirm final commissions, pricing, contest rules and deadlines.\n- Choose an email angle for your audience.\n- Personalize the swipes and add your link.\n- Add your own product experience and disclosure.\n- Schedule opening, review and closing emails for confirmed times.\n\nNo verified EPC or conversion results are provided. Support and review details are demo placeholders until updated.\n`;
    download('argonmax-ai-jv-guide.md', guide, 'text/markdown;charset=utf-8'); toast('Your JV quick guide is ready.');
  });
  $('download-banners').addEventListener('click', () => { const link = document.createElement('a'); link.href = 'assets/jv/argonmax-ai-banner-pack.zip'; link.download = 'argonmax-ai-banner-pack.zip'; document.body.append(link); link.click(); link.remove(); toast('Your three-size SVG banner pack is ready.'); });
  $('save-date').addEventListener('click', () => {
    const compact = launchDate.replaceAll('-', ''); const next = new Date(`${launchDate}T00:00:00Z`); next.setUTCDate(next.getUTCDate() + 1); const end = next.toISOString().slice(0, 10).replaceAll('-', '');
    const stamp = new Date().toISOString().replaceAll(/[-:]/g, '').replace(/\.\d{3}/, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ArgonMAX AI//JV Launch//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:argonmax-ai-${compact}@launchpadjv.com`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${compact}`, `DTEND;VALUE=DATE:${end}`, 'SUMMARY:ArgonMAX AI launch', 'DESCRIPTION:ArgonMAX AI launch day. Exact opening time and timezone to be confirmed.', `URL:${validWebUrl(config.affiliateUrl) ? config.affiliateUrl : 'https://launchpadjv.com/'}`, 'TRANSP:TRANSPARENT', 'END:VEVENT', 'END:VCALENDAR'];
    download('argonmax-ai-launch.ics', lines.join('\r\n') + '\r\n', 'text/calendar;charset=utf-8'); toast('Launch day saved. Exact opening time is coming soon.');
  });
})();
