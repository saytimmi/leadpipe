"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-display text-lg font-700">
          lead<span className="text-lime">pipe</span>
        </motion.span>
        <p className="max-w-sm font-body text-xs leading-relaxed text-text-muted">
          Система, которая отвечает каждому клиенту, ведёт до конца и показывает реальные цифры твоего бизнеса.
        </p>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
          className="rounded-full border border-white/[0.04] px-5 py-2 font-display text-[10px] font-500 uppercase tracking-wider text-text-muted transition-all active:text-lime hover:border-lime/20 hover:text-lime">
          Telegram
        </a>
        <p className="font-display text-[10px] text-text-dim">&copy; {new Date().getFullYear()} LeadPipe</p>
      </div>
    </footer>
  );
}
