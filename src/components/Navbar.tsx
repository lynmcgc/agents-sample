import React, { useState } from "react";
import { Search, Globe, User, Star, TrendingUp } from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
}) => {
  const [activeNav, setActiveNav] = useState("Markets");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "DE", name: "Deutsch" },
    { code: "FR", name: "Français" },
    { code: "JP", name: "日本語" },
  ];

  return (
    <header className="bg-[#faf8ff] border-b border-[#c3c5d8] flex justify-between items-center w-full px-4 md:px-8 h-12 sticky top-0 z-40">
      {/* Left section: Logo, Search, Nav links */}
      <div className="flex items-center gap-6">
        <a
          href="/"
          onClick={(e) => e.preventDefault()}
          className="text-xl font-bold font-headline text-[#191b24] flex items-center gap-1.5 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[#0049db] font-bold text-2xl">
            stacked_line_chart
          </span>
          <span className="tracking-tight hidden sm:inline">TradingView</span>
        </a>

        {/* Quick Search Trigger */}
        <div className="relative hidden lg:flex items-center">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 pl-3 pr-4 py-1.5 bg-[#F0F3FA] border border-[#E0E3EB] rounded-full text-sm text-[#434656] hover:border-[#0049db] hover:bg-white transition-all w-64 text-left group"
          >
            <Search className="w-4 h-4 text-[#6A6D78] group-hover:text-[#0049db] transition-colors" />
            <span className="flex-1 text-[#6A6D78]">Search (Ctrl+K)</span>
            <kbd className="hidden xl:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-white border border-[#c3c5d8] rounded text-[#6A6D78]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {["Products", "Community", "Markets", "Brokers", "More"].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`text-sm transition-colors relative py-1 ${
                  isActive
                    ? "text-[#0049db] font-bold"
                    : "text-[#434656] hover:text-[#0049db] font-medium"
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0049db] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right section: Search Mobile, Watchlist, Language, Profile, Get Started */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="lg:hidden p-1.5 text-[#434656] hover:text-[#0049db] transition-colors rounded-full hover:bg-[#F0F3FA]"
          title="Search Markets"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Watchlist Drawer Button */}
        <button
          onClick={onOpenWatchlist}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-[#434656] hover:text-[#0049db] hover:bg-[#F0F3FA] transition-colors"
          title="My Watchlist"
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span className="hidden sm:inline">Watchlist</span>
          {watchlistCount > 0 && (
            <span className="bg-[#2962ff] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full font-mono">
              {watchlistCount}
            </span>
          )}
        </button>

        {/* Language dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="hidden sm:flex items-center gap-1 text-[#434656] hover:text-[#0049db] transition-colors p-1.5 rounded-full hover:bg-[#F0F3FA]"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-semibold">{currentLang}</span>
          </button>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-[#E0E3EB] rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F0F3FA] ${
                    currentLang === lang.code ? "font-bold text-[#0049db]" : "text-[#191b24]"
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-[10px] text-[#6A6D78] font-mono">{lang.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User Profile"
            className="text-[#434656] hover:text-[#0049db] transition-colors p-1.5 rounded-full hover:bg-[#F0F3FA]"
          >
            <User className="w-5 h-5" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E0E3EB] rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-[#E0E3EB]">
                <p className="text-xs font-bold text-[#191b24]">Trader Pro Account</p>
                <p className="text-[11px] text-[#6A6D78]">rhondamcgladdery@gmail.com</p>
              </div>
              <a
                href="#profile"
                onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                className="block px-4 py-2 text-xs text-[#434656] hover:bg-[#F0F3FA]"
              >
                Account & Settings
              </a>
              <a
                href="#alerts"
                onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                className="block px-4 py-2 text-xs text-[#434656] hover:bg-[#F0F3FA]"
              >
                Price Alerts & Notifications
              </a>
              <a
                href="#billing"
                onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                className="block px-4 py-2 text-xs text-[#434656] hover:bg-[#F0F3FA]"
              >
                Terminal Subscription
              </a>
            </div>
          )}
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => alert("Welcome to TradingView Terminal! Enjoy full market features.")}
          className="hidden sm:inline-flex bg-[#2962ff] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#0049db] active:scale-95 transition-all shadow-sm"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
