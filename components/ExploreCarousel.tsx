"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/basePath";
import { LINKS } from "@/lib/data/site";

const YOUTUBE_VIDEO_ID = "iYy-q9ywHaA";

const STOPS = [
  { id: "social", label: "觀測站", eyebrow: "SOCIAL STATION", title: "小艾的社群觀測站", desc: "在旅途中停留一下，看看小艾最新的影音創作。", dark: true },
  { id: "story", label: "故事", eyebrow: "EXPLORE 01", title: "艾飛樂的故事", desc: "從一個人的塗塗畫畫，到艾飛樂語錄的品牌旅程", href: "/about#story", image: "/images/home-story-cutout.png", tone: "from-[#f4e8d7] to-[#ded9ef]" },
  { id: "quotes", label: "語錄", eyebrow: "EXPLORE 02", title: "語錄作品", desc: "插畫語錄選粹，用一句話說出你的心事", href: "/works", image: "/images/home-quotes-cutout.png", tone: "from-[#f9e8e1] to-[#e7e1f2]" },
  { id: "video", label: "影音", eyebrow: "EXPLORE 03", title: "影音創作", desc: "YouTube 頻道與短影音創作紀錄", href: "/videos", image: "/images/home-video.png", tone: "from-[#e6eef4] to-[#eee7f4]" },
  { id: "shop", label: "商店", eyebrow: "EXPLORE 04", title: "周邊商店", desc: "明信片、貼紙、LINE 貼圖與客製小物", href: "/shop", image: "/images/home-shop.png", tone: "from-[#f7eadc] to-[#eee4f3]" },
  { id: "contact", label: "合作", eyebrow: "EXPLORE 05", title: "合作聯絡", desc: "插畫委託、品牌合作與接案洽詢", href: "/contact", image: "/images/home-contact.png", tone: "from-[#f8e5e4] to-[#e5eaf3]" },
];

export default function ExploreCarousel() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const stop = STOPS[index];
  const next = () => setIndex((value) => (value + 1) % STOPS.length);

  return (
    <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-night-dark text-paper">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative flex min-h-[calc(100svh-64px)] flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <button type="button" onClick={() => router.push("/quests")} aria-label="關閉探索頁" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-3xl font-light text-paper">×</button>
          <p className="text-[10px] tracking-[0.25em] text-paper/35">AIFEILER JOURNEY</p>
        </div>
        <div className="flex items-center justify-between px-3 text-[10px] font-semibold tracking-[0.18em] text-paper/55">
          <span>{stop.eyebrow}</span>
          <span>{String(index + 1).padStart(2, "0")} / {String(STOPS.length).padStart(2, "0")}</span>
        </div>

        <div className="relative mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] border border-gold/35 bg-night-light/20 shadow-soft">
          {index === 0 ? (
            <div className="relative min-h-0 flex-1 bg-black">
              <div className="absolute inset-4 overflow-hidden rounded-[1.5rem]">
                <iframe title="艾飛樂 YouTube 影音" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            </div>
          ) : (
            <div className="relative min-h-0 flex-1 animate-fade-in">
              <Image src={asset(stop.image!)} alt={`${stop.title}小艾插畫`} fill priority className="object-contain p-5" />
            </div>
          )}

          <button type="button" onClick={next} className="relative m-4 rounded-[1.65rem] border border-gold/30 bg-night-dark/95 p-6 text-left shadow-card">
            <p className="font-serif text-xl font-bold text-gold-light">{stop.title}</p>
            <p className="mt-4 text-sm leading-loose text-paper/90">「{stop.desc}」</p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="flex gap-1.5">
                {STOPS.map((item, dot) => (
                  <span key={item.id} className={`h-1.5 rounded-full transition-all ${dot === index ? "w-7 bg-gold" : "w-1.5 bg-paper/25"}`} />
                ))}
              </div>
              <span className="text-xs font-semibold text-gold-light">{index === STOPS.length - 1 ? "回到觀測站 ↻" : "點擊繼續 →"}</span>
            </div>
          </button>

          <div className="flex items-center justify-between border-t border-paper/10 px-6 py-4 text-[10px] text-paper/45">
            <span>點擊對話框，移動到下一個窗口</span>
            {index === 0 ? (
              <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-light">前往頻道 →</a>
            ) : (
              <Link href={stop.href!} className="font-semibold text-gold-light">
                {stop.id === "story" ? "進入故事 →" : stop.id === "quotes" ? "查看語錄 →" : stop.id === "video" ? "觀看影音 →" : stop.id === "shop" ? "前往商店 →" : "洽談合作 →"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
