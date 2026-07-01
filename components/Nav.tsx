"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, localeHref, stripLocale, type Locale } from "@/hooks/useLocale";

const NAV_LABELS: Record<Locale, string[]> = {
  en: ["Home", "The Island", "Activities", "Staying", "Rituals", "Plan", "Map", "Contact"],
  no: ["Hjem", "Øya", "Aktiviteter", "Overnatting", "Ritualer", "Planlegg", "Kart", "Kontakt"],
};

const NAV_PATHS = ["/", "/island", "/activities", "/staying", "/rituals", "/plan", "/map", "/contact"];

export default function Nav() {
  const pathname = usePathname();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = NAV_PATHS.map((path, i) => ({
    href: localeHref(locale, path),
    label: NAV_LABELS[locale][i],
  }));

  // Language switcher — jump to the same page in the other language.
  const otherLocaleHref =
    locale === "no" ? stripLocale(pathname ?? "/") : localeHref("no", pathname ?? "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // While the mobile menu is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-xl border-b border-black/5 py-3 px-6 md:px-10"
            : "bg-black/30 backdrop-blur-md border-b border-white/10 py-5 px-6 md:px-10"
        }`}
      >
        <Link
          href={localeHref(locale, "/")}
          className={`font-heading text-lg tracking-[0.15em] uppercase font-light transition-colors duration-400 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          Sømliøya
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-5 lg:gap-7 items-center">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.82rem] font-sans tracking-[0.18em] uppercase relative transition-colors duration-400 group ${
                    scrolled ? "text-charcoal" : "text-white"
                  } ${active ? "font-medium" : "font-normal"}`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-400 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={otherLocaleHref}
              aria-label={locale === "no" ? "Switch to English" : "Bytt til norsk"}
              className={`text-[0.72rem] font-sans tracking-[0.18em] uppercase border px-2.5 py-1 transition-colors duration-400 ${
                scrolled
                  ? "text-charcoal border-charcoal/30 hover:border-charcoal"
                  : "text-white border-white/40 hover:border-white"
              }`}
            >
              {locale === "no" ? "EN" : "NO"}
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[60] p-1 -m-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-[3.5px] bg-charcoal"
                : scrolled
                ? "bg-charcoal"
                : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-[3.5px] bg-charcoal"
                : scrolled
                ? "bg-charcoal"
                : "bg-white"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[55] bg-ivory flex flex-col items-center justify-center gap-7"
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-heading text-2xl tracking-wide transition-colors ${
                    active ? "text-gold" : "text-charcoal"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href={otherLocaleHref}
              onClick={() => setMobileOpen(false)}
              className="mt-2 font-sans text-caption uppercase tracking-[0.25em] text-smoke border border-charcoal/25 px-4 py-2"
            >
              {locale === "no" ? "English" : "Norsk"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
