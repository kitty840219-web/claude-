import Image from "next/image";
import Link from "next/link";
import Star from "@/components/Star";
import SectionHeading from "@/components/SectionHeading";
import QuoteCard from "@/components/QuoteCard";
import SocialIcon from "@/components/SocialIcon";
import StatBadge from "@/components/StatBadge";
import HomeGameHub from "@/components/HomeGameHub";
import SocialStation from "@/components/SocialStation";
import { LINKS, SITE } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";
import { asset } from "@/lib/basePath";

const QUICK_NAV = [
  {
    href: "/story",
    title: "艾飛樂的故事",
    desc: "從一個人的塗塗畫畫，到艾飛樂語錄的品牌旅程",
    image: "/images/home-story-cutout.png",
    tone: "from-[#f4e8d7] to-[#ded9ef]",
  },
  {
    href: "/works",
    title: "語錄作品",
    desc: "插畫語錄選粹，用一句話說出你的心事",
    image: "/images/home-quotes-cutout.png",
    tone: "from-[#f9e8e1] to-[#e7e1f2]",
  },
  {
    href: "/videos",
    title: "影音創作",
    desc: "YouTube 頻道與短影音創作紀錄",
    image: "/images/home-video.png",
    tone: "from-[#e6eef4] to-[#eee7f4]",
  },
  {
    href: "/shop",
    title: "周邊商店",
    desc: "明信片、貼紙、LINE 貼圖與客製小物",
    image: "/images/home-shop.png",
    tone: "from-[#f7eadc] to-[#eee4f3]",
  },
  {
    href: "/contact",
    title: "合作聯絡",
    desc: "插畫委託、品牌合作與接案洽詢",
    image: "/images/home-contact.png",
    tone: "from-[#f8e5e4] to-[#e5eaf3]",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="overflow-hidden bg-paper">
        <div className="relative aspect-square w-full">
          <Image
            src={asset("/images/xiaoai-05-flat.jpg")}
            alt="小艾坐在窗邊望著星空寫日記，身旁有藍色小鳥陪伴"
            fill
            priority
            className="object-cover object-[center_15%]"
          />
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night-dark/20 to-transparent" />
        </div>

        <div className="relative px-5 py-9 text-center">
          <div className="pointer-events-none absolute -right-6 top-4 h-24 w-24 rounded-full bg-lavender/15 blur-2xl" />
          <div className="pointer-events-none absolute -left-8 bottom-4 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="h-3 w-3 text-gold-dark" />
              <p className="text-xs font-semibold tracking-[0.35em] text-gold-dark">
                {SITE.brandEn.toUpperCase()} · SINCE {SITE.established}
              </p>
              <Star className="h-3 w-3 text-gold-dark" delay="1.2s" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-night sm:text-4xl">{SITE.brand}</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-500 sm:text-base">
              {SITE.tagline}，{SITE.taglineSub}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <StatBadge icon={<Star className="h-3.5 w-3.5" />} label={`${SITE.established} 年成立`} />
              <StatBadge
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0v-13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                }
                label={`${QUOTES.length}+ 篇語錄作品`}
              />
              <StatBadge icon={<SocialIcon type="shop" className="h-3.5 w-3.5" />} label="147+ 款周邊設計" />
            </div>
            <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 gap-3">
              <Link
                href="/works"
                className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
              >
                探索語錄作品
              </Link>
              <a
                href={LINKS.instagramQuotes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-night/20 bg-paper px-4 py-3 text-sm font-semibold text-night transition hover:border-gold/50 hover:bg-paper-warm"
              >
                <SocialIcon type="instagram" className="h-4 w-4" />
                追蹤 Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <HomeGameHub />

      <SocialStation />

      {/* Quick nav */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="EXPLORE" title="走進艾飛樂的創作世界" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {QUICK_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative min-h-52 overflow-hidden rounded-[1.75rem] border border-night/10 bg-gradient-to-br ${item.tone} p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/50`}
              >
                <div className="relative z-10 flex min-h-40 w-[58%] flex-col justify-center">
                  <h3 className="font-serif text-lg font-bold text-night">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                  <span className="mt-5 inline-flex text-xs font-semibold text-gold-dark transition group-hover:translate-x-1">
                    前往看看 →
                  </span>
                </div>
                <div className="pointer-events-none absolute -bottom-2 -right-5 h-[92%] w-[52%] animate-float-slow">
                  <Image
                    src={asset(item.image)}
                    alt={`${item.title}小艾插畫`}
                    fill
                    className="object-contain object-bottom transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                </div>
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
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-paper/10 shadow-soft">
            <Image
              src={asset("/images/home-quotes.png")}
              alt="小艾抱著語錄卡與信件的水彩插畫"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 28rem, 92vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-dark/20 to-transparent" />
          </div>
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

    </div>
  );
}
