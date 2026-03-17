"use client";

import Image from "next/image";

interface ActivityCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function ActivityCard({
  src,
  alt,
  title,
  description,
}: ActivityCardProps) {
  return (
    <div className="group relative overflow-hidden h-[420px] cursor-pointer">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
        sizes="(max-width:768px) 100vw, 33vw"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 group-hover:via-black/20 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
        <h4 className="font-heading text-white text-2xl font-normal mb-2">
          {title}
        </h4>
        <p className="text-white/75 text-sm leading-relaxed font-light max-h-0 overflow-hidden opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-500">
          {description}
        </p>
      </div>
    </div>
  );
}
