"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30–40%", label: "экономия рекламного бюджета" },
  { value: "x2.5", label: "рост конверсии в оплату" },
  { value: "3 сек", label: "время ответа на заявку" },
];

export default function SocialProof() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          className="font-body text-sm uppercase tracking-widest text-text-muted mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Результаты первых клиентов за 30 дней
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="font-display text-3xl font-700 text-lime md:text-4xl">
                {stat.value}
              </p>
              <p className="font-body text-sm text-text-muted md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-xl rounded-2xl border border-white/[0.06] bg-surface p-8 text-left md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="mb-4 font-body text-sm text-text-muted">Кейс</p>
          <p className="font-body text-base leading-relaxed text-text md:text-lg">
            Стоматология в Алматы, 3 кресла. Тратили $2 800/мес на рекламу — 8 клиентов с рекламы.
          </p>
          <p className="mt-3 font-body text-base leading-relaxed text-text md:text-lg">
            Через месяц с LeadPipe: тот же бюджет, <span className="font-600 text-lime">23 клиента</span>. Отключили 2 объявления которые сливали 40% бюджета.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
