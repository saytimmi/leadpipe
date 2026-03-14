"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", count: "100", width: 100, color: "from-accent to-accent/80" },
  { label: "Получили ответ", count: "60", width: 60, color: "from-accent/70 to-purple/60" },
  { label: "Узнали что нужно", count: "30", width: 30, color: "from-purple/60 to-warm/50" },
  { label: "Дошли до конца", count: "10", width: 10, color: "from-warm/50 to-warm/40" },
  { label: "Стали клиентами", count: "3", width: 3, color: "from-warm/40 to-warm/30" },
];

export default function FunnelDiagram() {
  return (
    <div className="glass overflow-hidden rounded-2xl p-8 md:p-12">
      <p className="mb-8 font-display text-sm font-600 uppercase tracking-[0.2em] text-white/30">
        Куда утекают твои деньги
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
            <span className="w-16 shrink-0 text-right font-display text-2xl font-800 text-white md:w-20 md:text-3xl">
              {stage.count}
            </span>
            <div className="flex-1">
              <div className="relative h-12 overflow-hidden rounded-xl bg-white/[0.03]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stage.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r ${stage.color}`}
                  style={{
                    boxShadow: i === 0 ? "0 0 30px rgba(0, 71, 255, 0.2)" : undefined,
                  }}
                />
                <span className="relative flex h-full items-center px-4 font-display text-sm font-500 text-white/70">
                  {stage.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-8 border-t border-white/5 pt-6 text-center"
      >
        <p className="font-body text-lg text-white/40">
          97 человек заплатили за рекламу. Но{" "}
          <span className="font-semibold text-warm">никто им нормально не ответил.</span>
        </p>
        <p className="mt-2 font-display text-sm font-500 text-white/20">
          Это не плохие заявки. Это потерянные деньги.
        </p>
      </motion.div>
    </div>
  );
}
