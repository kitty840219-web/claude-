"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MAJOR_ARCANA, drawRandomCard, TarotCard } from "@/lib/tarot/cards";
import { generateReading, ReadingStyle } from "@/lib/tarot/reading";

type Step = "cover" | "form" | "shuffle" | "spread" | "reveal";

const STYLE_OPTIONS: { id: ReadingStyle; label: string; emoji: string; badge?: string }[] = [
  { id: "roast", label: "火烤", emoji: "🔥" },
  { id: "intuitive", label: "直覺式", emoji: "🖐️" },
  { id: "insight", label: "洞察", emoji: "🔍", badge: "BETA" },
];

const SPREAD_COUNT = 12;

// deterministic seeded RNG so server-render and client hydration match
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useStarfield(count: number, seed: number) {
  return useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: 1 + rand() * 2,
      delay: rand() * 3,
    }));
  }, [count, seed]);
}

function CardBack({ className = "" }: { className?: string }) {
  const stars = useStarfield(28, 7);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-amber-200/40 bg-gradient-to-b from-[#151a45] via-[#0f1338] to-[#0b0f2e] shadow-[0_0_30px_rgba(80,70,200,0.35)] ${className}`}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `twinkle 2.4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-3 rounded-xl border border-amber-200/30" />
      <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-80">✦</div>
    </div>
  );
}

function CardFront({ card, isReversed }: { card: TarotCard; isReversed: boolean }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-2xl border-2 border-amber-200/50 bg-gradient-to-b from-[#1c2358] to-[#0b0f2e] p-4 text-center text-amber-50 shadow-[0_0_30px_rgba(80,70,200,0.45)] ${
        isReversed ? "rotate-180" : ""
      }`}
    >
      <div className="text-xs tracking-[0.3em] text-amber-200/80">{card.numeral}</div>
      <div className="text-5xl">{card.symbol}</div>
      <div className="space-y-1">
        <div className="text-lg font-semibold">{card.name}</div>
        {isReversed && <div className="text-[10px] tracking-widest text-amber-200/70">逆位 REVERSED</div>}
      </div>
    </div>
  );
}

export default function TarotDivination() {
  const [step, setStep] = useState<Step>("cover");
  const [question, setQuestion] = useState("");
  const [styles, setStyles] = useState<ReadingStyle[]>([]);
  const [shuffleTick, setShuffleTick] = useState(0);
  const [result, setResult] = useState<{ card: TarotCard; isReversed: boolean } | null>(null);

  const spread = useMemo(() => {
    const rand = mulberry32(101);
    return Array.from({ length: SPREAD_COUNT }, (_, i) => {
      const mid = (SPREAD_COUNT - 1) / 2;
      const offset = i - mid;
      return {
        id: i,
        rotate: offset * 6 + (rand() - 0.5) * 2,
        translateY: Math.abs(offset) * 6,
      };
    });
  }, []);

  useEffect(() => {
    if (step !== "shuffle") return;
    const ticker = setInterval(() => setShuffleTick((t) => t + 1), 180);
    const timeout = setTimeout(() => setStep("spread"), 1620);
    return () => {
      clearInterval(ticker);
      clearTimeout(timeout);
    };
  }, [step]);

  function toggleStyle(id: ReadingStyle) {
    setStyles((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function handlePickCard() {
    setResult(drawRandomCard());
    setStep("reveal");
  }

  function resetAll() {
    setQuestion("");
    setStyles([]);
    setResult(null);
    setStep("cover");
  }

  const canDraw = question.trim().length >= 10;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6 text-amber-50">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-xs text-amber-200/60 hover:text-amber-200">
          ← 回首頁
        </Link>
        <div className="rounded-full border border-amber-200/40 px-3 py-1 text-xs tracking-wide text-amber-200/90">
          艾飛樂 · 塔羅
        </div>
      </header>

      {step === "cover" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-[0.3em]">大眾占卜</h1>
            <p className="mt-2 text-sm text-amber-200/70">單張抽牌 · 給你此刻需要的一句提醒</p>
          </div>
          <button
            onClick={() => setStep("form")}
            className="group relative h-56 w-36 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            aria-label="點擊卡牌開始"
          >
            <CardBack className="h-full w-full" />
          </button>
          <p className="animate-pulse text-sm text-amber-200/70">點擊卡牌開始</p>
        </div>
      )}

      {step === "form" && (
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold">你想問些什麼？</h2>
            <p className="mt-1 text-xs text-amber-200/60">寫得越具體，解讀越貼近你的處境。</p>
          </div>
          <div>
            <textarea
              value={question}
              maxLength={200}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：這段感情接下來會如何發展？"
              className="h-36 w-full resize-none rounded-xl border border-amber-200/30 bg-white/5 p-3 text-sm text-amber-50 placeholder:text-amber-200/40 focus:border-amber-200/70 focus:outline-none"
            />
            <div className="mt-1 flex justify-between text-[11px] text-amber-200/50">
              <span>至少 10 個字，輸入越多回答越有趣</span>
              <span>{question.length}/200</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {STYLE_OPTIONS.map((opt) => {
              const active = styles.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleStyle(opt.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs transition-colors ${
                    active
                      ? "border-amber-300 bg-amber-300/10 text-amber-100"
                      : "border-amber-200/20 text-amber-200/70 hover:border-amber-200/40"
                  }`}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span>
                    {opt.label}
                    {opt.badge && <span className="ml-1 rounded bg-amber-200/20 px-1 text-[9px]">{opt.badge}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            disabled={!canDraw}
            onClick={() => setStep("shuffle")}
            className="mt-auto w-full rounded-xl bg-amber-200 py-3 text-sm font-semibold text-[#0b0f2e] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            開始洗牌
          </button>
        </div>
      )}

      {step === "shuffle" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <p className="text-sm text-amber-200/70">牌正在為你重新排列⋯</p>
          <div className="relative h-56 w-36">
            {Array.from({ length: 7 }, (_, i) => {
              const rand = mulberry32(i * 13 + shuffleTick);
              const x = (rand() - 0.5) * 90;
              const y = (rand() - 0.5) * 40;
              const r = (rand() - 0.5) * 50;
              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-transform duration-150 ease-out"
                  style={{ transform: `translate(${x}px, ${y}px) rotate(${r}deg)` }}
                >
                  <CardBack className="h-full w-full" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === "spread" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <p className="text-sm text-amber-200/70">憑直覺，選一張牌</p>
          <div className="flex h-52 w-full items-end justify-center">
            {spread.map((c) => (
              <button
                key={c.id}
                onClick={handlePickCard}
                className="relative -mx-3 h-40 w-24 shrink-0 origin-bottom transition-transform duration-200 hover:-translate-y-4 hover:z-10"
                style={{ transform: `rotate(${c.rotate}deg) translateY(${c.translateY}px)` }}
                aria-label={`選擇第 ${c.id + 1} 張牌`}
              >
                <CardBack className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "reveal" && result && (
        <div className="flex flex-1 flex-col items-center gap-5 py-2">
          <div className="h-64 w-40 [perspective:1000px]">
            <CardFront card={result.card} isReversed={result.isReversed} />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {(result.isReversed ? result.card.reversed : result.card.upright).keywords.map((k) => (
              <span key={k} className="rounded-full border border-amber-200/30 px-2 py-0.5 text-[11px] text-amber-200/80">
                #{k}
              </span>
            ))}
          </div>

          <div className="w-full whitespace-pre-line rounded-xl border border-amber-200/20 bg-white/5 p-4 text-sm leading-relaxed text-amber-50/90">
            {generateReading(result.card, result.isReversed, question, styles)}
          </div>

          <div className="mt-auto flex w-full gap-2 pt-2">
            <button
              onClick={resetAll}
              className="flex-1 rounded-xl border border-amber-200/40 py-3 text-sm text-amber-100"
            >
              再抽一次
            </button>
            <Link
              href="/"
              className="flex-1 rounded-xl bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e]"
            >
              回首頁
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
