"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

const floatingMessages = [
  { text: "Сколько стоит?", x: "6%", y: "25%", delay: 0 },
  { text: "Здравствуйте!", x: "80%", y: "20%", delay: 1 },
  { text: "Хочу записаться", x: "70%", y: "75%", delay: 2 },
  { text: "Есть в наличии?", x: "8%", y: "70%", delay: 3 },
  { text: "Подскажите...", x: "85%", y: "50%", delay: 4 },
  { text: "Цена?", x: "15%", y: "48%", delay: 1.5 },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="hero-mesh noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Large decorative text in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none font-display text-[20vw] font-900 leading-none text-dark/[0.02]">
          LEADPIPE
        </span>
      </div>

      {/* Floating messages */}
      {floatingMessages.map((msg, i) => (
        <motion.div
          key={i}
          className="absolute hidden rounded-full border border-dark/5 bg-white/90 px-5 py-2.5 font-display text-sm font-500 text-muted shadow-sm backdrop-blur-sm md:block"
          style={{ left: msg.x, top: msg.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.8, 1, 1, 0.7],
            y: [0, -8, -8, -100],
          }}
          transition={{
            duration: 6,
            delay: msg.delay,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          {msg.text}
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 font-display text-sm font-600 uppercase tracking-[0.3em] text-accent"
        >
          Для тех, кто устал гадать
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl font-display text-5xl font-800 leading-[1.05] tracking-tight text-dark md:text-7xl lg:text-[5.5rem]"
        >
          Ты тратишь
          <br />
          на рекламу.
          <br />
          <span className="italic text-muted/40" style={{ fontFamily: "var(--font-body)" }}>
            Люди пишут.
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-accent">А дальше?</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-2 left-0 right-0 -z-0 h-3 origin-left bg-accent/10 md:h-4"
            />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-14"
        >
          <CTAButton text="Читай дальше ↓" targetId="familiar" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px gradient-line" />
    </section>
  );
}
