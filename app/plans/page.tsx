"use client";

import { useMemo, useState } from "react";
import { PLANS } from "@/lib/data/plans";
import PlanCard from "@/components/PlanCard";
import RegionFilter from "@/components/RegionFilter";

export default function PlansPage() {
  const [region, setRegion] = useState("全部");

  const filtered = useMemo(
    () => (region === "全部" ? PLANS : PLANS.filter((p) => p.region === region)),
    [region]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">所有方案</h1>
      <p className="mt-1 text-sm text-gray-500">依地區篩選，找到最適合你的 eSIM 上網方案</p>

      <div className="mt-6">
        <RegionFilter selected={region} onChange={setRegion} />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-gray-400">此地區暫無方案</p>
      )}
    </div>
  );
}
