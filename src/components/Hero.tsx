"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { LogoMark, MARK_PATH_A, MARK_PATH_B, MARK_VIEWBOX } from "./Logo";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPIN_COOLDOWN_MS = 2800; // one hover-spin at a time; no retrigger mid-animation

export default function Hero({ started }: { started: boolean }) {
  const { t } = useLang();

  // Entry: mark arrives spinning fast (-720°) and settles at 0°.
  // Hover: adds one +360° turn, guarded by a cooldown so it can't stack or glitch.
  const [rotation, setRotation] = useState(0);
  const lastSpinAt = useRef(0);

  const hoverSpin = () => {
    const now = Date.now();
    if (now - lastSpinAt.current < SPIN_COOLDOWN_MS) return;
    lastSpinAt.current = now;
    setRotation((r) => r + 360);
  };

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

      {/* drifting stroked logo outlines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <DriftingMark className="left-[4%] top-[18%] w-28" duration={26} drift={26} rotate={10} />
        <DriftingMark className="right-[8%] top-[8%] w-40" duration={34} drift={-32} rotate={-8} delay={3} />
        <DriftingMark className="left-[34%] top-[64%] w-20" duration={22} drift={20} rotate={14} delay={6} />
        <DriftingMark className="right-[26%] top-[72%] w-24" duration={30} drift={-24} rotate={-12} delay={1.5} />
        <DriftingMark className="left-[14%] top-[84%] w-32 hidden lg:block" duration={38} drift={28} rotate={6} delay={9} />
      </div>

      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* left: copy */}
          <div>
            <motion.p {...stagger(0)} className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
              {t.hero.eyebrow}
            </motion.p>

            <h1 className="h-display mt-6 text-[clamp(2.8rem,6.4vw,5.2rem)] leading-[0.98]">
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

            <motion.div {...stagger(4)} className="mt-9 flex flex-wrap items-center gap-3.5">
              <a href="#kontakti" className="btn-primary">
                {t.hero.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#teknologjia" className="btn-ghost">
                {t.hero.ctaSecondary}
              </a>
              <a
                href="https://www.instagram.com/ecoclean_corporation/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @ecoclean_corporation"
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ink/10 bg-white text-ink-soft transition-all duration-300 hover:scale-105 hover:border-brand-300 hover:text-brand-600"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* right: the living brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={started ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 1.1, ease }}
            className="relative mx-auto flex aspect-square w-full max-w-[24rem] items-center justify-center"
          >
            {/* soft glow behind the mark */}
            <div
              aria-hidden
              className="absolute inset-[20%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(41,123,245,0.18), transparent)" }}
            />

            {/* the swirl mark: spins in fast, settles, and does one guarded spin on hover */}
            <div
              className="relative flex w-[58%] cursor-pointer flex-col items-center"
              onMouseEnter={hoverSpin}
            >
              <motion.div
                initial={{ rotate: -720 }}
                animate={{ rotate: started ? rotation : -720 }}
                transition={{
                  duration: rotation === 0 ? 1.7 : 1.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-[76%]"
              >
                <LogoMark className="h-auto w-full drop-shadow-[0_20px_45px_rgba(41,123,245,0.35)]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={started ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.7, ease }}
                className="mt-5 select-none text-center font-display"
              >
                <span className="block text-2xl font-semibold lowercase tracking-tight text-[#B9BEC7]">
                  eco <span className="text-ink">clean</span>
                </span>
                <span className="mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.5em] text-[#B9BEC7]">
                  with us
                </span>
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* trusted-by strip with real emblems */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.9, ease }}
          className="mt-20 rounded-4xl border border-ink/5 bg-mist/70 px-7 py-6"
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-ink-faint">
              {t.hero.trustLabel}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <span className="flex items-center gap-3 font-display text-[0.95rem] font-semibold text-ink-soft">
                <img
                  src={`${BASE}/img/police-logo.png`}
                  alt="Police of Kosovo"
                  className="h-11 w-11 object-contain"
                />
                {t.hero.trustPolice}
              </span>
              <span className="flex items-center gap-3 font-display text-[0.95rem] font-semibold text-ink-soft">
                <img
                  src={`${BASE}/img/fsk-logo.svg`}
                  alt="Kosovo Security Force"
                  className="h-11 w-11 object-contain"
                />
                {t.hero.trustFsk}
              </span>
              <span className="flex items-center gap-3 font-display text-[0.95rem] font-semibold text-ink-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                  <HotelIcon />
                </span>
                {t.hero.trustHotels}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Stroke-only brand mark drifting slowly in the hero background.
function DriftingMark({
  className = "",
  duration,
  drift,
  rotate,
  delay = 0,
}: {
  className?: string;
  duration: number;
  drift: number;
  rotate: number;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox={MARK_VIEWBOX}
      className={`absolute h-auto ${className}`}
      animate={{ y: [0, drift, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d={MARK_PATH_A} fill="none" stroke="#297BF5" strokeWidth="1.4" opacity="0.1" />
      <path d={MARK_PATH_B} fill="none" stroke="#297BF5" strokeWidth="1.4" opacity="0.1" />
    </motion.svg>
  );
}

function HotelIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
