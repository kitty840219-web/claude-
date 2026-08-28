"use client";

import { useRef, useState } from "react";

export default function TimelineCarousel({
  items,
}: {
  items: { year: string; title: string; desc: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.clientWidth;
    const next = Math.round(track.scrollLeft / cardWidth);
    setIndex(Math.max(0, Math.min(items.length - 1, next)));
  }

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <div
            key={t.title}
            className="bg-grain relative w-full shrink-0 snap-center overflow-hidden rounded-2xl border border-gold/15 bg-night-light/40 p-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold shadow">
              <span className="h-2 w-2 rounded-full bg-night-dark" />
            </span>
            <p className="mt-3 text-xs font-semibold tracking-widest text-gold-light">{t.year}</p>
            <h3 className="mt-1 font-serif text-lg font-bold text-paper">{t.title}</h3>
            <p className="mt-1 text-sm text-paper/60">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map((t, i) => (
          <button
            key={t.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`查看${t.year}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-7 bg-gold" : "w-1.5 bg-paper/25"}`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-paper/45">左右滑動查看創作歷程 →</p>
    </div>
  );
}
