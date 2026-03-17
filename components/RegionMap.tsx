"use client";

import { useState } from "react";
import Link from "next/link";

interface PlaceMarker {
  name: string;
  description?: string;
  lat: number;
  lng: number;
  isSelf?: boolean;
}

// Approximate coordinates for known regional places
const PLACE_COORDS: Record<string, { lat: number; lng: number }> = {
  "Island of Leka": { lat: 65.10, lng: 11.62 },
  "Coastal Villages": { lat: 64.86, lng: 11.24 },
  "Sømliøya": { lat: 65.064, lng: 11.931 },
};

// Bounding box for a nice regional view
const BOUNDS = { latMin: 64.72, latMax: 65.35, lngMin: 11.0, lngMax: 12.2 };

function toPos(lat: number, lng: number) {
  return {
    left: `${((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100}%`,
    top: `${(1 - (lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * 100}%`,
  };
}

interface RegionMapProps {
  places: { name: string; description?: any }[];
  apiKey?: string;
}

export default function RegionMap({ places, apiKey }: RegionMapProps) {
  const [active, setActive] = useState<string | null>(null);

  // Satellite background via Google Static Maps (no new dependency needed)
  const bgUrl = apiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=65.0,11.65&zoom=9&size=900x550&scale=2&maptype=satellite&key=${apiKey}`
    : null;

  // Merge CMS places with hardcoded coordinates
  const markers: PlaceMarker[] = [
    {
      name: "Sømliøya",
      ...PLACE_COORDS["Sømliøya"],
      description: "Our private island retreat in Nærøysund",
      isSelf: true,
    },
    ...places.map((p) => ({
      name: p.name,
      ...(PLACE_COORDS[p.name] ?? { lat: 65.1, lng: 11.7 }),
      // Extract plain text from TinaCMS rich text if needed
      description:
        typeof p.description === "string"
          ? p.description
          : p.description?.children?.[0]?.children?.[0]?.text ?? "",
      isSelf: false,
    })),
  ];

  return (
    <div
      className="relative h-[480px] md:h-[520px] rounded-sm overflow-hidden bg-[#0a1020]"
      style={
        bgUrl
          ? { backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {/* Dark gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/70 via-transparent to-[#0a1020]/40 pointer-events-none z-10" />

      {/* Grid lines for "map" feel when no satellite bg */}
      {!bgUrl && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Markers */}
      {markers.map((m) => {
        const pos = toPos(m.lat, m.lng);
        const isActive = active === m.name;

        return (
          <button
            key={m.name}
            className="absolute z-20 group focus:outline-none"
            style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -50%)" }}
            onClick={() => setActive(isActive ? null : m.name)}
          >
            {/* Pulse ring */}
            <span
              className={`absolute rounded-full animate-ping ${
                m.isSelf ? "bg-gold/40" : "bg-white/25"
              }`}
              style={{ inset: -6 }}
            />
            {/* Dot */}
            <span
              className={`relative block w-3 h-3 rounded-full border-2 shadow-lg transition-transform duration-200 group-hover:scale-125 ${
                m.isSelf
                  ? "bg-gold border-gold/80"
                  : "bg-white/80 border-white/50"
              }`}
            />
            {/* Place label */}
            <span
              className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.65rem] font-sans tracking-[0.15em] uppercase transition-opacity duration-200 ${
                m.isSelf ? "text-gold" : "text-white/75"
              } ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
            >
              {m.name}
            </span>

            {/* Info card */}
            {isActive && m.description && (
              <div className="absolute left-5 top-6 w-60 bg-black/85 backdrop-blur-md rounded-sm p-4 text-left z-30 border border-white/10 shadow-xl">
                <h4 className="font-heading text-white text-sm font-light tracking-wide mb-2">
                  {m.name}
                </h4>
                <p className="font-sans text-white/55 text-xs leading-relaxed">
                  {m.description}
                </p>
              </div>
            )}
          </button>
        );
      })}

      {/* Coordinate label */}
      <p className="absolute top-4 left-4 z-20 font-sans text-white/30 text-[0.6rem] tracking-[0.3em] uppercase pointer-events-none">
        65°N · Nærøysund
      </p>

      {/* View 3D Map CTA */}
      <Link
        href="/map"
        className="absolute bottom-4 right-4 z-20 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase px-5 py-2.5 bg-black/50 border border-white/25 text-white hover:bg-gold hover:border-gold transition-all duration-500 backdrop-blur-sm"
      >
        View 3D Map →
      </Link>
    </div>
  );
}
