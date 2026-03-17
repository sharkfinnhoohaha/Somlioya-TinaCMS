"use client";

import { motion } from "framer-motion";

export default function AnimatedDivider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`w-[60px] h-px bg-gold ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "center" }}
    />
  );
}
