"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/basePath";
import Star from "@/components/Star";
import StoryReader from "@/components/StoryReader";
import { CHAPTERS } from "@/lib/data/story";

const STOPS = [
  { id: "story", label: "故事", eyebrow: "EXPLORE 01", title: "艾飛樂的故事", desc: "從一個人的塗塗畫畫，到艾飛樂語錄的品牌旅程" },
  { id: "quotes", label: "語錄", eyebrow: "EXPLORE 02", title: "語錄作品", desc: "插畫語錄選粹，用一句話說出你的心事", href: "/works", image: "/images/home-quotes-cutout.png", tone: "from-[#f9e8e1] to-[#e7e1f2]" },
  { id: "video", label: "影音", eyebrow: "EXPLORE 03", title: "影音創作", desc: "YouTube 頻道與短影音創作紀錄", href: "/videos", image: "/images/home-video.png", tone: "from-[#e6eef4] to-[#eee7f4]" },
  { id: "shop", label: "商店", eyebrow: "EXPLORE 04", title: "周邊商店", desc: "明信片、貼紙、LINE 貼圖與客製小物", href: "/shop", image: "/images/home-shop.png", tone: "from-[#f7eadc] to-[#eee4f3]" },
  { id: "contact", label: "合作", eyebrow: "EXPLORE 05", title: "合作聯絡", desc: "插畫委託、品牌合作與接案洽詢", href: "/contact", image: "/images/home-contact.png", tone: "from-[#f8e5e4] to-[#e5eaf3]" },
];

export default function ExploreCarousel() {
  const [index, setIndex] = useState(0);
  const stop = STOPS[index];
  const next = () => setIndex((value) => (value + 1) % STOPS.length);

  const isStory = stop.id === "story";

  return (
    <section className={`relative overflow-hidden bg-night-dark text-paper ${isStory ? "" : "min-h-[calc(100svh-64px)]"}`}>
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className={`relative flex flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 ${isStory ? "" : "min-h-[calc(100svh-64px)]"}`}>
        <div className={`relative mt-4 flex flex-col overflow-hidden rounded-[2rem] border border-gold/35 bg-night-light/20 shadow-soft ${isStory ? "" : "min-h-0 flex-1"}`}>
          {stop.id === "story" ? (
            <div className="relative">
              <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative px-5 pt-6 text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Star className="h-3 w-3 text-gold-light" />
                  <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-light">OUR STORY</p>
                  <Star className="h-3 w-3 text-gold-light" delay="1s" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-paper">艾飛樂的故事</h2>
                <p className="mt-2 text-xs text-paper/70">一段用插畫與文字，寫給每個黑夜的旅程</p>
              </div>
              <div className="relative mt-6">
                <StoryReader
                  chapters={CHAPTERS}
                  finish={{
                    label: "下一站：語錄作品 →",
                    onClick: next,
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="relative min-h-0 flex-1 animate-fade-in">
                <Image src={asset(stop.image!)} alt={`${stop.title}小艾插畫`} fill priority className="object-contain p-5" />
              </div>

              <button type="button" onClick={next} className="relative m-4 rounded-[1.65rem] border border-gold/30 bg-night-dark/95 p-6 text-left shadow-card">
                <p className="font-serif text-xl font-bold text-gold-light">{stop.title}</p>
                <p className="mt-4 text-sm leading-loose text-paper/90">「{stop.desc}」</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div className="flex gap-1.5">
                    {STOPS.map((item, dot) => (
                      <span key={item.id} className={`h-1.5 rounded-full transition-all ${dot === index ? "w-7 bg-gold" : "w-1.5 bg-paper/25"}`} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gold-light">{index === STOPS.length - 1 ? "回到故事 ↻" : "點擊繼續 →"}</span>
                </div>
              </button>

              <div className="flex items-center justify-between border-t border-paper/10 px-6 py-4 text-[10px] text-paper/45">
                <span>點擊對話框，移動到下一個窗口</span>
                <Link href={stop.href!} className="font-semibold text-gold-light">
                  {stop.id === "quotes" ? "查看語錄 →" : stop.id === "video" ? "觀看影音 →" : stop.id === "shop" ? "前往商店 →" : "洽談合作 →"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
