"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  height?: string;
}

export default function PageHero({
  src,
  alt,
  title,
  subtitle,
  height = "h-[70vh] min-h-[500px]",
}: PageHeroProps) {
  return (
    <section className={`relative ${height} overflow-hidden flex items-end`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        unoptimized
        className="object-cover scale-[1.02] hover:scale-[1.06] transition-transform duration-[8000ms]"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="relative z-10 p-8 md:p-12 lg:px-[6vw] lg:pb-14">
        <motion.h1
          className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="font-heading text-white/75 text-lg font-light italic tracking-wide mt-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
