"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import IphoneFrame from "./IphoneFrame";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// WhatsApp-style conversation
type ChatItem =
  | { type: "message"; from: "client" | "bot"; text: string; time: string }
  | { type: "date"; label: string };

const dentalMessages: ChatItem[] = [
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

const repairMessages: ChatItem[] = [
  { type: "date", label: "14 МАРТА" },
  { type: "message", from: "client", text: "здравствуйте, сколько стоит ремонт кухни?", time: "21:47" },
  { type: "message", from: "bot", text: "Добрый вечер! Подскажите, какой у вас метраж кухни примерно?", time: "21:47" },
  { type: "message", from: "client", text: "12 квадратов", time: "21:48" },
  { type: "message", from: "bot", text: "Отлично. А что хотите — освежить стены и потолок, или полностью: пол, плитка, мебель под ключ?", time: "21:48" },
  { type: "message", from: "client", text: "полностью хочу, надоело уже", time: "21:49" },
  { type: "message", from: "bot", text: "Понимаю) Полный ремонт кухни 12м² у нас от 850 000 ₸ — с материалами и работой. Делаем за 2-3 недели. Когда удобно чтобы замерщик приехал? Могу предложить завтра после 14:00 или субботу утром.", time: "21:49" },
  { type: "date", label: "16 МАРТА" },
  { type: "message", from: "bot", text: "Здравствуйте! Вы ещё думаете насчёт ремонта кухни? На эту неделю есть свободная бригада — если записаться на замер сейчас, можем начать уже через 5 дней 🙂", time: "10:15" },
  { type: "message", from: "client", text: "да давайте на субботу замерщика", time: "10:22" },
  { type: "message", from: "bot", text: "Записала! Суббота, 10:00. Замерщик Ерлан приедет, посмотрит кухню и посчитает точную стоимость — бесплатно. За 2 часа напомню!", time: "10:22" },
];

const fitnessMessages: ChatItem[] = [
  { type: "date", label: "14 МАРТА" },
  { type: "message", from: "client", text: "привет, сколько стоит абонемент?", time: "22:31" },
  { type: "message", from: "bot", text: "Привет! У нас два варианта — безлимит за 35 000 ₸/мес и утренний (до 14:00) за 25 000. Вы раньше занимались или хотите начать?", time: "22:31" },
  { type: "message", from: "client", text: "хочу начать, но не уверена", time: "22:33" },
  { type: "message", from: "bot", text: "Тогда приходите на пробную тренировку — бесплатно, познакомитесь с тренером и залом. Если понравится — запишетесь. Без давления 🙂 Когда удобно — завтра вечером или в субботу утром?", time: "22:33" },
  { type: "message", from: "client", text: "а в субботу во сколько?", time: "22:35" },
  { type: "message", from: "bot", text: "В субботу групповая HIIT в 10:00 — отличный вариант для старта, тренер Серик, очень внимательный к новичкам. Или персональная в 11:30.", time: "22:35" },
  { type: "message", from: "client", text: "давайте на групповую", time: "22:36" },
  { type: "message", from: "bot", text: "Записала! Суббота, 10:00, групповая HIIT, тренер Серик. Адрес: ул. Жандосова 58, 2 этаж. Возьмите кроссовки и воду. За 2 часа напомню 🙂", time: "22:36" },
];

const nicheChats = {
  dental: dentalMessages,
  repair: repairMessages,
  fitness: fitnessMessages,
};

const nicheLabels = [
  { id: "dental" as const, label: "Стоматология" },
  { id: "repair" as const, label: "Ремонт квартир" },
  { id: "fitness" as const, label: "Фитнес" },
];

/* WhatsApp date pill */
function WADateSeparator({ label, delay }: { label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t = setTimeout(() => { if (!cancelled) setVisible(true); }, delay * 1000);
        obs.disconnect();
        return () => clearTimeout(t);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => { cancelled = true; obs.disconnect(); };
  }, [delay]);
  return (
    <div ref={ref} className="flex justify-center py-2" style={{ minHeight: "28px" }}>
      {visible && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease }}
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
    let cancelled = false;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        t1 = setTimeout(() => { if (!cancelled) setPhase("typing"); }, delay * 1000);
        t2 = setTimeout(() => { if (!cancelled) setPhase("done"); }, (delay + 1.0) * 1000);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); obs.disconnect(); };
  }, [delay]);

  const isBot = msg.from === "bot";
  const bubbleBg = isBot ? "#202C33" : "#005C4B";

  return (
    <div ref={ref} className={`flex ${isBot ? "justify-start" : "justify-end"}`} style={{ minHeight: "24px" }}>
      {phase === "typing" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg px-3 py-2" style={{ background: bubbleBg }}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map(d => (
              <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.1 }}
                className="h-1.5 w-1.5 rounded-full" style={{ background: "#8696A0" }} />
            ))}
          </div>
        </motion.div>
      )}
      {phase === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
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

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const [activeNiche, setActiveNiche] = useState<"dental" | "repair" | "fitness">("dental");

  return (
    <section ref={ref} id="solution" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">03</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-6">
          {["AI-агент который", "сопровождает клиента", "на каждом этапе"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p initial={{ y: "100%" }} whileInView={{ y: "0%" }} viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.1, ease }}
                className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                  i === 2 ? "text-text-muted" : ""
                }`}>{word}</motion.p>
            </div>
          ))}
        </div>

        <div className="mb-16 max-w-lg space-y-4 font-body text-sm leading-relaxed text-text-muted md:text-base">
          <p className="text-text">Представь что у тебя появился идеальный продавец в WhatsApp.</p>
          <p>Он отвечает за 3 секунды. Днём, ночью, в выходные — без пауз.</p>
          <p>Он не пишет «Здравствуйте, чем могу помочь?» и не просит «выберите из списка.»</p>
          <p className="text-text">Он разговаривает как живой человек:</p>
        </div>

        {/* Niche tabs + Phone side by side */}
        <div className="grid items-start gap-12 md:gap-16 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            {/* Niche tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {nicheLabels.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => setActiveNiche(niche.id)}
                  className={`rounded-full px-4 py-2 font-display text-xs font-600 transition-colors ${
                    activeNiche === niche.id
                      ? "bg-lime text-bg"
                      : "bg-white/[0.06] text-text-muted hover:text-text"
                  }`}
                >
                  {niche.label}
                </button>
              ))}
            </div>

            {/* "Живой менеджер" note */}
            <p className="mb-4 font-body text-xs text-text-muted md:text-sm">
              Если клиент задаёт вопрос, на который бот не может ответить — он сразу переключает на живого менеджера.
            </p>
          </div>

          {/* iPhone with WhatsApp */}
          <motion.div style={{ y: phoneY }} className="flex flex-col items-center overflow-hidden lg:sticky lg:top-24">
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
              {/* Subtle glow */}
              <div className="absolute -inset-8 rounded-[3.5rem] bg-lime/[0.03] blur-3xl" />

              <IphoneFrame>
                <div className="flex h-full w-full flex-col" style={{ background: "#111B21" }}>
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ background: "#1F2C34" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M12 15L7 10L12 5" stroke="#00A884" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#00A884" }}>
                      <span className="text-[9px] font-700" style={{ color: "#111B21" }}>LP</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-500" style={{ color: "#E9EDEF", fontFamily: "system-ui" }}>LeadPipe</p>
                      <p className="text-[9px]" style={{ color: "#00A884", fontFamily: "system-ui" }}>в сети</p>
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="relative flex-1 overflow-y-auto p-2" style={{ background: "#0B141A" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeNiche}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative space-y-1"
                      >
                        {nicheChats[activeNiche].map((item, i) => {
                          const msgIndex = nicheChats[activeNiche].slice(0, i + 1).filter(m => m.type === "message").length;
                          const baseDelay = 0.2 + (msgIndex - 1) * 0.7;
                          if (item.type === "date") {
                            const dateDelay = i === 0 ? 0 : baseDelay;
                            return <WADateSeparator key={i} label={item.label} delay={dateDelay} />;
                          }
                          return <WAMessage key={i} msg={item} delay={baseDelay} />;
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-1 px-2 py-1.5 shrink-0" style={{ background: "#111B21" }}>
                    <div className="flex flex-1 items-center rounded-full px-2.5 py-1.5" style={{ background: "#1F2C34" }}>
                      <span className="text-[11px]" style={{ color: "#8696A0", fontFamily: "system-ui" }}>Сообщение</span>
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "#00A884" }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5C7.2 1.5 6.5 2.2 6.5 3V8C6.5 8.8 7.2 9.5 8 9.5C8.8 9.5 9.5 8.8 9.5 8V3C9.5 2.2 8.8 1.5 8 1.5Z" fill="#111B21"/>
                        <path d="M4.5 7V8C4.5 9.9 6.1 11.5 8 11.5C9.9 11.5 11.5 9.9 11.5 8V7" stroke="#111B21" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M8 11.5V14" stroke="#111B21" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </IphoneFrame>
            </div>

            {/* Caption below phone */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, ease }}
              className="mt-6 text-center font-body text-xs leading-relaxed text-text-muted/60"
            >
              Клиент замолчал. Бот дожал. Встреча назначена.
              <br />
              <span className="text-text-muted">Без менеджера. Без потерянных лидов.</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Analytics bridge */}
        <div className="mt-20 md:mt-28 mx-auto max-w-2xl text-center space-y-4">
          <p className="font-display text-lg font-600 text-text md:text-xl">
            А теперь самое важное.
          </p>
          <p className="font-body text-base leading-relaxed text-text-muted md:text-lg">
            Этот продавец записывает каждый шаг. Кто написал, с какого объявления пришёл, на каком этапе разговора замолчал, кого дожал, кто записался и кто заплатил.
          </p>
          <p className="font-body text-base leading-relaxed text-text md:text-lg">
            Вот откуда берётся аналитика. Не из рекламного кабинета. Из реальных разговоров с реальными людьми.
          </p>
        </div>
      </div>
    </section>
  );
}
