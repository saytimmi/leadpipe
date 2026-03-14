"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  const handleClick = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-dark/5 bg-white/80 backdrop-blur-xl"
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-xl font-800 tracking-tight text-dark">
          lead<span className="text-accent">pipe</span>
        </span>
        <button
          onClick={handleClick}
          className="cursor-pointer rounded-full border border-dark bg-dark px-5 py-2 font-display text-sm font-600 text-white transition-all duration-300 hover:bg-white hover:text-dark"
        >
          Оставить заявку
        </button>
      </div>
    </motion.header>
  );
}
