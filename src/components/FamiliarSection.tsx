"use client";

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
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Знакомо?
        </h2>
        <AnimatedText paragraphs={paragraphs} />
      </div>
    </section>
  );
}
