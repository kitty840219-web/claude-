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
        className={`text-shadow-soft relative h-[calc(100svh-2rem)] max-h-[900px] w-full max-w-sm rounded-[2rem] border border-gold/40 text-center transition-transform duration-500 ${
          closing ? "scale-95" : "scale-100"
        }`}
      >
        <div className="absolute inset-x-5 top-[27%] sm:inset-x-8 sm:top-[25%]">
          <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-gold/60 shadow-card sm:h-20 sm:w-20">
            <Image src={asset("/images/mascot.png")} alt={SITE.brand} fill className="object-contain bg-paper p-1" />
          </div>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.35em] text-gold-light">
            {SITE.brandEn.toUpperCase()}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold text-paper sm:text-3xl">{SITE.brand}</h1>
          <p className="mt-3 text-sm leading-relaxed text-paper/75">
            {SITE.tagline}，{SITE.taglineSub}
          </p>
        </div>

        <div className="absolute inset-x-5 bottom-[7%] sm:inset-x-8">
          <button
            type="button"
            onClick={enter}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
          >
            開始探索艾飛樂的世界 →
          </button>
          <p className="mt-4 text-[11px] text-paper/55">點擊進入，開始這段插畫語錄旅程</p>
        </div>
      </div>
    </div>
  );
}
