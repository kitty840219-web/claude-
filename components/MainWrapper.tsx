"use client";

import { usePathname } from "next/navigation";
import { isDarkRoute } from "@/lib/darkRoutes";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDark = isDarkRoute(pathname);

  return <main className={`flex-1 pb-16 md:pb-0 ${isDark ? "bg-night-dark" : ""}`}>{children}</main>;
}
