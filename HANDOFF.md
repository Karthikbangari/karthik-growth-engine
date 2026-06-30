# Project Handoff — Karthik Growth Engine

_Last updated: 2026-06-30_

## What this is
A **marketing + lead-generation website** for Karthik Bangari's web-design service
business. It's a public marketing site **plus** a private toolkit (promo-content
generators + a password-gated lead dashboard). Lead data lives in the browser's
`localStorage` — there is **no backend**.

- **Live site:** https://karthik-growth-engine.vercel.app
- **Repo:** https://github.com/Karthikbangari/karthik-growth-engine (public)
- **Hosting:** Vercel — **auto-deploys on every `git push` to `main`**

## Current theme
**"Luxury 3D Digital Showroom"** — ivory `#FAF7F0` + deep emerald `#15564A` +
champagne gold `#D8B76A` + midnight navy `#101828`. Defined as color tokens in
`tailwind.config.js`, so changing those values re-themes the whole site at once.
(Note: the accent token is still named `olive` for backwards-compat — it now holds
the emerald scale.)

## Tech stack
- React 18 + Vite 5 + Tailwind CSS 3
- Framer Motion (animations, 3D-tilt cards)
- Three.js + @react-three/fiber@8 + @react-three/drei@9 — **lazy-loaded** 3D hero only
- react-router-dom (multi-page)
- Fonts: Playfair Display (headings), Inter (body), Space Grotesk (labels)

## Run it
```bash
npm install     # one time
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → /dist
npm run preview  # preview the production build
```
Requires Node 18+. The 3D hero only works after `npm install` (needs the three.js libs).

## Pages & structure (single-repo, react-router)
| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero (3D showroom) → ScrollVelocity marquee → Services → Pricing → Portfolio → Process → Testimonials → FAQ → Contact |
| `/services` | Services | Full services grid |
| `/tools` | Tools | 3 generators: **Post Generator, WhatsApp Link, Follow-up** (Price Calculator was removed) |
| `/contact` | Contact | Lead form (saves to localStorage) |
| `/dashboard` | Lead Dashboard | **Password-gated** (see below) |

## Where to edit content
| Want to change… | File |
|---|---|
| WhatsApp number, Instagram, email, **admin password** | `src/lib/constants.js` |
| Services (names, descriptions, features) | `src/data/services.js` |
| Pricing packages | `src/data/pricing.js` |
| Portfolio cards | `src/data/portfolio.js` |
| Promo/follow-up templates & tones | `src/data/content.js` |
| Colors & fonts (whole theme) | `tailwind.config.js` |
| Global styles / glass / buttons | `src/index.css` |

### Key components
`Navbar`, `Footer`, `FloatingWhatsApp` (expands to "Get a free quote" on hover),
`Hero` (in `src/sections/`), `ThreeHeroScene` (the WebGL showroom),
`HeroShowcase` (CSS browser-mockup, also the 3D loading fallback),
`Tilt` (reusable cursor-driven 3D tilt — used on service/portfolio/stat cards),
`Reveal` (scroll-in animation), `SectionHeading`, `ScrollVelocity` (marquee).

## Important notes / gotchas
1. **Admin password** is `Karthik@1`, set in `src/lib/constants.js`. It's a
   **soft client-side gate only** — readable by anyone in this public repo. Don't
   put anything sensitive behind it.
2. **Leads are per-browser** (`localStorage`). A lead a customer submits saves on
   *their* device, not yours. Use it as a personal CRM (add leads yourself); the
   real funnel is WhatsApp. Add a real database/backend for cross-device leads.
3. **No prices shown** — the Packages section says "Pick your perfect package /
   Custom quote"; the interactive Price Calculator was removed. Re-addable on request.
4. **Instagram handle** is set to `instagram.com/karthikbangari` — confirm it's correct.
5. **3D hero is lazy-loaded** (~830 KB chunk) so it doesn't slow first paint; a CSS
   mockup shows while it loads, and reduced-motion users get a still scene.
6. **No AI** — the promo generators use built-in templates (an AI proxy was added
   then removed; the code is template-only now).

## Deploy
Already connected to Vercel. To publish changes:
```bash
git add -A && git commit -m "your message" && git push
```
Vercel rebuilds and deploys automatically (~1 min). `vercel.json` handles SPA routing.
First-time setup on a new host: import the GitHub repo on vercel.com (framework
auto-detected as Vite) — no env vars required.

## Suggested next steps (from the latest brief, not yet built)
- "Choose Your Experience" interactive customer chooser
- Draggable Before/After comparison slider
- Restore the luxury Price Calculator (with ₹ prices + animated number)
- Real backend for cross-device lead capture
