import Image from "next/image";
import Link from "next/link";
import Star from "@/components/Star";
import SectionHeading from "@/components/SectionHeading";
import QuoteCard from "@/components/QuoteCard";
import SocialIcon from "@/components/SocialIcon";
import StatBadge from "@/components/StatBadge";
import { LINKS, SERVICES, SITE } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";
import { asset } from "@/lib/basePath";

const QUICK_NAV = [
  {
    href: "/story",
    title: "艾飛樂的故事",
    desc: "從一個人的塗塗畫畫，到艾飛樂語錄的品牌旅程",
  },
  {
    href: "/works",
    title: "語錄作品",
    desc: "插畫語錄選粹，用一句話說出你的心事",
  },
  {
    href: "/videos",
    title: "影音創作",
    desc: "YouTube 頻道與短影音創作紀錄",
  },
  {
    href: "/shop",
    title: "周邊商店",
    desc: "明信片、貼紙、LINE 貼圖與客製小物",
  },
  {
    href: "/contact",
    title: "合作聯絡",
    desc: "插畫委託、品牌合作與接案洽詢",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night-dark">
        <div className="relative aspect-square w-full">
          <Image
            src={asset("/images/xiaoai-05-flat.jpg")}
            alt="小艾坐在窗邊望著星空寫日記，身旁有藍色小鳥陪伴"
            fill
            priority
            className="object-cover object-[center_15%]"
          />
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night-dark via-night-dark/80 to-transparent" />

          {/* title overlay — sits in the gradient zone at the bottom of the image */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-8 text-center sm:pb-10">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="h-3 w-3 text-gold-light" />
              <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">
                {SITE.brandEn.toUpperCase()} · SINCE {SITE.established}
              </p>
              <Star className="h-3 w-3 text-gold-light" delay="1.2s" />
            </div>
            <h1 className="text-shadow-soft font-serif text-3xl font-bold text-paper sm:text-4xl">
              {SITE.brand}
            </h1>
            <p className="text-shadow-soft mt-3 text-sm text-paper/90 sm:text-base">
              {SITE.tagline}，{SITE.taglineSub}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <StatBadge icon={<Star className="h-3.5 w-3.5" />} label={`${SITE.established} 年成立`} light />
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
              <StatBadge icon={<SocialIcon type="shop" className="h-3.5 w-3.5" />} label="147+ 款周邊設計" light />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/works"
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
              >
                探索語錄作品
              </Link>
              <a
                href={LINKS.instagramQuotes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-paper/10"
              >
                <SocialIcon type="instagram" className="h-4 w-4" />
                追蹤 Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / About preview */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-lavender/30 sm:-left-6 sm:-top-6" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-paper shadow-soft">
              <Image
                src={asset("/images/profile.jpg")}
                alt="艾飛樂 Ivy 本人照片"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 24rem, 90vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 h-24 w-24 rotate-6 rounded-2xl bg-paper p-2 shadow-card sm:h-28 sm:w-28">
              <div className="relative h-full w-full">
                <Image src={asset("/images/mascot.png")} alt="艾飛樂 IP 角色" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="ABOUT AIFEILER" title={`嗨，我是 ${SITE.founder}`} />
            <p className="mt-5 text-sm leading-loose text-ink-600 sm:text-base">
              {SITE.description}
            </p>
            <p className="mt-4 text-sm leading-loose text-ink-600 sm:text-base">
              從插畫語錄出發，延伸到品牌視覺、命理靈性設計、客製周邊與 LINE
              貼圖，艾飛樂用溫柔而堅定的筆觸，陪每一位讀者走過屬於自己的黑夜。
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-night underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
            >
              閱讀完整介紹 →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="EXPLORE" title="走進艾飛樂的創作世界" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {QUICK_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col justify-between rounded-2xl border border-night/10 bg-paper p-6 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-night">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                </div>
                <span className="mt-6 text-xs font-semibold text-gold-dark opacity-0 transition group-hover:opacity-100">
                  前往看看 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote strip */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="ILLUSTRATED QUOTES" title="精選語錄" light center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTES.slice(0, 3).map((q, i) => (
              <QuoteCard key={q.id} quote={q} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              查看完整語錄作品集
            </Link>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="SERVICES" title="接案服務項目" center />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <div key={s.title} className="rounded-2xl border border-night/10 bg-paper p-6 shadow-card">
              <h3 className="font-serif text-base font-bold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-night px-7 py-3 text-sm font-semibold text-paper transition hover:bg-night-light"
          >
            查看服務報價 →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-night px-7 py-3 text-sm font-semibold text-night transition hover:bg-night hover:text-paper"
          >
            合作與委託洽詢 →
          </Link>
        </div>
      </section>
    </div>
  );
}
