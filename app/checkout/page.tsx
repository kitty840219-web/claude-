"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/lib/context/AppStateContext";

export default function CheckoutPage() {
  const { cart, cartTotal, checkout } = useAppState();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">購物車是空的，無法結帳</h1>
        <Link href="/plans" className="mt-4 inline-block text-brand-600 hover:underline">
          去挑選方案
        </Link>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      checkout();
      router.push("/account/esims");
    }, 600);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">結帳</h1>
      <p className="mt-1 text-sm text-gray-500">
        這是模擬結帳流程，不會產生真實金流交易
      </p>

      <div className="mt-6 rounded-xl border border-black/5 bg-white p-6">
        <h2 className="font-semibold text-gray-900">訂單摘要</h2>
        <ul className="mt-3 divide-y divide-black/5">
          {cart.map((item) => (
            <li key={item.plan.id} className="flex justify-between py-2 text-sm">
              <span>
                {item.plan.name} × {item.quantity}
              </span>
              <span className="font-medium">US${item.plan.priceUSD * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-black/5 pt-3 font-semibold text-gray-900">
          <span>總計</span>
          <span>US${cartTotal}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-black/5 bg-white p-6">
        <h2 className="font-semibold text-gray-900">聯絡資訊</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">電子郵件</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
          <p className="mt-1 text-xs text-gray-400">用於接收 eSIM 安裝說明（示範專案不會實際寄送）</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">付款方式</label>
          <div className="mt-1 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500">
            模擬付款（示範用途，未串接真實金流）
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {submitting ? "處理中…" : `確認付款 US$${cartTotal}`}
        </button>
      </form>
    </div>
  );
}
