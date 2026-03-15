"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Ты запускаешь рекламу.",
  "Люди начинают писать.",
  "Кто-то спрашивает цену —",
  "ему ответили через три часа.",
  "Он уже нашёл другого.",
  "",
  "Кто-то написал вечером —",
  "ему ответили утром.",
  "Он забыл, о чём спрашивал.",
  "",
  "Кто-то задал вопрос,",
  "ему ответили, он сказал «подумаю» —",
  "и всё. Никто ему больше не написал.",
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${lines.length * 120 + 600}px` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Section label */}
          <div className="mb-12 flex items-center gap-4">
            <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">01</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="font-display text-[10px] font-500 uppercase tracking-[0.3em] text-text-dim">Знакомо?</span>
          </div>

          {/* Scroll-driven text — each line fades in/out based on scroll */}
          <div className="space-y-1">
            {lines.map((line, i) => {
              if (line === "") return <div key={i} className="h-8" />;
              const start = i / (lines.length + 2);
              const peak = (i + 1) / (lines.length + 2);
              const end = (i + 3) / (lines.length + 2);
              return <StoryLine key={i} line={line} scrollYProgress={scrollYProgress} start={start} peak={peak} end={end} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryLine({ line, scrollYProgress, start, peak, end }: {
  line: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number; peak: number; end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.08, 1, 0.15]);
  const y = useTransform(scrollYProgress, [start, peak], [20, 0]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="font-display text-2xl font-600 leading-[1.6] md:text-4xl lg:text-5xl"
    >
      {line}
    </motion.p>
  );
}
