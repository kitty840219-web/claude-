import type { Metadata } from "next";
import TarotDivination from "@/components/tarot/TarotDivination";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `塔羅占卜 ｜ ${SITE.brand}`,
  description: "輸入你的提問，抽一張或三張塔羅牌，獲得屬於你的解讀。",
};

export default function TarotPage() {
  return <TarotDivination />;
}
