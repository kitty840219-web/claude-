"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/",
    label: "旅程",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M4 11.5L12 4l8 7.5"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10v9a1 1 0 001 1h3.5v-5a1.5 1.5 0 013 0v5H17a1 1 0 001-1v-9"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "關於作者",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M5 20c.7-4 3.1-6 7-6s6.3 2 7 6" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/quests",
    label: "任務",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="5" y="4" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M9 4.5V3h6v1.5M8.5 10l1.5 1.5 3-3M8.5 16l1.5 1.5 3-3M14.5 10H17M14.5 16H17" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/works",
    label: "語錄",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M12 3l2.1 6.3H20l-5 3.9 1.9 6.3L12 15.6l-4.9 3.9 1.9-6.3-5-3.9h5.9L12 3z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 1.4 : 1.6} strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/tarot",
    label: "大眾占卜",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="11" r="6" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M9.5 11.5l1.6 1.5 3.4-4" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 19h10M8.5 17h7" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
        <path d="M12 3V1.8M5.5 5.5l-.9-.9M18.5 5.5l.9-.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/shop",
    label: "商店",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M4 8l1.5-4h13L20 8" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinejoin="round" />
        <path d="M4 8h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M9 12a3 3 0 006 0" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "洽談合作",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="主要導覽"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-paper/10 bg-night-dark/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[9px] font-medium"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-gold text-night-dark" : "text-paper/45"
                }`}
              >
                {tab.icon(active)}
              </span>
              <span className={active ? "text-gold-light" : "text-paper/45"}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
