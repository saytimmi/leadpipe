"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  paragraphs: string[];
  light?: boolean;
}

function SplitWords({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="font-body text-xl leading-[1.9] md:text-2xl"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: delay + i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function AnimatedText({ paragraphs, light }: AnimatedTextProps) {
  return (
    <div className={`space-y-8 ${light ? "text-white/60" : "text-white/50"}`}>
      {paragraphs.map((text, i) => (
        <SplitWords key={i} text={text} delay={i * 0.08} />
      ))}
    </div>
  );
}
