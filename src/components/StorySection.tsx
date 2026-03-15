"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Пятница. Вечер.",
  "Ты наконец запустил рекламу.",
  "",
  "Суббота, 23:14.",
  "Кто-то пишет в WhatsApp:",
  "«Здравствуйте, сколько стоит?»",
  "",
  "Ты видишь сообщение",
  "в понедельник утром.",
  "Открываешь чат.",
  "Человек уже в сторис конкурента.",
  "",
  "Воскресенье, 10:00.",
  "«Хочу записаться на среду.»",
  "Ты отвечаешь в 19:00.",
  "Девять часов.",
  "Человек уже забыл, куда хотел.",
  "",
  "Ещё один пишет.",
  "Ты ответил. Он спросил цену.",
  "Ты скинул. Он написал «подумаю».",
  "Ты не написал больше.",
  "Он — тоже.",
  "Навсегда.",
  "",
  "Конец месяца.",
  "Реклама — 237 000 ₸.",
  "Заявок — 93.",
  "",
  "Клиентов?",
  "Восемь.",
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${lines.length * 90 + 900}px` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            {lines.map((line, i) => {
              if (line === "") return <div key={i} className="h-3 md:h-5" />;
              const total = lines.length + 6;
              const start = Math.max(0, (i - 1) / total);
              const peak = (i + 0.5) / total;
              const end = Math.min(1, (i + 5) / total);
              const isAccent = line === "Восемь." || line === "Навсегда." || line.startsWith("«");
              const isDim = line.startsWith("Ты ") || line.startsWith("Он ");
              return (
                <StoryLine
                  key={i}
                  line={line}
                  scrollYProgress={scrollYProgress}
                  start={start} peak={peak} end={end}
                  isAccent={isAccent}
                  isDim={isDim}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryLine({ line, scrollYProgress, start, peak, end, isAccent, isDim }: {
  line: string; scrollYProgress: MotionValue<number>;
  start: number; peak: number; end: number;
  isAccent: boolean; isDim: boolean;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.04, 1, 0.08]);
  const y = useTransform(scrollYProgress, [start, peak], [6, 0]);
  const peakColor = isAccent ? "#CCFF00" : isDim ? "#999999" : "#ffffff";
  const color = useTransform(scrollYProgress, [start, peak, end], ["#222222", peakColor, "#222222"]);

  return (
    <motion.p
      style={{ opacity, y, color }}
      className={`font-display leading-[1.4] md:leading-[1.5] ${
        isAccent
          ? "text-xl font-800 md:text-4xl lg:text-5xl"
          : "text-base font-600 md:text-2xl lg:text-[2.2rem]"
      }`}
    >
      {line}
    </motion.p>
  );
}
