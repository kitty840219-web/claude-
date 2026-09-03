"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Star from "@/components/Star";
import SectionHeading from "@/components/SectionHeading";
import { ELEMENT_ICON, ZODIAC_SIGNS, ZodiacSign } from "@/lib/horoscope/signs";
import { FortuneReport, generateFortune, todayKey } from "@/lib/horoscope/reading";
import { PERSONALITY } from "@/lib/horoscope/personality";
import { getCompatibility } from "@/lib/horoscope/compatibility";

type Tab = "fortune" | "personality" | "match";

const TABS: { id: Tab; label: string }[] = [
  { id: "fortune", label: "今日運勢" },
  { id: "personality", label: "個性特質" },
  { id: "match", label: "星座配對" },
];

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

function SignBadgeRow({ sign }: { sign: ZodiacSign }) {
  return (
    <div className="mt-1 flex items-center gap-2 text-xs text-paper/60">
      <span className="inline-flex items-center gap-1 rounded-full border border-gold/15 bg-night-light/20 px-2 py-0.5">
        {ELEMENT_ICON[sign.element]} {sign.element}象星座
      </span>
      <span className="rounded-full border border-gold/15 bg-night-light/20 px-2 py-0.5">守護星・{sign.ruler}</span>
    </div>
  );
}

function FortunePanel({ report }: { report: FortuneReport }) {
  return (
    <div className="w-full space-y-3">
      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-light">TODAY&apos;S FORTUNE</p>
            <p className="mt-1 text-sm font-semibold text-paper">{report.dateDisplay}</p>
          </div>
          <ScoreStars score={report.overallScore} />
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-paper/85">{report.overallOpener}</p>
      </div>

      {report.categories.map((c) => (
        <div key={c.key} className="rounded-2xl border border-gold/15 bg-night-light/20 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-paper">{c.label}</p>
            <ScoreStars score={c.score} />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-paper/70">{c.text}</p>
        </div>
      ))}

      <div className="flex gap-3">
        <div className="flex-1 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gold-light">幸運色</p>
          <p className="mt-1 text-sm font-semibold text-paper">{report.luckyColor}</p>
        </div>
        <div className="flex-1 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gold-light">幸運數字</p>
          <p className="mt-1 text-sm font-semibold text-paper">{report.luckyNumber}</p>
        </div>
        <div className="flex-1 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gold-light">幸運方位</p>
          <p className="mt-1 text-sm font-semibold text-paper">{report.luckyDirection}</p>
        </div>
      </div>
    </div>
  );
}

function PersonalityPanel({ sign }: { sign: ZodiacSign }) {
  const p = PERSONALITY[sign.id];
  return (
    <div className="w-full space-y-3">
      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-5">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-light">OVERVIEW</p>
        <p className="mt-3 text-sm leading-relaxed text-paper/85">{p.overview}</p>
      </div>
      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-4">
        <p className="text-sm font-semibold text-paper">優點特質</p>
        <ul className="mt-2 space-y-1.5">
          {p.strengths.map((s) => (
            <li key={s} className="flex items-start gap-1.5 text-xs leading-relaxed text-paper/70">
              <span className="mt-0.5 text-gold-light">✦</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-4">
        <p className="text-sm font-semibold text-paper">待調整的地方</p>
        <ul className="mt-2 space-y-1.5">
          {p.challenges.map((s) => (
            <li key={s} className="flex items-start gap-1.5 text-xs leading-relaxed text-paper/70">
              <span className="mt-0.5 text-gold-light">✦</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MatchPanel({ sign, partner, onPickPartner, onReset }: { sign: ZodiacSign; partner: ZodiacSign | null; onPickPartner: (s: ZodiacSign) => void; onReset: () => void }) {
  if (!partner) {
    return (
      <div className="w-full">
        <p className="mb-4 text-center text-sm text-paper/70">選擇對方的星座，看看兩人的速配指數</p>
        <div className="grid grid-cols-3 gap-2.5">
          {ZODIAC_SIGNS.map((s) => (
            <button
              key={s.id}
              onClick={() => onPickPartner(s)}
              className="flex flex-col items-center gap-1 overflow-hidden rounded-2xl border border-gold/15 bg-night-light/20 pb-2 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              {s.image ? (
                <div className="relative aspect-square w-full">
                  <Image src={s.image} alt={s.name} fill className="object-contain" sizes="140px" />
                </div>
              ) : (
                <span className="pt-3 text-2xl">{s.symbol}</span>
              )}
              <span className="text-[11px] font-semibold text-paper">{s.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const result = getCompatibility(sign, partner);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          {sign.image ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/40">
              <Image src={sign.image} alt={sign.name} fill className="object-cover" sizes="64px" />
            </div>
          ) : (
            <span className="text-3xl">{sign.symbol}</span>
          )}
          <span className="text-xs text-paper/70">{sign.name}</span>
        </div>
        <span className="text-xl text-gold-light">✦</span>
        <div className="flex flex-col items-center gap-1">
          {partner.image ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/40">
              <Image src={partner.image} alt={partner.name} fill className="object-cover" sizes="64px" />
            </div>
          ) : (
            <span className="text-3xl">{partner.symbol}</span>
          )}
          <span className="text-xs text-paper/70">{partner.name}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gold/15 bg-night-light/20 p-5 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-light">COMPATIBILITY</p>
        <div className="mt-2 flex justify-center">
          <ScoreStars score={result.score} />
        </div>
        <p className="mt-2 font-serif text-lg font-bold text-paper">{result.verdict}</p>
        <p className="mt-3 text-left text-sm leading-relaxed text-paper/80">{result.desc}</p>
      </div>

      <button
        onClick={onReset}
        className="w-full rounded-full border border-gold/40 py-2.5 text-sm font-semibold text-gold-light transition hover:bg-gold/10"
      >
        換一個對象
      </button>
    </div>
  );
}

export default function ZodiacFortune() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const [tab, setTab] = useState<Tab>("fortune");
  const [partner, setPartner] = useState<ZodiacSign | null>(null);
  const dateKey = useMemo(() => todayKey(), []);
  const report = useMemo(() => (selected ? generateFortune(selected, dateKey) : null), [selected, dateKey]);

  function selectSign(sign: ZodiacSign) {
    setSelected(sign);
    setTab("fortune");
    setPartner(null);
  }

  function resetAll() {
    setSelected(null);
    setPartner(null);
    setTab("fortune");
  }

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <div className="relative overflow-hidden bg-night-dark pb-16 pt-24 text-paper">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Star className="h-3 w-3 text-gold-light" />
          <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">HOROSCOPE</p>
          <Star className="h-3 w-3 text-gold-light" delay="1s" />
        </div>
        <SectionHeading title="星座運勢" desc="選擇你的星座，看今日運勢、個性特質，還有星座配對。" center />

        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.id}
              onClick={() => selectSign(sign)}
              className="flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border border-gold/15 bg-night-light/20 pb-3 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
            >
              {sign.image ? (
                <div className="relative aspect-square w-full">
                  <Image src={sign.image} alt={sign.name} fill className="object-contain" sizes="(min-width: 640px) 25vw, 33vw" />
                </div>
              ) : (
                <span className="pt-4 text-3xl">{sign.symbol}</span>
              )}
              <span className="text-xs font-semibold text-paper">{sign.name}</span>
              <span className="text-[10px] text-paper/50">{sign.dateRange}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && report && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8" onClick={resetAll}>
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={resetAll}
              aria-label="關閉星座運勢視窗"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              ✕
            </button>
            <div className="h-full w-full overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-5 shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col items-center gap-2 text-center">
                {selected.image ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold/40">
                    <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="112px" />
                  </div>
                ) : (
                  <span className="text-5xl">{selected.symbol}</span>
                )}
                <h2 className="font-serif text-2xl font-bold text-paper">{selected.name}</h2>
                <p className="text-xs text-paper/50">{selected.dateRange}</p>
                <SignBadgeRow sign={selected} />
              </div>

              <div className="mt-6 flex gap-1.5 rounded-full border border-gold/15 bg-night-light/20 p-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-1 rounded-full py-2 text-xs font-semibold transition-colors ${
                      tab === t.id ? "bg-gold text-night-dark" : "text-paper/60 hover:text-paper"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                {tab === "fortune" && <FortunePanel report={report} />}
                {tab === "personality" && <PersonalityPanel sign={selected} />}
                {tab === "match" && (
                  <MatchPanel sign={selected} partner={partner} onPickPartner={setPartner} onReset={() => setPartner(null)} />
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="block w-full rounded-full bg-gold py-3 text-center text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
                >
                  回首頁
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
