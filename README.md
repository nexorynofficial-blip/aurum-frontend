# AURUM — Luxury E-Commerce Frontend

A portfolio-quality storefront for **AURUM**, a fine-jewellery atelier. Built to the
AURUM Design Language (ADL) defined in `UIUX.md`, against the requirements in
`AURUM-PRD.md` and the architecture in `AURUM-TRD.md`.

> An editorial, museum-inspired shopping experience — dark, quiet, and precise.
> Every interaction is meant to feel like entering a private showroom.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS (design tokens mapped 1:1 from `UIUX.md`) |
| State | Zustand (cart, wishlist, UI, checkout) with `localStorage` persistence |
| Motion | Framer Motion + CSS (signature easing `cubic-bezier(0.16,1,0.3,1)`) |
| Icons | lucide-react (2px outline, per §12) |
| Fonts | Fraunces (display) · Inter (body) · IBM Plex Mono (prices/SKUs) via `next/font` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

## Design system

All tokens live in two places and never diverge:

- `tailwind.config.ts` — colours, type scale, spacing (strict 8-pt), radii, motion, z-index
- `src/styles/globals.css` — CSS variables, base typography, the **Gold Thread**, reveal utilities

Palette: Obsidian `#0B0B0D` · Charcoal `#141416` · Slate `#1D1D20` · Antique Brass
`#A27B3F` (accent, kept under 5% of any view) · Ivory `#F4F2EE` · Stone `#B2B2B2`.

## Structure

```
src/
├─ app/
│  ├─ (auth)/            login · register · reset-password (split editorial layout)
│  ├─ (shop)/            cart · wishlist · search
│  ├─ account/           overview · orders · order detail · addresses · settings
│  ├─ admin/             console: dashboard · orders · products · collections ·
│  │                     customers · inventory · analytics · marketing · settings
│  ├─ checkout/          shipping → payment → confirmation
│  ├─ collections/       listing + [category] with filters/sort
│  ├─ product/[slug]/    gallery · sticky purchase · variants · related · recently viewed
│  ├─ about · journal · contact · faq · shipping-returns · privacy · terms · accessibility
│  ├─ sitemap.ts · robots.ts · not-found · error · loading
├─ components/  common · layout · home · shop · journal · checkout · account · admin
├─ hooks/       useReveal · useMounted
├─ lib/         fonts · utils · constants · data/ (products, collections, journal, account, admin)
├─ store/       cartStore · wishlistStore · uiStore · checkoutStore
└─ types/
```

## Signature details

- **Gold Thread** (§15) — a 2px brass reading-progress line pinned to the left margin.
- **Transparent → solid header** after 120px of scroll (§16).
- **Cart drawer** slides from the right over a 16px-blur scrim (§26).
- **Fullscreen search** with instant suggestions (§30).
- **Product card** — 4:5 media, hover reveals the alternate angle, wishlist, and lifts the title (§21).
- **Slow-luxury motion** — reveal-on-scroll, cinematic easing, honours `prefers-reduced-motion`.

## Placeholder media

Every image/video references `public/images/placeholder.jpg` (copied from the project
root `PLACEHOLDER.jpg`). To ship final assets, replace that file — or point the
`PLACEHOLDER` constant in `src/lib/constants.ts` and the `image` fields in
`src/lib/data/*` at real URLs. Layouts already reserve aspect ratios, so swapping
causes no layout shift.

## Backend integration

The frontend is wired against mock data in `src/lib/data/`. To connect the real
API described in the TRD, replace those query helpers (`getProductBySlug`,
`searchProducts`, etc.) with `fetch` calls to the documented endpoints and swap the
demo auth/checkout handlers for NextAuth + Stripe. Component props already match the
API response shapes in `src/types`.

## Accessibility & performance

WCAG 2.1 AA target — skip link, semantic landmarks, visible focus rings, `aria`
labels on icon controls, keyboard-navigable overlays with Escape/scroll-lock,
reduced-motion support, and 4.5:1 contrast on text. Images use `next/image`
(AVIF/WebP, lazy below the fold); routes are statically prerendered.
