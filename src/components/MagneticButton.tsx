"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
  text?: string;
  targetId?: string;
  variant?: "primary" | "outline";
  size?: "default" | "large";
}

export default function MagneticButton({
  text = "Узнать больше",
  targetId = "form",
  variant = "primary",
  size = "default",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const isPrimary = variant === "primary";
  const isLarge = size === "large";

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`group relative cursor-pointer overflow-hidden rounded-full font-display font-600 transition-all duration-300 ${
        isLarge
          ? "px-10 py-5 text-base tracking-wide md:px-14 md:py-6 md:text-lg"
          : "px-8 py-4 text-sm tracking-wide"
      } ${
        isPrimary
          ? "bg-accent text-white hover:shadow-xl hover:shadow-accent/25"
          : "border border-white/10 bg-transparent text-text hover:border-white/20 hover:bg-white/[0.03]"
      }`}
    >
      <span className="relative z-10">{text}</span>
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent via-accent-glow to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />
      )}
      {isPrimary && (
        <div className="absolute -inset-1 rounded-full bg-accent/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </motion.button>
  );
}
