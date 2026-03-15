"use client";

import { motion } from "framer-motion";
import CountUpNumber from "./CountUpNumber";

const funnelStages = [
  { label: "Написали", count: 100, color: "bg-accent", textColor: "text-accent" },
  { label: "Получили ответ вовремя", count: 60, color: "bg-accent/70", textColor: "text-accent-glow" },
  { label: "Назвали имя и задачу", count: 30, color: "bg-warm/80", textColor: "text-warm" },
  { label: "Дошли до записи", count: 10, color: "bg-warm/60", textColor: "text-warm" },
  { label: "Стали клиентами", count: 3, color: "bg-neon", textColor: "text-neon" },
];

export default function LeakSection() {
  return (
    <section id="leak" className="noise-overlay relative overflow-hidden px-6 py-32 md:py-40">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-warm">
            02 — Невидимая дыра
          </span>
          <h2 className="mt-5 font-display text-4xl font-800 tracking-tight text-text md:text-6xl lg:text-7xl">
            Куда уходят
            <br />
            <span className="text-warm">твои деньги</span>
          </h2>
        </motion.div>

        {/* Funnel visualization */}
        <div className="mt-20 space-y-4">
          {funnelStages.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex items-center gap-4 md:gap-6"
            >
              <span className={`w-16 shrink-0 text-right font-display text-3xl font-800 md:w-20 md:text-4xl ${stage.textColor}`}>
                <CountUpNumber target={stage.count} />
              </span>
              <div className="flex-1">
                <div className="relative h-12 overflow-hidden rounded-xl bg-white/[0.03] md:h-14">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stage.count}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`absolute inset-y-0 left-0 rounded-xl ${stage.color} opacity-15`}
                  />
                  <span className="relative flex h-full items-center px-5 font-display text-sm font-500 text-text-secondary md:text-base">
                    {stage.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center md:p-12"
        >
          <p className="font-display text-2xl font-700 leading-relaxed text-text md:text-3xl">
            <span className="text-warm">97 человек</span> пришли к тебе за помощью.
          </p>
          <p className="mt-4 font-body text-lg text-text-secondary md:text-xl">
            И ушли ни с чем. Не потому что ты плохой.
            <br />
            А потому что ты — один. А они пишут <span className="text-text">в любое время</span>.
          </p>
        </motion.div>
      </div>

      <div className="section-divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
