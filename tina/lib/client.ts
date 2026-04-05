/**
 * TinaCMS data-fetching layer
 *
 * TinaCMS stores content as JSON files in content/pages/.
 * During development (`tinacms dev`), the TinaCMS admin UI at /admin allows
 * editing content in-browser, with changes written back to these JSON files.
 *
 * At build/runtime, we read the JSON files directly using Node's fs module
 * (server-side only). This is the key difference from Sanity's API-based model:
 * TinaCMS content lives in your git repository alongside your code.
 *
 * When using Tina Cloud (cloud.tina.io), content can also be fetched via
 * a GraphQL API — but the file-based approach is used here for simplicity
 * and to highlight the contrast with Sanity's always-remote model.
 */

import fs from "fs";
import path from "path";

function readContentFile<T>(filename: string): T | null {
  try {
    const filePath = path.join(process.cwd(), "content", "pages", `${filename}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getHomePage() {
  return readContentFile<HomePageContent>("home");
}

export function getActivitiesPage() {
  return readContentFile<ActivitiesPageContent>("activities");
}

export function getStayingPage() {
  return readContentFile<StayingPageContent>("staying");
}

export function getIslandPage() {
  return readContentFile<IslandPageContent>("island");
}

export function getRitualsPage() {
  return readContentFile<RitualsPageContent>("rituals");
}

export function getContactPage() {
  return readContentFile<ContactPageContent>("contact");
}

// ─── Content type definitions ─────────────────────────────────────────────────

export interface TinaImage {
  src: string;
  alt?: string;
}

export interface TinaRichText {
  type: "root";
  children: TinaRichTextNode[];
}

export interface TinaRichTextNode {
  type: string;
  children?: TinaRichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
  alt?: string;
  caption?: string;
}

export interface PageHero {
  image?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
}

export interface HomePageContent {
  hero?: PageHero;
  poeticParagraphs?: TinaRichText;
  secondParagraphs?: TinaRichText;
  pullQuote?: string;
  mapCta?: {
    heading?: string;
    description?: TinaRichText;
  };
  firstImage?: TinaImage;
  secondImage?: TinaImage;
}

export interface ActivityItem {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

export interface Place {
  name?: string;
  description?: TinaRichText;
}

export interface ActivitiesPageContent {
  hero?: PageHero;
  intro?: TinaRichText;
  waterSection?: {
    heading?: string;
    items?: ActivityItem[];
  };
  landSection?: {
    heading?: string;
    items?: ActivityItem[];
  };
  regionSection?: {
    heading?: string;
    places?: Place[];
    image?: string;
    imageAlt?: string;
  };
  fireSection?: {
    heading?: string;
    text?: TinaRichText;
    closingImage?: string;
    closingImageAlt?: string;
  };
}

export interface ImageWithAlt {
  src?: string;
  alt?: string;
}

export interface SectionWithHeading {
  heading?: string;
  paragraphs?: TinaRichText;
  image?: string;
  imageAlt?: string;
}

export interface StayingPageContent {
  hero?: PageHero;
  intro?: TinaRichText;
  buildingImages?: ImageWithAlt[];
  sleepingSection?: SectionWithHeading;
  sharedSpacesSection?: { heading?: string; paragraphs?: TinaRichText };
  galleryImages?: ImageWithAlt[];
  groupSpacesSection?: { heading?: string; paragraphs?: TinaRichText };
  closingImage?: ImageWithAlt;
}

export interface IslandPageContent {
  hero?: PageHero;
  intro?: TinaRichText;
  climateSection?: SectionWithHeading;
  mountainsSection?: SectionWithHeading;
  wildlifeSection?: SectionWithHeading;
}

export interface RitualsPageContent {
  hero?: PageHero;
  intro?: TinaRichText;
  midImage?: ImageWithAlt;
  secondParagraphs?: TinaRichText;
  shapedTogetherSection?: SectionWithHeading;
  gatheringsSection?: {
    heading?: string;
    paragraphs?: TinaRichText;
    pullQuote?: string;
  };
}

export interface ContactPageContent {
  hero?: PageHero;
  introText?: string;
}
