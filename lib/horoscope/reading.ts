import { ZodiacSign } from "./signs";

export type FortuneCategory = "love" | "career" | "wealth" | "health";

const CATEGORY_LABEL: Record<FortuneCategory, string> = {
  love: "愛情",
  career: "事業",
  wealth: "財運",
  health: "健康",
};

const CATEGORY_LINES: Record<FortuneCategory, string[]> = {
  love: [
    "單身的人有機會在日常小事中對某人心動，有伴的人適合多說一句體貼的話。",
    "感情裡的小摩擦其實是靠近彼此的機會，主動一點會有意外的溫柔回應。",
    "今天的你格外有魅力，不妨對在意的人展現真實的自己。",
    "與其猜測對方的心意，不如直接開口，答案往往比想像中簡單。",
    "重心先放回自己身上，把自己照顧好，愛情自然會找上門。",
  ],
  career: [
    "手上的專案有機會迎來新進展，堅持原本的方向就對了。",
    "適合主動請教前輩或夥伴，一句話可能就能解開卡關已久的問題。",
    "細節決定成敗，今天特別適合把之前草率完成的部分重新檢查一次。",
    "有新的合作或提案機會出現，勇敢表達自己的想法。",
    "工作步調可能有點緊湊，先排出優先順序,一步一步來就不會亂。",
  ],
  wealth: [
    "正財運穩定，投資理財適合保守觀望，不宜衝動出手。",
    "有一筆意外的小收入或優惠正在路上，留意生活周遭的訊息。",
    "花錢前先想一下是需要還是想要,能省下一筆不小的開銷。",
    "適合整理一下荷包與帳目，會發現比想像中寬裕。",
    "與朋友聚會或人情往來的花費會增加，記得抓好預算。",
  ],
  health: [
    "作息容易日夜顛倒，提醒自己早點放下手機休息。",
    "腸胃或喉嚨是這幾天要留意的部位，飲食盡量清淡一點。",
    "適合安排一次舒展身體的運動，久坐的痠痛會明顯改善。",
    "情緒起伏比較大，找個信任的人聊聊會輕鬆許多。",
    "整體精神狀態不錯，是充電、恢復體力的好時機。",
  ],
};

const OVERALL_OPENERS = [
  "今天的你,整體運勢是這樣的——",
  "從星象來看,今天特別適合放慢腳步感受這些提醒——",
  "今天的能量偏向內省與整理,以下是給你的提醒——",
  "宇宙今天想跟你說的是——",
];

const LUCKY_COLORS = ["珊瑚粉", "薄荷綠", "鵝黃色", "靛藍色", "米白色", "焦糖棕", "薰衣草紫", "湖水藍", "玫瑰金", "霧霾藍"];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export type FortuneReport = {
  dateKey: string;
  overallScore: number;
  overallOpener: string;
  categories: { key: FortuneCategory; label: string; score: number; text: string }[];
  luckyColor: string;
  luckyNumber: number;
};

const CATEGORY_ORDER: FortuneCategory[] = ["love", "career", "wealth", "health"];

export function generateFortune(sign: ZodiacSign, dateKey: string = todayKey()): FortuneReport {
  const baseSeed = hashString(`${sign.id}-${dateKey}`);

  const categories = CATEGORY_ORDER.map((key, i) => {
    const seed = baseSeed + i * 17;
    const score = 3 + (seed % 3); // 3~5 stars, keeps tone gentle and encouraging
    return { key, label: CATEGORY_LABEL[key], score, text: pick(CATEGORY_LINES[key], seed) };
  });

  const overallScore = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);

  return {
    dateKey,
    overallScore,
    overallOpener: pick(OVERALL_OPENERS, baseSeed),
    categories,
    luckyColor: pick(LUCKY_COLORS, baseSeed + 3),
    luckyNumber: (baseSeed % 9) + 1,
  };
}
