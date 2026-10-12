# ArgonMAX JV design system

Direction: a light SaaS partner hub with an editorial split hero, a navy launch brief, and blue-cyan brand accents. The UI UX Pro Max search for SaaS developer platform returned the Hero + Features + CTA pattern and trust-blue palette. We apply those recommendations to a static HTML/CSS/JavaScript page, keeping the existing local Figtree font and ArgonMAX logo rather than adding remote dependencies.

## Palette

- Ink: #10223D
- Secondary text: #53647D
- Primary action: #075BD8, white label
- Primary hover: #064AAA
- Cyan accent and focus: #00BFE9
- Light surface: #F3F7FC
- Navy surface: #0B1D35
- Text on navy: #FFFFFF with #B8C9DB secondary text
- Borders: #DCE4EE

## Layout and type

1248px content maximum. Desktop gutters 48px, tablet 32px, phone 20px. Section rhythm 104/80/64px. Body 18px on desktop and 17px on phones, with weight 450 and 1.7–1.75 line height. Secondary body 16–18px; fine print 14px; controls and labels 16px. Headings use the local Figtree variable font with weight 750–800 and modest tracking. On phones, module and audience cards use one column so larger text has room. Primary body text passes 4.5:1 contrast. Navy and cyan distinguish the launch brief, contest, and closing CTA.

## Components

52px primary buttons; at least 44px visible action targets. Consistent outline SVG icons. Sticky navigation with active-section feedback and an accessible mobile menu. Offer table scrolls inside its own region on phones. Email preview scrolls inside a focusable region, with subject selection, affiliate personalization, copy feedback, and complete TXT export.

## Content and behavior

Preserve all 13 modules, 13 funnel rows, proposed pricing and commissions, launch date, contest structure, 10 Word-sourced emails, and 50 subject options. No new revenue or conversion claims. Keep review/support configuration and all downloads. Restrained hover transitions; honor reduced motion. Content stays readable without animation or external services.

## Verification

Run the existing verify-jv.cjs against localhost:8140. Check 1440, 1024, 768, 390, 375, and 320px widths, plus phone landscape, tap targets, active navigation, keyboard email scrolling, clipboard, personalization, validation, downloads, calendar, calculator, and runtime errors. Inspect screenshots in _tools/shots.
