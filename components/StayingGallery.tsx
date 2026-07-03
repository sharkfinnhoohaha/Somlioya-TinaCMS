"use client";

import SafeImage from "./SafeImage";
import { useRef } from "react";

interface GalleryImage {
  src?: string;
  alt?: string;
}

export default function StayingGallery({ images }: { images: GalleryImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery — scroll to see more"
        onKeyDown={onKeyDown}
        className="overflow-x-auto hide-scrollbar flex gap-4 py-6 px-6 md:px-10 snap-x"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 snap-start h-[52vh] min-h-[320px] w-[85vw] md:w-[38vw] aspect-[4/3] bg-fjord-deep"
          >
            <SafeImage
              src={img.src ?? ""}
              alt={img.alt ?? ""}
              fill
              className="object-contain"
              sizes="(max-width:768px) 85vw, 38vw"
              quality={75}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Previous photos"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-ivory/90 text-fjord-deep shadow-lg hover:bg-ivory transition-colors"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Next photos"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-ivory/90 text-fjord-deep shadow-lg hover:bg-ivory transition-colors"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
