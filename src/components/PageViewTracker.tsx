"use client";

import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

export default function PageViewTracker() {
  const sent = useRef(false);
  useEffect(() => {
    if (!sent.current) {
      sent.current = true;
      trackPageView();
    }
  }, []);
  return null;
}
