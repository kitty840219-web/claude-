"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const VIDEO_ID = "2MH3zN3VCn4";
const VOLUME_KEY = "aifeiler.music.volume";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (v: number) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: { onReady: (e: { target: YTPlayer }) => void };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function BackgroundMusicInner() {
  const searchParams = useSearchParams();
  const embedded = searchParams.get("embed") === "1";
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const volumeRef = useRef(50);

  useEffect(() => {
    if (embedded) return;
    try {
      const saved = window.localStorage.getItem(VOLUME_KEY);
      if (saved) {
        const v = Math.min(100, Math.max(0, parseInt(saved, 10)));
        if (!isNaN(v)) {
          volumeRef.current = v;
          queueMicrotask(() => setVolume(v));
        }
      }
    } catch {
      // localStorage unavailable, use default volume
    }
  }, [embedded]);

  useEffect(() => {
    if (embedded) return;

    function createPlayer() {
      if (playerRef.current || !mountRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: VIDEO_ID },
        events: {
          onReady: (e) => {
            e.target.setVolume(volumeRef.current);
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    function startOnFirstInteraction() {
      if (startedRef.current) return;
      startedRef.current = true;
      setPlaying(true);
      playerRef.current?.playVideo();
      document.removeEventListener("click", startOnFirstInteraction);
      document.removeEventListener("touchstart", startOnFirstInteraction);
      document.removeEventListener("keydown", startOnFirstInteraction);
    }

    document.addEventListener("click", startOnFirstInteraction);
    document.addEventListener("touchstart", startOnFirstInteraction);
    document.addEventListener("keydown", startOnFirstInteraction);

    return () => {
      document.removeEventListener("click", startOnFirstInteraction);
      document.removeEventListener("touchstart", startOnFirstInteraction);
      document.removeEventListener("keydown", startOnFirstInteraction);
    };
  }, [embedded]);

  if (embedded) return null;

  function handleVolumeChange(v: number) {
    setVolume(v);
    volumeRef.current = v;
    playerRef.current?.setVolume(v);
    try {
      window.localStorage.setItem(VOLUME_KEY, String(v));
    } catch {
      // localStorage unavailable, skip persisting
    }
  }

  return (
    <div className="floating-music fixed bottom-20 z-40 flex flex-col items-center gap-2 md:bottom-6">
      <div ref={mountRef} className="pointer-events-none absolute h-px w-px opacity-0" aria-hidden />

      {showVolume && (
        <div className="flex h-28 w-8 flex-col items-center gap-2 rounded-full border border-gold/30 bg-night py-3 shadow-soft">
          <div className="flex h-20 w-8 shrink-0 items-center justify-center">
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              aria-label="調整音量"
              className="h-2 w-20 shrink-0 -rotate-90 cursor-pointer accent-gold"
            />
          </div>
          <span className="text-[10px] font-semibold text-gold-light">{volume}</span>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setShowVolume((v) => !v)}
          aria-label={showVolume ? "關閉音量調整" : "調整音量"}
          aria-expanded={showVolume}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-night text-gold-light shadow-soft transition hover:bg-night-light"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
            <path d="M4 7h10M4 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="7" r="2" fill="currentColor" />
            <circle cx="12" cy="17" r="2" fill="currentColor" />
            <path d="M18 7h2M14 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            startedRef.current = true;
            setPlaying((p) => {
              const next = !p;
              if (next) playerRef.current?.playVideo();
              else playerRef.current?.pauseVideo();
              return next;
            });
          }}
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
