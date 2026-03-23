"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <section ref={ref} className="noise relative h-[120vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-[1400px] will-change-transform">
          {["Умная воронка", "от рекламы", "до оплаты."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
                className={`font-display text-[11vw] font-900 uppercase leading-[0.92] tracking-tight sm:text-[10vw] md:text-[8vw] lg:text-[7vw] ${
                  i === 0 ? "" : i === 1 ? "text-text-muted" : "text-lime"
                }`}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-8 flex justify-end"
          >
            <p className="max-w-xs text-right font-body text-xs leading-relaxed text-text-muted sm:max-w-sm sm:text-sm">
              AI-агент сам отвечает клиентам и ведёт по каждому этапу до визита.
              <br />А ты видишь какой креатив реально приносит деньги, а какой сливает бюджет.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-4 flex justify-end"
          >
            <motion.p className="text-xs md:text-sm text-text-muted font-body tracking-wide text-right">
              Instagram · WhatsApp · CRM — всё связано. В реальном времени.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-6 z-10 lg:bottom-10 lg:left-10"
        >
          <motion.p
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-[10px] font-500 uppercase tracking-[0.2em] text-text-muted/50"
            style={{ writingMode: "vertical-lr" }}
          >
            Scroll
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
