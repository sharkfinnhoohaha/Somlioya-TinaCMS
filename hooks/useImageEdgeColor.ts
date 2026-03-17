"use client";

import { useState, useEffect } from "react";

/**
 * Samples the average colour of the top or bottom edge strip of an image.
 * Returns a darkened, muted version suitable for cinematic section transitions.
 * Falls back to `fallback` until the image loads or on any canvas error.
 */
export function useImageEdgeColor(
  src: string,
  edge: "top" | "bottom",
  fallback = "#111111"
): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    // Only set crossOrigin for external URLs – local images don't need it
    if (src.startsWith("http")) img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Downsample for speed
        const w = Math.min(img.naturalWidth, 120);
        const h = Math.min(img.naturalHeight, 120);
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        // Sample the top or bottom 15%
        const sampleH = Math.max(Math.floor(h * 0.15), 2);
        const y = edge === "top" ? 0 : h - sampleH;
        const data = ctx.getImageData(0, y, w, sampleH).data;

        let r = 0, g = 0, b = 0, count = 0;
        // Every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count === 0) return;

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        // Mix 40% image colour + 60% near-black (#0a0a0a = 10,10,10)
        // keeps the transition cinematic — not too colourful, not pitch black
        const mix = 0.4;
        const base = 10;
        r = Math.round(r * mix + base * (1 - mix));
        g = Math.round(g * mix + base * (1 - mix));
        b = Math.round(b * mix + base * (1 - mix));

        setColor(`rgb(${r},${g},${b})`);
      } catch {
        // Canvas tainted or other error — keep fallback
      }
    };

    img.src = src;
  }, [src, edge, fallback]);

  return color;
}
