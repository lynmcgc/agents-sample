import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { IndicesGrid } from "./components/IndicesGrid";
import { MarketTables } from "./components/MarketTables";
import { NewsAndIdeas } from "./components/NewsAndIdeas";
import { SymbolModal } from "./components/SymbolModal";
import { SearchModal } from "./components/SearchModal";
import { WatchlistDrawer } from "./components/WatchlistDrawer";
import { Footer } from "./components/Footer";
import { MARKET_SYMBOLS } from "./data/marketData";
import { MarketCategory, MarketSymbol } from "./types";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>("US stocks");
  const [selectedSymbol, setSelectedSymbol] = useState<MarketSymbol | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist persistent local storage
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("tradingview_watchlist");
      return saved ? JSON.parse(saved) : ["SPX", "NASDAQ:NDX", "BTCUSD", "AAPL", "NVDA"];
    } catch {
      return ["SPX", "NASDAQ:NDX", "BTCUSD", "AAPL", "NVDA"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tradingview_watchlist", JSON.stringify(watchlist));
    } catch (e) {
      console.error("Failed to save watchlist to localStorage:", e);
    }
  }, [watchlist]);

  // Global Ctrl+K / Cmd+K keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleWatchlist = (symbolStr: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(symbolStr)
        ? prev.filter((s) => s !== symbolStr)
        : [...prev, symbolStr]
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b24] font-body-md antialiased flex flex-col selection:bg-[#2962ff] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 flex-1">
        {/* Hero Section & Category Tabs */}
        <HeroSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          symbols={MARKET_SYMBOLS}
          onSelectSymbol={setSelectedSymbol}
        />

        {/* Featured Indices / Instruments Grid */}
        <IndicesGrid
          activeCategory={activeCategory}
          symbols={MARKET_SYMBOLS}
          onSelectSymbol={setSelectedSymbol}
          watchlist={watchlist}
          onToggleWatchlist={toggleWatchlist}
        />

        {/* Screener & Leaderboard Tables */}
        <MarketTables
          symbols={MARKET_SYMBOLS}
          onSelectSymbol={setSelectedSymbol}
          watchlist={watchlist}
          onToggleWatchlist={toggleWatchlist}
        />

        {/* Market News & Trading Ideas */}
        <NewsAndIdeas />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <SymbolModal
        symbol={selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        symbols={MARKET_SYMBOLS}
        onSelectSymbol={setSelectedSymbol}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        symbols={MARKET_SYMBOLS}
        onSelectSymbol={setSelectedSymbol}
        onRemoveFromWatchlist={(symbolStr) =>
          setWatchlist((prev) => prev.filter((s) => s !== symbolStr))
        }
      />
    </div>
  );
}
