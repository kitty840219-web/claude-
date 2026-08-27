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
  /** Classical element; set on the 22 major arcana cards. */
  element?: "火" | "水" | "風" | "土";
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
    element: "風",
    upright: { keywords: ["新的開始", "冒險精神", "無限可能"], meaning: "新的開始就在眼前，帶著天真自由與冒險精神，隨性而為也是一種無限可能。" },
    reversed: { keywords: ["魯莽行事", "缺乏準備", "停滯不前"], meaning: "魯莽行事、缺乏準備讓你顯得不負責任，或者只是還沒準備好跨出那一步，正停滯不前。" },
  },
  {
    id: 1,
    numeral: "I",
    name: "魔術師",
    nameEn: "The Magician",
    symbol: "✨",
    element: "火",
    upright: { keywords: ["創造力", "行動力", "資源整合"], meaning: "你已經整合好手邊的資源，創造力與行動力兼具，這是一個良好的開端。" },
    reversed: { keywords: ["欺騙", "才能未發揮", "缺乏溝通"], meaning: "手法拙劣或帶著欺騙的成分，才能尚未發揮，也可能是缺乏溝通、意志力薄弱。" },
  },
  {
    id: 2,
    numeral: "II",
    name: "女祭司",
    nameEn: "The High Priestess",
    symbol: "🌙",
    element: "水",
    upright: { keywords: ["直覺", "潛意識", "靜止等待"], meaning: "答案藏在潛意識與直覺裡，此刻適合靜止等待、沉靜觀察，而非急著行動。" },
    reversed: { keywords: ["情緒化", "忽視直覺", "秘密被揭發"], meaning: "情緒化的反應讓你忽視了直覺，內心的感受被壓抑，也可能有秘密正被揭發。" },
  },
  {
    id: 3,
    numeral: "III",
    name: "皇后",
    nameEn: "The Empress",
    symbol: "🌿",
    element: "土",
    upright: { keywords: ["豐盛", "母愛", "創造力"], meaning: "豐盛與母愛般的滋養正圍繞著你，這是享受舒適、讓創造力自然產出的時刻。" },
    reversed: { keywords: ["過度控制", "缺乏安全感", "情感窒息"], meaning: "過度控制或浪費讓關係失去餘裕，缺乏安全感使情感陷入窒息，產出也因此受阻。" },
  },
  {
    id: 4,
    numeral: "IV",
    name: "皇帝",
    nameEn: "The Emperor",
    symbol: "🏔️",
    element: "火",
    upright: { keywords: ["權威", "結構與秩序", "穩定控制"], meaning: "建立結構與秩序能讓你掌握局面，權威來自理性決策後的穩定控制。" },
    reversed: { keywords: ["濫用權力", "固執暴戾", "動盪不安"], meaning: "濫用權力或固執暴戾，反而讓局面動盪不安，剛愎自用只會失去該有的控制力。" },
  },
  {
    id: 5,
    numeral: "V",
    name: "教皇",
    nameEn: "The Hierophant",
    symbol: "📜",
    element: "土",
    upright: { keywords: ["傳統規範", "精神導師", "學習與教育"], meaning: "尋求傳統規範或精神導師的指引，透過學習與教育、團體認同，會讓這件事更有方向。" },
    reversed: { keywords: ["打破傳統", "叛逆", "過度僵化"], meaning: "打破傳統的叛逆，或是反過來墨守成規、過度僵化，都可能來自不實的指引。" },
  },
  {
    id: 6,
    numeral: "VI",
    name: "戀人",
    nameEn: "The Lovers",
    symbol: "💞",
    element: "風",
    upright: { keywords: ["愛與結合", "重要抉擇", "價值觀契合"], meaning: "愛與結合的夥伴關係，或是一個重要抉擇，都在考驗你內心真正的價值觀是否契合。" },
    reversed: { keywords: ["關係破裂", "抉擇錯誤", "價值觀衝突"], meaning: "價值觀衝突讓關係出現破裂的風險，一個錯誤的抉擇或不合適的結合，也可能只是誘惑。" },
  },
  {
    id: 7,
    numeral: "VII",
    name: "戰車",
    nameEn: "The Chariot",
    symbol: "🐎",
    element: "水",
    upright: { keywords: ["意志力", "勝券在握", "克服衝突"], meaning: "憑意志力和強烈的目標感，你能克服內外的衝突，勝券在握地向前衝刺。" },
    reversed: { keywords: ["失控", "衝動冒進", "方向錯誤"], meaning: "失控與衝動冒進讓方向出現錯誤，被情緒綁架的你，正在原地打轉。" },
  },
  {
    id: 8,
    numeral: "VIII",
    name: "力量",
    nameEn: "Strength",
    symbol: "🦁",
    element: "火",
    upright: { keywords: ["以柔克剛", "內在勇氣", "耐心包容"], meaning: "以柔克剛的內在勇氣，加上耐心與包容，是這份堅韌不拔背後真正的力量。" },
    reversed: { keywords: ["軟弱無力", "失去自信", "被慾望掌控"], meaning: "軟弱無力、失去自信，或是被慾望掌控而急躁衝動，恐懼正在悄悄接管你。" },
  },
  {
    id: 9,
    numeral: "IX",
    name: "隱士",
    nameEn: "The Hermit",
    symbol: "🕯️",
    element: "土",
    upright: { keywords: ["尋求真理", "內省思考", "導師指引"], meaning: "遠離喧囂、尋求真理，這段內省思考的孤獨沉澱，會帶來如導師般的指引。" },
    reversed: { keywords: ["孤立無援", "逃避現實", "忽視忠告"], meaning: "孤立無援的固執，或是藉獨處逃避現實，讓你忽視了旁人的忠告。" },
  },
  {
    id: 10,
    numeral: "X",
    name: "命運之輪",
    nameEn: "Wheel of Fortune",
    symbol: "🎡",
    element: "火",
    upright: { keywords: ["轉機", "命運的安排", "順應趨勢"], meaning: "一個轉機正順應著命運的安排到來，順應趨勢，幸運正隨著週期循環而至。" },
    reversed: { keywords: ["運勢下滑", "抗拒改變", "重複錯誤"], meaning: "運勢下滑、阻礙連連，抗拒改變只會讓你在重複的錯誤裡打轉。" },
  },
  {
    id: 11,
    numeral: "XI",
    name: "正義",
    nameEn: "Justice",
    symbol: "⚖️",
    element: "風",
    upright: { keywords: ["公平公正", "理性衡量", "因果報應"], meaning: "誠實面對事實、理性衡量，公平公正的決定終將以因果報應回饋於你。" },
    reversed: { keywords: ["不公不義", "逃避責任", "雙重標準"], meaning: "不公不義或雙重標準讓局面失衡，逃避責任的帳，終究還沒算清。" },
  },
  {
    id: 12,
    numeral: "XII",
    name: "吊人",
    nameEn: "The Hanged Man",
    symbol: "🌀",
    element: "水",
    upright: { keywords: ["換位思考", "甘願犧牲", "臣服於當下"], meaning: "暫停等待、換位思考，甘願的犧牲換來靈性覺悟，臣服於當下反而看清真相。" },
    reversed: { keywords: ["無謂的犧牲", "死板固執", "毫無進展"], meaning: "無謂的犧牲換來的只是拖延，死板固執的無奈妥協，讓事情毫無進展。" },
  },
  {
    id: 13,
    numeral: "XIII",
    name: "死神",
    nameEn: "Death",
    symbol: "🦋",
    element: "水",
    upright: { keywords: ["結束與重生", "徹底變革", "放手舊事物"], meaning: "一個階段正走向結束與重生，放手舊事物，才能讓徹底變革後的新可能長出來。" },
    reversed: { keywords: ["恐懼改變", "垂死掙扎", "不肯放手"], meaning: "恐懼改變讓你拖泥帶水，垂死掙扎的僵局難解，只因還不肯放手。" },
  },
  {
    id: 14,
    numeral: "XIV",
    name: "節制",
    nameEn: "Temperance",
    symbol: "🌊",
    element: "火",
    upright: { keywords: ["調和平衡", "適度適中", "身心療癒"], meaning: "調和平衡、適度適中的溝通協調，會帶來身心療癒與靈魂的昇華。" },
    reversed: { keywords: ["失衡", "缺乏自制", "極端行為"], meaning: "失衡與缺乏自制讓溝通出現障礙，極端行為使兩端始終無法融合。" },
  },
  {
    id: 15,
    numeral: "XV",
    name: "惡魔",
    nameEn: "The Devil",
    symbol: "⛓️",
    element: "土",
    upright: { keywords: ["物質慾望", "上癮束縛", "感官誘惑"], meaning: "物質慾望與感官誘惑帶來的利益交換，正化為一種上癮般的束縛與執念。" },
    reversed: { keywords: ["擺脫束縛", "覺醒解脫", "恢復自由"], meaning: "覺醒解脫的時刻到了，打破枷鎖、遠離誘惑，你正在擺脫束縛、恢復自由。" },
  },
  {
    id: 16,
    numeral: "XVI",
    name: "高塔",
    nameEn: "The Tower",
    symbol: "⚡",
    element: "火",
    upright: { keywords: ["突如其來的劇變", "信念崩塌", "破除虛妄"], meaning: "突如其來的劇變帶來信念崩塌般的意外衝擊，卻也破除了虛妄，讓真相浮現。" },
    reversed: { keywords: ["危機延後", "苟延殘喘", "隱瞞問題"], meaning: "危機被延後，苟延殘喘地隱瞞問題，只是在迴避一場徹底毀滅的餘波。" },
  },
  {
    id: 17,
    numeral: "XVII",
    name: "星星",
    nameEn: "The Star",
    symbol: "⭐",
    element: "風",
    upright: { keywords: ["希望與信心", "靈感湧現", "平靜療癒"], meaning: "風暴過後，希望與信心正在回來，靈感湧現，帶來平靜療癒與坦誠相見的前景。" },
    reversed: { keywords: ["失望落空", "缺乏信心", "失去方向"], meaning: "失望落空讓你缺乏信心，好高騖遠的絕望，使你暫時失去了方向。" },
  },
  {
    id: 18,
    numeral: "XVIII",
    name: "月亮",
    nameEn: "The Moon",
    symbol: "🌕",
    element: "水",
    upright: { keywords: ["不安與恐懼", "幻象", "隱藏的危機"], meaning: "不安與恐懼交織成幻象，眼前訊息不完整，但直覺正比邏輯更早察覺隱藏的危機。" },
    reversed: { keywords: ["真相大白", "撥雲見日", "誤會冰釋"], meaning: "真相大白，撥雲見日，恐懼逐漸消散，你正走出迷惘、誤會也隨之冰釋。" },
  },
  {
    id: 19,
    numeral: "XIX",
    name: "太陽",
    nameEn: "The Sun",
    symbol: "☀️",
    element: "火",
    upright: { keywords: ["成功與榮耀", "光明磊落", "活力充沛"], meaning: "成功與榮耀就在眼前，光明磊落、活力充沛，允許自己單純地感到快樂喜悅。" },
    reversed: { keywords: ["熱情減退", "暫時延遲", "過度自信"], meaning: "熱情正在減退，好消息暫時延遲，也可能是過度自信讓成就顯得不夠圓滿。" },
  },
  {
    id: 20,
    numeral: "XX",
    name: "審判",
    nameEn: "Judgement",
    symbol: "📯",
    element: "火",
    upright: { keywords: ["召喚與覺醒", "重大決定", "重生"], meaning: "一次召喚與覺醒，過去的經驗正被重新召喚，是時候做出重大決定、洗心革面。" },
    reversed: { keywords: ["自我懷疑", "逃避召喚", "拖延不決"], meaning: "自我懷疑讓你逃避這次召喚，悔恨過去的同時，也拖延著該做的決定。" },
  },
  {
    id: 21,
    numeral: "XXI",
    name: "世界",
    nameEn: "The World",
    symbol: "🌍",
    element: "土",
    upright: { keywords: ["圓滿達成", "階段性終點", "完美整合"], meaning: "一個循環走到圓滿達成的階段性終點，完美整合後的成功，正等著被實現。" },
    reversed: { keywords: ["未完結", "最後一步受阻", "缺乏成就感"], meaning: "還有未完結的事，最後一步受阻，讓這份成果始終缺乏該有的成就感。" },
  },
];

const CHINESE_DIGITS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const RANK_NAMES_EN = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const SUITS: { id: Suit; name: string; nameEn: string; symbol: string; domain: string; keyword: string; verbUpright: string; verbReversed: string }[] = [
  { id: "wands", name: "權杖", nameEn: "Wands", symbol: "🔥", domain: "行動、事業與熱情", keyword: "衝勁", verbUpright: "正被點燃，推動著你往前", verbReversed: "被澆熄，或找不到施力的方向" },
  { id: "cups", name: "聖杯", nameEn: "Cups", symbol: "💧", domain: "情感、關係與感受", keyword: "連結", verbUpright: "正流動著，滋養你與他人的連結", verbReversed: "淤積著，情緒需要被好好安放" },
  { id: "swords", name: "寶劍", nameEn: "Swords", symbol: "🗡️", domain: "理性、思想與溝通", verbUpright: "正變得銳利而清晰", verbReversed: "陷入混亂，或被過度的批判纏住", keyword: "決策" },
  { id: "pentacles", name: "錢幣", nameEn: "Pentacles", symbol: "🪙", domain: "物質、金錢與工作", keyword: "累積", verbUpright: "正被你踏實地一點一滴累積", verbReversed: "出現漏洞，或被你抓得太緊" },
];

// Suit-agnostic progression from Ace(1) to 10, per the classic numbered-card system.
const RANK_THEMES: { keywords: string[]; upright: string; reversed: string }[] = [
  { keywords: ["新開始", "契機", "潛力"], upright: "全新的機會正在眼前，這是充滿潛力的起點", reversed: "機會被延遲或阻礙，你可能正與一個良機失之交臂" },
  { keywords: ["合作", "權衡", "抉擇"], upright: "你正在做一個需要權衡的選擇，或迎來一段合作關係", reversed: "猶豫不決或選擇失衡，讓局勢遲遲無法定案" },
  { keywords: ["合作", "擴展", "初步成果"], upright: "合作正帶來初步成果，事情開始向外擴展", reversed: "溝通不暢或計畫延誤，讓進展卡在半路" },
  { keywords: ["穩定", "鞏固", "架構"], upright: "穩固的架構讓你獲得安全感，是時候鞏固已有的成果", reversed: "停滯在原地，或急欲突破現狀卻找不到施力點" },
  { keywords: ["衝突", "競爭", "變化"], upright: "一場衝突或競爭帶來變化，考驗著你的應對能力", reversed: "危機正在化解，但也可能只是內耗持續、遲遲未解" },
  { keywords: ["和諧", "分享", "互助"], upright: "和諧與互助讓事情順暢流動，值得彼此分享成果", reversed: "付出與回報失衡，或是舊有的包袱仍未放下" },
  { keywords: ["評估", "策略", "堅持"], upright: "這是評估與布局的時刻，堅持能為你換來優勢", reversed: "策略出了差錯，或你正考慮放棄原本的堅持" },
  { keywords: ["專注", "加速", "轉變"], upright: "全神貫注帶來快速的進展，變化正在加速發生", reversed: "力量被限制住，或精力正在耗竭，難以再加速" },
  { keywords: ["接近圓滿", "積累", "充實"], upright: "長期積累讓你即將迎來圓滿，成果已相當充實", reversed: "防備心過強或內心不安，讓你不自覺地孤立自己" },
  { keywords: ["頂點", "極致", "圓滿"], upright: "事情發展到了頂點，這是極致與圓滿的展現", reversed: "負擔沉重到難以為繼，或許是時候釋放這份重量了" },
];

const COURT_THEMES: Record<Court, { label: string; en: string; badge: string; keywords: string[]; upright: string; reversed: string }> = {
  page: { label: "侍者", en: "Page", badge: "侍", keywords: ["學習者", "好奇心", "訊息"], upright: "像個充滿好奇心的學習者，一則新的訊息或計畫正在萌芽", reversed: "不夠成熟的應對，或是消息延誤、注意力難以集中" },
  knight: { label: "騎士", en: "Knight", badge: "騎", keywords: ["行動者", "追求", "推進"], upright: "像個果敢的行動者，正全力向前推進、具體執行", reversed: "行動太過衝動冒進，或缺乏耐心讓方向逐漸偏離" },
  queen: { label: "皇后", en: "Queen", badge: "后", keywords: ["掌控者", "滋養", "成熟"], upright: "以成熟且滋養的姿態，內化地掌握著這個領域", reversed: "情緒化的反應，或過強的控制欲來自內心的不安" },
  king: { label: "國王", en: "King", badge: "王", keywords: ["領導者", "專精", "穩重"], upright: "以專精穩重的姿態，外化地領導與掌控全局", reversed: "權力被濫用而流於獨裁，或處事方式過於僵化" },
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
