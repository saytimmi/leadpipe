"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Каждому, кто написал — сразу отвечают. Не через час, не завтра. Сразу.",
  "Спрашивают что нужно, когда удобно, какая ситуация. Если человек замолчал — ему напишут, уточнят. Не навязчиво, по-человечески.",
  "Когда заявка готова — она уходит менеджеру. Не «строчка в табличке», а конкретный человек: зовут так, нужно вот это, удобно тогда-то.",
];

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?", time: "14:02" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?", time: "14:02" },
  { from: "client", text: "Анна", time: "14:03" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?", time: "14:03" },
  { from: "client", text: "Хочу разобраться с налогами для ИП", time: "14:04" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?", time: "14:04" },
  { from: "client", text: "В 14 давайте", time: "14:05" },
  { from: "bot", text: "Отлично, записала! Ссылку на встречу отправлю за час \u2705", time: "14:05" },
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 py-32"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            04 — Решение
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-dark md:text-7xl">
            Что мы
            <br />
            <span className="italic" style={{ fontFamily: "var(--font-body)" }}>
              делаем
            </span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex justify-center"
        >
          <div className="w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border-[6px] border-dark bg-dark shadow-2xl shadow-dark/30">
            {/* Phone notch */}
            <div className="flex items-center justify-center bg-dark py-2">
              <div className="h-6 w-28 rounded-full bg-dark" />
            </div>

            {/* Chat header */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <span className="font-display text-xs font-700 text-white">LP</span>
              </div>
              <div>
                <p className="font-display text-sm font-600 text-white">LeadPipe</p>
                <p className="font-display text-xs text-white/70">онлайн</p>
              </div>
            </div>

            {/* Chat */}
            <div
              className="space-y-2 bg-[#ECE5DD] p-3"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.12 }}
                  className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-[80%] rounded-lg px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                      msg.from === "client"
                        ? "bg-[#DCF8C6] text-dark"
                        : "bg-white text-dark"
                    }`}
                  >
                    {msg.text}
                    <span className="ml-2 text-[10px] text-dark/30">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Phone bottom bar */}
            <div className="flex items-center justify-center bg-dark py-2">
              <div className="h-1 w-32 rounded-full bg-white/30" />
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
