"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { NAV, SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

function NavbarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  if (searchParams.get("embed") === "1") return null;

  return (
    <header className="sticky top-0 z-30 border-b border-paper/10 bg-night-dark">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-night-light shadow-card">
            <Image
              src={asset("/images/mascot.webp")}
              alt={SITE.brand}
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </span>
          <span className="font-serif text-lg font-bold tracking-wide text-paper">{SITE.brand}</span>
        </Link>

        <button
          aria-label="開啟選單"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-paper"
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
        <nav className="flex flex-col gap-1 border-t border-paper/10 bg-night-dark px-4 py-3">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href ? "bg-gold text-night-dark" : "text-paper/80 hover:bg-paper/10"
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

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
