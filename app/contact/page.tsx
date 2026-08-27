import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
import { LINKS, SERVICES, SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `合作聯絡 ｜ ${SITE.brand}`,
  description: "與艾飛樂洽談插畫委託、品牌合作與客製周邊。",
};

const CONTACTS = [
  {
    key: "mail",
    label: "Email",
    value: LINKS.email,
    href: `mailto:${LINKS.email}`,
    icon: "mail" as const,
  },
  {
    key: "ig1",
    label: "Instagram · 語錄",
    value: "@aibi_0219",
    href: LINKS.instagramQuotes,
    icon: "instagram" as const,
  },
  {
    key: "ig2",
    label: "Instagram · 插畫",
    value: "dreamstar_illustration",
    href: LINKS.instagramIllustration,
    icon: "instagram" as const,
  },
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
      <section className="relative overflow-hidden bg-night-dark py-24 text-center">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-3 w-3 text-gold-light" />
            <p className="text-xs font-semibold tracking-[0.4em] text-gold-light">CONTACT</p>
            <Star className="h-3 w-3 text-gold-light" delay="1s" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">洽談合作</h1>
          <p className="mt-4 text-paper/70">插畫委託、品牌合作與客製周邊，歡迎與我聯繫</p>
        </div>
      </section>

      {/* Services / resume-style skills */}
      <section className="relative overflow-hidden bg-night-dark py-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="SKILLS & SERVICES" title="專業能力與服務項目" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-grain relative overflow-hidden rounded-2xl border border-paper/10 bg-night-light/40 p-6"
              >
                <h3 className="font-serif text-base font-bold text-gold-light">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-dark px-4 py-12">
        <a href={LINKS.lineOA} target="_blank" rel="noopener noreferrer" className="group relative mx-auto block min-h-44 max-w-md overflow-hidden rounded-[1.75rem] border border-paper/10 bg-night-light/20 p-5 shadow-card">
          <div className="relative z-10 w-[58%]">
            <SocialIcon type="line" className="h-6 w-6 text-paper" />
            <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-sage">OFFICIAL LINE</p>
            <h2 className="mt-1 font-serif text-base font-bold text-paper">加入小艾的好友</h2>
            <p className="mt-2 text-xs text-paper/60">@153yhemn</p>
            <span className="mt-4 inline-flex text-xs font-semibold text-gold-light">開啟 LINE →</span>
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-5 h-48 w-48 transition duration-500 group-hover:scale-105">
            <Image src={asset("/images/home-contact.png")} alt="小艾寄出一封信" fill className="object-contain object-bottom" sizes="192px" />
          </div>
        </a>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <div className="relative mx-auto h-32 w-32 md:mx-0">
              <Image src={asset("/images/mascot.png")} alt="艾飛樂 IP 角色" fill className="object-contain" />
            </div>
            <SectionHeading
              eyebrow="LET'S TALK"
              title="期待與你合作"
              desc={`我是 ${SITE.founder}，${SITE.brandFull}的創作者。無論是插畫委託、品牌視覺、客製周邊或聯名合作，都歡迎透過以下方式與我聯絡。`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACTS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target={c.key === "mail" ? undefined : "_blank"}
                rel={c.key === "mail" ? undefined : "noopener noreferrer"}
                className="group flex items-start gap-4 rounded-2xl border border-paper/10 bg-night-light/20 p-5 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-night-dark">
                  <SocialIcon type={c.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-gold-light">
                    {c.label}
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-paper">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-dark py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="PROCESS" title="合作流程" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-lg font-bold text-night-dark">
                  {p.step}
                </div>
                <h3 className="mt-4 font-serif text-sm font-bold text-paper">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-paper/60">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night-dark shadow-soft transition hover:bg-gold-light"
            >
              查看完整服務報價 →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-serif text-xl text-paper sm:text-2xl">
          「{SITE.tagline}，{SITE.taglineSub}。」
        </p>
        <p className="mt-3 text-sm text-paper/60">期待為你畫下屬於你的那顆星星。</p>
      </section>
    </div>
  );
}
