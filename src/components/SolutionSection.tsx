"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useFormModal } from "./FormModal";

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?" },
  { from: "bot", text: "Сәлеметсіз бе! Кеңес — 15 000 ₸. Атыңыз кім?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, расскажите, что вас интересует? Так подберём лучшего специалиста." },
  { from: "client", text: "Хочу разобраться с налогами для ИП" },
  { from: "bot", text: "Поняла. Когда удобно — завтра в 14:00 или 16:00?" },
  { from: "client", text: "В 14 давайте" },
  { from: "bot", text: "Отлично! Ссылку на встречу пришлю за час. Хорошего вечера, Анна ✅" },
];

const capabilities = [
  { title: "Мгновенный ответ", desc: "Человек пишет в 23:14 — ему отвечают через 3 секунды. Не через час, не завтра. Сразу." },
  { title: "Квалификация по шагам", desc: "Спрашивает имя → узнаёт боль → презентует продукт → предлагает время. Каждый шаг — осмысленный." },
  { title: "Напоминания", desc: "Если человек замолчал на этапе «имя» — напишет через 2 часа. Мягко, по-человечески. Не спам." },
  { title: "Закрытие", desc: "Если не отвечает 3 дня — закрывает. Не висит мёртвым грузом в воронке." },
  { title: "Готовый клиент → менеджеру", desc: "Менеджер получает не строчку в табличке, а: Анна, налоги ИП, завтра 14:00." },
  { title: "Помощь таргетологу", desc: "Видно какая реклама даёт клиентов, а какая — пустые клики. Данные для оптимизации." },
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
    <div ref={ref} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`} style={{ minHeight: "28px" }}>
      {phase === "typing" && (
        <div className={`rounded-2xl px-3 py-2 ${msg.from === "bot" ? "bg-card" : "bg-lime/10"}`}>
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
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.65, 0.05, 0, 1] }}
          className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed md:text-[12px] ${
            msg.from === "bot" ? "bg-card text-text-muted" : "bg-lime/10 text-text"
          }`}>{msg.text}</motion.div>
      )}
    </div>
  );
}

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const { open } = useFormModal();

  return (
    <section ref={ref} id="solution" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">04</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        {/* Title */}
        <div className="mb-16">
          {["Что мы", "делаем"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                  i === 1 ? "text-text-muted" : ""
                }`}>{word}</motion.p>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-12 md:gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Left — capabilities grid */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
              {capabilities.map((cap, i) => (
                <motion.div key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 md:p-5"
                >
                  <h4 className="font-display text-xs font-700 uppercase tracking-wider text-lime">{cap.title}</h4>
                  <p className="mt-2 font-body text-xs leading-relaxed text-text-muted">{cap.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8">
              <button onClick={open}
                className="cursor-pointer rounded-full bg-lime px-6 py-3 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_30px_rgba(204,255,0,0.2)] md:px-8 md:py-4 md:text-xs">
                Разобраться
              </button>
            </motion.div>
          </div>

          {/* Right — phone */}
          <motion.div style={{ y: phoneY }} className="flex justify-center overflow-hidden lg:sticky lg:top-32">
            <div className="relative w-full max-w-[260px] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-surface shadow-2xl shadow-black/60 sm:max-w-[300px]">
              <div className="flex items-center justify-center bg-surface pt-2 pb-1">
                <div className="h-3.5 w-16 rounded-full bg-bg" />
              </div>
              <div className="flex items-center gap-2 border-b border-white/[0.04] bg-card px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lime/10">
                  <span className="font-display text-[7px] font-700 text-lime">LP</span>
                </div>
                <div>
                  <p className="font-display text-[10px] font-600">LeadPipe</p>
                  <p className="flex items-center gap-1 text-[8px] text-lime">
                    <span className="h-1 w-1 rounded-full bg-lime" />онлайн
                  </p>
                </div>
              </div>
              <div className="max-h-[280px] space-y-1 overflow-y-auto bg-bg p-2 sm:max-h-[320px]">
                {chatMessages.map((msg, i) => (
                  <TypingMessage key={i} msg={msg} delay={0.2 + i * 0.65} />
                ))}
              </div>
              <div className="flex items-center justify-center bg-bg py-1.5">
                <div className="h-0.5 w-20 rounded-full bg-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
