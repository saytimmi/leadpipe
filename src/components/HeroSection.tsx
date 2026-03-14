"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

const stats = [
  { value: "73%", label: "заявок теряются без ответа" },
  { value: "3 мин", label: "— критическое время реакции" },
  { value: "×5", label: "рост конверсии с автоматизацией" },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      id="hero"
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb absolute left-[10%] top-[20%] h-[400px] w-[400px] bg-accent/20" style={{ animationDelay: "0s" }} />
        <div className="orb absolute right-[15%] top-[30%] h-[300px] w-[300px] bg-purple/15" style={{ animationDelay: "-5s" }} />
        <div className="orb absolute bottom-[20%] left-[40%] h-[350px] w-[350px] bg-warm/10" style={{ animationDelay: "-10s" }} />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="font-display text-sm font-500 text-white/70">
            Автоматизация продаж нового поколения
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl font-display text-5xl font-800 leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
        >
          Каждый клиент,
          <br />
          который написал —{" "}
          <span className="gradient-text">
            станет твоим
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/40 md:text-xl"
        >
          Пока ты спишь, LeadPipe отвечает каждому, квалифицирует,
          ведёт до сделки — и показывает, где ты теряешь деньги.
          Без менеджеров. Без хаоса. Без потерь.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12"
        >
          <CTAButton text="Попробовать бесплатно" targetId="form" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-6 md:flex-row md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-display text-2xl font-800 text-accent md:text-3xl">
                {stat.value}
              </span>
              <span className="text-left font-display text-sm font-400 text-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="scroll-bounce flex flex-col items-center gap-2">
          <span className="font-display text-xs font-500 tracking-widest text-white/30">
            СКРОЛЛ
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/30">
            <path d="M10 4L10 16M10 16L16 10M10 16L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 10 10)"/>
          </svg>
        </div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px gradient-line" />
    </section>
  );
}
