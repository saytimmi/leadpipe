"use client";

import { motion } from "framer-motion";
import { useFormModal } from "./FormModal";

const stages = [
  { label: "Написали", count: "100" },
  { label: "Получили ответ", count: "60" },
  { label: "Узнали что нужно", count: "30" },
  { label: "Дошли до конца", count: "10" },
  { label: "Стали клиентами", count: "3" },
];

export default function ProblemSection() {
  const { open } = useFormModal();

  return (
    <section id="problem" className="relative px-6 py-28 md:py-40 lg:px-10">
      {/* Marquee */}
      <div className="mb-24 overflow-hidden border-y border-white/[0.04] py-5 md:mb-32 md:py-6">
        <div className="marquee-track whitespace-nowrap">
          {[0, 1].map(j => (
            <span key={j} className="inline-block">
              {["Стоматология", "Автосервис", "Онлайн-школа", "Салон красоты", "Фитнес", "Юристы", "Ремонт", "Недвижимость"].map((biz, i) => (
                <span key={i} className="mx-4 font-display text-xl font-700 uppercase text-text-dim md:mx-8 md:text-4xl lg:text-5xl">
                  {biz}<span className="mx-4 text-lime md:mx-8">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">02</span>
              <div className="h-px w-12 bg-white/[0.04]" />
            </div>

            {["Вот", "в чём", "проблема"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                    i === 2 ? "text-text-muted" : ""
                  }`}
                >
                  {word}
                </motion.p>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 max-w-md font-body text-sm leading-relaxed text-text-muted md:text-base"
            >
              Заявки были нормальные. Люди реально интересовались. Просто им не ответили вовремя. Или ответили, но не довели. И ты этого даже не видишь.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button onClick={open}
                className="cursor-pointer rounded-full border border-lime/20 px-6 py-3 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-lime transition-all active:bg-lime/5 hover:bg-lime/5 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)] md:px-8 md:py-4 md:text-xs">
                Разобраться
              </button>
            </motion.div>
          </div>

          {/* Right — funnel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4 md:space-y-6">
              {stages.map((s, i) => {
                const isLast = i === stages.length - 1;
                return (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-baseline gap-4 md:gap-6"
                  >
                    <span className={`font-display font-900 tabular-nums ${
                      isLast ? "text-5xl text-lime sm:text-6xl md:text-7xl lg:text-9xl" : "text-3xl text-text-dim sm:text-4xl md:text-5xl lg:text-6xl"
                    }`}>
                      {s.count}
                    </span>
                    <span className={`font-body text-xs md:text-sm ${isLast ? "text-lime" : "text-text-dim"}`}>{s.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-10 border-t border-white/[0.04] pt-5 font-body text-xs text-text-muted md:text-sm">
              Остальные 97 — не плохие заявки.
              <br /><span className="text-text">Им просто никто нормально не ответил.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
