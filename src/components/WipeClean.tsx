"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// Interactive "wipe the dirty glass" panel: a frosted/grimy canvas covers a crisp
// blue panel; moving the pointer erases the grime like a squeegee.
export default function WipeClean() {
  const { t } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleaned, setCleaned] = useState(false);
  const cleanedRef = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paintGrime = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // steamy glass base
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#C9D4E2");
      g.addColorStop(0.5, "#B6C3D4");
      g.addColorStop(1, "#CBD5E3");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // smudges
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = 12 + Math.random() * 70;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        const tone = Math.random() > 0.5 ? "138,150,167" : "170,182,199";
        grad.addColorStop(0, `rgba(${tone},${0.12 + Math.random() * 0.22})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // droplet streaks
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      for (let i = 0; i < 26; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.5;
        const len = 20 + Math.random() * 90;
        ctx.lineWidth = 1 + Math.random() * 2.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + (Math.random() - 0.5) * 8, y + len / 2, x, y + len);
        ctx.stroke();
      }
    };

    paintGrime();
    const onResize = () => {
      if (!cleanedRef.current) paintGrime();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || cleanedRef.current) return;
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height, {
      willReadFrequently: true,
    } as never).data;
    let clear = 0;
    const step = 4 * 97; // sparse sampling
    let total = 0;
    for (let i = 3; i < sample.length; i += step) {
      total++;
      if (sample[i] < 40) clear++;
    }
    if (clear / total > 0.6) {
      cleanedRef.current = true;
      setCleaned(true);
    }
  };

  const wipe = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx || cleanedRef.current) return;
    const rect = wrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    const brush = Math.max(rect.width, rect.height) * 0.055;

    const from = lastPoint.current ?? { x, y };
    const dist = Math.hypot(x - from.x, y - from.y);
    const steps = Math.max(1, Math.floor(dist / (brush * 0.4)));
    for (let i = 0; i <= steps; i++) {
      const px = from.x + ((x - from.x) * i) / steps;
      const py = from.y + ((y - from.y) * i) / steps;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, brush);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(0.7, "rgba(0,0,0,0.85)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, brush, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPoint.current = { x, y };
    if (Math.random() < 0.12) checkProgress();
  };

  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="container-site">
        <div className="mb-12 text-center">
          <p className="eyebrow">{t.wipe.eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] leading-tight">
            {t.wipe.title}
          </h2>
        </div>

        <div
          ref={wrapRef}
          className="relative mx-auto max-w-4xl cursor-crosshair select-none overflow-hidden rounded-4xl shadow-[0_30px_80px_-30px_rgba(9,59,134,0.4)] [touch-action:pan-y]"
          onPointerMove={(e) => wipe(e.clientX, e.clientY)}
          onPointerDown={(e) => {
            lastPoint.current = null;
            wipe(e.clientX, e.clientY);
          }}
          onPointerLeave={() => (lastPoint.current = null)}
        >
          {/* the clean reveal underneath */}
          <div className="relative flex aspect-[16/9] flex-col items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 text-center sm:aspect-[16/8]">
            <SparkleIcon className="mb-4 h-10 w-10 text-white/90" />
            <div className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight text-white">
              {t.wipe.revealTitle}
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-100 sm:text-base">
              {t.wipe.revealSub}
            </p>
          </div>

          {/* the grime layer */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              cleaned ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />

          {/* hint */}
          {!cleaned && (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
              <span className="flex animate-pulse items-center gap-2 rounded-full bg-ink/70 px-4 py-2 font-display text-[0.8rem] font-medium text-white backdrop-blur">
                <HandIcon className="h-4 w-4" />
                {t.wipe.hint}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2l1.8 5.7L19.5 9.5l-5.7 1.8L12 17l-1.8-5.7L4.5 9.5l5.7-1.8L12 2z" fill="currentColor" />
      <path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function HandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-1a1.5 1.5 0 0 1 3 0V12m0-5.5a1.5 1.5 0 0 1 3 0V13m0-4a1.5 1.5 0 0 1 3 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.3L4.4 14a1.7 1.7 0 0 1 .5-2.3 1.7 1.7 0 0 1 2.2.3L8 13z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
