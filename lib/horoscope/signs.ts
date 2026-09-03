export type ZodiacElement = "火" | "土" | "風" | "水";

export type ZodiacSign = {
  id: string;
  name: string;
  dateRange: string;
  symbol: string;
  element: ZodiacElement;
  ruler: string;
  traits: string[];
  image?: string;
};

export const ELEMENT_ICON: Record<ZodiacElement, string> = {
  火: "🔥",
  土: "⛰️",
  風: "🌬️",
  水: "💧",
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "aries", name: "牡羊座", dateRange: "3/21 - 4/19", symbol: "♈", element: "火", ruler: "火星", traits: ["衝勁", "直率", "行動派"], image: "/images/zodiac/aries.png" },
  { id: "taurus", name: "金牛座", dateRange: "4/20 - 5/20", symbol: "♉", element: "土", ruler: "金星", traits: ["穩定", "務實", "重感官"], image: "/images/zodiac/taurus.png" },
  { id: "gemini", name: "雙子座", dateRange: "5/21 - 6/20", symbol: "♊", element: "風", ruler: "水星", traits: ["靈活", "好奇", "善溝通"], image: "/images/zodiac/gemini.png" },
  { id: "cancer", name: "巨蟹座", dateRange: "6/21 - 7/22", symbol: "♋", element: "水", ruler: "月亮", traits: ["念舊", "體貼", "重家庭"], image: "/images/zodiac/cancer.png" },
  { id: "leo", name: "獅子座", dateRange: "7/23 - 8/22", symbol: "♌", element: "火", ruler: "太陽", traits: ["自信", "熱情", "重榮譽"], image: "/images/zodiac/leo.png" },
  { id: "virgo", name: "處女座", dateRange: "8/23 - 9/22", symbol: "♍", element: "土", ruler: "水星", traits: ["細心", "分析", "追求完美"], image: "/images/zodiac/virgo.png" },
  { id: "libra", name: "天秤座", dateRange: "9/23 - 10/22", symbol: "♎", element: "風", ruler: "金星", traits: ["優雅", "重平衡", "善協調"], image: "/images/zodiac/libra.png" },
  { id: "scorpio", name: "天蠍座", dateRange: "10/23 - 11/21", symbol: "♏", element: "水", ruler: "冥王星", traits: ["深邃", "專注", "重承諾"], image: "/images/zodiac/scorpio.png" },
  { id: "sagittarius", name: "射手座", dateRange: "11/22 - 12/21", symbol: "♐", element: "火", ruler: "木星", traits: ["樂觀", "自由", "愛冒險"], image: "/images/zodiac/sagittarius.png" },
  { id: "capricorn", name: "摩羯座", dateRange: "12/22 - 1/19", symbol: "♑", element: "土", ruler: "土星", traits: ["自律", "堅毅", "有目標"], image: "/images/zodiac/capricorn.png" },
  { id: "aquarius", name: "水瓶座", dateRange: "1/20 - 2/18", symbol: "♒", element: "風", ruler: "天王星", traits: ["獨立", "創新", "重理念"], image: "/images/zodiac/aquarius.png" },
  { id: "pisces", name: "雙魚座", dateRange: "2/19 - 3/20", symbol: "♓", element: "水", ruler: "海王星", traits: ["浪漫", "敏感", "富同理心"], image: "/images/zodiac/pisces.png" },
];
