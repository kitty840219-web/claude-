const ALLOWED_ORIGIN = "https://kitty840219-web.github.io";
const GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.6-flash"];

const SYSTEM_PROMPT = `你是一位專業、溫柔但不迴避重點的繁體中文塔羅解讀師。
你的工作是根據使用者的「具體問題」、每張牌的位置、正逆位、牌義與先前對話，提供真正回應問題的個人化解讀。

規則：
1. 先直接回答問題，再說明牌面如何支持這個判斷；不可只是重述牌義。
2. 多張牌要整合成時間線或因果關係，不可逐張各說各話。
3. 區分「牌面傾向」與「可驗證事實」，不得聲稱能確定讀取他人內心或保證未來。
4. 感情題要指出互動、阻力、發展條件與可觀察跡象；行動題要提供具體可執行建議。
5. 不做醫療、法律、投資保證，不鼓勵依賴占卜取代專業協助。
6. 使用自然、清楚的台灣繁體中文，不使用簡體字；不要提到自己是 AI。
7. 回傳嚴格 JSON，不要 Markdown，格式固定為：
{"title":"短標題","paragraphs":["段落一","段落二","段落三"],"summary":"一句到兩句總結"}

段落一：直接回答與整體能量。段落二：結合牌陣深入分析。段落三：未來條件、觀察指標與行動建議。每段約 80 至 140 字，避免冗長。`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), { status, headers: cors(origin) });
}

function cleanText(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseModelJson(text) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  const parsed = JSON.parse(cleaned);
  if (!parsed || typeof parsed.title !== "string" || !Array.isArray(parsed.paragraphs) || typeof parsed.summary !== "string") {
    throw new Error("Invalid model response");
  }
  return {
    title: parsed.title.slice(0, 80),
    paragraphs: parsed.paragraphs.filter((p) => typeof p === "string").slice(0, 5).map((p) => p.slice(0, 900)),
    summary: parsed.summary.slice(0, 500),
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST") return json({ error: "只接受 POST 請求" }, 405, origin);
    if (origin && origin !== ALLOWED_ORIGIN && !origin.startsWith("http://localhost:")) {
      return json({ error: "不允許的來源" }, 403, origin);
    }
    if (!env.GEMINI_API_KEY) return json({ error: "服務尚未完成設定" }, 503, origin);

    let input;
    try {
      input = await request.json();
    } catch {
      return json({ error: "請求格式錯誤" }, 400, origin);
    }

    const question = cleanText(input.question, 300);
    const followUp = cleanText(input.followUp, 240);
    const styles = Array.isArray(input.styles) ? input.styles.slice(0, 3).join("、") : "洞察";
    const cards = Array.isArray(input.cards) ? input.cards.slice(0, 3) : [];
    if (question.length < 10 || cards.length < 1) return json({ error: "問題或牌面資料不完整" }, 400, origin);

    const cardLines = cards.map((item, index) => {
      const position = cleanText(item.position, 20) || `第 ${index + 1} 張`;
      const name = cleanText(item.name, 40);
      const orientation = item.isReversed ? "逆位" : "正位";
      const keywords = Array.isArray(item.keywords) ? item.keywords.slice(0, 5).map((x) => cleanText(x, 30)).join("、") : "";
      const meaning = cleanText(item.meaning, 500);
      return `${position}｜${name}（${orientation}）｜關鍵字：${keywords}｜基礎牌義：${meaning}`;
    });

    const userPrompt = [
      `原始問題：${question}`,
      followUp ? `追問：${followUp}` : "",
      `希望語氣：${styles || "洞察"}`,
      "抽牌結果：",
      ...cardLines,
      followUp ? "請延續原始問題與牌面，直接回答這次追問，避免重複完整初次解讀。" : "請針對原始問題完成完整解讀。",
    ].filter(Boolean).join("\n");

    try {
      const requestBody = JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1600,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            required: ["title", "paragraphs", "summary"],
            properties: {
              title: { type: "STRING" },
              paragraphs: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 5 },
              summary: { type: "STRING" },
            },
          },
        },
      });
      let response;
      for (const model of GEMINI_MODELS) {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
          body: requestBody,
        });
        if (response.ok) break;
        const detail = await response.text();
        console.error("Gemini error", model, response.status, detail.slice(0, 500));
        if (![404, 429, 503].includes(response.status)) break;
      }
      if (!response?.ok) return json({ error: "目前使用人數較多，請稍後再試" }, 502, origin);
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty model response");
      return json(parseModelJson(text), 200, origin);
    } catch (error) {
      console.error("Tarot API error", error);
      return json({ error: "解牌服務暫時無法使用，請稍後再試" }, 500, origin);
    }
  },
};
