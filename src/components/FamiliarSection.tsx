"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";

const paragraphs = [
  "Ты вложил в рекламу. Люди написали. Кто-то спросил цену — ему ответили через три часа. Он уже купил у конкурента.",
  "Кто-то написал вечером — ему ответили утром. Он забыл, зачем писал. Ты потерял клиента, который был готов платить.",
  "Кто-то спросил, ему ответили, он сказал «подумаю» — и тишина. Ему никто не написал. А он ждал.",
  "И так каждый день. Ты платишь за каждого из этих людей. Они приходят. А потом просто исчезают.",
  "В конце месяца цифры: на рекламу ушло 150 000. Заявок — 80. Клиентов — четыре. И ты думаешь: «Реклама не работает». Но реклама работала. Не работал процесс после неё.",
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
      {/* Decorative elements */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px]" />

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
            01 — Узнаёшь себя?
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-white md:text-7xl">
            Деньги в рекламу.
            <br />
            <span className="text-white/20">Клиенты — мимо.</span>
          </h2>
        </motion.div>

        {/* Content with animated left line */}
        <div className="relative pl-10 md:pl-16">
          {/* Animated vertical line with gradient */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-warm via-accent to-purple"
            />
          </div>

          <AnimatedText paragraphs={paragraphs} />
        </div>
      </div>
    </section>
  );
}
