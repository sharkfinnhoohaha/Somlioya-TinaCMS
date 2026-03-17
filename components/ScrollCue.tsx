"use client";

import { motion } from "framer-motion";

export default function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-white/40 text-[0.6rem] tracking-[0.35em] uppercase font-sans">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-white/30"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}
