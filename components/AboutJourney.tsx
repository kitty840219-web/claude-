"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

const SCENES = [
  {
    chapter: "CHAPTER 01 · 品牌的起點",
    speaker: "艾飛樂語錄",
    text: "天空越黑，星星越亮。這裡收藏著 Ivy 用插畫與文字寫下的每一份共鳴。",
    image: "/images/xiaoai-05-flat.webp",
    alt: "小艾坐在窗邊寫日記",
    cover: true,
    portrait: false,
  },
  {
    chapter: "CHAPTER 02 · 關於創作者",
    speaker: "嗨，我是 Ivy",
    text: "我在 2022 年成立艾飛樂數位文創工作室，把生活裡說不出口的心事，畫成一顆顆陪伴你的星星。",
    image: "/images/profile.webp",
    alt: "艾飛樂創辦人 Ivy",
    portrait: true,
  },
  {
    chapter: "CHAPTER 03 · 小艾登場",
    speaker: "小艾",
    text: "戴著草帽、綁著藍色雙辮的我，是艾飛樂的陪伴角色。很高興在這段旅程裡認識你。",
    image: "/images/entry-xiaoai-cutout.webp",
    alt: "揮手的小艾角色",
    portrait: false,
  },
  {
    chapter: "CHAPTER 04 · 創作的日常",
    speaker: "Ivy",
    text: "從插畫語錄、品牌視覺到客製周邊，每一件作品都想溫柔接住一個真實的心情。",
    image: "/images/xiaoai-03-about-page.webp",
    alt: "小艾在畫室創作",
    cover: true,
    portrait: false,
  },
  {
    chapter: "CHAPTER 05 · 故事正要開始",
    speaker: "小艾",
    text: "準備好了嗎？接下來，一起翻開艾飛樂從第一顆星星開始的故事。",
    image: "/images/xiaoai-02-story-page.webp",
    alt: "小艾抱著故事與信件",
    portrait: false,
  },
];

export default function AboutJourney() {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const scene = SCENES[index];
  const isFirst = index === 0;
  const isLast = index === SCENES.length - 1;

  function advance() {
    if (isLast) {
      setOpen(false);
      return;
    }
    setIndex((value) => value + 1);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pt-8"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative h-full max-h-[85svh] w-full max-w-[430px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="關閉品牌故事視窗"
          className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
        >
          ✕
        </button>

        {isFirst ? (
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/35 bg-night-dark text-paper shadow-soft">
            <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative min-h-[52%] flex-1 overflow-hidden">
              <Image src={asset(scene.image)} alt={scene.alt} fill priority className="object-cover object-[center_15%]" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-night-dark to-transparent" />
            </div>
            <div className="relative -mt-5 px-6 pb-6 text-center">
              <p className="text-xs font-semibold tracking-[0.35em] text-gold-light">AIFEILER · SINCE 2022</p>
              <h1 className="mt-3 font-serif text-3xl font-bold">{SITE.brand}</h1>
              <p className="mt-3 text-sm text-paper/70">{SITE.tagline}，{SITE.taglineSub}</p>
              <div className="mt-5 flex justify-center gap-2 text-[11px] font-semibold">
                <span className="rounded-full border border-gold/35 px-4 py-2">2022 年成立</span>
                <span className="rounded-full border border-gold/35 px-4 py-2">9+ 篇語錄作品</span>
              </div>
              <button onClick={advance} className="mt-7 w-full rounded-full bg-gold px-5 py-3.5 text-sm font-bold text-night-dark shadow-soft">
                點擊繼續 →
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between text-[10px] font-semibold tracking-[0.18em] text-paper/55">
              <span>{scene.chapter}</span>
              <span>{String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}</span>
            </div>

            <div className="relative flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-gold/35 bg-night-light/25 shadow-soft">
              <div className="relative min-h-0 flex-1">
                {scene.portrait ? (
                  <div className="absolute inset-0 flex animate-fade-in items-center justify-center">
                    <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-gold/40 shadow-soft">
                      <Image src={asset(scene.image)} alt={scene.alt} fill priority className="object-cover" />
                    </div>
                  </div>
                ) : (
                  <Image
                    key={scene.image}
                    src={asset(scene.image)}
                    alt={scene.alt}
                    fill
                    priority
                    className={scene.cover ? "animate-fade-in object-cover object-center" : "animate-fade-in object-contain p-5"}
                  />
                )}
                {!scene.portrait && <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night-dark/90 to-transparent" />}
              </div>

              <button type="button" onClick={advance} className="relative m-4 rounded-[1.6rem] border border-gold/30 bg-night-dark/95 p-6 text-left">
                <p className="font-serif text-xl font-bold text-gold-light">{scene.speaker}</p>
                <p className="mt-4 text-sm leading-loose text-paper/90">「{scene.text}」</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div className="flex gap-1.5">
                    {SCENES.map((_, dot) => (
                      <span key={dot} className={`h-1.5 rounded-full ${dot === index ? "w-7 bg-gold" : "w-1.5 bg-paper/25"}`} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gold-light">{isLast ? "進入故事 →" : "點擊繼續 →"}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
