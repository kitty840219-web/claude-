"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data/site";
import {
  PAYMENT_METHODS,
  SERVICE_NOTES,
  SINGLE_SERVICES,
  SUPPORT_SITUATIONS,
  TAROT_PACKAGES,
  VIP_PLANS,
  type TarotPackage,
} from "@/lib/data/tarotServices";

export default function TarotServiceMenu() {
  const [selected, setSelected] = useState<TarotPackage | null>(null);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-16 text-amber-50">
      <div className="rounded-[2rem] bg-white/[0.04] px-5 py-6 text-left">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-amber-200/70">TAROT SERVICES</p>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">付費真人占卜服務</h2>
        <p className="mt-2 text-xs leading-6 text-amber-200/70">
          一次占卜．5 個問題．指引方向．看見答案．療癒內在
        </p>
      </div>

      {/* Single services */}
      <section className="mt-6">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">單次服務</h3>
        <div className="space-y-2">
          {SINGLE_SERVICES.map((s) => (
            <div key={s.title} className="flex items-start justify-between gap-3 rounded-xl border border-amber-200/20 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-amber-100">{s.title}</p>
                {s.note && <p className="mt-1 text-[11px] leading-5 text-amber-200/60">{s.note}</p>}
              </div>
              <p className="shrink-0 whitespace-nowrap text-sm font-bold text-amber-200">
                {s.price}
                {s.unit && <span className="ml-0.5 text-[10px] font-normal text-amber-200/60">{s.unit}</span>}
              </p>
            </div>
          ))}
          <p className="pt-1 text-center text-[11px] text-amber-200/50">超過 2 個問題．一個問題加收 $300</p>
        </div>
      </section>

      {/* VIP plans */}
      <section className="mt-8">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">VIP 包月方案</h3>
        <div className="space-y-3">
          {VIP_PLANS.map((plan) => (
            <div key={plan.key} className="rounded-xl border border-amber-200/25 bg-white/[0.03] p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-serif text-base font-bold text-amber-100">
                  {plan.title} <span className="ml-1 text-xs font-normal text-amber-200/60">{plan.subtitle}</span>
                </p>
                <p className="shrink-0 text-base font-bold text-amber-200">{plan.price}<span className="text-[10px] font-normal text-amber-200/60">/月</span></p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {plan.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs leading-5 text-amber-50/85">
                    <span className="mt-0.5 text-amber-300">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-5 text-amber-200/60">✦ {plan.fit}</p>
            </div>
          ))}
        </div>
        <p className="pt-3 text-center text-[11px] text-amber-200/50">超過 2 個問題．一個問題加收 $300</p>
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

      {/* Support situations */}
      <section className="mt-8">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">這些狀況．塔羅能陪伴你</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {SUPPORT_SITUATIONS.map((s) => (
            <div key={s.label} className="rounded-xl border border-amber-200/20 bg-white/[0.03] px-3 py-3">
              <p className="text-xs font-semibold text-amber-100">{s.label}</p>
              <p className="mt-1 text-[10px] leading-4 text-amber-200/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service notes */}
      <section className="mt-8 rounded-xl border border-amber-200/20 bg-white/[0.03] p-4">
        <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-200/70">服務說明</h3>
        <ul className="space-y-1.5">
          {SERVICE_NOTES.map((n) => (
            <li key={n} className="flex items-start gap-2 text-xs leading-5 text-amber-50/80">
              <span className="mt-0.5 text-amber-300">・</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Payment */}
      <section className="mt-6 rounded-xl border border-amber-200/20 bg-white/[0.03] p-4">
        <h3 className="mb-2 text-xs font-semibold tracking-[0.2em] text-amber-200/70">付款方式</h3>
        <p className="text-xs leading-6 text-amber-50/80">國內支付：{PAYMENT_METHODS.domestic}</p>
        <p className="text-xs leading-6 text-amber-50/80">海外支付：{PAYMENT_METHODS.overseas}</p>
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
    </div>
  );
}
