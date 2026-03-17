'use client';

import RealisticIslandMap from '@/components/RealisticIslandMap';

export default function MapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0f1a] font-mono text-white/50">
        <div className="text-center">
          <p className="text-sm">Missing environment variable</p>
          <code className="mt-2 block text-xs text-red-400">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </code>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen">
      <RealisticIslandMap apiKey={apiKey} />
    </main>
  );
}
