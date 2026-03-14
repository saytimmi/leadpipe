"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  paragraphs: string[];
}

export default function AnimatedText({ paragraphs }: AnimatedTextProps) {
  return (
    <div className="space-y-8">
      {paragraphs.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
          className="text-xl leading-relaxed text-muted md:text-2xl"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
