import Image from "next/image";
import Reveal from "./Reveal";

/** Full-width image band used to break up long pages. */
export default function FullBleedImage({
  src,
  alt,
  height = "h-[60vh] min-h-[380px]",
}: {
  src: string;
  alt: string;
  height?: string;
}) {
  return (
    <Reveal>
      <div className={`relative w-full ${height}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={82}
        />
      </div>
    </Reveal>
  );
}
