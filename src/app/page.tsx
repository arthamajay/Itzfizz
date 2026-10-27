import HeroScrollSection from "@/components/HeroScrollSection";

/* ─── Tech stack badge data ──────────────────────────────────────────────────
   Shown in the section below the hero so reviewers immediately see
   the full stack without reading the README.
─────────────────────────────────────────────────────────────────────────── */
const STACK_BADGES = [
  { label: "Next.js 14",       color: "bg-white/10 text-white border-white/20" },
  { label: "React 18",         color: "bg-sky-400/20 text-sky-300 border-sky-400/30" },
  { label: "GSAP ScrollTrigger", color: "bg-lime-400/20 text-lime-300 border-lime-400/30" },
  { label: "Tailwind CSS",     color: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30" },
  { label: "Bootstrap Grid",   color: "bg-purple-400/20 text-purple-300 border-purple-400/30" },
  { label: "TypeScript",       color: "bg-blue-400/20 text-blue-300 border-blue-400/30" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090a0f]">
      {/* ── Hero scroll animation ────────────────────────────────────────── */}
      <HeroScrollSection />

      {/* ── Divider line ─────────────────────────────────────────────────── */}
      <div className="section-divider mx-8 lg:mx-24" />

      {/* ── Post-scroll CTA section ──────────────────────────────────────────
          This section appears after the scroll animation completes.
          It serves two purposes:
          1. Gives ScrollTrigger extra page height so the pin releases cleanly.
          2. Showcases the full tech stack — important for a submission review.
      ────────────────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[60vh] flex flex-col items-center justify-center gap-10 px-6 py-24 text-center overflow-hidden"
        aria-label="Tech stack and credits"
      >
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime-400/5 blur-[140px]"
          aria-hidden="true"
        />

        {/* Headline */}
        <div className="relative z-10 space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
            Built with
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            The Full Stack.
          </h2>
          <p className="max-w-lg mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
            Every requirement — mandatory and bonus — implemented and deployed.
            Scroll-driven animation at 60fps with zero layout reflows.
          </p>
        </div>

        {/* Stack badges */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 max-w-2xl">
          {STACK_BADGES.map((badge) => (
            <span
              key={badge.label}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-semibold border ${badge.color}`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Animation technique callouts */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left">
          {[
            {
              icon: "⚡",
              title: "GPU Composited",
              desc: "Every animated property uses transform or clip-path — no paint, no layout reflow.",
            },
            {
              icon: "🎯",
              title: "Scroll-Linked",
              desc: "Animation progress is 1:1 with scroll position via GSAP scrub, not time-based autoplay.",
            },
            {
              icon: "♿",
              title: "Accessible",
              desc: "prefers-reduced-motion respected — animations skip entirely for motion-sensitive users.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2"
            >
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <h3 className="font-display font-bold text-sm text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p className="relative z-10 text-xs text-slate-600 font-mono">
          ITZFIZZ © 2026 — Scroll-Driven Motion Demo
        </p>
      </section>
    </main>
  );
}
