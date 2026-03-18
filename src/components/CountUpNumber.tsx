"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = easeOutCubic(progress);

      setValue(Math.floor(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
