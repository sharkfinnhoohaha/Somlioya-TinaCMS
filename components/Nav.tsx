"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/island", label: "The Island" },
  { href: "/activities", label: "Activities" },
  { href: "/staying", label: "Staying" },
  { href: "/rituals", label: "Rituals" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-ivory/85 backdrop-blur-xl border-b border-black/5 py-3 px-6 md:px-10"
            : "bg-black/30 backdrop-blur-md border-b border-white/10 py-5 px-6 md:px-10"
        }`}
      >
        <Link
          href="/"
          className={`font-heading text-lg tracking-[0.15em] uppercase font-light transition-colors duration-400 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          Sømliøya
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[0.82rem] font-sans tracking-[0.2em] uppercase relative transition-colors duration-400 group ${
                  scrolled ? "text-charcoal" : "text-white"
                } ${pathname === l.href ? "font-medium" : "font-normal"}`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-400 ${
                    pathname === l.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[60]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[55] bg-ivory flex flex-col items-center justify-center gap-8"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-heading text-2xl text-charcoal tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
