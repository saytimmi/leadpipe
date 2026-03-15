"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  { label: "Написали", count: "100" },
  { label: "Получили ответ", count: "60" },
  { label: "Узнали что нужно", count: "30" },
  { label: "Дошли до конца", count: "10" },
  { label: "Стали клиентами", count: "3" },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="problem" className="relative px-6 py-40 lg:px-10">
      {/* Marquee — бегущая строка как у Lando (partners section) */}
      <div className="mb-32 overflow-hidden border-y border-white/[0.04] py-6">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <span key={j} className="inline-block">
              {["Стоматология", "Автосервис", "Онлайн-школа", "Салон красоты", "Фитнес", "Юристы", "Ремонт", "Недвижимость", "Доставка", "Клиника"].map((biz, i) => (
                <span key={i} className="mx-8 font-display text-3xl font-700 uppercase text-text-dim md:text-5xl">
                  {biz}
                  <span className="mx-8 text-lime">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left — big statement */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">02</span>
              <div className="h-px w-16 bg-white/[0.04]" />
            </div>

            <div className="space-y-2">
              {["Вот", "в чём", "проблема"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                    className={`font-display text-6xl font-800 uppercase leading-[0.95] tracking-tight md:text-8xl ${
                      i === 2 ? "text-text-muted" : ""
                    }`}
                  >
                    {word}
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 max-w-md font-body text-base leading-relaxed text-text-muted"
            >
              Заявки были нормальные. Люди реально интересовались. Просто им не ответили вовремя. Или ответили, но не довели. И ты этого даже не видишь.
            </motion.p>
          </div>

          {/* Right — funnel with dramatic scale contrast */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {stages.map((s, i) => {
                const isLast = i === stages.length - 1;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-baseline gap-6"
                  >
                    <span className={`font-display font-900 tabular-nums ${
                      isLast ? "text-7xl text-lime md:text-9xl" : "text-4xl text-text-dim md:text-6xl"
                    }`}>
                      {s.count}
                    </span>
                    <span className={`font-body text-sm ${isLast ? "text-lime" : "text-text-dim"}`}>
                      {s.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 border-t border-white/[0.04] pt-6 font-body text-sm text-text-muted"
            >
              Остальные 97 — не плохие заявки.
              <br /><span className="text-text">Им просто никто нормально не ответил.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
