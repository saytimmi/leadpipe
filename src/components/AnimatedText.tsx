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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xl leading-[1.8] text-muted md:text-2xl"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
