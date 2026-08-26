import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import SocialIcon from "@/components/SocialIcon";
import Star from "@/components/Star";
import { LINKS, SITE } from "@/lib/data/site";

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
    key: "line",
    label: "LINE 官方帳號",
    value: "@153yhemn",
    href: LINKS.lineOA,
    icon: "line" as const,
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
          <h1 className="font-serif text-3xl font-bold text-paper sm:text-5xl">合作聯絡</h1>
          <p className="mt-4 text-paper/70">插畫委託、品牌合作與客製周邊，歡迎與我聯繫</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <div className="relative mx-auto h-32 w-32 md:mx-0">
              <Image src="/images/mascot.png" alt="艾飛樂 IP 角色" fill className="object-contain" />
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
                className="group flex items-start gap-4 rounded-2xl border border-night/10 bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-night text-paper">
                  <SocialIcon type={c.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-gold-dark">
                    {c.label}
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-night">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="PROCESS" title="合作流程" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-night font-serif text-lg font-bold text-gold-light">
                  {p.step}
                </div>
                <h3 className="mt-4 font-serif text-sm font-bold text-night">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-serif text-xl text-night sm:text-2xl">
          「{SITE.tagline}，{SITE.taglineSub}。」
        </p>
        <p className="mt-3 text-sm text-ink-500">期待為你畫下屬於你的那顆星星。</p>
      </section>
    </div>
  );
}
