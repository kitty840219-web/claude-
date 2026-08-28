"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const VIDEO_ID = "2MH3zN3VCn4";

function BackgroundMusicInner() {
  const searchParams = useSearchParams();
  const embedded = searchParams.get("embed") === "1";
  const [playing, setPlaying] = useState(true);

  if (embedded) return null;

  return (
    <div className="floating-music fixed bottom-20 z-40 md:bottom-6">
      {playing && (
        <iframe
          title="艾飛樂背景音樂"
          className="pointer-events-none absolute h-px w-px opacity-0"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0`}
          allow="autoplay"
          aria-hidden
        />
      )}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "關閉背景音樂" : "播放背景音樂"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-night text-gold-light shadow-soft transition hover:bg-night-light"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <path d="M16 8l4 8M20 8l-4 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function BackgroundMusic() {
  return (
    <Suspense fallback={null}>
      <BackgroundMusicInner />
    </Suspense>
  );
}
