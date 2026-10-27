# WELCOME ITZFIZZ — Scroll-Driven Hero Section Animation

A 60fps scroll-driven hero animation fulfilling all mandatory and bonus tech stack requirements.

## Tech Stack

**Mandatory**
- HTML5, CSS3, JavaScript (ES6+)
- GSAP 3 + ScrollTrigger (`scrub`, `pin`, `matchMedia`, `invalidateOnRefresh`)
- Next.js 14 / React 18 (App Router)
- Tailwind CSS

**Bonus (Plus Points)**
- Bootstrap 5 Grid (`bootstrap-grid.min.css`)
- Vanilla standalone (`vanilla/index.html`) — zero build-step, CDN only

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build Static Export for GitHub Pages

```bash
npm run build
```

Output goes to `./out` — served directly by GitHub Pages via `.github/workflows/deploy.yml`.

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout — next/font (Inter + Space Grotesk), Bootstrap grid CSS
    page.tsx            # Hero section + post-scroll CTA
    globals.css         # GPU layer, road surface, trail reveal, reduced-motion guard
  components/
    HeroScrollSection.tsx  # All GSAP logic — intro, scroll, parallax, counters
    McLarenCarSvg.tsx      # Hand-coded SVG car

vanilla/
  index.html            # CDN-only standalone (identical visuals, no build)

.github/workflows/
  deploy.yml            # CI/CD: npm build → GitHub Pages static export
```

## How the Animation Works

1. **Page load**: Characters fade in with a rotateX flip-up stagger. Stat card counters tick from 0 to target.
2. **Scroll pin**: GSAP pins the hero stage while the outer section scrolls 1800px past it.
3. **Car drive**: Car x-position is interpolated from `12px` → `trackWidth - carWidth - 16px` in sync with scroll progress.
4. **Trail reveal**: `clip-path: inset(0 94% 0 0)` → `inset(0 0% 0 0)` uncovers the lime/sky overlay as the car passes.
5. **Parallax**: Top stat cards drift upward, bottom cards drift downward during scroll.
6. **Progress bar**: Top fixed bar uses `scaleX` transform tied to `ScrollTrigger.onUpdate`.

## Accessibility

`prefers-reduced-motion: reduce` is respected — all animations are skipped and the final state is shown instantly.
