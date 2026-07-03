"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakti" className="bg-paper py-24 sm:py-32">
      <div ref={ref} className="container-site">
        <div className="grid gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05]">
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {t.contact.sub}
            </p>

            <div className="mt-10 space-y-4 text-ink-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">
                {t.contact.note}
              </p>
              {/* TODO: replace placeholders with real contact details */}
              <a href="tel:+38344000000" className="flex items-center gap-3 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-600">
                <IconWrap><PhoneIcon /></IconWrap> +383 44 000 000
              </a>
              <a href="mailto:info@ecoclean-ks.com" className="flex items-center gap-3 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-600">
                <IconWrap><MailIcon /></IconWrap> info@ecoclean-ks.com
              </a>
              <a
                href="https://www.instagram.com/ecoclean_corporation/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-600"
              >
                <IconWrap><InstagramIcon /></IconWrap> @ecoclean_corporation
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ y: 60, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="noise relative rounded-4xl bg-mist p-8 sm:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="mt-5 max-w-xs text-ink-soft">{t.contact.sub}</p>
              </div>
            ) : (
              <div className="grid gap-5">
                <Field label={t.contact.name}>
                  <input required className="field-input" type="text" />
                </Field>
                <Field label={t.contact.company}>
                  <input required className="field-input" type="text" />
                </Field>
                <Field label={t.contact.sector}>
                  <select className="field-input">
                    {t.contact.sectorOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t.contact.message}>
                  <textarea rows={4} className="field-input resize-none" />
                </Field>
                <button type="submit" className="btn-primary mt-2 w-full">
                  {t.contact.submit}
                </button>
              </div>
            )}
            <style jsx>{`
              .field-input {
                width: 100%;
                border-radius: 1rem;
                border: 1px solid rgba(11, 21, 38, 0.08);
                background: white;
                padding: 0.85rem 1.1rem;
                font-size: 0.95rem;
                color: #0b1526;
                outline: none;
                transition: border-color 0.3s, box-shadow 0.3s;
              }
              .field-input:focus {
                border-color: #297bf5;
                box-shadow: 0 0 0 4px rgba(41, 123, 245, 0.12);
              }
            `}</style>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[0.85rem] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
      {children}
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
