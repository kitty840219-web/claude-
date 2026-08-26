"use client";

import Link from "next/link";
import { useAppState } from "@/lib/context/AppStateContext";
import { formatData } from "@/lib/data/plans";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useAppState();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">購物車是空的</h1>
        <p className="mt-2 text-sm text-gray-500">快去挑選適合的 eSIM 方案吧</p>
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
      <h1 className="text-2xl font-bold text-gray-900">購物車</h1>

      <div className="mt-6 space-y-4">
        {cart.map((item) => (
          <div
            key={item.plan.id}
            className="flex items-center justify-between rounded-xl border border-black/5 bg-white p-5"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{item.plan.name}</h3>
              <p className="text-sm text-gray-500">
                {formatData(item.plan.dataAmountGB)} · {item.plan.validityDays} 天 · US$
                {item.plan.priceUSD}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md border border-gray-200">
                <button
                  onClick={() => updateQuantity(item.plan.id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                  aria-label="減少數量"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.plan.id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                  aria-label="增加數量"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.plan.id)}
                className="text-sm text-red-500 hover:underline"
              >
                移除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-xl border border-black/5 bg-white p-5">
        <span className="text-lg font-semibold text-gray-900">總計</span>
        <span className="text-2xl font-bold text-gray-900">US${cartTotal}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block rounded-md bg-brand-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
      >
        前往結帳
      </Link>
    </div>
  );
}
