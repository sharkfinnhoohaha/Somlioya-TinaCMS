import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StayingGallery from "@/components/StayingGallery";
import { getStayingPage } from "@/tina/lib/client";
import RichText from "@/components/RichText";

export default async function StayingPage() {
  const data = getStayingPage();

  const heroSrc = data?.hero?.image ?? "/images/569F22A4217156A6F9DEF31BB8B2F7CC.JPG";
  const heroAlt = data?.hero?.imageAlt ?? "Aerial view of island buildings surrounded by forest and fjord";

  const intro = data?.intro ?? null;

  const buildingImgs = data?.buildingImages?.length
    ? data.buildingImages
    : [
        { src: "/images/A4D4C1444081F165FD87951C3F619B8B.jpg", alt: "Aerial view of both island buildings" },
        { src: "/images/IMG_3215.jpeg", alt: "Main house exterior with stairs and pine tree" },
      ];

  const sleeping = data?.sleepingSection ?? { heading: "Sleeping", paragraphs: null, image: undefined, imageAlt: undefined };
  const sharedSpaces = data?.sharedSpacesSection ?? { heading: "Shared Spaces", paragraphs: null };

  const galleryImages = data?.galleryImages?.length
    ? data.galleryImages.map((img) => ({ src: img.src ?? "", alt: img.alt ?? "" }))
    : [
        { src: "/images/IMG_7429.jpeg", alt: "Gathering room with tables and sunflower paintings" },
        { src: "/images/IMG_7414.jpeg", alt: "Large dining room with wooden floors" },
        { src: "/images/IMG_7422.jpeg", alt: "Living room with fireplace and couches" },
        { src: "/images/IMG_1256.jpeg", alt: "People cooking together in the kitchen" },
        { src: "/images/IMG_5123.jpeg", alt: "Outdoor picnic tables with fjord view" },
        { src: "/images/IMG_6710.jpeg", alt: "Yellow house exterior with wooden deck" },
      ];

  const groupSpaces = data?.groupSpacesSection ?? { heading: "Group Spaces", paragraphs: null };

  const closingImgSrc = data?.closingImage?.src ?? "/images/IMG_5184.jpeg";
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
        <RichText value={intro} />
      </Reveal>

      {/* Building image pair */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {buildingImgs.map((img, i) => (
          <div key={i} className="relative h-[45vh] min-h-[300px]">
            <Image src={img.src ?? ""} alt={img.alt ?? ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" quality={80} />
          </div>
        ))}
      </Reveal>

      {/* Sleeping */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1400px] mx-auto px-6 md:px-[6vw] py-16">
        <div>
          <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-5">{sleeping.heading}</h3>
          <div className="divider mb-6" />
          <RichText value={sleeping.paragraphs} />
        </div>
        <div className="relative h-[500px]">
          <Image
            src={sleeping.image ?? "/images/IMG_3202.jpeg"}
            alt={sleeping.imageAlt ?? "Main house with deck, garden and dog"}
            fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" quality={80}
          />
        </div>
      </Reveal>

      {/* Shared Spaces */}
      <Reveal className="max-w-[1400px] mx-auto px-6 md:px-[6vw] py-10">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{sharedSpaces.heading}</h3>
        <div className="divider mb-6" />
        <RichText value={sharedSpaces.paragraphs} className="max-w-2xl" />
      </Reveal>

      {/* Gallery */}
      <Reveal><StayingGallery images={galleryImages} /></Reveal>

      {/* Group Spaces */}
      <Reveal className="max-w-2xl mx-auto px-6 py-16">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">{groupSpaces.heading}</h3>
        <div className="divider mb-6" />
        <RichText value={groupSpaces.paragraphs} />
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
