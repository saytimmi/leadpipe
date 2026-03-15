"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useFormModal } from "./FormModal";

// Realistic conversation — recommendation, silence, follow-up, booking
type ChatItem =
  | { type: "message"; from: "client" | "bot"; text: string; time: string }
  | { type: "date"; label: string };

const chatMessages: ChatItem[] = [
  { type: "date", label: "14 марта" },
  { type: "message", from: "client", text: "здрасте, хочу на чистку зубов записаться", time: "21:32" },
  { type: "message", from: "bot", text: "Добрый вечер! Отлично что написали 😊 Как вас зовут?", time: "21:32" },
  { type: "message", from: "client", text: "Айгерим", time: "21:33" },
  { type: "message", from: "bot", text: "Айгерим, приятно! У нас комплексная чистка — 12 000 ₸, ультразвук + полировка + фторирование. Займёт минут 40", time: "21:33" },
  { type: "message", from: "bot", text: "Вас будет вести доктор Алия Сериковна — она 7 месяцев проходила обучение в Финляндии именно по профгигиене. Очень аккуратная, пациенты её любят 🙂", time: "21:33" },
  { type: "message", from: "client", text: "ого круто", time: "21:34" },
  { type: "message", from: "bot", text: "Когда удобно? Могу предложить завтра 15:00 или субботу 11:00", time: "21:34" },
  // клиент замолчала
  { type: "date", label: "16 марта" },
  { type: "message", from: "bot", text: "Айгерим, привет! Вы ещё думаете насчёт чистки? На субботу осталось одно окошко у Алии Сериковны — придержать для вас? 🙂", time: "14:20" },
  { type: "message", from: "client", text: "ой да, закрутилась просто. давайте на субботу!", time: "18:47" },
  { type: "message", from: "bot", text: "Записала! Суббота, 11:00, доктор Алия Сериковна 📍 ул. Абая 52, 2 этаж. За 2 часа напомню. Будут вопросы — пишите сюда!", time: "18:47" },
  { type: "message", from: "client", text: "спасибо большое 🙏", time: "18:48" },
];

function ChatDateSeparator({ label, delay }: { label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setVisible(true), delay * 1000);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="flex justify-center py-1" style={{ minHeight: "20px" }}>
      {visible && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg bg-white/[0.05] px-3 py-0.5">
          <span className="font-body text-[10px] text-text-dim">{label}</span>
        </motion.div>
      )}
    </div>
  );
}

function TypingMessage({ msg, delay }: { msg: Extract<ChatItem, { type: "message" }>; delay: number }) {
  const [phase, setPhase] = useState<"hidden" | "typing" | "done">("hidden");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setPhase("typing"), delay * 1000);
        setTimeout(() => setPhase("done"), (delay + 0.4) * 1000);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const isBot = msg.from === "bot";

  return (
    <div ref={ref} className={`flex ${isBot ? "justify-start" : "justify-end"}`} style={{ minHeight: "24px" }}>
      {phase === "typing" && (
        <div className={`rounded-2xl px-3 py-2 ${isBot ? "bg-card" : "bg-lime/10"}`}>
          <div className="flex gap-1">
            {[0, 1, 2].map(d => (
              <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.1 }}
                className="h-1.5 w-1.5 rounded-full bg-text-muted" />
            ))}
          </div>
        </div>
      )}
      {phase === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.65, 0.05, 0, 1] }}
          className={`max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-[1.5] ${
            isBot ? "bg-card text-text-muted" : "bg-lime/10 text-text"
          }`}>
          {msg.text}
          <span className={`ml-2 text-[9px] ${isBot ? "text-text-dim" : "text-lime/40"}`}>{msg.time}</span>
        </motion.div>
      )}
    </div>
  );
}

const capabilities = [
  { title: "Полная картина", desc: "От рекламы до клиента. Не «лид по 2 200» — а реальная цена того, кто пришёл и заплатил.", color: "lime" },
  { title: "Эффективность кампаний", desc: "Какое объявление приносит клиентов, а какое жрёт бюджет. Данные для таргетолога.", color: "lime" },
  { title: "Мгновенная обработка", desc: "Ответ за 3 секунды. Ночью, в выходные. Бот спрашивает имя, боль, предлагает время.", color: "warm" },
  { title: "Квалификация по шагам", desc: "Имя → боль → презентация → встреча. Видно где уходят и почему.", color: "warm" },
  { title: "Дожим и закрытие", desc: "Замолчал? Напомнит. Не отвечает 3 дня? Закроет. Никаких мёртвых лидов.", color: "warm" },
  { title: "Горячий клиент → менеджеру", desc: "Не лид, а: Айгерим, чистка, первый раз, завтра 11:00. Осталось встретить.", color: "lime" },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const { open } = useFormModal();

  return (
    <section ref={ref} id="solution" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">04</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-6">
          {["Почему мы", "тебе полезны"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                  i === 1 ? "text-text-muted" : ""
                }`}>{word}</motion.p>
            </div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mb-16 max-w-2xl font-body text-sm leading-relaxed text-text-muted md:text-base">
          Полная система — от запуска рекламы до клиента. Бот обрабатывает, менеджер закрывает, ты видишь всю картину.
        </motion.p>

        {/* Capabilities + Phone side by side */}
        <div className="grid items-start gap-12 md:gap-16 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
              {capabilities.map((cap, i) => (
                <motion.div key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 md:p-5"
                >
                  <h4 className={`font-display text-[10px] font-700 uppercase tracking-wider md:text-xs ${
                    cap.color === "lime" ? "text-lime" : "text-warm"
                  }`}>{cap.title}</h4>
                  <p className="mt-2 font-body text-[11px] leading-relaxed text-text-muted md:text-xs">{cap.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8">
              <button onClick={open}
                className="cursor-pointer rounded-full bg-lime px-6 py-3 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_30px_rgba(204,255,0,0.2)] md:px-8 md:py-4 md:text-xs">
                Хочу так же
              </button>
            </motion.div>
          </div>

          {/* Phone — realistic size, sticky */}
          <motion.div style={{ y: phoneY }} className="flex flex-col items-center overflow-hidden lg:sticky lg:top-28">
            <div className="relative w-[300px] sm:w-[340px] md:w-[360px]">
              {/* Subtle glow */}
              <div className="absolute -inset-8 rounded-[3.5rem] bg-lime/[0.03] blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border-[2px] border-white/[0.08] bg-surface shadow-2xl shadow-black/60">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-surface px-6 pt-3 pb-1">
                  <span className="font-body text-[11px] font-600 text-text-muted">9:41</span>
                  <div className="h-[22px] w-[80px] rounded-full bg-bg" />
                  <div className="flex items-center gap-1">
                    <div className="flex gap-[2px]">{[1,2,3,4].map(i => <div key={i} className="h-[10px] w-[3px] rounded-sm bg-text-muted" style={{height: `${6+i*2}px`}} />)}</div>
                  </div>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-2.5 border-b border-white/[0.04] bg-card px-4 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/10">
                    <span className="font-display text-[8px] font-700 text-lime">LP</span>
                  </div>
                  <div>
                    <p className="font-display text-[12px] font-600">LeadPipe</p>
                    <p className="flex items-center gap-1 text-[10px] text-lime">
                      <span className="h-1 w-1 rounded-full bg-lime" />онлайн
                    </p>
                  </div>
                </div>

                {/* Chat */}
                <div className="space-y-1.5 overflow-y-auto bg-bg p-3" style={{ height: "420px" }}>
                  {chatMessages.map((item, i) => {
                    const msgIndex = chatMessages.slice(0, i + 1).filter(m => m.type === "message").length;
                    const baseDelay = 0.2 + (msgIndex - 1) * 0.55;
                    if (item.type === "date") {
                      const dateDelay = i === 0 ? 0 : baseDelay;
                      return <ChatDateSeparator key={i} label={item.label} delay={dateDelay} />;
                    }
                    return <TypingMessage key={i} msg={item} delay={baseDelay} />;
                  })}
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 border-t border-white/[0.04] bg-card px-3 py-2.5">
                  <div className="flex-1 rounded-full bg-white/[0.03] px-3 py-1.5 text-[11px] text-text-dim">Сообщение...</div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lime/20">
                    <span className="text-[10px] text-lime">→</span>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex items-center justify-center bg-card py-2">
                  <div className="h-1 w-28 rounded-full bg-white/10" />
                </div>
              </div>
            </div>

            {/* Caption below phone */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-6 text-center font-body text-xs leading-relaxed text-text-dim"
            >
              Клиент замолчал. Бот дожал. Встреча назначена.
              <br />
              <span className="text-text-muted">Без менеджера. Без потерянных лидов.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
