import Image from "next/image";
import type { Metadata } from "next";
import HomeGameHub from "@/components/HomeGameHub";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `任務｜${SITE.brand}`,
  description: "完成小艾的每日星光任務，探索故事、語錄、占卜與商店。",
};

export default function QuestsPage() {
  return (
    <div>
      <HomeGameHub />

      {/* Mascot intro */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-[2rem] border border-night/10 bg-paper p-8 shadow-card sm:grid-cols-[auto_1fr] sm:p-12">
            <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
              <Image src={asset("/images/mascot.png")} alt="艾飛樂品牌 IP 角色" fill className="object-contain" />
            </div>
            <div>
              <SectionHeading eyebrow="BRAND CHARACTER" title="艾飛樂的 IP 角色" />
              <p className="mt-4 text-sm leading-loose text-ink-600 sm:text-base">
                戴著草帽、綁著雙辮的女孩，是艾飛樂的品牌代言角色。她總是靜靜微笑、雙手合十，
                像是在傾聽每個人的心事——這份安靜而溫暖的陪伴感，正是艾飛樂語錄想帶給每位讀者的感受。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
