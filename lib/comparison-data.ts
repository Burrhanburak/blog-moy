import { categories, getCategoryByKey } from "@/config/categories-new";
import { getAllCountries, unslugify } from "@/lib/url-utils";
import {
  HIGH_VALUE_MARKETS,
  MEDIUM_VALUE_MARKETS,
  type GeoTargeting,
} from "@/lib/geo-optimization";

const ALL_MARKETS: GeoTargeting[] = [
  ...HIGH_VALUE_MARKETS,
  ...MEDIUM_VALUE_MARKETS,
];

interface ComparisonEntity {
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
}

export interface ComparisonPayload {
  title: string;
  comparison_type: "city_vs_city" | "service_vs_service";
  entities: ComparisonEntity[];
  category: string;
}

interface ParsedSlug {
  left: string;
  right: string;
}

interface CityRecord {
  name: string;
  slug: string;
  state: string;
  country: string;
  countryCode: string;
}

const allLocations = getAllCountries();

function parseSlug(slug: string): ParsedSlug | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  return { left: parts[0], right: parts[1] };
}

function findMarketByCountry(code: string): GeoTargeting | undefined {
  return ALL_MARKETS.find(
    (market) => market.countryCode.toLowerCase() === code.toLowerCase()
  );
}

function findCityRecord(citySlug: string): CityRecord | null {
  for (const country of allLocations) {
    for (const state of country.states || []) {
      const target = state.cities?.find((city: any) => city.slug === citySlug);
      if (target) {
        return {
          name: target.name,
          slug: target.slug,
          state: state.name,
          country: country.name,
          countryCode: country.code || country.iso?.toLowerCase() || "",
        };
      }
    }
  }
  return null;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function randomInRange(seed: string, min: number, max: number): number {
  const hash = hashString(seed);
  const ratio = (hash % 1000) / 1000;
  return Math.round(min + (max - min) * ratio);
}

function buildCityEntity(citySlug: string): ComparisonEntity {
  const record = findCityRecord(citySlug);
  if (!record) {
    return {
      name: unslugify(citySlug),
      type: "city",
      data: {
        pros: ["Large talent pool", "Established digital ecosystem"],
        cons: ["Requires vetting to find the right partner"],
        bestFor: "Regional brands seeking growth",
      },
    };
  }

  const population = randomInRange(record.slug, 300_000, 3_500_000);
  const gdpPerCapita = randomInRange(`${record.slug}-gdp`, 35_000, 110_000);
  const costOfLiving = randomInRange(`${record.slug}-col`, 65, 125);

  const marketSize =
    population > 2_000_000
      ? "large"
      : population > 800_000
      ? "medium"
      : "small";

  const market = findMarketByCountry(record.countryCode) ?? {
    currencySymbol: "$",
    currency: "USD",
  };

  const minBudget = randomInRange(`${record.slug}-min`, 3000, 8000);
  const maxBudget =
    minBudget + randomInRange(`${record.slug}-max`, 4000, 18000);

  return {
    name: record.name,
    type: "city",
    data: {
      population,
      gdpPerCapita,
      costOfLiving,
      marketSize,
      pricing: {
        min: minBudget,
        max: maxBudget,
        currency: market.currencySymbol || "$",
      },
      pros: [
        `Trusted ${record.country} talent`,
        `${
          market.currencySymbol || "$"
        }${minBudget.toLocaleString()}+ project experience`,
      ],
      cons: [
        "High competition for top agencies",
        "Requires clear scope to stay on budget",
      ],
      bestFor:
        population > 1_000_000
          ? "Scale-ups and established brands"
          : "Specialist, high-touch projects",
      rating: Number((4.5 + (population % 5) * 0.05).toFixed(1)),
    },
  };
}

function parsePriceRange(range: string): { min: number; max: number } | null {
  const matches = range.match(/([\d,]+)/g);
  if (!matches || matches.length === 0) return null;

  const [minRaw, maxRaw] = matches;
  const min = parseInt(minRaw.replace(/,/g, ""), 10);
  const max = maxRaw ? parseInt(maxRaw.replace(/,/g, ""), 10) : min * 2;

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return null;
  }

  return { min, max };
}

function detectCurrencySymbol(range: string): string {
  if (range.includes("€")) return "€";
  if (range.includes("£")) return "£";
  if (range.includes("CHF")) return "CHF";
  return "$";
}

function buildServiceEntity(categoryKey: string): ComparisonEntity | null {
  const category = getCategoryByKey(categoryKey);
  if (!category) return null;

  const pricing = parsePriceRange(category.priceRange);

  return {
    name: category.title,
    type: "service",
    data: {
      pricing: pricing
        ? {
            min: pricing.min,
            max: pricing.max,
            currency: detectCurrencySymbol(category.priceRange),
          }
        : undefined,
      pros: category.services.slice(0, 3),
      cons: [
        `Requires ${category.timeline.toLowerCase()} to achieve ROI`,
        "Needs alignment with internal marketing & ops teams",
      ],
      bestFor: category.targetAudience,
      rating: Number((4.4 + (category.title.length % 5) * 0.06).toFixed(1)),
    },
  };
}

function isCitySlug(slug: string): boolean {
  return Boolean(findCityRecord(slug));
}

function isCategorySlug(slug: string): boolean {
  return Boolean(getCategoryByKey(slug));
}

export function buildComparisonFromSlug(slug: string): ComparisonPayload {
  const parsed = parseSlug(slug);
  if (!parsed) {
    throw new Error(`Invalid comparison slug: ${slug}`);
  }

  const leftIsCity = isCitySlug(parsed.left);
  const rightIsCity = isCitySlug(parsed.right);
  const leftIsCategory = isCategorySlug(parsed.left);
  const rightIsCategory = isCategorySlug(parsed.right);

  if (leftIsCity && rightIsCity) {
    const leftEntity = buildCityEntity(parsed.left);
    const rightEntity = buildCityEntity(parsed.right);
    return {
      title: `${leftEntity.name} vs ${rightEntity.name}: Digital Services`,
      comparison_type: "city_vs_city",
      category: "Digital Services",
      entities: [leftEntity, rightEntity],
    };
  }

  if (leftIsCategory && rightIsCategory) {
    const leftEntity = buildServiceEntity(parsed.left);
    const rightEntity = buildServiceEntity(parsed.right);

    if (!leftEntity || !rightEntity) {
      throw new Error("Unable to build service comparison payload.");
    }

    const title = `Compare ${leftEntity.name} vs ${rightEntity.name}`;
    return {
      title,
      comparison_type: "service_vs_service",
      category: "Services",
      entities: [leftEntity, rightEntity],
    };
  }

  if (leftIsCategory && rightIsCity) {
    const service = buildServiceEntity(parsed.left);
    const city = buildCityEntity(parsed.right);
    if (!service) {
      throw new Error("Service comparison data missing.");
    }
    return {
      title: `${service.name} in ${city.name}: Benchmark Overview`,
      comparison_type: "service_vs_service",
      category: service.name,
      entities: [
        service,
        {
          ...city,
          name: `${city.name} Market`,
          type: "city",
        },
      ],
    };
  }

  // Next.js 16: Added City vs Service comparison (mixed)
  if (leftIsCity && rightIsCategory) {
    const city = buildCityEntity(parsed.left);
    const service = buildServiceEntity(parsed.right);
    if (!service) {
      throw new Error("Service comparison data missing.");
    }
    return {
      title: `${service.name} in ${city.name}: Market Analysis`,
      comparison_type: "service_vs_service",
      category: service.name,
      entities: [
        {
          ...city,
          name: `${city.name} Market`,
          type: "city",
        },
        service,
      ],
    };
  }

  // fallback treat as service vs service using generic names
  const leftName = unslugify(parsed.left);
  const rightName = unslugify(parsed.right);
  return {
    title: `Compare ${leftName} vs ${rightName}`,
    comparison_type: "service_vs_service",
    category: "Digital Services",
    entities: [
      {
        name: leftName,
        type: "service",
        data: {
          pros: ["Flexible delivery", "Strong partner ecosystem"],
          cons: ["Requires senior oversight", "Needs clear KPIs"],
          bestFor: "Teams rolling out new initiatives",
          rating: 4.4,
        },
      },
      {
        name: rightName,
        type: "service",
        data: {
          pros: ["Robust documentation", "Proven success stories"],
          cons: ["Longer onboarding cycles", "Higher retainers"],
          bestFor: "Enterprise and regulated industries",
          rating: 4.5,
        },
      },
    ],
  };
}

export function generateComparisonStaticParams() {
  // Next.js 16: Enhanced slug generation with more comprehensive coverage
  const priorityCities = [
    "berlin",
    "munich",
    "london",
    "paris",
    "amsterdam",
    "new-york",
    "los-angeles",
    "toronto",
    "sydney",
    "singapore",
    "dubai",
    "tokyo",
    "seoul",
    "mumbai",
    "sao-paulo",
  ];

  const priorityCategories = [
    "web-design",
    "seo-services",
    "digital-marketing",
    "ecommerce-development",
    "app-development",
    "ui-ux-design",
    "ppc-ads",
    "content-marketing",
    "branding",
    "conversion-optimization",
  ];

  // City vs City comparisons
  const cityParams = priorityCities.flatMap((left, index) =>
    priorityCities.slice(index + 1).map((right) => `${left}-vs-${right}`)
  );

  // Service vs Service comparisons
  const serviceParams = priorityCategories.flatMap((left, index) =>
    priorityCategories.slice(index + 1).map((right) => `${left}-vs-${right}`)
  );

  // City vs Service comparisons (mixed comparisons)
  const mixedParams = priorityCities.flatMap((city) =>
    priorityCategories.map((service) => `${city}-vs-${service}`)
  );

  return [...cityParams, ...serviceParams, ...mixedParams];
}
