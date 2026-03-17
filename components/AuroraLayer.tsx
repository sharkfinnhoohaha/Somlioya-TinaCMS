"use client";

import { motion } from "framer-motion";

const BLOBS = [
  { w: 700, h: 280, color: "#00e87a", opacity: 0.10, x: "72%", y: "32%", dx: [-90, 60],  dy: [-45, 35], dur: 14 },
  { w: 560, h: 230, color: "#0891b2", opacity: 0.09, x: "22%", y: "55%", dx: [55, -70],  dy: [30, -55], dur: 18 },
  { w: 460, h: 190, color: "#6d28d9", opacity: 0.07, x: "50%", y: "72%", dx: [-50, 65],  dy: [-55, 30], dur: 22 },
];

export default function AuroraLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.w,
            height: b.h,
            left: b.x,
            top: b.y,
            background: b.color,
            filter: "blur(100px)",
            opacity: b.opacity,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ x: b.dx, y: b.dy }}
          transition={{ duration: b.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
