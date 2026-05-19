"use client";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollCue from "@/components/ScrollCue";
import RichText from "@/components/RichText";
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

  const heroTitle = page?.hero?.title ?? "Sømliøya";
  const heroSubtitle = page?.hero?.subtitle ?? "Where the world becomes quieter";
  const heroSrc = page?.hero?.image ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg";
  const heroAlt = page?.hero?.imageAlt ?? "Aerial view of Sømliøya in winter light";
  const heroPoster =
    page?.hero?.posterImage ?? "/images/352DA88B4DA84CDEBDF5A7A07AB23C3F.jpg";
  const heroIsVideo = isVideo(heroSrc);

  const firstImageSrc = page?.firstImage?.src ?? "/images/IMG_9794.jpeg";
  const firstImageAlt =
    page?.firstImage?.alt ?? "Mirror-still fjord at sunset with mountains";
  const secondImageSrc =
    page?.secondImage?.src ?? "/images/14cbdfe1c283435fb747c96413ad655d.jpg";
  const secondImageAlt =
    page?.secondImage?.alt ??
    "Dramatic orange and pink sunset over the Norwegian fjord";

  const poeticParagraphs = page?.poeticParagraphs ?? null;
  const secondParagraphs = page?.secondParagraphs ?? null;

  const pullQuote =
    page?.pullQuote ??
    "It is a place where you can step outside the world for a while.";
  const mapHeading = page?.mapCta?.heading ?? "See the island from above";
  const mapDescription = page?.mapCta?.description ?? null;

  // Adaptive transition colours — sampled from the adjacent images.
  const bridgeHeroFirst = useImageEdgeColor(firstImageSrc, "top");
  const bridgeFirstSecond = useImageEdgeColor(secondImageSrc, "top");
  const secondBottom = useImageEdgeColor(secondImageSrc, "bottom");

  return (
    <div style={{ background: "#0a0a0a" }}>
      <Nav />
      <main id="main-content">
        {/* ═══════ HERO ═══════ */}
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-fjord-deep">
          <div className={`absolute inset-0 ${heroIsVideo ? "" : "animate-slow-zoom"}`}>
            {heroIsVideo ? (
              <video
                src={heroSrc}
                poster={heroPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
                className="object-cover"
                sizes="100vw"
                quality={85}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/65" />

          {/* Adaptive hero → section-1 fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
            style={{ background: `linear-gradient(to top, ${bridgeHeroFirst} 0%, transparent 100%)` }}
          />

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
            <h1
              className="font-heading text-display text-white font-light tracking-[0.06em] opacity-0 animate-fade-up text-balance"
              style={{ animationDelay: "0.3s" }}
            >
              {heroTitle}
            </h1>
            <p
              className="font-heading text-lead text-white/85 italic font-light tracking-wide mt-3 mb-12 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              {heroSubtitle}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.8s" }}
            >
              <Button href="/island" variant="primary" onDark>
                Explore
              </Button>
              <Button href="/contact" variant="secondary" onDark>
                Contact Us
              </Button>
            </div>
          </div>
          <ScrollCue />
        </section>

        {/* ═══════ POETIC INTRO ═══════ */}
        <ParallaxImage
          src={firstImageSrc}
          alt={firstImageAlt}
          height="min-h-[85vh]"
          fadeTop
          fadeBottom
          fadeTopColor={bridgeHeroFirst}
          fadeBottomColor={bridgeFirstSecond}
          overlay
          quality={82}
        >
          <div className="max-w-xl w-full mx-auto text-center">
            <AnimatedDivider className="mx-auto mb-9" />
            <Reveal delay={0.1}>
              <RichText value={poeticParagraphs} dark />
            </Reveal>
          </div>
        </ParallaxImage>

        {/* ═══════ SECOND TEXT + MAP CTA ═══════ */}
        <ParallaxImage
          src={secondImageSrc}
          alt={secondImageAlt}
          height="min-h-[100vh]"
          fadeTop
          fadeBottom
          fadeTopColor={bridgeFirstSecond}
          fadeBottomColor={secondBottom}
          overlay
          quality={82}
        >
          <div className="max-w-xl w-full mx-auto text-center">
            <Reveal>
              <RichText value={secondParagraphs} dark />
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <AnimatedDivider className="mx-auto mb-8" />
              <p className="font-heading text-gold italic text-h3 font-light">
                {pullQuote}
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-20">
              <p className="font-sans text-white/55 text-eyebrow uppercase tracking-[0.35em] mb-4">
                65°03′N · 11°55′E
              </p>
              <h2 className="font-heading text-h2 text-white font-light tracking-wide mb-5">
                {mapHeading}
              </h2>
              {mapDescription ? (
                <div className="mb-9 max-w-md mx-auto">
                  <RichText value={mapDescription} dark />
                </div>
              ) : (
                <p className="font-sans text-lead text-white/80 mb-9 max-w-md mx-auto">
                  An interactive 3D model of Sømliøya rendered in real time from
                  satellite data. Fly over the fjords and explore the coastline.
                </p>
              )}
              <Button href="/map" variant="secondary" onDark>
                Open 3D Map
              </Button>
            </Reveal>
          </div>
        </ParallaxImage>
      </main>
      <Footer />
    </div>
  );
}
