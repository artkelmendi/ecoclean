"use client";

import { LogoFull, LogoMark } from "./Logo";
import { InstagramIcon } from "./Hero";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-mist pb-10 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 opacity-[0.06]"
      >
        <LogoMark className="h-80 w-auto" />
      </div>
      <div className="container-site relative">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <LogoFull />
            <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-faint">
              {t.footer.links}
            </h4>
            <ul className="mt-4 space-y-2.5 font-display text-[0.95rem] font-medium text-ink-soft">
              <li><a className="transition-colors hover:text-brand-600" href="#sektoret">{t.nav.sectors}</a></li>
              <li><a className="transition-colors hover:text-brand-600" href="#teknologjia">{t.nav.technology}</a></li>
              <li><a className="transition-colors hover:text-brand-600" href="#procesi">{t.nav.process}</a></li>
              <li><a className="transition-colors hover:text-brand-600" href="#kontakti">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-faint">
              {t.footer.contactTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-soft">
              <li>+383 44 000 000</li>
              <li>info@ecoclean-ks.com</li>
              <li>
                <a
                  className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
                  href="https://www.instagram.com/ecoclean_corporation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @ecoclean_corporation
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-6 text-sm text-ink-faint sm:flex-row">
          <span>© {new Date().getFullYear()} Eco Clean. {t.footer.rights}</span>
          <span className="font-display text-xs font-medium uppercase tracking-[0.35em]">
            with us
          </span>
        </div>
      </div>
    </footer>
  );
}
