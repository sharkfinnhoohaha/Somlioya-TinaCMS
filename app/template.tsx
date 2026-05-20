"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-page transition. A quiet cross-page fade with a faint warm tint that
 * passes through during the swap — barely perceptible, never delays paint.
 * The tint is GPU-only (opacity on a fixed gradient layer), so it can't
 * affect layout or scroll performance.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.07, 0] }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 1] }}
          className="pointer-events-none fixed inset-0 z-[9998]"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(200,169,110,0.55) 0%, rgba(44,62,80,0.35) 45%, transparent 80%)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </>
  );
}
