import type { Metadata } from "next";
import Image from "next/image";
import PricingPreviewButton from "@/components/PricingPreviewButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceCarousel from "@/components/ServiceCarousel";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
import { LINKS, SERVICES, SITE } from "@/lib/data/site";
import { CHIPS } from "@/lib/data/pricing";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `合作聯絡 ｜ ${SITE.brand}`,
  description: "與艾飛樂洽談插畫委託、品牌合作與客製周邊。",
};

const CONTACTS = [
  {
    key: "line",
    label: "OFFICIAL LINE",
    title: "加入小艾的好友",
    value: "@153yhemn",
    href: LINKS.lineOA,
    cta: "開啟 LINE →",
    icon: "line" as const,
  },
  {
    key: "mail",
    label: "EMAIL",
    title: "電子郵件",
    value: LINKS.email,
    href: `mailto:${LINKS.email}`,
    cta: "寄送 EMAIL →",
    icon: "mail" as const,
  },
  {
    key: "ig1",
    label: "INSTAGRAM · 語錄",
    title: "艾飛樂語錄",
    value: "@aibi_0219",
    href: LINKS.instagramQuotes,
    cta: "開啟 INSTAGRAM →",
    icon: "instagram" as const,
  },
  {
    key: "ig2",
    label: "INSTAGRAM · 插畫",
    title: "插畫創作帳號",
    value: "dreamstar_illustration",
    href: LINKS.instagramIllustration,
    cta: "開啟 INSTAGRAM →",
    icon: "instagram" as const,
  },
];

const SERVICE_ART = [
  "/images/home-quotes-cutout.webp",
  "/images/home-story-cutout.webp",
  "/images/home-shop.webp",
  "/images/mascot.webp",
  "/images/home-contact.webp",
  "/images/home-video.webp",
];

const PROCESS = [
  { step: "01", title: "傳送需求", desc: "透過 Email 或 LINE 告訴我您的想法與用途" },
  { step: "02", title: "討論規劃", desc: "確認風格、尺寸、交件時間與報價" },
  { step: "03", title: "草稿確認", desc: "提供草稿供您確認方向，可進行一次調整" },
  { step: "04", title: "完稿交付", desc: "完成上色與細節，交付最終檔案" },
];

export default function ContactPage() {
  return (
    <div>
      {/* Services / resume-style skills */}
      <section className="relative overflow-hidden bg-night-dark pb-10 pt-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="SKILLS & SERVICES" title="專業能力與服務項目" center />
          <div className="mt-10">
            <ServiceCarousel services={SERVICES} art={SERVICE_ART} />
          </div>
          <div className="mt-10 flex justify-center">
            <PricingPreviewButton className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light">
              查看服務報價 →
            </PricingPreviewButton>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night-dark pb-24 pt-10 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">CONTACT</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">洽談合作</h1>
          <p className="mt-4 text-paper/70">插畫委託、品牌合作與客製周邊，歡迎與我聯繫</p>

          <div className="mt-10 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {CHIPS.map((c) => (
              <div key={c.t} className="rounded-2xl border border-gold/15 bg-night-light/20 p-4 shadow-card">
                <p className="text-sm font-bold text-paper">{c.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-paper/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <SectionHeading
              eyebrow="LET'S TALK"
              title="期待與你合作"
              desc={`我是 ${SITE.founder}，${SITE.brandFull}的創作者。無論是插畫委託、品牌視覺、客製周邊或聯名合作，都歡迎透過以下方式與我聯絡。`}
            />
          </div>

          <div className="grid gap-4">
            {CONTACTS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target={c.key === "mail" ? undefined : "_blank"}
                rel={c.key === "mail" ? undefined : "noopener noreferrer"}
                className="group relative min-h-44 overflow-hidden rounded-[1.75rem] border border-gold/15 bg-night-light/20 p-6 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
              >
                <span className={`relative z-10 block ${c.key === "line" ? "w-[62%]" : "w-full"}`}>
                  <SocialIcon type={c.icon} className="h-6 w-6 text-paper" />
                  <span className="mt-4 block text-[10px] font-semibold tracking-[0.22em] text-sage">{c.label}</span>
                  <span className="mt-2 block font-serif text-lg font-bold text-paper">{c.title}</span>
                  <span className="mt-2 block break-all text-sm text-paper/60">{c.value}</span>
                  <span className="mt-5 block text-xs font-semibold text-gold-light">{c.cta}</span>
                </span>
                {c.key === "line" && <span className="animate-float-slow pointer-events-none absolute -bottom-5 -right-2 h-44 w-36 transition duration-500 group-hover:scale-105"><Image src={asset("/images/mascot.webp")} alt="小艾" fill className="object-contain object-bottom" sizes="144px" /></span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-dark py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="PROCESS" title="合作流程" center />
          <div className="relative mt-10 grid gap-4">
            <div className="pointer-events-none absolute bottom-10 left-7 top-10 w-px bg-gold/25" />
            {PROCESS.map((p) => (
              <div key={p.step} className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-gold/15 bg-night-light/20 p-4 text-left shadow-card">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold font-serif text-lg font-bold text-night-dark">
                  {p.step}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base font-bold text-paper">{p.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-paper/60">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
