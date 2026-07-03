"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MARK_PATH_A, MARK_PATH_B, MARK_VIEWBOX } from "./Logo";

// Intro: the two swirl halves fly in counter-rotating (the brand's "rotation /
// water swirling" concept), lock together, do one full spin, then the curtain lifts.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"assemble" | "exit">("assemble");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("exit"), 2350);
    const t2 = setTimeout(() => {
      document.documentElement.style.overflow = "";
      onDone();
    }, 3050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ y: 0 }}
          animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            viewBox={MARK_VIEWBOX}
            className="h-24 w-24 sm:h-28 sm:w-28"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ delay: 1.15, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ originX: "50%", originY: "50%" }}
          >
            <motion.path
              d={MARK_PATH_A}
              fill="#297BF5"
              initial={{ opacity: 0, rotate: -150, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: "50%", originY: "50%" }}
            />
            <motion.path
              d={MARK_PATH_B}
              fill="#297BF5"
              initial={{ opacity: 0, rotate: 150, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: "50%", originY: "50%" }}
            />
          </motion.svg>

          <div className="mt-6 overflow-hidden">
            <motion.div
              className="font-display text-center"
              initial={{ y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-3xl font-semibold lowercase tracking-tight text-[#B9BEC7]">
                eco <span className="text-ink">clean</span>
              </span>
              <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.5em] text-[#B9BEC7]">
                with us
              </span>
            </motion.div>
          </div>

          {/* progress shimmer */}
          <motion.div
            className="absolute bottom-14 h-[3px] w-40 overflow-hidden rounded-full bg-brand-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full bg-brand-500"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
            />
          </motion.div>
    </motion.div>
  );
}
