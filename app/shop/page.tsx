import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
import TagChip from "@/components/TagChip";
import { LINKS, SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `周邊商店 ｜ ${SITE.brand}`,
  description: "艾飛樂周邊商品：客製化商品、LINE 貼圖與更多小物。",
};

const SHOPS = [
  {
    key: "kusdom",
    title: "Kusdom 創作者商店",
    desc: "明信片、貼紙、飾品、生命靈數水晶等艾飛樂語錄客製化周邊商品，147+ 款設計持續更新中。",
    meta: "147+ 款設計",
    href: LINKS.kusdom,
    icon: "shop" as const,
    cta: "前往商店選購",
    tag: "熱銷中",
  },
  {
    key: "line",
    title: "LINE 貼圖商店",
    desc: "把艾飛樂語錄的溫柔，帶進日常對話裡。多款主題貼圖陸續上架。",
    meta: "多款主題",
    href: LINKS.lineSticker,
    icon: "line" as const,
    cta: "查看貼圖作品",
    tag: "持續上架",
  },
];

export default function ShopPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark py-24 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">SHOP</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">周邊商店</h1>
          <p className="mt-4 text-paper/70">把語錄裡的溫柔，變成隨身攜帶的小物件</p>
        </div>
      </section>

      {/* Shop list */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-[1.75rem] border border-night/10 bg-paper shadow-card">
          <div className="flex items-center justify-between border-b border-night/10 bg-paper-warm px-6 py-4">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-dark">STORE · 商店貨架</p>
            <span className="text-xs font-semibold text-ink-400">共 {SHOPS.length} 個商店</span>
          </div>
          <div className="divide-y divide-night/10">
            {SHOPS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-5 py-5 transition hover:bg-gold/5 sm:gap-6 sm:px-7"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-night text-paper shadow-card sm:h-16 sm:w-16">
                  <SocialIcon type={s.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-base font-bold text-night sm:text-lg">{s.title}</span>
                    <TagChip tone="gold">{s.tag}</TagChip>
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-ink-500 sm:text-sm">
                    {s.desc}
                  </span>
                </span>
                <span className="hidden shrink-0 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-night-dark shadow-soft transition group-hover:bg-gold-light sm:inline-block sm:text-sm">
                  {s.cta}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end sm:hidden">
          <p className="text-xs text-ink-400">點一下卡片即可前往商店 →</p>
        </div>
      </section>

      <section className="bg-paper-warm py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="CUSTOM ORDER"
            title="想要獨一無二的客製周邊？"
            desc="艾飛樂也提供品牌／個人客製化周邊設計服務，從發想到生產一站式協助，歡迎與我聯絡討論你的需求。"
            center
          />
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-night px-7 py-3 text-sm font-semibold text-paper shadow-soft transition hover:bg-night-light"
          >
            聯絡艾飛樂 →
          </a>
        </div>
      </section>

      {/* Mascot band */}
      <section className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6">
        <div className="relative mx-auto h-20 w-20">
          <Image src={asset("/images/mascot.png")} alt="艾飛樂 IP 角色" fill className="object-contain" />
        </div>
      </section>
    </div>
  );
}
