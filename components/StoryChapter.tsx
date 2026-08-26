import type { Chapter } from "@/lib/data/story";
import Star from "@/components/Star";

export default function StoryChapter({
  chapter,
  index,
  isLast = false,
}: {
  chapter: Chapter;
  index: number;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-6 sm:gap-10">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-paper font-serif text-sm font-bold text-night shadow-card sm:h-14 sm:w-14 sm:text-base">
          {String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-lavender/70 via-lavender/40 to-transparent" />
        )}
      </div>

      <div className={`pb-16 ${isLast ? "" : ""}`}>
        <div className="mb-2 flex items-center gap-2">
          <Star className="h-3 w-3 text-gold-dark" />
          <span className="text-xs font-semibold tracking-[0.25em] text-gold-dark">
            {chapter.tag.toUpperCase()}
          </span>
        </div>
        <h3 className="font-serif text-xl font-bold text-night sm:text-2xl">{chapter.title}</h3>
        <div className="mt-4 space-y-4 text-sm leading-loose text-ink-600 sm:text-base">
          {chapter.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {chapter.quote && (
          <blockquote className="mt-5 rounded-2xl border border-lavender/40 bg-lavender/10 px-5 py-4 font-serif text-base italic text-night sm:text-lg">
            「{chapter.quote}」
          </blockquote>
        )}
      </div>
    </div>
  );
}
