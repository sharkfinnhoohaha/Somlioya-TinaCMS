/**
 * Canonical site URL resolution, shared by metadata, sitemap and robots.
 *
 * Priority: explicit NEXT_PUBLIC_SITE_URL (set this to the real domain in
 * Vercel once one is connected) → Vercel's production URL → localhost.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const SITE_URL = fromEnv ?? "http://localhost:3000";

export const SITE_NAME = "Sømliøya";
