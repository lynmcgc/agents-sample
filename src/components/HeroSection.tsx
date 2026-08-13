import React from "react";
import { MarketCategory, MarketSymbol } from "../types";

interface HeroSectionProps {
  activeCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  symbols,
  onSelectSymbol,
}) => {
  const categories: MarketCategory[] = [
    "US stocks",
    "World stocks",
    "Crypto",
    "Futures",
    "Forex",
    "Government bonds",
    "Corporate bonds",
    "ETFs",
    "Economy",
  ];

  // Ticker tape symbols for quick overview
  const tickerTape = symbols.slice(0, 8);

  return (
    <section className="text-center space-y-6 pt-4">
      {/* Live Market Ticker Tape */}
      <div className="w-full overflow-x-auto hide-scrollbar py-2 bg-[#F0F3FA] border-y border-[#E0E3EB] rounded-lg">
        <div className="flex items-center gap-6 px-4 min-w-max text-xs font-mono">
          <div className="flex items-center gap-1.5 font-bold text-[#0049db] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse-slow"></span>
            LIVE MARKETS:
          </div>
          {tickerTape.map((item) => {
            const isPositive = item.change >= 0;
            return (
              <button
                key={item.symbol}
                onClick={() => onSelectSymbol(item)}
                className="flex items-center gap-2 hover:bg-white/80 px-2.5 py-1 rounded-md transition-colors"
              >
                <span className="font-bold text-[#191b24]">{item.symbol}</span>
                <span className="text-[#434656]">${item.price.toLocaleString()}</span>
                <span
                  className={`font-semibold flex items-center gap-0.5 ${
                    isPositive ? "text-[#089981]" : "text-[#F23645]"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {item.changePercent}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Headline with Dropdown arrow */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold font-headline flex justify-center items-center gap-2 text-[#191b24] tracking-tight">
          Markets, everywhere
          <span className="material-symbols-outlined text-3xl md:text-4xl text-[#434656] cursor-pointer hover:text-[#0049db] transition-colors">
            expand_more
          </span>
        </h1>
        <p className="text-xs md:text-sm text-[#6A6D78] max-w-xl mx-auto font-sans">
          Track real-time market data across global equities, digital assets, commodities, foreign exchange, and fixed income.
        </p>
      </div>

      {/* Market Category Tabs matching screenshot styling */}
      <div className="flex justify-center overflow-x-auto hide-scrollbar px-2 py-1">
        <div className="flex items-center p-1 bg-[#F0F3FA] rounded-full gap-1 border border-[#E0E3EB]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white text-[#191b24] shadow-sm font-semibold"
                    : "text-[#6A6D78] hover:text-[#191b24]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
