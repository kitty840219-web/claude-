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
          <div className="animate-float-slow absolute right-2 top-0 h-32 w-32 sm:right-6 sm:h-40 sm:w-40">
            <Image src={asset("/images/about-story-xiaoai-cutout.webp")} alt="小艾揮手打招呼" fill className="object-contain drop-shadow-[0_0_18px_rgba(244,216,146,0.3)]" sizes="160px" />
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

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl px-5 pb-12 sm:px-8">
          <SectionHeading eyebrow="TIMELINE" title="創作歷程" center />
          <div className="relative mt-12 space-y-10 border-l-2 border-dashed border-lavender/40 pl-8 text-left">
            {TIMELINE.map((t, i) => (
              <div key={t.title}>
                <div className="relative">
                  <span className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow" />
                  <p className="text-xs font-semibold tracking-widest text-gold-light">{t.year}</p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-paper">{t.title}</h3>
                  <p className="mt-1 text-sm text-paper/60">{t.desc}</p>
                </div>
                {i === 2 && (
                  <div className="relative mt-6 flex items-center gap-4 rounded-2xl border border-gold/20 bg-night-light/25 p-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={asset("/images/about-creator-cutout.webp")} alt="小艾站在畫架旁創作" fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-light">BRAND CHARACTER</p>
                      <h4 className="mt-1 font-serif text-sm font-bold text-paper">品牌第一個 IP 角色「小艾」</h4>
                      <p className="mt-1 text-xs leading-relaxed text-paper/60">2024 年誕生，戴著草帽、綁著雙辮，靜靜微笑、雙手合十——小艾是艾飛樂的品牌代言角色。</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
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

      <div className="border-t border-paper/10" />
      <ExploreCarousel />
    </div>
  );
}
