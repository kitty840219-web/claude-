"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/basePath";

const SAVE_KEY = "aifeiler-star-journey";

const QUESTS = [
  { id: "story", title: "翻開小艾的第一篇日記", reward: 10, href: "/story", art: "/images/home-story-cutout.png" },
  { id: "quote", title: "收藏一張療癒語錄", reward: 8, href: "/works", art: "/images/home-quotes-cutout.png" },
  { id: "tarot", title: "抽一張今日指引牌", reward: 12, href: "/tarot", art: "/images/home-contact.png" },
  { id: "shop", title: "參觀小艾的星光商店", reward: 6, href: "/shop", art: "/images/home-shop.png" },
];

const DIALOGUE = [
  { speaker: "小艾", text: "嗨，旅人。歡迎來到我的星光日記。", art: "/images/home-contact.png" },
  { speaker: "小艾", text: "每一顆星星，都收藏著一段曾經沒有說出口的心情。", art: "/images/home-quotes-cutout.png" },
  { speaker: "藍色小鳥", text: "啾！我會陪你一起尋找散落在故事裡的溫柔星光。", art: "/images/home-story-cutout.png" },
  { speaker: "小艾", text: "你可以翻開故事、收藏語錄，也可以抽一張牌，聽聽今天的心靈指引。", art: "/images/home-shop.png" },
  { speaker: "小艾", text: "準備好了嗎？點亮今天的第一顆星星，我們就出發吧。", art: "/images/home-contact.png" },
];

type SaveState = { stars: number; completed: string[] };

export default function HomeGameHub() {
  const [save, setSave] = useState<SaveState>({ stars: 0, completed: [] });
  const [line, setLine] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount, matching the SSR-rendered default until then
        setSave(JSON.parse(raw) as SaveState);
      } catch {
        localStorage.removeItem(SAVE_KEY);
      }
    }
    setReady(true);
  }, []);

  function collect(id: string, reward: number) {
    if (save.completed.includes(id)) return;
    const next = { stars: save.stars + reward, completed: [...save.completed, id] };
    setSave(next);
    localStorage.setItem(SAVE_KEY, JSON.stringify(next));
  }

  const progress = Math.round((save.completed.length / QUESTS.length) * 100);
  const dialogue = DIALOGUE[line];
  const isLastLine = line === DIALOGUE.length - 1;

  function nextDialogue() {
    setLine((current) => (current + 1) % DIALOGUE.length);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eee9f7] via-paper to-paper-warm px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(214,169,79,0.16),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(168,156,214,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-night/10 bg-paper/85 px-4 py-3 shadow-card backdrop-blur">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-gold-dark">STAR JOURNEY</p>
            <p className="mt-1 font-serif text-base font-bold text-night">小艾的星光日記</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-night px-3 py-2 text-gold-light shadow-card">
            <span className="animate-twinkle">★</span>
            <span className="text-sm font-bold tabular-nums">{ready ? save.stars : 0}</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-night-dark shadow-soft">
          <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative min-h-[430px]">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 text-[10px] font-semibold tracking-[0.2em] text-paper/55">
              <span>CHAPTER 01 · 星光的邀請</span>
              <span>{String(line + 1).padStart(2, "0")} / {String(DIALOGUE.length).padStart(2, "0")}</span>
            </div>
            <div key={dialogue.art} className="absolute inset-x-0 top-10 h-[285px] animate-fade-in">
              <Image src={asset(dialogue.art)} alt={`${dialogue.speaker}的對話場景`} fill className="object-contain object-bottom" sizes="390px" />
            </div>

            <button
              type="button"
              onClick={nextDialogue}
              className="absolute inset-x-3 bottom-3 z-10 min-h-36 rounded-[1.6rem] border border-gold/25 bg-[rgba(28,27,74,0.92)] p-5 text-left shadow-soft backdrop-blur-md transition active:scale-[0.99]"
              aria-label="點擊顯示下一段對話"
            >
              <span className="block font-serif text-lg font-bold text-gold-light">{dialogue.speaker}</span>
              <span key={line} className="mt-2 block min-h-14 animate-fade-in text-[15px] font-medium leading-relaxed text-paper">
                「{dialogue.text}」
              </span>
              <span className="mt-2 flex items-center justify-between">
                <span className="flex gap-1.5">
                  {DIALOGUE.map((_, index) => (
                    <span key={index} className={`h-1.5 rounded-full transition-all ${index === line ? "w-5 bg-gold" : "w-1.5 bg-paper/25"}`} />
                  ))}
                </span>
                <span className="animate-pulse text-[11px] font-semibold text-gold-light">
                  {isLastLine ? "再次閱讀 ↻" : "點擊繼續 ▼"}
                </span>
              </span>
            </button>
          </div>
          <div className="relative flex items-center justify-between border-t border-paper/10 bg-night px-5 py-3">
            <p className="text-[10px] text-paper/55">點擊對話框，繼續小艾的旅程</p>
            <Link href="/story" className="rounded-full border border-gold/40 px-3 py-1.5 text-[10px] font-semibold text-gold-light">
              完整故事 →
            </Link>
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-night/10 bg-paper/90 p-5 shadow-card backdrop-blur">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gold-dark">TODAY&apos;S QUEST</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-night">今天的星光任務</h2>
            </div>
            <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs font-semibold text-night">{save.completed.length} / {QUESTS.length}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-lavender/20">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-5 space-y-3">
            {QUESTS.map((quest, index) => {
              const done = save.completed.includes(quest.id);
              return (
                <div key={quest.id} className={`relative flex min-h-28 items-center overflow-hidden rounded-2xl border p-4 transition ${done ? "border-gold/40 bg-gold/10" : "border-night/10 bg-paper-warm"}`}>
                  <div className="relative z-10 w-[67%]">
                    <p className="text-[10px] font-semibold tracking-widest text-gold-dark">QUEST 0{index + 1}</p>
                    <h3 className="mt-1 font-serif text-sm font-bold leading-snug text-night">{quest.title}</h3>
                    <div className="mt-3 flex items-center gap-2">
                      <Link href={quest.href} onClick={() => collect(quest.id, quest.reward)} className="rounded-full bg-night px-3 py-1.5 text-[11px] font-semibold text-paper">
                        {done ? "再次前往" : "開始任務"}
                      </Link>
                      <span className="text-[10px] font-semibold text-gold-dark">★ +{quest.reward}</span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -bottom-3 -right-3 h-32 w-32">
                    <Image src={asset(quest.art)} alt="" fill className="object-contain object-bottom" sizes="128px" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
