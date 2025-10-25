interface PricingInsightProps {
  city: string;
  category: string;
  averagePrice: string;
  marketTrend?: "growing" | "stable" | "declining";
  lastUpdated?: string;
  factors?: string[];
}

export function PricingInsight({
  city,
  category,
  averagePrice,
  marketTrend = "stable",
  lastUpdated,
  factors,
}: PricingInsightProps) {
  const trendInfo = {
    growing: { emoji: "📈", color: "text-green-600", text: "Market Growing" },
    stable: { emoji: "📊", color: "text-blue-600", text: "Market Stable" },
    declining: {
      emoji: "📉",
      color: "text-orange-600",
      text: "Market Declining",
    },
  };

  const trend = trendInfo[marketTrend];

  return (
    <div className="my-6 bg-white border border-gray-200 rounded-lg p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          💰 {category} Pricing in {city}
        </h3>
        <div className={`flex items-center space-x-1 ${trend.color}`}>
          <span>{trend.emoji}</span>
          <span className="text-sm font-medium">{trend.text}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{averagePrice}</div>
          <div className="text-sm text-blue-700">Average Project Cost</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-lg font-semibold text-gray-700">
            {city} Market
          </div>
          <div className="text-sm text-gray-600">
            Based on 50+ local projects
          </div>
        </div>
      </div>

      {factors && factors.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            💡 Factors affecting pricing:
          </h4>
          <ul className="space-y-1">
            {factors.map((factor, index) => (
              <li
                key={index}
                className="flex items-start text-sm text-gray-600"
              >
                <span className="mr-2 text-blue-500">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lastUpdated && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            🕒 Market data updated: {lastUpdated}
          </div>
        </div>
      )}
    </div>
  );
}
