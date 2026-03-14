"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Каждому, кто написал — мгновенный ответ. Не через час, не завтра. Через секунду. Человек чувствует: тут его ждали.",
  "Система спрашивает, что нужно. Уточняет детали. Если человек замолчал — мягко напомнит. Не спамом, а по-человечески: «Анна, вы хотели записаться — ещё актуально?»",
  "Когда заявка готова — менеджер получает не строчку в CRM, а готового клиента: имя, запрос, удобное время. Осталось только позвонить.",
];

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?", time: "14:02" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?", time: "14:02" },
  { from: "client", text: "Анна", time: "14:03" },
  { from: "bot", text: "Анна, приятно познакомиться! Расскажите, что вас интересует?", time: "14:03" },
  { from: "client", text: "Хочу разобраться с налогами для ИП", time: "14:04" },
  { from: "bot", text: "Поняла. Когда удобно — завтра в 14:00 или 16:00?", time: "14:04" },
  { from: "client", text: "В 14 давайте", time: "14:05" },
  { from: "bot", text: "Отлично, Анна! Записала вас на завтра в 14:00. Ссылку пришлю за час \u2705", time: "14:05" },
];

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-3 py-2">
      <span className="typing-dot h-2 w-2 rounded-full bg-white/40" />
      <span className="typing-dot h-2 w-2 rounded-full bg-white/40" />
      <span className="typing-dot h-2 w-2 rounded-full bg-white/40" />
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#0a0a1a] to-dark" />

      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-purple/5 blur-[150px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            04 — Как это работает
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-white md:text-7xl">
            Каждый клиент —
            <br />
            <span className="gradient-text">на автопилоте</span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} light />

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex justify-center"
        >
          <div className="relative">
            {/* Phone glow */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-accent/20 via-purple/10 to-transparent blur-2xl" />

            <div className="relative w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-dark shadow-2xl shadow-accent/10">
              {/* Phone notch */}
              <div className="flex items-center justify-center bg-dark py-2">
                <div className="h-6 w-28 rounded-full bg-white/5" />
              </div>

              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-accent/20 to-purple/20 px-4 py-3 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <span className="font-display text-xs font-700 text-white">LP</span>
                </div>
                <div>
                  <p className="font-display text-sm font-600 text-white">LeadPipe</p>
                  <p className="flex items-center gap-1 font-display text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    онлайн
                  </p>
                </div>
              </div>

              {/* Chat */}
              <div className="space-y-2 bg-dark/50 p-3 dot-pattern" style={{ minHeight: "360px" }}>
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 }}
                    className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.from === "client"
                          ? "bg-accent/20 text-white"
                          : "glass text-white/80"
                      }`}
                    >
                      {msg.text}
                      <span className="ml-2 text-[10px] text-white/20">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-2xl">
                    <TypingIndicator />
                  </div>
                </motion.div>
              </div>

              {/* Phone bottom bar */}
              <div className="flex items-center justify-center bg-dark py-2">
                <div className="h-1 w-32 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <CTAButton text="Хочу так же" />
        </div>
      </div>
    </section>
  );
}
