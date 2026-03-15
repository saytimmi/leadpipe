"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  const handleClick = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? "border-b border-white/[0.06] bg-bg/80 backdrop-blur-2xl"
              : "bg-transparent"
          }`}
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <span className="font-display text-lg font-700 tracking-tight text-text">
            lead<span className="text-accent">pipe</span>
          </span>
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-full bg-accent px-5 py-2.5 font-display text-xs font-600 uppercase tracking-wider text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            Оставить заявку
          </motion.button>
        </div>
      </motion.header>

      {/* Sticky bottom CTA on mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-bg/90 p-4 backdrop-blur-2xl md:hidden"
      >
        <button
          onClick={handleClick}
          className="w-full cursor-pointer rounded-full bg-accent py-3.5 font-display text-sm font-600 text-white"
        >
          Оставить заявку
        </button>
      </motion.div>
    </>
  );
}
