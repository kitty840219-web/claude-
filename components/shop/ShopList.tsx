"use client";

import { useEffect, useState } from "react";
import SocialIcon from "@/components/SocialIcon";
import TagChip from "@/components/TagChip";

type Shop = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: "shop" | "line";
  cta: string;
  tag: string;
  mode: "link" | "embed";
};

function ShopCard({ s, onOpen }: { s: Shop; onOpen: () => void }) {
  const inner = (
    <>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-night-dark shadow-card sm:h-16 sm:w-16">
        <SocialIcon type={s.icon} className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-serif text-base font-bold text-paper sm:text-lg">{s.title}</span>
          <TagChip tone="gold">{s.tag}</TagChip>
        </span>
        <span className="mt-1.5 block text-xs leading-relaxed text-paper/60 sm:text-sm">{s.desc}</span>
      </span>
      <span className="hidden shrink-0 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-night-dark shadow-soft transition group-hover:bg-gold-light sm:inline-block sm:text-sm">
        {s.cta}
      </span>
    </>
  );

  if (s.mode === "link") {
    return (
      <a
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 px-5 py-5 transition hover:bg-gold/5 sm:gap-6 sm:px-7"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-gold/5 sm:gap-6 sm:px-7"
    >
      {inner}
    </button>
  );
}

export default function ShopList({ shops }: { shops: Shop[] }) {
  const [selected, setSelected] = useState<Shop | null>(null);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <>
      <div className="divide-y divide-paper/10">
        {shops.map((s) => (
          <ShopCard key={s.key} s={s} onOpen={() => setSelected(s)} />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative h-full max-h-[85svh] w-full max-w-[430px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="關閉商店視窗"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-gold/30 bg-paper shadow-soft">
              <iframe title={selected.title} src={selected.href} className="h-full w-full flex-1 border-0 bg-paper" />
              <a
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border-t border-gold/20 bg-night-dark px-4 py-3 text-center text-xs font-semibold text-gold-light transition hover:bg-night-light/40"
              >
                畫面顯示不出來嗎？點此在新分頁開啟 →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
