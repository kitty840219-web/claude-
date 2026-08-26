"use client";

import Link from "next/link";
import { Plan, formatData } from "@/lib/data/plans";
import { useAppState } from "@/lib/context/AppStateContext";

export default function PlanCard({ plan }: { plan: Plan }) {
  const { addToCart } = useAppState();

  return (
    <div className="flex flex-col justify-between rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {plan.region}
          </span>
          {plan.fiveG && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              5G
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-gray-900">{plan.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{plan.countries.join("、")}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-gray-400">流量</dt>
            <dd className="font-medium text-gray-800">{formatData(plan.dataAmountGB)}</dd>
          </div>
          <div>
            <dt className="text-gray-400">效期</dt>
            <dd className="font-medium text-gray-800">{plan.validityDays} 天</dd>
          </div>
        </dl>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">
          US${plan.priceUSD}
        </span>
        <div className="flex gap-2">
          <Link
            href={`/plans/${plan.id}`}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            詳情
          </Link>
          <button
            onClick={() => addToCart(plan)}
            className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
