"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      {/* Background with glassmorphism */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-white/5 bg-dark/60 backdrop-blur-2xl"
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-xl font-800 tracking-tight text-white">
          lead<span className="gradient-text-static">pipe</span>
        </span>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative cursor-pointer overflow-hidden rounded-full px-6 py-2.5 font-display text-sm font-600 text-white"
        >
          {/* Gradient border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple to-warm p-px">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-dark/90 transition-colors group-hover:bg-dark/70" />
          </span>
          <span className="relative z-10">Оставить заявку</span>
        </motion.button>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent via-purple to-warm"
      />
    </motion.header>
  );
}
