import { LINKS } from "@/lib/data/site";

const YOUTUBE_VIDEO_ID = "iYy-q9ywHaA";

export default function SocialStation() {
  return (
    <section className="relative overflow-hidden bg-night-dark px-4 py-16">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-md">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-gold-light">SOCIAL STATION</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-paper">小艾的社群觀測站</h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/65">在旅途中停留一下，看看小艾最新的影音創作。</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-gold/15 bg-night shadow-soft">
          <div className="relative aspect-video bg-black">
            <iframe
              title="艾飛樂 YouTube 影音"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-between gap-3 p-5">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gold-light">YOUTUBE</p>
              <h3 className="mt-1 font-serif text-base font-bold text-paper">艾飛樂影音放映室</h3>
            </div>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-night-dark">
              前往頻道
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
