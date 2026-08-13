import React from "react";
import { MarketSymbol } from "../types";
import { X, Trash2, Star, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  onRemoveFromWatchlist: (symbolStr: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  symbols,
  onSelectSymbol,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  const watchlistSymbols = symbols.filter((s) => watchlist.includes(s.symbol));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#E0E3EB] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-[#FAF8FF] border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <h3 className="font-bold text-lg text-[#191b24] font-headline">
              My Watchlist ({watchlistSymbols.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6A6D78] hover:text-[#191b24] rounded-full hover:bg-[#F0F3FA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-[#E0E3EB]">
          {watchlistSymbols.length > 0 ? (
            watchlistSymbols.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item);
                    onClose();
                  }}
                  className="pt-2 first:pt-0 flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2962ff]/10 text-[#0049db] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {item.badge}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#191b24] font-mono group-hover:text-[#0049db] transition-colors">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-[#6A6D78]">{item.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(item.symbol);
                      }}
                      className="p-1.5 text-[#6A6D78] hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center space-y-3 text-[#6A6D78] text-xs">
              <Star className="w-10 h-10 mx-auto text-amber-300 stroke-1" />
              <p className="font-semibold text-sm text-[#191b24]">Your Watchlist is empty</p>
              <p>Click the star icon on any index, stock, or crypto to pin it here.</p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#F0F3FA] border-t border-[#E0E3EB] text-center">
          <p className="text-xs text-[#6A6D78]">
            Prices update dynamically. Click any item to inspect interactive charts & AI research.
          </p>
        </div>
      </div>
    </div>
  );
};
