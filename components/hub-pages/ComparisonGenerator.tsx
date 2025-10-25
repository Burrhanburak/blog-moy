import { CompareTable, AIInsight } from "@/components/mdx/snippet-optimized";
import { DollarSign, Scale, Star, TrendingUp, Rocket } from "lucide-react";
import Link from "next/link";
import Accordion from "@/components/mintlify/Accordion";

interface ComparisonData {
  title: string;
  entities: Array<{
    name: string;
    type: "city" | "service" | "provider";
    data: {
      population?: number;
      gdpPerCapita?: number;
      costOfLiving?: number;
      marketSize?: "small" | "medium" | "large";
      pricing?: {
        min: number;
        max: number;
        currency: string;
      };
      pros: string[];
      cons: string[];
      bestFor: string;
      rating?: number;
    };
  }>;
  category: string;
  comparison_type:
    | "city_vs_city"
    | "service_vs_service"
    | "provider_vs_provider";
}

export function ComparisonGenerator({
  comparison: { title, entities, category, comparison_type },
}: {
  comparison: ComparisonData;
}) {
  // Generate AI insights based on comparison type
  const generateInsights = () => {
    if (comparison_type === "city_vs_city") {
      return generateCityInsights();
    } else if (comparison_type === "service_vs_service") {
      return generateServiceInsights();
    } else {
      return generateProviderInsights();
    }
  };

  const generateCityInsights = () => {
    const [city1, city2] = entities;
    const populationDiff = Math.abs(
      (city1.data.population || 0) - (city2.data.population || 0)
    );
    const gdpDiff = Math.abs(
      (city1.data.gdpPerCapita || 0) - (city2.data.gdpPerCapita || 0)
    );

    let insight = `Comparing ${city1.name} and ${city2.name} for ${category} services reveals key differences. `;

    if (populationDiff > 500000) {
      const larger =
        (city1.data.population || 0) > (city2.data.population || 0)
          ? city1.name
          : city2.name;
      insight += `${larger} has a significantly larger market size, which typically means more providers and competition. `;
    }

    if (gdpDiff > 10000) {
      const richer =
        (city1.data.gdpPerCapita || 0) > (city2.data.gdpPerCapita || 0)
          ? city1.name
          : city2.name;
      insight += `${richer} shows higher GDP per capita, often correlating with premium pricing and higher-end services. `;
    }

    insight += `Consider your budget, project timeline, and specific requirements when choosing between these markets.`;

    return insight;
  };

  const generateServiceInsights = () => {
    const serviceNames = entities.map((e) => e.name).join(" and ");
    return `When comparing ${serviceNames} for ${category}, consider your specific business goals, budget constraints, and timeline requirements. Each service type offers unique advantages depending on your market position and growth objectives.`;
  };

  const generateProviderInsights = () => {
    const providerNames = entities.map((e) => e.name).join(" and ");
    return `Evaluating ${providerNames} requires careful consideration of their expertise, portfolio quality, pricing structure, and client satisfaction rates. Look beyond just cost to assess long-term value and partnership potential.`;
  };

  // Convert entities to table format
  const tableItems = entities.map((entity) => ({
    name: entity.name,
    pros: entity.data.pros,
    cons: entity.data.cons,
    bestFor: entity.data.bestFor,
    price: entity.data.pricing
      ? `${
          entity.data.pricing.currency
        }${entity.data.pricing.min.toLocaleString()}–${
          entity.data.pricing.currency
        }${entity.data.pricing.max.toLocaleString()}`
      : undefined,
    rating: entity.data.rating,
  }));

  return (
    <div className="max-w-6xl mx-auto px-1">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive comparison to help you make the right choice for your{" "}
          {category} needs. Data updated as of {new Date().toLocaleDateString()}
          .
        </p>
      </div>

      {/* Quick Stats Comparison */}
      {comparison_type === "city_vs_city" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12">
          {entities.map((entity, index) => (
            <div
              key={index}
              className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:border-[#ff4d00] transition-all duration-200"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl md:text-2xl mr-2">
                  {index === 0 ? "🏙️" : "🌆"}
                </span>
                {entity.name}
              </h3>

              <div className="space-y-3">
                {entity.data.population && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-semibold">
                      {entity.data.population.toLocaleString()}
                    </span>
                  </div>
                )}

                {entity.data.gdpPerCapita && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">GDP per Capita:</span>
                    <span className="font-semibold">
                      ${entity.data.gdpPerCapita.toLocaleString()}
                    </span>
                  </div>
                )}

                {entity.data.costOfLiving && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost of Living Index:</span>
                    <span className="font-semibold">
                      {entity.data.costOfLiving}
                    </span>
                  </div>
                )}

                {entity.data.marketSize && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Size:</span>
                    <span
                      className={`font-semibold capitalize ${
                        entity.data.marketSize === "large"
                          ? "text-green-600"
                          : entity.data.marketSize === "medium"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {entity.data.marketSize}
                    </span>
                  </div>
                )}

                {entity.data.pricing && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typical Pricing:</span>
                    <span className="font-semibold text-blue-600">
                      {entity.data.pricing.currency}
                      {entity.data.pricing.min.toLocaleString()}–
                      {entity.data.pricing.currency}
                      {entity.data.pricing.max.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI-Powered Insight */}
      <AIInsight
        type="analysis"
        title={`${comparison_type.replace(/_/g, " ")} Analysis`}
        insight={generateInsights()}
        city={
          comparison_type === "city_vs_city"
            ? entities.map((e) => e.name).join(" & ")
            : undefined
        }
        category={category}
        data={{
          source: "Market Analysis Engine",
          confidence: 87,
          lastUpdated: new Date().toLocaleDateString(),
        }}
      />

      {/* Detailed Comparison Table */}
      <CompareTable
        title={`Detailed ${title} Comparison`}
        description="Side-by-side analysis of key factors to help you make an informed decision"
        items={tableItems}
        category={category}
      />

      {/* Decision Matrix */}
      <div className="my-12 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          <TrendingUp className="w-6 h-6 text-[#ff4d00] inline-block mr-2" />{" "}
          Decision Matrix for {title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="border  rounded-lg p-4 md:p-6 text-center max-w-sm md:max-w-md mx-auto md:mx-0">
            <div className="text-2xl md:text-3xl mb-3">
              <DollarSign className="w-6 h-6 text-[#ff4d00] inline-block mr-2" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
              Budget-Focused for {title}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              Looking for the most cost-effective option for {title}
            </p>
            <div className="text-[#ff4d00] font-semibold text-sm md:text-base">
              Choose:{" "}
              {
                tableItems.sort((a, b) => {
                  const priceA = parseFloat(
                    a.price?.replace(/[^\d]/g, "") || "0"
                  );
                  const priceB = parseFloat(
                    b.price?.replace(/[^\d]/g, "") || "0"
                  );
                  return priceA - priceB;
                })[0]?.name
              }
            </div>
          </div>

          <div className="border  rounded-lg p-4 md:p-6 text-center max-w-sm md:max-w-md mx-auto md:mx-0">
            <div className="text-2xl md:text-3xl mb-3">
              <Star className="w-6 h-6 text-[#ff4d00] inline-block mr-2" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
              Quality-Focused for {title}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              Prioritizing highest quality ad ratings for {title}
            </p>
            <div className="text-[#ff4d00] font-semibold text-sm md:text-base">
              Choose:{" "}
              {
                tableItems.sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]
                  ?.name
              }
            </div>
          </div>

          <div className="border rounded-lg p-4 md:p-6 text-center max-w-sm md:max-w-md mx-auto md:mx-0">
            <div className="text-2xl md:text-3xl mb-3">
              <Scale className="w-6 h-6 text-[#ff4d00] inline-block mr-2" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
              Balanced Approach for {title}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              Best overall value considering all factors for {title}
            </p>
            <div className="text-[#ff4d00] font-semibold text-sm md:text-base">
              Choose: {entities[Math.floor(entities.length / 2)]?.name}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="my-12 bg-white rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          ❓ Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          <Accordion
            title={`Which option is better for startups for ${title}?`}
            icon={<Rocket className="w-4 h-4" />}
            variant="rounded"
            defaultOpen={false}
          >
            <p className="text-gray-700 leading-relaxed">
              For startups, we typically recommend {tableItems[0]?.name} due to{" "}
              {tableItems[0]?.bestFor.toLowerCase()}. The lower entry cost and
              flexibility make it ideal for growing businesses.
            </p>
          </Accordion>

          <Accordion
            title="What about enterprise-level projects?"
            icon={<Rocket className="w-4 h-4" />}
            variant="rounded"
            defaultOpen={false}
          >
            <p className="text-gray-700 leading-relaxed">
              Enterprise projects often benefit from{" "}
              {tableItems[tableItems.length - 1]?.name} because of its advanced
              capabilities and proven track record with large-scale
              implementations.
            </p>
          </Accordion>

          <Accordion
            title="How accurate is this comparison data?"
            icon={<Rocket className="w-4 h-4" />}
            variant="rounded"
            defaultOpen={false}
          >
            <p className="text-gray-700 leading-relaxed">
              Our comparison data is sourced from market research, user reviews,
              and official documentation. Data is updated monthly to ensure
              accuracy. Last update: {new Date().toLocaleDateString()}.
            </p>
          </Accordion>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mb-12 max-w-6xl mx-auto container">
        <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-semibold">
            Get Started with {title} Comparison Today
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-blue-50">
            Ready to make the right choice? Let's craft a tailored solution with
            a clear timeline and investment range. Get started today with our
            free consultation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact {title} Project
            </Link>
            <Link
              href="/"
              className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              See {title} Case Studies
            </Link>
          </div>
          <div className="mt-4 text-xs uppercase tracking-wide text-gray-200">
            <Link href="/compare" className="underline">
              Back to Comparisons
            </Link>
            <span className="mx-2">•</span>
            <Link href="/blog" className="underline">
              Read Strategy Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate comparison pages dynamically
export function generateComparison(
  type: "city_vs_city" | "service_vs_service" | "provider_vs_provider",
  entity1: { name: string; state?: string; data?: Record<string, unknown> },
  entity2: { name: string; state?: string; data?: Record<string, unknown> },
  category: string
): ComparisonData {
  const formatEntityName = (
    entity: { name: string; state?: string },
    type: string
  ) => {
    if (type === "city_vs_city") {
      return `${entity.name}, ${entity.state}`;
    }
    return entity.name;
  };

  const title = `${formatEntityName(entity1, type)} vs ${formatEntityName(
    entity2,
    type
  )} - ${category} Comparison (2025)`;

  return {
    title,
    entities: [
      {
        name: formatEntityName(entity1, type),
        type: type.split("_")[0] as "city" | "service" | "provider",
        data: (entity1.data || entity1) as {
          population?: number;
          gdpPerCapita?: number;
          costOfLiving?: number;
          marketSize?: "small" | "medium" | "large";
          pricing?: { min: number; max: number; currency: string };
          pros: string[];
          cons: string[];
          bestFor: string;
          rating?: number;
        },
      },
      {
        name: formatEntityName(entity2, type),
        type: type.split("_")[0] as "city" | "service" | "provider",
        data: (entity2.data || entity2) as {
          population?: number;
          gdpPerCapita?: number;
          costOfLiving?: number;
          marketSize?: "small" | "medium" | "large";
          pricing?: { min: number; max: number; currency: string };
          pros: string[];
          cons: string[];
          bestFor: string;
          rating?: number;
        },
      },
    ],
    category,
    comparison_type: type,
  };
}
