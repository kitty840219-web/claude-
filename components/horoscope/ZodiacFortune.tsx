"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Star from "@/components/Star";
import SectionHeading from "@/components/SectionHeading";
import { ELEMENT_ICON, ZODIAC_SIGNS, ZodiacSign } from "@/lib/horoscope/signs";
import { FortuneReport, generateFortune, todayKey } from "@/lib/horoscope/reading";

function ScoreStars({ score }: { score: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${score} 顆星`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${i < score ? "text-gold-light" : "text-paper/20"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function FortuneCard({ sign, report }: { sign: ZodiacSign; report: FortuneReport }) {
  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl">{sign.symbol}</span>
        <h2 className="font-serif text-2xl font-bold text-paper">{sign.name}</h2>
        <p className="text-xs text-paper/50">{sign.dateRange}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-paper/60">
          <span className="inline-flex items-center gap-1 rounded-full border border-gold/15 bg-night-light/20 px-2 py-0.5">
            {ELEMENT_ICON[sign.element]} {sign.element}象星座
          </span>
          <span className="rounded-full border border-gold/15 bg-night-light/20 px-2 py-0.5">守護星・{sign.ruler}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-light">TODAY&apos;S FORTUNE</p>
          <ScoreStars score={report.overallScore} />
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-paper/85">{report.overallOpener}</p>
      </div>

      <div className="space-y-3">
        {report.categories.map((c) => (
          <div key={c.key} className="rounded-2xl border border-gold/15 bg-night-light/20 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-paper">{c.label}</p>
              <ScoreStars score={c.score} />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-paper/70">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gold-light">幸運色</p>
          <p className="mt-1 text-sm font-semibold text-paper">{report.luckyColor}</p>
        </div>
        <div className="flex-1 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gold-light">幸運數字</p>
          <p className="mt-1 text-sm font-semibold text-paper">{report.luckyNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default function ZodiacFortune() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const dateKey = useMemo(() => todayKey(), []);
  const report = useMemo(() => (selected ? generateFortune(selected, dateKey) : null), [selected, dateKey]);

  return (
    <div className="relative overflow-hidden bg-night-dark pb-16 pt-24 text-paper">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {!selected && (
          <>
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="h-3 w-3 text-gold-light" />
              <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">HOROSCOPE</p>
              <Star className="h-3 w-3 text-gold-light" delay="1s" />
            </div>
            <SectionHeading title="星座運勢" desc="選擇你的星座，看看今天的愛情、事業、財運與健康提醒。" center />

            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign.id}
                  onClick={() => setSelected(sign)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/15 bg-night-light/20 py-4 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
                >
                  <span className="text-3xl">{sign.symbol}</span>
                  <span className="text-xs font-semibold text-paper">{sign.name}</span>
                  <span className="text-[10px] text-paper/50">{sign.dateRange}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {selected && report && (
          <div className="mx-auto max-w-md">
            <FortuneCard sign={selected} report={report} />
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 rounded-full border border-gold/40 py-3 text-sm font-semibold text-gold-light transition hover:bg-gold/10"
              >
                換個星座
              </button>
              <Link
                href="/"
                className="flex-1 rounded-full bg-gold py-3 text-center text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
              >
                回首頁
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
