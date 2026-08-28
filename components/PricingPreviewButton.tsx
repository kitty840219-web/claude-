"use client";

import { useEffect, useState, type ReactNode } from "react";
import { asset } from "@/lib/basePath";

export default function PricingPreviewButton({
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex h-full max-h-[85svh] w-full max-w-[430px] flex-col overflow-hidden rounded-[1.5rem] border border-gold/30 bg-night-dark shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-paper/10 px-4 py-3">
              <p className="font-serif text-sm font-bold text-paper">服務報價</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="關閉服務報價視窗"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/10 text-paper transition hover:bg-paper/20"
              >
                ✕
              </button>
            </div>
            <iframe
              title="服務報價"
              src={`${asset("/pricing/")}?embed=1`}
              className="h-full w-full flex-1 border-0 bg-night-dark"
            />
          </div>
        </div>
      )}
    </>
  );
}
