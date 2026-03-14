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
  { label: "Потрачено на рекламу", value: 85000, suffix: " \u20BD" },
  { label: "Написали", value: 120, suffix: "" },
  { label: "Реально заинтересованы", value: 45, suffix: "" },
  { label: "Стали клиентами", value: 18, suffix: "" },
  { label: "Цена заявки", value: 708, suffix: " \u20BD" },
  { label: "Цена клиента", value: 4722, suffix: " \u20BD" },
];

export default function VisibilitySection() {
  return (
    <section
      id="visibility"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          И ты наконец видишь, что происходит
        </h2>
        <AnimatedText paragraphs={paragraphs} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-sm text-muted">LeadPipe — Твой бизнес</span>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-2xl font-bold text-dark md:text-3xl">
                  <CountUpNumber target={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
