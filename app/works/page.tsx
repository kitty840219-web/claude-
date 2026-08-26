import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
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
      <section className="relative overflow-hidden bg-night-dark py-24 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">WORKS</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">語錄作品</h1>
          <p className="mt-4 text-paper/70">
            每一句語錄，都是艾飛樂想遞給讀者的一顆星星。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="FULL ARCHIVE" title="完整作品都在這裡" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <a
              href={LINKS.instagramQuotes}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-night/10 bg-paper p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="instagram" className="h-8 w-8 text-night" />
              <p className="font-serif text-base font-bold text-night">艾飛樂語錄</p>
              <p className="text-xs text-ink-500">@aibi_0219 · 每日語錄與插畫日常</p>
            </a>
            <a
              href={LINKS.instagramIllustration}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-night/10 bg-paper p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="instagram" className="h-8 w-8 text-night" />
              <p className="font-serif text-base font-bold text-night">dreamstar_illustration</p>
              <p className="text-xs text-ink-500">插畫創作專門帳號</p>
            </a>
            <a
              href={LINKS.kusdom}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-night/10 bg-paper p-8 text-center shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              <SocialIcon type="shop" className="h-8 w-8 text-night" />
              <p className="font-serif text-base font-bold text-night">Kusdom 創作者商店</p>
              <p className="text-xs text-ink-500">語錄作品製作成周邊商品</p>
            </a>
          </div>
        </div>
      </section>

      {/* Mascot band */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <div className="relative mx-auto h-28 w-28">
          <Image src={asset("/images/mascot.png")} alt="艾飛樂 IP 角色" fill className="object-contain" />
        </div>
        <p className="mt-6 font-serif text-lg text-night sm:text-xl">
          「{SITE.tagline}，{SITE.taglineSub}。」
        </p>
      </section>
    </div>
  );
}
