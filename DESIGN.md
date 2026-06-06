# DESIGN.md

> The as-built source of truth for this portfolio.
> If something in this file disagrees with the code, the code is right and this file needs updating.

---

## 1. Overview

A premium, editorial-grade developer portfolio for **Muzammil** — a full-stack engineer working across Next.js, Node, and Postgres. The redesign replaces a functional-but-generic template with a typography-first, motion-rich, fully type-safe site that reads as intentional work, not a starter template.

### Design north star

- **Editorial / typography-first** — calm, confident, type-driven. Reference: Linear, Vercel, Rauno Freiberg.
- **Restrained color** — monochrome near-black + a single electric-lime accent (#C6FF3D). Lime appears ≤ 3 times per fold.
- **Bold motion that earns its place** — GSAP + ScrollTrigger + Lenis smooth scroll + R3F shader hero. No gratuitous animation; everything is purposeful and respects `prefers-reduced-motion`.
- **Production polish** — custom cursor, magnetic CTAs, fluid type scale, accessible focus, theme toggle, full SEO surface.

### Target audience

- Senior engineers at top tech companies (technical literacy, no marketing fluff)
- Recruiters (clear scannable structure, real project outcomes)
- Studios/agencies (motion craft, visual polish, Awwwards-tier feel)

---

## 2. Brand & Visual System

### 2.1 Identity

| | |
|---|---|
| Name | Muzammil |
| Wordmark | lowercase Fraunces, tight tracking, single accent italic word |
| Role | Full-stack engineer — Next.js · Node · Postgres |
| Voice | Calm, confident, technical. No "passionate", no superlatives. |
| Pronouns | (n/a) |

### 2.2 Typography

Three families, exposed as CSS variables and Tailwind v4 utilities:

| Family | CSS var | Tailwind | Weights | Usage |
|---|---|---|---|---|
| **Fraunces** | `--font-display` | `font-display` | 400/500/600/700, normal + italic | Display headings, big quotes, hero |
| **Inter** | `--font-sans` | `font-sans` (default) | 400/500/600 | Body, UI, paragraphs |
| **JetBrains Mono** | `--font-mono` | `font-mono` | 400/500 | Eyebrows, labels, code, stack tags |

Type scale (fluid `clamp()` for display sizes):

```
text-xs  0.75rem
text-sm  0.875rem
text-base 1rem
text-lg  1.125rem
text-xl  1.25rem
text-2xl 1.5rem
text-3xl  clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)
text-4xl  clamp(2.25rem, 1.75rem + 2.5vw, 3rem)
text-5xl  clamp(3rem, 2rem + 5vw, 4.5rem)
text-6xl  clamp(3.5rem, 2rem + 7.5vw, 5.5rem)
text-7xl  clamp(4rem, 2rem + 10vw, 7rem)
text-8xl  clamp(5rem, 2rem + 15vw, 9rem)
text-9xl  clamp(6rem, 2rem + 20vw, 11rem)
```

Tracking:
- Display: `-0.04em` (very tight)
- Body: default
- Eyebrows / mono labels: `0.05em` to `0.1em` (wider for uppercase)

Italic accent words in display headings are rendered with `<em class="italic text-accent">` — Fraunces italic with the lime accent.

### 2.3 Color

Defined in `src/styles/tokens.css`, exposed via Tailwind v4 `@theme inline` in `src/app/globals.css`.

**Dark mode (default):**
```
--bg         #0A0A0B   near-black, slightly warm
--bg-soft    #111114   elevated surfaces (cards, nav, drawer)
--fg         #ECECEE   off-white text
--fg-mute    #8A8A92   secondary text, eyebrows
--border     #1F1F23   hairlines, card edges
--accent     #C6FF3D   electric lime (single brand color)
--accent-fg  #0A0A0B   text on accent
```

**Light mode (opt-in via next-themes toggle):**
```
--bg         #FAFAF7   paper white, warm
--bg-soft    #F2F2EE
--fg         #0A0A0B
--fg-mute    #5C5C58
--border     #E5E5DF
--accent     #4A6B00   deep olive (lime doesn't read on light)
--accent-fg  #FAFAF7
```

Tailwind utilities: `bg-bg`, `bg-bg-soft`, `text-fg`, `text-fg-mute`, `text-accent`, `text-accent-fg`, `border-border`, `font-display`, `font-mono`, `rounded-pill`, `rounded-sm`, `rounded-md`, `rounded-lg`.

### 2.4 Spacing, radius, shadow

8pt grid (`--space-1` through `--space-64`).

Radius tokens: `--radius-sm: 6px`, `--radius-md: 12px`, `--radius-lg: 24px`, `--radius-pill: 999px`.

Shadows: layered (sm/md/lg) tuned per theme — softer in light mode, deeper in dark.

### 2.5 Design principles (enforced in code review)

- **Restrained.** Lime appears ≤ 3 times per fold.
- **No drop-shadow on dark cards.** Use hairline borders (`border` token).
- **Glassmorphism only on the floating nav.** Nowhere else.
- **No emoji.** Use Lucide icons.
- **Type does the work.** Headings are huge, body is calm, eyebrows are mono-uppercase tracked.

---

## 3. Information Architecture

Single-page narrative + one archive route. All sections vertical-flow with smooth scroll.

### 3.1 Home (`/`)

| # | Section | id | Purpose |
|---|---|---|---|
| 1 | **Hero** | `top` | First impression. Big type, R3F canvas, status row, single CTA. |
| 2 | **About** | `about` | Bio paragraph + 4 stat counters + "currently" line. |
| 3 | **Skills** | `skills` | 4 categorized marquee rows. |
| 4 | **Selected Work** | `work` | Bento grid of 6 featured projects. |
| 5 | **Testimonials** | `testimonials` | Horizontal scroll-snap, 3 quotes. |
| 6 | **Contact** | `contact` | Centered block: big email, social row. |
| — | **Footer** | — | Wordmark, copyright, theme toggle, "Built with" line. |

Sections intentionally cut from the original site: **Experience timeline** (replaced by the case studies speaking for themselves) and **Awards** (would feel like filler without meaningful ones).

### 3.2 Archive (`/projects`)

Single page, polished to match the home system. Reuses the same design tokens, typography, and the global floating nav. Preserved behavior:
- Hero block with eyebrow + title + description
- Sticky filter bar (search input + category chips)
- Responsive project grid (1/2/3 cols)
- Empty state
- Bottom CTA linking back to `#contact`

Data source: `src/data/projectDetail.ts` (kept as-is, different shape from the home `projects.ts`).

### 3.3 Data shapes

Typed contracts in `src/types/content.ts`:

```ts
type Project = { id, title, role, year, description, stack, href, image, span, featured? }
type SkillCategory = { label, items[] }
type Testimonial = { id, quote, name, role, company }
type Social = { platform, href, handle }
type Stat = { label, value, suffix? }
type Site = { name, shortName, role, tagline, bio, location, email, socials[], stats[], resumeUrl, currently }
```

---

## 4. Motion & Interaction System

All motion is GSAP-driven (via `@gsap/react` + `gsap.context()` for safe cleanup), budgeted for 60fps on mid-range hardware, and respects `prefers-reduced-motion`.

### 4.1 Custom cursor

`src/components/layout/Cursor.tsx`. Desktop only (`(pointer: fine)` media query). Disabled if reduced motion is set.

Two layered elements:
- 6px solid dot (tracks 1:1 via `gsap.quickTo`, ~100ms ease)
- 40px hollow ring (lerps via `gsap.quickTo`, ~400ms ease)

States are set by adding `data-cursor` to any element:

| Attribute | Ring | Dot |
|---|---|---|
| `data-cursor="link"` | scale 1.4, fills fg/10% | — |
| `data-cursor="cta"` | scale 1.8, fills accent/30% | scale 0.6 |
| `data-cursor="drag"` | pill shape | hidden |
| `data-cursor="text"` | scale 1.6, lime glow | hidden |

Implementation uses event delegation on `mouseover` — no per-element listeners. Cursor idles to hidden after 4s of no movement.

### 4.2 Hero canvas (R3F + Three.js)

`src/components/sections/HeroCanvas.tsx`. Full-viewport `<Canvas>` behind the hero text.

Shader: domain-warped FBM noise (5 octaves), lime-tinted highlights, time + mouse uniforms. DPR clamped to `[1, 1.75]`.

Behaviors:
- Mouse position lerps to a target each frame
- WebGL detection: if unavailable, swap to a static radial-gradient `<Fallback />` div
- SSR-skip via `dynamic({ ssr: false })`
- `mounted` guard prevents first-paint flash

The Canvas is rendered **behind** the hero text (z-index 0) with the text on z-10, so the LCP element (the heading) is never blocked by the canvas mount.

### 4.3 Scroll-triggered reveals

Implemented once in the `Section` primitive (`src/components/primitives/Section.tsx`). Every child with `data-reveal` animates from `autoAlpha: 0, y: 24` to `autoAlpha: 1, y: 0` over 0.8s with `power3.out`, triggered at `top 85%` of viewport.

The `Eyebrow` primitive and the bento tiles in `SelectedWork` all opt in by adding `data-reveal` to their outer element.

### 4.4 Section transitions

Soft 1px hairline divider animates from 0→100% width at section boundaries (subtle, 400ms). No full-page wipes.

### 4.5 Magnetic hover

`useMagnetic` hook in `src/lib/useMagnetic.ts`. Applied to:
- The "Get in touch" CTA in the floating nav
- The `Button` and `LinkButton` primitives (CTAs and primary actions)

The button translates `delta * 0.2–0.3` toward the cursor within a 60px radius, springs back with a 0.4s elastic ease on `mouseleave`. Disabled on touch and on reduced-motion.

### 4.6 Page transitions

Only on route change to `/projects`. 400ms cross-fade. No shared element transitions. R3F context and cursor state are preserved across navigations.

### 4.7 Theme toggle

`src/components/layout/ThemeToggle.tsx`, mounted in the footer. Uses `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange` (prevents flash of transition on initial mount).

### 4.8 Smooth scroll

Lenis (`src/components/layout/SmoothScroll.tsx`) integrated with GSAP ScrollTrigger — `lenis.on("scroll", ScrollTrigger.update)` keeps triggers in sync. Duration 1.2s, ease curve `Math.min(1, 1.001 - Math.pow(2, -10 * t))`.

### 4.9 Accessibility

- All `data-reveal` animations gated by `useReducedMotion`
- All motion respects `aria-hidden` on decorative elements
- R3F canvas has `aria-hidden="true"` + WebGL fallback
- Skip-to-content link visible on focus
- Native focus rings replaced with a 2px lime outline + 2px offset (never removed)
- Color contrast: ≥ 14:1 fg/bg in dark, ≥ 12:1 in light. Accent contrast verified ≥ 4.5:1 in both themes.

### 4.10 Performance budget

- LCP < 2.0s on Moto G4 / 4G
- INP < 200ms
- CLS < 0.05
- Hero canvas paused when off-screen via `useFrame` + `inViewport` check
- Cursor uses `gsap.quickTo` (rAF-batched, not per-frame)
- All GSAP timelines live inside `gsap.context()` per section, `revert()` on unmount

---

## 5. Tech Architecture

### 5.1 Stack (locked, no deviation)

- **Next.js 15.3.2** — App Router, RSC where possible
- **React 19**
- **TypeScript 5** — strict mode
- **Tailwind CSS v4** — `@theme inline` + CSS variables
- **lucide-react** — icons only

**New additions:**
- `gsap` + `@gsap/react` — tween, timeline, ScrollTrigger, useGSAP, gsap.context
- `three` + `@react-three/fiber` + `@react-three/drei` — hero canvas (drei unused in current build, kept for future)
- `lenis` — smooth scroll
- `next-themes` — SSR-safe theme provider
- `clsx` + `tailwind-merge` — `cn()` utility
- `@types/three` — dev

No state library. No router additions. No CSS-in-JS. No testing framework (verification is manual + Lighthouse + smoke tests).

### 5.2 Folder structure (as-built)

```
src/
  app/
    layout.tsx                # Fonts, providers, navbar, footer, cursor, metadata
    page.tsx                  # Home — composes 6 section components
    globals.css               # @import tokens, @theme, base layer
    opengraph-image.tsx       # 1200×630 OG image (edge runtime)
    robots.ts                 # robots.txt
    sitemap.ts                # sitemap.xml
    projects/
      page.tsx                # Archive page
  components/
    layout/                   # Layout-level components
      Cursor.tsx              # Custom cursor (desktop only)
      Footer.tsx              # Minimal footer
      Navbar.tsx              # Floating glass pill nav
      SmoothScroll.tsx        # Lenis + GSAP ScrollTrigger
      ThemeProvider.tsx       # next-themes wrapper
      ThemeToggle.tsx         # Sun/moon in footer
    primitives/               # Reusable building blocks
      Button.tsx              # Button + LinkButton (magnetic, data-cursor=cta)
      CountUp.tsx             # Number tween
      Eyebrow.tsx             # Section label (auto data-reveal)
      Marquee.tsx             # Infinite row (pauses on hover)
      Section.tsx             # Section wrapper w/ scroll-reveal of [data-reveal]
    sections/                 # Page sections
      About.tsx
      Contact.tsx
      Hero.tsx
      HeroCanvas.tsx          # R3F shader (named + default export for dynamic import)
      SelectedWork.tsx        # Bento grid
      Skills.tsx              # 4 marquee rows
      Testimonials.tsx        # Horizontal scroll-snap
  data/
    projectDetail.ts          # /projects archive data
    projects.ts               # Home bento data (6 projects)
    site.ts                   # Personal info
    skills.ts                 # 4 skill categories
    testimonials.ts           # 3 quotes
  lib/
    cn.ts                     # tailwind-merge helper
    useCursor.ts              # Set cursor state via data-cursor on <html>
    useMagnetic.ts            # Magnetic hover hook
    useReducedMotion.ts       # prefers-reduced-motion hook
  styles/
    tokens.css                # All design tokens (CSS variables)
  types/
    content.ts                # Shared content types
public/
  projects/
    p1.svg – p6.svg           # Project placeholder SVGs (branded, intentional)
  file.svg, globe.svg, hero.webp, next.svg, vercel.svg, window.svg
```

### 5.3 Rendering strategy

- `app/layout.tsx` — server component, sets up fonts, metadata, `<html>` shell
- `app/page.tsx` — **server component**, composes the 6 section components (which are themselves `"use client"` only where needed)
- `app/projects/page.tsx` — `"use client"` (filter/search state)
- `Hero` and `HeroCanvas` are dynamically imported with `ssr: false` so the R3F bundle doesn't block the LCP text
- `Section`, `About`, `Contact`, `Footer` can be server components — they receive props from `page.tsx`

### 5.4 SEO surface

- Full `<Metadata>` in `layout.tsx`: title template, description, OG, Twitter, robots, authors
- `metadataBase: https://muzammil.dev`
- Dynamic `app/opengraph-image.tsx` (1200×630, edge runtime) — renders the brand identity for sharing
- `app/sitemap.ts` — `/` (priority 1.0) and `/projects` (priority 0.8)
- `app/robots.ts` — allows all, points to sitemap
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`

### 5.5 Error handling

- `HeroCanvas` falls back to a static gradient if WebGL is unavailable (detection in `HeroCanvasClient`)
- `next/image` with `onError` is not currently needed (all project images exist as SVGs)
- Form posts to `formsubmit.co` — no form on the current site; the contact section is a `mailto:` link, so no JS-dependent submission

### 5.6 Performance optimizations

- Fonts loaded via `next/font/google` with `display: swap` and explicit subsets
- All section components are code-split
- `HeroCanvas` is `dynamic({ ssr: false })` — never blocks initial paint
- Images use `next/image` with `fill` and explicit `sizes`
- `min-h-dvh` (dynamic viewport height) for mobile-safe sizing
- `disableTransitionOnChange` on next-themes to avoid flash on hydration

---

## 6. Build & Verification (executed)

### 6.1 Build phases (already complete)

| Phase | Owner | Output |
|---|---|---|
| 0 — Prep | Coordinator | New deps installed (`gsap @gsap/react three @react-three/fiber @react-three/drei lenis next-themes clsx tailwind-merge`), baseline build passes |
| 1 — Foundation | Sub-agent | 20 files: tokens, hooks (`useReducedMotion`, `useMagnetic`, `useCursor`), primitives (`Button`, `LinkButton`, `Section`, `Eyebrow`, `Marquee`, `CountUp`), layout (`SmoothScroll`, `ThemeProvider`, `ThemeToggle`, `Cursor`), data (`site`, `skills`, `projects`, `testimonials`), types |
| 2A — Hero + Navbar + layout | Sub-agent (parallel) | `Hero.tsx`, `HeroCanvas.tsx`, new `Navbar.tsx`, rewrote `layout.tsx` with fonts + metadata, deleted old `Hero.tsx`/`Navbar.tsx`/`hero.ts` |
| 2B — Body sections + Footer | Sub-agent (parallel) | `About`, `Skills`, `SelectedWork`, `Testimonials`, `Contact`, `Footer`. Deleted 8 old components + 8 old data files |
| 2C — Archive + SEO | Sub-agent (parallel) | Polished `/projects`, created `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` |
| 3 — Integration | Coordinator | Rewrote `app/page.tsx`, wired `Footer` into `layout.tsx`, removed legacy `projectData` shim |
| 4 — Verification | Coordinator | Lint, build, smoke test, project image placeholders |
| 5 — Docs | Coordinator | This file |

### 6.2 Verification results

- ✅ `pnpm run lint` — No ESLint warnings or errors
- ✅ `pnpm run build` — 8 routes generated, no errors
- ✅ `pnpm run start` — Server boots, ready in 559ms
- ✅ `GET /` — 200, 92KB
- ✅ `GET /projects` — 200, 40KB
- ✅ `GET /sitemap.xml` — 200
- ✅ `GET /robots.txt` — 200
- ✅ `GET /projects/p1.svg` — 200, 2.2KB
- ✅ `GET /opengraph-image` — 200, 33KB (dynamically generated)

### 6.3 Bundle size (post-build)

| Route | Size | First Load JS |
|---|---|---|
| `/` | 6.24 kB | 171 kB |
| `/projects` | 4.58 kB | 169 kB |
| `/opengraph-image` | 142 B | 102 kB (edge runtime) |
| `/sitemap.xml` | 142 B | 102 kB |
| `/robots.txt` | 142 B | 102 kB |

First-load JS for the home is 171 kB. Three.js + R3F is dynamically imported so the initial bundle for non-hero routes (e.g. `/projects` first paint) does not include the shader.

---

## 7. How to develop

```bash
pnpm install       # install deps
pnpm run dev       # localhost:3000
pnpm run lint      # ESLint check
pnpm run build     # production build
pnpm run start     # serve production build
```

### Where to make changes

| You want to change… | Edit |
|---|---|
| Name, role, bio, email, socials, stats | `src/data/site.ts` |
| Skills + categories | `src/data/skills.ts` |
| Home bento projects | `src/data/projects.ts` + `public/projects/p*.svg` |
| Testimonials | `src/data/testimonials.ts` |
| /projects archive data | `src/data/projectDetail.ts` |
| Colors, spacing, fonts, motion easings | `src/styles/tokens.css` |
| Tailwind utility exposure | `src/app/globals.css` (`@theme inline` block) |
| Hero canvas shader | `src/components/sections/HeroCanvas.tsx` |
| Any section's content/layout | `src/components/sections/*.tsx` |
| Navbar links or CTA copy | `src/components/layout/Navbar.tsx` |
| Footer content | `src/components/layout/Footer.tsx` |
| Page-level metadata | `src/app/layout.tsx` |
| Per-page metadata | the page's `metadata` export |

### Adding a new section

1. Create `src/components/sections/NewSection.tsx` (mark `"use client"` only if needed)
2. Wrap content in `<Section id="new" eyebrow="..." title={...} description="...">...</Section>` for free scroll-reveal
3. Add `data-reveal` to any child you want to fade in
4. Use `data-cursor="link"` / `data-cursor="cta"` / `data-cursor="text"` on interactive elements
5. Import and add to `src/app/page.tsx` in the right order

### Adding a new project

1. Add a new entry to `src/data/projects.ts` with a `span` of `lg`/`md`/`sm`/`wide`
2. Drop a thumbnail at `public/projects/pN.svg` (or `.webp`/`.png` — update the `image` field)
3. Bump counts in `src/data/site.ts` `stats` if you want the About section to reflect it

### Theme tweaks

- Edit dark/light token values in `src/styles/tokens.css`
- Edit Tailwind utilities in `src/app/globals.css` `@theme inline` block
- Both changes are picked up on save (no restart)

---

## 8. Known limitations & follow-ups

These are intentional cuts — list them in PR descriptions if you ship to a team:

- **No image optimization beyond `next/image`** — project screenshots are SVGs (placeholder), not real case-study shots.
- **No resume PDF** — `site.resumeUrl` is empty by default; the navbar CTA links to `#contact` (email) instead.
- **No analytics** — no Vercel Analytics, no Plausible, no PostHog wired in yet. Easy to add: `<Analytics />` in `layout.tsx`.
- **No MDX blog** — if you want a writing section later, add `content/` with `.mdx` files and a `[slug]` route.
- **Cursor doesn't change on form inputs** — there are no form inputs in the current build.
- **Reduced motion turns off all motion** including the cursor lerp and Lenis smooth scroll. This is correct behavior; just be aware.
- **R3F hero can be heavier on low-end devices** — the static gradient fallback covers the no-WebGL case, but on a low-end Android with WebGL it may still drop frames. Add a `prefers-reduced-data` check if you observe this.

---

## 9. Brand voice checklist (for any future copy)

- ✅ Short sentences, calm tone
- ✅ Outcomes over duties ("Shipped X" not "Responsible for X")
- ❌ No "passionate", "rockstar", "ninja", "guru"
- ❌ No emoji in copy
- ❌ No exclamation marks
- ❌ No superlatives ("amazing", "incredible", "stunning")

If you find yourself writing "I love building", delete it. Let the work speak.

---

*This file is the as-built source of truth. Last updated alongside the implementation it describes. If the code drifts from this file, update this file or fix the code — but never both at once without thinking.*
