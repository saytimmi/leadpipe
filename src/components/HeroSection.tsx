"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const floatingMessages = [
  { text: "Сколько стоит?", x: "10%", y: "20%", delay: 0 },
  { text: "Здравствуйте!", x: "75%", y: "15%", delay: 0.5 },
  { text: "Хочу записаться", x: "60%", y: "70%", delay: 1 },
  { text: "Есть в наличии?", x: "15%", y: "65%", delay: 1.5 },
  { text: "Подскажите...", x: "80%", y: "45%", delay: 2 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {floatingMessages.map((msg, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl bg-gray-100 px-4 py-2 text-sm text-muted"
          style={{ left: msg.x, top: msg.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.8, 1, 1, 0.6],
            y: [0, 0, 0, -60],
          }}
          transition={{
            duration: 4,
            delay: msg.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {msg.text}
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-dark md:text-6xl lg:text-7xl">
          Ты тратишь на рекламу.{" "}
          <span className="text-muted">Люди пишут.</span>{" "}
          <span className="text-accent">А дальше?</span>
        </h1>
        <div className="mt-12">
          <CTAButton text="Читай дальше" targetId="familiar" />
        </div>
      </div>
    </section>
  );
}
