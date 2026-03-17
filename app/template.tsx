"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Aurora wipe — fades out as the incoming page renders */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[500]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          background: [
            "radial-gradient(ellipse 70% 55% at 22% 35%, rgba(0,232,122,0.22) 0%, transparent 65%)",
            "radial-gradient(ellipse 65% 50% at 78% 58%, rgba(6,182,212,0.18) 0%, transparent 65%)",
            "radial-gradient(ellipse 55% 45% at 50% 80%, rgba(99,102,241,0.14) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Page content fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
