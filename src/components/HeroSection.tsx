"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const floatingMessages = [
  { text: "Сколько стоит?", x: "8%", y: "22%", delay: 0 },
  { text: "Здравствуйте!", x: "78%", y: "18%", delay: 0.8 },
  { text: "Хочу записаться", x: "65%", y: "72%", delay: 1.6 },
  { text: "Есть в наличии?", x: "12%", y: "68%", delay: 2.4 },
  { text: "Подскажите...", x: "82%", y: "48%", delay: 3.2 },
  { text: "Когда можно?", x: "5%", y: "45%", delay: 4 },
  { text: "Цена?", x: "72%", y: "35%", delay: 1.2 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Decorative circles */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/5" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />

      {/* Floating message bubbles */}
      {floatingMessages.map((msg, i) => (
        <motion.div
          key={i}
          className="absolute hidden rounded-2xl border border-gray-100 bg-white px-4 py-2.5 text-sm text-muted shadow-sm md:block"
          style={{ left: msg.x, top: msg.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1, 1, 0.6],
            y: [0, -5, -5, -80],
          }}
          transition={{
            duration: 5,
            delay: msg.delay,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          <div className="absolute -bottom-1 left-4 h-3 w-3 rotate-45 border-b border-r border-gray-100 bg-white" />
          {msg.text}
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-dark md:text-7xl lg:text-8xl">
            Ты тратишь на{" "}
            <span className="bg-gradient-to-r from-dark to-muted bg-clip-text">рекламу.</span>
            <br />
            <span className="text-muted/60">Люди пишут.</span>
            <br />
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              А дальше?
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <CTAButton text="Читай дальше" targetId="familiar" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto h-10 w-6 rounded-full border-2 border-gray-300"
          >
            <motion.div
              animate={{ y: [2, 14, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mt-1 h-2 w-1.5 rounded-full bg-gray-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
