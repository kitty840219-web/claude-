import Link from "next/link";
import { PLANS } from "@/lib/data/plans";
import PlanCard from "@/components/PlanCard";

export default function HomePage() {
  const featured = PLANS.slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            出國旅遊、出差，一鍵開通 eSIM 上網
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            免換卡、免等待，購買後立即取得啟用碼與 QR Code，掃描即可安裝，
            涵蓋日韓、歐洲、美加、大洋洲與全球多國方案。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/plans"
              className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
            >
              瀏覽所有方案
            </Link>
            <Link
              href="/account/esims"
              className="rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              管理我的 eSIM
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">熱門方案</h2>
          <Link href="/plans" className="text-sm font-medium text-brand-600 hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-xl font-bold text-gray-900">使用流程</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { step: "1", title: "選擇方案", desc: "依旅遊國家或地區挑選合適的流量與天數方案" },
            { step: "2", title: "完成付款", desc: "填寫訂單資訊，模擬結帳完成購買" },
            { step: "3", title: "掃碼安裝", desc: "於「我的 eSIM」取得 QR Code，掃描即可安裝使用" },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-black/5 bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
