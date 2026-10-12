# Chat 6.0 Astra — Local Clone (`chat60astra.com/regular`)

## ArgonMAX AI JV page

The complete affiliate launch hub is at `jv.html`; `index.html` remains the main sales page. The old `/jv/` path redirects to `jv.html`. Run `node _tools/serve-jv.cjs` and open `http://127.0.0.1:8140/jv.html`. Includes the October 16, 2026 launch date, Launchpad JV partner links, funnel breakdown, planned cash contest, 15 email swipes, banner pack and calendar download. See `JV_PAGE.md` for launch settings and verification.

Original page ka **offline local clone** — same layout, same images, same scripts, same behavior.

## Kaise chalayein

```bash
python -m http.server 8137
# phir browser me kholo:  http://127.0.0.1:8137/index.html
```

`file://` se bhi khul jayega, lekin local server recommended hai (fonts/scripts ke liye).

## Structure

| Path | Kya hai |
|---|---|
| `index.html` | Poora clone — saara inline CSS/JS page ke andar hi hai (~1.8 MB) |
| `assets/` | ~700 files — images (imgix + Convertri CDN), fonts (Figtree, Be Vietnam Pro, FontAwesome), `cdn.min.css`, jQuery, yall, flag images, Launchpad button CSS + card icons |
| `page_original.html` | Original downloaded HTML (reference ke liye) |
| `_tools/` | Build + verification scripts, screenshots, pixel-diff results, `url-map.json` (original URL → local file ka map) |

## Kya-kya bake/adjust kiya (offline exactness ke liye)

- **Launchpad BUY NOW buttons** — original me `launchpadjv.com/js/embed.js` se JS se inject hote the; clone me static HTML bake kar diye. Checkout links abhi bhi original wale live Launchpad URLs pe jaate hain.
- **Purchase notification popup** — saare 50+ naam/flags aur 7 purchase types inline hain; flag images `assets/flags/` me local.
- **Lazy-loading** — original pe images/backgrounds scroll pe load hote hain; clone me sab turant visible (same final state).
- **Fonts + cdn.min.css** — local, aur Convertri ka deferred-stylesheet loader bhi kaam karta hai.
- **Dynamic cheezein live hain** — countdown timer (KineticJS canvas), exit-intent discount modal (CONGRATULATIONS popup), rotating word ("Software/Books/…"), testimonial rotations, pulsing animations.
- **YouTube videos** — click karne pe chalte hain (internet chahiye; iframe original jaise).

## Verification (pixel-diff, original vs clone)

| Viewport | Scroll points | Diff |
|---|---|---|
| Desktop 1440px | 0 / 12k / 24k / 36k / 48k / 60k / 72k px | **0.45% – 3.15%** |
| Mobile 390px (iPhone 14) | 0 / 25k / 50k / 75k / bottom | **0.01% – 3.75%** |

Page height bilkul same: **72,183px** desktop, **81,702px** mobile.

Bacha hua diff sirf timing/animation wale elements ka hai (countdown tick, random notification popup, rotating text, pulsing icons) + imgix ke compression variants ka minor farq — koi layout/content difference nahi.

Diff detail `_tools/shots/` me hai (`orig-*`, `clone-v-*`, `diff-*`).

## Note

Ye reference/study copy hai. Page ka content, claims, branding, testimonials aur checkout links original vendor ke hain — as-is publish/deploy karne pe copyright aur claims/economics wale legal issues aayenge.

## Repeated ArgonMAX offer sections

The 13 recurring purchase sections use `.am-offer` inside `.am-offer-host` in `index.html`, with shared styling in `assets/argon-offers.css`. Keep every instance consistent when changing offer copy. Gemini 4.0 Argon is the main AI product; ArgonMAX is the brand. Preserve the existing checkout destination and price unless explicitly asked to change them. `node _tools/verify-offers.cjs` checks all 13 sections on desktop, tablet and mobile.
