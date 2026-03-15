"use client";

import { motion } from "framer-motion";

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?", time: "14:02" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?", time: "14:02" },
  { from: "client", text: "Анна", time: "14:03" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?", time: "14:03" },
  { from: "client", text: "Хочу разобраться с налогами для ИП", time: "14:04" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?", time: "14:04" },
  { from: "client", text: "В 14 давайте", time: "14:05" },
  { from: "bot", text: "Отлично, записала! Ссылку на встречу отправлю за час ✅", time: "14:05" },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-lime">04</span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight md:text-6xl lg:text-7xl">
            Что мы{" "}
            <span className="text-text-muted">делаем</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {[
            "Каждому, кто написал — сразу отвечают. Не через час, не завтра. Сразу.",
            "Спрашивают что нужно, когда удобно, какая ситуация. Если человек замолчал — ему напишут, уточнят. Не навязчиво, по-человечески.",
            "Когда заявка готова — она уходит менеджеру. Не «строчка в табличке», а конкретный человек: зовут так, нужно вот это, удобно тогда-то.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
              className="font-body text-xl leading-[1.8] text-text-muted md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.65, 0.05, 0, 1] }}
          className="mt-20 flex justify-center"
        >
          <div className="w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-surface shadow-2xl shadow-black/50">
            <div className="flex items-center justify-center bg-surface pt-3 pb-1">
              <div className="h-5 w-24 rounded-full bg-bg" />
            </div>

            <div className="flex items-center gap-3 border-b border-white/[0.04] bg-card px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime/10">
                <span className="font-display text-[10px] font-700 text-lime">LP</span>
              </div>
              <div>
                <p className="font-display text-sm font-600">LeadPipe</p>
                <p className="flex items-center gap-1.5 text-xs text-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />онлайн
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-bg p-3" style={{ minHeight: "340px" }}>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
                  className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.from === "client" ? "bg-lime/10 text-text" : "bg-card text-text-muted"
                  }`}>
                    {msg.text}
                    <span className="ml-2 text-[10px] text-text-dim">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center bg-bg py-2">
              <div className="h-1 w-28 rounded-full bg-white/5" />
            </div>
          </div>
        </motion.div>

        <div className="mt-14 text-center">
          <button
            onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer rounded-full border border-lime/20 px-8 py-4 font-display text-sm font-500 text-lime transition-all hover:bg-lime/5 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]"
          >
            Разобраться
          </button>
        </div>
      </div>

      <div className="divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
