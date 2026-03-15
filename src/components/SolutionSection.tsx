"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useFormModal } from "./FormModal";

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?" },
  { from: "client", text: "Хочу разобраться с налогами для ИП" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?" },
  { from: "client", text: "В 14 давайте" },
  { from: "bot", text: "Отлично, записала! Ссылку отправлю за час ✅" },
];

function TypingMessage({ msg, delay }: { msg: typeof chatMessages[0]; delay: number }) {
  const [phase, setPhase] = useState<"hidden" | "typing" | "done">("hidden");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setPhase("typing"), delay * 1000);
        setTimeout(() => setPhase("done"), (delay + 0.5) * 1000);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`} style={{ minHeight: "32px" }}>
      {phase === "typing" && (
        <div className={`rounded-2xl px-3.5 py-2.5 ${msg.from === "bot" ? "bg-card" : "bg-lime/10"}`}>
          <div className="flex gap-1">
            {[0, 1, 2].map(d => (
              <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.12 }}
                className="h-1.5 w-1.5 rounded-full bg-text-muted" />
            ))}
          </div>
        </div>
      )}
      {phase === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.65, 0.05, 0, 1] }}
          className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12px] leading-relaxed ${
            msg.from === "bot" ? "bg-card text-text-muted" : "bg-lime/10 text-text"
          }`}>
          {msg.text}
        </motion.div>
      )}
    </div>
  );
}

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const { open } = useFormModal();

  return (
    <section ref={ref} id="solution" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">04</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            {["Что мы", "делаем"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                    i === 1 ? "text-text-muted" : ""
                  }`}>
                  {word}
                </motion.p>
              </div>
            ))}

            <div className="mt-10 space-y-5">
              {[
                "Каждому, кто написал — сразу отвечают. Не через час, не завтра. Сразу.",
                "Спрашивают что нужно, когда удобно, какая ситуация. Если человек замолчал — ему напишут. Не навязчиво, по-человечески.",
                "Когда заявка готова — она уходит менеджеру. Конкретный человек: зовут так, нужно вот это, удобно тогда-то.",
              ].map((text, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="font-body text-sm leading-relaxed text-text-muted md:text-base">{text}</motion.p>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8">
              <button onClick={open}
                className="cursor-pointer rounded-full bg-lime px-6 py-3 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_30px_rgba(204,255,0,0.2)] md:px-8 md:py-4 md:text-xs">
                Разобраться
              </button>
            </motion.div>
          </div>

          {/* Phone */}
          <motion.div style={{ y: phoneY }} className="flex justify-center overflow-hidden lg:justify-end">
            <div className="relative w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-surface shadow-2xl shadow-black/60 sm:max-w-[320px]">
              <div className="flex items-center justify-center bg-surface pt-2 pb-1">
                <div className="h-4 w-20 rounded-full bg-bg" />
              </div>
              <div className="flex items-center gap-2.5 border-b border-white/[0.04] bg-card px-3.5 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lime/10">
                  <span className="font-display text-[8px] font-700 text-lime">LP</span>
                </div>
                <div>
                  <p className="font-display text-[11px] font-600">LeadPipe</p>
                  <p className="flex items-center gap-1 text-[9px] text-lime">
                    <span className="h-1 w-1 rounded-full bg-lime" />онлайн
                  </p>
                </div>
              </div>
              <div className="max-h-[300px] space-y-1.5 overflow-y-auto bg-bg p-2.5 sm:max-h-[340px]">
                {chatMessages.map((msg, i) => (
                  <TypingMessage key={i} msg={msg} delay={0.3 + i * 0.7} />
                ))}
              </div>
              <div className="flex items-center justify-center bg-bg py-1.5">
                <div className="h-1 w-24 rounded-full bg-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
