"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useFormModal } from "./FormModal";

// WhatsApp-style conversation
type ChatItem =
  | { type: "message"; from: "client" | "bot"; text: string; time: string }
  | { type: "date"; label: string };

const chatMessages: ChatItem[] = [
  { type: "date", label: "14 МАРТА" },
  { type: "message", from: "client", text: "здрасте, хочу на чистку зубов записаться", time: "21:32" },
  { type: "message", from: "bot", text: "Добрый вечер! Отлично что написали 😊 Как вас зовут?", time: "21:32" },
  { type: "message", from: "client", text: "Айгерим", time: "21:33" },
  { type: "message", from: "bot", text: "Айгерим, приятно! У нас комплексная чистка — 12 000 ₸, ультразвук + полировка + фторирование. Займёт минут 40", time: "21:33" },
  { type: "message", from: "bot", text: "Вас будет вести доктор Алия Сериковна — она 7 месяцев проходила обучение в Финляндии именно по профгигиене. Очень аккуратная, пациенты её любят 🙂", time: "21:33" },
  { type: "message", from: "client", text: "ого круто", time: "21:34" },
  { type: "message", from: "bot", text: "Когда удобно? Могу предложить завтра 15:00 или субботу 11:00", time: "21:34" },
  { type: "date", label: "16 МАРТА" },
  { type: "message", from: "bot", text: "Айгерим, привет! Вы ещё думаете насчёт чистки? На субботу осталось одно окошко у Алии Сериковны — придержать для вас? 🙂", time: "14:20" },
  { type: "message", from: "client", text: "ой да, закрутилась просто. давайте на субботу!", time: "18:47" },
  { type: "message", from: "bot", text: "Записала! Суббота, 11:00, доктор Алия Сериковна 📍 ул. Абая 52, 2 этаж. За 2 часа напомню. Будут вопросы — пишите сюда!", time: "18:47" },
  { type: "message", from: "client", text: "спасибо большое 🙏", time: "18:48" },
];

/* WhatsApp date pill */
function WADateSeparator({ label, delay }: { label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay * 1000); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="flex justify-center py-2" style={{ minHeight: "28px" }}>
      {visible && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-md px-3 py-1" style={{ background: "#1A2C34" }}>
          <span className="text-[10px] font-500 tracking-wide" style={{ color: "#8696A0", fontFamily: "system-ui" }}>{label}</span>
        </motion.div>
      )}
    </div>
  );
}

/* WhatsApp message bubble */
function WAMessage({ msg, delay }: { msg: Extract<ChatItem, { type: "message" }>; delay: number }) {
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
  const bubbleBg = isBot ? "#202C33" : "#005C4B";

  return (
    <div ref={ref} className={`flex ${isBot ? "justify-start" : "justify-end"}`} style={{ minHeight: "24px" }}>
      {phase === "typing" && (
        <div className="rounded-lg px-3 py-2" style={{ background: bubbleBg }}>
          <div className="flex gap-1">
            {[0, 1, 2].map(d => (
              <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.1 }}
                className="h-1.5 w-1.5 rounded-full" style={{ background: "#8696A0" }} />
            ))}
          </div>
        </div>
      )}
      {phase === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.65, 0.05, 0, 1] }}
          className={`relative max-w-[82%] px-2.5 py-1.5 ${isBot ? "rounded-tr-lg rounded-br-lg rounded-bl-lg" : "rounded-tl-lg rounded-bl-lg rounded-br-lg"}`}
          style={{ background: bubbleBg }}>
          <p className="text-[13px] leading-[1.45]" style={{ color: "#E9EDEF", fontFamily: "system-ui" }}>
            {msg.text}
          </p>
          <div className={`mt-0.5 flex items-center gap-1 ${isBot ? "justify-end" : "justify-end"}`}>
            <span className="text-[10px]" style={{ color: "#8696A0" }}>{msg.time}</span>
            {!isBot && (
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
                <path d="M1.5 4.5L4.5 7.5L10.5 1.5" stroke="#53BDEB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 4.5L8.5 7.5L14.5 1.5" stroke="#53BDEB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
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
        <div className="grid items-start gap-12 md:gap-16 lg:grid-cols-[1fr_320px] lg:gap-16">
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
                className="cursor-pointer rounded-full bg-lime px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_30px_rgba(204,255,0,0.2)] md:px-8 md:py-4">
                Хочу так же
              </button>
            </motion.div>
          </div>

          {/* iPhone with WhatsApp — real iPhone 15 proportions */}
          <motion.div style={{ y: phoneY }} className="flex flex-col items-center overflow-hidden lg:sticky lg:top-12">
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
              {/* Subtle glow */}
              <div className="absolute -inset-8 rounded-[3.5rem] bg-lime/[0.03] blur-3xl" />

              {/* iPhone frame — aspect ratio 9:19.5 like real iPhone */}
              <div className="relative flex flex-col overflow-hidden rounded-[2.2rem] border-[2px] border-white/[0.08] shadow-2xl shadow-black/60"
                style={{ background: "#111B21", aspectRatio: "9/19.5" }}>

                {/* iOS Status bar */}
                <div className="flex items-center justify-between px-7 pt-3 pb-0" style={{ background: "#1F2C34" }}>
                  <span className="text-[12px] font-600" style={{ color: "#E9EDEF", fontFamily: "system-ui" }}>9:41</span>
                  <div className="h-[24px] w-[80px] rounded-full" style={{ background: "#111B21" }} />
                  <div className="flex items-center gap-1">
                    {/* Signal */}
                    <div className="flex items-end gap-[1.5px]">
                      {[5, 7, 9, 11].map((h, i) => (
                        <div key={i} className="w-[3px] rounded-sm" style={{ height: h, background: "#E9EDEF" }} />
                      ))}
                    </div>
                    {/* WiFi */}
                    <svg width="12" height="10" viewBox="0 0 12 10" className="ml-1">
                      <path d="M6 9.5a0.8 0.8 0 100-1.6 0.8 0.8 0 000 1.6z" fill="#E9EDEF"/>
                      <path d="M3.5 7a3.5 3.5 0 015 0" stroke="#E9EDEF" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                      <path d="M1.5 5a6 6 0 019 0" stroke="#E9EDEF" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                    </svg>
                    {/* Battery */}
                    <div className="ml-1 flex items-center">
                      <div className="h-[10px] w-[20px] rounded-[2px] border border-[#E9EDEF]/60 p-[1.5px]">
                        <div className="h-full w-[75%] rounded-[1px]" style={{ background: "#E9EDEF" }} />
                      </div>
                      <div className="h-[4px] w-[1.5px] rounded-r-sm" style={{ background: "#E9EDEF", opacity: 0.4 }} />
                    </div>
                  </div>
                </div>

                {/* WhatsApp header */}
                <div className="flex items-center gap-2.5 px-3 py-2" style={{ background: "#1F2C34" }}>
                  {/* Back arrow */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 15L7 10L12 5" stroke="#00A884" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Avatar */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#00A884" }}>
                    <span className="text-[11px] font-700" style={{ color: "#111B21" }}>LP</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-500" style={{ color: "#E9EDEF", fontFamily: "system-ui" }}>LeadPipe</p>
                    <p className="text-[11px]" style={{ color: "#00A884", fontFamily: "system-ui" }}>в сети</p>
                  </div>
                  {/* WhatsApp icons */}
                  <div className="flex items-center gap-4">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9.5V4.5C3 3.4 3.9 2.5 5 2.5H13C14.1 2.5 15 3.4 15 4.5V10.5C15 11.6 14.1 12.5 13 12.5H10L7 15.5V12.5H5C3.9 12.5 3 11.6 3 10.5V9.5Z" stroke="#8696A0" strokeWidth="1.2"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="4" r="1" fill="#8696A0"/>
                      <circle cx="9" cy="9" r="1" fill="#8696A0"/>
                      <circle cx="9" cy="14" r="1" fill="#8696A0"/>
                    </svg>
                  </div>
                </div>

                {/* Chat area with WA wallpaper pattern */}
                <div className="relative flex-1 overflow-y-auto p-2.5"
                  style={{ background: "#0B141A" }}>
                  {/* Subtle wallpaper overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />

                  <div className="relative space-y-1">
                    {chatMessages.map((item, i) => {
                      const msgIndex = chatMessages.slice(0, i + 1).filter(m => m.type === "message").length;
                      const baseDelay = 0.2 + (msgIndex - 1) * 0.55;
                      if (item.type === "date") {
                        const dateDelay = i === 0 ? 0 : baseDelay;
                        return <WADateSeparator key={i} label={item.label} delay={dateDelay} />;
                      }
                      return <WAMessage key={i} msg={item} delay={baseDelay} />;
                    })}
                  </div>
                </div>

                {/* WhatsApp input bar */}
                <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ background: "#111B21" }}>
                  {/* Emoji button */}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
                    <circle cx="11" cy="11" r="8.5" stroke="#8696A0" strokeWidth="1.2"/>
                    <circle cx="8.5" cy="9.5" r="1" fill="#8696A0"/>
                    <circle cx="13.5" cy="9.5" r="1" fill="#8696A0"/>
                    <path d="M8 13.5C8.8 14.6 10 15 11 15C12 15 13.2 14.6 14 13.5" stroke="#8696A0" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                  {/* Input field */}
                  <div className="flex flex-1 items-center rounded-full px-3 py-2" style={{ background: "#1F2C34" }}>
                    <span className="text-[13px]" style={{ color: "#8696A0", fontFamily: "system-ui" }}>Сообщение</span>
                  </div>
                  {/* Attachment */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M14.5 10.5L9.5 15.5C7.8 17.2 5 17.2 3.3 15.5C1.6 13.8 1.6 11 3.3 9.3L10 2.6C11.1 1.5 12.9 1.5 14 2.6C15.1 3.7 15.1 5.5 14 6.6L7.3 13.3C6.7 13.9 5.8 13.9 5.2 13.3C4.6 12.7 4.6 11.8 5.2 11.2L10.5 5.9" stroke="#8696A0" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                  {/* Mic */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "#00A884" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5C7.2 1.5 6.5 2.2 6.5 3V8C6.5 8.8 7.2 9.5 8 9.5C8.8 9.5 9.5 8.8 9.5 8V3C9.5 2.2 8.8 1.5 8 1.5Z" fill="#111B21"/>
                      <path d="M4.5 7V8C4.5 9.9 6.1 11.5 8 11.5C9.9 11.5 11.5 9.9 11.5 8V7" stroke="#111B21" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M8 11.5V14" stroke="#111B21" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex items-center justify-center py-2" style={{ background: "#111B21" }}>
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
              className="mt-6 text-center font-body text-xs leading-relaxed text-text-muted/60"
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
