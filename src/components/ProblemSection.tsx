"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", count: 100, pct: 100, color: "from-accent to-accent/80" },
  { label: "Получили ответ", count: 60, pct: 60, color: "from-accent/70 to-purple/60" },
  { label: "Узнали что нужно", count: 30, pct: 30, color: "from-purple/60 to-warm/50" },
  { label: "Дошли до конца", count: 10, pct: 10, color: "from-warm/50 to-warm/40" },
  { label: "Стали клиентами", count: 3, pct: 3, color: "from-warm to-warm/70" },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-warm/5 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 text-center">
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-warm">02 — Проблема</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mb-4 text-center font-display text-5xl font-800 text-white md:text-6xl">
          97 из 100 заявок<br />
          <span className="gradient-text">уходят в никуда</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mb-16 text-center font-display text-lg text-white/30">
          Не из-за плохой рекламы. Из-за того, что происходит после клика.
        </motion.p>

        <div className="glass mx-auto max-w-2xl rounded-3xl p-8 md:p-12">
          <div className="space-y-4">
            {stages.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="w-10 shrink-0 text-right font-display text-2xl font-800 text-white">{s.count}</span>
                <div className="flex-1">
                  <div className="relative h-12 overflow-hidden rounded-xl bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r ${s.color}`}
                    />
                    <span className="relative flex h-full items-center px-4 font-display text-sm font-500 text-white/60">{s.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}
            className="mt-8 border-t border-white/5 pt-6 text-center font-display text-sm text-white/30">
            Эти 97 — не плохие заявки. Им просто никто не ответил вовремя.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
