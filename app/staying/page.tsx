import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StayingGallery from "@/components/StayingGallery";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { STAYING_PAGE_QUERY } from "@/sanity/lib/queries";

function imgSrc(sanityImg: any, fallback: string, width = 1200): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

const DEFAULT_GALLERY = [
  { _key: "g1", src: "/images/IMG_7429.jpeg", alt: "Gathering room with tables and sunflower paintings" },
  { _key: "g2", src: "/images/IMG_7414.jpeg", alt: "Large dining room with wooden floors" },
  { _key: "g3", src: "/images/IMG_7422.jpeg", alt: "Living room with fireplace and couches" },
  { _key: "g4", src: "/images/IMG_1256.jpeg", alt: "People cooking together in the kitchen" },
  { _key: "g5", src: "/images/IMG_5123.jpeg", alt: "Outdoor picnic tables with fjord view" },
  { _key: "g6", src: "/images/IMG_6710.jpeg", alt: "Yellow house exterior with wooden deck" },
];

export default async function StayingPage() {
  const data = await client.fetch(STAYING_PAGE_QUERY).catch(() => null);

  const heroSrc = imgSrc(data?.hero?.image, "/images/569F22A4217156A6F9DEF31BB8B2F7CC.JPG");
  const heroAlt = data?.hero?.image?.alt ?? "Aerial view of island buildings surrounded by forest and fjord";

  const intro = data?.intro ?? [
    "Life on Sømliøya is simple and shared.",
    "There are two buildings on the island, offering space for sleeping, gathering and spending time together. The houses are modest and practical, designed for small groups who come to stay close to nature.",
  ];

  const buildingImgs = data?.buildingImages?.length
    ? data.buildingImages.map((img: any) => ({
        src: img.asset?._id ? urlFor(img).width(1200).url() : "/images/A4D4C1444081F165FD87951C3F619B8B.jpg",
        alt: img.alt ?? "",
      }))
    : [
        { src: "/images/A4D4C1444081F165FD87951C3F619B8B.jpg", alt: "Aerial view of both island buildings" },
        { src: "/images/IMG_3215.jpeg", alt: "Main house exterior with stairs and pine tree" },
      ];

  const sleeping = data?.sleepingSection ?? {
    heading: "Sleeping",
    paragraphs: [
      "The island has simple bedrooms spread across both buildings. Most rooms are small and quiet, intended mainly as a comfortable place to rest after a day outside.",
      "For those who prefer sleeping closer to the landscape, there is of course also space to pitch a tent on the island.",
      "Accommodation on Sømliøya is intentionally simple, in keeping with the character of the place.",
    ],
  };

  const sharedSpaces = data?.sharedSpacesSection ?? {
    heading: "Shared Spaces",
    paragraphs: [
      "The main house contains a large shared kitchen and living room, where people cook, eat and spend the evenings together. A fireplace makes it a warm place to gather after time outside by the water.",
      "Bathrooms are shared, with toilets and hot showers available.",
    ],
  };

  const galleryImages = data?.galleryImages?.length
    ? data.galleryImages.map((img: any) => ({
        _key: img._key,
        url: img.asset?._id ? urlFor(img).width(1000).url() : undefined,
        alt: img.alt ?? "",
      }))
    : DEFAULT_GALLERY;

  const groupSpaces = data?.groupSpacesSection ?? {
    heading: "Group Spaces",
    paragraphs: [
      "The second building on the island serves as a workshop and gathering space for groups, retreats and creative work. Some additional simple bedrooms are also located here.",
      "In the basement of the main house, there is another room that can be used for meetings, workshops or quiet work.",
    ],
  };

  const closingImgSrc = imgSrc(data?.closingImage, "/images/IMG_5184.jpeg");
  const closingImgAlt = data?.closingImage?.alt ?? "Outdoor volleyball net surrounded by forest";

  return (
    <>
      <Nav />
      <PageHero
        src={heroSrc}
        alt={heroAlt}
        title={data?.hero?.title ?? "Sleeping & Living"}
        subtitle={data?.hero?.subtitle ?? "Intentionally simple, shared, and close to nature."}
      />

      <Reveal className="max-w-2xl mx-auto px-6 py-20">
        <div className="divider mb-8" />
        {intro.map((para: string, i: number) => (
          <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
        ))}
      </Reveal>

      {/* Building image pair */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {buildingImgs.map((img: any, i: number) => (
          <div key={i} className="relative h-[45vh] min-h-[300px]">
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" quality={80} />
          </div>
        ))}
      </Reveal>

      {/* Sleeping */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{sleeping.heading}</h3>
          <div className="divider mb-6" />
          {(sleeping.paragraphs ?? []).map((para: string, i: number) => (
            <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
          ))}
        </div>
        <div className="relative h-[500px]">
          <Image
            src={imgSrc(sleeping.image, "/images/IMG_3202.jpeg")}
            alt={sleeping.image?.alt ?? "Main house with deck, garden and dog"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      {/* Shared Spaces */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-10">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{sharedSpaces.heading}</h3>
        <div className="divider mb-6" />
        {(sharedSpaces.paragraphs ?? []).map((para: string, i: number) => (
          <p key={i} className={`font-sans text-smoke font-light leading-[1.85] max-w-2xl${i > 0 ? " mt-5" : ""}`}>{para}</p>
        ))}
      </Reveal>

      {/* Gallery */}
      <Reveal><StayingGallery images={galleryImages} /></Reveal>

      {/* Group Spaces */}
      <Reveal className="max-w-2xl mx-auto px-6 py-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{groupSpaces.heading}</h3>
        <div className="divider mb-6" />
        {(groupSpaces.paragraphs ?? []).map((para: string, i: number) => (
          <p key={i} className={`font-sans text-smoke font-light leading-[1.85]${i > 0 ? " mt-5" : ""}`}>{para}</p>
        ))}
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image src={closingImgSrc} alt={closingImgAlt} fill className="object-cover" sizes="100vw" quality={80} />
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
