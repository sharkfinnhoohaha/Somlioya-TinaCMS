"use client";

import SafeImage from "./SafeImage";

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
    <div className="group relative overflow-hidden h-[420px]">
      <SafeImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
        sizes="(max-width:768px) 100vw, 33vw"
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-heading text-white text-h3 font-normal mb-2">
          {title}
        </h3>
        {/* Always visible on touch screens; revealed on hover from md up */}
        <p className="text-white/85 text-caption leading-relaxed overflow-hidden transition-all duration-500 max-h-40 opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
          {description}
        </p>
      </div>
    </div>
  );
}
