"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import McLarenCarSvg from "./McLarenCarSvg";

gsap.registerPlugin(ScrollTrigger);

/* ─── Headline characters ────────────────────────────────────────────────────
   Each character is its own <span> so GSAP can stagger them individually
   on page load (fade + rotateX flip-up from below).
─────────────────────────────────────────────────────────────────────────── */
const HEADLINE_CHARS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z",
];

/* ─── Impact statistics ──────────────────────────────────────────────────────
   Four distinct metrics — each has a unique color theme.
   "position" controls whether the card sits in the top or bottom row.
─────────────────────────────────────────────────────────────────────────── */
const IMPACT_STATS = [
  {
    id: "stat-1",
    value: 58,
    badge: "+14.2% YoY",
    label: "Growth in pick-up point adoption",
    cardClass:
      "bg-lime-400 text-slate-950 border-lime-300 shadow-lime-400/10",
    badgeClass: "bg-slate-950/15 text-slate-950",
    valueClass: "text-slate-950",
    labelClass: "text-slate-900 font-semibold",
    position: "top",
  },
  {
    id: "stat-2",
    value: 27,
    badge: "Efficiency",
    label: "Faster last-mile route resolution",
    cardClass:
      "bg-[#161a29]/90 text-white border-white/15 backdrop-blur-md",
    badgeClass: "bg-white/10 text-slate-300",
    valueClass: "text-lime-400",
    labelClass: "text-slate-300 font-medium",
    position: "top",
  },
  {
    id: "stat-3",
    value: 23,
    badge: "Support",
    label: "Reduction in inbound customer calls",
    cardClass:
      "bg-sky-400 text-slate-950 border-sky-300 shadow-sky-400/10",
    badgeClass: "bg-slate-950/15 text-slate-950",
    valueClass: "text-slate-950",
    labelClass: "text-slate-900 font-semibold",
    position: "bottom",
  },
  {
    id: "stat-4",
    value: 40,
    badge: "Automation",
    label: "Manual dispatch tasks eliminated",
    cardClass:
      "bg-orange-500 text-slate-950 border-orange-400 shadow-orange-500/10",
    badgeClass: "bg-slate-950/15 text-slate-950",
    valueClass: "text-slate-950",
    labelClass: "text-slate-900 font-semibold",
    position: "bottom",
  },
] as const;

export default function HeroScrollSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── gsap.context() ───────────────────────────────────────────────────
       Scopes all selectors to wrapperRef so nothing bleeds out to other
       components. The returned ctx.revert() in cleanup tears down every
       tween, timeline, and ScrollTrigger created inside — no memory leaks.
    ──────────────────────────────────────────────────────────────────────── */
    const ctx = gsap.context(() => {
      const baseChars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const hiChars   = gsap.utils.toArray<HTMLElement>(".hero-char-hi");
      const outerCards = gsap.utils.toArray<HTMLElement>(".stat-card");
      const innerCards = gsap.utils.toArray<HTMLElement>(".stat-card-inner");
      const counters   = gsap.utils.toArray<HTMLElement>(".stat-counter");

      /* ── Accessibility guard ──────────────────────────────────────────
         If the user has "prefers-reduced-motion: reduce" set in their OS,
         we skip all animations and just show everything at final state.
      ────────────────────────────────────────────────────────────────── */
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Ensure everything is visible with no animation
        gsap.set([baseChars, hiChars, outerCards], {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
        });
        if (trailRef.current) {
          gsap.set(trailRef.current, { clipPath: "inset(0 0% 0 0)" });
        }
        return; // Skip all scroll/intro animation setup
      }

      /* ── Page-load intro animation ────────────────────────────────────
         1. Characters start invisible, 38px below, and rotated -40° on X
            axis (as if lying flat). They flip up one by one (stagger 0.03s).
         2. Cards fade in slightly after the text, staggered 0.13s apart.
         3. Counter numbers tick up from 0 using GSAP's onUpdate pattern.
      ────────────────────────────────────────────────────────────────── */
      gsap.set([baseChars, hiChars], { opacity: 0, y: 38, rotateX: -40 });
      gsap.set(outerCards, { opacity: 0, y: 32, scale: 0.94 });

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTl
        .to(baseChars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.03,
        })
        .to(
          hiChars,
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.03 },
          "<" // start at same time as baseChars
        )
        .to(
          outerCards,
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.13 },
          "-=0.4"
        );

      /* ── Counter number tick-up ────────────────────────────────────────
         We animate a plain object { val: 0 } and write Math.round(obj.val)
         into the DOM on every tick. Cheaper than animating textContent directly.
      ────────────────────────────────────────────────────────────────── */
      counters.forEach((counterEl) => {
        const target = parseInt(counterEl.getAttribute("data-target") ?? "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            counterEl.textContent = String(Math.round(obj.val));
          },
        });
      });

      /* ── Car travel distance ───────────────────────────────────────────
         Calculated lazily so it accounts for the actual rendered width of
         the track at any viewport size. invalidateOnRefresh: true re-calls
         this on window resize so the car never overshoots on mobile.
      ────────────────────────────────────────────────────────────────── */
      const getMaxCarX = () => {
        if (!trackRef.current || !carRef.current) return 600;
        return Math.max(
          0,
          trackRef.current.clientWidth - carRef.current.clientWidth - 16
        );
      };

      /* ── Responsive scroll setup via gsap.matchMedia ──────────────────
         matchMedia means the desktop and mobile timelines don't collide.
         Different scroll distances: desktop gets 1800px of scroll travel,
         mobile gets 1150px (shorter because the track is smaller).
      ────────────────────────────────────────────────────────────────── */
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const scrollDistance = isDesktop ? "+=1800" : "+=1150";

          /* ── ScrollTrigger timeline ─────────────────────────────────────
             trigger: the outer wrapper (tall, scrollable)
             pin: the inner stage (stays fixed while we scroll through it)
             scrub: 0.6 → slight lag between scroll position and animation,
                    makes motion feel weighted and premium (not instant snap)
             invalidateOnRefresh: recalculates all dynamic values on resize
          ─────────────────────────────────────────────────────────────── */
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: scrollDistance,
              pin: pinStageRef.current,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                /* Progress bar: scaleX is a pure transform — no width
                   recalc, no layout, 100% on the compositor thread. */
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
                }
              },
            },
          });

          /* ── Car drive ───────────────────────────────────────────────────
             fromTo x:12 → x:getMaxCarX()
             ease: "none" keeps the car's position exactly proportional to
             scroll progress (scrub handles the easing feel).
          ─────────────────────────────────────────────────────────────── */
          scrollTl.fromTo(
            carRef.current,
            { x: 12 },
            { x: () => getMaxCarX(), ease: "none" },
            0
          );

          /* ── Trail reveal ─────────────────────────────────────────────
             clip-path: inset(0 94% 0 0) → inset(0 0% 0 0)
             The right side of the clip shrinks from 94% to 0%, revealing
             the lime/sky colored overlay left-to-right as the car moves.
             This is a single compositor property — zero paint calls.
          ─────────────────────────────────────────────────────────────── */
          scrollTl.fromTo(
            trailRef.current,
            { clipPath: "inset(0 94% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", ease: "none" },
            0
          );

          /* ── Stat card parallax ──────────────────────────────────────
             Top cards drift upward, bottom cards drift downward — subtle
             parallax that makes the layout feel alive during scroll.
          ─────────────────────────────────────────────────────────────── */
          if (innerCards.length === 4) {
            scrollTl.to(innerCards[0], { y: -14, scale: 1.03, ease: "power1.inOut" }, 0);
            scrollTl.to(innerCards[1], { y: -10, scale: 1.03, ease: "power1.inOut" }, 0.08);
            scrollTl.to(innerCards[2], { y: 12,  scale: 1.03, ease: "power1.inOut" }, 0.04);
            scrollTl.to(innerCards[3], { y: 16,  scale: 1.03, ease: "power1.inOut" }, 0.12);
          }
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const topStats    = IMPACT_STATS.filter((s) => s.position === "top");
  const bottomStats = IMPACT_STATS.filter((s) => s.position === "bottom");

  return (
    <section ref={wrapperRef} className="relative w-full">

      {/* ── Scroll progress bar ──────────────────────────────────────────────
          Fixed at top of viewport. scaleX goes from 0→1 driven by GSAP's
          onUpdate callback. Using transform:scaleX keeps this on the GPU.
      ────────────────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-lime-400 via-sky-400 to-purple-500 gpu-layer"
          aria-hidden="true"
        />
      </div>

      {/* ── Pinned stage ─────────────────────────────────────────────────────
          This div is what GSAP pins (position: fixed) during the scroll.
          It stays in place while the outer section scrolls past it.
          container-fluid from Bootstrap ensures edge-to-edge width.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        ref={pinStageRef}
        className="container-fluid relative w-full h-screen min-h-[600px] flex flex-col justify-between py-8 sm:py-10 px-4 sm:px-8 lg:px-14 overflow-hidden bg-grid-pattern select-none"
      >
        {/* Ambient glow blobs — decorative blur orbs in top-left and bottom-right */}
        <div className="pointer-events-none absolute -top-28 left-1/4 w-96 h-96 rounded-full bg-lime-400/10 blur-[120px] gpu-layer" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] gpu-layer" />

        {/* ── TOP ROW: Badge + 2 stat cards ─────────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-lime-400" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
              ITZFIZZ • Last-Mile Delivery Intelligence
            </span>
          </div>

          {/* Top 2 stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto">
            {topStats.map((stat) => (
              <div key={stat.id} className="stat-card gpu-layer">
                <div
                  className={`stat-card-inner gpu-layer rounded-2xl p-4 sm:p-5 shadow-xl border min-w-[155px] sm:min-w-[235px] ${stat.cardClass}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${stat.valueClass}`}
                    >
                      <span className="stat-counter" data-target={stat.value}>
                        {stat.value}
                      </span>
                      %
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${stat.badgeClass}`}
                    >
                      {stat.badge}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-xs sm:text-sm leading-snug ${stat.labelClass}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: Road track + headline + car ───────────────────────── */}
        <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center py-4">
          <div
            ref={trackRef}
            className="road-surface relative w-full max-w-7xl h-40 sm:h-52 md:h-64 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center"
            role="img"
            aria-label="Animated road track with WELCOME ITZFIZZ headline"
          >
            {/* Dashed center lane line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-white/15 pointer-events-none" aria-hidden="true" />
            {/* Track edge highlights */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

            {/* Base headline — dim white, visible at all times */}
            <h1
              aria-label="WELCOME ITZFIZZ"
              className="relative z-10 font-display font-black text-xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.18em] sm:tracking-[0.26em] text-white/25 uppercase text-center whitespace-nowrap px-4 select-none"
            >
              {HEADLINE_CHARS.map((ch, idx) =>
                ch === " " ? (
                  <span key={idx} className="hero-char inline-block w-3 sm:w-6 md:w-8" aria-hidden="true" />
                ) : (
                  <span key={idx} className="hero-char inline-block">
                    {ch}
                  </span>
                )
              )}
            </h1>

            {/* Trail reveal overlay — clip-path shrinks from right as car drives */}
            <div
              ref={trailRef}
              className="trail-reveal absolute inset-0 z-20 overflow-hidden flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="font-display font-black text-xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.18em] sm:tracking-[0.26em] text-slate-950 uppercase text-center whitespace-nowrap px-4 select-none">
                {HEADLINE_CHARS.map((ch, idx) =>
                  ch === " " ? (
                    <span key={idx} className="hero-char-hi inline-block w-3 sm:w-6 md:w-8" />
                  ) : (
                    <span key={idx} className="hero-char-hi inline-block">
                      {ch}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* ── Car actor ─────────────────────────────────────────────────
                Positioned absolute, translated vertically to center.
                GSAP moves its x from 12px → (trackWidth - carWidth - 16px).
                The headlight and taillight glows are child elements that
                move with the car automatically.
            ─────────────────────────────────────────────────────────────── */}
            <div
              ref={carRef}
              className="gpu-layer absolute left-0 top-1/2 -translate-y-1/2 z-30 w-40 sm:w-56 md:w-72 lg:w-80 pointer-events-none flex items-center"
              aria-hidden="true"
            >
              {/* Taillight red glow — radiates left from rear of car */}
              <div className="taillight-glow absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-24 rounded-full" />
              {/* Headlight cone — conic-gradient points right from car front.
                  Using percentage sizing so it scales with the car wrapper. */}
              <div
                className="headlight-beam absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ right: "-30%", width: "45%", height: "80%" }}
              />
              <McLarenCarSvg />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: 2 stat cards + scroll prompt ──────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
          {/* Bottom 2 stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto">
            {bottomStats.map((stat) => (
              <div key={stat.id} className="stat-card gpu-layer">
                <div
                  className={`stat-card-inner gpu-layer rounded-2xl p-4 sm:p-5 shadow-xl border min-w-[155px] sm:min-w-[235px] ${stat.cardClass}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${stat.valueClass}`}
                    >
                      <span className="stat-counter" data-target={stat.value}>
                        {stat.value}
                      </span>
                      %
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${stat.badgeClass}`}
                    >
                      {stat.badge}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-xs sm:text-sm leading-snug ${stat.labelClass}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll cue — bouncing dot inside a phone-shaped border */}
          <div
            className="flex items-center gap-3 self-center lg:self-end text-xs font-mono text-slate-400"
            aria-label="Scroll to interact with the animation"
          >
            <span>SCROLL TO DRIVE</span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1" aria-hidden="true">
              <div className="w-1.5 h-2.5 rounded-full bg-lime-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
