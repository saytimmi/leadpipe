"use client";

import AnimatedText from "./AnimatedText";
import FunnelDiagram from "./FunnelDiagram";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Заявки были нормальные. Люди реально интересовались.",
  "Просто им не ответили вовремя. Или ответили, но не довели. Или довели, но потом забыли напомнить.",
  "И ты этого даже не видишь. Ты не знаешь, на каком этапе они уходят. Ты не знаешь, сколько на самом деле стоит клиент, а не просто заявка.",
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="flex min-h-screen flex-col items-center justify-center bg-light px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Вот в чём проблема
        </h2>
        <AnimatedText paragraphs={paragraphs} />
        <div className="mt-16">
          <FunnelDiagram />
        </div>
        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
