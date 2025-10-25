import { CategoryConfig, getBenefitText } from "@/config/categories-new";
import { buildLocationUrl } from "@/lib/url-utils";
import { generateEnhancedGEOContent } from "@/lib/geo-snippets-enhanced";
import { formatCurrencyRange } from "@/lib/template-helpers";
import { getRandomImage } from "@/lib/getRandomImage";

interface LocationData {
  name: string;
  slug: string;
  code?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

interface Provider {
  name: string;
  focus: string;
  rating: number;
  bestFor: string;
  website?: string;
  local?: boolean;
}

interface InsightCard {
  title: string;
  body: string;
  variant?: "tip" | "warning" | "note" | "success";
}

interface PricingSnapshot {
  currency?: string;
  range?: string;
  startingFrom?: string;
  retainer?: string;
  fastTrack?: string;
  timeline?: string;
}

interface RelatedTarget {
  title: string;
  description: string;
  href: string;
}

interface NearbyArea {
  name: string;
  distance: string;
  description: string;
  href: string;
  highlight?: string;
}

interface CompareLink {
  title: string;
  href: string;
  description?: string;
  items?: {
    option1: string;
    option2: string;
    option1Description?: string;
    option2Description?: string;
    winner?: string;
    reasons?: string[];
  };
}

interface RelatedPost {
  title: string;
  description: string;
  href: string;
  tagline: string;
}

interface TemplateProps {
  city: LocationData;
  state: LocationData;
  country: LocationData;
  category: CategoryConfig;
  year: number;
  intro: string;
  keyTakeaways: string[];
  providers: Provider[];
  pricing: PricingSnapshot;
  pricingRange?: string;
  pricingNotes: string[];
  insights: InsightCard[];
  faqs: Array<{ q: string; a: string }>;
  relatedCategories: RelatedTarget[];
  relatedCities: Array<{ name: string; href: string; highlight?: string }>;
  nearbyAreas: NearbyArea[];
  compareLinks: CompareLink[];
  relatedPosts: RelatedPost[];
  cta: {
    title: string;
    body: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    footer?: string;
  };
  jsonLd: Array<Record<string, unknown>>;
  sections: Array<{
    heading: string;
    body: string[];
    image?: {
      src: string;
      alt?: string;
    };
  }>;
  topicCluster: {
    categoryTitle: string;
    blogCategoryUrl: string;
    pillarUrl: string;
    serviceUrl: string;
  };
  dynamicImage?: string;
  // extra template variables used in MDX
  categoryDisplay?: string;
  categoryBenefit?: string;
  categoryTimeline?: string;
  categoryPrice?: string;
  categoryTargetAudience?: string;
  servicesCollection?: string[];
}

const PROVIDER_SUFFIXES = [
  "Studio",
  "Collective",
  "Partners",
  "Lab",
  "Consulting",
  "Builders",
  "Strategy",
  "Co.",
  "Group",
  "Agency",
  "Works",
  "Solutions",
  "Team",
  "Hub",
  "Ventures",
  "Innovation",
];

function buildProviderList(
  city: LocationData,
  category: CategoryConfig,
  country: LocationData
): Provider[] {
  const baseNames = [
    `${city.name} ${category.title}`,
    `${country.name.split(" ")[0]} ${category.title}`,
    `${city.name} Growth`,
    `${city.name} Digital`,
    `${city.name} Solutions`,
    `${city.name} Agency`,
    `${city.name} Studio`,
    `${city.name} Works`,
    `${city.name} Innovation`,
    `${city.name} Tech`,
    `${city.name} Creative`,
    `${city.name} Advanced`,
  ];

  const services = category.services.slice(0, 4);
  return services.map((service, index) => {
    const baseName =
      baseNames[index] || `${city.name} ${category.title} ${index + 1}`;
    const suffix = PROVIDER_SUFFIXES[index % PROVIDER_SUFFIXES.length];
    const rating = 4.6 + (index % 3) * 0.1;

    return {
      name: `${baseName} ${suffix}`,
      focus: service,
      rating: Number(rating.toFixed(1)),
      bestFor:
        index === 0
          ? `Mid-market teams investing in ${category.title.toLowerCase()}`
          : `Brands that need ${service.toLowerCase()}`,
      website: `https://moydus.com/partners/${city.slug}-${category.key}-${
        index + 1
      }`,
      local: index < 2,
    };
  });
}

function normalizeRange(range: string | undefined): string | undefined {
  if (!range) return undefined;
  return range.replace(/\s+/g, " ");
}

function buildPricingSnapshot(category: CategoryConfig): PricingSnapshot {
  const hasMonthly = category.priceRange.toLowerCase().includes("mo");
  return {
    range: normalizeRange(category.priceRange),
    retainer: hasMonthly ? category.priceRange : undefined,
    startingFrom: !hasMonthly ? category.priceRange.split("–")[0] : undefined,
    fastTrack: category.timeline,
    timeline: category.timeline,
  };
}

function buildPricingNotes(
  category: CategoryConfig,
  city: LocationData,
  state: LocationData,
  year: number
): string[] {
  return [
    `${
      category.timeline
    } is the typical delivery cadence we see for ${category.title.toLowerCase()} projects in ${
      city.name
    }.`,
    `Most ${
      city.name
    } proposals bundle ${category.services[0].toLowerCase()} with ${
      category.services[1]?.toLowerCase() || "ongoing optimisation"
    }.`,
    `${category.targetAudience} in ${
      state.name
    } often lock in retainers ahead of Q${
      year % 4 || 4
    } to secure availability.`,
  ];
}

function buildInsights(
  city: LocationData,
  country: LocationData,
  category: CategoryConfig,
  successMetrics: string[]
): InsightCard[] {
  const base: InsightCard[] = [
    {
      title: `${city.name} market momentum`,
      body: `${city.name} has become a priority hub inside ${
        country.name
      } for ${category.title.toLowerCase()} talent. Agencies report increased demand for ${category.services[0].toLowerCase()} and experimentation budgets.`,
      variant: "tip",
    },
    {
      title: `What top performers do differently`,
      body: `High-performing teams in ${
        city.name
      } pair ${category.services[0].toLowerCase()} with ${
        category.services[1]?.toLowerCase() || "analytics instrumentation"
      } to deliver measurable pipelines.`,
      variant: "tip",
    },
  ];

  if (successMetrics.length) {
    base.push({
      title: "Performance signals",
      body: successMetrics.slice(0, 2).join(" • "),
      variant: "success",
    });
  }

  return base;
}

function buildRelatedCategories(
  country: LocationData,
  state: LocationData,
  city: LocationData,
  currentCategory: CategoryConfig,
  categories: CategoryConfig[]
): RelatedTarget[] {
  return categories
    .filter((cat) => cat.key !== currentCategory.key)
    .slice(0, 4)
    .map((cat) => ({
      title: cat.title,
      description: cat.description,
      href: buildLocationUrl(
        undefined,
        country.name,
        state.name,
        city.name,
        cat.key
      ),
    }));
}

function buildRelatedCities(
  country: LocationData,
  state: LocationData,
  currentCity: LocationData,
  nearbyCities: LocationData[],
  category: CategoryConfig
) {
  return nearbyCities.slice(0, 4).map((city) => ({
    name: city.name,
    href: buildLocationUrl(
      undefined,
      country.name,
      state.name,
      city.name,
      category.key
    ),
    highlight:
      city.population && currentCity.population
        ? city.population > currentCity.population
          ? "Larger market"
          : "Boutique talent"
        : undefined,
  }));
}

function buildNearbyAreas(
  country: LocationData,
  state: LocationData,
  currentCity: LocationData,
  nearbyCities: LocationData[],
  category: CategoryConfig
): NearbyArea[] {
  return nearbyCities.slice(0, 3).map((city, index) => ({
    name: city.name,
    distance: index === 0 ? "≤ 30 km" : index === 1 ? "≤ 60 km" : "≤ 90 km",
    description: `Access ${category.title.toLowerCase()} providers with niche ${
      state.name
    } expertise.`,
    href: buildLocationUrl(
      undefined,
      country.name,
      state.name,
      city.name,
      category.key
    ),
    highlight: index === 0 ? "Fastest onboarding" : undefined,
  }));
}

function buildCompareLinks(
  city: LocationData,
  comparisonTargets: LocationData[],
  category: CategoryConfig
): CompareLink[] {
  const links: CompareLink[] = [];
  if (comparisonTargets.length) {
    const target = comparisonTargets[0];
    links.push({
      title: `${city.name} vs ${target.name}: ${category.title} budgets`,
      href: `/compare/${city.slug}-vs-${target.slug}`,
      description: `Compare ${category.title} pricing and services between ${city.name} and ${target.name}`,
      items: {
        option1: city.name,
        option2: target.name,
        option1Description: `Local ${category.title} expertise in ${city.name} with regional market knowledge`,
        option2Description: `Established ${category.title} providers in ${target.name} with proven track record`,
        winner: city.name,
        reasons: [
          "Lower cost of living means competitive pricing",
          "Local market expertise and connections",
          "Faster response times and personal service",
        ],
      },
    });
  }

  links.push({
    title: `${category.title} vs SEO: what to prioritise in ${city.name}`,
    href: `/compare/${category.key}-vs-seo-services`,
    description: `Understand the difference between ${category.title} and SEO services for your business in ${city.name}`,
    items: {
      option1: category.title,
      option2: "SEO Services",
      option1Description: `Focused on ${category.description.toLowerCase()} with specialized expertise`,
      option2Description:
        "Search engine optimization to improve organic visibility and rankings",
      winner: category.title,
      reasons: [
        "More targeted approach for your specific needs",
        "Better ROI for your industry in this market",
        "Faster results compared to long-term SEO strategies",
      ],
    },
  });

  return links;
}

function buildRelatedPosts(
  city: LocationData,
  category: CategoryConfig
): RelatedPost[] {
  const slugBase = category.key.replace(/[^a-z0-9]+/g, "-");
  return [
    {
      title: `How to shortlist ${category.title} agencies in ${city.name}`,
      description: `Criteria, scorecards, and interview prompts when hiring ${category.title.toLowerCase()} partners in ${
        city.name
      }.`,
      href: `/blog/how-to-choose-${slugBase}-provider`,
      tagline: "Hiring Guide",
    },
    {
      title: `${city.name} ${
        category.title
      }: pricing guide (${new Date().getFullYear()})`,
      description: `See retainers, project averages, and negotiation tips specific to ${city.name}.`,
      href: `/blog/${slugBase}-pricing-guide-2025`,
      tagline: "Pricing",
    },
  ];
}

export function buildCityCategoryTemplateProps(options: {
  country: LocationData;
  state: LocationData;
  city: LocationData;
  category: CategoryConfig;
  allCategories: CategoryConfig[];
  nearbyCities: LocationData[];
  comparisonTargets: LocationData[];
  dynamicImage?: string;
}): TemplateProps {
  const {
    country,
    state,
    city,
    category,
    allCategories,
    nearbyCities,
    comparisonTargets,
    dynamicImage,
  } = options;

  const benefit = getBenefitText(category.key);
  const geoContent = generateEnhancedGEOContent({
    city: city.name,
    state: state.name,
    country: country.name,
    category: category.key,
    categoryDisplay: category.title,
    priceRange: category.priceRange,
    timeline: category.timeline,
    targetAudience: category.targetAudience,
    description: category.description,
    benefit,
  });

  const year = Math.max(new Date().getFullYear(), 2025);

  const providers = buildProviderList(city, category, country);
  const pricing = buildPricingSnapshot(category);
  const pricingRangeDisplay = formatCurrencyRange(
    pricing.range,
    pricing.currency
  );
  const pricingNotes = buildPricingNotes(category, city, state, year);

  const keyTakeaways = geoContent.successMetrics.slice(0, 3);
  const insights = buildInsights(
    city,
    country,
    category,
    geoContent.successMetrics
  );
  const relatedCategories = buildRelatedCategories(
    country,
    state,
    city,
    category,
    allCategories
  );
  const relatedCities = buildRelatedCities(
    country,
    state,
    city,
    nearbyCities,
    category
  );
  const nearbyAreas = buildNearbyAreas(
    country,
    state,
    city,
    nearbyCities,
    category
  );
  const compareLinks = buildCompareLinks(city, comparisonTargets, category);
  const relatedPosts = buildRelatedPosts(city, category);

  const jsonLd = [
    { type: "Article" },
    {
      type: "Service",
      data: { priceRange: category.priceRange },
    },
    {
      type: "LocalBusiness",
      data: { priceRange: category.priceRange },
    },
    {
      type: "FAQPage",
      data: { faqs: geoContent.faqs },
    },
    {
      type: "BreadcrumbList",
    },
  ];

  return {
    city,
    state,
    country,
    category,
    year,
    intro: geoContent.snippet,
    keyTakeaways,
    providers,
    pricing,
    pricingRange: pricingRangeDisplay,
    pricingNotes,
    insights,
    faqs: geoContent.faqs,
    relatedCategories,
    relatedCities,
    nearbyAreas,
    compareLinks,
    relatedPosts,
    jsonLd,
    sections: geoContent.sections,
    topicCluster: {
      categoryTitle: category.title,
      blogCategoryUrl: `/blog/category/${category.key}`,
      pillarUrl: buildLocationUrl(
        undefined,
        country.name,
        state.name,
        city.name,
        category.key
      ),
      serviceUrl: `/${category.key}`,
    },
    // Template değişkenleri
    categoryDisplay: category.title,
    categoryBenefit: getBenefitText(category.key),
    categoryTimeline: category.timeline,
    categoryPrice: category.priceRange,
    categoryTargetAudience: category.targetAudience,
    servicesCollection: category.services,
    dynamicImage,
    cta: {
      title: `Ready to attract better ${category.title.toLowerCase()} results in ${
        city.name
      }?`,
      body: `Our ${
        city.name
      }-focused playbooks combine ${category.services[0].toLowerCase()} with performance analytics so you can launch, measure, and iterate without the guesswork.`,
      primary: {
        href: "/contact",
        label: "Get a tailored roadmap",
      },
      secondary: {
        href: `/portfolio`,
        label: "See recent case studies",
      },
      footer: `Response time < 24h · Serving ${country.name} companies`,
    },
  };
}
