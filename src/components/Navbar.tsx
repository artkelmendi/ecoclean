"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LogoFull } from "./Logo";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sektoret", label: t.nav.sectors },
    { href: "#teknologjia", label: t.nav.technology },
    { href: "#procesi", label: t.nav.process },
    { href: "#kontakti", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/5 bg-white/80 shadow-[0_8px_30px_-16px_rgba(11,21,38,0.25)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-site flex h-[72px] items-center justify-between">
          <a href="#" aria-label="Eco Clean">
            <LogoFull />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-brand-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-ink/10 bg-white p-1 font-display text-[0.72rem] font-semibold">
              {(["sq", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1.5 uppercase transition-all ${
                    lang === l
                      ? "bg-brand-500 text-white"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href="#kontakti" className="btn-primary hidden !px-5 !py-2.5 text-[0.85rem] sm:inline-flex">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
