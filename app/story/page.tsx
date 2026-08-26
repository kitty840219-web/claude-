import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Star from "@/components/Star";
import SectionHeading from "@/components/SectionHeading";
import StoryChapter from "@/components/StoryChapter";
import { SITE } from "@/lib/data/site";
import { CHAPTERS } from "@/lib/data/story";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `艾飛樂的故事 ｜ ${SITE.brand}`,
  description: "從一個人的塗塗畫畫，到艾飛樂語錄——一段用插畫與文字寫成的品牌故事。",
};

export default function StoryPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark py-24 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">OUR STORY</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">艾飛樂的故事</h1>
          <p className="mt-4 text-paper/70">一段用插畫與文字，寫給每個黑夜的旅程</p>

          {/* chapter jump nav */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CHAPTERS.map((c, i) => (
              <a
                key={c.tag}
                href={`#chapter-${i}`}
                className="rounded-full border border-paper/25 px-4 py-1.5 text-xs font-medium text-paper/80 transition hover:border-gold hover:text-gold-light"
              >
                {c.tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* character card */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-night/10 bg-paper-warm p-8 shadow-card sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-paper shadow-soft sm:h-28 sm:w-28">
            <Image src={asset("/images/profile.jpg")} alt="艾飛樂創作者 Ivy" fill className="object-cover" sizes="112px" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold tracking-widest text-gold-dark">
              STORYTELLER · 說故事的人
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-night sm:text-2xl">
              {SITE.founder}｜織字繪心的人
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {SITE.brandFull}創作者。相信每一句心事，都值得被畫成一顆星星。
            </p>
          </div>
        </div>
      </section>

      {/* chapters */}
      <section className="bg-paper-warm py-4">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {CHAPTERS.map((chapter, i) => (
            <div key={chapter.tag} id={`chapter-${i}`} className="scroll-mt-24">
              <StoryChapter chapter={chapter} index={i} isLast={i === CHAPTERS.length - 1} />
            </div>
          ))}
        </div>
      </section>

      {/* closing CTA */}
      <section className="relative overflow-hidden bg-night-dark py-20 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <div className="relative mx-auto mb-6 h-24 w-24">
            <Image src={asset("/images/mascot.png")} alt="艾飛樂 IP 角色" fill className="object-contain" />
          </div>
          <SectionHeading eyebrow="TO BE CONTINUED" title="故事，還在寫" light center />
          <p className="mt-4 text-sm leading-relaxed text-paper/70 sm:text-base">
            如果這段故事也讓你有一點點共鳴，或者你想邀請艾飛樂一起把你的品牌、你的故事畫下來——
            <br className="hidden sm:block" />
            歡迎成為這個故事的下一段。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/works"
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              看看語錄作品
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-paper/10"
            >
              邀請艾飛樂合作
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
