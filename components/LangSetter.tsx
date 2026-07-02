"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sets <html lang="…"> dynamically based on the current pathname.
 * Norwegian Bokmål pages under /no/* get lang="nb"; everything else gets lang="en".
 *
 * Next.js App Router only allows one root layout to render the <html> tag,
 * so we use a client component to patch it on every navigation.
 */
export default function LangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.startsWith("/no") ? "nb" : "en";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
