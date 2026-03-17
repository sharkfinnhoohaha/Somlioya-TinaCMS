"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AURORA_BLOBS = [
  { w: 560, h: 220, color: "#1aff8c", opacity: 0.28, x: "65%", y: "25%", dur: 10, dx: [-70, 50],  dy: [-30, 20]  },
  { w: 440, h: 180, color: "#06b6d4", opacity: 0.24, x: "18%", y: "40%", dur: 13, dx: [40, -60],  dy: [25, -35]  },
  { w: 380, h: 160, color: "#4f46e5", opacity: 0.20, x: "45%", y: "68%", dur: 16, dx: [-50, 40],  dy: [-40, 28]  },
  { w: 300, h: 140, color: "#00d9a8", opacity: 0.22, x: "82%", y: "58%", dur: 9,  dx: [30, -40],  dy: [20, -30]  },
];

// Simplified two-lobe island outline (Sømliøya inspired)
const ISLAND_PATH =
  "M 31 4 C 43 4 51 12 51 23 C 51 34 44 40 38 43 C 45 47 53 57 51 68 C 49 79 41 86 29 86 C 17 86 9 79 9 68 C 7 57 15 47 22 43 C 16 40 9 34 9 23 C 9 12 19 4 31 4 Z";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash-shown")) return;
    sessionStorage.setItem("splash-shown", "1");
    setVisible(true);

    const minDisplay = new Promise<void>((r) => setTimeout(r, 900));
    const pageLoaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });

    Promise.all([minDisplay, pageLoaded]).then(() => setVisible(false));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030b18] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          {/* ── Northern lights ── */}
          {AURORA_BLOBS.map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: b.w,
                height: b.h,
                left: b.x,
                top: b.y,
                background: b.color,
                filter: "blur(80px)",
                opacity: b.opacity,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ x: b.dx, y: b.dy }}
              transition={{ duration: b.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
          ))}

          {/* ── Island spinner ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[130px] h-[130px] mb-9"
          >
            {/* Outer rotating dashed ring */}
            <motion.svg
              viewBox="0 0 130 130"
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="65" cy="65" r="58"
                fill="none"
                stroke="rgba(26,255,140,0.20)"
                strokeWidth="0.75"
                strokeDasharray="3 11"
              />
              {[0, 60, 120, 180, 240, 300].map((a) => {
                const rad = (a - 90) * (Math.PI / 180);
                return (
                  <circle
                    key={a}
                    cx={65 + 58 * Math.cos(rad)}
                    cy={65 + 58 * Math.sin(rad)}
                    r="1.5"
                    fill="rgba(200,169,110,0.50)"
                  />
                );
              })}
            </motion.svg>

            {/* Static island outline centred within the ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="50" height="75" viewBox="0 0 60 90">
                <defs>
                  <linearGradient id="splashIslandGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                    <stop offset="0%"   stopColor="#4cc9f0" />
                    <stop offset="55%"  stopColor="#1aff8c" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c8a96e" />
                  </linearGradient>
                </defs>
                {/* Glow layer */}
                <path
                  d={ISLAND_PATH}
                  fill="none"
                  stroke="url(#splashIslandGrad)"
                  strokeWidth="4"
                  opacity="0.18"
                  style={{ filter: "blur(4px)" }}
                />
                {/* Crisp outline */}
                <path
                  d={ISLAND_PATH}
                  fill="none"
                  stroke="url(#splashIslandGrad)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* ── Loading text ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-white/55 italic text-xl md:text-2xl font-light tracking-wide text-center px-8 max-w-xs"
          >
            Good times, and solitude are loading…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
