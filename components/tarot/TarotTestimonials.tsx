import { LINKS } from "@/lib/data/site";
import { TAROT_TESTIMONIALS } from "@/lib/data/tarotTestimonials";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-300" aria-label={`${count} 顆星`}>
      {"★".repeat(count)}
      <span className="text-amber-200/25">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export default function TarotTestimonials() {
  return (
    <div className="mx-auto w-full max-w-md px-5 pb-4 text-amber-50">
      <h3 className="mb-1 text-xs font-semibold tracking-[0.2em] text-amber-200/70">客戶真實回饋</h3>
      <p className="mb-4 text-[11px] text-amber-200/50">真實好評持續累積中</p>
      <div className="space-y-2.5">
        {TAROT_TESTIMONIALS.map((t, i) => (
          <div key={i} className="rounded-xl border border-amber-200/20 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-100">{t.author}</span>
              <Stars count={t.stars} />
            </div>
            <p className="mt-2 text-xs leading-6 text-amber-50/80">{t.quote}</p>
          </div>
        ))}
      </div>
      <a
        href={LINKS.lineOA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block rounded-full bg-amber-200 py-3.5 text-center text-sm font-semibold text-[#0b0f2e] shadow-soft transition hover:bg-amber-100"
      >
        加官方 LINE 預約占卜 →
      </a>
    </div>
  );
}
