import React, { useState } from "react";
import { MarketSymbol } from "../types";
import { TrendingUp, TrendingDown, ArrowUpDown, Star, Activity, Sparkles } from "lucide-react";

interface MarketTablesProps {
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  watchlist: string[];
  onToggleWatchlist: (symbolStr: string, e: React.MouseEvent) => void;
}

export const MarketTables: React.FC<MarketTablesProps> = ({
  symbols,
  onSelectSymbol,
  watchlist,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "gainers" | "active" | "crypto">("all");
  const [sortField, setSortField] = useState<"symbol" | "price" | "changePercent">("changePercent");
  const [sortAsc, setSortAsc] = useState(false);

  // Filter based on tab
  let filtered = [...symbols];
  if (activeTab === "gainers") {
    filtered = filtered.filter((s) => s.changePercent > 0);
  } else if (activeTab === "crypto") {
    filtered = filtered.filter((s) => s.category === "Crypto");
  } else if (activeTab === "active") {
    filtered = filtered.slice(0, 10);
  }

  // Sort logic
  filtered.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === "string") valA = (valA as string).toLowerCase();
    if (typeof valB === "string") valB = (valB as string).toLowerCase();

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field: "symbol" | "price" | "changePercent") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-[#E0E3EB] p-4 md:p-6 space-y-4 shadow-xs">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E0E3EB] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0049db]" />
          <h3 className="font-bold text-lg text-[#191b24] font-headline">
            Market Screener & Leaderboard
          </h3>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center bg-[#F0F3FA] p-1 rounded-lg border border-[#E0E3EB] text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "all"
                ? "bg-white text-[#191b24] font-bold shadow-xs"
                : "text-[#6A6D78] hover:text-[#191b24]"
            }`}
          >
            All Instruments
          </button>
          <button
            onClick={() => setActiveTab("gainers")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "gainers"
                ? "bg-white text-[#089981] font-bold shadow-xs"
                : "text-[#6A6D78] hover:text-[#191b24]"
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab("crypto")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "crypto"
                ? "bg-white text-[#0049db] font-bold shadow-xs"
                : "text-[#6A6D78] hover:text-[#191b24]"
            }`}
          >
            Crypto Leaders
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-[#E0E3EB] text-[#6A6D78] font-mono uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3 font-semibold">Fav</th>
              <th
                onClick={() => handleSort("symbol")}
                className="py-2.5 px-3 font-semibold cursor-pointer hover:text-[#0049db] transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol & Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort("price")}
                className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#0049db] transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort("changePercent")}
                className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#0049db] transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 font-semibold text-right hidden md:table-cell">
                24h High / Low
              </th>
              <th className="py-2.5 px-3 font-semibold text-right hidden lg:table-cell">
                Volume
              </th>
              <th className="py-2.5 px-3 font-semibold text-center">Analyze</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB]">
            {filtered.map((item) => {
              const isPositive = item.change >= 0;
              const isStarred = watchlist.includes(item.symbol);

              return (
                <tr
                  key={item.symbol}
                  onClick={() => onSelectSymbol(item)}
                  className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                >
                  {/* Favorite button */}
                  <td
                    className="py-3 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(item.symbol, e);
                    }}
                  >
                    <button className="text-[#6A6D78] hover:text-amber-500 transition-colors">
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isStarred ? "fill-amber-400 text-amber-500" : ""
                        }`}
                      />
                    </button>
                  </td>

                  {/* Symbol & Name */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#2962ff]/10 text-[#0049db] flex items-center justify-center font-bold text-[10px] font-mono shrink-0">
                        {item.badge}
                      </div>
                      <div>
                        <div className="font-bold text-[#191b24] group-hover:text-[#0049db] transition-colors font-mono text-sm">
                          {item.symbol}
                        </div>
                        <div className="text-[11px] text-[#6A6D78] line-clamp-1">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-sm text-[#191b24]">
                    {item.unit === "%" ? "" : "$"}
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.price < 10 ? 3 : 2,
                    })}
                    {item.unit ? ` ${item.unit}` : ""}
                  </td>

                  {/* Change */}
                  <td className="py-3 px-3 text-right font-mono font-semibold">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${
                        isPositive
                          ? "bg-[#089981]/10 text-[#089981]"
                          : "bg-[#F23645]/10 text-[#F23645]"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {isPositive ? "+" : ""}
                        {item.changePercent}%
                      </span>
                    </div>
                  </td>

                  {/* 24h High / Low */}
                  <td className="py-3 px-3 text-right font-mono text-[#434656] hidden md:table-cell">
                    <div className="text-xs">
                      H: ${item.high.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#6A6D78]">
                      L: ${item.low.toLocaleString()}
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="py-3 px-3 text-right font-mono text-[#6A6D78] hidden lg:table-cell">
                    {item.volume}
                  </td>

                  {/* Analyze button */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSymbol(item);
                      }}
                      className="p-1.5 bg-[#2962ff]/10 text-[#0049db] hover:bg-[#2962ff] hover:text-white rounded-lg transition-all"
                      title="Inspect Chart & AI Analysis"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
