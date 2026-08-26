"use client";

import { REGIONS } from "@/lib/data/plans";

export default function RegionFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (region: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {REGIONS.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === region
              ? "bg-brand-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
