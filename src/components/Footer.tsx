"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-display text-xl font-700">
          lead<span className="text-lime">pipe</span>
        </motion.span>
        <p className="max-w-sm font-body text-sm leading-relaxed text-text-dim">
          Система, которая отвечает каждому клиенту, ведёт до конца и показывает реальные цифры твоего бизнеса.
        </p>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
          className="rounded-full border border-white/[0.04] px-6 py-2.5 font-display text-xs font-500 text-text-muted transition-all hover:border-lime/20 hover:text-lime">
          Написать в Telegram
        </a>
        <p className="font-display text-xs text-text-dim">&copy; {new Date().getFullYear()} LeadPipe</p>
      </div>
    </footer>
  );
}
