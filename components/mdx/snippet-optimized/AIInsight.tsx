import { BookOpen } from "lucide-react";

interface AIInsightProps {
  title: string;
  insight: string;
  data?: {
    source: string;
    confidence: number;
    lastUpdated: string;
  };
  type?: "market" | "trend" | "prediction" | "analysis";
  city?: string;
  category?: string;
}

export function AIInsight({
  title,
  insight,
  data,
  type = "analysis",
  city,
  category,
}: AIInsightProps) {
  const typeConfig = {
    market: {
      emoji: "📊",
      bg: "bg-blue-50 border-blue-200",
      accent: "text-blue-700",
      label: "Market Analysis",
    },
    trend: {
      emoji: "📈",
      bg: "bg-green-50 border-green-200",
      accent: "text-green-700",
      label: "Trend Insight",
    },
    prediction: {
      emoji: "🔮",
      bg: "bg-purple-50 border-purple-200",
      accent: "text-purple-700",
      label: "Market Prediction",
    },
    analysis: {
      emoji: "🧠",
      bg: "bg-gray-50 border-gray-200",
      accent: "text-gray-700",
      label: "AI Analysis",
    },
  };

  const config = typeConfig[type];
  const confidenceColor =
    (data?.confidence || 0) >= 80
      ? "text-green-600"
      : (data?.confidence || 0) >= 60
      ? "text-yellow-600"
      : "text-orange-600";

  return (
    <div
      className={`my-8 rounded-lg  ${config.bg} overflow-hidden`}
      itemScope
      itemType="https://schema.org/AnalysisNewsArticle"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{config.emoji}</span>
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                {config.label}
              </div>
              <h3
                className={`text-lg font-bold ${config.accent}`}
                itemProp="headline"
              >
                {title}
              </h3>
            </div>
          </div>

          {data?.confidence && (
            <div className="text-right">
              <div className="text-xs text-gray-500">Confidence</div>
              <div className={`text-sm font-semibold ${confidenceColor}`}>
                {data.confidence}%
              </div>
            </div>
          )}
        </div>

        <div
          className={`${config.accent} leading-relaxed text-base`}
          itemProp="articleBody"
        >
          {insight}
        </div>

        {(city || category) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {city && (
                <span className="flex items-center">
                  📍 <span className="ml-1">{city} Market</span>
                </span>
              )}
              {category && (
                <span className="flex items-center">
                  🏷️ <span className="ml-1">{category}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {data && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>
                  <BookOpen className="w-4 h-4 text-[#ff4d00] inline-block mr-2" />{" "}
                  Source: {data.source}
                </span>
                <span>🕒 Updated: {data.lastUpdated}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🤖</span>
                <span>AI-Generated Insight</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Specialized variants for common use cases
export function MarketInsight({
  city,
  category,
  growth,
  competition,
  opportunity,
}: {
  city: string;
  category: string;
  growth: string;
  competition: "low" | "medium" | "high";
  opportunity: string;
}) {
  const competitionEmoji = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
  };

  return (
    <AIInsight
      type="market"
      title={`${category} Market in ${city}`}
      insight={`Market growth: ${growth}. Competition level: ${competition} ${competitionEmoji[competition]}. Key opportunity: ${opportunity}`}
      city={city}
      category={category}
      data={{
        source: "Market Research Database",
        confidence: 85,
        lastUpdated: new Date().toLocaleDateString(),
      }}
    />
  );
}

export function TrendInsight({
  title,
  trend,
  impact,
  timeline,
}: {
  title: string;
  trend: string;
  impact: "low" | "medium" | "high";
  timeline: string;
}) {
  const impactEmoji = {
    low: "📝",
    medium: "📈",
    high: "🚀",
  };

  return (
    <AIInsight
      type="trend"
      title={title}
      insight={`${trend} Expected impact: ${impact} ${impactEmoji[impact]}. Timeline: ${timeline}`}
      data={{
        source: "Industry Trend Analysis",
        confidence: 78,
        lastUpdated: new Date().toLocaleDateString(),
      }}
    />
  );
}

export function PredictionInsight({
  title,
  prediction,
  probability,
  factors,
}: {
  title: string;
  prediction: string;
  probability: number;
  factors: string[];
}) {
  return (
    <AIInsight
      type="prediction"
      title={title}
      insight={`${prediction} Key factors: ${factors.join(", ")}.`}
      data={{
        source: "Predictive Analytics Model",
        confidence: probability,
        lastUpdated: new Date().toLocaleDateString(),
      }}
    />
  );
}
