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
  { from: "client", text: "Здравствуйте, сколько стоит консультация?" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?" },
  { from: "client", text: "Хочу разобраться с налогами для ИП" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?" },
  { from: "client", text: "В 14 давайте" },
  { from: "bot", text: "Отлично, записала! Ссылку на встречу отправлю за час." },
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="flex min-h-screen flex-col items-center justify-center bg-light px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Что мы делаем
        </h2>
        <AnimatedText paragraphs={paragraphs} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
        >
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === "client"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-dark"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
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
