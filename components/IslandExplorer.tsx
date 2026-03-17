"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  {
    id: 0,
    x: 48,
    y: 38,
    title: "The Main House",
    text: "The yellow house is the heart of the island — a shared kitchen, living room with fireplace, and cozy bedrooms upstairs.",
  },
  {
    id: 1,
    x: 55,
    y: 52,
    title: "The Shoreline",
    text: "The irregular shoreline was carved by the last Ice Age. The sea moves quietly between skerries and narrow inlets.",
  },
  {
    id: 2,
    x: 62,
    y: 30,
    title: "Heilhornet & the Peaks",
    text: "Across the fjord, the distinctive peak of Heilhornet rises alongside Breivasstinden and Hestmannen — a dramatic horizon.",
  },
  {
    id: 3,
    x: 40,
    y: 65,
    title: "The Fjord Waters",
    text: "Årsetfjorden is home to cod, pollock and mackerel. Fishing has been part of life here for generations.",
  },
  {
    id: 4,
    x: 35,
    y: 22,
    title: "The Northern Sky",
    text: "In summer, the midnight sun keeps the sky pale all night. In winter, the aurora borealis fills clear nights with dancing light.",
  },
];

export default function IslandExplorer() {
  const [activeFact, setActiveFact] = useState<number | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).dataset.hotspot) return;
      dragRef.current = {
        dragging: true,
        startX: e.clientX - translate.x,
        startY: e.clientY - translate.y,
      };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [translate]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const x = Math.max(
      -150,
      Math.min(150, e.clientX - dragRef.current.startX)
    );
    const y = Math.max(
      -100,
      Math.min(100, e.clientY - dragRef.current.startY)
    );
    setTranslate({ x, y });
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-5 px-[6vw]">
        <h3 className="font-heading text-fjord-deep text-2xl md:text-3xl font-normal mb-2">
          Explore the Island
        </h3>
        <p className="text-sm text-smoke">
          Click the golden markers to discover points of interest
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[70vh] min-h-[500px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <Image
          src="/images/8A53C7A7FEF5530A7B3D2DC3EB5393CB.jpg"
          alt="Aerial view of Sømliøya island"
          fill
          unoptimized
          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(1.15)`,
          }}
          sizes="100vw"
          quality={85}
          draggable={false}
        />

        {/* Hotspots */}
        {facts.map((f) => (
          <button
            key={f.id}
            data-hotspot="true"
            onClick={() => setActiveFact(activeFact === f.id ? null : f.id)}
            className="absolute w-5 h-5 rounded-full bg-gold border-2 border-white cursor-pointer z-10 hover:scale-[1.4] transition-transform"
            style={{
              top: `${f.y}%`,
              left: `${f.x}%`,
              animation: "hotspotPulse 2s infinite",
            }}
          />
        ))}

        {/* Hint */}
        <AnimatePresence>
          {activeFact === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-5 py-2 text-[0.72rem] tracking-[0.15em] uppercase font-sans pointer-events-none"
            >
              Click markers to explore · Drag to pan
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fact card */}
        <AnimatePresence mode="wait">
          {activeFact !== null && (
            <motion.div
              key={activeFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/92 backdrop-blur-xl px-6 py-4 text-center max-w-sm pointer-events-none"
            >
              <h5 className="font-heading text-fjord-deep text-lg mb-1">
                {facts[activeFact].title}
              </h5>
              <p className="text-smoke text-sm leading-relaxed">
                {facts[activeFact].text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
