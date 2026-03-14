"use client";

import { motion } from "framer-motion";

export default function Header() {
  const handleClick = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100/50 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="text-sm font-bold text-white">L</span>
          </div>
          <span className="text-lg font-bold text-dark">LeadPipe</span>
        </div>
        <button
          onClick={handleClick}
          className="cursor-pointer rounded-full bg-dark px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          Оставить заявку
        </button>
      </div>
    </motion.header>
  );
}
