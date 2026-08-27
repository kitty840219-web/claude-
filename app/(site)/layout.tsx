import type { Metadata } from "next";
import "../globals.css";
import { AppStateProvider } from "@/lib/context/AppStateContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "eSIM 電話網",
  description: "瀏覽、購買與管理各國 eSIM 上網方案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <AppStateProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
