"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";

const lines: { text: string; color?: string; big?: boolean }[] = [
  { text: "У тебя бизнес." },
  { text: "Стоматология, автосервис —", color: "dim" },
  { text: "неважно.", color: "dim" },
  { text: "" },
  { text: "Ты нанял таргетолога." },
  { text: "Он запустил три кампании.", color: "dim" },
  { text: "Бюджет — 237 000 ₸.", color: "lime" },
  { text: "" },
  { text: "Через неделю он пишет:", color: "dim" },
  { text: "«107 лидов. Лид — 2 200 ₸.»", color: "lime" },
  { text: "Ты думаешь — классно.", color: "dim" },
  { text: "" },
  { text: "Но дешёвый лид", color: "warm" },
  { text: "≠ хороший лид.", color: "warm", big: true },
  { text: "" },
  { text: "В WhatsApp пришло 93.", color: "dim" },
  { text: "14 — потерялись.", color: "warm" },
  { text: "" },
  { text: "Вовремя ответили — 60.", color: "dim" },
  { text: "33 написали вечером.", color: "warm" },
  { text: "Ответ через 5-10 часов.", color: "warm" },
  { text: "Они ушли.", color: "warm" },
  { text: "" },
  { text: "Имя назвали — 54.", color: "dim" },
  { text: "Дослушали — 17.", color: "dim" },
  { text: "На встречу пришли —" },
  { text: "8.", color: "lime", big: true },
  { text: "" },
  { text: "Лид — 2 200 ₸.", color: "dim" },
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
  lime: "#CCFF00", warm: "#FF6B35", dim: "#777777", white: "#ffffff",
};

const VISIBLE_WINDOW = 8;

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.floor(v * lines.length);
    setCurrentIndex(Math.min(idx, lines.length - 1));
  });

  const visibleRange = useMemo(() => {
    const start = Math.max(0, currentIndex - VISIBLE_WINDOW);
    const end = Math.min(lines.length, currentIndex + VISIBLE_WINDOW);
    return { start, end };
  }, [currentIndex]);

  return (
    <section ref={ref} id="story" className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Gradient masks — 15% top and bottom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[15dvh] bg-gradient-to-b from-bg via-bg/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[15dvh] bg-gradient-to-t from-bg via-bg/80 to-transparent" />

        {/* Section label — inside top mask area */}
        <div className="absolute inset-x-0 top-0 z-20 px-5 pt-[5dvh] md:px-10">
          <div className="mx-auto flex max-w-[1400px] items-center gap-4">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>
        </div>

        {/* Text area — centered between 15% top and 15% bottom = 70% middle zone */}
        <div className="absolute inset-x-0 top-[18dvh] bottom-[15dvh] flex items-center px-5 md:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="space-y-2.5 md:space-y-3">
              {lines.slice(visibleRange.start, visibleRange.end).map((line, localI) => {
                const i = visibleRange.start + localI;
                if (line.text === "") return <div key={i} className="h-2.5 md:h-4" />;

                const linePos = i / lines.length;

                return (
                  <StoryLineDynamic
                    key={i}
                    line={line.text}
                    linePos={linePos}
                    scrollYProgress={scrollYProgress}
                    colorType={line.color || "white"}
                    big={line.big || false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryLineDynamic({ line, linePos, scrollYProgress, colorType, big }: {
  line: string;
  linePos: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  colorType: string;
  big: boolean;
}) {
  const before = Math.max(0, linePos - 0.1);
  const after = Math.min(1, linePos + 0.18);

  const opacity = useTransform(scrollYProgress, [before, linePos, after], [0.12, 1, 0.2]);
  const peakColor = colorMap[colorType] || "#ffffff";
  const color = useTransform(scrollYProgress, [before, linePos, after], ["#222", peakColor, "#333"]);
  const scale = useTransform(scrollYProgress, [before, linePos, after], [0.97, 1, 0.98]);

  return (
    <motion.p style={{ opacity, color, scale }}
      className={`origin-left font-display ${
        big
          ? "text-2xl font-800 leading-[1.3] md:text-4xl lg:text-5xl"
          : "text-[17px] font-600 leading-[1.6] md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
