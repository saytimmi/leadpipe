"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const paragraphs = [
  "Ты запускаешь рекламу. Люди начинают писать.",
  "Кто-то спрашивает цену — ему ответили через три часа. Он уже нашёл другого.",
  "Кто-то написал вечером — ему ответили утром. Он забыл, о чём спрашивал.",
  "Кто-то задал вопрос, ему ответили, он сказал «подумаю» — и всё. Никто ему больше не написал.",
  "В конце месяца ты смотришь: на рекламу ушло нормально. Заявки были. А клиентов — три с половиной.",
];

export default function FamiliarSection() {
  return (
    <section
      id="familiar"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      {/* Decorative element */}
      <div className="absolute right-0 top-0 h-full w-1/3 dots-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Узнаёшь себя?
          </span>
          <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-dark md:text-6xl">
            Знакомо?
          </h2>
        </motion.div>

        <div className="border-l-2 border-accent/20 pl-8">
          <AnimatedText paragraphs={paragraphs} />
        </div>
      </div>
    </section>
  );
}
