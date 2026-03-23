"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

// Each group = one thought. Empty string = spacer between thoughts.
const lines: { text: string; color?: string; big?: boolean }[] = [
  { text: "У ТЕБЯ БИЗНЕС.", color: "lime", big: true },

  { text: "" },

  { text: "Стоматология, салон красоты, автосервис,", color: "dim" },
  { text: "клининг, фитнес, онлайн-школа,", color: "dim" },
  { text: "ремонт квартир, недвижимость — неважно.", color: "dim" },

  { text: "" },

  { text: "Ты нанял таргетолога.", color: "dim" },
  { text: "Он запустил 6 объявлений в Instagram.", color: "dim" },
  { text: "Бюджет — $3 100 за месяц.", color: "lime" },

  { text: "" },

  { text: "Через неделю пишет:", color: "dim" },
  { text: "«847 заявок, лид по $3.60 —", color: "lime" },
  { text: "отличный результат!»", color: "lime" },
  { text: "Ты думаешь — ну вроде неплохо." },

  { text: "" },

  { text: "Но подожди." },
  { text: "847 человек написали в WhatsApp.", big: true },
  { text: "А дальше что?", color: "warm", big: true },

  { text: "" },

  { text: "312 — написали вечером или в выходные.", color: "warm" },
  { text: "Админ ответил через 4-6 часов.", color: "warm" },
  { text: "Они уже записались к конкуренту.", color: "warm", big: true },

  { text: "" },

  { text: "168 — спросили цену и пропали.", color: "warm" },
  { text: "Никто не написал им повторно.", color: "warm" },

  { text: "" },

  { text: "94 — хотели записаться,", color: "warm" },
  { text: "но им не ответили на второе сообщение.", color: "warm" },

  { text: "" },

  { text: "В итоге до оплаты дошли" },
  { text: "11 человек.", color: "warm", big: true },

  { text: "" },

  { text: "Лид стоил $3.60.", color: "lime" },
  { text: "Клиент который заплатил — $281.", color: "warm", big: true },

  { text: "" },

  { text: "А теперь главный вопрос." },

  { text: "" },

  { text: "Эти 11 клиентов —" },
  { text: "они пришли с какого объявления?" },
  { text: "С первого? С третьего? С шестого?", color: "dim" },

  { text: "" },

  { text: "Ты не знаешь.", color: "warm", big: true },
  { text: "Таргетолог не знает.", color: "warm" },
  { text: "Никто не знает.", color: "warm", big: true },
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

  // Text starts at 40% from top (slightly above center)
  // Moves up so that the LAST line ends at 40% from top too
  // -80% translateY on a block that's ~45dvh padding + content + 45dvh bottom padding
  // ensures text scrolls through the center zone with no black gap at bottom
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={ref} id="story" className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Gradient masks */}
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

        {/* Text block: padded top AND bottom so text always in center zone */}
        <motion.div
          style={{ y: textY }}
          className="px-5 will-change-transform md:px-10"
        >
          {/* Top spacer pushes first line to ~40% from top */}
          <div className="h-[38dvh]" />
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
          </div>
          {/* Bottom spacer: ensures last line can reach center without black gap below */}
          <div className="h-[55dvh]" />
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
