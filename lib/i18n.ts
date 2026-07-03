import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * hreflang alternates for a page, given its English path ("/", "/island", …).
 * Used by both the English page and its Norwegian mirror so search engines
 * link the two versions.
 * Returns absolute URLs as required by Next.js metadata.
 */
export function pageAlternates(enPath: string, locale: "en" | "no"): Metadata["alternates"] {
  const noPath = enPath === "/" ? "/no" : `/no${enPath}`;
  return {
    canonical: locale === "no" ? `${SITE_URL}${noPath}` : `${SITE_URL}${enPath}`,
    languages: { en: `${SITE_URL}${enPath}`, no: `${SITE_URL}${noPath}` },
  };
}
