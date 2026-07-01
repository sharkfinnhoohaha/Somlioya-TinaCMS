import type { Metadata } from "next";

/**
 * hreflang alternates for a page, given its English path ("/", "/island", …).
 * Used by both the English page and its Norwegian mirror so search engines
 * link the two versions.
 */
export function pageAlternates(enPath: string, locale: "en" | "no"): Metadata["alternates"] {
  const noPath = enPath === "/" ? "/no" : `/no${enPath}`;
  return {
    canonical: locale === "no" ? noPath : enPath,
    languages: { en: enPath, no: noPath },
  };
}
