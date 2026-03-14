"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  text?: string;
  targetId?: string;
  variant?: "primary" | "secondary";
}

export default function CTAButton({
  text = "Разобраться",
  targetId = "form",
  variant = "primary",
}: CTAButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer rounded-full px-8 py-4 text-lg font-semibold transition-all ${
        variant === "primary"
          ? "cta-gradient text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
          : "border-2 border-gray-200 bg-white text-dark hover:border-accent hover:text-accent"
      }`}
    >
      {text}
    </motion.button>
  );
}
