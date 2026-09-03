import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Star from "@/components/Star";
import StatBadge from "@/components/StatBadge";
import SocialIcon from "@/components/SocialIcon";
import AboutJourney from "@/components/AboutJourney";
import { SERVICES, SITE, TIMELINE } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";
import { asset } from "@/lib/basePath";

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
          <div className="mb-3 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">ABOUT</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-paper sm:text-4xl">關於艾飛樂</h2>
          <p className="mt-2 text-sm text-paper/80">{SITE.brandFull}</p>
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
        <div className="relative aspect-square w-full">
          <Image
            src={asset("/images/xiaoai-03-about-page.webp")}
            alt="小艾站在畫架前，手拿畫筆與水彩調色盤"
            fill
            className="object-cover object-[center_0%]"
          />
        </div>
      </section>

      {/* Brand character */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-[2rem] border border-gold/15 bg-night-light/20 p-8 shadow-card sm:grid-cols-[auto_1fr] sm:p-12">
            <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
              <Image src={asset("/images/mascot.webp")} alt="艾飛樂品牌 IP 角色" fill className="object-contain" />
            </div>
            <div>
              <SectionHeading eyebrow="BRAND CHARACTER" title="艾飛樂的 IP 角色" />
              <p className="mt-4 text-sm leading-loose text-paper/70 sm:text-base">
                戴著草帽、綁著雙辮的女孩，是艾飛樂的品牌代言角色。她總是靜靜微笑、雙手合十，
                像是在傾聽每個人的心事——這份安靜而溫暖的陪伴感，正是艾飛樂語錄想帶給每位讀者的感受。
              </p>
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
    </div>
  );
}
