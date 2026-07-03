"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useLang } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Pinned full-screen machine video; copy crossfades as you scroll through 300vh.
export default function Technology() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  // Don't compete with the hero for bandwidth/decoding on first paint:
  // pick the right size for the device, load nothing until the section
  // approaches, and pause again once it's far off-screen.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(`${BASE}/video/${small ? "machine-small.mp4" : "machine.mp4"}`);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container || !videoSrc) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { rootMargin: "50% 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, [videoSrc]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const slides = t.tech.slides;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(slides.length - 1, Math.floor(v * slides.length));
    if (idx !== active) setActive(idx);
  });

  const scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.15], [48, 0]);

  return (
    <section id="teknologjia" ref={containerRef} className="relative h-[320vh] bg-paper">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc ?? undefined}
            poster={`${BASE}/img/machine-poster.jpg`}
            muted
            loop
            playsInline
            preload="none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04122B]/85 via-[#04122B]/30 to-[#04122B]/40" />

          {/* copy */}
          <div className="absolute inset-x-0 bottom-0 pb-20 sm:pb-24">
            <div className="container-site">
            <div className="max-w-2xl">
              {slides.map((s, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : 30,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={active === i ? "" : "pointer-events-none absolute bottom-0"}
                >
                  <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight text-white">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                    {s.sub}
                  </p>
                </motion.div>
              ))}

              {/* progress dots */}
              <div className="mt-9 flex gap-2.5">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === i ? "w-10 bg-brand-400" : "w-4 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
