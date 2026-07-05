"use client";

import { LogoMark } from "./Logo";

// The brand slogan as a slow full-width marquee. The slogan is part of the
// logo lockup, so it stays in English in both languages.
export default function WithUsBand() {
  const row = Array.from({ length: 4 });

  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden} className="flex w-max shrink-0 items-center">
      {row.map((_, i) => (
        <span key={i} className="mx-8 flex items-center gap-8">
          <span className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold lowercase tracking-tight text-ink">
            eco clean
          </span>
          <span
            className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light lowercase tracking-tight"
            style={{
              WebkitTextStroke: "1.5px rgba(41,123,245,0.55)",
              color: "rgba(41,123,245,0.06)",
            }}
          >
            with us
          </span>
          <LogoMark className="h-[clamp(1.8rem,4.5vw,3.2rem)] w-auto translate-y-[10%]" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="eco clean — with us" className="overflow-hidden border-y border-ink/5 bg-paper py-10 sm:py-14">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
