import type { Metadata } from "next";
import Link from "next/link";
import RealisticIslandMap from "@/components/RealisticIslandMap";

export const metadata: Metadata = {
  title: "3D Island Map",
  description:
    "Explore Sømliøya in an interactive 3D model rendered in real time from satellite data.",
};

export default function MapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <main
        id="main-content"
        className="flex h-screen flex-col items-center justify-center gap-5 bg-[#0d1622] px-6 text-center"
      >
        <p className="font-heading text-lead font-light italic text-white/75">
          The interactive map is resting just now.
        </p>
        <p className="font-sans text-caption text-white/50 max-w-xs">
          The 3D island view is temporarily unavailable. Please explore the
          rest of the island in the meantime.
        </p>
        <Link
          href="/"
          className="focus-ring-light font-sans text-[0.72rem] uppercase tracking-[0.2em] text-white/85 border border-white/25 px-6 py-3 hover:bg-white/10 transition-colors"
        >
          ← Back to Sømliøya
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="h-screen w-screen">
      <RealisticIslandMap apiKey={apiKey} />
    </main>
  );
}
