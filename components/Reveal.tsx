"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "left" | "right";

const variants: Record<Direction, { initial: object; animate: object }> = {
  up:    { initial: { opacity: 0, y: 20 },  animate: { opacity: 1, y: 0 } },
  left:  { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 32 },  animate: { opacity: 1, x: 0 } },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const { initial, animate } = variants[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
