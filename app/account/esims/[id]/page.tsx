"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/lib/context/AppStateContext";
import { formatData } from "@/lib/data/plans";
import QRCode from "@/components/QRCode";

export default function ESimDetailPage() {
  const params = useParams<{ id: string }>();
  const { esims } = useAppState();
  const esim = esims.find((e) => e.orderId === params.id);

  if (!esim) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">找不到此 eSIM 訂單</h1>
        <Link href="/account/esims" className="mt-4 inline-block text-brand-600 hover:underline">
          返回我的 eSIM
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/account/esims" className="text-sm text-brand-600 hover:underline">
        ← 返回我的 eSIM
      </Link>

      <div className="mt-4 rounded-xl border border-black/5 bg-white p-8">
        <h1 className="text-xl font-bold text-gray-900">{esim.plan.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {formatData(esim.plan.dataAmountGB)} · {esim.plan.validityDays} 天 ·{" "}
          {esim.plan.countries.join("、")}
        </p>

        <div className="mt-6 flex flex-col items-center rounded-lg bg-gray-50 py-8">
          <QRCode value={esim.activationCode} size={200} />
          <p className="mt-4 text-sm text-gray-500">使用手機相機或設定 App 掃描此 QR Code</p>
        </div>

        <dl className="mt-6 space-y-3 border-t border-black/5 pt-6 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-400">訂單編號</dt>
            <dd className="font-mono text-gray-800">{esim.orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">ICCID</dt>
            <dd className="font-mono text-gray-800">{esim.iccid}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">手動啟用碼</dt>
            <dd className="max-w-[60%] break-all text-right font-mono text-gray-800">
              {esim.activationCode}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">購買時間</dt>
            <dd className="text-gray-800">
              {new Date(esim.purchasedAt).toLocaleString("zh-TW")}
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-lg bg-brand-50 p-4 text-sm text-brand-800">
          <p className="font-semibold">安裝步驟</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>前往手機「設定」&gt;「行動網路」&gt;「加入 eSIM」</li>
            <li>選擇「使用 QR Code」並掃描上方圖片</li>
            <li>依畫面指示完成安裝，即可在抵達目的地後啟用漫遊</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
