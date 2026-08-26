import Link from "next/link";
import type { Chapter } from "@/lib/data/story";

const PALETTES = ["from-night-light to-night-dark", "from-lavender-dark to-night-dark", "from-cocoa to-night-dark"];

export default function StoryChapter({
  chapter,
  index,
  total,
  isLast = false,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  isLast?: boolean;
}) {
  const palette = PALETTES[index % PALETTES.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative flex gap-6 sm:gap-10">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-paper font-serif text-sm font-bold text-night shadow-card sm:h-14 sm:w-14 sm:text-base">
          {num}
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-lavender/70 via-lavender/40 to-transparent" />
        )}
      </div>

      <div className="w-full pb-16">
        <div
          className={`bg-grain relative overflow-hidden rounded-[1.75rem] border border-paper/10 bg-gradient-to-br ${palette} p-6 shadow-soft sm:p-9`}
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

            {chapter.quote && (
              <blockquote className="mt-6 border-l-4 border-gold py-1 pl-4 font-serif text-base italic text-gold-light sm:text-lg">
                「{chapter.quote}」
              </blockquote>
            )}

            {!isLast && (
              <a
                href={`#chapter-${index + 1}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold text-night-dark shadow-soft transition hover:bg-gold-light sm:text-sm"
              >
                繼續下一章 →
              </a>
            )}
            {isLast && (
              <Link
                href="/works"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold text-night-dark shadow-soft transition hover:bg-gold-light sm:text-sm"
              >
                故事讀完了，看看語錄作品 →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
