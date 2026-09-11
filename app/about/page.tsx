import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Star from "@/components/Star";
import StatBadge from "@/components/StatBadge";
import SocialIcon from "@/components/SocialIcon";
import AboutJourney from "@/components/AboutJourney";
import { SERVICES, SITE, TIMELINE } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";
import { asset } from "@/lib/basePath";
import ExploreCarousel from "@/components/ExploreCarousel";

export const metadata: Metadata = {
  title: `關於作者 Ivy ｜ ${SITE.brand}`,
  description: SITE.description,
};

export default function AboutPage() {
  return (
    <div>
      <AboutJourney />

      <div className="border-t border-paper/10" />

      <section className="relative overflow-hidden bg-night-dark">
        <div className="bg-stars relative px-5 py-10 text-center">
          <div className="absolute right-4 top-2 h-20 w-20 sm:right-10 sm:top-4 sm:h-28 sm:w-28">
            <Image src={asset("/images/about-story-xiaoai-cutout.webp")} alt="小艾揮手打招呼" fill className="object-contain drop-shadow-[0_0_18px_rgba(244,216,146,0.3)]" sizes="112px" />
          </div>
          <div className="mb-3 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.35em] text-gold-light sm:text-sm">ABOUT</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-paper sm:text-4xl">關於艾飛樂</h2>
          <p className="mt-2 text-sm text-paper/80 sm:text-base">{SITE.brandFull}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <StatBadge icon={<Star className="h-3.5 w-3.5" />} label={`${SITE.established} 年成立`} />
            <StatBadge
              icon={<SocialIcon type="shop" className="h-3.5 w-3.5" />}
              label={`${SERVICES.length} 大服務項目`}
            />
            <StatBadge
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              }
              label={`${QUOTES.length}+ 篇語錄作品`}
            />
          </div>
        </div>
        <div className="grid gap-4 px-5 pb-12 sm:grid-cols-2 sm:px-8">
          <Link href="/portfolio/#portfolio-book" className="group overflow-hidden rounded-3xl border border-gold/20 bg-[#0d0b2d] shadow-2xl transition hover:-translate-y-1 hover:border-gold/40">
            <div className="aspect-video overflow-hidden bg-paper">
              <Image src={asset("/images/portfolio/portfolio-01.webp")} alt="李宛容數位內容與視覺設計作品集預覽" width={1600} height={900} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div><p className="text-xs font-bold tracking-[0.22em] text-gold-light">PORTFOLIO</p><h3 className="mt-1 font-serif text-xl font-bold text-paper">翻閱作品集 PPT</h3></div>
              <span className="text-2xl text-gold-light">↗</span>
            </div>
          </Link>
          <Link href="/portfolio/#aifeiler-book" className="group overflow-hidden rounded-3xl border border-gold/20 bg-[#0d0b2d] shadow-2xl transition hover:-translate-y-1 hover:border-gold/40">
            <div className="aspect-video overflow-hidden bg-[#efe4d2]">
              <Image src={asset("/images/aifeiler-book/book-001.webp")} alt="《遺落在風中的信》電子書封面預覽" width={720} height={1023} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <div><p className="text-xs font-bold tracking-[0.22em] text-gold-light">E-BOOK</p><h3 className="mt-1 font-serif text-xl font-bold text-paper">閱讀《遺落在風中的信》</h3></div>
              <span className="text-2xl text-gold-light">↗</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Brand character */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid grid-cols-[minmax(0,1fr)_112px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_180px] sm:gap-8">
            <div className="min-w-0">
              <SectionHeading eyebrow="BRAND CHARACTER" title="艾飛樂的 IP 角色" />
              <p className="mt-4 text-sm leading-loose text-paper/70 sm:text-base">
                戴著草帽、綁著雙辮的女孩，是艾飛樂的品牌代言角色。她總是靜靜微笑、雙手合十，
                像是在傾聽每個人的心事——這份安靜而溫暖的陪伴感，正是艾飛樂語錄想帶給每位讀者的感受。
              </p>
            </div>
            <div className="relative h-44 w-full sm:h-60">
              <Image src={asset("/images/about-creator-cutout.webp")} alt="小艾站在畫架旁創作" fill className="object-contain drop-shadow-[0_0_18px_rgba(244,216,146,0.3)]" sizes="(min-width: 640px) 180px, 112px" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-night-dark px-4 py-20 sm:px-6">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading eyebrow="TIMELINE" title="創作歷程" center />
          <div className="relative mt-12 space-y-10 border-l-2 border-dashed border-lavender/40 pl-8">
            {TIMELINE.map((t) => (
              <div key={t.title} className="relative">
                <span className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow" />
                <p className="text-xs font-semibold tracking-widest text-gold-light">{t.year}</p>
                <h3 className="mt-1 font-serif text-lg font-bold text-paper">{t.title}</h3>
                <p className="mt-1 text-sm text-paper/60">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-paper/10" />
      <ExploreCarousel />
    </div>
  );
}
