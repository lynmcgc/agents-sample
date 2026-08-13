import React, { useState, useEffect } from "react";
import { MarketSymbol, Timeframe, ChartType, CandleData } from "../types";
import { generateCandleSeries } from "../data/marketData";
import {
  X,
  Star,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart as LineChartIcon,
  Activity,
  Layers,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SymbolModalProps {
  symbol: MarketSymbol | null;
  onClose: () => void;
  watchlist: string[];
  onToggleWatchlist: (symbolStr: string, e: React.MouseEvent) => void;
}

export const SymbolModal: React.FC<SymbolModalProps> = ({
  symbol,
  onClose,
  watchlist,
  onToggleWatchlist,
}) => {
  if (!symbol) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>("1D");
  const [chartType, setChartType] = useState<ChartType>("area");
  const [showMA20, setShowMA20] = useState(true);
  const [showMA50, setShowMA50] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(false);

  // Chart data state
  const [chartData, setChartData] = useState<CandleData[]>([]);

  // AI Analyst state
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Regenerate candle series when symbol or timeframe changes
  useEffect(() => {
    if (symbol) {
      const data = generateCandleSeries(symbol, timeframe);
      setChartData(data);
      setAiAnalysis(null);
      setAiError(null);
    }
  }, [symbol, timeframe]);

  const isStarred = watchlist.includes(symbol.symbol);
  const isPositive = symbol.change >= 0;

  // Handle server-side Gemini AI request
  const fetchAiInsight = async () => {
    setLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: symbol.symbol,
          name: symbol.name,
          price: symbol.price,
          change: symbol.changePercent,
          category: symbol.category,
          timeframe,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch AI analysis.");
      }
      setAiAnalysis(json.analysis);
    } catch (err: any) {
      setAiError(err.message || "An unexpected error occurred.");
    } finally {
      setLoadingAi(false);
    }
  };

  // Min/Max bounds for YAxis scaling
  const prices = chartData.map((d) => d.close);
  const minPrice = Math.min(...prices, symbol.low) * 0.995;
  const maxPrice = Math.max(...prices, symbol.high) * 1.005;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-5xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-[#FAF8FF] border-b border-[#E0E3EB] px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2962ff] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-sm">
              {symbol.badge}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-[#191b24] font-headline">
                  {symbol.name}
                </h2>
                <span className="text-xs font-mono bg-[#E0E3EB] text-[#434656] px-2 py-0.5 rounded font-semibold">
                  {symbol.symbol}
                </span>
              </div>
              <p className="text-xs text-[#6A6D78]">{symbol.category} Market</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Star Watchlist */}
            <button
              onClick={(e) => onToggleWatchlist(symbol.symbol, e)}
              className="p-2 text-[#6A6D78] hover:text-amber-500 hover:bg-[#F0F3FA] rounded-full transition-colors"
              title={isStarred ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <Star
                className={`w-5 h-5 ${
                  isStarred ? "fill-amber-400 text-amber-500" : ""
                }`}
              />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 text-[#6A6D78] hover:text-[#191b24] hover:bg-[#F0F3FA] rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6">
          {/* Price Header & Day Range */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#F0F3FA] p-4 rounded-xl border border-[#E0E3EB]">
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#191b24]">
                {symbol.unit === "%" ? "" : "$"}
                {symbol.price.toLocaleString(undefined, {
                  minimumFractionDigits: symbol.price < 10 ? 3 : 2,
                })}
                {symbol.unit ? ` ${symbol.unit}` : ""}
              </div>
              <div
                className={`text-sm font-semibold font-mono flex items-center gap-1 mt-0.5 ${
                  isPositive ? "text-[#089981]" : "text-[#F23645]"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {symbol.change} ({isPositive ? "+" : ""}
                  {symbol.changePercent}%)
                </span>
                <span className="text-[#6A6D78] text-xs ml-2 font-normal">
                  Real-Time TradingView Terminal Feed
                </span>
              </div>
            </div>

            {/* Day Range Progress Bar */}
            <div className="w-full sm:w-64 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-[#6A6D78]">
                <span>24h Low: ${symbol.low.toLocaleString()}</span>
                <span>24h High: ${symbol.high.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-[#E0E3EB] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#0049db] rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        5,
                        ((symbol.price - symbol.low) /
                          (symbol.high - symbol.low || 1)) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Chart Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0E3EB] pb-3">
            {/* Timeframe Selectors */}
            <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-lg border border-[#E0E3EB]">
              {(["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "ALL"] as Timeframe[]).map(
                (tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                      timeframe === tf
                        ? "bg-[#2962ff] text-white shadow-xs"
                        : "text-[#6A6D78] hover:text-[#191b24]"
                    }`}
                  >
                    {tf}
                  </button>
                )
              )}
            </div>

            {/* Chart Type & Indicator Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type Switcher */}
              <div className="flex items-center bg-[#F0F3FA] p-1 rounded-lg border border-[#E0E3EB]">
                <button
                  onClick={() => setChartType("area")}
                  className={`p-1 rounded ${
                    chartType === "area"
                      ? "bg-white text-[#0049db] shadow-xs"
                      : "text-[#6A6D78]"
                  }`}
                  title="Area Chart"
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType("line")}
                  className={`p-1 rounded ${
                    chartType === "line"
                      ? "bg-white text-[#0049db] shadow-xs"
                      : "text-[#6A6D78]"
                  }`}
                  title="Line Chart"
                >
                  <LineChartIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Technical Overlay Toggles */}
              <button
                onClick={() => setShowMA20(!showMA20)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                  showMA20
                    ? "bg-[#2962ff]/10 border-[#2962ff] text-[#2962ff] font-bold"
                    : "bg-[#F0F3FA] border-[#E0E3EB] text-[#6A6D78]"
                }`}
              >
                MA (20)
              </button>
              <button
                onClick={() => setShowMA50(!showMA50)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                  showMA50
                    ? "bg-purple-100 border-purple-500 text-purple-700 font-bold"
                    : "bg-[#F0F3FA] border-[#E0E3EB] text-[#6A6D78]"
                }`}
              >
                MA (50)
              </button>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                  showVolume
                    ? "bg-gray-200 border-gray-400 text-gray-800 font-bold"
                    : "bg-[#F0F3FA] border-[#E0E3EB] text-[#6A6D78]"
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                  showRSI
                    ? "bg-amber-100 border-amber-500 text-amber-800 font-bold"
                    : "bg-[#F0F3FA] border-[#E0E3EB] text-[#6A6D78]"
                }`}
              >
                RSI (14)
              </button>
            </div>
          </div>

          {/* Interactive Recharts Canvas */}
          <div className="w-full h-72 md:h-80 bg-white rounded-xl border border-[#E0E3EB] p-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#737687" fontSize={11} tickLine={false} />
                  <YAxis domain={[minPrice, maxPrice]} stroke="#737687" fontSize={11} orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191b24",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke={isPositive ? "#089981" : "#F23645"}
                    strokeWidth={2}
                    dot={false}
                  />
                  {showMA20 && (
                    <Line type="monotone" dataKey="ma20" stroke="#2962ff" strokeWidth={1.5} dot={false} />
                  )}
                  {showMA50 && (
                    <Line type="monotone" dataKey="ma50" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                  )}
                </LineChart>
              ) : (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isPositive ? "#089981" : "#F23645"}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor={isPositive ? "#089981" : "#F23645"}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#737687" fontSize={11} tickLine={false} />
                  <YAxis domain={[minPrice, maxPrice]} stroke="#737687" fontSize={11} orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#191b24",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke={isPositive ? "#089981" : "#F23645"}
                    fillOpacity={1}
                    fill="url(#priceGradient)"
                    strokeWidth={2}
                  />
                  {showMA20 && (
                    <Line type="monotone" dataKey="ma20" stroke="#2962ff" strokeWidth={1.5} dot={false} />
                  )}
                  {showMA50 && (
                    <Line type="monotone" dataKey="ma50" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                  )}
                  {showVolume && (
                    <Bar dataKey="volume" yAxisId="volume" fill="#cbd5e1" opacity={0.4} />
                  )}
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Key Financial Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8FF] p-4 rounded-xl border border-[#E0E3EB] text-xs">
            <div>
              <span className="text-[#6A6D78] block font-mono uppercase">24h Volume</span>
              <span className="font-bold font-mono text-[#191b24]">{symbol.volume}</span>
            </div>
            <div>
              <span className="text-[#6A6D78] block font-mono uppercase">Market Cap</span>
              <span className="font-bold font-mono text-[#191b24]">{symbol.marketCap || "N/A"}</span>
            </div>
            <div>
              <span className="text-[#6A6D78] block font-mono uppercase">52-Wk High</span>
              <span className="font-bold font-mono text-[#191b24]">
                ${symbol.yearHigh?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-[#6A6D78] block font-mono uppercase">52-Wk Low</span>
              <span className="font-bold font-mono text-[#191b24]">
                ${symbol.yearLow?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>

          {/* Gemini AI Financial Analyst Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#2962ff] text-white rounded-lg">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#191b24] font-headline flex items-center gap-2">
                    AI Institutional Strategist
                    <span className="text-[10px] font-mono uppercase bg-[#2962ff]/10 text-[#0049db] px-2 py-0.5 rounded font-bold">
                      Gemini 3.6 Flash
                    </span>
                  </h3>
                  <p className="text-xs text-[#6A6D78]">
                    Real-time technical indicators, fundamental catalysts & market sentiment breakdown.
                  </p>
                </div>
              </div>

              <button
                onClick={fetchAiInsight}
                disabled={loadingAi}
                className="flex items-center gap-2 bg-[#2962ff] hover:bg-[#0049db] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                {loadingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{aiAnalysis ? "Refresh Analysis" : "Generate Institutional Analysis"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Error view */}
            {aiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {/* AI Analysis Result */}
            {aiAnalysis ? (
              <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-xs text-xs md:text-sm text-[#191b24] space-y-3 leading-relaxed whitespace-pre-wrap font-sans">
                {aiAnalysis}
              </div>
            ) : !loadingAi && (
              <div className="text-center py-6 border border-dashed border-blue-200 rounded-xl bg-white/60 text-xs text-[#6A6D78] space-y-1">
                <p className="font-medium text-[#191b24]">Click to query Gemini for real-time market report on {symbol.name}</p>
                <p>Includes support & resistance levels, risk factors, and momentum ratings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
