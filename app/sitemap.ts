import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// English routes and their Norwegian mirrors under /no.
const PAGES = ["", "/island", "/activities", "/staying", "/rituals", "/plan", "/map", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap((path) => {
    const en = `${SITE_URL}${path || "/"}`;
    const no = `${SITE_URL}/no${path}`;
    const alternates = { languages: { en, no } };
    return [
      { url: en, lastModified: now, alternates },
      { url: no, lastModified: now, alternates },
    ];
  });
}
