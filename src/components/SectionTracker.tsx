"use client";

import { useEffect, useRef } from "react";
import { trackSectionView, trackSectionTime } from "@/lib/analytics";

interface Props {
  name: string;
  children: React.ReactNode;
}

export default function SectionTracker({ name, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enteredAt = useRef<number | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enteredAt.current = Date.now();
          if (!tracked.current) {
            tracked.current = true;
            trackSectionView(name);
          }
        } else if (enteredAt.current) {
          trackSectionTime(name, Date.now() - enteredAt.current);
          enteredAt.current = null;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (enteredAt.current) {
        trackSectionTime(name, Date.now() - enteredAt.current);
      }
    };
  }, [name]);

  return <div ref={ref}>{children}</div>;
}
