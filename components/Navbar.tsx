"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-night/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-night-light shadow-card">
            <Image
              src="/images/mascot.png"
              alt={SITE.brand}
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </span>
          <span className="font-serif text-lg font-bold tracking-wide text-night">
            {SITE.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-night text-paper"
                    : "text-ink-700 hover:bg-lavender/20 hover:text-night"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="開啟選單"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-night md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-night/10 bg-paper px-4 py-3 md:hidden">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href
                  ? "bg-night text-paper"
                  : "text-ink-700 hover:bg-lavender/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
