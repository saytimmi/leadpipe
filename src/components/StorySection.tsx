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

const colorMap: Record<string, string> = {
  lime: "#CCFF00", warm: "#FF6B35", dim: "#999999", white: "#ffffff",
};

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Text block scrolls UP through the center of the viewport
  // At 0% scroll → text starts below center, first lines visible
  // At 100% scroll → text scrolled up, last lines visible
  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-85%"]);

  return (
    <section ref={ref} id="story" className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Fade masks: top and bottom edges fade to black */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-bg to-transparent" />

        {/* Section label — fixed at top */}
        <div className="absolute inset-x-0 top-0 z-20 px-5 pt-20 md:px-10">
          <div className="mx-auto flex max-w-[1400px] items-center gap-4">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>
        </div>

        {/* Scrolling text block */}
        <motion.div
          style={{ y: textY }}
          className="flex h-full flex-col justify-center px-5 md:px-10"
        >
          <div className="mx-auto w-full max-w-[1400px] space-y-2 py-[40vh] md:space-y-2.5">
            {lines.map((line, i) => {
              if (line.text === "") return <div key={i} className="h-4 md:h-6" />;
              const total = lines.length + 2;
              const start = Math.max(0, (i - 3) / total);
              const peak = i / total;
              const end = Math.min(1, (i + 6) / total);
              return (
                <StoryLine key={i} line={line.text} scrollYProgress={scrollYProgress}
                  start={start} peak={peak} end={end}
                  colorType={line.color || "white"} big={line.big || false} />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryLine({ line, scrollYProgress, start, peak, end, colorType, big }: {
  line: string; scrollYProgress: MotionValue<number>;
  start: number; peak: number; end: number;
  colorType: string; big: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.1, 1, 0.2]);
  const peakColor = colorMap[colorType] || "#ffffff";
  const color = useTransform(scrollYProgress, [start, peak, end], ["#1a1a1a", peakColor, "#2a2a2a"]);

  return (
    <motion.p style={{ opacity, color }}
      className={`font-display ${
        big
          ? "text-2xl font-800 leading-[1.3] md:text-4xl lg:text-5xl"
          : "text-[17px] font-600 leading-[1.6] md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
