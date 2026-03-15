"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className="noise relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-[1400px]">
          {/* Viewport-filling headline like Lando */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0, 1] }}
              className="font-display text-[12vw] font-900 uppercase leading-[0.9] tracking-tight md:text-[10vw]"
            >
              Ты тратишь
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.65, 0.05, 0, 1] }}
              className="font-display text-[12vw] font-900 uppercase leading-[0.9] tracking-tight text-text-muted md:text-[10vw]"
            >
              на рекламу.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.35, ease: [0.65, 0.05, 0, 1] }}
              className="font-display text-[12vw] font-900 uppercase leading-[0.9] tracking-tight text-lime md:text-[10vw]"
            >
              А дальше?
            </motion.h1>
          </div>

          {/* Subtitle — bottom right, asymmetric */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.65, 0.05, 0, 1] }}
            className="mt-8 flex justify-end"
          >
            <p className="max-w-sm text-right font-body text-sm leading-relaxed text-text-muted md:text-base">
              Люди пишут, но никто вовремя не отвечает.
              <br />Заявки есть — клиентов нет.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — bottom left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-10 z-10"
        >
          <motion.p
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-[10px] font-500 uppercase tracking-[0.2em] text-text-dim"
            style={{ writingMode: "vertical-lr" }}
          >
            Листай вниз
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
