"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  paragraphs: string[];
}

export default function AnimatedText({ paragraphs }: AnimatedTextProps) {
  return (
    <div className="space-y-6">
      {paragraphs.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="text-lg leading-relaxed text-muted md:text-xl"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
