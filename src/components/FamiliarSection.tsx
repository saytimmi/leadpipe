"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";

const paragraphs = [
  "Ты запускаешь рекламу. Люди начинают писать.",
  "Кто-то спрашивает цену — ему ответили через три часа. Он уже нашёл другого.",
  "Кто-то написал вечером — ему ответили утром. Он забыл, о чём спрашивал.",
  "Кто-то задал вопрос, ему ответили, он сказал «подумаю» — и всё. Никто ему больше не написал.",
  "В конце месяца ты смотришь: на рекламу ушло нормально. Заявки были. А клиентов — три с половиной.",
];

export default function FamiliarSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="familiar"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32"
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
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-warm">
            01 — Ситуация
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-dark md:text-7xl">
            Знакомо?
          </h2>
        </motion.div>

        {/* Content with animated left line */}
        <div className="relative pl-10 md:pl-16">
          {/* Animated vertical line */}
          <div className="absolute left-0 top-0 h-full w-px bg-dark/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-warm"
            />
          </div>

          <AnimatedText paragraphs={paragraphs} />
        </div>
      </div>
    </section>
  );
}
