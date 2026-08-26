"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

const STORAGE_KEY = "aifeiler-entered";

type Phase = "checking" | "gate" | "open";

export default function EntryGate() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("checking");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // sessionStorage only exists client-side, so the gate/open decision can't be made during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(sessionStorage.getItem(STORAGE_KEY) ? "open" : "gate");
  }, []);

  const isHome = pathname === "/";

  function enter() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setClosing(true);
    window.setTimeout(() => setPhase("open"), 500);
  }

  if (!isHome || phase === "open") return null;
  if (phase === "checking") return <div className="fixed inset-0 z-50 bg-night-dark" aria-hidden />;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night-dark px-4 transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={asset("/images/xiaoai-01-star-diary.png")}
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-dark/50 via-night-dark/60 to-night-dark/95" />
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />

      <div
        className={`relative w-full max-w-sm rounded-[2rem] border border-gold/30 bg-night-dark/70 p-8 text-center shadow-soft backdrop-blur transition-transform duration-500 sm:p-10 ${
          closing ? "scale-95" : "scale-100"
        }`}
      >
        <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-gold/60 shadow-card sm:h-20 sm:w-20">
          <Image src={asset("/images/mascot.png")} alt={SITE.brand} fill className="object-contain bg-paper p-1" />
        </div>
        <p className="mt-5 text-[11px] font-semibold tracking-[0.35em] text-gold-light">
          {SITE.brandEn.toUpperCase()}
        </p>
        <h1 className="mt-2 font-serif text-2xl font-bold text-paper sm:text-3xl">{SITE.brand}</h1>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          {SITE.tagline}，{SITE.taglineSub}
        </p>
        <button
          type="button"
          onClick={enter}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
        >
          開始探索艾飛樂的世界 →
        </button>
        <p className="mt-4 text-[11px] text-paper/40">點擊進入，開始這段插畫語錄旅程</p>
      </div>
    </div>
  );
}
