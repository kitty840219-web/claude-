"use client";

import { useEffect, useState, type ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";
import QuoteGallery from "@/components/QuoteGallery";
import SocialIcon from "@/components/SocialIcon";
import { LINKS } from "@/lib/data/site";
import { QUOTES } from "@/lib/data/quotes";

export default function QuoteGalleryModalButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative h-full max-h-[85svh] w-full max-w-[430px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉語錄作品集視窗"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              ✕
            </button>
            <div className="h-full w-full overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-5 shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <SectionHeading
                eyebrow="ILLUSTRATED QUOTES"
                title="風格語錄選粹"
                desc="以艾飛樂語錄一貫的溫柔筆調創作，完整每日更新與插畫原作。"
              />
              <div className="mt-6">
                <QuoteGallery quotes={QUOTES} />
              </div>
              <a
                href={LINKS.instagramQuotes}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold-light transition hover:bg-gold/20"
              >
                <SocialIcon type="instagram" className="h-4 w-4" />
                追蹤 Instagram 看更多語錄與插畫 →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
