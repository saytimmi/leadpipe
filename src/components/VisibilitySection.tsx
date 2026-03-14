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
  { label: "Потрачено на рекламу", value: 85000, suffix: " \u20BD", accent: false },
  { label: "Написали", value: 120, suffix: "", accent: false },
  { label: "Реально заинтересованы", value: 45, suffix: "", accent: true },
  { label: "Стали клиентами", value: 18, suffix: "", accent: true },
  { label: "Цена заявки", value: 708, suffix: " \u20BD", accent: false },
  { label: "Цена клиента", value: 4722, suffix: " \u20BD", accent: true },
];

export default function VisibilitySection() {
  return (
    <section
      id="visibility"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-light/0 via-accent/[0.02] to-light/0" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-600">
            Решение
          </span>
          <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-dark md:text-6xl">
            И ты наконец видишь,
            <br />
            <span className="text-accent">что происходит</span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="dashboard-glow mt-16 overflow-hidden rounded-2xl border border-gray-200/80 bg-white"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 rounded-md bg-gray-200/60 px-3 py-1 text-center text-xs text-muted">
              app.leadpipe.ru
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark">Твой бизнес</h3>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                Обновлено только что
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl p-4 text-center ${
                    m.accent ? "bg-accent/5 ring-1 ring-accent/10" : "bg-gray-50"
                  }`}
                >
                  <div className={`text-2xl font-bold md:text-3xl ${m.accent ? "text-accent" : "text-dark"}`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1.5 text-xs text-muted">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Mini chart placeholder */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="mb-2 text-xs font-medium text-muted">Где отваливаются</div>
              <div className="flex items-end gap-1.5">
                {[85, 60, 45, 30, 18, 12].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    className={`w-full max-w-[40px] rounded-t-md ${i < 3 ? "bg-accent/30" : "bg-red-200"}`}
                    style={{ minHeight: 4, maxHeight: `${h}px` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted">
                <span>Написали</span>
                <span>Клиенты</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
