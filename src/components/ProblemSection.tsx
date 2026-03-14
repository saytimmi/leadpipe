"use client";

import { motion } from "framer-motion";
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-light px-6 py-24"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-red-100/50 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-500">
            Проблема
          </span>
          <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-dark md:text-6xl">
            Вот в чём проблема
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl border border-gray-200/60 bg-white/80 p-8 backdrop-blur-sm"
        >
          <FunnelDiagram />
        </motion.div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
