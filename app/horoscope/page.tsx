import type { Metadata } from "next";
import ZodiacFortune from "@/components/horoscope/ZodiacFortune";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `星座運勢 ｜ ${SITE.brand}`,
  description: "選擇你的星座，看看今天的愛情、事業、財運與健康運勢提醒。",
};

export default function HoroscopePage() {
  return <ZodiacFortune />;
}
