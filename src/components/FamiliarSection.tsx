"use client";

import { motion } from "framer-motion";

const problems = [
  { icon: "⏰", title: "Отвечаешь через 3 часа", desc: "Клиент уже купил у конкурента" },
  { icon: "🌙", title: "Написали вечером", desc: "Утром уже всё забыли" },
  { icon: "👻", title: "Сказал «подумаю»", desc: "Никто не напомнил. Ушёл навсегда" },
  { icon: "📉", title: "150 000 ₽ на рекламу", desc: "В итоге — 4 клиента" },
];

export default function FamiliarSection() {
  return (
    <section id="familiar" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 text-center">
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-warm">01 — Узнаёшь?</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mb-16 text-center font-display text-5xl font-800 leading-tight text-white md:text-6xl">
          Деньги потрачены.<br />
          <span className="text-white/20">Клиенты — нет.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {problems.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:border-white/15"
            >
              <div className="mb-4 text-4xl">{p.icon}</div>
              <h3 className="mb-2 font-display text-xl font-700 text-white">{p.title}</h3>
              <p className="font-display text-base text-white/40">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
