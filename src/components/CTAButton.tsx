"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  text?: string;
  targetId?: string;
}

export default function CTAButton({
  text = "Узнать подробнее",
  targetId = "form",
}: CTAButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="shimmer group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-accent via-purple to-accent bg-[length:200%_auto] px-10 py-5 font-display text-lg font-600 text-white transition-all duration-500 hover:bg-right hover:shadow-[0_0_40px_rgba(0,71,255,0.3),0_0_80px_rgba(124,58,237,0.15)]"
    >
      <span className="relative z-10">{text}</span>
    </motion.button>
  );
}
