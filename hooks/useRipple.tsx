"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";

interface RippleEntry {
  id: number;
  x: number;
  y: number;
}

export function useRipple() {
  const [ripples, setRipples] = useState<RippleEntry[]>([]);

  const trigger = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    // Remove after the slowest ring's animation completes
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900);
  }, []);

  const rippleElements = ripples.flatMap(({ id, x, y }) =>
    [0, 1, 2].map((ring) => (
      <motion.span
        key={`${id}-${ring}`}
        aria-hidden
        className="absolute rounded-full border pointer-events-none"
        style={{
          left: x,
          top: y,
          width: 60 + ring * 30,
          height: 60 + ring * 30,
          borderColor: "currentColor",
        }}
        initial={{ scale: 0, opacity: 0.5, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{
          duration: 0.55 + ring * 0.1,
          ease: "easeOut",
          delay: ring * 0.08,
        }}
      />
    ))
  );

  return { trigger, rippleElements };
}
