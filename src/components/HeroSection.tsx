"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

const stats = [
  { value: "73%", label: "заявок теряются" },
  { value: "3 мин", label: "критичное время ответа" },
  { value: "×5", label: "рост конверсии" },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="orb absolute left-[5%] top-[15%] h-[500px] w-[500px] bg-accent/25" />
        <div className="orb absolute right-[10%] bottom-[20%] h-[400px] w-[400px] bg-purple/20" style={{ animationDelay: "-7s" }} />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="font-display text-sm font-500 text-white/60">Автоответ · Квалификация · Аналитика</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl font-900 leading-[1.0] tracking-tight text-white md:text-8xl lg:text-[7rem]"
        >
          Каждый клиент —<br />
          <span className="gradient-text">твой.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl font-display text-lg font-400 text-white/40 md:text-xl"
        >
          LeadPipe отвечает, ведёт и квалифицирует — пока ты занимаешься бизнесом
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <CTAButton text="Начать бесплатно" targetId="form" />
          <button
            onClick={() => document.getElementById("familiar")?.scrollIntoView({ behavior: "smooth" })}
            className="font-display text-sm font-500 text-white/30 underline-offset-4 hover:text-white/60 hover:underline transition-colors"
          >
            Как это работает ↓
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-4 border-t border-white/5 pt-10"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl font-800 text-accent md:text-4xl">{s.value}</div>
              <div className="mt-1 font-display text-xs font-400 text-white/30 md:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px gradient-line" />
    </section>
  );
}
