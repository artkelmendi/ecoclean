"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { LogoMark } from "./Logo";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ started }: { started: boolean }) {
  const { t } = useLang();

  const stagger = (i: number) => ({
    initial: { y: 60, opacity: 0 },
    animate: started ? { y: 0, opacity: 1 } : {},
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease },
  });

  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      {/* soft brand glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-64 left-1/2 h-[42rem] w-[68rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(41,123,245,0.16), rgba(41,123,245,0.05) 60%, transparent)",
        }}
      />
      {/* faint giant watermark of the mark, Pitch-style oversized brand element */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-24 hidden opacity-[0.05] lg:block"
        initial={{ rotate: -18, scale: 0.9 }}
        animate={started ? { rotate: 0, scale: 1 } : {}}
        transition={{ duration: 1.6, ease }}
      >
        <LogoMark className="h-[36rem] w-auto" />
      </motion.div>

      <div className="container-site relative">
        <motion.p {...stagger(0)} className="eyebrow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="h-display mt-6 max-w-4xl text-[clamp(2.8rem,7.2vw,5.6rem)] leading-[0.98]">
          <span className="block overflow-hidden">
            <motion.span className="block" {...stagger(1)}>
              {t.hero.titleA}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-brand-500" {...stagger(2)}>
              {t.hero.titleB}
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...stagger(3)}
          className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div {...stagger(4)} className="mt-9 flex flex-wrap gap-3.5">
          <a href="#kontakti" className="btn-primary">
            {t.hero.ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#teknologjia" className="btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* video card */}
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.96 }}
          animate={started ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.75, duration: 1.1, ease }}
          className="relative mt-16"
        >
          <div className="noise relative overflow-hidden rounded-4xl shadow-[0_40px_90px_-30px_rgba(9,59,134,0.45)]">
            <video
              className="aspect-[16/8] w-full object-cover"
              src={`${BASE}/video/machine-small.mp4`}
              poster={`${BASE}/img/machine-poster.jpg`}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062A61]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-display text-[0.8rem] font-medium text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-200" />
              </span>
              {t.hero.videoChip}
            </div>

            {/* floating stat chips */}
            <div className="absolute right-5 top-5 hidden flex-col gap-2.5 sm:flex">
              <div className="rounded-2xl bg-white/90 px-5 py-3 text-center shadow-lg backdrop-blur">
                <div className="font-display text-2xl font-extrabold text-brand-600">24h</div>
                <div className="text-[0.7rem] font-medium uppercase tracking-wider text-ink-faint">
                  {t.hero.statOne}
                </div>
              </div>
              <div className="rounded-2xl bg-white/90 px-5 py-3 text-center shadow-lg backdrop-blur">
                <div className="font-display text-2xl font-extrabold text-brand-600">4</div>
                <div className="text-[0.7rem] font-medium uppercase tracking-wider text-ink-faint">
                  {t.hero.statTwo}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* trusted-by strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-between"
        >
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-ink-faint">
            {t.hero.trustLabel}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-[0.95rem] font-semibold text-ink-soft/80">
            <span className="flex items-center gap-2">
              <ShieldIcon /> {t.hero.trustPolice}
            </span>
            <span className="flex items-center gap-2">
              <StarShieldIcon /> {t.hero.trustFsk}
            </span>
            <span className="flex items-center gap-2">
              <HotelIcon /> {t.hero.trustHotels}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-500" aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-500" aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3 1-2z" fill="currentColor" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-500" aria-hidden>
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
