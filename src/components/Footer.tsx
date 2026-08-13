import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-4 md:px-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f3f2ff] border-t border-[#c3c5d8] text-[#6A6D78] text-xs">
      <div className="flex items-center gap-2 font-headline font-bold text-lg text-[#191b24]">
        <span className="material-symbols-outlined text-[#0049db] text-xl">
          stacked_line_chart
        </span>
        <span>TradingView</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
        <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#0049db] transition-colors">
          Terms of Service
        </a>
        <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#0049db] transition-colors">
          Privacy Policy
        </a>
        <a href="#disclaimer" onClick={(e) => e.preventDefault()} className="hover:text-[#0049db] transition-colors">
          Financial Disclaimer
        </a>
        <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-[#0049db] transition-colors">
          Data Feed Status: <span className="text-[#089981] font-bold">100% Operational</span>
        </a>
      </div>

      <div className="text-right font-mono text-[11px]">
        <span>© 2026 TradingView, Inc.</span>
      </div>
    </footer>
  );
};
