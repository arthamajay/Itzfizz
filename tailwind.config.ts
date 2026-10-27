import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Fonts ─────────────────────────────────────────────────────────
         CSS variables are injected by next/font in layout.tsx.
         These values here make `font-sans` and `font-display` work
         everywhere in Tailwind classes.
      ──────────────────────────────────────────────────────────────────── */
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        brand: {
          lime: "#a3e635",
          orange: "#ff5500",
          cyan: "#38bdf8",
          dark: "#090a0f",
          surface: "#12151f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
