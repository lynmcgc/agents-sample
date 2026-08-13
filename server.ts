import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI Financial Analyst endpoint
  app.post("/api/ai-insight", async (req, res) => {
    try {
      const { symbol, name, price, change, category, timeframe } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is missing on server.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Perform a comprehensive, institutional-grade market analysis for the symbol ${symbol} (${name}).
Current Data:
- Price: ${price}
- 24h/1D Change: ${change >= 0 ? "+" : ""}${change}%
- Category: ${category || "General Market"}
- Chart Timeframe: ${timeframe || "1D"}

Provide a structured response containing:
1. Executive Technical & Fundamental Summary (2-3 concise, punchy paragraphs)
2. Market Sentiment Rating: Choice of ["STRONG BUY", "BUY", "NEUTRAL", "SELL", "STRONG SELL"]
3. Key Technical Support & Resistance Levels
4. Top 3 Market Catalysts / Drivers
5. Risk Assessment & Trader Checklist

Keep the tone professional, direct, and actionable like a Wall Street research terminal report.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a Senior Quantitative Strategist and Technical Analyst at an elite financial institution. Your market breakdowns are precise, data-oriented, and formatted cleanly in markdown.",
          temperature: 0.7,
        },
      });

      res.json({
        symbol,
        analysis: response.text || "Analysis generated successfully.",
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error in /api/ai-insight:", err);
      res.status(500).json({
        error: err.message || "Failed to generate AI market insight.",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TradingView Terminal server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
