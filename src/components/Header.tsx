"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useFormModal } from "./FormModal";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { open } = useFormModal();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 border-b border-white/5 bg-bg/80 backdrop-blur-lg" />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        <span className="font-display text-sm font-700 tracking-tight lg:text-base">
          lead<span className="text-lime">pipe</span>
        </span>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={open}
          className="cursor-pointer rounded-full bg-lime px-5 py-2.5 font-display text-[10px] font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_30px_rgba(204,255,0,0.2)] md:px-6"
        >
          Оставить заявку
        </motion.button>
      </div>
      <motion.div style={{ width: progressWidth }} className="absolute bottom-0 left-0 h-[2px] bg-lime" />
    </motion.header>
  );
}
