import Link from "next/link";

const footerLinks = [
  { href: "/island", label: "The Island" },
  { href: "/activities", label: "Activities" },
  { href: "/staying", label: "Staying" },
  { href: "/rituals", label: "Rituals" },
  { href: "/map", label: "3D Map" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

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
              A private island in Nærøysund, Trøndelag — a place to step
              outside the world for a while.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-white/45 mb-1">
              Explore
            </p>
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-caption uppercase tracking-[0.18em] text-white/75 hover:text-gold transition-colors w-fit"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-white/45 mb-1">
              Get in touch
            </p>
            <a
              href="mailto:hello@somlioya.no"
              className="font-sans text-caption text-white/85 hover:text-gold transition-colors w-fit underline underline-offset-2 decoration-white/25 hover:decoration-gold"
            >
              hello@somlioya.no
            </a>
            <p className="font-sans text-caption text-white/65 leading-relaxed">
              Nærøysund Municipality
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
            Where the world becomes quieter
          </p>
        </div>
      </div>
    </footer>
  );
}
