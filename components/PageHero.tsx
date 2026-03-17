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
        className="object-cover scale-[1.02] hover:scale-[1.06] transition-transform duration-[8000ms]"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <motion.div
        className="relative z-10 p-8 md:p-12 lg:px-[6vw] lg:pb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-heading text-white/75 text-lg font-light italic tracking-wide mt-3">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
