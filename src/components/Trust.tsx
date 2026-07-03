"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Trust() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      {/* subtle blue aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[30rem] w-[40rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #297BF5, transparent)" }}
      />
      <div ref={ref} className="container-site relative">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow !border-white/10 !bg-white/5 !text-brand-300">
            {t.trust.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.03] tracking-tight">
            {t.trust.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">{t.trust.sub}</p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.trust.cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ y: 60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-4xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-colors duration-500 hover:border-brand-400/40 hover:bg-white/[0.07]"
            >
              {i === 0 ? (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1.5">
                  <img src={`${BASE}/img/police-logo.png`} alt="Police of Kosovo emblem" className="h-full w-full object-contain" />
                </span>
              ) : i === 1 ? (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1.5">
                  <img src={`${BASE}/img/fsk-logo.svg`} alt="Kosovo Security Force emblem" className="h-full w-full object-contain" />
                </span>
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <CrownIcon />
                </span>
              )}
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-12 md:grid-cols-4">
          {t.trust.stats.map((s, i) => (
            <Stat key={i} inView={inView} delay={0.3 + i * 0.1} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now() + delay * 1000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / 1400));
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <div className="text-center md:text-left">
      <div className="font-display text-5xl font-extrabold tracking-tight text-brand-300">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function CrownIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 18h18M4 17l-1-9 5.5 4L12 5l3.5 7L21 8l-1 9H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
