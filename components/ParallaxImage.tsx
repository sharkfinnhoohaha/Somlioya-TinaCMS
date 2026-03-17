"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  quality?: number;
  sizes?: string;
  fadeTop?: boolean;
  fadeBottom?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  height = "h-[65vh] min-h-[450px]",
  quality = 85,
  sizes = "100vw",
  fadeTop = false,
  fadeBottom = false,
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
          className="object-cover"
          sizes={sizes}
          quality={quality}
        />
      </motion.div>

      {fadeTop && (
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, #FAFAF8, transparent)" }}
        />
      )}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }}
        />
      )}
    </div>
  );
}
