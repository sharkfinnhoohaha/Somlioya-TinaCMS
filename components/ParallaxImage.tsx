"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  quality?: number;
  sizes?: string;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  /** Colour the top fade dissolves FROM — auto-sampled from the adjacent image */
  fadeTopColor?: string;
  /** Colour the bottom fade dissolves TO — auto-sampled from the adjacent image */
  fadeBottomColor?: string;
  overlay?: boolean;
  aurora?: boolean;
  children?: ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  height = "h-[65vh] min-h-[450px]",
  quality = 85,
  sizes = "100vw",
  fadeTop = false,
  fadeBottom = false,
  fadeTopColor = "#111111",
  fadeBottomColor = "#111111",
  overlay = false,
  aurora = false,
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${height}`}>
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "140%",
          top: "-20%",
          left: 0,
          y,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes={sizes}
          quality={quality}
        />
      </motion.div>

      {overlay && (
        <div className="absolute inset-0 bg-black/45 z-10" />
      )}

      {aurora && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[15]">
          <motion.div
            className="absolute rounded-full"
            style={{ width: 620, height: 260, left: "72%", top: "42%", background: "#00e87a", filter: "blur(110px)", opacity: 0.08, transform: "translate(-50%, -50%)" }}
            animate={{ x: [-75, 55], y: [-38, 28] }}
            transition={{ duration: 17, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 490, height: 210, left: "28%", top: "58%", background: "#0891b2", filter: "blur(110px)", opacity: 0.07, transform: "translate(-50%, -50%)" }}
            animate={{ x: [48, -62], y: [22, -48] }}
            transition={{ duration: 21, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 400, height: 180, left: "52%", top: "72%", background: "#6d28d9", filter: "blur(110px)", opacity: 0.06, transform: "translate(-50%, -50%)" }}
            animate={{ x: [-45, 38], y: [-30, 44] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </div>
      )}

      {fadeTop && (
        <div
          className="absolute inset-x-0 top-0 h-[35vh] pointer-events-none z-20"
          style={{ background: `linear-gradient(to bottom, ${fadeTopColor} 0%, transparent 100%)` }}
        />
      )}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 h-[35vh] pointer-events-none z-20"
          style={{ background: `linear-gradient(to top, ${fadeBottomColor} 0%, transparent 100%)` }}
        />
      )}

      {children && (
        <div className="relative z-30 h-full flex flex-col items-center justify-center px-6 py-24">
          {children}
        </div>
      )}
    </div>
  );
}
