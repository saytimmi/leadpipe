"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useFormModal } from "./FormModal";
import CountUpNumber from "./CountUpNumber";

const metrics = [
  { label: "Потрачено", value: 85000, suffix: " ₽" },
  { label: "Написали", value: 120, suffix: "" },
  { label: "Заинтересованы", value: 45, suffix: "", accent: true },
  { label: "Клиенты", value: 18, suffix: "", accent: true },
  { label: "Цена заявки", value: 708, suffix: " ₽" },
  { label: "Цена клиента", value: 4722, suffix: " ₽", accent: true },
];

export default function VisibilitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const dashScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const { open } = useFormModal();

  return (
    <section ref={ref} id="visibility" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">03</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            {["И ты", "наконец", "видишь", "всё"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-7xl ${
                    i === 3 ? "text-lime" : ""
                  }`}
                >
                  {word}
                </motion.p>
              </div>
            ))}
          </div>
          <div className="flex items-end">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="max-w-md font-body text-sm leading-relaxed text-text-muted md:text-base">
                Одна страница — и там всё. Сколько ушло на рекламу. Сколько написали. Какая реклама привела клиентов, а какая просто съела бюджет.
              </p>
              <button onClick={open}
                className="mt-6 cursor-pointer rounded-full border border-lime/20 px-6 py-3 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-lime transition-all active:bg-lime/5 hover:bg-lime/5 md:px-8 md:py-4 md:text-xs">
                Разобраться
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dashboard */}
        <motion.div style={{ scale: dashScale, opacity: dashOpacity }}
          className="overflow-hidden rounded-2xl border border-white/[0.04] bg-surface will-change-transform">
          <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-2.5 md:px-5 md:py-3">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="ml-3 flex-1 rounded bg-white/[0.03] px-3 py-1 text-center font-display text-[9px] text-text-dim md:text-[10px]">
              app.leadpipe.ru
            </div>
          </div>

          <div className="p-4 md:p-8 lg:p-10">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xs font-700 uppercase tracking-wider md:text-sm">Твой бизнес</h3>
              <span className="flex items-center gap-1.5 font-display text-[10px] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
              {metrics.map((m) => (
                <div key={m.label} className={`rounded-xl p-3 md:p-5 ${m.accent ? "border border-lime/10 bg-lime/[0.03]" : "bg-white/[0.02]"}`}>
                  <div className={`font-display text-lg font-800 md:text-2xl lg:text-3xl ${m.accent ? "text-lime" : "text-text"}`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 font-display text-[9px] font-500 uppercase tracking-wider text-text-dim md:text-[10px]">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-white/[0.02] p-4 md:mt-6 md:p-5">
              <div className="mb-3 font-display text-[9px] font-500 uppercase tracking-wider text-text-dim md:text-[10px]">Воронка</div>
              <div className="flex items-end gap-1" style={{ height: "60px" }}>
                {[95, 78, 60, 45, 30, 22, 15, 10].map((h, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.65, 0.05, 0, 1] }}
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
