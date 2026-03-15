"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?" },
  { from: "client", text: "Хочу разобраться с налогами для ИП" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?" },
  { from: "client", text: "В 14 давайте" },
  { from: "bot", text: "Отлично, записала! Ссылку на встречу отправлю за час ✅" },
];

function TypingMessage({ msg, delay }: { msg: typeof chatMessages[0]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setTyping(true), delay * 1000);
        setTimeout(() => { setTyping(false); setVisible(true); }, (delay + 0.6) * 1000);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const isBot = msg.from === "bot";

  return (
    <div ref={ref} className={`flex ${isBot ? "justify-start" : "justify-end"}`} style={{ minHeight: "36px" }}>
      {typing && (
        <div className={`rounded-2xl px-4 py-3 ${isBot ? "bg-card" : "bg-lime/10"}`}>
          <div className="flex gap-1">
            {[0, 1, 2].map(d => (
              <motion.span key={d}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-text-muted"
              />
            ))}
          </div>
        </div>
      )}
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isBot ? "bg-card text-text-muted" : "bg-lime/10 text-text"
          }`}
        >
          {msg.text}
        </motion.div>
      )}
    </div>
  );
}

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [8, 0]);

  return (
    <section ref={ref} id="solution" className="px-6 py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">04</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            {["Что мы", "делаем"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-6xl font-800 uppercase leading-[0.95] tracking-tight md:text-8xl ${
                    i === 1 ? "text-text-muted" : ""
                  }`}
                >
                  {word}
                </motion.p>
              </div>
            ))}

            <div className="mt-12 space-y-6">
              {[
                "Каждому, кто написал — сразу отвечают. Не через час, не завтра. Сразу.",
                "Спрашивают что нужно, когда удобно, какая ситуация. Если человек замолчал — ему напишут, уточнят. Не навязчиво, по-человечески.",
                "Когда заявка готова — она уходит менеджеру. Не «строчка в табличке», а конкретный человек: зовут так, нужно вот это, удобно тогда-то.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="font-body text-base leading-relaxed text-text-muted"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <button
                onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
                className="cursor-pointer rounded-full bg-lime px-8 py-4 font-display text-xs font-700 uppercase tracking-[0.15em] text-bg transition-shadow hover:shadow-[0_0_40px_rgba(204,255,0,0.25)]"
              >
                Разобраться
              </button>
            </motion.div>
          </div>

          {/* Right — phone with parallax + tilt */}
          <motion.div style={{ y: phoneY, rotateZ: phoneRotate }} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-lime/[0.04] blur-3xl" />
              <div className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-surface shadow-2xl shadow-black/60">
                <div className="flex items-center justify-center bg-surface pt-2 pb-1">
                  <div className="h-4 w-20 rounded-full bg-bg" />
                </div>
                <div className="flex items-center gap-3 border-b border-white/[0.04] bg-card px-4 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/10">
                    <span className="font-display text-[9px] font-700 text-lime">LP</span>
                  </div>
                  <div>
                    <p className="font-display text-xs font-600">LeadPipe</p>
                    <p className="flex items-center gap-1 text-[10px] text-lime">
                      <span className="h-1 w-1 rounded-full bg-lime" />онлайн
                    </p>
                  </div>
                </div>
                <div className="space-y-2 bg-bg p-3" style={{ minHeight: "320px" }}>
                  {chatMessages.map((msg, i) => (
                    <TypingMessage key={i} msg={msg} delay={0.4 + i * 0.8} />
                  ))}
                </div>
                <div className="flex items-center justify-center bg-bg py-1.5">
                  <div className="h-1 w-24 rounded-full bg-white/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
