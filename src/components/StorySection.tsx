"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyBlocks = [
  {
    text: "Понедельник. Утро. Ты открываешь телефон — а там 47 непрочитанных сообщений от людей, которые написали за выходные.",
    highlight: "47 непрочитанных",
  },
  {
    text: "«Сколько стоит?» — написал кто-то в субботу в 23:14. Сейчас утро понедельника. Человек давно нашёл другого.",
    highlight: "давно нашёл другого",
  },
  {
    text: "«Хочу записаться на среду» — это было вчера в 10:00. Ты ответил через 20 часов. Человек забыл, куда хотел записаться.",
    highlight: "забыл",
  },
  {
    text: "«А есть рассрочка?» → ты ответил → «подумаю» → всё. Больше вы не общались. Навсегда.",
    highlight: "Навсегда",
  },
  {
    text: "Конец месяца. Реклама — 150 000 ₽. Заявок — 120.",
    highlight: null,
  },
  {
    text: "Клиентов — 4.",
    highlight: "4",
    large: true,
  },
];

const closingLines = [
  "Не потому что реклама плохая.",
  "Не потому что продукт не нужен.",
  "А потому что между «человек написал» и «человек заплатил» — чёрная дыра.",
  "И ты её даже не видишь.",
];

function HighlightedText({ text, highlight }: { text: string; highlight: string | null }) {
  if (!highlight) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="text-warm">{highlight}</span>
      {parts[1]}
    </>
  );
}

export default function StorySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative px-6 py-32 md:py-40"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-warm">
            01 — Знакомая история
          </span>
          <h2 className="mt-5 font-display text-4xl font-800 tracking-tight text-text md:text-6xl lg:text-7xl">
            Вот как это
            <br />
            <span className="text-text-secondary">обычно выглядит</span>
          </h2>
        </motion.div>

        {/* Story with animated left line */}
        <div className="relative pl-8 md:pl-14">
          {/* Animated vertical line */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-warm to-warm/20"
            />
          </div>

          <div className="space-y-8">
            {storyBlocks.map((block, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`font-body leading-[1.9] text-text-secondary ${
                  (block as { large?: boolean }).large
                    ? "text-3xl font-700 text-text md:text-5xl"
                    : "text-lg md:text-xl"
                }`}
              >
                <HighlightedText text={block.text} highlight={block.highlight} />
              </motion.p>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-16 space-y-4 border-t border-white/[0.04] pt-12">
            {closingLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`font-body text-lg md:text-xl ${
                  i === closingLines.length - 1
                    ? "font-600 text-accent"
                    : "text-text-secondary"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
