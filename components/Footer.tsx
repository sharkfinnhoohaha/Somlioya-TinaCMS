"use client";

import Link from "next/link";
import { useLocale, localeHref, type Locale } from "@/hooks/useLocale";

const FOOTER_PATHS = ["/island", "/activities", "/staying", "/rituals", "/plan", "/map", "/contact"];

const FOOTER_LABELS: Record<Locale, string[]> = {
  en: ["The Island", "Activities", "Staying", "Rituals", "Plan Your Stay", "3D Map", "Contact"],
  no: ["Øya", "Aktiviteter", "Overnatting", "Ritualer", "Planlegg oppholdet", "3D-kart", "Kontakt"],
};

const COPY: Record<
  Locale,
  { blurb: string; explore: string; getInTouch: string; contactLink: string; place: string; tagline: string }
> = {
  en: {
    blurb:
      "A private island in Nærøysund, Trøndelag — a place to step outside the world for a while.",
    explore: "Explore",
    getInTouch: "Get in touch",
    contactLink: "Send us a message",
    place: "Nærøysund Municipality",
    tagline: "Where the world becomes quieter",
  },
  no: {
    blurb:
      "En privat øy i Nærøysund, Trøndelag — et sted å tre ut av verden for en stund.",
    explore: "Utforsk",
    getInTouch: "Ta kontakt",
    contactLink: "Send oss en melding",
    place: "Nærøysund kommune",
    tagline: "Der verden blir stillere",
  },
};

export default function Footer({ instagramUrl }: { instagramUrl?: string }) {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const t = COPY[locale];

  return (
    <footer className="bg-fjord-deep text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <p className="font-heading text-h4 tracking-[0.15em] uppercase font-light mb-3">
              Sømliøya
            </p>
            <p className="font-sans text-caption text-white/65 leading-relaxed max-w-xs">
              {t.blurb}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-white/45 mb-1">
              {t.explore}
            </p>
            {FOOTER_PATHS.map((path, i) => (
              <Link
                key={path}
                href={localeHref(locale, path)}
                className="font-sans text-caption uppercase tracking-[0.18em] text-white/75 hover:text-gold transition-colors w-fit"
              >
                {FOOTER_LABELS[locale][i]}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-white/45 mb-1">
              {t.getInTouch}
            </p>
            <Link
              href={localeHref(locale, "/contact")}
              className="font-sans text-caption text-white/85 hover:text-gold transition-colors w-fit underline underline-offset-2 decoration-white/25 hover:decoration-gold"
            >
              {t.contactLink}
            </Link>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-caption text-white/85 hover:text-gold transition-colors w-fit underline underline-offset-2 decoration-white/25 hover:decoration-gold"
              >
                Instagram
              </a>
            )}
            <p className="font-sans text-caption text-white/65 leading-relaxed">
              {t.place}
              <br />
              Trøndelag · Norway
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-sans text-eyebrow tracking-wider text-white/45">
            © {year} Sømliøya
          </p>
          <p className="font-heading italic text-caption text-white/55">
            {t.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
