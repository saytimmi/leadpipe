"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", count: 100, w: 100 },
  { label: "Получили ответ", count: 60, w: 60 },
  { label: "Узнали что нужно", count: 30, w: 30 },
  { label: "Дошли до конца", count: 10, w: 10 },
  { label: "Стали клиентами", count: 3, w: 3 },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-lime">
            02
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight md:text-6xl lg:text-7xl">
            Вот в чём{" "}
            <span className="text-text-muted">проблема</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {["Заявки были нормальные. Люди реально интересовались.",
            "Просто им не ответили вовремя. Или ответили, но не довели. Или довели, но потом забыли напомнить.",
            "И ты этого даже не видишь. Ты не знаешь, на каком этапе они уходят. Ты не знаешь, сколько на самом деле стоит клиент, а не просто заявка.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
              className="font-body text-xl leading-[1.8] text-text-muted md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-2xl border border-white/[0.04] bg-surface p-8 md:p-12"
        >
          <p className="mb-8 font-display text-xs font-500 uppercase tracking-[0.2em] text-text-muted">
            Куда уходят заявки
          </p>
          <div className="space-y-3">
            {stages.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className={`w-12 shrink-0 text-right font-display text-2xl font-800 ${
                  i === stages.length - 1 ? "text-lime" : "text-text"
                }`}>
                  {s.count}
                </span>
                <div className="relative h-10 flex-1 overflow-hidden rounded-lg bg-white/[0.02]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                    className={`absolute inset-y-0 left-0 rounded-lg ${
                      i === stages.length - 1 ? "bg-lime/15" : "bg-white/[0.04]"
                    }`}
                  />
                  <span className="relative flex h-full items-center px-4 font-display text-sm font-400 text-text-muted">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 border-t border-white/[0.04] pt-6 text-center font-body text-lg text-text-muted">
            Остальные 97 — не плохие заявки.
            <br />
            <span className="text-text">Им просто никто нормально не ответил.</span>
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer rounded-full border border-lime/20 px-8 py-4 font-display text-sm font-500 text-lime transition-all hover:bg-lime/5 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]"
          >
            Разобраться
          </button>
        </div>
      </div>

      <div className="divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
