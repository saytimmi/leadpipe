"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const lines: { text: string; color?: string; big?: boolean }[] = [
  { text: "У тебя бизнес." },
  { text: "Стоматология, автосервис, онлайн-школа —", color: "dim" },
  { text: "неважно.", color: "dim" },
  { text: "" },
  { text: "Ты нанял таргетолога." },
  { text: "Он запустил три кампании.", color: "dim" },
  { text: "Бюджет — 237 000 ₸.", color: "lime" },
  { text: "" },
  { text: "Через неделю он пишет:", color: "dim" },
  { text: "«107 лидов. Цена лида — 2 200 ₸. Нормально.»", color: "lime" },
  { text: "Ты думаешь — классно.", color: "dim" },
  { text: "" },
  { text: "Но дешёвый лид", color: "warm" },
  { text: "≠ хороший лид.", color: "warm", big: true },
  { text: "" },
  { text: "Из 107 лидов в WhatsApp пришло 93.", color: "dim" },
  { text: "14 — потерялись между Facebook и чатом.", color: "warm" },
  { text: "" },
  { text: "Из 93 — менеджер ответил вовремя 60.", color: "dim" },
  { text: "33 написали вечером или в выходные.", color: "warm" },
  { text: "Им ответили через 5-10 часов.", color: "warm" },
  { text: "Они уже нашли другого.", color: "warm" },
  { text: "" },
  { text: "Назвали имя и рассказали что нужно — 54.", color: "dim" },
  { text: "Дослушали про услугу — 17.", color: "dim" },
  { text: "Пришли на встречу —", color: "dim" },
  { text: "8.", color: "lime", big: true },
  { text: "" },
  { text: "Цена лида — 2 200 ₸.", color: "dim" },
  { text: "Цена клиента — 29 681 ₸.", color: "lime", big: true },
  { text: "" },
  { text: "Таргетолог этого не видит.", color: "warm" },
  { text: "Менеджер этого не видит.", color: "warm" },
  { text: "Ты — тоже.", color: "warm", big: true },
  { text: "" },
  { text: "Никто не видит полную картину:", color: "dim" },
  { text: "от запуска рекламы", color: "dim" },
  { text: "до клиента, который пришёл и заплатил." },
  { text: "" },
  { text: "Между «лид по 2 200» и «клиент по 29 000» —" },
  { text: "чёрная дыра.", color: "warm", big: true },
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Height based on line count — no extra padding to avoid black screen
  const nonEmptyLines = lines.filter(l => l.text !== "").length;
  const totalHeight = nonEmptyLines * 80 + 600;

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${totalHeight}px` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            {lines.map((line, i) => {
              if (line.text === "") return <div key={i} className="h-2 md:h-4" />;
              const total = lines.length + 6;
              const start = Math.max(0, (i - 1) / total);
              const peak = (i + 0.5) / total;
              const end = Math.min(1, (i + 5) / total);
              return (
                <StoryLine key={i} line={line.text} scrollYProgress={scrollYProgress}
                  start={start} peak={peak} end={end}
                  colorType={line.color || "white"} big={line.big || false} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const colorMap: Record<string, string> = {
  lime: "#CCFF00", warm: "#FF6B35", dim: "#888888", white: "#ffffff",
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
    <motion.p style={{ opacity, y, color }}
      className={`font-display leading-[1.4] md:leading-[1.5] ${
        big ? "text-xl font-800 md:text-4xl lg:text-5xl" : "text-base font-600 md:text-2xl lg:text-[2.2rem]"
      }`}>{line}</motion.p>
  );
}
