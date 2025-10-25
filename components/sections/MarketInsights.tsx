interface MarketInsightsProps {
  city: string;
  dynamicMarketInsights: string;
}

export function MarketInsights({ city, dynamicMarketInsights }: MarketInsightsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Market Insights for {city}
      </h2>
      
      <div dangerouslySetInnerHTML={{ __html: dynamicMarketInsights }} />
    </section>
  );
}
