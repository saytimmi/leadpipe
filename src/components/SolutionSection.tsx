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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-light px-6 py-24"
    >
      <div className="absolute inset-0 dots-pattern opacity-20" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Как это работает
          </span>
          <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-dark md:text-6xl">
            Что мы делаем
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        {/* Phone mockup with chat */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border-[3px] border-gray-800 bg-gray-800 shadow-2xl">
            {/* Phone top bar */}
            <div className="flex items-center justify-center bg-gray-800 py-2">
              <div className="h-5 w-24 rounded-full bg-gray-900" />
            </div>

            {/* Chat header */}
            <div className="flex items-center gap-3 bg-white px-4 py-3 border-b border-gray-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                <span className="text-xs font-bold text-white">LP</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">LeadPipe</p>
                <p className="text-xs text-green-500">онлайн</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="space-y-2 bg-[#ECE5DD] p-4" style={{ minHeight: "380px" }}>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                  className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-[80%] rounded-xl px-3 py-2 text-sm chat-shadow ${
                      msg.from === "client"
                        ? "bg-[#DCF8C6] text-dark"
                        : "bg-white text-dark"
                    }`}
                  >
                    {msg.text}
                    <span className="ml-2 text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
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
