"use client";

import { motion } from "framer-motion";
import CountUpNumber from "./CountUpNumber";

const metrics = [
  { label: "Потрачено", value: 85000, suffix: " ₽", accent: false },
  { label: "Написали", value: 120, suffix: "", accent: false },
  { label: "Заинтересованы", value: 45, suffix: "", accent: true },
  { label: "Клиенты", value: 18, suffix: "", accent: true },
  { label: "Цена заявки", value: 708, suffix: " ₽", accent: false },
  { label: "Цена клиента", value: 4722, suffix: " ₽", accent: true },
];

export default function VisibilitySection() {
  return (
    <section id="visibility" className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-lime">03</span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight md:text-6xl lg:text-7xl">
            И ты наконец{" "}
            <span className="text-lime">видишь всё</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {[
            "Ты открываешь одну страницу — и там всё.",
            "Сколько денег ушло на рекламу. Сколько людей по ней кликнули. Сколько из них написали. Какая реклама привела нормальных клиентов, а какая просто съела бюджет.",
            "Дальше видишь, что было в переписке: сколько человек назвали имя, сколько рассказали что нужно, сколько дошли до записи. И где именно люди перестают отвечать.",
            "Это не табличка в Excel и не отчёт от маркетолога. Это живая картина твоего бизнеса — обновляется сама, без твоего участия.",
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

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.65, 0.05, 0, 1] }}
          className="mt-20 overflow-hidden rounded-2xl border border-white/[0.04] bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.04] px-5 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="ml-4 flex-1 rounded-md bg-white/[0.03] px-4 py-1 text-center font-display text-xs text-text-dim">
              app.leadpipe.ru
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-base font-700">Твой бизнес</h3>
              <span className="flex items-center gap-1.5 font-display text-xs text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                Обновлено
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className={`rounded-xl p-4 ${m.accent ? "bg-lime/5 ring-1 ring-lime/10" : "bg-white/[0.02]"}`}>
                  <div className={`font-display text-2xl font-800 ${m.accent ? "text-lime" : "text-text"}`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 font-display text-xs text-text-dim">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white/[0.02] p-5">
              <div className="mb-3 font-display text-xs text-text-dim">Где отваливаются</div>
              <div className="flex items-end gap-1.5" style={{ height: "60px" }}>
                {[90, 65, 48, 30, 18, 8].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                    className={`flex-1 rounded-t ${i > 3 ? "bg-warm/30" : "bg-lime/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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
