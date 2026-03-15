"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const metrics = [
  { label: "Потрачено", value: "85 000 ₽" },
  { label: "Написали", value: "120" },
  { label: "Заинтересованы", value: "45", accent: true },
  { label: "Клиенты", value: "18", accent: true },
  { label: "Цена заявки", value: "708 ₽" },
  { label: "Цена клиента", value: "4 722 ₽", accent: true },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const dur = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return <span ref={ref} className="tabular-nums">{val.toLocaleString("ru-RU")}{suffix}</span>;
}

export default function VisibilitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const dashScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={ref} id="visibility" className="px-6 py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header — full width dramatic */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">03</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            {["И ты", "наконец", "видишь", "всё"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight md:text-7xl ${
                    i === 3 ? "text-lime" : ""
                  }`}
                >
                  {word}
                </motion.p>
              </div>
            ))}
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="max-w-md font-body text-base leading-relaxed text-text-muted"
            >
              Одна страница — и там всё. Сколько ушло на рекламу. Сколько написали. Какая реклама привела клиентов, а какая просто съела бюджет. Живая картина — обновляется сама.
            </motion.p>
          </div>
        </div>

        {/* Dashboard — scales into view */}
        <motion.div
          style={{ scale: dashScale, opacity: dashOpacity }}
          className="overflow-hidden rounded-2xl border border-white/[0.04] bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.04] px-5 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="ml-4 flex-1 rounded bg-white/[0.03] px-4 py-1 text-center font-display text-[10px] text-text-dim">
              app.leadpipe.ru
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-sm font-700 uppercase tracking-wider">Твой бизнес</h3>
              <span className="flex items-center gap-1.5 font-display text-[10px] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className={`rounded-xl p-5 ${
                  m.accent ? "border border-lime/10 bg-lime/[0.03]" : "bg-white/[0.02]"
                }`}>
                  <div className={`font-display text-2xl font-800 md:text-3xl ${m.accent ? "text-lime" : "text-text"}`}>
                    {m.value}
                  </div>
                  <div className="mt-1.5 font-display text-[10px] font-500 uppercase tracking-wider text-text-dim">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Chart bars */}
            <div className="mt-6 rounded-xl bg-white/[0.02] p-5">
              <div className="mb-4 font-display text-[10px] font-500 uppercase tracking-wider text-text-dim">Воронка</div>
              <div className="flex items-end gap-1" style={{ height: "80px" }}>
                {[95, 78, 60, 45, 30, 22, 15, 10].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.65, 0.05, 0, 1] }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    className={`flex-1 rounded-t ${i > 4 ? "bg-warm/30" : "bg-lime/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
