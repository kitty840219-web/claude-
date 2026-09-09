import type { Metadata } from "next";
import PhoneCaseGrid from "@/components/phonecases/PhoneCaseGrid";
import Star from "@/components/Star";
import { LINKS, SITE } from "@/lib/data/site";
import { PHONE_CASES } from "@/lib/data/phoneCases";

export const metadata: Metadata = {
  title: `手機殼系列 ｜ ${SITE.brand}`,
  description: "艾飛樂療癒插畫手機殼系列：透明防撞殼、TPU軟款，把溫柔的插畫日常帶著走。",
};

export default function PhoneCasesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-night-dark pb-10 pt-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2rem] bg-night-light/15 px-6 py-7">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-3 w-3 text-gold-light" />
              <p className="text-xs font-semibold tracking-[0.35em] text-gold-light">PHONE CASES</p>
            </div>
            <h1 className="font-serif text-3xl font-bold text-paper">療癒插畫手機殼系列</h1>
            <p className="mt-3 text-sm leading-6 text-paper/70">
              把溫柔、療癒與喜歡，裝進每一個日常。共 {PHONE_CASES.length} 款設計，透明防撞殼．TPU軟款。
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night-dark px-4 pb-20 pt-6 sm:px-6">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <PhoneCaseGrid cases={PHONE_CASES} shopHref={LINKS.kusdom} />
          <p className="mt-6 text-center text-xs text-paper/50">點一下卡片查看款式詳情 →</p>
        </div>
      </section>
    </div>
  );
}
