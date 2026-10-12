# ArgonMAX AI — JV page

The complete JV page is at `/jv.html` in the project root. The existing `/index.html` remains the main sales page, unchanged. The old `/jv/` path redirects to `/jv.html`.

Run `node _tools/serve-jv.cjs` from this directory and open `http://127.0.0.1:8140/jv.html`.

## Files

- `jv.html`: complete JV page structure and launch copy.
- `jv/index.html`: compatibility redirect to the root JV page.
- `assets/argon-jv.css`: responsive styling using the existing local Figtree font and ArgonMAX logo.
- `assets/argon-jv-config.js`: affiliate destination, review URL/text and support URL/text. An empty review/support URL shows the demo text without an inactive button.
- `assets/argon-jv.js`: 13 module descriptions, funnel data, commission calculator, 15 swipes, copy/download actions, calendar export and mobile navigation.
- `assets/jv/`: three branded SVG banners and downloadable ZIP pack. Rebuild with `python _tools/build-jv-banners.py` after editing the banner source.

## Launch details

The launch date is October 16, 2026, with no opening time specified. Calendar export intentionally creates an all-day event. Update the date in the page, config, swipe subjects and banner source together if it changes.

The partner buttons open `https://launchpadjv.com/`, as requested. Replace `affiliateUrl` with the exact affiliate offer/signup destination when available. This general platform address is not a customer affiliate tracking link. Affiliates insert their own approved tracking link in the swipe personalizer.

Support and review access are demo placeholders as requested. Add verified contact details to the config to activate the corresponding links; support accepts an HTTPS URL or a mailto address.

Pricing, 50% commissions and the $2,000 contest are labeled proposed until confirmed. The funnel follows the supplied OTO table: front end ($17), bump ($9.95), OTO 1-10 each with a downsell price, and an Everything Bundle ($247-$297). The page shows 13 rows. The front end, bump and ten upgrades at full price total $898.95, with a theoretical 50% share of $449.48. Downsells and the bundle are alternatives and are excluded from that maximum. Actual commission rounding and refunds follow the platform's final rules.

No unverified EPC/CVR, customer proof, income claims, vendor rankings, review credentials, countdown or $197/year price increase is fabricated. Closing swipes require a confirmed close date and time.

## Verification

Run `node --check assets/argon-jv.js` and `node _tools/verify-jv.cjs` with the local server running on port 8140. The browser verification uses the existing local Playwright installation and Chromium executable used by other project verification scripts. It checks 1440px, 768px, 390px and 320px layouts, content, local assets, navigation, personalizing and copying swipes, downloads, the calendar date, and calculator behavior.

Upload `jv.html` and the new assets (plus `jv/` if keeping the old URL redirect) to the same static hosting as the sales page to publish. No deployment settings are present in this local clone.
