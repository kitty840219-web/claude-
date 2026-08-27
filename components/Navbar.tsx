"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

const DARK_ROUTES = ["/", "/about", "/tarot"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDark = DARK_ROUTES.some((route) => (route === "/" ? pathname === "/" : pathname.startsWith(route)));

  return (
    <header
      className={`sticky top-0 z-30 ${
        isDark ? "border-b border-paper/10 bg-night-dark" : "border-b border-night/10 bg-paper/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-night-light shadow-card">
            <Image
              src={asset("/images/mascot.png")}
              alt={SITE.brand}
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </span>
          <span className={`font-serif text-lg font-bold tracking-wide ${isDark ? "text-paper" : "text-night"}`}>
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
                    ? isDark
                      ? "bg-gold text-night-dark"
                      : "bg-night text-paper"
                    : isDark
                      ? "text-paper/70 hover:bg-paper/10 hover:text-paper"
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
          className={`flex h-9 w-9 items-center justify-center rounded-full md:hidden ${isDark ? "text-paper" : "text-night"}`}
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
        <nav
          className={`flex flex-col gap-1 border-t px-4 py-3 md:hidden ${
            isDark ? "border-paper/10 bg-night-dark" : "border-night/10 bg-paper"
          }`}
        >
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href
                  ? isDark
                    ? "bg-gold text-night-dark"
                    : "bg-night text-paper"
                  : isDark
                    ? "text-paper/80 hover:bg-paper/10"
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
