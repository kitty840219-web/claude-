import Link from "next/link";
import { LINKS, NAV, SITE } from "@/lib/data/site";
import SocialIcon from "@/components/SocialIcon";
import ReplayIntroButton from "@/components/ReplayIntroButton";

const SOCIALS = [
  { key: "instagram" as const, href: LINKS.instagramQuotes, label: "Instagram · 語錄" },
  { key: "instagram" as const, href: LINKS.instagramIllustration, label: "Instagram · 插畫" },
  { key: "youtube" as const, href: LINKS.youtube, label: "YouTube" },
  { key: "line" as const, href: LINKS.lineOA, label: "LINE 官方帳號" },
  { key: "link" as const, href: LINKS.portaly, label: "Portaly 連結頁" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night-dark text-paper/90">
      <div className="bg-stars pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-bold text-paper">{SITE.brand}</p>
            <p className="mt-1 text-xs tracking-widest text-lavender-light">
              {SITE.brandEn.toUpperCase()}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              {SITE.tagline}，{SITE.taglineSub}。
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-gold-light">網站導覽</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-paper/70">
              {NAV.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  <Link href={link.href} className="hover:text-gold-light">
                    {link.label}
                  </Link>
                  {i < NAV.length - 1 && <span className="text-paper/25">｜</span>}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-gold-light">追蹤艾飛樂</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-paper/70">
              {SOCIALS.map((s, i) => (
                <span key={s.label} className="flex items-center gap-2">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-gold-light"
                  >
                    <SocialIcon type={s.key} className="h-4 w-4" />
                    {s.label}
                  </a>
                  {i < SOCIALS.length - 1 && <span className="text-paper/25">｜</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.brandFull}
          </p>
          <p>用插畫與文字，陪你走過每個黑夜。</p>
        </div>
        <div className="mt-4 text-center">
          <ReplayIntroButton />
        </div>
      </div>
    </footer>
  );
}
