"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  text?: string;
  targetId?: string;
}

export default function CTAButton({
  text = "Разобраться",
  targetId = "form",
}: CTAButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer overflow-hidden rounded-full bg-dark px-10 py-5 font-display text-lg font-600 text-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-dark/20"
    >
      <span className="relative z-10">{text}</span>
      <motion.div
        className="absolute inset-0 bg-accent"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
