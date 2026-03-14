"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/5 px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#050510] to-[#030308]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-800 text-white"
        >
          lead<span className="gradient-text-static">pipe</span>
        </motion.span>

        <p className="max-w-md font-body text-base leading-relaxed text-white/25">
          Система, которая превращает каждое сообщение в клиента.
          Автоматически. Круглосуточно. Без потерь.
        </p>

        <div className="flex gap-4">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-white/10 px-8 py-3 font-display text-sm font-600 text-white transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(0,71,255,0.15)]"
          >
            <span className="relative z-10">Telegram</span>
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-white/10 px-8 py-3 font-display text-sm font-600 text-white transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(0,71,255,0.15)]"
          >
            <span className="relative z-10">WhatsApp</span>
          </a>
        </div>

        {/* Gradient divider */}
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <p className="font-display text-xs text-white/10">
          &copy; {new Date().getFullYear()} LeadPipe. Все заявки в работе.
        </p>
      </div>
    </footer>
  );
}
