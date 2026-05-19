"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { isVideo } from "@/lib/media";

interface PageHeroProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  /** Poster still shown while a hero video buffers (and if autoplay is blocked). */
  poster?: string;
  height?: string;
}

export default function PageHero({
  src,
  alt,
  title,
  subtitle,
  poster,
  height = "h-[70vh] min-h-[480px]",
}: PageHeroProps) {
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <section className={`relative ${height} overflow-hidden flex items-end bg-fjord-deep`}>
      {isVideo(src) ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          title={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={82}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
      <div className="relative z-10 p-8 md:p-12 lg:px-[6vw] lg:pb-16 max-w-4xl">
        <motion.h1
          className="font-heading text-white text-h1 font-light tracking-wide text-balance"
          {...reveal(0.15)}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="font-heading text-white/85 text-lead font-light italic tracking-wide mt-3 max-w-xl"
            {...reveal(0.4)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
