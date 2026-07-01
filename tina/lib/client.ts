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

export type Locale = "en" | "no";

function readContentFile<T>(filename: string, locale: Locale = "en"): T | null {
  try {
    const dir =
      locale === "no"
        ? path.join(process.cwd(), "content", "pages", "no")
        : path.join(process.cwd(), "content", "pages");
    const raw = fs.readFileSync(path.join(dir, `${filename}.json`), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getHomePage(locale: Locale = "en") {
  return readContentFile<HomePageContent>("home", locale);
}

export function getActivitiesPage(locale: Locale = "en") {
  return readContentFile<ActivitiesPageContent>("activities", locale);
}

export function getStayingPage(locale: Locale = "en") {
  return readContentFile<StayingPageContent>("staying", locale);
}

export function getIslandPage(locale: Locale = "en") {
  return readContentFile<IslandPageContent>("island", locale);
}

export function getRitualsPage(locale: Locale = "en") {
  return readContentFile<RitualsPageContent>("rituals", locale);
}

export function getContactPage(locale: Locale = "en") {
  return readContentFile<ContactPageContent>("contact", locale);
}

export function getPlanPage(locale: Locale = "en") {
  return readContentFile<PlanPageContent>("plan", locale);
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
  posterImage?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
}

export interface Testimonial {
  quote?: string;
  attribution?: string;
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
  testimonialsSection?: {
    heading?: string;
    items?: Testimonial[];
  };
  instagramUrl?: string;
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
  contactEmail?: string;
}

export interface PlanStep {
  title?: string;
  description?: string;
}

export interface PlanFact {
  label?: string;
  detail?: string;
}

export interface PlanPageContent {
  hero?: PageHero;
  intro?: TinaRichText;
  steps?: PlanStep[];
  practicalSection?: {
    heading?: string;
    paragraphs?: TinaRichText;
    facts?: PlanFact[];
  };
  ratesSection?: {
    heading?: string;
    paragraphs?: TinaRichText;
  };
}
