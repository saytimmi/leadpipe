"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const dreamLines = [
  "Ты просыпаешься. Открываешь телефон.",
  "Все 47 сообщений уже обработаны.",
  "Каждому ответили за 3 секунды.",
  "Спросили имя. Узнали, что нужно. Предложили время.",
  "Кто замолчал — ему мягко напомнили. По-человечески.",
  "К утру у тебя не 47 непрочитанных —",
];

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?", time: "23:14" },
  { from: "bot", text: "Добрый вечер! Консультация — 3 000 ₽. Подскажите, как вас зовут?", time: "23:14" },
  { from: "client", text: "Анна", time: "23:15" },
  { from: "bot", text: "Анна, расскажите, что вас интересует? Так я подберу лучшего специалиста.", time: "23:15" },
  { from: "client", text: "Хочу разобраться с налогами для ИП", time: "23:16" },
  { from: "bot", text: "Поняла! Когда удобно — завтра в 14:00 или 16:00?", time: "23:16" },
  { from: "client", text: "В 14 давайте", time: "23:17" },
  { from: "bot", text: "Записала! Ссылку на встречу пришлю за час. Хорошего вечера, Анна!", time: "23:17" },
];

export default function DreamSection() {
  return (
    <section id="dream" className="noise-overlay relative overflow-hidden px-6 py-32 md:py-40">
      {/* Background glow */}
      <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-neon/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-neon">
            03 — А теперь представь
          </span>
          <h2 className="mt-5 font-display text-4xl font-800 tracking-tight text-text md:text-6xl lg:text-7xl">
            Другой
            <br />
            <span className="text-gradient">понедельник</span>
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: Dream narrative */}
          <div className="space-y-6">
            {dreamLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="font-body text-lg leading-[1.9] text-text-secondary md:text-xl"
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-display text-2xl font-700 text-neon md:text-3xl"
            >
              а 12 готовых клиентов.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-4 font-body text-lg text-text-secondary"
            >
              С именем, запросом и удобным временем.
              <br />
              И так — каждый день. 24/7. Без «забыл ответить».
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="pt-4"
            >
              <MagneticButton text="Хочу так же" targetId="form" />
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone glow */}
              <div className="absolute -inset-4 rounded-[3rem] bg-accent/10 blur-2xl" />

              <div className="relative w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface shadow-2xl shadow-black/50">
                {/* Phone notch area */}
                <div className="flex items-center justify-center bg-surface pt-3 pb-1">
                  <div className="h-5 w-24 rounded-full bg-black" />
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-white/[0.06] bg-card px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
                    <span className="font-display text-xs font-700 text-accent">LP</span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-600 text-text">LeadPipe</p>
                    <p className="flex items-center gap-1.5 font-body text-xs text-neon">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                      онлайн
                    </p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-2 bg-bg p-3" style={{ minHeight: "360px" }}>
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.15 }}
                      className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`relative max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          msg.from === "client"
                            ? "bg-accent/15 text-text"
                            : "bg-card text-text-secondary"
                        }`}
                      >
                        {msg.text}
                        <span className="ml-2 text-[10px] text-text-dim">{msg.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Phone bottom bar */}
                <div className="flex items-center justify-center bg-bg py-2">
                  <div className="h-1 w-28 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
