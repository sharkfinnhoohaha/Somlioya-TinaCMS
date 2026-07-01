"use client";

import { usePathname } from "next/navigation";

export type Locale = "en" | "no";

/** Detects the active locale from the URL — /no/... routes are Norwegian. */
export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname === "/no" || pathname?.startsWith("/no/") ? "no" : "en";
}

/** Prefixes an English route with /no when the Norwegian locale is active. */
export function localeHref(locale: Locale, path: string): string {
  if (locale !== "no") return path;
  return path === "/" ? "/no" : `/no${path}`;
}

/** Strips the /no prefix, giving the English equivalent of the current path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/no") return "/";
  return pathname.startsWith("/no/") ? pathname.slice(3) : pathname;
}
