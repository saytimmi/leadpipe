"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-800 text-text"
        >
          lead<span className="text-accent">pipe</span>
        </motion.span>

        <p className="max-w-md font-body text-base leading-relaxed text-text-dim">
          Система, которая мгновенно отвечает каждому клиенту, ведёт до записи
          и показывает реальные цифры твоего бизнеса.
        </p>

        <motion.a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-white/[0.06] px-8 py-3 font-display text-sm font-500 text-text-secondary transition-all hover:border-accent/30 hover:text-accent"
        >
          Написать в Telegram
        </motion.a>

        <div className="h-px w-12 bg-white/[0.06]" />

        <p className="font-display text-xs text-text-dim">
          &copy; {new Date().getFullYear()} LeadPipe
        </p>
      </div>
    </footer>
  );
}
