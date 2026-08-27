import ExploreCarousel from "@/components/ExploreCarousel";
import Star from "@/components/Star";
import StoryReader from "@/components/StoryReader";
import { CHAPTERS } from "@/lib/data/story";

export default function HomePage() {
  return (
    <div>
      <ExploreCarousel />

      <section id="story" className="scroll-mt-16">
        <div className="relative overflow-hidden bg-night-dark px-5 py-12 text-center">
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="h-3 w-3 text-gold-light" />
              <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">OUR STORY</p>
              <Star className="h-3 w-3 text-gold-light" delay="1s" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-paper">艾飛樂的故事</h2>
            <p className="mt-3 text-sm text-paper/75">一段用插畫與文字，寫給每個黑夜的旅程</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-night-dark py-16">
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative">
            <StoryReader chapters={CHAPTERS} />
          </div>
        </div>
      </section>
    </div>
  );
}
