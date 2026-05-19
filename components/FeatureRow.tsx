import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import RichText from "./RichText";
import type { TinaRichText } from "@/tina/lib/client";

interface FeatureRowProps {
  heading: string;
  body: TinaRichText | string | null | undefined;
  image: string;
  imageAlt: string;
  /** Place the image on the left (text right) from md up. */
  reverse?: boolean;
  eyebrow?: string;
}

/**
 * Alternating text + image row — the shared building block for the island,
 * staying and rituals feature sections. On mobile, text always comes before
 * the image regardless of `reverse`.
 */
export default function FeatureRow({
  heading,
  body,
  image,
  imageAlt,
  reverse = false,
  eyebrow,
}: FeatureRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
      <Reveal
        direction={reverse ? "right" : "left"}
        className={reverse ? "md:order-2" : ""}
      >
        <SectionHeading as="h2" eyebrow={eyebrow}>
          {heading}
        </SectionHeading>
        <div className="mt-6">
          <RichText value={body} />
        </div>
      </Reveal>
      <Reveal
        direction={reverse ? "left" : "right"}
        delay={0.1}
        className={reverse ? "md:order-1" : ""}
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[480px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 48vw"
            quality={80}
          />
        </div>
      </Reveal>
    </div>
  );
}
