"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/basePath";
import { portfolioImage } from "@/lib/data/portfolio";

const TOTAL_PAGES = 41;
const CHAPTERS = [
  { page: 1, label: "封面" }, { page: 3, label: "關於我" }, { page: 9, label: "社群經營" },
  { page: 13, label: "影音與 AI IP" }, { page: 19, label: "視覺設計" },
  { page: 37, label: "AR／VR 與 3D" }, { page: 41, label: "未來期許" },
];

function chapterFor(page: number) {
  return [...CHAPTERS].reverse().find((chapter) => page >= chapter.page)?.label ?? "作品集";
}

export default function PortfolioGallery() {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const goTo = (nextPage: number) => setPage(Math.min(TOTAL_PAGES, Math.max(1, nextPage)));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setPage((current) => Math.max(1, current - 1));
      if (event.key === "ArrowRight") setPage((current) => Math.min(TOTAL_PAGES, current + 1));
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  return (
    <section id="portfolio-book" className="scroll-mt-24 bg-night-dark px-3 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[0.3em] text-gold-light">DIGITAL PORTFOLIO</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-paper sm:text-5xl">翻閱我的作品集</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-paper/70 sm:text-lg">完整收錄 41 頁作品。使用下方按鈕或鍵盤方向鍵翻頁，也可以直接跳到想看的章節。</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="作品集章節">
          {CHAPTERS.map((chapter, index) => {
            const active = page >= chapter.page && page < (CHAPTERS[index + 1]?.page ?? TOTAL_PAGES + 1);
            return <button key={chapter.page} type="button" onClick={() => goTo(chapter.page)} className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${active ? "border-gold bg-gold text-night-dark" : "border-gold/30 text-gold-light hover:border-gold"}`}>{chapter.label}</button>;
          })}
        </div>

        <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-gold/35 bg-[#0f0d2f] shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between border-b border-gold/20 px-4 py-3 sm:px-6">
            <div><p className="text-xs font-bold tracking-[0.22em] text-gold-light">{chapterFor(page)}</p><p className="mt-0.5 text-sm text-paper/55">李宛容 Ivy · Portfolio</p></div>
            <button type="button" onClick={() => setExpanded(true)} className="rounded-full border border-gold/30 px-3 py-2 text-sm font-semibold text-gold-light hover:bg-gold hover:text-night-dark" aria-label="全螢幕放大目前頁面">放大 ↗</button>
          </div>
          <div className="bg-black/20 p-2 sm:p-5"><div className="overflow-hidden rounded-xl bg-paper shadow-2xl"><Image key={page} src={asset(portfolioImage(page))} alt={`李宛容作品集第 ${page} 頁`} width={1600} height={900} sizes="(min-width: 1024px) 1100px, 100vw" className="h-auto w-full" priority={page <= 2} /></div></div>
          <div className="border-t border-gold/20 px-4 py-4 sm:px-6">
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-paper/10"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${(page / TOTAL_PAGES) * 100}%` }} /></div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
              <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className="justify-self-start rounded-full border border-gold/35 px-3 py-2.5 text-sm font-bold text-gold-light disabled:cursor-not-allowed disabled:opacity-30 sm:px-4">← 上一頁</button>
              <p className="font-serif text-sm font-bold text-paper sm:text-base"><span className="text-lg text-gold-light sm:text-xl">{page}</span> / {TOTAL_PAGES}</p>
              <button type="button" onClick={() => goTo(page + 1)} disabled={page === TOTAL_PAGES} className="justify-self-end rounded-full bg-gold px-3 py-2.5 text-sm font-bold text-night-dark disabled:cursor-not-allowed disabled:opacity-30 sm:px-4">下一頁 →</button>
            </div>
          </div>
        </div>
      </div>

      {expanded && <div role="dialog" aria-modal="true" aria-label={`作品集第 ${page} 頁`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-8" onClick={() => setExpanded(false)}>
        <button type="button" onClick={() => setExpanded(false)} className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-3xl text-night-dark shadow-lg" aria-label="關閉大圖">×</button>
        <Image src={asset(portfolioImage(page))} alt={`李宛容作品集第 ${page} 頁放大圖`} width={1600} height={900} sizes="100vw" className="max-h-[94vh] w-auto max-w-full rounded-lg object-contain" priority onClick={(event) => event.stopPropagation()} />
      </div>}
    </section>
  );
}
