import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import QuoteCard from "@/components/QuoteCard";
import QuoteGallery from "@/components/QuoteGallery";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
import { LINKS, SITE } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `語錄作品 ｜ ${SITE.brand}`,
  description: "艾飛樂語錄插畫作品選粹，完整作品請追蹤 Instagram。",
};

export default function WorksPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark">
        <div className="relative aspect-square w-full">
          <Image
            src={asset("/images/xiaoai-04-works-page.webp")}
            alt="小艾抱著一疊語錄卡片，身邊飄著發光的星星與紙飛機"
            fill
            className="object-cover object-[center_0%]"
          />
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-20" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night-dark via-night-dark/80 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-8 text-center sm:pb-10">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="h-3 w-3 text-gold-light" />
              <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">WORKS</p>
              <Star className="h-3 w-3 text-gold-light" delay="1s" />
            </div>
            <h1 className="text-shadow-soft font-serif text-3xl font-bold text-paper sm:text-4xl">語錄作品</h1>
            <p className="text-shadow-soft mt-2 text-sm text-paper/90">
              每一句語錄，都是艾飛樂想遞給讀者的一顆星星。
            </p>
          </div>
        </div>
      </section>

      {/* Featured quotes */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="ILLUSTRATED QUOTES" title="精選語錄" center />
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-paper/10 shadow-soft">
            <Image
              src={asset("/images/home-quotes.webp")}
              alt="小艾抱著語錄卡與信件的水彩插畫"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 28rem, 92vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-dark/20 to-transparent" />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTES.slice(0, 3).map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#full-gallery" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light">
              查看完整語錄作品集 ↓
            </a>
          </div>
        </div>
      </section>

      <section className="bg-night-dark px-4 py-12">
        <a href={LINKS.instagramQuotes} target="_blank" rel="noopener noreferrer" className="group relative mx-auto block min-h-44 max-w-md overflow-hidden rounded-[1.75rem] border border-paper/10 bg-night-light/20 p-5 shadow-card">
          <div className="relative z-10 w-[58%]">
            <SocialIcon type="instagram" className="h-6 w-6 text-paper" />
            <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-gold-light">INSTAGRAM</p>
            <h2 className="mt-1 font-serif text-base font-bold text-paper">每日語錄與插畫</h2>
            <p className="mt-2 text-xs text-paper/60">@aibi_0219</p>
            <span className="mt-4 inline-flex text-xs font-semibold text-gold-light">打開作品牆 →</span>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-5 h-44 w-44 transition duration-500 group-hover:scale-105">
            <Image src={asset("/images/home-quotes-cutout.webp")} alt="小艾語錄創作" fill className="object-contain object-bottom" sizes="176px" />
          </div>
        </a>
      </section>

      <section id="full-gallery" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="ILLUSTRATED QUOTES"
          title="風格語錄選粹"
          desc="以艾飛樂語錄一貫的溫柔筆調創作，完整每日更新與插畫原作，歡迎追蹤 Instagram 帳號閱讀。"
        />
        <div className="mt-10">
          <QuoteGallery quotes={QUOTES} />
        </div>
      </section>

      {/* Archive links */}
      <section className="bg-night-dark py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="FULL ARCHIVE" title="完整作品都在這裡" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <a
              href={LINKS.instagramQuotes}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-paper/10 bg-night-light/20 p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="instagram" className="h-8 w-8 text-gold-light" />
              <p className="font-serif text-base font-bold text-paper">艾飛樂語錄</p>
              <p className="text-xs text-paper/60">@aibi_0219 · 每日語錄與插畫日常</p>
            </a>
            <a
              href={LINKS.instagramIllustration}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-paper/10 bg-night-light/20 p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="instagram" className="h-8 w-8 text-gold-light" />
              <p className="font-serif text-base font-bold text-paper">dreamstar_illustration</p>
              <p className="text-xs text-paper/60">插畫創作專門帳號</p>
            </a>
            <a
              href={LINKS.kusdom}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-paper/10 bg-night-light/20 p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="shop" className="h-8 w-8 text-gold-light" />
              <p className="font-serif text-base font-bold text-paper">Kusdom 創作者商店</p>
              <p className="text-xs text-paper/60">語錄作品製作成周邊商品</p>
            </a>
          </div>
        </div>
      </section>

      {/* Mascot band */}
      <section className="relative overflow-hidden bg-night-dark px-4 py-20 text-center sm:px-6">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto h-28 w-28">
          <Image src={asset("/images/mascot.webp")} alt="艾飛樂 IP 角色" fill className="object-contain" />
        </div>
        <p className="relative mt-6 font-serif text-lg text-paper sm:text-xl">
          「{SITE.tagline}，{SITE.taglineSub}。」
        </p>
      </section>
    </div>
  );
}
