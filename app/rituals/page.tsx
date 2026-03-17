import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { RITUALS_PAGE_QUERY } from "@/sanity/lib/queries";

function imgSrc(sanityImg: any, fallback: string, width = 1200): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

export default async function RitualsPage() {
  const data = await client.fetch(RITUALS_PAGE_QUERY).catch(() => null);

  const heroSrc = imgSrc(data?.hero?.image, "/images/IMG_5345.jpeg");
  const heroAlt = data?.hero?.image?.alt ?? "Decorated fabric banners hanging from birch trees with set table behind";

  const intro = data?.intro ?? [
    "A place to pause, to reflect, and to mark something that matters.",
    "On Sømliøya we create space for personal rituals — simple, meaningful moments connected to the landscape and the sea.",
    "Across cultures and throughout history, people have created rituals to give shape to important moments in life. Birth, loss, transitions, promises, endings and beginnings. Rituals help us slow down, step outside daily life and acknowledge what has changed.",
  ];

  const midImgSrc = imgSrc(data?.midImage, "/images/IMG_5352.jpeg");
  const midImgAlt = data?.midImage?.alt ?? "Community gathering at table under decorated fabric banners";

  const secondParagraphs = data?.secondParagraphs ?? [
    "The island offers a quiet setting for these moments. Open, natural and removed from the noise of the world.",
    "People come here for many different reasons. To say goodbye to someone they loved. To scatter the ashes of a person or a beloved animal. To celebrate a new beginning. To mark a turning point in life. To gather family or friends around a shared memory.",
    "Some simply want a place to pause and acknowledge something important.",
  ];

  const shaped = data?.shapedTogetherSection ?? {
    heading: "Shaped Together",
    paragraphs: [
      "If you wish, we can help shape a ritual that fits you and the moment.",
      "The rituals on Sømliøya are created together with Marijke Ottema, a psychologist, and Maria Groot, an artist. Together we combine psychological insight with creative and symbolic elements to design something personal and meaningful.",
      "Some rituals are very simple: a walk across the island, a fire by the water, a few words spoken at the edge of the fjord. Others may include music, writing, symbolic gestures, or time spent in silence.",
      "Each ritual is different and always shaped in conversation with the people involved.",
    ],
  };

  const gatherings = data?.gatheringsSection ?? {
    heading: "Other Gatherings",
    paragraphs: [
      "The island can also be used for other meaningful gatherings — small family celebrations, remembering someone together, marking an anniversary or transition, trying out an idea or ceremony, or creative and reflective gatherings with friends.",
      "The landscape often becomes part of the experience.",
    ],
    pullQuote: "Sømliøya does not prescribe how these moments should look. It just offers the space — and sometimes a little guidance in shaping something that feels right.",
  };

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={data?.hero?.title ?? "Rituals"}
        subtitle={data?.hero?.subtitle ?? "Some moments in life ask for a place."}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        {intro.map((para: string, i: number) => (
          <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
        ))}
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image src={midImgSrc} alt={midImgAlt} fill className="object-cover" sizes="100vw" quality={85} />
        </div>
      </Reveal>

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        {secondParagraphs.map((para: string, i: number) => (
          <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
        ))}
      </Reveal>

      {/* Shaped Together */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{shaped.heading}</h3>
          <div className="divider mb-6" />
          {(shaped.paragraphs ?? []).map((para: string, i: number) => (
            <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
          ))}
        </div>
        <div className="relative h-[500px]">
          <Image
            src={imgSrc(shaped.image, "/images/IMG_9780.jpeg")}
            alt={shaped.image?.alt ?? "Artist painting at an easel among birch trees"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      {/* Other Gatherings */}
      <div className="bg-bone">
        <Reveal className="max-w-2xl mx-auto px-6 py-20">
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{gatherings.heading}</h3>
          <div className="divider mb-6" />
          {(gatherings.paragraphs ?? []).map((para: string, i: number) => (
            <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
          ))}
          <div className="divider my-8" />
          <p className="font-heading text-fjord italic text-lg font-light">{gatherings.pullQuote}</p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
