"use client";

import { motion } from "framer-motion";
import { useFormModal } from "./FormModal";

export default function FormSection() {
  const { open } = useFormModal();

  return (
    <section id="form" className="flex min-h-[60vh] items-center justify-center px-6 py-28 md:min-h-[70vh] md:py-40">
      <div className="text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-white/[0.04]" />
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">05</span>
          <div className="h-px w-8 bg-white/[0.04]" />
        </div>

        {["Давай", "разберёмся"].map((word, i) => (
          <div key={i} className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
              className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                i === 1 ? "text-text-muted" : ""
              }`}
            >
              {word}
            </motion.p>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-body text-sm text-text-muted md:text-base"
        >
          Ответь на пару вопросов — это займёт минуту
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <button onClick={open}
            className="cursor-pointer rounded-full bg-lime px-10 py-4 font-display text-xs font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_40px_rgba(204,255,0,0.25)] md:px-14 md:py-5 md:text-sm">
            Начать
          </button>
        </motion.div>
      </div>
    </section>
  );
}
