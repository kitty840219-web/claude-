"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/basePath";

const SAVE_KEY = "aifeiler-star-journey";

const QUESTS = [
  { id: "story", title: "翻開小艾的第一篇日記", reward: 10, href: "/", art: "/images/home-story-cutout.png" },
  { id: "quote", title: "收藏一張療癒語錄", reward: 8, href: "/works", art: "/images/home-quotes-cutout.png" },
  { id: "tarot", title: "抽一張今日指引牌", reward: 12, href: "/tarot", art: "/images/home-contact.png" },
  { id: "shop", title: "參觀小艾的星光商店", reward: 6, href: "/shop", art: "/images/home-shop.png" },
];

type SaveState = { stars: number; completed: string[] };

export default function HomeGameHub() {
  const [save, setSave] = useState<SaveState>({ stars: 0, completed: [] });
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
  return (
    <section className="relative overflow-hidden bg-night-dark px-4 py-8">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(214,169,79,0.16),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(168,156,214,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-paper/10 bg-night-light/20 px-4 py-3 shadow-card backdrop-blur">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-gold-light">STAR JOURNEY</p>
            <p className="mt-1 font-serif text-base font-bold text-paper">小艾的星光日記</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-night-dark shadow-card">
            <span className="animate-twinkle">★</span>
            <span className="text-sm font-bold tabular-nums">{ready ? save.stars : 0}</span>
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] border border-paper/10 bg-night-light/20 p-5 shadow-card backdrop-blur">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gold-light">TODAY&apos;S QUEST</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-paper">今天的星光任務</h2>
            </div>
            <span className="rounded-full bg-lavender/20 px-3 py-1 text-xs font-semibold text-paper">{save.completed.length} / {QUESTS.length}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-lavender/20">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-5 space-y-3">
            {QUESTS.map((quest, index) => {
              const done = save.completed.includes(quest.id);
              return (
                <div key={quest.id} className={`relative flex min-h-28 items-center overflow-hidden rounded-2xl border p-4 transition ${done ? "border-gold/40 bg-gold/10" : "border-paper/10 bg-night-dark/60"}`}>
                  <div className="relative z-10 w-[67%]">
                    <p className="text-[10px] font-semibold tracking-widest text-gold-light">QUEST 0{index + 1}</p>
                    <h3 className="mt-1 font-serif text-sm font-bold leading-snug text-paper">{quest.title}</h3>
                    <div className="mt-3 flex items-center gap-2">
                      <Link href={quest.href} onClick={() => collect(quest.id, quest.reward)} className="rounded-full bg-gold px-3 py-1.5 text-[11px] font-semibold text-night-dark">
                        {done ? "再次前往" : "開始任務"}
                      </Link>
                      <span className="text-[10px] font-semibold text-gold-light">★ +{quest.reward}</span>
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
