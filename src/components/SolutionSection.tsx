"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const features = [
  { icon: "⚡", title: "Мгновенный ответ", desc: "Через секунду после сообщения — клиент не ждёт" },
  { icon: "🧠", title: "Умная квалификация", desc: "Узнаёт имя, запрос, удобное время — сам" },
  { icon: "📬", title: "Готовая заявка", desc: "Менеджер получает человека, а не строчку в CRM" },
];

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит?" },
  { from: "bot", text: "Привет! Как тебя зовут?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, что именно интересует?" },
  { from: "client", text: "Консультация по налогам для ИП" },
  { from: "bot", text: "Удобно завтра в 14:00? ✅" },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative px-6 py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-purple/5 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 text-center">
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">04 — Решение</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mb-16 text-center font-display text-5xl font-800 text-white md:text-6xl">
          Автопилот<br /><span className="gradient-text">для продаж</span>
        </motion.h2>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:w-2/5 flex justify-center"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-accent/15 to-transparent blur-2xl" />
            <div className="relative w-full max-w-[280px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d0d14] shadow-2xl">
              <div className="flex justify-center bg-[#0d0d14] py-2">
                <div className="h-5 w-24 rounded-full bg-black" />
              </div>
              <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-accent/15 to-purple/15 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <span className="font-display text-xs font-700 text-white">LP</span>
                </div>
                <div>
                  <p className="font-display text-sm font-600 text-white">LeadPipe</p>
                  <p className="flex items-center gap-1 font-display text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> онлайн
                  </p>
                </div>
              </div>
              <div className="space-y-2 bg-[#0a0a12] p-3" style={{ minHeight: 260 }}>
                {chatMessages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.15 }}
                    className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 font-display text-[13px] leading-snug ${
                      msg.from === "client" ? "bg-accent/25 text-white" : "bg-white/8 text-white/80"
                    }`}>{msg.text}</div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }} className="flex gap-1 px-3 py-1">
                  <span className="typing-dot h-2 w-2 rounded-full bg-white/30" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-white/30" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-white/30" />
                </motion.div>
              </div>
              <div className="flex justify-center bg-[#0d0d14] py-2">
                <div className="h-1 w-24 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="space-y-4 lg:w-3/5">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                whileHover={{ x: 6 }}
                className="glass flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:border-white/15">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-display text-lg font-700 text-white">{f.title}</h3>
                  <p className="mt-1 font-display text-sm text-white/40">{f.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="pt-4">
              <CTAButton text="Хочу так же" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
