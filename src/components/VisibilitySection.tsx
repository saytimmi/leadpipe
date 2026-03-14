"use client";

import { motion } from "framer-motion";
import CountUpNumber from "./CountUpNumber";
import CTAButton from "./CTAButton";

const metrics = [
  { label: "Потрачено", value: 85000, suffix: " ₽", highlight: false },
  { label: "Написали", value: 120, suffix: "", highlight: false },
  { label: "Заинтересованы", value: 45, suffix: "", highlight: true },
  { label: "Клиенты", value: 18, suffix: "", highlight: true },
  { label: "Цена заявки", value: 708, suffix: " ₽", highlight: false },
  { label: "Цена клиента", value: 4722, suffix: " ₽", highlight: true },
];

export default function VisibilitySection() {
  return (
    <section id="visibility" className="relative px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* Left text */}
          <div className="lg:w-2/5">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
              03 — Прозрачность
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="mt-4 font-display text-4xl font-800 leading-tight text-white md:text-5xl">
              Видишь всё.<br />
              <span className="gradient-text-static">В реальном времени.</span>
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="mt-8 space-y-4">
              {["Сколько потрачено и кто пришёл", "Где именно люди уходят", "Какая реклама реально работает"].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="font-display text-base text-white/50">{item}</span>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10">
              <CTAButton text="Хочу дашборд" />
            </motion.div>
          </div>

          {/* Right dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 8, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-border lg:w-3/5"
          >
            <div className="rounded-2xl bg-[#0d0d14]">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-center font-display text-xs text-white/25">app.leadpipe.ru</div>
              </div>
              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-sm font-700 text-white">Дашборд</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 font-display text-xs text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {metrics.map((m, i) => (
                    <motion.div key={m.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className={`rounded-xl p-3 ${m.highlight ? "bg-accent/10 ring-1 ring-accent/20" : "bg-white/[0.04]"}`}>
                      <div className={`font-display text-xl font-800 ${m.highlight ? "gradient-text-static" : "text-white"}`}>
                        <CountUpNumber target={m.value} suffix={m.suffix} />
                      </div>
                      <div className="mt-0.5 font-display text-[11px] text-white/35">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                  <div className="mb-3 font-display text-xs text-white/25">Воронка конверсии</div>
                  <div className="flex items-end gap-1.5" style={{ height: 64 }}>
                    {[90, 65, 48, 30, 18, 8].map((h, i) => (
                      <motion.div key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 + i * 0.07 }}
                        className={`flex-1 rounded-t-md ${i < 3 ? "bg-accent/50" : "bg-warm/50"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
