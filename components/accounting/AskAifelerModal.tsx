"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { askAccountingAi } from "@/lib/accounting/ai";
import { ACCOUNTING_RESOURCES } from "@/lib/accounting/resources";
import { ACCOUNTING_TOOLS } from "@/lib/accounting/tools";

const SUGGESTED_PROMPTS = ["我要算利潤", "營業稅怎麼算？", "發票要怎麼開", "怎麼成立公司"];

export default function AskAifelerModal() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState<{ text: string; suggested: string; resource: string } | null>(null);
  const [askError, setAskError] = useState("");

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  async function handleAsk(q?: string) {
    const text = (q ?? question).trim();
    if (!text) return;
    setAsking(true);
    setAskError("");
    setAnswer(null);
    try {
      const result = await askAccountingAi(text);
      const suggestedLabel = ACCOUNTING_TOOLS.find((t) => t.id === result.suggestedTool)?.label || "";
      setAnswer({ text: result.answer, suggested: suggestedLabel, resource: result.suggestedResource });
    } catch (e) {
      setAskError(e instanceof Error ? e.message : "小幫手暫時無法回答，請稍後再試");
    } finally {
      setAsking(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-4 rounded-[1.5rem] border border-gold/20 bg-night-light/15 px-5 py-4 text-left shadow-card transition hover:border-gold/40"
      >
        <span className="relative h-14 w-14 shrink-0">
          <Image src={asset("/images/pricing-guide-cutout.webp")} alt="小艾" fill className="object-contain" sizes="56px" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-base font-bold text-paper">問艾飛樂會計問題</span>
          <span className="mt-1 block text-xs leading-relaxed text-paper/60">利潤、發票、營業稅、勞資問題，直接問我</span>
        </span>
        <span className="shrink-0 text-gold-light transition group-hover:translate-x-1">→</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉問答視窗"
              className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-6 text-paper shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <p className="font-serif text-lg font-bold text-paper">嗨！我是艾飛樂</p>
              <p className="mt-1 text-xs text-paper/60">有任何會計問題，都可以問我喔！</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk();
                }}
                className="mt-3 flex items-center gap-2 rounded-2xl border border-gold/20 bg-night-light/20 px-4 py-3"
              >
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例如：我要算利潤、如何開發票、營業稅怎麼算？"
                  className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-paper/40"
                />
                <button
                  type="submit"
                  disabled={asking}
                  aria-label="送出問題"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-night-dark disabled:opacity-50"
                >
                  {asking ? "…" : "➤"}
                </button>
              </form>

              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setQuestion(p);
                      handleAsk(p);
                    }}
                    className="rounded-full border border-gold/20 px-3 py-1.5 text-xs text-paper/60 transition hover:border-gold/50 hover:text-gold-light"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {asking && <p className="mt-4 text-xs text-paper/60">艾飛樂正在想...</p>}
              {askError && <p className="mt-4 text-xs text-rose-300">{askError}</p>}
              {answer && (
                <div className="mt-4 rounded-2xl border border-gold/15 bg-night-light/20 p-4">
                  <p className="text-sm leading-6 text-paper/90">{answer.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {answer.suggested && (
                      <Link
                        href="/accounting"
                        className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-night-dark transition hover:bg-gold-light"
                      >
                        打開 {answer.suggested} →
                      </Link>
                    )}
                    {answer.resource && (
                      <a
                        href={ACCOUNTING_RESOURCES.find((r) => r.name === answer.resource)?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-gold-light transition hover:border-gold/60"
                      >
                        前往 {answer.resource} →
                      </a>
                    )}
                  </div>
                </div>
              )}

              <Link
                href="/accounting"
                className="mt-6 block rounded-full border border-gold/30 px-4 py-3 text-center text-sm font-semibold text-gold-light transition hover:border-gold/60"
              >
                查看完整會計小幫手工具 →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
