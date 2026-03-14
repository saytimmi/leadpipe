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
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 py-32"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-warm">
            02 — Проблема
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-dark md:text-7xl">
            Вот в чём
            <br />
            <span className="italic text-warm" style={{ fontFamily: "var(--font-body)" }}>
              проблема
            </span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <FunnelDiagram />
        </motion.div>

        <div className="mt-16 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
