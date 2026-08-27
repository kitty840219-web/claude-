"use client";

import Link from "next/link";
import { useAppState } from "@/lib/context/AppStateContext";
import { formatData } from "@/lib/data/plans";

const STATUS_LABEL: Record<string, string> = {
  active: "使用中",
  pending: "待啟用",
  expired: "已過期",
};

const STATUS_STYLE: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  expired: "bg-gray-100 text-gray-500",
};

export default function MyESimsPage() {
  const { esims } = useAppState();

  if (esims.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">你還沒有任何 eSIM</h1>
        <p className="mt-2 text-sm text-gray-500">購買方案後，會顯示在這裡</p>
        <Link
          href="/plans"
          className="mt-6 inline-block rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          瀏覽方案
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">我的 eSIM</h1>

      <div className="mt-6 space-y-4">
        {esims.map((esim) => (
          <Link
            key={esim.orderId}
            href={`/account/esims/${esim.orderId}`}
            className="block rounded-xl border border-black/5 bg-white p-5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{esim.plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {formatData(esim.plan.dataAmountGB)} · {esim.plan.validityDays} 天
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  訂單編號：{esim.orderId} · 購買時間：
                  {new Date(esim.purchasedAt).toLocaleString("zh-TW")}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[esim.status]}`}
              >
                {STATUS_LABEL[esim.status]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
