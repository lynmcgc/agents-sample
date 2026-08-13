import React, { useState, useEffect, useRef } from "react";
import { MarketSymbol } from "../types";
import { Search, X, Star, TrendingUp, TrendingDown } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  symbols,
  onSelectSymbol,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter symbols based on query and category
  const filtered = symbols.filter((s) => {
    const matchesQuery =
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase());

    const matchesCat =
      selectedCategory === "All" ||
      s.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesQuery && matchesCat;
  });

  const categories = ["All", "Stocks", "Crypto", "Forex", "Futures", "Bonds", "ETFs"];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 md:pt-24 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#E0E3EB] bg-[#FAF8FF]">
          <Search className="w-5 h-5 text-[#0049db] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, index, crypto, forex... (e.g. SPX, BTC, Apple)"
            className="w-full text-sm text-[#191b24] placeholder:text-[#6A6D78] bg-transparent outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#6A6D78] hover:text-[#191b24]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-mono text-[#6A6D78] hover:text-[#191b24] border border-[#c3c5d8] px-2 py-0.5 rounded"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-3 border-b border-[#E0E3EB] bg-[#F0F3FA] overflow-x-auto hide-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat
                  ? "bg-[#2962ff] text-white font-semibold"
                  : "bg-white text-[#6A6D78] hover:text-[#191b24] border border-[#E0E3EB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E0E3EB] p-2">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2962ff]/10 text-[#0049db] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {item.badge}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#191b24] group-hover:text-[#0049db] transition-colors font-mono">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-[#6A6D78]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-sm font-bold text-[#191b24]">
                      ${item.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        isPositive ? "text-[#089981]" : "text-[#F23645]"
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-[#6A6D78]">
              No instruments found matching "{query}" in {selectedCategory}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
