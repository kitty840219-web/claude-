import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import SocialStation from "@/components/SocialStation";
import { asset } from "@/lib/basePath";

const QUICK_NAV = [
  {
    href: "/about#story",
    title: "艾飛樂的故事",
    desc: "從一個人的塗塗畫畫，到艾飛樂語錄的品牌旅程",
    image: "/images/home-story-cutout.png",
    tone: "from-[#f4e8d7] to-[#ded9ef]",
  },
  {
    href: "/works",
    title: "語錄作品",
    desc: "插畫語錄選粹，用一句話說出你的心事",
    image: "/images/home-quotes-cutout.png",
    tone: "from-[#f9e8e1] to-[#e7e1f2]",
  },
  {
    href: "/videos",
    title: "影音創作",
    desc: "YouTube 頻道與短影音創作紀錄",
    image: "/images/home-video.png",
    tone: "from-[#e6eef4] to-[#eee7f4]",
  },
  {
    href: "/shop",
    title: "周邊商店",
    desc: "明信片、貼紙、LINE 貼圖與客製小物",
    image: "/images/home-shop.png",
    tone: "from-[#f7eadc] to-[#eee4f3]",
  },
  {
    href: "/contact",
    title: "合作聯絡",
    desc: "插畫委託、品牌合作與接案洽詢",
    image: "/images/home-contact.png",
    tone: "from-[#f8e5e4] to-[#e5eaf3]",
  },
];

export default function HomePage() {
  return (
    <div>
      <SocialStation />

      {/* Quick nav */}
      <section className="bg-paper-warm py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="EXPLORE" title="走進艾飛樂的創作世界" center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {QUICK_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative min-h-52 overflow-hidden rounded-[1.75rem] border border-night/10 bg-gradient-to-br ${item.tone} p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/50`}
              >
                <div className="relative z-10 flex min-h-40 w-[58%] flex-col justify-center">
                  <h3 className="font-serif text-lg font-bold text-night">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                  <span className="mt-5 inline-flex text-xs font-semibold text-gold-dark transition group-hover:translate-x-1">
                    前往看看 →
                  </span>
                </div>
                <div className="pointer-events-none absolute -bottom-2 -right-5 h-[92%] w-[52%] animate-float-slow">
                  <Image
                    src={asset(item.image)}
                    alt={`${item.title}小艾插畫`}
                    fill
                    className="object-contain object-bottom transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
