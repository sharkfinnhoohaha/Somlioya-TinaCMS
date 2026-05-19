"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`w-[60px] h-px bg-gold ${className}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "center" }}
    />
  );
}
