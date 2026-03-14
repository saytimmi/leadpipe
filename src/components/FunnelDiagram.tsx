"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", count: "100", width: 100 },
  { label: "Получили ответ", count: "60", width: 60 },
  { label: "Узнали что нужно", count: "30", width: 30 },
  { label: "Дошли до конца", count: "10", width: 10 },
  { label: "Стали клиентами", count: "3", width: 3 },
];

export default function FunnelDiagram() {
  return (
    <div className="rounded-3xl border border-dark/5 bg-white p-8 md:p-12">
      <p className="mb-8 font-display text-sm font-600 uppercase tracking-[0.2em] text-muted">
        Куда уходят заявки
      </p>

      <div className="space-y-4">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex items-center gap-4"
          >
            <span className="w-20 shrink-0 text-right font-display text-2xl font-800 text-dark md:w-24 md:text-3xl">
              {stage.count}
            </span>
            <div className="flex-1">
              <div className="relative h-10 overflow-hidden rounded-lg bg-dark/[0.03]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stage.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-lg ${
                    i < 2 ? "bg-accent/15" : i < 4 ? "bg-warm/20" : "bg-warm/40"
                  }`}
                />
                <span className="relative flex h-full items-center px-4 font-display text-sm font-500 text-dark">
                  {stage.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-8 border-t border-dark/5 pt-6 text-center font-body text-lg italic text-muted"
      >
        Остальные 97 — не плохие заявки.
        <br />
        Им просто никто нормально не ответил.
      </motion.p>
    </div>
  );
}
