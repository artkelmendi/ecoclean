"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/lib/i18n";

// Brand-book sector colors (page 5 of eco1.pdf)
const sectorMeta = [
  { color: "#F5A24B", soft: "#FDF1E3", icon: CateringIcon },
  { color: "#29C4F5", soft: "#E5F7FE", icon: HealthIcon },
  { color: "#6DBE6A", soft: "#EAF6EA", icon: AccommodationIcon },
  { color: "#8A939D", soft: "#EFF1F4", icon: IndustrialIcon },
];

export default function Sectors() {
  const { t } = useLang();

  return (
    <section id="sektoret" className="bg-paper py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* sticky left column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{t.sectors.eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02]">
              {t.sectors.title}
              <br />
              <span className="text-brand-500">{t.sectors.titleB}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t.sectors.sub}
            </p>
            <div className="mt-8 hidden gap-2 lg:flex">
              {sectorMeta.map((s, i) => (
                <span
                  key={i}
                  className="h-1.5 w-10 rounded-full"
                  style={{ background: s.color }}
                />
              ))}
            </div>
          </div>

          {/* scrolling cards */}
          <div className="flex flex-col gap-6">
            {t.sectors.items.map((item, i) => (
              <SectorCard key={i} index={i} name={item.name} desc={item.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectorCard({
  index,
  name,
  desc,
}: {
  index: number;
  name: string;
  desc: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const meta = sectorMeta[index];
  const Icon = meta.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ y: 70, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 * index }}
      className="group relative overflow-hidden rounded-4xl border border-ink/5 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(11,21,38,0.25)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(11,21,38,0.35)] sm:p-10"
      style={{ background: `linear-gradient(135deg, white 55%, ${meta.soft})` }}
    >
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-2xl transition-transform duration-700 group-hover:scale-150"
        style={{ background: meta.color }}
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{ background: meta.color }}
        >
          <Icon />
        </span>
        <div>
          <div className="flex items-baseline gap-3">
            <span
              className="font-display text-sm font-bold"
              style={{ color: meta.color }}
            >
              0{index + 1}
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              {name}
            </h3>
          </div>
          <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CateringIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 21h8m-4-4v4m-6-9a6 6 0 1 1 12 0v1H6v-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s-7-4.5-9.2-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.2 12C19 16.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v6m-3-3h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AccommodationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2m18-2v2M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IndustrialIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 21V10l5 3V10l5 3V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v15H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 17h2m4 0h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
