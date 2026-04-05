"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollCue from "@/components/ScrollCue";
import RichText from "@/components/RichText";
import AuroraLayer from "@/components/AuroraLayer";
import { useRipple } from "@/hooks/useRipple";
import AnimatedDivider from "@/components/AnimatedDivider";
import { useImageEdgeColor } from "@/hooks/useImageEdgeColor";
import { useTina } from "tinacms/dist/react";
import { isVideo } from "@/lib/media";

export default function HomePageClient(props: {
  data: any;
  query: string;
  variables: object;
}) {
  const { data } = useTina(props);
  const page = data.homePage;

  const rippleExplore = useRipple();
  const rippleContact = useRipple();
  const rippleMap = useRipple();

  const heroTitle = page?.hero?.title ?? "Sømliøya";
  const heroSubtitle = page?.hero?.subtitle ?? "Where the world becomes quieter";
  const heroSrc = page?.hero?.image ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg";
  const heroAlt = page?.hero?.imageAlt ?? "Aerial view of Sømliøya in winter light";

  const firstImageSrc = page?.firstImage?.src ?? "/images/IMG_9794.jpeg";
  const firstImageAlt = page?.firstImage?.alt ?? "Mirror-still fjord at sunset with mountains";
  const secondImageSrc = page?.secondImage?.src ?? "/images/14cbdfe1c283435fb747c96413ad655d.jpg";
  const secondImageAlt = page?.secondImage?.alt ?? "Dramatic orange and pink sunset over the Norwegian fjord";

  const poeticParagraphs = page?.poeticParagraphs ?? null;
  const secondParagraphs = page?.secondParagraphs ?? null;

  const pullQuote = page?.pullQuote ?? "It is a place where you can step outside the world for a while.";
  const mapHeading = page?.mapCta?.heading ?? "See the island from above";
  const mapDescription = page?.mapCta?.description ?? null;

  // ── Adaptive transition colours ──────────────────────────────────────────
  const bridgeHeroFirst  = useImageEdgeColor(firstImageSrc,  "top");
  const bridgeFirstSecond = useImageEdgeColor(secondImageSrc, "top");
  const secondBottom     = useImageEdgeColor(secondImageSrc, "bottom");

  return (
    <div style={{ background: "#0a0a0a" }}>
      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className={`absolute inset-0 ${isVideo(heroSrc) ? "" : "animate-slow-zoom"}`}>
          {isVideo(heroSrc) ? (
            <video
              src={heroSrc}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroAlt}
              title={heroAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/60" />

        {/* Aurora ambient layer — drifts continuously above the gradient */}
        <AuroraLayer />

        {/* Adaptive hero→section-1 fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{ background: `linear-gradient(to top, ${bridgeHeroFirst} 0%, transparent 100%)` }}
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
            <Link href="/island" onClick={rippleExplore.trigger} className="relative overflow-visible text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white text-charcoal hover:bg-gold hover:text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500">
              Explore
              {rippleExplore.rippleElements}
            </Link>
            <Link href="/contact" onClick={rippleContact.trigger} className="relative overflow-visible text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500">
              Contact Us
              {rippleContact.rippleElements}
            </Link>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ═══════ POETIC INTRO ═══════ */}
      <ParallaxImage
        src={firstImageSrc}
        alt={firstImageAlt}
        height="min-h-[90vh]"
        fadeTop
        fadeBottom
        fadeTopColor={bridgeHeroFirst}
        fadeBottomColor={bridgeFirstSecond}
        overlay
        aurora
        quality={85}
      >
        <div className="max-w-2xl w-full mx-auto text-center">
          <AnimatedDivider className="mx-auto mb-10" />
          <Reveal delay={0.15}>
            <RichText value={poeticParagraphs} dark />
          </Reveal>
        </div>
      </ParallaxImage>

      {/* ═══════ SECOND TEXT + MAP CTA ═══════ */}
      <ParallaxImage
        src={secondImageSrc}
        alt={secondImageAlt}
        height="min-h-[120vh]"
        fadeTop
        fadeBottom
        fadeTopColor={bridgeFirstSecond}
        fadeBottomColor={secondBottom}
        overlay
        aurora
        quality={85}
      >
        <div className="max-w-2xl w-full mx-auto text-center">
          <Reveal>
            <RichText value={secondParagraphs} dark />
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <AnimatedDivider className="mx-auto mb-8" />
            <p className="font-heading text-gold italic text-2xl md:text-3xl font-light">{pullQuote}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-20">
            <p className="font-sans text-white/40 text-[0.7rem] uppercase tracking-[0.35em] mb-4">65°03′N · 11°55′E</p>
            <h2 className="font-heading text-white font-light tracking-wide text-3xl md:text-4xl mb-5">{mapHeading}</h2>
            {mapDescription ? (
              <div className="text-white/65 font-light leading-relaxed text-lg mb-8 max-w-md mx-auto">
                <RichText value={mapDescription} dark />
              </div>
            ) : (
              <p className="font-sans text-white/65 font-light leading-relaxed text-lg mb-8 max-w-md mx-auto">
                An interactive 3D model of Sømliøya rendered in real time from satellite data. Fly over the fjords, explore the coastline.
              </p>
            )}
            <Link href="/map" onClick={rippleMap.trigger} className="relative overflow-visible inline-block text-[0.8rem] font-sans font-medium tracking-[0.25em] uppercase px-10 py-4 bg-white/10 border border-white/40 text-white hover:bg-gold hover:border-gold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-500">
              Open 3D Map
              {rippleMap.rippleElements}
            </Link>
          </Reveal>
        </div>
      </ParallaxImage>

      <Footer />
    </div>
  );
}
