import React from "react";
import { MarketCategory, MarketSymbol } from "../types";
import { Star, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";

interface IndicesGridProps {
  activeCategory: MarketCategory;
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  watchlist: string[];
  onToggleWatchlist: (symbolStr: string, e: React.MouseEvent) => void;
}

export const IndicesGrid: React.FC<IndicesGridProps> = ({
  activeCategory,
  symbols,
  onSelectSymbol,
  watchlist,
  onToggleWatchlist,
}) => {
  // Filter symbols for active category
  const categorySymbols = symbols.filter(
    (s) => s.category === activeCategory
  );

  // Fallback to top symbols if none found
  const displaySymbols =
    categorySymbols.length > 0 ? categorySymbols : symbols.slice(0, 6);

  // Helper for badge bg color matching HTML specs
  const getBadgeBg = (symbol: MarketSymbol) => {
    if (symbol.badgeColor === "red") return "bg-[#F23645] text-white";
    if (symbol.badgeColor === "blue") return "bg-[#2962ff] text-white";
    if (symbol.badgeColor === "orange") return "bg-amber-500 text-white";
    if (symbol.badgeColor === "purple") return "bg-purple-600 text-white";
    if (symbol.badgeColor === "green") return "bg-[#089981] text-white";
    return "bg-[#004ee8] text-white";
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-headline flex items-center gap-1 group cursor-pointer hover:text-[#0049db] transition-colors w-fit text-[#191b24]">
          {activeCategory === "US stocks" ? "Indices" : activeCategory}
          <span className="material-symbols-outlined opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xl">
            chevron_right
          </span>
        </h2>

        <span className="text-xs text-[#6A6D78] font-mono">
          {displaySymbols.length} Instruments
        </span>
      </div>

      {/* Grid of Cards matching the TradingView design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displaySymbols.map((item) => {
          const isPositive = item.change >= 0;
          const isStarred = watchlist.includes(item.symbol);

          // Sparkline coordinates helper
          const min = Math.min(...item.sparkline);
          const max = Math.max(...item.sparkline);
          const range = max - min || 1;
          const points = item.sparkline
            .map((val, idx) => {
              const x = (idx / (item.sparkline.length - 1)) * 80;
              const y = 28 - ((val - min) / range) * 24;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item)}
              className="group relative bg-white hover:bg-[#F0F3FA] rounded-xl p-4 border border-[#E0E3EB] transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between gap-3"
            >
              {/* Top row: Badge, Symbol Title, Star Watchlist button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Circular Badge matching TradingView prompt */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs font-mono tracking-tight shrink-0 shadow-xs ${getBadgeBg(
                      item
                    )}`}
                  >
                    {item.badge}
                  </div>

                  <div>
                    <div className="font-bold text-[#191b24] text-sm group-hover:text-[#0049db] transition-colors flex items-center gap-1.5">
                      <span>{item.name}</span>
                    </div>
                    <div className="text-xs text-[#6A6D78] font-mono">
                      {item.symbol}
                    </div>
                  </div>
                </div>

                {/* Star toggle */}
                <button
                  onClick={(e) => onToggleWatchlist(item.symbol, e)}
                  className="p-1.5 text-[#6A6D78] hover:text-amber-500 rounded-full hover:bg-white transition-colors"
                  title={isStarred ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <Star
                    className={`w-4 h-4 ${
                      isStarred ? "fill-amber-400 text-amber-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Bottom row: Price, Change %, Mini SVG Sparkline */}
              <div className="flex items-end justify-between gap-2 pt-1">
                <div>
                  <div className="text-lg font-bold text-[#191b24] font-mono">
                    {item.unit === "%" ? "" : "$"}
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.price < 10 ? 3 : 2,
                      maximumFractionDigits: item.price < 10 ? 4 : 2,
                    })}
                    {item.unit ? ` ${item.unit}` : ""}
                  </div>

                  <div
                    className={`text-xs font-semibold font-mono flex items-center gap-1 ${
                      isPositive ? "text-[#089981]" : "text-[#F23645]"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isPositive ? "+" : ""}
                      {item.change} ({isPositive ? "+" : ""}
                      {item.changePercent}%)
                    </span>
                  </div>
                </div>

                {/* SVG Mini Sparkline */}
                <div className="w-20 h-8 shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 80 30">
                    <polyline
                      fill="none"
                      stroke={isPositive ? "#089981" : "#F23645"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
