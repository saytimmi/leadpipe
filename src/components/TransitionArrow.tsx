"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TransitionArrow() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 md:py-24">
      {/* Glowing line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="w-px bg-gradient-to-b from-warm/0 via-warm to-warm/0"
      />

      {/* Pulsing dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: "spring", damping: 10 }}
        className="relative my-4"
      >
        <div className="h-3 w-3 rounded-full bg-warm" />
        <motion.div
          animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-warm"
        />
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
        className="mt-2 font-display text-xs font-500 uppercase tracking-[0.3em] text-text-dim"
      >
        А теперь цифры
      </motion.p>

      {/* Arrow */}
      <motion.svg
        width="20" height="20" viewBox="0 0 20 20" fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5, ease }}
        className="mt-3 text-text-dim"
      >
        <motion.path
          d="M10 3L10 17M10 17L4 11M10 17L16 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
}
