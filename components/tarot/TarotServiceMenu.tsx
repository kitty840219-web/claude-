"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { LINKS } from "@/lib/data/site";
import { TAROT_PACKAGES, type TarotPackage } from "@/lib/data/tarotServices";

const SERVICE_OVERVIEW_IMAGE = "/images/tarot-services/service-overview.webp";

export default function TarotServiceMenu() {
  const [selected, setSelected] = useState<TarotPackage | null>(null);
  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    if (!selected && !showOverview) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, showOverview]);

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-16 text-amber-50">
      <div className="rounded-[2rem] bg-white/[0.04] px-5 py-6 text-left">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-amber-200/70">TAROT SERVICES</p>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">付費真人占卜服務</h2>
        <p className="mt-2 text-xs leading-6 text-amber-200/70">
          一次占卜．5 個問題．指引方向．看見答案．療癒內在
        </p>
      </div>

      {/* Service overview (single service / VIP plans / notes / payment) */}
      <section className="mt-6">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">單次服務．VIP 包月方案</h3>
        <button
          type="button"
          onClick={() => setShowOverview(true)}
          className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-amber-200/20 bg-white/[0.03] transition hover:border-amber-200/50"
        >
          <Image src={asset(SERVICE_OVERVIEW_IMAGE)} alt="艾飛樂塔羅占卜服務項目與價格" fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0b0f2e]/85 via-transparent to-transparent p-4">
            <p className="text-sm font-semibold text-amber-100">點一下放大查看完整服務內容 →</p>
          </div>
        </button>
      </section>

      {/* Topic packages */}
      <section className="mt-8">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">占卜套餐（各 $1000／5 個問題）</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {TAROT_PACKAGES.map((pkg) => (
            <button
              key={pkg.key}
              type="button"
              onClick={() => setSelected(pkg)}
              className="rounded-xl border border-amber-200/20 bg-white/[0.03] px-3 py-4 text-left text-sm font-semibold text-amber-100 transition hover:border-amber-200/50"
            >
              {pkg.title}
              <span className="mt-1 block text-[10px] font-normal text-amber-200/50">點一下看 5 個問題 →</span>
            </button>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <a
        href={LINKS.lineOA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block rounded-full bg-amber-200 py-3.5 text-center text-sm font-semibold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
      >
        加官方 LINE 預約占卜 →
      </a>
      <p className="mt-4 text-center text-xs leading-6 text-amber-200/60">
        希望每一次占卜，都能成為照亮你心中的光。
        <br />
        每一次抽牌，都是宇宙給你的訊息，讓塔羅陪你一起前行。
      </p>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-[380px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="關閉套餐詳情"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-xl font-bold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
            >
              ✕
            </button>
            <div className="rounded-[1.5rem] border border-amber-200/30 bg-[#0b0f2e] p-6 text-amber-50 shadow-soft">
              <h4 className="font-serif text-lg font-bold text-amber-100">{selected.title}</h4>
              <p className="mt-1 text-sm font-bold text-amber-200">$1000 ／ 5 個問題</p>
              <ol className="mt-4 space-y-2.5">
                {selected.questions.map((q, i) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm leading-6 text-amber-50/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200/15 text-[11px] font-semibold text-amber-200">
                      {i + 1}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <a
                href={LINKS.lineOA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-full bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e] transition hover:bg-amber-100"
              >
                加官方 LINE 預約 →
              </a>
            </div>
          </div>
        </div>
      )}

      {showOverview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setShowOverview(false)}
        >
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowOverview(false)}
              aria-label="關閉服務內容"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-xl font-bold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-amber-200/30 bg-[#0b0f2e] p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative min-h-[70vh] w-full flex-1">
                <Image src={asset(SERVICE_OVERVIEW_IMAGE)} alt="艾飛樂塔羅占卜服務項目與價格" fill className="object-contain" sizes="400px" />
              </div>
              <a
                href={LINKS.lineOA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 shrink-0 rounded-full bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e] transition hover:bg-amber-100"
              >
                加官方 LINE 預約 →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
