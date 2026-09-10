"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { asset } from "@/lib/basePath";

const TABS = [
  { href: "/about", label: "關於作者", avatar: "/images/nav/nav-about.webp" },
  { href: "/works", label: "最新文章", avatar: "/images/nav/nav-works.webp" },
  { href: "/horoscope", label: "星座運勢", avatar: "/images/nav/nav-horoscope.webp" },
  { href: "/tarot", label: "塔羅占卜", avatar: "/images/nav/nav-tarot.webp" },
  { href: "/shop", label: "商店", avatar: "/images/nav/nav-shop.webp" },
  { href: "/contact", label: "洽談合作", avatar: "/images/nav/nav-contact.webp" },
];

function BottomNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (searchParams.get("embed") === "1") return null;

  return (
    <nav
      aria-label="主要導覽"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-paper/10 bg-night-dark/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map((tab) => {
          const active = tab.href === "/about" ? pathname === "/" || pathname.startsWith("/about") : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[9px] font-medium"
            >
              <span
                className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 transition-colors ${
                  active ? "border-gold-light" : "border-transparent opacity-55"
                }`}
              >
                <Image src={asset(tab.avatar)} alt="" fill sizes="32px" className="object-cover" />
              </span>
              <span className={active ? "text-gold-light" : "text-paper/45"}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function BottomNav() {
  return (
    <Suspense fallback={null}>
      <BottomNavInner />
    </Suspense>
  );
}
