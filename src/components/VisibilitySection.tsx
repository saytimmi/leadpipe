"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CountUpNumber from "./CountUpNumber";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Представь: ты открываешь одну страницу — и видишь всё. Сколько потрачено. Сколько людей написали. Кто купил. Кто ушёл. И почему.",
  "Не табличку в Excel, которую никто не обновляет. Не отчёт от маркетолога, который сам не понимает цифры. А реальную картину: живую, понятную, автоматическую.",
  "Ты наконец видишь, где теряешь деньги. И можешь это остановить.",
];

const metrics = [
  { label: "Потрачено", value: 85000, suffix: " \u20BD", highlight: false },
  { label: "Написали", value: 120, suffix: "", highlight: false },
  { label: "Заинтересованы", value: 45, suffix: "", highlight: true },
  { label: "Клиенты", value: 18, suffix: "", highlight: true },
  { label: "Цена заявки", value: 708, suffix: " \u20BD", highlight: false },
  { label: "Цена клиента", value: 4722, suffix: " \u20BD", highlight: true },
];

export default function VisibilitySection() {
  return (
    <section
      id="visibility"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[150px]" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            03 — Полная прозрачность
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-white md:text-7xl">
            Ты наконец
            <br />
            <span className="gradient-text-static">видишь всё</span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} light />

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border mt-20 overflow-hidden rounded-2xl"
        >
          <div className="rounded-2xl bg-dark/80 backdrop-blur-xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 rounded-md bg-white/5 px-4 py-1 text-center font-display text-xs text-white/30">
                app.leadpipe.ru/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-10">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-display text-lg font-700 text-white">Твой бизнес в реальном времени</h3>
                <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 font-display text-xs font-500 text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-xl p-4 transition-all duration-300 ${
                      m.highlight
                        ? "glass border-accent/20 bg-accent/10 shadow-[0_0_30px_rgba(0,71,255,0.1)]"
                        : "glass"
                    }`}
                  >
                    <div className={`font-display text-2xl font-800 md:text-3xl ${
                      m.highlight ? "gradient-text-static" : "text-white"
                    }`}>
                      <CountUpNumber target={m.value} suffix={m.suffix} />
                    </div>
                    <div className="mt-1 font-display text-xs font-500 text-white/40">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="mt-6 glass rounded-xl p-5">
                <div className="mb-3 font-display text-xs font-500 text-white/30">
                  Где отваливаются клиенты
                </div>
                <div className="flex items-end gap-2" style={{ height: "80px" }}>
                  {[90, 65, 48, 30, 18, 8].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
                      className={`flex-1 rounded-t-md ${
                        i < 3 ? "bg-gradient-to-t from-accent/30 to-accent/60" : "bg-gradient-to-t from-warm/30 to-warm/60"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between font-display text-[10px] text-white/20">
                  <span>Написали</span>
                  <span>Клиенты</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <CTAButton text="Хочу такой дашборд" />
        </div>
      </div>
    </section>
  );
}
