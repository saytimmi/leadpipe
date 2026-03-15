"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const words = [
  { text: "Ты вкладываешь", highlight: false },
  { text: "в рекламу.", highlight: false },
  { text: "Люди пишут.", highlight: false },
  { text: "А потом —", highlight: false },
  { text: "тишина.", highlight: true },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Gradient orbs */}
      <motion.div
        className="orb h-[500px] w-[500px] bg-accent/20 md:h-[700px] md:w-[700px]"
        style={{ left: "10%", top: "20%" }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb h-[400px] w-[400px] bg-neon/10 md:h-[600px] md:w-[600px]"
        style={{ right: "5%", bottom: "10%" }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orb h-[300px] w-[300px] bg-warm/10"
        style={{ right: "30%", top: "10%" }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Large background text */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none font-display text-[18vw] font-900 leading-none text-white/[0.015]">
          LEADPIPE
        </span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-neon" />
          <span className="font-display text-xs font-500 uppercase tracking-widest text-text-secondary">
            Для малого и среднего бизнеса
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-4xl font-800 leading-[1.1] tracking-tight md:text-6xl lg:text-[5.5rem]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${
                word.highlight ? "text-gradient" : "text-text"
              } ${i === 2 ? "block" : ""} ${i === 3 ? "block" : ""}`}
              style={{ marginRight: word.text.endsWith(".") || word.text.endsWith("—") ? "0" : "0.3em" }}
            >
              {word.text}
              {i < 1 && " "}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          97 из 100 заявок теряются. Не потому что плохие&nbsp;—
          <br className="hidden md:block" />
          потому что никто вовремя не ответил.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton text="Хочу так же" targetId="form" variant="primary" size="large" />
          <MagneticButton text="Как это работает ↓" targetId="story" variant="outline" size="large" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-white/10 p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-accent"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px gradient-line opacity-50" />
    </section>
  );
}
