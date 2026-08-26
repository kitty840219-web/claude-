export type Plan = {
  id: string;
  region: string;
  countries: string[];
  name: string;
  dataAmountGB: number;
  validityDays: number;
  priceUSD: number;
  network: string;
  fiveG: boolean;
};

export const REGIONS = [
  "全部",
  "亞洲",
  "歐洲",
  "北美洲",
  "大洋洲",
  "全球",
] as const;

export const PLANS: Plan[] = [
  {
    id: "jp-3gb-7d",
    region: "亞洲",
    countries: ["日本"],
    name: "日本輕量方案",
    dataAmountGB: 3,
    validityDays: 7,
    priceUSD: 8,
    network: "NTT Docomo / SoftBank",
    fiveG: true,
  },
  {
    id: "jp-10gb-15d",
    region: "亞洲",
    countries: ["日本"],
    name: "日本暢遊方案",
    dataAmountGB: 10,
    validityDays: 15,
    priceUSD: 18,
    network: "NTT Docomo / SoftBank",
    fiveG: true,
  },
  {
    id: "kr-5gb-10d",
    region: "亞洲",
    countries: ["韓國"],
    name: "韓國標準方案",
    dataAmountGB: 5,
    validityDays: 10,
    priceUSD: 12,
    network: "KT / SKT",
    fiveG: true,
  },
  {
    id: "tw-unlimited-30d",
    region: "亞洲",
    countries: ["台灣"],
    name: "台灣吃到飽方案",
    dataAmountGB: 999,
    validityDays: 30,
    priceUSD: 25,
    network: "中華電信 / 台灣大哥大",
    fiveG: true,
  },
  {
    id: "eu-multi-10gb-15d",
    region: "歐洲",
    countries: ["法國", "德國", "義大利", "西班牙", "荷蘭"],
    name: "歐洲多國通用方案",
    dataAmountGB: 10,
    validityDays: 15,
    priceUSD: 22,
    network: "Orange / Vodafone / Telefónica",
    fiveG: false,
  },
  {
    id: "uk-5gb-10d",
    region: "歐洲",
    countries: ["英國"],
    name: "英國標準方案",
    dataAmountGB: 5,
    validityDays: 10,
    priceUSD: 14,
    network: "EE / Three UK",
    fiveG: true,
  },
  {
    id: "us-10gb-15d",
    region: "北美洲",
    countries: ["美國"],
    name: "美國暢遊方案",
    dataAmountGB: 10,
    validityDays: 15,
    priceUSD: 20,
    network: "AT&T / T-Mobile",
    fiveG: true,
  },
  {
    id: "ca-5gb-10d",
    region: "北美洲",
    countries: ["加拿大"],
    name: "加拿大標準方案",
    dataAmountGB: 5,
    validityDays: 10,
    priceUSD: 16,
    network: "Rogers / Bell",
    fiveG: false,
  },
  {
    id: "au-5gb-10d",
    region: "大洋洲",
    countries: ["澳洲"],
    name: "澳洲標準方案",
    dataAmountGB: 5,
    validityDays: 10,
    priceUSD: 15,
    network: "Telstra / Optus",
    fiveG: true,
  },
  {
    id: "global-3gb-15d",
    region: "全球",
    countries: ["涵蓋 130+ 個國家與地區"],
    name: "全球旅遊方案",
    dataAmountGB: 3,
    validityDays: 15,
    priceUSD: 30,
    network: "多家合作電信商",
    fiveG: false,
  },
  {
    id: "global-10gb-30d",
    region: "全球",
    countries: ["涵蓋 130+ 個國家與地區"],
    name: "全球商務方案",
    dataAmountGB: 10,
    validityDays: 30,
    priceUSD: 55,
    network: "多家合作電信商",
    fiveG: true,
  },
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function formatData(gb: number): string {
  return gb >= 999 ? "吃到飽" : `${gb} GB`;
}
