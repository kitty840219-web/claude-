"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

type Phase = "gate" | "open";

export default function EntryGate() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("gate");
  const [closing, setClosing] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  function poke() {
    setSparkle(true);
    window.setTimeout(() => setSparkle(false), 900);
  }

  const isHome = pathname === "/";

  function enter() {
    setClosing(true);
    window.setTimeout(() => setPhase("open"), 500);
  }

  if (!isHome || phase === "open") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night-dark px-4 py-4 transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={asset("/images/entry-gate-background.webp")}
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

        <div className="absolute inset-x-5 top-[56%] bottom-[4%] z-10 flex flex-col justify-between text-center sm:inset-x-8">
          <div>
            <p
              className="animate-fade-in text-xs font-semibold tracking-[0.35em] text-gold-light"
              style={{ animationDelay: "0.1s" }}
            >
              {SITE.brandEn.toUpperCase()}
            </p>
            <h1
              className="animate-fade-in mt-2 font-serif text-3xl font-bold text-paper sm:text-4xl"
              style={{ animationDelay: "0.35s" }}
            >
              {SITE.brand}
            </h1>
            <p
              className="animate-fade-in mt-3 text-base leading-relaxed text-paper/75"
              style={{ animationDelay: "0.6s" }}
            >
              {SITE.tagline}🌟
              <br />
              {SITE.taglineSub}
            </p>
          </div>

          <div className="animate-fade-in relative" style={{ animationDelay: "0.9s" }}>
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
                src={asset("/images/entry-xiaoai-cutout.webp")}
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
    </div>
  );
}
