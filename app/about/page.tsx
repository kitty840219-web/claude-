import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Star from "@/components/Star";
import StatBadge from "@/components/StatBadge";
import SocialIcon from "@/components/SocialIcon";
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
      <section className="bg-paper-warm px-4 pb-16 pt-8">
        <div className="mx-auto max-w-sm">
          <div className="mb-7 text-center">
            <p className="text-xs font-semibold tracking-[0.35em] text-gold-dark">ABOUT THE AUTHOR</p>
            <h1 className="mt-3 font-serif text-3xl font-bold text-night">關於作者</h1>
          </div>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] bg-lavender/35" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-paper shadow-soft">
              <Image src={asset("/images/profile.jpg")} alt="艾飛樂創辦人 Ivy" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-5 -right-2 h-24 w-24 rotate-6 rounded-2xl bg-paper p-2 shadow-card">
              <div className="relative h-full w-full">
                <Image src={asset("/images/mascot.png")} alt="小艾 IP 角色" fill className="object-contain" />
              </div>
            </div>
          </div>
          <div className="mt-14">
            <SectionHeading eyebrow="ABOUT AIFEILER" title={`嗨，我是 ${SITE.founder}`} />
            <p className="mt-5 text-sm leading-loose text-ink-600">{SITE.description}</p>
            <p className="mt-4 text-sm leading-loose text-ink-600">
              從插畫語錄出發，延伸到品牌視覺、命理靈性設計、客製周邊與 LINE
              貼圖，艾飛樂用溫柔而堅定的筆觸，陪每一位讀者走過屬於自己的黑夜。
            </p>
          </div>
        </div>
      </section>

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
            <StatBadge icon={<Star className="h-3.5 w-3.5" />} label={`${SITE.established} 年成立`} light />
            <StatBadge
              icon={<SocialIcon type="shop" className="h-3.5 w-3.5" />}
              label={`${SERVICES.length} 大服務項目`}
              light
            />
            <StatBadge
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              }
              label={`${QUOTES.length}+ 篇語錄作品`}
              light
            />
          </div>
        </div>
        <div className="relative aspect-square w-full">
          <Image
            src={asset("/images/xiaoai-03-about-page.png")}
            alt="小艾站在畫架前，手拿畫筆與水彩調色盤"
            fill
            className="object-cover object-[center_0%]"
          />
        </div>
      </section>

      {/* Mascot intro */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-[2rem] border border-night/10 bg-paper p-8 shadow-card sm:grid-cols-[auto_1fr] sm:p-12">
            <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
              <Image src={asset("/images/mascot.png")} alt="艾飛樂品牌 IP 角色" fill className="object-contain" />
            </div>
            <div>
              <SectionHeading eyebrow="BRAND CHARACTER" title="艾飛樂的 IP 角色" />
              <p className="mt-4 text-sm leading-loose text-ink-600 sm:text-base">
                戴著草帽、綁著雙辮的女孩，是艾飛樂的品牌代言角色。她總是靜靜微笑、雙手合十，
                像是在傾聽每個人的心事——這份安靜而溫暖的陪伴感，正是艾飛樂語錄想帶給每位讀者的感受。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="TIMELINE" title="創作歷程" center />
        <div className="relative mt-12 space-y-10 border-l-2 border-dashed border-lavender/60 pl-8">
          {TIMELINE.map((t) => (
            <div key={t.title} className="relative">
              <span className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow" />
              <p className="text-xs font-semibold tracking-widest text-gold-dark">{t.year}</p>
              <h3 className="mt-1 font-serif text-lg font-bold text-night">{t.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services / resume-style skills */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="SKILLS & SERVICES" title="專業能力與服務項目" light center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-grain relative overflow-hidden rounded-2xl border border-paper/10 bg-night-light/40 p-6"
              >
                <h3 className="font-serif text-base font-bold text-gold-light">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              我想洽談合作 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
