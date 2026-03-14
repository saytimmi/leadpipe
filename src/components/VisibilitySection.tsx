"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CountUpNumber from "./CountUpNumber";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Ты открываешь одну страницу — и там всё.",
  "Сколько денег ушло на рекламу. Сколько людей по ней кликнули. Сколько из них написали. Какая реклама привела нормальных клиентов, а какая просто съела бюджет.",
  "Дальше видишь, что было в переписке: сколько человек назвали имя, сколько рассказали что нужно, сколько дошли до записи. И где именно люди перестают отвечать.",
  "Это не табличка в Excel и не отчёт от маркетолога. Это живая картина твоего бизнеса — обновляется сама, без твоего участия.",
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
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            03 — Прозрачность
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-dark md:text-7xl">
            И ты наконец
            <br />
            <span className="text-accent">видишь всё</span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 overflow-hidden rounded-2xl border border-dark/10 bg-dark shadow-2xl shadow-dark/20"
        >
          {/* Window chrome - dark */}
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-white/20" />
            <div className="h-3 w-3 rounded-full bg-white/20" />
            <div className="h-3 w-3 rounded-full bg-white/20" />
            <div className="ml-4 flex-1 rounded-md bg-white/5 px-4 py-1 text-center font-display text-xs text-white/40">
              app.leadpipe.ru
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-display text-lg font-700 text-white">Твой бизнес</h3>
              <span className="rounded-full bg-green-500/20 px-3 py-1 font-display text-xs font-500 text-green-400">
                ● Обновлено
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl p-4 ${
                    m.highlight
                      ? "bg-accent/20 ring-1 ring-accent/30"
                      : "bg-white/5"
                  }`}
                >
                  <div className={`font-display text-2xl font-800 md:text-3xl ${
                    m.highlight ? "text-accent" : "text-white"
                  }`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 font-display text-xs font-500 text-white/50">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="mt-6 rounded-xl bg-white/5 p-5">
              <div className="mb-3 font-display text-xs font-500 text-white/40">
                Где отваливаются
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
                      i < 3 ? "bg-accent/40" : "bg-warm/50"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-display text-[10px] text-white/30">
                <span>Написали</span>
                <span>Клиенты</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
