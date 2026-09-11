"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/data/articles";
import Star from "@/components/Star";
import TagChip from "@/components/TagChip";
import { asset } from "@/lib/basePath";

export default function ArticleList({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null);

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
      <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6">
        {articles.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setSelected(a)}
            className="bg-grain group relative block min-h-64 w-full overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-night-light to-night p-6 text-left shadow-card transition hover:border-gold/40"
          >
            <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
            <div className={a.image ? "relative z-10 max-w-[68%]" : "relative z-10"}>
            <div className="flex items-center justify-between gap-3">
              <TagChip tone="gold">{a.tag}</TagChip>
              <span className="text-xs text-paper/40">{a.date}</span>
            </div>
            <h3 className="mt-3 font-serif text-lg font-bold text-paper sm:text-xl">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">{a.excerpt}</p>
            <p className="mt-4 text-xs font-semibold text-gold-light">閱讀全文 →</p>
            </div>
            {a.image && (
              <span className="pointer-events-none absolute -bottom-3 right-1 h-48 w-36 sm:right-4 sm:w-40">
                <Image src={asset(a.image)} alt="" fill className="object-contain object-bottom" sizes="160px" />
              </span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setSelected(null)}
        >
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="關閉文章"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-6 text-paper shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-3 w-3 text-gold-light" />
                <TagChip tone="gold">{selected.tag}</TagChip>
                <span className="text-xs text-paper/40">{selected.date}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-paper">{selected.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-paper/85">
                {selected.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {selected.link && (
                <Link
                  href={selected.link.href}
                  className="mt-6 block rounded-full bg-gold px-4 py-3 text-center text-sm font-semibold text-night-dark transition hover:bg-gold-light"
                >
                  {selected.link.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
