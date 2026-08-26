import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
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
    href: LINKS.kusdom,
    icon: "shop" as const,
    cta: "前往商店選購",
  },
  {
    key: "line",
    title: "LINE 貼圖商店",
    desc: "把艾飛樂語錄的溫柔，帶進日常對話裡。多款主題貼圖陸續上架。",
    href: LINKS.lineSticker,
    icon: "line" as const,
    cta: "查看貼圖作品",
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

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {SHOPS.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-night/10 bg-paper shadow-card transition hover:-translate-y-1"
            >
              <div className="bg-grain relative flex h-40 items-center justify-center bg-gradient-to-br from-lavender/60 to-night-light">
                <div className="relative h-24 w-24">
                  <Image src={asset("/images/mascot.png")} alt="" fill className="object-contain drop-shadow-lg" />
                </div>
              </div>
              <div className="p-7">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-night text-paper">
                  <SocialIcon type={s.icon} className="h-4 w-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-night">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                <span className="mt-5 inline-block text-xs font-semibold text-gold-dark group-hover:underline">
                  {s.cta} →
                </span>
              </div>
            </a>
          ))}
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
    </div>
  );
}
