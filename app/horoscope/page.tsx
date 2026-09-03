import type { Metadata } from "next";
import ZodiacFortune from "@/components/horoscope/ZodiacFortune";
import TarotDivination from "@/components/tarot/TarotDivination";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `星座｜塔羅 ｜ ${SITE.brand}`,
  description: "選擇你的星座看今日運勢，還有抽一張塔羅牌。",
};

function Divider() {
  return (
    <div className="relative bg-night-dark py-10">
      <div className="mx-auto h-px w-4/5 max-w-md bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}

export default function HoroscopePage() {
  return (
    <div>
      <ZodiacFortune />
      <Divider />
      <TarotDivination />
    </div>
  );
}
