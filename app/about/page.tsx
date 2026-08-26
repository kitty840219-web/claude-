import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Star from "@/components/Star";
import { LINKS, SERVICES, SITE, TIMELINE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `關於艾飛樂 ｜ ${SITE.brand}`,
  description: SITE.description,
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark py-24 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">ABOUT</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">關於艾飛樂</h1>
          <p className="mt-4 text-paper/70">{SITE.brandFull}</p>
        </div>
      </section>

      {/* Bio */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm order-2 md:order-1">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-gold/20 sm:-right-6 sm:-top-6" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-paper shadow-soft">
              <Image
                src="/images/profile.jpg"
                alt="艾飛樂創辦人 Ivy"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 24rem, 90vw"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <SectionHeading eyebrow="STORY" title={`${SITE.founder} × ${SITE.brand}`} />
            <div className="mt-5 space-y-4 text-sm leading-loose text-ink-600 sm:text-base">
              <p>
                {SITE.brandFull}由 {SITE.founder} 於 {SITE.established}{" "}
                年成立，是一間融合療癒與美感的數位文創工作室。
              </p>
              <p>
                艾飛樂相信，文字與插畫是最溫柔的陪伴方式——把生活裡難以言說的心事，畫成一張張語錄圖卡，
                寫下「{SITE.tagline}」的信念：即使身處低潮，依然能找到屬於自己的那顆星星。
              </p>
              <p>
                目前作品涵蓋插畫語錄、命理與靈性主題視覺、品牌周邊設計、LINE
                貼圖與短影音創作，並持續透過 Instagram、YouTube 與周邊商店，
                將這份共鳴傳遞給更多人。
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKS.portaly}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-night/20 px-5 py-2 text-xs font-semibold text-night hover:bg-night hover:text-paper"
              >
                所有連結一覽 Portaly →
              </a>
              <a
                href={LINKS.pro360}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-night/20 px-5 py-2 text-xs font-semibold text-night hover:bg-night hover:text-paper"
              >
                PRO360 服務頁面 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mascot intro */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-[2rem] border border-night/10 bg-paper p-8 shadow-card sm:grid-cols-[auto_1fr] sm:p-12">
            <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
              <Image src="/images/mascot.png" alt="艾飛樂品牌 IP 角色" fill className="object-contain" />
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
