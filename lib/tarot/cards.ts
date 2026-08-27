export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Court = "page" | "knight" | "queen" | "king";

export type TarotCard = {
  id: number;
  numeral: string;
  name: string;
  nameEn: string;
  symbol: string;
  upright: { keywords: string[]; meaning: string };
  reversed: { keywords: string[]; meaning: string };
  /** Present only on the 56 minor arcana cards; major arcana cards omit these. */
  suit?: Suit;
  rank?: number; // 1-10 for pip cards
  court?: Court; // set instead of `rank` for court cards
};

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    numeral: "0",
    name: "愚者",
    nameEn: "The Fool",
    symbol: "🌞",
    upright: { keywords: ["新開始", "冒險", "天真"], meaning: "你正站在一段全新旅程的起點，願意帶著信任往前跨出這一步。" },
    reversed: { keywords: ["魯莽", "猶豫", "脫序"], meaning: "衝動或猶豫不決正拖住你，先想清楚再出發也不遲。" },
  },
  {
    id: 1,
    numeral: "I",
    name: "魔術師",
    nameEn: "The Magician",
    symbol: "✨",
    upright: { keywords: ["行動力", "創造", "資源"], meaning: "你手上握有需要的一切，是時候把想法化為實際行動。" },
    reversed: { keywords: ["空談", "操弄", "分心"], meaning: "計畫多過行動，注意力被分散，別讓才能只停在紙上。" },
  },
  {
    id: 2,
    numeral: "II",
    name: "女祭司",
    nameEn: "The High Priestess",
    symbol: "🌙",
    upright: { keywords: ["直覺", "潛意識", "靜觀"], meaning: "答案不在外面而在你心裡，靜下來聆聽自己的直覺。" },
    reversed: { keywords: ["壓抑", "失衡", "誤判"], meaning: "你可能忽略了內在的聲音，或被表面訊息誤導了判斷。" },
  },
  {
    id: 3,
    numeral: "III",
    name: "皇后",
    nameEn: "The Empress",
    symbol: "🌿",
    upright: { keywords: ["豐盛", "滋養", "創造力"], meaning: "生活與情感正在豐收，允許自己享受被滋養的狀態。" },
    reversed: { keywords: ["匱乏", "過度付出", "停滯"], meaning: "你可能給得太多、留給自己太少，該回頭照顧自己了。" },
  },
  {
    id: 4,
    numeral: "IV",
    name: "皇帝",
    nameEn: "The Emperor",
    symbol: "🏔️",
    upright: { keywords: ["秩序", "掌控", "穩定"], meaning: "建立規則與界線能幫你掌握局面，穩定是現在的關鍵字。" },
    reversed: { keywords: ["固執", "專制", "失控"], meaning: "過度掌控或僵化的態度，反而讓事情失去彈性。" },
  },
  {
    id: 5,
    numeral: "V",
    name: "教皇",
    nameEn: "The Hierophant",
    symbol: "📜",
    upright: { keywords: ["傳統", "指引", "認同"], meaning: "尋求前輩或體制內的建議，會讓這件事更有方向。" },
    reversed: { keywords: ["叛逆", "教條", "不合群"], meaning: "既有框架已經不適合你，是時候走一條自己的路。" },
  },
  {
    id: 6,
    numeral: "VI",
    name: "戀人",
    nameEn: "The Lovers",
    symbol: "💞",
    upright: { keywords: ["連結", "選擇", "契合"], meaning: "一段關係或一個選擇正考驗著你內心真正的價值排序。" },
    reversed: { keywords: ["失衡", "分歧", "猶豫"], meaning: "價值觀出現落差，或是你正在迴避一個必須做的決定。" },
  },
  {
    id: 7,
    numeral: "VII",
    name: "戰車",
    nameEn: "The Chariot",
    symbol: "🐎",
    upright: { keywords: ["意志", "推進", "掌控方向"], meaning: "憑意志力和專注，你能把看似衝突的力量收攏成前進的動力。" },
    reversed: { keywords: ["失控", "分心", "停滯"], meaning: "方向感亂了，內部拉扯讓你原地打轉，先重新校準目標。" },
  },
  {
    id: 8,
    numeral: "VIII",
    name: "力量",
    nameEn: "Strength",
    symbol: "🦁",
    upright: { keywords: ["溫柔的力量", "勇氣", "自我克制"], meaning: "真正的力量來自溫柔而堅定，你比自己以為的更有韌性。" },
    reversed: { keywords: ["自我懷疑", "壓抑", "耗竭"], meaning: "自信正在流失，或是你用蠻力硬撐，該換一種方式對待自己。" },
  },
  {
    id: 9,
    numeral: "IX",
    name: "隱士",
    nameEn: "The Hermit",
    symbol: "🕯️",
    upright: { keywords: ["內省", "獨處", "尋找答案"], meaning: "答案需要向內尋找，暫時遠離喧囂會讓思緒更清晰。" },
    reversed: { keywords: ["孤立", "逃避", "封閉"], meaning: "獨處變成了逃避，別讓自己與外界斷得太徹底。" },
  },
  {
    id: 10,
    numeral: "X",
    name: "命運之輪",
    nameEn: "Wheel of Fortune",
    symbol: "🎡",
    upright: { keywords: ["轉折", "機運", "循環"], meaning: "局勢正在轉動，一個意外的機會可能就此翻轉現況。" },
    reversed: { keywords: ["停滯", "抗拒改變", "逆風"], meaning: "改變還沒到位，或是你正抗拒一個其實該順勢而為的轉折。" },
  },
  {
    id: 11,
    numeral: "XI",
    name: "正義",
    nameEn: "Justice",
    symbol: "⚖️",
    upright: { keywords: ["公平", "因果", "決斷"], meaning: "誠實面對事實，做出對得起自己的決定，結果會回饋於你。" },
    reversed: { keywords: ["偏頗", "逃避責任", "失衡"], meaning: "有些帳還沒算清，或是你在自欺，該為自己的選擇負責了。" },
  },
  {
    id: 12,
    numeral: "XII",
    name: "吊人",
    nameEn: "The Hanged Man",
    symbol: "🌀",
    upright: { keywords: ["換位思考", "暫停", "犧牲"], meaning: "暫時停下來、換個角度看事情，會看見原本忽略的真相。" },
    reversed: { keywords: ["無謂犧牲", "拖延", "抗拒"], meaning: "你可能困在原地太久，該問問自己這份等待值不值得。" },
  },
  {
    id: 13,
    numeral: "XIII",
    name: "死神",
    nameEn: "Death",
    symbol: "🦋",
    upright: { keywords: ["結束", "蛻變", "放下"], meaning: "一個階段正在結束，放手才能讓新的可能長出來。" },
    reversed: { keywords: ["抗拒改變", "拖延", "卡關"], meaning: "你緊抓著已經不合適的東西不放，改變被硬生生拖延了。" },
  },
  {
    id: 14,
    numeral: "XIV",
    name: "節制",
    nameEn: "Temperance",
    symbol: "🌊",
    upright: { keywords: ["平衡", "耐心", "調和"], meaning: "慢慢調配、不急著求快，事情會在恰到好處的節奏中成形。" },
    reversed: { keywords: ["失衡", "過猶不及", "急躁"], meaning: "你正把自己或局勢推向極端，需要重新找回中庸之道。" },
  },
  {
    id: 15,
    numeral: "XV",
    name: "惡魔",
    nameEn: "The Devil",
    symbol: "⛓️",
    upright: { keywords: ["束縛", "慾望", "執念"], meaning: "留意讓你上癮或困住你的關係與習慣，鎖鏈其實是自己選的。" },
    reversed: { keywords: ["掙脫", "覺察", "解放"], meaning: "你開始看清束縛自己的到底是什麼，鬆綁的時刻正在靠近。" },
  },
  {
    id: 16,
    numeral: "XVI",
    name: "高塔",
    nameEn: "The Tower",
    symbol: "⚡",
    upright: { keywords: ["劇變", "崩解", "覺醒"], meaning: "一個突如其來的變化會打破舊有結構，但也讓真相浮現。" },
    reversed: { keywords: ["延遲的崩塌", "抗拒", "餘震"], meaning: "該面對的震盪被一再延後，越晚面對衝擊可能越大。" },
  },
  {
    id: 17,
    numeral: "XVII",
    name: "星星",
    nameEn: "The Star",
    symbol: "⭐",
    upright: { keywords: ["希望", "療癒", "信念"], meaning: "風暴過後，希望正在回來，繼續相信你所走的方向。" },
    reversed: { keywords: ["失望", "信心低落", "迷失方向"], meaning: "你暫時看不見光，但這不代表光不存在，先照顧好自己。" },
  },
  {
    id: 18,
    numeral: "XVIII",
    name: "月亮",
    nameEn: "The Moon",
    symbol: "🌕",
    upright: { keywords: ["未知", "潛意識", "不安"], meaning: "眼前訊息不完整，情緒和直覺會比邏輯更早察覺到真相。" },
    reversed: { keywords: ["撥雲見日", "釋懷", "看清"], meaning: "混亂逐漸散去，原本模糊的事情開始有了清楚的輪廓。" },
  },
  {
    id: 19,
    numeral: "XIX",
    name: "太陽",
    nameEn: "The Sun",
    symbol: "☀️",
    upright: { keywords: ["喜悅", "成功", "活力"], meaning: "事情正朝明亮的方向發展，允許自己單純地感到開心。" },
    reversed: { keywords: ["延遲的喜悅", "過度樂觀", "低潮"], meaning: "好消息可能慢了一點到來，或是你把期待想得太理想化。" },
  },
  {
    id: 20,
    numeral: "XX",
    name: "審判",
    nameEn: "Judgement",
    symbol: "📯",
    upright: { keywords: ["覺醒", "總結", "呼喚"], meaning: "過去的經驗正被重新召喚，是時候做一次誠實的總結。" },
    reversed: { keywords: ["自我懷疑", "逃避覺察", "卡在過去"], meaning: "你還沒準備好面對某個真相，或仍困在過去的評價裡。" },
  },
  {
    id: 21,
    numeral: "XXI",
    name: "世界",
    nameEn: "The World",
    symbol: "🌍",
    upright: { keywords: ["完成", "圓滿", "整合"], meaning: "一個循環即將圓滿完成，你所付出的正在收成。" },
    reversed: { keywords: ["未竟之事", "延宕", "缺一步"], meaning: "還差最後一步就能收尾，別在終點前提早放手。" },
  },
];

const CHINESE_DIGITS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const RANK_NAMES_EN = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const SUITS: { id: Suit; name: string; nameEn: string; symbol: string; domain: string; keyword: string; verbUpright: string; verbReversed: string }[] = [
  { id: "wands", name: "權杖", nameEn: "Wands", symbol: "🔥", domain: "事業、熱情與行動力", keyword: "行動力", verbUpright: "正被點燃，推動著你往前", verbReversed: "被澆熄，或找不到施力的方向" },
  { id: "cups", name: "聖杯", nameEn: "Cups", symbol: "💧", domain: "情感、關係與內心世界", keyword: "情感", verbUpright: "正流動著，滋養你與他人的連結", verbReversed: "淤積著，情緒需要被好好安放" },
  { id: "swords", name: "寶劍", nameEn: "Swords", symbol: "🗡️", domain: "思緒、溝通與決斷", verbUpright: "正變得銳利而清晰", verbReversed: "陷入混亂，或被過度的批判纏住", keyword: "決斷" },
  { id: "pentacles", name: "錢幣", nameEn: "Pentacles", symbol: "🪙", domain: "金錢、工作與物質基礎", keyword: "務實", verbUpright: "正被你踏實地一點一滴累積", verbReversed: "出現漏洞，或被你抓得太緊" },
];

const RANK_THEMES: { keywords: string[]; upright: string; reversed: string }[] = [
  { keywords: ["起始", "潛力", "種子"], upright: "全新的開始與純粹的潛力正在萌芽", reversed: "開始被延遲了，或一個機會正被錯過" },
  { keywords: ["抉擇", "夥伴", "平衡"], upright: "你正站在兩個選項之間，尋求平衡", reversed: "猶豫不決，或關係中的天秤正在傾斜" },
  { keywords: ["合作", "成長", "初成"], upright: "初步的成果正因合作而浮現", reversed: "計畫延誤，或團隊之間出現摩擦" },
  { keywords: ["穩定", "休整", "基礎"], upright: "是時候停下來鞏固已有的基礎", reversed: "停滯不前，或安於現狀太久了" },
  { keywords: ["衝突", "競爭", "失落"], upright: "一場挑戰或競爭正在考驗你", reversed: "衝突正在降溫，你也在從挫折中恢復" },
  { keywords: ["和諧", "分享", "過渡"], upright: "給予與分享讓事情逐漸和諧", reversed: "付出失了衡，或你太留戀過去" },
  { keywords: ["反思", "耐心", "策略"], upright: "先別急，這是評估與布局的時刻", reversed: "猶豫或誤判，讓你錯過了該有的判斷" },
  { keywords: ["投入", "掌握", "效率"], upright: "全心投入後，你正掌握著節奏", reversed: "注意力被分散，或你正給自己太多限制" },
  { keywords: ["積累", "堅持", "接近圓滿"], upright: "長期的堅持正累積出接近圓滿的成果", reversed: "過度謹慎讓你陷入焦慮與孤立" },
  { keywords: ["圓滿", "結束", "頂點"], upright: "一個循環正走到它的頂點，圓滿收尾", reversed: "負擔沉重，或這件事其實還沒真正結束" },
];

const COURT_THEMES: Record<Court, { label: string; en: string; badge: string; keywords: string[]; upright: string; reversed: string }> = {
  page: { label: "侍者", en: "Page", badge: "侍", keywords: ["學習", "好奇", "訊息"], upright: "一則值得留意的消息，或初學者的好奇心正在萌芽", reversed: "準備得還不夠，或消息並不可靠" },
  knight: { label: "騎士", en: "Knight", badge: "騎", keywords: ["行動", "衝勁", "追求"], upright: "帶著衝勁全力追求一個目標", reversed: "行動太過魯莽，或一股衝勁半途而廢" },
  queen: { label: "皇后", en: "Queen", badge: "后", keywords: ["成熟", "滋養", "直覺掌握"], upright: "以成熟而直覺的方式掌握著這個領域", reversed: "情緒化的掌控，或缺乏安全感" },
  king: { label: "國王", en: "King", badge: "王", keywords: ["權威", "精通", "領導"], upright: "以精通與權威的姿態穩穩領導著局面", reversed: "流於專制，或權力被濫用" },
};

function buildMinorCard(id: number, suit: (typeof SUITS)[number], opts: { rank: number } | { court: Court }): TarotCard {
  const isCourt = "court" in opts;
  const rankTheme = isCourt ? COURT_THEMES[opts.court] : RANK_THEMES[opts.rank - 1];
  const name = suit.name + (isCourt ? COURT_THEMES[opts.court].label : CHINESE_DIGITS[opts.rank - 1]);
  const nameEn = `${isCourt ? COURT_THEMES[opts.court].en : RANK_NAMES_EN[opts.rank - 1]} of ${suit.nameEn}`;
  const numeral = isCourt ? COURT_THEMES[opts.court].badge : String(opts.rank);

  return {
    id,
    numeral,
    name,
    nameEn,
    symbol: suit.symbol,
    suit: suit.id,
    ...(isCourt ? { court: opts.court } : { rank: opts.rank }),
    upright: {
      keywords: [...rankTheme.keywords.slice(0, 2), suit.keyword],
      meaning: `${rankTheme.upright}。在${suit.domain}的面向上，這股能量${suit.verbUpright}。`,
    },
    reversed: {
      keywords: [...rankTheme.keywords.slice(0, 2), suit.keyword],
      meaning: `${rankTheme.reversed}。在${suit.domain}的面向上，這股能量${suit.verbReversed}。`,
    },
  };
}

export const MINOR_ARCANA: TarotCard[] = SUITS.flatMap((suit, suitIndex) => {
  const base = 22 + suitIndex * 14;
  const pips = Array.from({ length: 10 }, (_, i) => buildMinorCard(base + i, suit, { rank: i + 1 }));
  const courts: Court[] = ["page", "knight", "queen", "king"];
  const courtCards = courts.map((court, i) => buildMinorCard(base + 10 + i, suit, { court }));
  return [...pips, ...courtCards];
});

/** The full 78-card deck: 22 major arcana + 56 minor arcana. */
export const FULL_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export type CardDraw = { card: TarotCard; isReversed: boolean };

export function drawRandomCard(): CardDraw {
  const card = FULL_DECK[Math.floor(Math.random() * FULL_DECK.length)];
  const isReversed = Math.random() < 0.35;
  return { card, isReversed };
}

/** Draws `count` distinct cards, matching how a physical deck is dealt without repeats. */
export function drawUniqueCards(count: number): CardDraw[] {
  const pool = [...FULL_DECK];
  const draws: CardDraw[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const [card] = pool.splice(idx, 1);
    draws.push({ card, isReversed: Math.random() < 0.35 });
  }
  return draws;
}
