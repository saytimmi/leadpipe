"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

// color: "lime" | "warm" | "dim" | "white" (default)
// big: true for emphasis lines
const lines: { text: string; color?: string; big?: boolean }[] = [
  { text: "Пятница. Вечер." },
  { text: "Таргетолог запустил рекламу.", color: "dim" },
  { text: "Бюджет — 237 000 ₸.", color: "lime" },
  { text: "" },
  { text: "Суббота, 23:14." },
  { text: "В WhatsApp бизнес-аккаунта прилетает:", color: "dim" },
  { text: "«Здравствуйте, сколько стоит?»", color: "lime" },
  { text: "" },
  { text: "Менеджер видит сообщение" },
  { text: "в понедельник утром.", color: "warm" },
  { text: "36 часов.", color: "warm", big: true },
  { text: "Человек давно в сторис конкурента.", color: "dim" },
  { text: "" },
  { text: "Воскресенье, 10:00." },
  { text: "«Хочу записаться на среду»", color: "lime" },
  { text: "Отдел продаж отвечает в понедельник.", color: "dim" },
  { text: "Человек забыл, куда хотел.", color: "warm" },
  { text: "" },
  { text: "Ещё одна заявка." },
  { text: "Менеджер ответил. Клиент спросил цену.", color: "dim" },
  { text: "Менеджер скинул прайс.", color: "dim" },
  { text: "«Подумаю»", color: "lime" },
  { text: "Менеджер не написал больше.", color: "warm" },
  { text: "Клиент — тоже.", color: "warm" },
  { text: "Навсегда.", color: "lime", big: true },
  { text: "" },
  { text: "Конец месяца." },
  { text: "Таргетолог скидывает отчёт:", color: "dim" },
  { text: "«107 лидов, цена лида 2 219 ₸»", color: "lime" },
  { text: "Ты смотришь в CRM.", color: "dim" },
  { text: "Клиентов?", color: "warm" },
  { text: "Восемь.", color: "lime", big: true },
  { text: "" },
  { text: "Таргетолог отработал нормально." },
  { text: "Реклама нормальная.", color: "dim" },
  { text: "Продукт нужный.", color: "dim" },
  { text: "Просто между «заявка» и «клиент» —" },
  { text: "чёрная дыра.", color: "warm", big: true },
  { text: "И никто не видит, что внутри.", color: "dim" },
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${lines.length * 85 + 1000}px` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            {lines.map((line, i) => {
              if (line.text === "") return <div key={i} className="h-3 md:h-5" />;
              const total = lines.length + 8;
              const start = Math.max(0, (i - 1) / total);
              const peak = (i + 0.5) / total;
              const end = Math.min(1, (i + 5) / total);
              return (
                <StoryLine
                  key={i}
                  line={line.text}
                  scrollYProgress={scrollYProgress}
                  start={start} peak={peak} end={end}
                  colorType={line.color || "white"}
                  big={line.big || false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const colorMap: Record<string, string> = {
  lime: "#CCFF00",
  warm: "#FF6B35",
  dim: "#888888",
  white: "#ffffff",
};

function StoryLine({ line, scrollYProgress, start, peak, end, colorType, big }: {
  line: string; scrollYProgress: MotionValue<number>;
  start: number; peak: number; end: number;
  colorType: string; big: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.04, 1, 0.08]);
  const y = useTransform(scrollYProgress, [start, peak], [6, 0]);
  const peakColor = colorMap[colorType] || "#ffffff";
  const color = useTransform(scrollYProgress, [start, peak, end], ["#1a1a1a", peakColor, "#1a1a1a"]);

  return (
    <motion.p
      style={{ opacity, y, color }}
      className={`font-display leading-[1.4] md:leading-[1.5] ${
        big
          ? "text-xl font-800 md:text-4xl lg:text-5xl"
          : "text-base font-600 md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
