"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "left" | "right";
type AnimState = { opacity: number; x?: number; y?: number };

const OFFSET = 24;

const variants: Record<Direction, { initial: AnimState; animate: AnimState }> = {
  up:    { initial: { opacity: 0, y: OFFSET },  animate: { opacity: 1, y: 0 } },
  left:  { initial: { opacity: 0, x: -OFFSET }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: OFFSET },  animate: { opacity: 1, x: 0 } },
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
  const reduce = useReducedMotion();
  const { initial, animate } = variants[direction];

  return (
    <motion.div
      initial={reduce ? false : initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
