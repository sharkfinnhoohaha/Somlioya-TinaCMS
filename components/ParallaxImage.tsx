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
  overlay?: boolean;
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
  overlay = false,
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

      {fadeTop && (
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, #111111, transparent)" }}
        />
      )}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-20"
          style={{ background: "linear-gradient(to top, #111111, transparent)" }}
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
