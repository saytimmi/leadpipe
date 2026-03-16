"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

// Each group = one thought. Empty string = spacer between thoughts.
const lines: { text: string; color?: string; big?: boolean }[] = [
  { text: "У тебя бизнес." },
  { text: "Стоматология, автосервис — неважно.", color: "dim" },

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
  lime: "#CCFF00", warm: "#FF6B35", dim: "#999999", white: "#ffffff",
};

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth translateY: scrolls entire text block through the viewport center
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  return (
    <section ref={ref} id="story" className="relative" style={{ height: "160vh" }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Gradient masks — small, just softens edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[8dvh] bg-gradient-to-b from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[8dvh] bg-gradient-to-t from-bg to-transparent" />

        {/* Section label */}
        <div className="absolute inset-x-0 top-0 z-20 px-5 pt-[4dvh] md:px-10">
          <div className="mx-auto flex max-w-[1400px] items-center gap-4">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>
        </div>

        {/* ALL lines rendered — smooth translateY moves them through center */}
        <motion.div
          style={{ y: textY }}
          className="px-5 pt-[30dvh] md:px-10"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            {lines.map((line, i) => {
              if (line.text === "") {
                return <div key={i} className="h-6 md:h-8" />;
              }

              const total = lines.length;
              const linePos = i / total;
              const before = Math.max(0, linePos - 0.15);
              const after = Math.min(1, linePos + 0.35);

              return (
                <StoryLine
                  key={i}
                  line={line.text}
                  scrollYProgress={scrollYProgress}
                  before={before}
                  linePos={linePos}
                  after={after}
                  colorType={line.color || "white"}
                  big={line.big || false}
                />
              );
            })}
            {/* Extra space at end so last lines can reach center */}
            <div className="h-[2dvh]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryLine({ line, scrollYProgress, before, linePos, after, colorType, big }: {
  line: string;
  scrollYProgress: MotionValue<number>;
  before: number;
  linePos: number;
  after: number;
  colorType: string;
  big: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [before, linePos, after], [0.12, 1, 0.25]);
  const peakColor = colorMap[colorType] || "#ffffff";
  const color = useTransform(scrollYProgress, [before, linePos, after], ["#222222", peakColor, "#333333"]);

  return (
    <motion.p
      style={{ opacity, color }}
      className={`font-display ${
        big
          ? "mb-1 text-2xl font-800 leading-[1.4] md:text-4xl lg:text-5xl"
          : "mb-0.5 text-[17px] font-600 leading-[1.7] md:mb-1 md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
