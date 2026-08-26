"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPlanById, formatData } from "@/lib/data/plans";
import { useAppState } from "@/lib/context/AppStateContext";

export default function PlanDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useAppState();
  const plan = getPlanById(params.id);
  const [added, setAdded] = useState(false);

  if (!plan) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">找不到此方案</h1>
        <Link href="/plans" className="mt-4 inline-block text-brand-600 hover:underline">
          返回方案列表
        </Link>
      </div>
    );
  }

  function handleAdd() {
    addToCart(plan!);
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/plans" className="text-sm text-brand-600 hover:underline">
        ← 返回方案列表
      </Link>

      <div className="mt-4 rounded-xl border border-black/5 bg-white p-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {plan.region}
          </span>
          {plan.fiveG && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              5G
            </span>
          )}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">{plan.name}</h1>
        <p className="mt-1 text-gray-500">適用國家/地區：{plan.countries.join("、")}</p>

        <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-black/5 pt-6 sm:grid-cols-4">
          <div>
            <dt className="text-sm text-gray-400">流量</dt>
            <dd className="mt-1 font-semibold text-gray-900">{formatData(plan.dataAmountGB)}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">效期</dt>
            <dd className="mt-1 font-semibold text-gray-900">{plan.validityDays} 天</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">合作電信商</dt>
            <dd className="mt-1 font-semibold text-gray-900">{plan.network}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">價格</dt>
            <dd className="mt-1 font-semibold text-gray-900">US${plan.priceUSD}</dd>
          </div>
        </dl>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleAdd}
            className="rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {added ? "已加入購物車 ✓" : "加入購物車"}
          </button>
          <button
            onClick={() => {
              addToCart(plan);
              router.push("/checkout");
            }}
            className="rounded-md border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            立即購買
          </button>
        </div>
      </div>
    </div>
  );
}
