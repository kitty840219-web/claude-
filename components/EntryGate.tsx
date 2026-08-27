"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

type Phase = "gate" | "journey" | "open";

const JOURNEY_DIALOGUE = [
  { speaker: "小艾", text: "嗨，旅人。歡迎來到我的星光日記。", art: "/images/journey-camera.png" },
  { speaker: "小艾", text: "每一顆星星，都收藏著一段曾經沒有說出口的心情。", art: "/images/journey-painting.png" },
  { speaker: "藍色小鳥", text: "啾！我會陪你一起尋找散落在故事裡的溫柔星光。", art: "/images/journey-letter.png" },
  { speaker: "小艾", text: "你可以翻開故事、收藏語錄，也可以抽一張牌，聽聽今天的心靈指引。", art: "/images/journey-shop.png" },
  { speaker: "小艾", text: "準備好了嗎？點亮今天的第一顆星星，我們就出發吧。", art: "/images/journey-finale.png" },
];

export default function EntryGate() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("gate");
  const [closing, setClosing] = useState(false);
  const [line, setLine] = useState(0);
  const [sparkle, setSparkle] = useState(false);

  function poke() {
    setSparkle(true);
    window.setTimeout(() => setSparkle(false), 900);
  }

  const isHome = pathname === "/";

  function enter() {
    setClosing(true);
    window.setTimeout(() => {
      setPhase("journey");
      setClosing(false);
    }, 500);
  }

  function nextDialogue() {
    if (line < JOURNEY_DIALOGUE.length - 1) {
      setLine((current) => current + 1);
      return;
    }
    setClosing(true);
    window.setTimeout(() => setPhase("open"), 500);
  }

  if (!isHome || phase === "open") return null;

  if (phase === "journey") {
    const dialogue = JOURNEY_DIALOGUE[line];
    const isLast = line === JOURNEY_DIALOGUE.length - 1;

    return (
      <div className={`fixed inset-0 z-50 overflow-hidden bg-night-dark px-4 py-4 transition-opacity duration-500 ${closing ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(118,105,184,0.38),transparent_42%)]" />
        <div className="relative mx-auto h-[calc(100svh-2rem)] max-h-[900px] w-full max-w-sm overflow-hidden rounded-[2rem] border border-gold/35 bg-night-dark shadow-soft">
          <div key={dialogue.art} className="absolute inset-0 animate-fade-in">
            <Image src={asset(dialogue.art)} alt={`${dialogue.speaker}的星光對話場景`} fill priority className="object-cover" sizes="390px" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-dark/90 via-night-dark/10 to-night-dark/50" />
          </div>

          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5 text-[10px] font-semibold tracking-[0.2em] text-paper/70">
            <span>CHAPTER 01 · 星光的邀請</span>
            <span>{String(line + 1).padStart(2, "0")} / {String(JOURNEY_DIALOGUE.length).padStart(2, "0")}</span>
          </div>

          <button type="button" onClick={nextDialogue} aria-label="點擊顯示下一段對話" className="absolute inset-x-3 bottom-3 z-20 min-h-[34%] rounded-[1.65rem] border border-gold/30 bg-[rgba(28,27,74,0.94)] p-6 text-left shadow-soft backdrop-blur-md transition active:scale-[0.99]">
            <span className="block font-serif text-xl font-bold text-gold-light">{dialogue.speaker}</span>
            <span key={line} className="mt-3 block min-h-20 animate-fade-in text-base font-medium leading-relaxed text-paper">「{dialogue.text}」</span>
            <span className="mt-4 flex items-center justify-between">
              <span className="flex gap-1.5">
                {JOURNEY_DIALOGUE.map((_, index) => (
                  <span key={index} className={`h-1.5 rounded-full transition-all ${index === line ? "w-6 bg-gold" : "w-1.5 bg-paper/25"}`} />
                ))}
              </span>
              <span className="animate-pulse text-[11px] font-semibold text-gold-light">{isLast ? "進入故事 →" : "點擊繼續 ▼"}</span>
            </span>
          </button>

          <div className="animate-float-slow pointer-events-none absolute bottom-[30%] left-1 z-30 h-28 w-24 sm:h-32 sm:w-28">
            <Image
              src={asset("/images/entry-xiaoai-cutout.png")}
              alt="小艾"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              sizes="112px"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night-dark px-4 py-4 transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={asset("/images/entry-gate-background.jpg")}
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-dark/85 via-night-dark/35 to-night-dark/60" />
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-25" />

      <div
        className={`text-shadow-soft relative h-[calc(100svh-2rem)] max-h-[900px] w-full max-w-sm text-center transition-transform duration-500 ${
          closing ? "scale-95" : "scale-100"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-[2%] h-[42%] rounded-[2rem] border border-gold/40" />

        <div className="absolute inset-x-5 top-[63%] z-10 sm:inset-x-8 sm:top-[61%]">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-gold-light">
            {SITE.brandEn.toUpperCase()}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold text-paper sm:text-3xl">{SITE.brand}</h1>
          <p className="mt-3 text-sm leading-relaxed text-paper/75">
            {SITE.tagline}🌟
            <br />
            {SITE.taglineSub}
          </p>
        </div>

        <div className="absolute inset-x-5 bottom-[7%] sm:inset-x-8">
          <button
            type="button"
            onClick={poke}
            aria-label="逗逗小艾"
            className="animate-float-slow absolute -bottom-1 -left-5 z-20 h-32 w-24 sm:-left-7 sm:h-36 sm:w-28"
          >
            {sparkle && (
              <>
                <span className="animate-sparkle-pop pointer-events-none absolute -top-2 left-1 text-lg" style={{ animationDelay: "0s" }}>✨</span>
                <span className="animate-sparkle-pop pointer-events-none absolute -top-4 left-10 text-sm" style={{ animationDelay: "0.1s" }}>⭐</span>
                <span className="animate-sparkle-pop pointer-events-none absolute -top-1 left-16 text-base" style={{ animationDelay: "0.2s" }}>✨</span>
              </>
            )}
            <Image
              src={asset("/images/entry-xiaoai-cutout.png")}
              alt="小艾揮手邀請旅人開始探索，點擊可以逗逗她"
              fill
              priority
              className="pointer-events-none object-contain object-bottom"
              sizes="144px"
            />
          </button>
          <button
            type="button"
            onClick={enter}
            className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
          >
            開始探索艾飛樂的世界 →
          </button>
          <p className="mt-4 text-[11px] text-paper/55">點擊進入，開始這段插畫語錄旅程</p>
        </div>
      </div>
    </div>
  );
}
