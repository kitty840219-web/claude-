import Image from "next/image";
import { LINKS } from "@/lib/data/site";
import { asset } from "@/lib/basePath";
import SocialIcon from "@/components/SocialIcon";

const YOUTUBE_VIDEO_ID = "2MH3zN3VCn4";

export default function SocialStation() {
  return (
    <section className="relative overflow-hidden bg-night-dark px-4 py-16">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-md">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-gold-light">SOCIAL STATION</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-paper">小艾的社群觀測站</h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/65">觀看影音、追蹤最新插畫，或從 LINE 寄一封訊息給小艾。</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-paper/10 bg-night shadow-soft">
          <div className="relative aspect-video bg-black">
            <iframe
              title="艾飛樂 YouTube 影音"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-between gap-3 p-5">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gold-light">YOUTUBE</p>
              <h3 className="mt-1 font-serif text-base font-bold text-paper">艾飛樂影音放映室</h3>
            </div>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-night-dark">
              前往頻道
            </a>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <a href={LINKS.instagramQuotes} target="_blank" rel="noopener noreferrer" className="group relative min-h-40 overflow-hidden rounded-[1.75rem] border border-paper/10 bg-gradient-to-br from-[#eee6f5] to-[#f8e6e2] p-5 shadow-card">
            <div className="relative z-10 w-[58%]">
              <SocialIcon type="instagram" className="h-6 w-6 text-night" />
              <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-gold-dark">INSTAGRAM</p>
              <h3 className="mt-1 font-serif text-base font-bold text-night">每日語錄與插畫</h3>
              <p className="mt-2 text-xs text-ink-500">@aibi_0219</p>
              <span className="mt-4 inline-flex text-xs font-semibold text-night">打開作品牆 →</span>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-5 h-44 w-44 transition duration-500 group-hover:scale-105">
              <Image src={asset("/images/home-quotes-cutout.png")} alt="小艾語錄創作" fill className="object-contain object-bottom" sizes="176px" />
            </div>
          </a>

          <a href={LINKS.lineOA} target="_blank" rel="noopener noreferrer" className="group relative min-h-40 overflow-hidden rounded-[1.75rem] border border-paper/10 bg-gradient-to-br from-[#e8f1e9] to-[#f7ecd9] p-5 shadow-card">
            <div className="relative z-10 w-[58%]">
              <SocialIcon type="line" className="h-6 w-6 text-night" />
              <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-sage">OFFICIAL LINE</p>
              <h3 className="mt-1 font-serif text-base font-bold text-night">加入小艾的好友</h3>
              <p className="mt-2 text-xs text-ink-500">@153yhemn</p>
              <span className="mt-4 inline-flex text-xs font-semibold text-night">開啟 LINE →</span>
            </div>
            <div className="pointer-events-none absolute -bottom-8 -right-5 h-48 w-48 transition duration-500 group-hover:scale-105">
              <Image src={asset("/images/home-contact.png")} alt="小艾寄出一封信" fill className="object-contain object-bottom" sizes="192px" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
