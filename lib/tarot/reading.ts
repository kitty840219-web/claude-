import { CardDraw, TarotCard } from "./cards";

export type ReadingStyle = "roast" | "intuitive" | "insight";

const STYLE_OPENERS: Record<ReadingStyle, string[]> = {
  roast: [
    "先講重話：你早就知道答案了，只是不想承認。",
    "別再問自己「為什麼會這樣」了，牌面說得很直接——",
    "好，長話短說，不留情面地講——",
  ],
  intuitive: [
    "深呼吸，把手放在胸口，感受一下這張牌帶來的感覺——",
    "先別急著用腦袋分析，讓直覺帶你先看見這個畫面——",
    "閉上眼睛想像這張牌的畫面，你的身體其實已經有答案——",
  ],
  insight: [
    "從結構上拆解這個提問，牌陣指向的核心是——",
    "把時間軸拉遠一點看，這張牌其實在標記一個轉折點——",
    "從你提供的脈絡來看，這張牌對應到的具體情境是——",
  ],
};

const STYLE_CLOSERS: Record<ReadingStyle, string[]> = {
  roast: ["別再拖了，去做就對了。", "醒醒，牌不會騙你，但你一直在騙自己。", "接下來怎麼做，你心裡有數了吧。"],
  intuitive: ["相信這份感覺，它比任何邏輯都誠實。", "答案已經在你心裡，牌只是幫你確認而已。", "順著這股直覺走，不用急著解釋給誰聽。"],
  insight: ["建議把這個結論放進你近期的規劃裡驗證看看。", "接下來幾週留意是否出現對應的訊號。", "可以把這張牌當作這段時間的觀察指標。"],
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function generateReading(
  card: TarotCard,
  isReversed: boolean,
  question: string,
  styles: ReadingStyle[]
): string {
  const orientation = isReversed ? card.reversed : card.upright;
  const seed = hashString(`${card.id}-${isReversed}-${question}`);

  const activeStyles = styles.length > 0 ? styles : (["insight"] as ReadingStyle[]);
  const opener = pick(STYLE_OPENERS[activeStyles[0]], seed);
  const closer = pick(STYLE_CLOSERS[activeStyles[activeStyles.length - 1]], seed + 7);

  const questionLine = question.trim()
    ? `關於你問的「${question.trim()}」，`
    : "";

  const keywordLine = `這次抽到的是${isReversed ? "逆位的" : ""}「${card.name}」，關鍵字是${orientation.keywords
    .map((k) => `#${k}`)
    .join(" ")}。`;

  return [opener, keywordLine, `${questionLine}${orientation.meaning}`, closer].join("\n\n");
}

const POSITIONS = ["過去", "現在", "未來"] as const;

export function generateThreeCardReading(
  draws: [CardDraw, CardDraw, CardDraw],
  question: string,
  styles: ReadingStyle[]
): { title: string; paragraphs: string[] } {
  const seed = hashString(`${draws.map((d) => `${d.card.id}-${d.isReversed}`).join("|")}-${question}`);
  const activeStyles = styles.length > 0 ? styles : (["insight"] as ReadingStyle[]);
  const opener = pick(STYLE_OPENERS[activeStyles[0]], seed);
  const closer = pick(STYLE_CLOSERS[activeStyles[activeStyles.length - 1]], seed + 11);

  const past = draws[0].isReversed ? draws[0].card.reversed : draws[0].card.upright;
  const future = draws[2].isReversed ? draws[2].card.reversed : draws[2].card.upright;
  const title = `關於${past.keywords[0]}與${future.keywords[0]}的觀照`;

  const questionLine = question.trim() ? `關於你問的「${question.trim()}」，` : "";

  const paragraphs = draws.map((draw, i) => {
    const orientation = draw.isReversed ? draw.card.reversed : draw.card.upright;
    const label = POSITIONS[i];
    const keywordLine = `${label}對應到${draw.isReversed ? "逆位的" : ""}「${draw.card.name}」，關鍵字是${orientation.keywords
      .map((k) => `#${k}`)
      .join(" ")}。`;
    const lead = i === 0 ? opener + "\n\n" : "";
    const middle = i === 1 ? questionLine : "";
    return `${lead}${keywordLine}${middle}${orientation.meaning}`;
  });

  paragraphs.push(closer);

  return { title, paragraphs };
}
