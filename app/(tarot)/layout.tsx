import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "艾飛樂塔羅 · 大眾占卜抽牌",
  description: "輸入你的提問，抽一張塔羅牌，獲得屬於你的解讀。",
};

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0b0f2e]">{children}</div>;
}
