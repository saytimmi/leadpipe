"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingMessages = [
  { text: "Сколько стоит?", x: "8%", y: "30%" },
  { text: "Здравствуйте!", x: "82%", y: "22%" },
  { text: "Хочу записаться", x: "75%", y: "72%" },
  { text: "Есть в наличии?", x: "5%", y: "68%" },
  { text: "Подскажите...", x: "88%", y: "48%" },
  { text: "Цена?", x: "18%", y: "50%" },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {floatingMessages.map((msg, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 font-body text-xs text-text-muted backdrop-blur-sm md:block"
          style={{ left: msg.x, top: msg.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0], y: [0, -10, -10, -120], scale: [0.8, 1, 1, 0.5] }}
          transition={{ duration: 7, delay: i * 0.8, repeat: Infinity, repeatDelay: 6 }}
        >
          {msg.text}
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl text-center">
        <h1 className="font-display leading-[0.95] tracking-tight">
          {["Ты тратишь", "на рекламу.", "Люди пишут."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease: [0.65, 0.05, 0, 1] }}
              className="block text-5xl font-800 md:text-7xl lg:text-[6.5rem]"
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: [0.65, 0.05, 0, 1] }}
            className="mt-2 block text-5xl font-800 text-lime md:text-7xl lg:text-[6.5rem]"
          >
            А дальше?
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16"
        >
          <button
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
            className="group cursor-pointer font-display text-sm font-500 text-text-muted transition-colors hover:text-lime"
          >
            Читай дальше
            <motion.span
              className="ml-2 inline-block"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </motion.div>

      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
