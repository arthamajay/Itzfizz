# Kiro IDE Handoff & Deployment Guide

## Tech Stack

1. **Next.js 14 / React 18 (`src/`)** — App Router, `"use client"`, `useRef`, `useEffect`, `gsap.context()`, `gsap.matchMedia()`
2. **GSAP 3 + ScrollTrigger** — `scrub: 0.6`, `pin`, `invalidateOnRefresh`, stagger intro, counter tick-up
3. **Tailwind CSS + Bootstrap 5 Grid** — responsive layout, `container-fluid`
4. **Vanilla HTML5 / CSS3 / JS (`vanilla/index.html`)** — CDN-only standalone, zero build step
5. **next/font** — Self-hosted Inter + Space Grotesk, zero FOUT

## Deploy

```
npm install
npm run build
```

Push to `main` → GitHub Actions runs `.github/workflows/deploy.yml` → deploys `./out` to GitHub Pages.
