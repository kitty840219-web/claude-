"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { askAccountingAi } from "@/lib/accounting/ai";
import {
  calcBusinessTax,
  calcCost,
  calcInvoiceFromTaxIncluded,
  calcInvoiceFromUntaxed,
  calcLaborInsurance,
  calcPayroll,
  calcProfit,
  calcSplit,
  type CostItem,
  type SplitShare,
} from "@/lib/accounting/calculators";
import { loadAccountingHistory, saveAccountingRecord, type AccountingRecord } from "@/lib/accounting/history";
import { ACCOUNTING_RESOURCES } from "@/lib/accounting/resources";
import { ACCOUNTING_TOOLS, type AccountingToolId } from "@/lib/accounting/tools";
import Star from "@/components/Star";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const SUGGESTED_PROMPTS = ["我要算利潤", "營業稅怎麼算？", "發票要怎麼開", "怎麼成立公司"];

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-8" onClick={onClose}>
      <div className="relative h-full max-h-[85svh] w-full max-w-[430px]" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉小幫手"
          className="absolute -right-2 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-xl font-bold text-night-dark shadow-soft transition hover:bg-gold-light"
        >
          ✕
        </button>
        <div className="flex h-full w-full flex-col overflow-y-auto rounded-[1.5rem] border border-gold/30 bg-night-dark p-5 text-paper shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <h3 className="font-serif text-lg font-bold text-paper">{title}</h3>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-paper/60">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-paper outline-none"
          placeholder="0"
        />
        {suffix && <span className="shrink-0 text-xs text-paper/50">{suffix}</span>}
      </div>
    </label>
  );
}

function ResultRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${strong ? "text-base font-bold text-gold-light" : "text-sm text-paper"}`}>
      <span className={strong ? "" : "text-paper/60"}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function num(v: string) {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function ProfitTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [price, setPrice] = useState("899");
  const [cost, setCost] = useState("320");
  const [feePercent, setFeePercent] = useState("8");
  const [shipping, setShipping] = useState("60");
  const [ad, setAd] = useState("30");
  const result = calcProfit(num(price), num(cost), num(feePercent), num(shipping), num(ad));

  return (
    <div className="space-y-3">
      <NumberField label="商品售價" value={price} onChange={setPrice} suffix="元" />
      <NumberField label="成本" value={cost} onChange={setCost} suffix="元" />
      <NumberField label="平台抽成" value={feePercent} onChange={setFeePercent} suffix="%" />
      <NumberField label="物流費" value={shipping} onChange={setShipping} suffix="元" />
      <NumberField label="廣告費" value={ad} onChange={setAd} suffix="元" />
      <div className="mt-4 rounded-xl bg-night-light/25 p-4">
        <ResultRow label="平台抽成金額" value={fmt(result.platformFee)} />
        <ResultRow label="實際利潤" value={fmt(result.profit)} strong />
        <ResultRow label="利潤率" value={`${result.margin}%`} strong />
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "profit",
            toolLabel: "利潤小幫手",
            title: `售價 ${fmt(num(price))} 利潤試算`,
            resultLabel: "利潤",
            resultValue: `${fmt(result.profit)}（${result.margin}%）`,
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function CostTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [items, setItems] = useState<CostItem[]>([
    { label: "材料工具", amount: 150 },
    { label: "平台抽成", amount: 72 },
    { label: "物流費", amount: 60 },
  ]);
  const [price, setPrice] = useState("899");
  const result = calcCost(items, num(price));

  function updateItem(i: number, patch: Partial<CostItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-paper/60">成本項目</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item.label}
            onChange={(e) => updateItem(i, { label: e.target.value })}
            className="w-1/2 rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5 text-sm text-paper outline-none"
          />
          <input
            type="number"
            value={item.amount}
            onChange={(e) => updateItem(i, { amount: num(e.target.value) })}
            className="w-1/2 rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5 text-sm text-paper outline-none"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { label: "新項目", amount: 0 }])}
        className="text-xs font-semibold text-gold-light"
      >
        ＋ 新增一項
      </button>
      <NumberField label="商品售價（選填，用來算成本率）" value={price} onChange={setPrice} suffix="元" />
      <div className="mt-4 rounded-xl bg-night-light/25 p-4">
        <ResultRow label="總成本" value={fmt(result.total)} strong />
        {num(price) > 0 && <ResultRow label="成本率" value={`${result.ratio}%`} />}
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "cost",
            toolLabel: "成本小幫手",
            title: "成本試算",
            resultLabel: "總成本",
            resultValue: fmt(result.total),
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function SplitTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [total, setTotal] = useState("120000");
  const [shares, setShares] = useState<SplitShare[]>([
    { label: "成員 A", percent: 25 },
    { label: "成員 B", percent: 25 },
    { label: "成員 C", percent: 25 },
    { label: "成員 D", percent: 25 },
  ]);
  const result = calcSplit(num(total), shares);

  function updateShare(i: number, patch: Partial<SplitShare>) {
    setShares((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  return (
    <div className="space-y-3">
      <NumberField label="總金額" value={total} onChange={setTotal} suffix="元" />
      <p className="text-xs font-semibold text-paper/60">分潤比例</p>
      {shares.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={s.label}
            onChange={(e) => updateShare(i, { label: e.target.value })}
            className="w-1/2 rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5 text-sm text-paper outline-none"
          />
          <div className="flex w-1/2 items-center gap-1 rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5">
            <input
              type="number"
              value={s.percent}
              onChange={(e) => updateShare(i, { percent: num(e.target.value) })}
              className="w-full bg-transparent text-sm text-paper outline-none"
            />
            <span className="text-xs text-paper/50">%</span>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setShares((prev) => [...prev, { label: `成員 ${prev.length + 1}`, percent: 0 }])}
        className="text-xs font-semibold text-gold-light"
      >
        ＋ 新增一位
      </button>
      {result.percentSum !== 100 && <p className="text-xs text-rose-300">目前比例總和 {result.percentSum}%，建議調整到 100%</p>}
      <div className="mt-4 space-y-1 rounded-xl bg-night-light/25 p-4">
        {result.results.map((r) => (
          <ResultRow key={r.label} label={`${r.label}（${r.percent}%）`} value={fmt(r.amount)} />
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "split",
            toolLabel: "分潤小幫手",
            title: "團隊分潤計算",
            resultLabel: "總金額",
            resultValue: `${fmt(num(total))}（${shares.length} 位成員）`,
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function InvoiceTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [mode, setMode] = useState<"taxIncluded" | "untaxed">("taxIncluded");
  const [amount, setAmount] = useState("3000");
  const [buyerId, setBuyerId] = useState("");
  const result = mode === "taxIncluded" ? calcInvoiceFromTaxIncluded(num(amount)) : calcInvoiceFromUntaxed(num(amount));

  return (
    <div className="space-y-3">
      <div className="flex rounded-xl border border-gold/20 p-1">
        <button
          type="button"
          onClick={() => setMode("taxIncluded")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold ${mode === "taxIncluded" ? "bg-gold text-night-dark" : "text-paper/60"}`}
        >
          已知含稅金額
        </button>
        <button
          type="button"
          onClick={() => setMode("untaxed")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold ${mode === "untaxed" ? "bg-gold text-night-dark" : "text-paper/60"}`}
        >
          已知未稅金額
        </button>
      </div>
      <NumberField label={mode === "taxIncluded" ? "含稅金額" : "未稅金額"} value={amount} onChange={setAmount} suffix="元" />
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-paper/60">買受人統編（選填，三聯式發票用）</span>
        <input
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          placeholder="12345678"
          className="w-full rounded-xl border border-gold/20 bg-night-light/20 px-3 py-2.5 text-sm text-paper outline-none"
        />
      </label>
      <div className="mt-4 rounded-xl bg-night-light/25 p-4">
        <ResultRow label="未稅金額" value={fmt(result.untaxed)} />
        <ResultRow label="營業稅額（5%）" value={fmt(result.tax)} />
        <ResultRow label="含稅總額" value={fmt(result.taxIncluded)} strong />
        {buyerId && <ResultRow label="買受人統編" value={buyerId} />}
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "invoice",
            toolLabel: "發票小幫手",
            title: buyerId ? "開立三聯式發票" : "開立二聯式發票",
            resultLabel: "含稅",
            resultValue: fmt(result.taxIncluded),
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function TaxTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [salesTax, setSalesTax] = useState("15000");
  const [purchaseTax, setPurchaseTax] = useState("2550");
  const result = calcBusinessTax(num(salesTax), num(purchaseTax));

  return (
    <div className="space-y-3">
      <NumberField label="銷項稅額（本期銷貨）" value={salesTax} onChange={setSalesTax} suffix="元" />
      <NumberField label="進項稅額（本期進貨／費用）" value={purchaseTax} onChange={setPurchaseTax} suffix="元" />
      <div className="mt-4 rounded-xl bg-night-light/25 p-4">
        {result.payable > 0 ? (
          <ResultRow label="本期應繳稅額" value={fmt(result.payable)} strong />
        ) : (
          <ResultRow label="本期留抵／可退稅額" value={fmt(result.refundable)} strong />
        )}
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "tax",
            toolLabel: "營業稅小幫手",
            title: "營業稅試算",
            resultLabel: "應繳稅額",
            resultValue: fmt(result.payable || result.refundable),
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function PayrollTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [base, setBase] = useState("32000");
  const [bonus, setBonus] = useState("0");
  const [insurance, setInsurance] = useState("1200");
  const [tax, setTax] = useState("0");
  const result = calcPayroll(num(base), num(bonus), num(insurance), num(tax));

  return (
    <div className="space-y-3">
      <NumberField label="底薪" value={base} onChange={setBase} suffix="元" />
      <NumberField label="加班費／獎金" value={bonus} onChange={setBonus} suffix="元" />
      <NumberField label="勞健保自付額" value={insurance} onChange={setInsurance} suffix="元" />
      <NumberField label="代扣所得稅" value={tax} onChange={setTax} suffix="元" />
      <div className="mt-4 rounded-xl bg-night-light/25 p-4">
        <ResultRow label="應發薪資" value={fmt(result.gross)} />
        <ResultRow label="實領薪資" value={fmt(result.netPay)} strong />
      </div>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "payroll",
            toolLabel: "薪資小幫手",
            title: "薪資試算",
            resultLabel: "實領",
            resultValue: fmt(result.netPay),
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

function LaborInsuranceTool({ onDone }: { onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  const [salary, setSalary] = useState("32000");
  const [dependents, setDependents] = useState("0");
  const result = calcLaborInsurance(num(salary), num(dependents));

  return (
    <div className="space-y-3">
      <NumberField label="投保薪資" value={salary} onChange={setSalary} suffix="元" />
      <NumberField label="健保眷屬人數" value={dependents} onChange={setDependents} suffix="人" />
      <div className="mt-4 space-y-1 rounded-xl bg-night-light/25 p-4">
        <ResultRow label="勞保費（員工負擔）" value={fmt(result.laborEmployee)} />
        <ResultRow label="健保費（員工負擔）" value={fmt(result.healthEmployee)} />
        <ResultRow label="員工自付合計" value={fmt(result.employeeTotal)} strong />
        <div className="my-2 h-px bg-gold/15" />
        <ResultRow label="勞退提撥（雇主 6%）" value={fmt(result.pensionEmployer)} />
        <ResultRow label="公司負擔合計" value={fmt(result.employerTotal)} strong />
      </div>
      <p className="text-[11px] leading-5 text-paper/50">＊簡化參考費率，實際請以勞保局／健保署最新公告費率與級距為準。</p>
      <button
        type="button"
        onClick={() =>
          onDone({
            tool: "laborInsurance",
            toolLabel: "勞健保小幫手",
            title: "勞健保試算",
            resultLabel: "員工自付",
            resultValue: fmt(result.employeeTotal),
          })
        }
        className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-night-dark transition hover:bg-gold-light"
      >
        儲存這筆試算
      </button>
    </div>
  );
}

const COMPANY_STEPS = [
  { title: "公司名稱預查", desc: "到經濟部「公司名稱及所營事業預查系統」查詢並保留特取名稱。" },
  { title: "準備登記文件", desc: "章程、股東名冊、資本額存款證明、負責人身分證明等。" },
  { title: "資本額存入銀行", desc: "開立籌備處帳戶存入資本額；達一定金額需會計師簽證。" },
  { title: "線上一站式申請", desc: "至「公司設立一站式線上申請作業」送件（公司登記＋稅籍登記＋工商憑證）。" },
  { title: "領取核准函與統編", desc: "完成審核後取得公司登記核准函及統一編號。" },
  { title: "刻公司大小章、開戶", desc: "刻製公司大小章，並以核准文件開立公司銀行帳戶。" },
  { title: "請購統一發票", desc: "向國稅局請購統一發票，正式開始營運與開立發票。" },
];

function CompanyGuide() {
  return (
    <div className="space-y-3">
      <p className="text-xs leading-5 text-paper/60">7 個步驟，帶你了解成立公司的大致流程（實際文件與規定請以最新公告為準）。</p>
      <ol className="space-y-3">
        {COMPANY_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold-light">{i + 1}</span>
            <div>
              <p className="text-sm font-semibold text-paper">{s.title}</p>
              <p className="mt-0.5 text-xs leading-5 text-paper/60">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ToolBody({ id, onDone }: { id: AccountingToolId; onDone: (r: Omit<AccountingRecord, "id" | "date">) => void }) {
  if (id === "profit") return <ProfitTool onDone={onDone} />;
  if (id === "cost") return <CostTool onDone={onDone} />;
  if (id === "split") return <SplitTool onDone={onDone} />;
  if (id === "invoice") return <InvoiceTool onDone={onDone} />;
  if (id === "tax") return <TaxTool onDone={onDone} />;
  if (id === "payroll") return <PayrollTool onDone={onDone} />;
  if (id === "laborInsurance") return <LaborInsuranceTool onDone={onDone} />;
  return <CompanyGuide />;
}

export default function AccountingHelper() {
  const [view, setView] = useState<"home" | "howto">("home");
  const [openTool, setOpenTool] = useState<AccountingToolId | null>(null);
  const [history, setHistory] = useState<AccountingRecord[]>([]);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState<{ text: string; suggested: AccountingToolId | ""; resource: string } | null>(null);
  const [askError, setAskError] = useState("");

  useEffect(() => {
    queueMicrotask(() => setHistory(loadAccountingHistory()));
  }, []);

  function handleDone(record: Omit<AccountingRecord, "id" | "date">) {
    setHistory(saveAccountingRecord(record));
    setOpenTool(null);
  }

  async function handleAsk(q?: string) {
    const text = (q ?? question).trim();
    if (!text) return;
    setAsking(true);
    setAskError("");
    setAnswer(null);
    try {
      const result = await askAccountingAi(text);
      setAnswer({ text: result.answer, suggested: result.suggestedTool, resource: result.suggestedResource });
    } catch (e) {
      setAskError(e instanceof Error ? e.message : "小幫手暫時無法回答，請稍後再試");
    } finally {
      setAsking(false);
    }
  }

  const openToolMeta = openTool ? ACCOUNTING_TOOLS.find((t) => t.id === openTool) : null;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night-dark pb-8 pt-20">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_130px] items-center gap-4 rounded-[2rem] bg-night-light/15 px-6 py-7">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Star className="h-3 w-3 text-gold-light" />
                <p className="text-xs font-semibold tracking-[0.35em] text-gold-light">ACCOUNTING</p>
              </div>
              <h1 className="font-serif text-2xl font-bold text-paper">會計小幫手</h1>
              <p className="mt-3 text-sm leading-6 text-paper/70">簡單．快速．專業．安心 ❤️</p>
            </div>
            <div className="animate-float-slow relative h-40 w-full">
              <Image src={asset("/images/pricing-guide-cutout.webp")} alt="小艾拿著清單，準備幫你試算" fill className="object-contain" sizes="130px" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night-dark px-4 pb-20 pt-4 sm:px-6">
        <div className="bg-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex gap-2 rounded-full border border-gold/15 bg-night-light/10 p-1">
            <button
              type="button"
              onClick={() => setView("home")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${view === "home" ? "bg-gold text-night-dark" : "text-paper/60"}`}
            >
              首頁
            </button>
            <button
              type="button"
              onClick={() => setView("howto")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${view === "howto" ? "bg-gold text-night-dark" : "text-paper/60"}`}
            >
              使用說明
            </button>
          </div>

          {view === "home" ? (
            <>
              {/* AI hero */}
              <section className="mt-5 rounded-[1.75rem] border border-gold/15 bg-night-light/15 p-5 shadow-card">
                <p className="font-serif text-lg font-bold text-paper">嗨！我是艾飛樂</p>
                <p className="mt-1 text-xs text-paper/60">有任何會計問題，都可以問我喔！</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAsk();
                  }}
                  className="mt-3 flex items-center gap-2 rounded-2xl border border-gold/20 bg-night-light/20 px-4 py-3"
                >
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="例如：我要算利潤、如何開發票、營業稅怎麼算？"
                    className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-paper/40"
                  />
                  <button
                    type="submit"
                    disabled={asking}
                    aria-label="送出問題"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-night-dark disabled:opacity-50"
                  >
                    {asking ? "…" : "➤"}
                  </button>
                </form>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setQuestion(p);
                        handleAsk(p);
                      }}
                      className="rounded-full border border-gold/20 px-3 py-1.5 text-xs text-paper/60 transition hover:border-gold/50 hover:text-gold-light"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {asking && <p className="mt-4 text-xs text-paper/60">艾飛樂正在想...</p>}
                {askError && <p className="mt-4 text-xs text-rose-300">{askError}</p>}
                {answer && (
                  <div className="mt-4 rounded-2xl border border-gold/15 bg-night-light/20 p-4">
                    <p className="text-sm leading-6 text-paper/90">{answer.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {answer.suggested && (
                        <button
                          type="button"
                          onClick={() => setOpenTool(answer.suggested as AccountingToolId)}
                          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-night-dark transition hover:bg-gold-light"
                        >
                          打開 {ACCOUNTING_TOOLS.find((t) => t.id === answer.suggested)?.label} →
                        </button>
                      )}
                      {answer.resource && (
                        <a
                          href={ACCOUNTING_RESOURCES.find((r) => r.name === answer.resource)?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-gold-light transition hover:border-gold/60"
                        >
                          前往 {answer.resource} →
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Tool grid */}
              <section className="mt-6">
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-light">★ 常用小幫手．點擊下方功能，讓艾飛樂幫你快速計算與解答</p>
                <div className="grid grid-cols-2 gap-3">
                  {ACCOUNTING_TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setOpenTool(tool.id)}
                      className="flex flex-col items-start gap-2 rounded-2xl border border-gold/15 bg-night-light/15 p-4 text-left shadow-card transition hover:border-gold/40"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-lg text-night-dark">{tool.icon}</span>
                      <span className="text-sm font-bold text-paper">{tool.label}</span>
                      <span className="text-[11px] leading-4 text-paper/60">{tool.desc}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Official resources */}
              <section className="mt-6">
                <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-light">🏛 官方資源．勞資與稅務問題可直接查詢</p>
                <div className="space-y-2">
                  {ACCOUNTING_RESOURCES.map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-gold/15 bg-night-light/15 px-4 py-3 shadow-card transition hover:border-gold/40"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-paper">{r.name}</span>
                        <span className="mt-0.5 block text-[11px] text-paper/50">{r.note}</span>
                      </span>
                      <span className="shrink-0 text-gold-light">→</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* Recent records */}
              {history.length > 0 && (
                <section className="mt-6">
                  <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gold-light">🕐 最近的試算紀錄</p>
                  <div className="space-y-2">
                    {history.map((r) => (
                      <div key={r.id} className="rounded-xl border border-gold/15 bg-night-light/15 p-3.5 shadow-card">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-gold-light">{r.toolLabel}</span>
                          <span className="text-[11px] text-paper/40">{r.date}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-paper">{r.title}</p>
                        <p className="mt-0.5 text-xs text-paper/60">
                          {r.resultLabel} <span className="font-mono font-semibold text-paper">{r.resultValue}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="mt-5 space-y-4">
              <div className="rounded-[1.75rem] border border-gold/15 bg-night-light/15 p-5 text-center shadow-card">
                <p className="font-serif text-xl font-bold text-paper">使用說明</p>
                <p className="mt-1 text-xs text-paper/60">四個步驟，輕鬆完成各項會計試算</p>
              </div>
              {[
                { n: 1, title: "選擇想使用的小幫手", desc: "點選常用小幫手裡的任一功能卡片，開始試算。" },
                { n: 2, title: "輸入資料", desc: "依畫面提示輸入售價、成本、金額等資訊即可，不用一次填齊所有欄位。" },
                { n: 3, title: "自動計算", desc: "系統會即時算出利潤、成本率、稅額、分潤金額等結果。" },
                { n: 4, title: "查看並儲存結果", desc: "確認試算結果，按下「儲存這筆試算」就會出現在首頁的最近紀錄裡。" },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-gold/15 bg-night-light/15 p-5 shadow-card">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold-light">{s.n}</span>
                    <p className="text-sm font-bold text-paper">{s.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-paper/60">{s.desc}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-gold/15 bg-night-light/10 p-4 text-xs leading-6 text-paper/60">
                💡 所有試算皆為參考結果，實際金額請以帳務資料為準；遇到特殊會計或稅務問題，建議再與專業會計師確認。
              </div>
            </section>
          )}
        </div>
      </section>

      {openTool && openToolMeta && (
        <Modal title={openToolMeta.label} onClose={() => setOpenTool(null)}>
          <ToolBody id={openTool} onDone={handleDone} />
        </Modal>
      )}
    </div>
  );
}
