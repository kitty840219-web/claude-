"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Chapter } from "@/lib/data/story";

const PALETTES = ["from-night-light to-night-dark", "from-lavender-dark to-night-dark"];

export default function StoryReader({
  chapters,
  finish,
}: {
  chapters: Chapter[];
  finish?: { label: string; onClick: () => void };
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const total = chapters.length;
  const chapter = chapters[index];
  const num = String(index + 1).padStart(2, "0");
  const isLast = index === total - 1;
  const palette = PALETTES[index % PALETTES.length];
  const finishLabel = finish?.label ?? "故事讀完了，看看語錄作品 →";

  const advance = () => {
    if (!isLast) {
      setIndex((i) => Math.min(total - 1, i + 1));
    } else if (finish) {
      finish.onClick();
    } else {
      router.push("/works");
    }
  };

  return (
    <div>
      {/* level map */}
      <div className="overflow-x-auto pb-2">
        <div className="relative mx-auto flex w-max min-w-full items-start justify-center gap-1 px-4 sm:gap-2">
          <div className="pointer-events-none absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-paper/25 to-transparent sm:top-6" />
          {chapters.map((c, i) => {
            const active = i === index;
            return (
              <button
                key={c.tag}
                type="button"
                onClick={() => setIndex(i)}
                className="group relative flex w-16 flex-col items-center gap-2 sm:w-24"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-serif text-xs font-bold shadow-card transition sm:h-12 sm:w-12 sm:text-sm ${
                    active
                      ? "border-gold bg-gold text-night-dark"
                      : "border-gold/70 bg-night-dark text-gold-light group-hover:border-gold group-hover:bg-night"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-center text-[10px] font-medium leading-tight transition sm:text-xs ${
                    active ? "text-gold-light" : "text-paper/70 group-hover:text-gold-light"
                  }`}
                >
                  {c.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] tracking-widest text-paper/40">
        第 {num} / {String(total).padStart(2, "0")} 章・點選節點跳至該章
      </p>

      {/* reading panel */}
      <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
        <div
          role="button"
          tabIndex={0}
          onClick={advance}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              advance();
            }
          }}
          aria-label={isLast ? finishLabel : "點擊查看下一章"}
          className={`bg-grain group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-gold/15 bg-gradient-to-br ${palette} p-6 shadow-soft transition hover:border-gold/40 sm:p-9`}
        >
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-light">
              艾飛樂的故事 ・ {chapter.tag.toUpperCase()} ・ 第 {num} / {String(total).padStart(2, "0")} 章
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold text-paper sm:text-2xl">{chapter.title}</h3>

            <div className="mt-5 space-y-4 text-justify text-sm leading-loose text-paper/85 sm:text-base">
              {chapter.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {chapter.embed && (
              <div className="mt-5" onClick={(e) => e.stopPropagation()}>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-black">
                  <iframe
                    title={`${chapter.title} 影音`}
                    src={`https://www.youtube.com/embed/${chapter.embed.videoId}?rel=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <a
                  href={chapter.embed.channelHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-semibold text-gold-light"
                >
                  前往頻道 →
                </a>
              </div>
            )}

            {chapter.quote && (
              <blockquote className="mt-6 border-l-4 border-gold py-1 pl-4 font-serif text-base italic text-gold-light sm:text-lg">
                「{chapter.quote}」
              </blockquote>
            )}

            <p className="mt-6 text-right text-xs font-semibold text-gold-light transition group-hover:text-gold">
              {isLast ? finishLabel : "點擊繼續下一章 →"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
