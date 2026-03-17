import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollCue from "@/components/ScrollCue";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

function imgSrc(sanityImg: any, fallback: string, width = 1920): string {
  if (sanityImg?.asset?._id) return urlFor(sanityImg).width(width).url();
  return fallback;
}

export default async function HomePage() {
  const data = await client.fetch(HOME_PAGE_QUERY).catch(() => null);

  const heroTitle = data?.hero?.title ?? "Sømliøya";
  const heroSubtitle = data?.hero?.subtitle ?? "Where the world becomes quieter";
  const heroSrc = imgSrc(data?.hero?.image, "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg");
  const heroAlt = data?.hero?.image?.alt ?? "Aerial view of Sømliøya in winter light";

  const firstImageSrc = imgSrc(data?.firstImage, "/images/IMG_9794.jpeg");
  const firstImageAlt = data?.firstImage?.alt ?? "Mirror-still fjord at sunset with mountains";
  const secondImageSrc = imgSrc(data?.secondImage, "/images/14cbdfe1c283435fb747c96413ad655d.jpg");
  const secondImageAlt = data?.secondImage?.alt ?? "Dramatic orange and pink sunset over the Norwegian fjord";

  const poeticParagraphs = data?.poeticParagraphs ?? [
    "Water that constantly changes colour. Skies that shift slowly, from grey, gold, blue, sometimes pink.",
    "The weather moves quickly, the wind comes and goes.",
    "The island is small. Simple. Private.",
    "No roads, no traffic, only water and rocks. Birds, trees and space.",
  ];

  const secondParagraphs = data?.secondParagraphs ?? [
    "You come here to be. To write. To think.",
    "Some come to celebrate something. Others come to say goodbye.",
    "Fires are lit by the edge of the water, fish are caught and eaten, kayaks glide through the fjord.",
  ];

  const pullQuote = data?.pullQuote ?? "It is a place where you can step outside the world for a while.";
  const mapHeading = data?.mapCta?.heading ?? "See the island from above";
  const mapDescription = data?.mapCta?.description ?? "An interactive 3D model of Sømliøya rendered in real time from satellite data. Fly over the fjords, explore the coastline.";

  return (
    <div style={{ background: "#111111" }}>
      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 animate-slow-zoom">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/60" />
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #111111 0%, transparent 100%)" }}
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className="font-heading text-white font-light tracking-[0.08em] leading-tight opacity-0 animate-fade-up"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", animationDelay: "0.3s" }}
          >
            {heroTitle}
          </h1>
          <p
            className="font-heading text-white/80 italic font-light tracking-wide mt-3 mb-12 opacity-0 animate-fade-up"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", animationDelay: "0.6s" }}
          >
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
            <Link href="/island" className="text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white text-charcoal hover:bg-gold hover:text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500">
              Explore
            </Link>
            <Link href="/contact" className="text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500">
              Contact Us
            </Link>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ═══════ POETIC INTRO ═══════ */}
      <ParallaxImage src={firstImageSrc} alt={firstImageAlt} height="min-h-[90vh]" fadeTop fadeBottom overlay quality={85}>
        <div className="max-w-2xl w-full mx-auto">
          <Reveal><div className="divider mb-10" /></Reveal>
          {poeticParagraphs.map((para: string, i: number) => (
            <Reveal key={i} delay={0.1 * (i + 1)} className={i > 0 ? "mt-6" : ""}>
              <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">{para}</p>
            </Reveal>
          ))}
        </div>
      </ParallaxImage>

      {/* ═══════ SECOND TEXT + MAP CTA ═══════ */}
      <ParallaxImage src={secondImageSrc} alt={secondImageAlt} height="min-h-[120vh]" fadeTop fadeBottom overlay quality={85}>
        <div className="max-w-2xl w-full mx-auto text-center">
          {secondParagraphs.map((para: string, i: number) => (
            <Reveal key={i} delay={0.1 * i} className={i > 0 ? "mt-6" : ""}>
              <p className="font-sans text-white/85 font-light leading-[1.9] text-xl md:text-2xl">{para}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-10">
            <div className="divider mx-auto mb-8" />
            <p className="font-heading text-gold italic text-2xl md:text-3xl font-light">{pullQuote}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-20">
            <p className="font-sans text-white/40 text-[0.7rem] uppercase tracking-[0.35em] mb-4">65°03′N · 11°55′E</p>
            <h2 className="font-heading text-white font-light tracking-wide text-3xl md:text-4xl mb-5">{mapHeading}</h2>
            <p className="font-sans text-white/65 font-light leading-relaxed text-lg mb-8 max-w-md mx-auto">{mapDescription}</p>
            <Link href="/map" className="inline-block text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white/10 border border-white/40 text-white hover:bg-gold hover:border-gold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500">
              Open 3D Map
            </Link>
          </Reveal>
        </div>
      </ParallaxImage>

      <Footer />
    </div>
  );
}
