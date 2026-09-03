import type { Metadata } from "next";
import QuestsSection from "@/components/QuestsSection";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `任務｜${SITE.brand}`,
  description: "完成小艾的每日星光任務，探索故事、語錄、占卜與商店。",
};

export default function QuestsPage() {
  return <QuestsSection />;
}
