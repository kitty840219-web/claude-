import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import HomeGameHub from "@/components/HomeGameHub";
import { asset } from "@/lib/basePath";

export default function QuestsSection() {
  return (
    <div>
      {/* Mascot intro */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-[2rem] border border-gold/15 bg-night-light/20 p-8 shadow-card sm:grid-cols-[auto_1fr] sm:p-12">
            <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
              <Image src={asset("/images/mascot.webp")} alt="艾飛樂品牌 IP 角色" fill className="object-contain" />
            </div>
            <div>
              <SectionHeading eyebrow="BRAND CHARACTER" title="艾飛樂的 IP 角色" />
              <p className="mt-4 text-sm leading-loose text-paper/70 sm:text-base">
                戴著草帽、綁著雙辮的女孩，是艾飛樂的品牌代言角色。她總是靜靜微笑、雙手合十，
                像是在傾聽每個人的心事——這份安靜而溫暖的陪伴感，正是艾飛樂語錄想帶給每位讀者的感受。
              </p>
            </div>
          </div>
        </div>
      </section>

      <HomeGameHub />
    </div>
  );
}
