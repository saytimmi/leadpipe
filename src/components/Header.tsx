"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-white/5 bg-bg/70 backdrop-blur-2xl"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <span className="font-display text-base font-700 tracking-tight">
          lead<span className="text-lime">pipe</span>
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
          className="cursor-pointer rounded-full bg-lime px-6 py-2.5 font-display text-xs font-600 uppercase tracking-wider text-bg transition-shadow hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]"
        >
          Оставить заявку
        </motion.button>
      </div>
      <motion.div style={{ width: progressWidth }} className="absolute bottom-0 left-0 h-px bg-lime/50" />
    </motion.header>
  );
}
