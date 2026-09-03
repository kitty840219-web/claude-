import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import MainWrapper from "@/components/MainWrapper";
import PageTransition from "@/components/PageTransition";
import EntryGate from "@/components/EntryGate";
import BackgroundMusic from "@/components/BackgroundMusic";
import MeteorShower from "@/components/MeteorShower";
import StarField from "@/components/StarField";
import { SITE } from "@/lib/data/site";
import { asset } from "@/lib/basePath";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const maShanZheng = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ma-shan-zheng",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kitty840219-web.github.io"),
  title: `${SITE.brand} ｜ ${SITE.brandEn}`,
  description: SITE.description,
  openGraph: {
    title: SITE.brandFull,
    description: SITE.description,
    images: [asset("/images/hero-cover.webp")],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerifTC.variable} ${notoSansTC.variable} ${maShanZheng.variable}`}
    >
      <body className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-night-dark font-sans text-paper shadow-[0_0_60px_rgba(0,0,0,0.4)] antialiased">
        <EntryGate />
        <StarField />
        <MeteorShower />
        <Navbar />
        <MainWrapper>
          <PageTransition>{children}</PageTransition>
        </MainWrapper>
        <Footer />
        <BottomNav />
        <BackgroundMusic />
      </body>
    </html>
  );
}
