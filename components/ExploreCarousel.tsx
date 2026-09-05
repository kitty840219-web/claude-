"use client";

import Star from "@/components/Star";
import StoryReader from "@/components/StoryReader";
import { CHAPTERS } from "@/lib/data/story";

export default function ExploreCarousel() {
  return (
    <section className="relative overflow-hidden bg-night-dark text-paper">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative flex flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div className="relative mt-4 flex flex-col overflow-hidden rounded-[2rem] border border-gold/35 bg-night-light/20 shadow-soft">
          <div className="relative">
            <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative px-5 pt-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Star className="h-3 w-3 text-gold-light" />
                <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-light">OUR STORY</p>
                <Star className="h-3 w-3 text-gold-light" delay="1s" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-paper">艾飛樂的故事</h2>
              <p className="mt-2 text-xs text-paper/70">一段用插畫與文字，寫給每個黑夜的旅程</p>
            </div>
            <div className="relative mt-6">
              <StoryReader chapters={CHAPTERS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
