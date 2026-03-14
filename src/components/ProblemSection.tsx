"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import FunnelDiagram from "./FunnelDiagram";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Проблема не в рекламе. Не в продукте. Не в цене.",
  "Проблема в том, что между «человек написал» и «человек заплатил» — пропасть. И в этой пропасти лежат 90% твоих денег.",
  "Ты не видишь, на каком шаге люди уходят. Не знаешь, сколько реально стоит клиент. Не понимаешь, какая реклама приводит покупателей, а какая — просто любопытных.",
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      {/* Glow accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-warm">
            02 — Корень проблемы
          </span>
          <h2 className="mt-4 font-display text-5xl font-800 tracking-tight text-white md:text-7xl">
            90% бюджета
            <br />
            <span className="gradient-text">сливается в пустоту</span>
          </h2>
        </motion.div>

        <AnimatedText paragraphs={paragraphs} light />

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
          <CTAButton text="Хочу это исправить" />
        </div>
      </div>
    </section>
  );
}
