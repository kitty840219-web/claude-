"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CardDraw, TarotCard, drawUniqueCards } from "@/lib/tarot/cards";
import { asset } from "@/lib/basePath";
import CardArt from "@/components/tarot/CardArt";
import { ReadingReport, ReadingStyle } from "@/lib/tarot/reading";
import { BirthInfo, requestAiReading } from "@/lib/tarot/ai";

type Step = "cover" | "form" | "shuffle" | "spread" | "analyzing" | "reveal";
type SpreadSize = 1 | 3;

const STYLE_OPTIONS: { id: ReadingStyle; label: string; emoji: string; badge?: string }[] = [
  { id: "roast", label: "火烤", emoji: "🔥" },
  { id: "intuitive", label: "直覺式", emoji: "🖐️" },
  { id: "insight", label: "洞察", emoji: "🔍", badge: "BETA" },
];

const SPREAD_MODES: { id: SpreadSize; label: string; hint: string }[] = [
  { id: 1, label: "單抽牌", hint: "一句直覺提醒" },
  { id: 3, label: "三張牌", hint: "過去 · 現在 · 未來" },
];

const POSITION_LABELS = ["過去", "現在", "未來"];
const SPREAD_COUNT = 40;

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

function CardBack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(80,70,200,0.35)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/images/tarot/back.webp")} alt="塔羅牌背面" loading="eager" decoding="async" className="h-full w-full object-cover" />
    </div>
  );
}

const ELEMENT_ICON: Record<NonNullable<TarotCard["element"]>, string> = { 火: "🔥", 水: "💧", 風: "🌬️", 土: "⛰️" };

function ElementBadge({ element, compact = false }: { element: NonNullable<TarotCard["element"]>; compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-amber-200/30 bg-white/5 text-amber-200/80 ${
        compact ? "px-1.5 py-0 text-[9px]" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      <span>{ELEMENT_ICON[element]}</span>
      {element}元素
    </span>
  );
}

function CardFront({ card, isReversed, compact = false }: { card: TarotCard; isReversed: boolean; compact?: boolean }) {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(80,70,200,0.45)] ${isReversed ? "rotate-180" : ""}`}
    >
      <CardArt card={card} className="h-full w-full" />
    </div>
  );
}

function CardCaption({ card, isReversed, label, compact = false }: { card: TarotCard; isReversed: boolean; label?: string; compact?: boolean }) {
  return (
    <div className="space-y-0.5 text-center">
      {label && <p className="text-[11px] text-amber-200/70">{label}</p>}
      <p className={`font-semibold text-amber-100 ${compact ? "text-xs" : "text-sm"}`}>{card.name}</p>
      <p className={`text-amber-200/50 ${compact ? "text-[9px]" : "text-[10px]"}`}>
        {card.nameEn}
        {isReversed && "（逆位）"}
      </p>
    </div>
  );
}

type FollowUpEntry = { question: string; answer: string; card: CardDraw };

function FollowUpPanel({
  followUps,
  draft,
  onDraftChange,
  onSubmit,
  candidates,
  pickedIndex,
  onPickCandidate,
  loading,
}: {
  followUps: FollowUpEntry[];
  draft: string;
  onDraftChange: (v: string) => void;
  onSubmit: () => void;
  candidates: CardDraw[] | null;
  pickedIndex: number | null;
  onPickCandidate: (i: number) => void;
  loading: boolean;
}) {
  const canSubmit = draft.trim().length >= 10;
  return (
    <div className="w-full space-y-3">
      {followUps.map((f, i) => (
        <div key={i} className="flex w-full gap-3 rounded-xl border border-amber-200/20 bg-white/5 p-4">
          <div className="w-14 shrink-0 space-y-1">
            <div className="h-20 w-14">
              <CardFront card={f.card.card} isReversed={f.card.isReversed} compact />
            </div>
            <CardCaption card={f.card.card} isReversed={f.card.isReversed} compact />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-xs text-amber-200/60">追問：{f.question}</p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-amber-50/90">{f.answer}</p>
          </div>
        </div>
      ))}

      {candidates ? (
        <div className="w-full space-y-3 rounded-xl border border-amber-200/20 bg-white/5 p-4 text-center">
          <p className="text-sm text-amber-200/70">{loading ? "正在為你解讀這張牌⋯" : "憑直覺抽一張牌，回答這次的追問"}</p>
          <div className="flex justify-center gap-3">
            {candidates.map((c, i) => (
              <button
                key={i}
                onClick={() => onPickCandidate(i)}
                disabled={pickedIndex !== null}
                className="h-28 w-20 shrink-0 transition-transform enabled:hover:-translate-y-1 disabled:cursor-default"
              >
                {pickedIndex === i ? (
                  <CardFront card={c.card} isReversed={c.isReversed} compact />
                ) : (
                  <CardBack className={`h-full w-full ${pickedIndex !== null ? "opacity-40" : ""}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <label className="mb-1 block text-xs text-amber-200/60">我想要追問</label>
          <textarea
            value={draft}
            maxLength={200}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="針對這次抽到的牌，還想多問一點什麼？"
            className="h-20 w-full resize-none rounded-xl border border-amber-200/30 bg-white/5 p-3 text-sm text-amber-50 placeholder:text-amber-200/40 focus:border-amber-200/70 focus:outline-none"
          />
          <div className="mt-1 flex justify-between text-[11px] text-amber-200/50">
            <span>至少 10 個字</span>
            <span>{draft.length}/200</span>
          </div>
          <button
            disabled={!canSubmit}
            onClick={onSubmit}
            className="mt-2 w-full rounded-xl border border-amber-200/40 py-2.5 text-sm text-amber-100 transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            送出追問，抽一張牌
          </button>
        </div>
      )}
    </div>
  );
}

export default function TarotDivination() {
  const [step, setStep] = useState<Step>("cover");
  const [spreadSize, setSpreadSize] = useState<SpreadSize>(1);
  const [question, setQuestion] = useState("");
  const [styles, setStyles] = useState<ReadingStyle[]>([]);
  const [useBirthInfo, setUseBirthInfo] = useState(false);
  const [coupleMode, setCoupleMode] = useState(false);
  const [selfName, setSelfName] = useState("");
  const [selfBirthDate, setSelfBirthDate] = useState("");
  const [selfBirthTime, setSelfBirthTime] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [shuffleTick, setShuffleTick] = useState(0);
  const [pickedSlots, setPickedSlots] = useState<number[]>([]);
  const [results, setResults] = useState<CardDraw[]>([]);
  const [reading, setReading] = useState<ReadingReport | null>(null);
  const [readingError, setReadingError] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUps, setFollowUps] = useState<FollowUpEntry[]>([]);
  const [followUpDraft, setFollowUpDraft] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpCandidates, setFollowUpCandidates] = useState<CardDraw[] | null>(null);
  const [followUpPickedIndex, setFollowUpPickedIndex] = useState<number | null>(null);

  const canDraw =
    question.trim().length >= 10 &&
    (!useBirthInfo || (selfBirthDate.trim() !== "" && (!coupleMode || partnerBirthDate.trim() !== "")));

  const birthInfo: BirthInfo | undefined = useBirthInfo
    ? {
        self: { name: selfName.trim() || undefined, date: selfBirthDate, time: selfBirthTime || undefined },
        partner: coupleMode ? { name: partnerName.trim() || undefined, date: partnerBirthDate } : undefined,
      }
    : undefined;

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

  async function handlePickCard(slotId: number) {
    if (pickedSlots.includes(slotId) || pickedSlots.length >= spreadSize) return;
    const nextPicked = [...pickedSlots, slotId];
    setPickedSlots(nextPicked);
    if (nextPicked.length === spreadSize) {
      const draws = drawUniqueCards(spreadSize);
      setResults(draws);
      setReadingError("");
      setStep("analyzing");
      try {
        const nextReading = await requestAiReading(draws, question, styles, undefined, birthInfo);
        setReading(nextReading);
        setStep("reveal");
      } catch (error) {
        setReadingError(error instanceof Error ? error.message : "解牌服務暫時無法使用");
      }
    }
  }

  async function retryReading() {
    if (!results.length) return;
    setReadingError("");
    try {
      const nextReading = await requestAiReading(results, question, styles, undefined, birthInfo);
      setReading(nextReading);
      setStep("reveal");
    } catch (error) {
      setReadingError(error instanceof Error ? error.message : "解牌服務暫時無法使用");
    }
  }

  function resetAll() {
    setQuestion("");
    setStyles([]);
    setResults([]);
    setReading(null);
    setReadingError("");
    setPickedSlots([]);
    setFollowUps([]);
    setFollowUpDraft("");
    setFollowUpQuestion("");
    setFollowUpCandidates(null);
    setFollowUpPickedIndex(null);
    setStep("cover");
  }

  function handleSubmitFollowUp() {
    if (followUpDraft.trim().length < 10) return;
    const usedIds = new Set([...results.map((r) => r.card.id), ...followUps.map((f) => f.card.card.id)]);
    const candidates: CardDraw[] = [];
    let guard = 0;
    while (candidates.length < 3 && guard < 100) {
      guard++;
      const [draw] = drawUniqueCards(1);
      if (usedIds.has(draw.card.id) || candidates.some((c) => c.card.id === draw.card.id)) continue;
      candidates.push(draw);
    }
    setFollowUpQuestion(followUpDraft.trim());
    setFollowUpCandidates(candidates);
    setFollowUpPickedIndex(null);
    setFollowUpDraft("");
  }

  async function handlePickFollowUpCard(index: number) {
    if (followUpPickedIndex !== null || !followUpCandidates) return;
    setFollowUpPickedIndex(index);
    setFollowUpLoading(true);
    const drawnCard = followUpCandidates[index];
    try {
      const report = await requestAiReading([drawnCard], question, styles, followUpQuestion, birthInfo);
      const answer = [...report.paragraphs, `總結｜${report.summary}`].join("\n\n");
      setFollowUps((prev) => [...prev, { question: followUpQuestion, answer, card: drawnCard }]);
      setFollowUpCandidates(null);
      setFollowUpPickedIndex(null);
      setFollowUpQuestion("");
    } catch (error) {
      setReadingError(error instanceof Error ? error.message : "追問服務暫時無法使用");
      setFollowUpCandidates(null);
      setFollowUpPickedIndex(null);
    } finally {
      setFollowUpLoading(false);
    }
  }


  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 px-5 py-16 text-center text-amber-50">
      <div>
        <h1 className="text-4xl font-bold tracking-[0.3em]">大眾占卜</h1>
        <p className="mt-2 text-sm text-amber-200/70">{SPREAD_MODES.find((m) => m.id === spreadSize)?.hint}</p>
      </div>

      <div className="flex gap-2 rounded-full border border-amber-200/20 bg-white/5 p-1">
        {SPREAD_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSpreadSize(mode.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              spreadSize === mode.id ? "bg-amber-200 text-[#0b0f2e]" : "text-amber-200/70 hover:text-amber-100"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setStep("form")}
        className="group relative h-56 w-36 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
        aria-label="點擊卡牌開始"
      >
        <CardBack className="h-full w-full" />
      </button>
      <p className="animate-pulse text-sm text-amber-200/70">點擊卡牌開始</p>

      {step !== "cover" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8" onClick={resetAll}>
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={resetAll}
              aria-label="關閉大眾占卜視窗"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-xl font-bold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-amber-200/30 bg-[#0b0f2e] p-5 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              <span>至少 10 個字；請用暱稱或代號，勿填敏感資料</span>
              <span>{question.length}/200</span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200/20 bg-white/5 p-3">
            <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-amber-200/80">
              <span>加入生辰資訊，結合八字紫微命理解讀（選填）</span>
              <input
                type="checkbox"
                checked={useBirthInfo}
                onChange={(e) => setUseBirthInfo(e.target.checked)}
                className="h-4 w-4 shrink-0 accent-amber-300"
              />
            </label>

            {useBirthInfo && (
              <div className="mt-3 space-y-3">
                <p className="text-[11px] text-amber-200/50">請用暱稱或代號，勿填真實敏感資料</p>
                <div className="flex gap-2 rounded-full border border-amber-200/20 bg-black/10 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setCoupleMode(false)}
                    className={`flex-1 rounded-full py-1.5 transition-colors ${
                      !coupleMode ? "bg-amber-200 text-[#0b0f2e]" : "text-amber-200/70"
                    }`}
                  >
                    只問自己
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoupleMode(true)}
                    className={`flex-1 rounded-full py-1.5 transition-colors ${
                      coupleMode ? "bg-amber-200 text-[#0b0f2e]" : "text-amber-200/70"
                    }`}
                  >
                    雙方合問
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] text-amber-200/60">{coupleMode ? "你的資訊" : "你的出生資訊"}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={selfName}
                      onChange={(e) => setSelfName(e.target.value)}
                      placeholder="姓名（選填）"
                      className="rounded-lg border border-amber-200/30 bg-white/5 px-3 py-2 text-xs text-amber-50 placeholder:text-amber-200/40 focus:border-amber-200/70 focus:outline-none"
                    />
                    <input
                      type="date"
                      value={selfBirthDate}
                      onChange={(e) => setSelfBirthDate(e.target.value)}
                      className="rounded-lg border border-amber-200/30 bg-white/5 px-3 py-2 text-xs text-amber-50 [color-scheme:dark] focus:border-amber-200/70 focus:outline-none"
                    />
                  </div>
                  <input
                    type="time"
                    value={selfBirthTime}
                    onChange={(e) => setSelfBirthTime(e.target.value)}
                    className="w-full rounded-lg border border-amber-200/30 bg-white/5 px-3 py-2 text-xs text-amber-50 [color-scheme:dark] focus:border-amber-200/70 focus:outline-none"
                  />
                  <p className="text-[10px] text-amber-200/40">出生時間選填，不確定可以不填</p>
                </div>

                {coupleMode && (
                  <div className="space-y-2 border-t border-amber-200/10 pt-3">
                    <p className="text-[11px] text-amber-200/60">對方資訊（不需要時辰）</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="姓名（選填）"
                        className="rounded-lg border border-amber-200/30 bg-white/5 px-3 py-2 text-xs text-amber-50 placeholder:text-amber-200/40 focus:border-amber-200/70 focus:outline-none"
                      />
                      <input
                        type="date"
                        value={partnerBirthDate}
                        onChange={(e) => setPartnerBirthDate(e.target.value)}
                        className="rounded-lg border border-amber-200/30 bg-white/5 px-3 py-2 text-xs text-amber-50 [color-scheme:dark] focus:border-amber-200/70 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
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
        <div className="flex min-h-0 flex-1 flex-col items-center gap-1.5">
          <p className="text-xs text-amber-200/70">
            {spreadSize === 1
              ? "憑直覺，選一張牌"
              : `憑直覺依序選 ${spreadSize} 張牌 · 目前選第 ${Math.min(pickedSlots.length + 1, spreadSize)} 張：${
                  POSITION_LABELS[pickedSlots.length] ?? ""
                }`}
          </p>
          <p className="text-[10px] text-amber-200/40">↕ 上下滑動查看全部的牌</p>
          <div className="relative -mx-5 -mb-5 w-[calc(100%+2.5rem)] min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-white/95 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative flex flex-col gap-[2px]">
              <div className="pointer-events-none absolute inset-y-0 left-[32%] border-l-2 border-dotted border-amber-400/80" />
              <div className="pointer-events-none absolute inset-y-0 left-[68%] border-l-2 border-dotted border-amber-400/80" />
              {spread.map((c, i) => {
                const pickedIndex = pickedSlots.indexOf(c.id);
                const isPicked = pickedIndex !== -1;
                const isLast = i === spread.length - 1;
                if (isLast) {
                  return (
                    <button
                      key={c.id}
                      onClick={() => handlePickCard(c.id)}
                      disabled={isPicked || pickedSlots.length >= spreadSize}
                      aria-label={`選擇第 ${c.id + 1} 張牌`}
                      className={`relative h-24 w-full shrink-0 overflow-hidden rounded-[2px] transition-opacity disabled:cursor-default ${
                        isPicked ? "opacity-35" : ""
                      }`}
                    >
                      <CardBack className="h-full w-full rounded-none border-0" />
                      {isPicked && (
                        <span className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b0f2e] text-xs font-bold text-amber-200 ring-2 ring-amber-200">
                          {pickedIndex + 1}
                        </span>
                      )}
                    </button>
                  );
                }
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePickCard(c.id)}
                    disabled={isPicked || pickedSlots.length >= spreadSize}
                    aria-label={`選擇第 ${c.id + 1} 張牌`}
                    className={`relative h-3 w-full shrink-0 rounded-[1px] bg-[#1a35a8] transition-colors enabled:hover:bg-[#2b48c9] disabled:cursor-default ${
                      isPicked ? "bg-amber-400" : ""
                    }`}
                  >
                    {isPicked && (
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-bold leading-none text-[#0b0f2e]">
                        {pickedIndex + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === "analyzing" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="animate-pulse text-4xl">🔮</div>
          {!readingError ? (
            <p className="animate-pulse text-sm text-amber-200/70">牌陣已經排好，正在針對你的問題解讀⋯</p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-rose-200">{readingError}</p>
              <button onClick={retryReading} className="rounded-xl border border-amber-200/40 px-5 py-2 text-sm text-amber-100">
                重新解牌
              </button>
            </div>
          )}
        </div>
      )}

      {step === "reveal" && reading && results.length === spreadSize && spreadSize === 1 && (
        <div className="flex flex-1 flex-col items-center gap-5 py-2">
          <div className="h-64 w-40">
            <CardFront card={results[0].card} isReversed={results[0].isReversed} />
          </div>
          <CardCaption card={results[0].card} isReversed={results[0].isReversed} />

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {results[0].card.element && <ElementBadge element={results[0].card.element} />}
            {(results[0].isReversed ? results[0].card.reversed : results[0].card.upright).keywords.map((k) => (
              <span key={k} className="rounded-full border border-amber-200/30 px-2 py-0.5 text-[11px] text-amber-200/80">
                #{k}
              </span>
            ))}
          </div>

          <article className="w-full rounded-xl border border-amber-200/20 bg-white/5 p-5">
                <p className="mb-2 text-xs text-amber-200/55">你的問題</p>
                <p className="mb-5 rounded-lg bg-black/15 p-3 text-sm leading-relaxed text-amber-50/90">{question}</p>
                <h3 className="mb-4 text-lg font-semibold leading-relaxed text-amber-100">{reading.title}</h3>
                <div className="space-y-4 text-sm leading-7 text-amber-50/90">
                  {reading.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  <div className="border-t border-amber-200/20 pt-4">
                    <h4 className="mb-2 font-semibold text-amber-100">總結</h4>
                    <p>{reading.summary}</p>
                  </div>
                </div>
          </article>

          <FollowUpPanel
            followUps={followUps}
            draft={followUpDraft}
            onDraftChange={setFollowUpDraft}
            onSubmit={handleSubmitFollowUp}
            candidates={followUpCandidates}
            pickedIndex={followUpPickedIndex}
            onPickCandidate={handlePickFollowUpCard}
            loading={followUpLoading}
          />

          <div className="mt-auto flex w-full gap-2 pt-2">
            <button onClick={resetAll} className="flex-1 rounded-xl border border-amber-200/40 py-3 text-sm text-amber-100">
              再抽一次
            </button>
            <Link href="/" className="flex-1 rounded-xl bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e]">
              回首頁
            </Link>
          </div>
        </div>
      )}

      {step === "reveal" && reading && results.length === spreadSize && spreadSize === 3 && (
        <div className="flex flex-1 flex-col items-center gap-5 py-2">
          <div className="grid w-full grid-cols-3 gap-2">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="h-36 w-full">
                  <CardFront card={r.card} isReversed={r.isReversed} compact />
                </div>
                <CardCaption card={r.card} isReversed={r.isReversed} label={POSITION_LABELS[i]} compact />
                {r.card.element && <ElementBadge element={r.card.element} compact />}
              </div>
            ))}
          </div>

          <div className="w-full rounded-xl border border-amber-200/20 bg-white/5 p-4">
                <h3 className="mb-3 text-base font-semibold text-amber-100">{reading.title}</h3>
                <div className="space-y-3 whitespace-pre-line text-sm leading-relaxed text-amber-50/90">
                  {reading.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <div className="border-t border-amber-200/20 pt-3">
                    <h4 className="mb-2 font-semibold text-amber-100">總結</h4>
                    <p>{reading.summary}</p>
                  </div>
                </div>
          </div>

          <FollowUpPanel
            followUps={followUps}
            draft={followUpDraft}
            onDraftChange={setFollowUpDraft}
            onSubmit={handleSubmitFollowUp}
            candidates={followUpCandidates}
            pickedIndex={followUpPickedIndex}
            onPickCandidate={handlePickFollowUpCard}
            loading={followUpLoading}
          />

          <div className="mt-auto flex w-full gap-2 pt-2">
            <button onClick={resetAll} className="flex-1 rounded-xl border border-amber-200/40 py-3 text-sm text-amber-100">
              再抽一次
            </button>
            <Link href="/" className="flex-1 rounded-xl bg-amber-200 py-3 text-center text-sm font-semibold text-[#0b0f2e]">
              回首頁
            </Link>
          </div>
        </div>
      )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
