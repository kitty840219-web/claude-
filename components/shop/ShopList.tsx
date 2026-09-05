"use client";

import { useEffect, useState } from "react";
import SocialIcon from "@/components/SocialIcon";
import TagChip from "@/components/TagChip";
import Image from "next/image";
import { asset } from "@/lib/basePath";

type Shop = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: "shop" | "line";
  cta: string;
  tag: string;
};

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
          <button
            key={s.key}
            type="button"
            onClick={() => setSelected(s)}
            className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-gold/5 sm:gap-6 sm:px-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-night-dark shadow-card sm:h-16 sm:w-16">
              <SocialIcon type={s.icon} className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-serif text-base font-bold text-paper sm:text-lg">{s.title}</span>
                <TagChip tone="gold">{s.tag}</TagChip>
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-paper/60 sm:text-sm">
                {s.desc}
              </span>
            </span>
            <span className="hidden shrink-0 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-night-dark shadow-soft transition group-hover:bg-gold-light sm:inline-block sm:text-sm">
              {s.cta}
            </span>
          </button>
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
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-6 text-paper shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-night-light/20">
                <Image src={asset("/images/home-shop.webp")} alt={`${selected.title}商店預覽`} fill className="object-cover" sizes="380px" />
              </div>
              <div className="py-6 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-night-dark"><SocialIcon type={selected.icon} className="h-8 w-8" /></span>
                <div className="mt-4 flex items-center justify-center gap-2"><h2 className="font-serif text-xl font-bold">{selected.title}</h2><TagChip tone="gold">{selected.tag}</TagChip></div>
                <p className="mt-4 text-left text-sm leading-7 text-paper/75">{selected.desc}</p>
              </div>
              <a
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto shrink-0 rounded-full bg-gold px-4 py-3 text-center text-sm font-semibold text-night-dark transition hover:bg-gold-light"
              >
                {selected.cta} →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
