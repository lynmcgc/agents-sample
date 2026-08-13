export type MarketCategory =
  | "US stocks"
  | "World stocks"
  | "Crypto"
  | "Futures"
  | "Forex"
  | "Government bonds"
  | "Corporate bonds"
  | "ETFs"
  | "Economy";

export type Timeframe = "1D" | "5D" | "1M" | "6M" | "YTD" | "1Y" | "5Y" | "ALL";

export type ChartType = "area" | "line" | "candlestick";

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma20?: number;
  ma50?: number;
  rsi?: number;
}

export interface MarketSymbol {
  symbol: string;
  name: string;
  badge: string;
  badgeColor?: "red" | "blue" | "green" | "orange" | "purple" | "gray";
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  yearHigh?: number;
  yearLow?: number;
  unit?: string;
  sparkline: number[];
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  sentiment: "bullish" | "bearish" | "neutral";
  relatedSymbol?: string;
}

export interface MarketIdea {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  symbol: string;
  timeframe: string;
  likes: number;
  comments: number;
  timeAgo: string;
  direction: "Long" | "Short" | "Neutral";
  summary: string;
}
