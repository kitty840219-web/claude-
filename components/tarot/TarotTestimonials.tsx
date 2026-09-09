"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { LINKS } from "@/lib/data/site";
import { TAROT_TESTIMONIAL_PHOTOS } from "@/lib/data/tarotTestimonials";

export default function TarotTestimonials() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-4 text-amber-50">
      <h3 className="mb-1 text-xs font-semibold tracking-[0.2em] text-amber-200/70">客戶真實回饋</h3>
      <p className="mb-4 text-[11px] text-amber-200/50">真實好評持續累積中</p>

      <div className="grid grid-cols-3 gap-2">
        {TAROT_TESTIMONIAL_PHOTOS.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(src)}
            className="relative aspect-square overflow-hidden rounded-lg border border-amber-200/20 bg-white/[0.03] transition hover:border-amber-200/50"
          >
            <Image src={asset(src)} alt="塔羅占卜客戶回饋截圖" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>

      <a
        href={LINKS.googleReviews}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block rounded-full bg-amber-200 py-3.5 text-center text-sm font-semibold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
      >
        查看 Google 真實評論 →
      </a>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setSelected(null)}
        >
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="關閉客戶回饋"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-xl font-bold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-amber-200/30 bg-[#0b0f2e] p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative min-h-[60vh] w-full flex-1 overflow-hidden rounded-xl">
                <Image src={asset(selected)} alt="塔羅占卜客戶回饋截圖" fill className="object-contain" sizes="400px" />
              </div>
              <a
                href={LINKS.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 shrink-0 rounded-full bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e] transition hover:bg-amber-100"
              >
                查看 Google 真實評論 →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
