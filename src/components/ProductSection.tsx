"use client";

import { motion } from "framer-motion";
import CountUpNumber from "./CountUpNumber";

const metrics = [
  { label: "Потрачено", value: 150000, suffix: " ₽", highlight: false },
  { label: "Написали", value: 120, suffix: "", highlight: false },
  { label: "Заинтересованы", value: 67, suffix: "", highlight: true },
  { label: "Клиенты", value: 34, suffix: "", highlight: true },
  { label: "Цена заявки", value: 1250, suffix: " ₽", highlight: false },
  { label: "Цена клиента", value: 4412, suffix: " ₽", highlight: true },
];

const features = [
  {
    icon: "⚡",
    title: "Ответ за 3 секунды",
    description: "Каждому, кто написал. Днём, ночью, в праздники. Без перерывов и выходных.",
    accent: "accent",
  },
  {
    icon: "🎯",
    title: "Ведёт до конца",
    description: "Спрашивает имя, задачу, удобное время. Если замолчал — мягко напомнит.",
    accent: "neon",
  },
  {
    icon: "📋",
    title: "Готовый клиент",
    description: "Менеджер получает не строчку в таблице, а человека с именем, запросом и временем.",
    accent: "warm",
  },
];

const stats = [
  { value: "×3", label: "конверсия" },
  { value: "3 сек", label: "время ответа" },
  { value: "24/7", label: "без выходных" },
  { value: "0", label: "потерянных" },
];

export default function ProductSection() {
  return (
    <section id="product" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-accent">
            04 — Это LeadPipe
          </span>
          <h2 className="mt-5 font-display text-4xl font-800 tracking-tight text-text md:text-6xl lg:text-7xl">
            Что внутри
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard card - large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card glass-card-hover rounded-3xl p-6 md:col-span-2 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-display text-xs font-500 uppercase tracking-widest text-text-dim">Дашборд</p>
                <h3 className="mt-1 font-display text-xl font-700 text-text">
                  Видишь всё в реальном времени
                </h3>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-neon/10 px-3 py-1 font-display text-xs font-500 text-neon">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl p-4 ${
                    m.highlight
                      ? "border border-accent/20 bg-accent/5"
                      : "bg-white/[0.02]"
                  }`}
                >
                  <div className={`font-display text-2xl font-800 md:text-3xl ${
                    m.highlight ? "text-accent" : "text-text"
                  }`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 font-display text-xs font-400 text-text-dim">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="mt-5 rounded-xl bg-white/[0.02] p-5">
              <div className="mb-3 font-display text-xs font-400 text-text-dim">
                Воронка конверсии
              </div>
              <div className="flex items-end gap-1.5" style={{ height: "60px" }}>
                {[95, 72, 55, 42, 34, 28, 22, 18].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                    className={`flex-1 rounded-t ${
                      i < 4 ? "bg-accent/30" : "bg-neon/30"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-display text-[10px] text-text-dim">
                <span>Написали</span>
                <span>Клиенты</span>
              </div>
            </div>
          </motion.div>

          {/* Feature cards */}
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="glass-card glass-card-hover flex flex-col rounded-3xl p-6 md:p-8"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                feature.accent === "accent"
                  ? "bg-accent/10"
                  : feature.accent === "neon"
                    ? "bg-neon/10"
                    : "bg-warm/10"
              }`}>
                {feature.icon}
              </div>
              <h3 className="font-display text-lg font-700 text-text">{feature.title}</h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="font-display text-3xl font-800 text-gradient md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 font-display text-xs font-400 text-text-dim">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="section-divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
