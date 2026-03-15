"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  "Ты запускаешь рекламу. Люди начинают писать.",
  "Кто-то спрашивает цену — ему ответили через три часа. Он уже нашёл другого.",
  "Кто-то написал вечером — ему ответили утром. Он забыл, о чём спрашивал.",
  "Кто-то задал вопрос, ему ответили, он сказал «подумаю» — и всё. Никто ему больше не написал.",
  "В конце месяца ты смотришь: на рекламу ушло нормально. Заявки были. А клиентов — три с половиной.",
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} id="story" className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-lime">
            01
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight md:text-6xl lg:text-7xl">
            Знакомо?
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-14">
          <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
            <motion.div style={{ height: lineHeight }} className="w-full bg-lime" />
          </div>

          <div className="space-y-10">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: i * 0.05, ease: [0.65, 0.05, 0, 1] }}
                className="font-body text-xl leading-[1.8] text-text-muted md:text-2xl"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <div className="divider mx-auto mt-32 max-w-7xl" />
    </section>
  );
}
