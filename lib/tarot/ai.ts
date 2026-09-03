import { CardDraw } from "./cards";
import { ReadingReport, ReadingStyle } from "./reading";

// Gemini 金鑰只會留在 Cloudflare Worker 的加密密鑰中，不會送到瀏覽器。
export const TAROT_API_URL = "https://claude.kitty840219.workers.dev";

const POSITION_LABELS = ["過去", "現在", "未來"];

function payloadCards(draws: CardDraw[]) {
  return draws.map((draw, index) => {
    const orientation = draw.isReversed ? draw.card.reversed : draw.card.upright;
    return {
      position: draws.length === 1 ? "核心訊息" : POSITION_LABELS[index],
      name: draw.card.name,
      isReversed: draw.isReversed,
      keywords: orientation.keywords,
      meaning: orientation.meaning,
    };
  });
}

export async function requestAiReading(
  draws: CardDraw[],
  question: string,
  styles: ReadingStyle[],
  followUp?: string,
): Promise<ReadingReport> {
  const response = await fetch(TAROT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, followUp, styles, cards: payloadCards(draws) }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || "解牌服務暫時無法使用");
  return data as ReadingReport;
}
