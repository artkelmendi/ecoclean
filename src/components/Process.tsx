"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n";

// Sticky horizontal scroll: the 4 process steps slide sideways as you scroll down.
export default function Process() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.12, 0.95], ["0%", "-62%"]);
  const barW = useTransform(scrollYProgress, [0.1, 0.95], ["0%", "100%"]);

  return (
    <section id="procesi" ref={containerRef} className="relative h-[300vh] bg-mist">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-site mb-10">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 className="h-display mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
            {t.process.title}
          </h2>
          <div className="mt-8 h-1 w-full max-w-md overflow-hidden rounded-full bg-ink/10">
            <motion.div style={{ width: barW }} className="h-full rounded-full bg-brand-500" />
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 pl-5 sm:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {t.process.steps.map((step, i) => (
            <div
              key={i}
              className="noise relative w-[78vw] max-w-md shrink-0 overflow-hidden rounded-4xl bg-white p-9 shadow-[0_25px_60px_-35px_rgba(11,21,38,0.35)] sm:w-[26rem]"
            >
              <span className="font-display text-[4.5rem] font-extrabold leading-none text-brand-100">
                {step.num}
              </span>
              <div
                aria-hidden
                className="absolute right-8 top-9 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500"
              >
                <StepIcon index={i} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
                {step.name}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{step.desc}</p>
            </div>
          ))}

          {/* end card */}
          <div className="flex w-[78vw] max-w-md shrink-0 items-center justify-center rounded-4xl bg-gradient-to-br from-brand-500 to-brand-700 p-9 sm:w-[26rem]">
            <div className="text-center">
              <div className="font-display text-6xl font-extrabold text-white">24h</div>
              <div className="mt-2 font-display text-lg font-medium text-brand-100">
                {t.hero.statOne}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepIcon({ index }: { index: number }) {
  const icons = [
    // truck
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 8h12v8H1V8zm12 3h4l3 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>,
    // washer drum
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 0 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 6h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>,
    // check badge
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l2.4 2.4 3.4-.5.9 3.3 3 1.7-1.5 3.1 1.5 3.1-3 1.7-.9 3.3-3.4-.5L12 22l-2.4-2.4-3.4.5-.9-3.3-3-1.7 1.5-3.1L2.3 8.9l3-1.7.9-3.3 3.4.5L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // package
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}
