"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll();

  // Orb 1: accent blue → purple
  const orb1X = useTransform(scrollYProgress, [0, 0.5, 1], ["15%", "60%", "30%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "40%", "80%"]);
  const orb1Color = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(0, 71, 255, 0.15)",
      "rgba(124, 58, 237, 0.18)",
      "rgba(255, 107, 53, 0.12)",
      "rgba(0, 71, 255, 0.15)",
      "rgba(124, 58, 237, 0.1)",
    ]
  );

  // Orb 2: warm → accent
  const orb2X = useTransform(scrollYProgress, [0, 0.5, 1], ["75%", "25%", "65%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "20%", "50%"]);
  const orb2Color = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(124, 58, 237, 0.12)",
      "rgba(255, 107, 53, 0.15)",
      "rgba(0, 71, 255, 0.12)",
      "rgba(124, 58, 237, 0.15)",
      "rgba(0, 71, 255, 0.08)",
    ]
  );

  // Orb 3: subtle accent
  const orb3X = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "80%", "20%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 0.5, 1], ["80%", "60%", "30%"]);
  const orb3Color = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(255, 107, 53, 0.08)",
      "rgba(0, 71, 255, 0.1)",
      "rgba(124, 58, 237, 0.12)",
      "rgba(255, 107, 53, 0.1)",
      "rgba(124, 58, 237, 0.06)",
    ]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Orb 1 - large */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          left: orb1X,
          top: orb1Y,
          backgroundColor: orb1Color,
          filter: "blur(120px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Orb 2 - medium */}
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          left: orb2X,
          top: orb2Y,
          backgroundColor: orb2Color,
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Orb 3 - small accent */}
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: orb3X,
          top: orb3Y,
          backgroundColor: orb3Color,
          filter: "blur(90px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
    </div>
  );
}
