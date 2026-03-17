"use client";

import Image from "next/image";
import { useRef } from "react";

interface GalleryImage {
  src?: string;
  alt?: string;
}

export default function StayingGallery({ images }: { images: GalleryImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="overflow-x-auto hide-scrollbar whitespace-nowrap py-6 px-[6vw]">
      {images.map((img, i) => (
        <div key={i} className="inline-block relative h-[50vh] min-h-[350px] w-auto mr-4 last:mr-0">
          <Image
            src={img.src ?? ""}
            alt={img.alt ?? ""}
            width={700}
            height={500}
            unoptimized
            className="h-full w-auto object-cover"
            quality={75}
          />
        </div>
      ))}
    </div>
  );
}
