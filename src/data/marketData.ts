import { MarketSymbol, NewsItem, MarketIdea, CandleData, Timeframe } from "../types";

export const MARKET_SYMBOLS: MarketSymbol[] = [
  // US Stocks / Major Indices
  {
    symbol: "SPX",
    name: "S&P 500",
    badge: "500",
    badgeColor: "red",
    category: "US stocks",
    price: 5985.42,
    change: 28.50,
    changePercent: 0.48,
    high: 6002.10,
    low: 5950.30,
    volume: "3.2B",
    marketCap: "$48.2T",
    peRatio: 26.4,
    yearHigh: 6025.50,
    yearLow: 4950.20,
    sparkline: [5920, 5935, 5940, 5960, 5955, 5980, 5985.42],
    description: "Benchmark index tracking the performance of 500 large-cap US equities.",
  },
  {
    symbol: "NASDAQ:NDX",
    name: "Nasdaq 100",
    badge: "100",
    badgeColor: "blue",
    category: "US stocks",
    price: 20845.80,
    change: 142.10,
    changePercent: 0.69,
    high: 20910.00,
    low: 20680.50,
    volume: "4.8B",
    marketCap: "$24.5T",
    peRatio: 31.2,
    yearHigh: 21100.00,
    yearLow: 16800.00,
    sparkline: [20500, 20620, 20580, 20740, 20800, 20845.80],
    description: "Modified capitalization-weighted index featuring top non-financial tech leaders.",
  },
  {
    symbol: "DJ:DJI",
    name: "Dow 30",
    badge: "30",
    badgeColor: "blue",
    category: "US stocks",
    price: 43910.25,
    change: -45.80,
    changePercent: -0.10,
    high: 44050.10,
    low: 43820.00,
    volume: "380M",
    marketCap: "$15.8T",
    peRatio: 22.1,
    yearHigh: 44200.00,
    yearLow: 37200.00,
    sparkline: [44000, 44050, 43980, 43920, 43950, 43910.25],
    description: "Price-weighted average of 30 prominent blue-chip American corporations.",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    badge: "AAPL",
    badgeColor: "gray",
    category: "US stocks",
    price: 232.40,
    change: 3.20,
    changePercent: 1.40,
    high: 234.10,
    low: 229.80,
    volume: "48.5M",
    marketCap: "$3.52T",
    peRatio: 34.8,
    yearHigh: 237.23,
    yearLow: 164.08,
    sparkline: [228, 229.5, 230.1, 231.8, 232.4],
    description: "Global technology enterprise building hardware, software, and consumer services.",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    badge: "NVDA",
    badgeColor: "green",
    category: "US stocks",
    price: 138.25,
    change: 4.85,
    changePercent: 3.63,
    high: 140.00,
    low: 133.50,
    volume: "85.2M",
    marketCap: "$3.38T",
    peRatio: 58.2,
    yearHigh: 140.76,
    yearLow: 45.20,
    sparkline: [130, 132, 134, 136, 138.25],
    description: "Pioneer in accelerated computing, GPU hardware, and AI deep learning chips.",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    badge: "TSLA",
    badgeColor: "red",
    category: "US stocks",
    price: 320.10,
    change: -12.40,
    changePercent: -3.73,
    high: 335.00,
    low: 318.20,
    volume: "62.1M",
    marketCap: "$1.02T",
    peRatio: 82.5,
    yearHigh: 358.64,
    yearLow: 138.80,
    sparkline: [338, 332, 328, 324, 320.10],
    description: "Electric vehicle design, autonomous software, and renewable energy storage.",
  },

  // World Stocks
  {
    symbol: "FTSE100",
    name: "FTSE 100",
    badge: "100",
    badgeColor: "blue",
    category: "World stocks",
    price: 8240.60,
    change: 18.30,
    changePercent: 0.22,
    high: 8275.00,
    low: 8210.40,
    volume: "740M",
    marketCap: "£2.1T",
    peRatio: 14.2,
    yearHigh: 8445.80,
    yearLow: 7400.20,
    sparkline: [8200, 8215, 8230, 8225, 8240.60],
    description: "Share index of 100 companies listed on the London Stock Exchange with highest market capitalization.",
  },
  {
    symbol: "NIKKEI225",
    name: "Nikkei 225",
    badge: "225",
    badgeColor: "red",
    category: "World stocks",
    price: 38920.00,
    change: -210.50,
    changePercent: -0.54,
    high: 39200.00,
    low: 38800.00,
    volume: "1.1B",
    marketCap: "¥680T",
    peRatio: 18.5,
    yearHigh: 42426.77,
    yearLow: 31000.00,
    sparkline: [39300, 39200, 39100, 38950, 38920],
    description: "Price-weighted stock market index for Tokyo Stock Exchange.",
  },
  {
    symbol: "DAX40",
    name: "DAX 40",
    badge: "40",
    badgeColor: "blue",
    category: "World stocks",
    price: 19480.15,
    change: 85.20,
    changePercent: 0.44,
    high: 19520.00,
    low: 19390.00,
    volume: "92M",
    marketCap: "€1.8T",
    peRatio: 15.8,
    yearHigh: 19674.68,
    yearLow: 15800.00,
    sparkline: [19350, 19400, 19420, 19460, 19480.15],
    description: "German blue-chip stock market index comprising 40 major Frankfurt companies.",
  },

  // Crypto
  {
    symbol: "BTCUSD",
    name: "Bitcoin / US Dollar",
    badge: "BTC",
    badgeColor: "orange",
    category: "Crypto",
    price: 91450.00,
    change: 2840.00,
    changePercent: 3.21,
    high: 92800.00,
    low: 88200.00,
    volume: "$48.5B",
    marketCap: "$1.81T",
    yearHigh: 93400.00,
    yearLow: 41200.00,
    sparkline: [87000, 88500, 89200, 90800, 91450],
    description: "Decentralized digital peer-to-peer cryptocurrency and store of value.",
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum / US Dollar",
    badge: "ETH",
    badgeColor: "purple",
    category: "Crypto",
    price: 3380.50,
    change: 112.40,
    changePercent: 3.44,
    high: 3420.00,
    low: 3240.00,
    volume: "$24.1B",
    marketCap: "$406B",
    yearHigh: 4090.00,
    yearLow: 2150.00,
    sparkline: [3200, 3250, 3310, 3340, 3380.50],
    description: "Smart contract platform powering decentralized applications and Web3 ecosystem.",
  },
  {
    symbol: "SOLUSD",
    name: "Solana / US Dollar",
    badge: "SOL",
    badgeColor: "green",
    category: "Crypto",
    price: 215.80,
    change: 14.20,
    changePercent: 7.04,
    high: 222.00,
    low: 198.50,
    volume: "$9.8B",
    marketCap: "$101B",
    yearHigh: 260.06,
    yearLow: 54.00,
    sparkline: [195, 202, 208, 212, 215.80],
    description: "High-throughput blockchain designed for fast, sub-second decentralized transactions.",
  },

  // Futures
  {
    symbol: "CL1!",
    name: "Crude Oil WTI",
    badge: "WTI",
    badgeColor: "orange",
    category: "Futures",
    price: 68.45,
    change: -1.15,
    changePercent: -1.65,
    high: 70.10,
    low: 67.90,
    volume: "340K",
    unit: "USD / bbl",
    yearHigh: 87.67,
    yearLow: 65.20,
    sparkline: [70.2, 69.8, 69.1, 68.8, 68.45],
    description: "West Texas Intermediate light sweet crude oil futures contract on NYMEX.",
  },
  {
    symbol: "GC1!",
    name: "Gold Futures",
    badge: "XAU",
    badgeColor: "orange",
    category: "Futures",
    price: 2685.20,
    change: 14.80,
    changePercent: 0.55,
    high: 2698.00,
    low: 2668.50,
    volume: "210K",
    unit: "USD / t.oz",
    yearHigh: 2790.10,
    yearLow: 1980.00,
    sparkline: [2660, 2672, 2678, 2680, 2685.20],
    description: "Precious metals benchmark for gold bullion contracts.",
  },
  {
    symbol: "SI1!",
    name: "Silver Futures",
    badge: "XAG",
    badgeColor: "gray",
    category: "Futures",
    price: 31.42,
    change: 0.38,
    changePercent: 1.22,
    high: 31.80,
    low: 30.90,
    volume: "85K",
    unit: "USD / t.oz",
    yearHigh: 35.40,
    yearLow: 21.90,
    sparkline: [30.8, 31.0, 31.2, 31.3, 31.42],
    description: "Industrial and precious metal silver futures standard on COMEX.",
  },

  // Forex
  {
    symbol: "EURUSD",
    name: "Euro / US Dollar",
    badge: "EUR",
    badgeColor: "blue",
    category: "Forex",
    price: 1.0542,
    change: -0.0028,
    changePercent: -0.26,
    high: 1.0580,
    low: 1.0520,
    volume: "$1.2T",
    yearHigh: 1.1214,
    yearLow: 1.0448,
    sparkline: [1.058, 1.056, 1.055, 1.0545, 1.0542],
    description: "Most actively traded currency pair in global foreign exchange markets.",
  },
  {
    symbol: "GBPUSD",
    name: "British Pound / US Dollar",
    badge: "GBP",
    badgeColor: "purple",
    category: "Forex",
    price: 1.2685,
    change: 0.0014,
    changePercent: 0.11,
    high: 1.2720,
    low: 1.2640,
    volume: "$680B",
    yearHigh: 1.3434,
    yearLow: 1.2298,
    sparkline: [1.265, 1.266, 1.267, 1.268, 1.2685],
    description: "Cable pair representing the exchange rate between British Pound Sterling and USD.",
  },
  {
    symbol: "USDJPY",
    name: "US Dollar / Japanese Yen",
    badge: "JPY",
    badgeColor: "red",
    category: "Forex",
    price: 154.65,
    change: 0.85,
    changePercent: 0.55,
    high: 155.10,
    low: 153.60,
    volume: "$950B",
    yearHigh: 161.95,
    yearLow: 140.25,
    sparkline: [153.2, 153.8, 154.1, 154.4, 154.65],
    description: "Key Asian cross measuring strength of the USD against the Japanese Yen.",
  },

  // Government bonds
  {
    symbol: "US10Y",
    name: "US 10-Year Yield",
    badge: "10Y",
    badgeColor: "blue",
    category: "Government bonds",
    price: 4.425,
    change: 0.032,
    changePercent: 0.73,
    high: 4.450,
    low: 4.380,
    volume: "1.8B",
    unit: "%",
    yearHigh: 4.740,
    yearLow: 3.620,
    sparkline: [4.38, 4.39, 4.40, 4.41, 4.425],
    description: "Yield benchmark on 10-year US Treasury note debt obligations.",
  },
  {
    symbol: "US02Y",
    name: "US 2-Year Yield",
    badge: "2Y",
    badgeColor: "blue",
    category: "Government bonds",
    price: 4.285,
    change: -0.015,
    changePercent: -0.35,
    high: 4.310,
    low: 4.260,
    volume: "2.1B",
    unit: "%",
    yearHigh: 5.080,
    yearLow: 3.550,
    sparkline: [4.31, 4.30, 4.29, 4.28, 4.285],
    description: "Short-term Treasury yield sensitive to Federal Reserve policy expectations.",
  },

  // Corporate bonds
  {
    symbol: "HYG",
    name: "iShares High Yield Corporate Bond ETF",
    badge: "HYG",
    badgeColor: "purple",
    category: "Corporate bonds",
    price: 78.45,
    change: 0.12,
    changePercent: 0.15,
    high: 78.60,
    low: 78.30,
    volume: "28M",
    yearHigh: 79.20,
    yearLow: 74.10,
    sparkline: [78.2, 78.3, 78.4, 78.42, 78.45],
    description: "ETF seeking to track high-yield corporate debt securities.",
  },

  // ETFs
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    badge: "SPY",
    badgeColor: "red",
    category: "ETFs",
    price: 597.20,
    change: 2.80,
    changePercent: 0.47,
    high: 599.00,
    low: 594.10,
    volume: "52M",
    marketCap: "$590B",
    yearHigh: 601.50,
    yearLow: 492.00,
    sparkline: [592, 593, 595, 596, 597.20],
    description: "The world's largest ETF designed to mirror the S&P 500 index performance.",
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    badge: "QQQ",
    badgeColor: "blue",
    category: "ETFs",
    price: 508.60,
    change: 3.50,
    changePercent: 0.69,
    high: 510.20,
    low: 504.80,
    volume: "38M",
    marketCap: "$290B",
    yearHigh: 515.00,
    yearLow: 410.00,
    sparkline: [502, 504, 506, 507, 508.60],
    description: "Tracks the Nasdaq-100 index consisting of top non-financial innovative giants.",
  },

  // Economy
  {
    symbol: "USCPI",
    name: "US Inflation Rate (CPI)",
    badge: "CPI",
    badgeColor: "orange",
    category: "Economy",
    price: 2.6,
    change: 0.1,
    changePercent: 4.0,
    high: 3.5,
    low: 2.4,
    volume: "Monthly",
    unit: "% YoY",
    yearHigh: 3.5,
    yearLow: 2.4,
    sparkline: [3.4, 3.2, 2.9, 2.5, 2.6],
    description: "Annual percentage change in the Consumer Price Index for all urban consumers.",
  },
  {
    symbol: "FEDRATE",
    name: "Federal Reserve Interest Rate",
    badge: "FED",
    badgeColor: "blue",
    category: "Economy",
    price: 4.75,
    change: -0.25,
    changePercent: -5.0,
    high: 5.50,
    low: 4.75,
    volume: "FOMC",
    unit: "%",
    yearHigh: 5.50,
    yearLow: 4.75,
    sparkline: [5.50, 5.50, 5.25, 5.00, 4.75],
    description: "Target federal funds rate range benchmark set by the Federal Reserve.",
  }
];

// Helper to generate realistic interactive candle series for timeframes
export function generateCandleSeries(symbol: MarketSymbol, timeframe: Timeframe): CandleData[] {
  let count = 40;
  let volatility = 0.012;
  
  switch (timeframe) {
    case "1D":
      count = 30; volatility = 0.004; break;
    case "5D":
      count = 45; volatility = 0.008; break;
    case "1M":
      count = 50; volatility = 0.015; break;
    case "6M":
      count = 60; volatility = 0.025; break;
    case "YTD":
    case "1Y":
      count = 70; volatility = 0.035; break;
    case "5Y":
    case "ALL":
      count = 80; volatility = 0.06; break;
  }

  const basePrice = symbol.price;
  const data: CandleData[] = [];
  let currentPrice = basePrice * (1 - (symbol.changePercent / 100));

  const now = new Date();

  for (let i = 0; i < count; i++) {
    const factor = 1 + (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = Number((open * factor).toFixed(2));
    const high = Number((Math.max(open, close) * (1 + Math.random() * (volatility * 0.4))).toFixed(2));
    const low = Number((Math.min(open, close) * (1 - Math.random() * (volatility * 0.4))).toFixed(2));
    const volume = Math.floor(10000 + Math.random() * 500000);

    let dateLabel = "";
    if (timeframe === "1D") {
      const minutesAgo = (count - i) * 15;
      const d = new Date(now.getTime() - minutesAgo * 60 * 1000);
      dateLabel = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } else {
      const daysAgo = (count - i);
      const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      dateLabel = `${d.getMonth() + 1}/${d.getDate()}`;
    }

    data.push({
      time: dateLabel,
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
  }

  // Ensure last candle matches symbol current price
  if (data.length > 0) {
    data[data.length - 1].close = symbol.price;
    data[data.length - 1].high = Math.max(data[data.length - 1].high, symbol.price);
    data[data.length - 1].low = Math.min(data[data.length - 1].low, symbol.price);
  }

  // Calculate Moving Averages & RSI
  for (let i = 0; i < data.length; i++) {
    if (i >= 5) {
      const slice = data.slice(i - 5, i + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      data[i].ma20 = Number((sum / slice.length).toFixed(2));
    }
    if (i >= 12) {
      const slice = data.slice(i - 12, i + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      data[i].ma50 = Number((sum / slice.length).toFixed(2));
    }
    
    // Simple mock RSI between 30 and 70
    const change = i > 0 ? data[i].close - data[i - 1].close : 0;
    const baseRsi = 50 + (change / (symbol.price * 0.01)) * 10;
    data[i].rsi = Math.min(85, Math.max(15, Number(baseRsi.toFixed(1))));
  }

  return data;
}

export const FINANCIAL_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "S&P 500 Rallies as Tech Earnings Beat Wall Street Estimates",
    source: "Bloomberg Financial",
    timeAgo: "12m ago",
    category: "US Stocks",
    sentiment: "bullish",
    relatedSymbol: "SPX",
  },
  {
    id: "n2",
    title: "Federal Reserve Signals Data-Dependent Approach on Future Interest Rate Decisions",
    source: "Reuters Markets",
    timeAgo: "45m ago",
    category: "Economy",
    sentiment: "neutral",
    relatedSymbol: "FEDRATE",
  },
  {
    id: "n3",
    title: "Bitcoin Surges Past $91,000 Supported by Institutional ETF Inflows",
    source: "CoinDesk",
    timeAgo: "1h ago",
    category: "Crypto",
    sentiment: "bullish",
    relatedSymbol: "BTCUSD",
  },
  {
    id: "n4",
    title: "Crude Oil Slips Below $69 as OPEC+ Revises Global Demand Forecast",
    source: "Wall Street Journal",
    timeAgo: "2h ago",
    category: "Commodities",
    sentiment: "bearish",
    relatedSymbol: "CL1!",
  },
  {
    id: "n5",
    title: "US 10-Year Yield Ticks Up to 4.42% Amid Resilient Labor Market Data",
    source: "Financial Times",
    timeAgo: "3h ago",
    category: "Bonds",
    sentiment: "neutral",
    relatedSymbol: "US10Y",
  },
];

export const MARKET_IDEAS: MarketIdea[] = [
  {
    id: "i1",
    author: "CryptoWave_Trader",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    title: "S&P 500 Bullish Breakout Test of 6,000 All-Time Highs",
    symbol: "SPX",
    timeframe: "4H",
    likes: 342,
    comments: 58,
    timeAgo: "2h ago",
    direction: "Long",
    summary: "Holding key support at 5,950 with MACD bullish crossover forming on the 4H timeframe. Targeting 6,050 with tight stop below 5,930.",
  },
  {
    id: "i2",
    author: "MacroGlobal_FX",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    title: "EUR/USD Consolidating Near Crucial 1.0500 Support Level",
    symbol: "EURUSD",
    timeframe: "1D",
    likes: 219,
    comments: 34,
    timeAgo: "4h ago",
    direction: "Short",
    summary: "Divergence in ECB vs Fed rate policy keeps pressure on EUR. Watch for breakdown below 1.0500 leading to 1.0420 target.",
  },
  {
    id: "i3",
    author: "QuantumQuant",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    title: "NVIDIA (NVDA): Parabolic Curve Continuation towards $150",
    symbol: "NVDA",
    timeframe: "1D",
    likes: 512,
    comments: 94,
    timeAgo: "5h ago",
    direction: "Long",
    summary: "Blackwell chip production scaling fast. High volume buying pressure confirmed on 20-day EMA bounces.",
  },
];
