import type { Metadata } from "next";
import ShopList from "@/components/shop/ShopList";
import Star from "@/components/Star";
import { LINKS, SITE } from "@/lib/data/site";

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
    mode: "link" as const,
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
    mode: "embed" as const,
  },
];

export default function ShopPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark pb-10 pt-24 text-center">
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
      <section className="relative overflow-hidden bg-night-dark px-4 pb-20 pt-6 sm:px-6">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-gold/15 bg-night-light/20 shadow-card">
          <div className="flex items-center justify-between border-b border-gold/15 px-6 py-4">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-light">STORE · 商店貨架</p>
            <span className="text-xs font-semibold text-paper/50">共 {SHOPS.length} 個商店</span>
          </div>
          <ShopList shops={SHOPS} />
        </div>

        <div className="relative mt-4 flex justify-end sm:hidden">
          <p className="text-xs text-paper/50">點一下卡片查看商店詳情 →</p>
        </div>
      </section>
    </div>
  );
}
