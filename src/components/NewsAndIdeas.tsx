import React from "react";
import { FINANCIAL_NEWS, MARKET_IDEAS } from "../data/marketData";
import { MessageSquare, ThumbsUp, Newspaper, Flame, ExternalLink } from "lucide-react";

export const NewsAndIdeas: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
      {/* Real-time Market News */}
      <div className="bg-white rounded-xl border border-[#E0E3EB] p-4 md:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E0E3EB] pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#0049db]" />
            <h3 className="font-bold text-lg text-[#191b24] font-headline">
              Market Headlines & Sentiment
            </h3>
          </div>
          <span className="text-xs text-[#089981] font-mono font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping"></span>
            LIVE FEED
          </span>
        </div>

        <div className="space-y-3">
          {FINANCIAL_NEWS.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-[#E0E3EB] hover:border-[#2962ff] hover:bg-[#F0F3FA] transition-all cursor-pointer group space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#0049db] font-bold">{item.source}</span>
                <span className="text-[#6A6D78]">{item.timeAgo}</span>
              </div>

              <h4 className="font-bold text-sm text-[#191b24] group-hover:text-[#0049db] transition-colors leading-snug">
                {item.title}
              </h4>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#6A6D78] font-mono">{item.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    item.sentiment === "bullish"
                      ? "bg-[#089981]/10 text-[#089981]"
                      : item.sentiment === "bearish"
                      ? "bg-[#F23645]/10 text-[#F23645]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Trading Ideas */}
      <div className="bg-white rounded-xl border border-[#E0E3EB] p-4 md:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E0E3EB] pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg text-[#191b24] font-headline">
              Community Analysis & Ideas
            </h3>
          </div>
          <span className="text-xs text-[#6A6D78] font-mono">Top Traders</span>
        </div>

        <div className="space-y-4">
          {MARKET_IDEAS.map((idea) => (
            <div
              key={idea.id}
              className="p-4 rounded-xl border border-[#E0E3EB] hover:border-[#2962ff] transition-all space-y-2 bg-[#FAF8FF]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={idea.authorAvatar}
                    alt={idea.author}
                    className="w-7 h-7 rounded-full object-cover border border-[#E0E3EB]"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#191b24]">
                      {idea.author}
                    </span>
                    <span className="text-[10px] text-[#6A6D78] block font-mono">
                      {idea.timeAgo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-[#0049db] bg-[#2962ff]/10 px-2 py-0.5 rounded">
                    {idea.symbol} ({idea.timeframe})
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      idea.direction === "Long"
                        ? "bg-[#089981] text-white"
                        : "bg-[#F23645] text-white"
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-sm text-[#191b24]">{idea.title}</h4>
              <p className="text-xs text-[#434656] line-clamp-2">{idea.summary}</p>

              <div className="flex items-center justify-between pt-2 border-t border-[#E0E3EB] text-xs text-[#6A6D78] font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-[#0049db] cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {idea.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#0049db] cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {idea.comments}
                  </span>
                </div>
                <span className="text-[#0049db] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer">
                  View Chart <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
