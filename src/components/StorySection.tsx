"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Ты запускаешь рекламу.",
  "Люди начинают писать.",
  "",
  "Кто-то спрашивает цену —",
  "ему ответили через три часа.",
  "Он уже нашёл другого.",
  "",
  "Кто-то написал вечером —",
  "ему ответили утром.",
  "Он забыл, о чём спрашивал.",
  "",
  "Кто-то задал вопрос,",
  "ему ответили,",
  "он сказал «подумаю» —",
  "и всё.",
  "",
  "В конце месяца:",
  "на рекламу ушло нормально.",
  "Заявки были.",
  "А клиентов —",
  "три с половиной.",
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${lines.length * 100 + 800}px` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-muted">Знакомо?</span>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            {lines.map((line, i) => {
              if (line === "") return <div key={i} className="h-4 md:h-6" />;
              const total = lines.length + 4;
              const start = Math.max(0, (i - 1) / total);
              const peak = (i + 0.5) / total;
              const end = Math.min(1, (i + 4) / total);
              return <StoryLine key={i} line={line} scrollYProgress={scrollYProgress} start={start} peak={peak} end={end} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryLine({ line, scrollYProgress, start, peak, end }: {
  line: string; scrollYProgress: MotionValue<number>;
  start: number; peak: number; end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.06, 1, 0.1]);
  const y = useTransform(scrollYProgress, [start, peak], [8, 0]);
  const color = useTransform(scrollYProgress, [start, peak, end], ["#333333", "#ffffff", "#333333"]);

  return (
    <motion.p
      style={{ opacity, y, color }}
      className="font-display text-lg font-600 leading-[1.5] md:text-3xl lg:text-[2.5rem]"
    >
      {line}
    </motion.p>
  );
}
