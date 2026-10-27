import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./globals.css";

/* ─── next/font ─────────────────────────────────────────────────────────────
   Fonts are self-hosted by Next.js — zero FOUT, no external request at
   render time. `display: swap` ensures text is always visible.
─────────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"], // Space Grotesk max weight is 700
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WELCOME ITZFIZZ — Scroll-Driven Hero Section Animation",
  description:
    "60fps scroll-driven hero section animation built with Next.js 14, React 18, Tailwind CSS, GSAP ScrollTrigger, and Bootstrap Grid.",
  openGraph: {
    title: "WELCOME ITZFIZZ — Scroll-Driven Hero Animation",
    description:
      "60fps scroll-driven hero section animation built with Next.js, GSAP ScrollTrigger, Tailwind CSS, and Bootstrap Grid.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WELCOME ITZFIZZ — Scroll-Driven Hero Animation",
    description:
      "60fps scroll-driven hero section animation built with Next.js, GSAP ScrollTrigger, Tailwind CSS, and Bootstrap Grid.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#090a0f] text-slate-100 antialiased selection:bg-lime-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
