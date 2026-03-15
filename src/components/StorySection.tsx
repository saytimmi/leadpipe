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
  { text: "«107 лидов. Цена лида — 2 200 ₸.»", color: "lime" },
  { text: "Ты думаешь — классно.", color: "dim" },
  { text: "" },
  { text: "Но дешёвый лид", color: "warm" },
  { text: "≠ хороший лид.", color: "warm", big: true },
  { text: "" },
  { text: "Из 107 в WhatsApp пришло 93.", color: "dim" },
  { text: "14 — потерялись.", color: "warm" },
  { text: "" },
  { text: "Менеджер ответил вовремя — 60.", color: "dim" },
  { text: "33 написали вечером.", color: "warm" },
  { text: "Ответ через 5-10 часов.", color: "warm" },
  { text: "Они уже нашли другого.", color: "warm" },
  { text: "" },
  { text: "Назвали имя — 54.", color: "dim" },
  { text: "Дослушали — 17.", color: "dim" },
  { text: "Пришли на встречу —" },
  { text: "8.", color: "lime", big: true },
  { text: "" },
  { text: "Лид стоит 2 200 ₸.", color: "dim" },
  { text: "Клиент — 29 681 ₸.", color: "lime", big: true },
  { text: "" },
  { text: "Таргетолог не видит.", color: "warm" },
  { text: "Менеджер не видит.", color: "warm" },
  { text: "Ты — тоже.", color: "warm", big: true },
  { text: "" },
  { text: "Между «лид» и «клиент» —" },
  { text: "чёрная дыра.", color: "warm", big: true },
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentLines = lines.filter(l => l.text !== "").length;
  // More scroll room per line for smoother reading
  const totalHeight = contentLines * 110 + 800;

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${totalHeight}px` }}>
      {/* sticky container: items-center centers vertically, pt accounts for header */}
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden px-5 pt-16 md:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Section label */}
          <div className="mb-6 flex items-center gap-4 md:mb-8">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>

          {/* Lines — more spacing on mobile */}
          <div className="space-y-1.5 md:space-y-1">
            {lines.map((line, i) => {
              if (line.text === "") return <div key={i} className="h-3 md:h-4" />;
              const total = lines.length + 4;
              // Wider visible window: lines stay lit longer
              const start = Math.max(0, (i - 2) / total);
              const peak = (i + 0.5) / total;
              const end = Math.min(1, (i + 8) / total);
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
  lime: "#CCFF00", warm: "#FF6B35", dim: "#999999", white: "#ffffff",
};

function StoryLine({ line, scrollYProgress, start, peak, end, colorType, big }: {
  line: string; scrollYProgress: MotionValue<number>;
  start: number; peak: number; end: number;
  colorType: string; big: boolean;
}) {
  // Higher base opacity so more lines are visible at once
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.08, 1, 0.15]);
  const y = useTransform(scrollYProgress, [start, peak], [4, 0]);
  const peakColor = colorMap[colorType] || "#ffffff";
  const color = useTransform(scrollYProgress, [start, peak, end], ["#1a1a1a", peakColor, "#262626"]);

  return (
    <motion.p style={{ opacity, y, color }}
      className={`font-display leading-[1.5] md:leading-[1.5] ${
        big
          ? "text-2xl font-800 md:text-4xl lg:text-5xl"
          : "text-lg font-600 md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
