// Enhanced GEO (Generative Engine Optimization) Content Snippets
// Completely dynamic content generation based on categories configuration

import { categories, type CategoryConfig } from "../config/categories-new";
import { getRandomImage } from "./getRandomImage";

interface SnippetConfig {
  city: string;
  state: string;
  country: string;
  category: string;
  categoryDisplay: string;
  priceRange: string;
  timeline: string;
  targetAudience: string;
  description: string;
  benefit: string;
}

type SectionVariant = "why" | "roadmap" | "scope";

type NarrativeSection = {
  heading: string;
  body: string[];
  image: {
    src: string;
    alt: string;
  };
};

const DEFAULT_SECTION_VARIANT: SectionVariant = "why";

const VISUAL_CATEGORY_KEYS = new Set<string>([
  "web-design",
  "ui-ux-design",
  "landing-page-design",
  "branding",
  "ecommerce-development",
  "shopify-development",
  "wordpress-development",
]);

const DEVELOPMENT_CATEGORY_KEYS = new Set<string>([
  "custom-web-development",
  "saas-development",
  "app-development",
  "crm-development",
  "erp-software",
  "ai-integration",
  "automation",
  "software-consulting",
  "crm-portal-apps",
  "custom-panel-development",
]);

const MARKETING_CATEGORY_KEYS = new Set<string>([
  "digital-marketing",
  "social-media-marketing",
  "content-marketing",
  "email-marketing",
  "conversion-optimization",
  "ppc-ads",
  "seo-services",
  "local-seo",
]);

function selectSectionVariantForCategory(
  categoryKey?: string
): SectionVariant {
  if (!categoryKey) {
    return DEFAULT_SECTION_VARIANT;
  }

  const normalized = categoryKey.toLowerCase();

  if (DEVELOPMENT_CATEGORY_KEYS.has(normalized)) {
    return "scope";
  }

  if (VISUAL_CATEGORY_KEYS.has(normalized)) {
    return "why";
  }

  if (MARKETING_CATEGORY_KEYS.has(normalized)) {
    return "roadmap";
  }

  return DEFAULT_SECTION_VARIANT;
}

export class EnhancedGEOSnippetGenerator {
  private categories: CategoryConfig[];

  constructor() {
    this.categories = categories;
  }

  // Generate AI-friendly summary with dynamic templates based on category type
  generateSnippet(config: SnippetConfig): string {
    const categoryData = this.getCategoryData(config.category);

    // Dynamic templates based on category characteristics
    const templates = this.getSnippetTemplates(config, categoryData);

    // Rotate based on category to avoid duplicate content
    const index =
      this.hashString(config.category + config.city) % templates.length;
    return templates[index];
  }

  // Generate category-specific snippet templates
  private getSnippetTemplates(
    config: SnippetConfig,
    categoryData?: CategoryConfig
  ): string[] {
    const isMonthlyService = config.priceRange.includes("/month");
    const isHighValue = this.extractMaxPrice(config.priceRange) > 10000;
    const isFastDelivery =
      config.timeline.includes("week") && parseInt(config.timeline) <= 4;

    const baseTemplates = [
      `Professional ${config.categoryDisplay} for ${config.city} businesses — ${config.timeline} launch, proven results.`,
      `${config.benefit} in ${config.city}. ${config.timeline} delivery, ${config.priceRange} pricing.`,
      `${config.city} ${config.categoryDisplay} experts. Fast ${config.timeline} turnaround, local expertise.`,
      `Top ${config.categoryDisplay} services in ${config.city}, ${config.state}. ${config.timeline} launch guaranteed.`,
      `${config.categoryDisplay} that converts for ${config.city} businesses. ${config.timeline} delivery, proven ROI.`,
    ];

    // Add category-specific templates
    if (isMonthlyService) {
      baseTemplates.push(
        `Ongoing ${config.categoryDisplay} services in ${config.city}. ${config.priceRange} monthly plans.`,
        `${config.city} ${config.categoryDisplay} management. Starting ${config.priceRange}, proven results.`
      );
    }

    if (isHighValue) {
      baseTemplates.push(
        `Enterprise ${config.categoryDisplay} solutions for ${config.city} businesses. ${config.timeline} implementation.`,
        `Custom ${config.categoryDisplay} development in ${config.city}. ${config.timeline} delivery guaranteed.`
      );
    }

    if (isFastDelivery) {
      baseTemplates.push(
        `Rapid ${config.categoryDisplay} in ${config.city}. ${config.timeline} delivery, immediate impact.`,
        `Fast-track ${config.categoryDisplay} for ${config.city} businesses. ${config.timeline} launch.`
      );
    }

    return baseTemplates;
  }

  // Generate contextual FAQ answers with category-specific questions
  generateFAQAnswers(config: SnippetConfig): Array<{ q: string; a: string }> {
    const categoryData = this.getCategoryData(config.category);
    const baseFAQs = this.getBaseFAQs(config);
    const categorySpecificFAQs = this.getCategorySpecificFAQs(
      config,
      categoryData
    );

    // Combine and select best FAQs
    const allFAQs = [...baseFAQs, ...categorySpecificFAQs];
    const selectedIndices = this.getRotatedIndices(
      config.category + config.city,
      5,
      allFAQs.length
    );

    return selectedIndices.map((index) => allFAQs[index]);
  }

  // Base FAQs that apply to all services
  private getBaseFAQs(config: SnippetConfig): Array<{ q: string; a: string }> {
    const categoryDisplaySafe =
      config.categoryDisplay ||
      this.getCategoryData(config.category)?.title ||
      (
        this.getCategoryData(config.category) as CategoryConfig
      )?.title ||
      config.category;
    const categoryDisplayLower = String(categoryDisplaySafe).toLowerCase();
    const timelineLower = String(config.timeline || "").toLowerCase();
    return [
      {
        q: `How long does a ${categoryDisplayLower} project take in ${config.city}?`,
        a: `Typical timeframe is ${timelineLower}. We prioritize fast delivery while maintaining quality for ${config.city} businesses. Our streamlined process includes discovery, implementation, and optimization phases.`,
      },
      {
        q: `What's the cost of ${categoryDisplayLower} services in ${config.city}, ${config.state}?`,
        a: `Pricing ranges from ${config.priceRange} depending on project scope and requirements. We offer transparent pricing with no hidden fees for ${config.city} clients. All packages include support and training.`,
      },
      {
        q: `Do you serve businesses outside ${config.city}?`,
        a: `While we specialize in ${config.city}, we also serve clients throughout ${config.state} and beyond. Remote collaboration is seamless with our proven process and regular communication.`,
      },
      {
        q: `What makes your ${categoryDisplayLower} different in ${config.city}?`,
        a: `We combine local ${config.city} market expertise with modern ${categoryDisplayLower} best practices. Our focus is on fast delivery, measurable results, and conversion optimization that drives real growth for ${config.state} businesses.`,
      },
    ];
  }

  // Category-specific FAQs based on service type
  private getCategorySpecificFAQs(
    config: SnippetConfig,
    categoryData?: CategoryConfig
  ): Array<{ q: string; a: string }> {
    const faqs: Array<{ q: string; a: string }> = [];

    const categoryDisplaySafe =
      config.categoryDisplay ||
      this.getCategoryData(config.category)?.title ||
      (this.getCategoryData(config.category) as any)?.title ||
      config.category;
    const categoryDisplayLower = String(categoryDisplaySafe).toLowerCase();

    if (!categoryData) return faqs;

    // Design/Development services
    if (
      [
        "web-design",
        "custom-web-development",
        "ui-ux-design",
        "landing-page-design",
      ].includes(config.category)
    ) {
      faqs.push(
        {
          q: `Do you provide mobile-responsive design for ${config.city} businesses?`,
          a: `Yes, all our ${categoryDisplayLower} projects include mobile-first, responsive design optimized for ${config.city} users. We ensure perfect functionality across all devices and screen sizes.`,
        },
        {
          q: `Is SEO included with ${categoryDisplayLower} in ${config.city}?`,
          a: `Absolutely. Every ${categoryDisplayLower} project includes basic SEO optimization, local search setup for ${config.city}, and Google Business Profile configuration to improve your local visibility.`,
        }
      );
    }

    // E-commerce services
    if (
      ["ecommerce-development", "shopify-development"].includes(config.category)
    ) {
      faqs.push(
        {
          q: `Do you help with payment processing for ${config.city} businesses?`,
          a: `Yes, we set up secure payment gateways, shopping carts, and integrate with popular payment processors. We ensure compliance with local ${config.state} regulations and security standards.`,
        },
        {
          q: `Can you migrate my existing store to a new platform?`,
          a: `Absolutely. We handle complete store migrations including products, customers, and order history. Our ${config.city} team ensures zero downtime and data integrity throughout the process.`,
        }
      );
    }

    // Marketing services
    if (
      [
        "digital-marketing",
        "social-media-marketing",
        "ppc-ads",
        "content-marketing",
      ].includes(config.category)
    ) {
      faqs.push(
        {
          q: `How do you measure success for ${categoryDisplayLower} in ${config.city}?`,
          a: `We track key metrics like lead generation, conversion rates, local search rankings, and ROI. Monthly reports show your ${config.city} business growth and campaign performance with clear, actionable insights.`,
        },
        {
          q: `Do you manage campaigns in-house or outsource?`,
          a: `All ${categoryDisplayLower} work is handled by our experienced ${config.city} team. We never outsource to ensure quality control and direct communication with your local business.`,
        }
      );
    }

    // Technical services
    if (
      [
        "saas-development",
        "crm-development",
        "erp-software",
        "ai-integration",
      ].includes(config.category)
    ) {
      faqs.push(
        {
          q: `Do you provide ongoing support after ${categoryDisplayLower} implementation?`,
          a: `Yes, we offer comprehensive support plans including maintenance, updates, and training for your ${config.city} team. Our support ensures your system continues to meet your growing business needs.`,
        },
        {
          q: `Is the ${categoryDisplayLower} solution scalable for growing businesses?`,
          a: `Absolutely. We build with scalability in mind, allowing your ${config.city} business to grow without system limitations. Our architecture supports increased users, data, and functionality as needed.`,
        }
      );
    }

    return faqs;
  }

  // Generate testimonials with realistic variation based on category
  generateTestimonials(config: SnippetConfig): Array<{
    name: string;
    city: string;
    rating: number;
    text: string;
    date: string;
  }> {
    const categoryData = this.getCategoryData(config.category);
    const testimonialPool = this.getCategoryTestimonials(config, categoryData);

    // Select testimonials based on category/city hash
    const selectedIndices = this.getRotatedIndices(
      config.category + config.city,
      3,
      testimonialPool.length
    );
    const currentDate = new Date();

    return selectedIndices.map((index, i) => ({
      ...testimonialPool[index],
      city: config.city,
      rating: 5,
      date: new Date(currentDate.getTime() - (i + 1) * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    }));
  }

  // Generate category-specific testimonials
  private getCategoryTestimonials(
    config: SnippetConfig,
    categoryData?: CategoryConfig
  ) {
    const baseTestimonials = [
      {
        name: "Sarah Martinez",
        text: `Working with Moydus transformed our online presence. The ${config.categoryDisplay.toLowerCase()} project delivered exactly what we needed for our ${
          config.city
        } business.`,
      },
      {
        name: "Michael Rodriguez",
        text: `Fast, professional, and results-driven. Our business saw immediate improvements after launch. Highly recommend for ${config.city} businesses.`,
      },
      {
        name: "Jennifer Lee",
        text: `Local expertise combined with modern ${config.categoryDisplay.toLowerCase()} techniques. The team understood the ${
          config.city
        } market perfectly.`,
      },
    ];

    // Add category-specific testimonials
    const categorySpecific = [];

    if (
      ["web-design", "custom-web-development", "ui-ux-design"].includes(
        config.category
      )
    ) {
      categorySpecific.push(
        {
          name: "David Chen",
          text: `Our new website increased leads by 60% in the first month. The ${config.categoryDisplay.toLowerCase()} perfectly represents our ${
            config.city
          } business.`,
        },
        {
          name: "Lisa Johnson",
          text: `The mobile optimization made a huge difference. Our ${config.city} customers love the new user experience and faster loading times.`,
        }
      );
    }

    if (
      ["digital-marketing", "ppc-ads", "social-media-marketing"].includes(
        config.category
      )
    ) {
      categorySpecific.push(
        {
          name: "Robert Kim",
          text: `ROI improved by 200% in three months. Their ${config.categoryDisplay.toLowerCase()} strategy really understands the ${
            config.city
          } market dynamics.`,
        },
        {
          name: "Amanda Foster",
          text: `Finally found a team that delivers measurable results. Our ${config.categoryDisplay.toLowerCase()} campaigns are performing better than ever in ${
            config.city
          }.`,
        }
      );
    }

    if (
      ["ecommerce-development", "shopify-development"].includes(config.category)
    ) {
      categorySpecific.push(
        {
          name: "Carlos Mendez",
          text: `Sales increased 150% after the new store launch. The ${config.categoryDisplay.toLowerCase()} solution handles our ${
            config.city
          } customer volume perfectly.`,
        },
        {
          name: "Emma Thompson",
          text: `The checkout process is so smooth now. Customer complaints dropped to zero and our ${config.city} conversion rate doubled.`,
        }
      );
    }

    return [...baseTestimonials, ...categorySpecific];
  }

  // Generate success metrics relevant to category
  generateSuccessMetrics(config: SnippetConfig): string[] {
    const primaryStatements = [
      `📈 ${
        config.city
      } companies report 40%+ lift in qualified opportunities once their ${config.categoryDisplay.toLowerCase()} funnels are rebuilt around analytics and attribution.`,
      `💼 Most ${config.city} teams budget ${
        config.priceRange
      } for ${config.categoryDisplay.toLowerCase()} so they can bundle strategy, delivery, and ongoing optimization without surprise fees.`,
      `⚙️ ${
        config.timeline
      } is the average turnaround for ${config.categoryDisplay.toLowerCase()} in ${
        config.city
      }, including discovery, implementation, and a launch sprint.`,
      `🤝 ${config.targetAudience.split(",")[0]} in ${
        config.state
      } prefer local specialists so collaboration stays in the same time zone and stakeholders stay close to the work.`,
      `📍 ${
        config.city
      } leaders pair ${config.categoryDisplay.toLowerCase()} with customer research to make sure every release matches the expectations of the local market.`,
      `📊 Teams measure success in ${
        config.city
      } by tracking pipeline velocity, conversion lift, and retention after each ${config.categoryDisplay.toLowerCase()} milestone.`,
    ];

    const categorySpecific = this.getCategorySpecificMetrics(config);
    const combined = [...categorySpecific, ...primaryStatements];

    const selectedIndices = this.getRotatedIndices(
      `${config.city}-${config.categoryDisplay}`,
      3,
      combined.length
    );

    return selectedIndices.map((index) => combined[index]);
  }

  // Category-specific success metrics
  private getCategorySpecificMetrics(config: SnippetConfig): string[] {
    const metrics: string[] = [];

    if (
      ["web-design", "custom-web-development", "ui-ux-design"].includes(
        config.category
      )
    ) {
      metrics.push(
        `⚡ ${config.city} redesigns launch with 3× faster load times and accessibility baked in across every viewport.`,
        `🎨 ${config.categoryDisplay} sprints focus on brand consistency so ${config.city} visitors trust what they see before they read a single line.`,
        `🧭 User journeys are mapped for ${config.city} buyers, cutting bounce rates and boosting demo requests inside ${config.state}.`
      );
    }

    if (
      ["ecommerce-development", "shopify-development"].includes(config.category)
    ) {
      metrics.push(
        `🛒 High-intent shoppers in ${config.city} complete checkout 25% faster after streamlined cart optimizations.`,
        `💳 Payment orchestration protects margin while offering the digital wallets ${config.city} customers expect.`,
        `📦 Automated fulfillment keeps ${config.city} operations lean, freeing teams to focus on merchandise instead of spreadsheets.`
      );
    }

    if (
      ["digital-marketing", "ppc-ads", "social-media-marketing"].includes(
        config.category
      )
    ) {
      metrics.push(
        `📊 Campaigns tuned for ${config.city} search intent double qualified pipeline when paired with first-party data.`,
        `🎯 Geo-targeted creatives resonate with ${config.city} audiences, lifting brand searches and direct leads.`,
        `📞 Sales teams receive warmer conversations because nurture flows keep ${config.city} prospects informed between touchpoints.`
      );
    }

    if (["local-seo", "seo-services"].includes(config.category)) {
      metrics.push(
        `🔍 ${config.city} locations earn consistent map pack placement once structured data and review programs go live.`,
        `⭐ Reputation workflows steadily collect 5-star feedback so ${config.city} branches stay ahead of national competitors.`,
        `📱 “Near me” searches translate into booked appointments thanks to hyperlocal landing pages tuned for ${config.city}.`
      );
    }

    if (["content-marketing", "email-marketing"].includes(config.category)) {
      metrics.push(
        `📝 Editorial calendars grounded in ${config.city} pain points grow engaged subscribers instead of vanity traffic.`,
        `📧 Lifecycle journeys nurture ${config.city} buyers with segment-specific stories and data-backed offers.`,
        `🎯 Scoring models built around ${config.city} signals help sales focus on accounts that are ready to talk.`
      );
    }

    if (["branding-design", "logo-design"].includes(config.category)) {
      metrics.push(
        `🎨 Refreshes align ${config.city} brands with the premium experience local customers expect.`,
        `✨ Visual systems scale from storefronts to digital touchpoints without losing clarity.`,
        `💼 Investor decks and proposals look as sharp as the customer experience, boosting credibility across ${config.state}.`
      );
    }

    if (
      ["wordpress-development", "cms-development"].includes(config.category)
    ) {
      metrics.push(
        `🔧 Marketing teams in ${config.city} publish updates in minutes thanks to modular CMS builds.`,
        `🔒 Hardened hosting keeps ${config.state} regulators satisfied while protecting customer data.`,
        `📊 Custom dashboards surface content performance so stakeholders know what actually moves revenue.`
      );
    }

    return metrics;
  }

  // Generate related services dynamically from all categories
  generateRelatedServices(
    config: SnippetConfig
  ): Array<{ name: string; url: string; description: string }> {
    // Filter out current service and select 3-4 complementary ones
    const otherServices = this.categories.filter(
      (cat) => cat.key !== config.category
    );

    // Smart selection: prioritize complementary services
    const complementaryServices = this.getComplementaryServices(
      config.category,
      otherServices
    );
    const selectedServices =
      complementaryServices.length >= 3
        ? complementaryServices.slice(0, 3)
        : [
            ...complementaryServices,
            ...otherServices.slice(0, 3 - complementaryServices.length),
          ];

    return selectedServices.map((service) => ({
      name: (service as any).display || (service as any).title || service.key,
      url: `/${config.country.toLowerCase()}/${config.state
        .toLowerCase()
        .replace(/\s+/g, "-")}/${config.city
        .toLowerCase()
        .replace(/\s+/g, "-")}/${service.key}`,
      description: `${(service as any).benefit || "Professional service"} in ${
        config.city
      }`,
    }));
  }

  // Smart complementary service selection
  private getComplementaryServices(
    currentCategory: string,
    allServices: CategoryConfig[]
  ): CategoryConfig[] {
    const complementaryMap: Record<string, string[]> = {
      "web-design": [
        "local-seo",
        "content-marketing",
        "conversion-optimization",
      ],
      "custom-web-development": [
        "ui-ux-design",
        "ai-integration",
        "automation",
      ],
      "ecommerce-development": [
        "digital-marketing",
        "ppc-ads",
        "conversion-optimization",
      ],
      "shopify-development": [
        "social-media-marketing",
        "email-marketing",
        "content-marketing",
      ],
      "local-seo": [
        "web-design",
        "content-marketing",
        "social-media-marketing",
      ],
      "digital-marketing": [
        "web-design",
        "landing-page-design",
        "conversion-optimization",
      ],
      "saas-development": ["ui-ux-design", "ai-integration", "automation"],
      "crm-development": [
        "automation",
        "ai-integration",
        "software-consulting",
      ],
    };

    const complementaryKeys = complementaryMap[currentCategory] || [];
    return allServices.filter((service) =>
      complementaryKeys.includes(service.key)
    );
  }

  // Utility functions
  getCategoryData(categoryKey: string): CategoryConfig | undefined {
    return this.categories.find((cat) => cat.key === categoryKey);
  }

  private extractMaxPrice(priceRange: string): number {
    const matches = priceRange.match(/\$[\d,]+/g);
    if (!matches) return 0;

    const prices = matches.map((price) => parseInt(price.replace(/[$,]/g, "")));

    return Math.max(...prices);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private getRotatedIndices(
    seed: string,
    count: number,
    max: number
  ): number[] {
    const hash = this.hashString(seed);
    const indices: number[] = [];

    for (let i = 0; i < count && i < max; i++) {
      const index = (hash + i) % max;
      if (!indices.includes(index)) {
        indices.push(index);
      } else {
        const nextIndex = (index + 1) % max;
        if (!indices.includes(nextIndex)) {
          indices.push(nextIndex);
        }
      }
    }

    return indices;
  }
}

// Export enhanced singleton
export const enhancedGeoSnippets = new EnhancedGEOSnippetGenerator();

// Helper function to generate all content for a city/category page
export function generateEnhancedGEOContent(config: SnippetConfig) {
  const categoryData = enhancedGeoSnippets.getCategoryData(config.category);

  // Generate FAQs using the content generator
  const { generateUniqueContent } = require("./content-generator");
  const contentParams = {
    city: config.city,
    state: config.state,
    country: config.country,
    category: {
      key: config.category,
      title: config.categoryDisplay,
      description: config.description,
      priceRange: config.priceRange,
      timeline: config.timeline,
    },
    year: new Date().getFullYear(),
  };
  const generatedContent = generateUniqueContent(contentParams);

  return {
    snippet: enhancedGeoSnippets.generateSnippet(config),
    faqs: generatedContent.faqs,
    testimonials: enhancedGeoSnippets.generateTestimonials(config),
    successMetrics: enhancedGeoSnippets.generateSuccessMetrics(config),
    relatedServices: enhancedGeoSnippets.generateRelatedServices(config),
    sections: buildNarrativeSections(config, categoryData),
  };
}

function buildNarrativeSections(
  config: SnippetConfig,
  categoryData?: CategoryConfig
): NarrativeSection[] {
  const services = categoryData?.services.slice(0, 3) ?? [];
  const primaryServiceList = services.length
    ? services.join(", ")
    : config.categoryDisplay.toLowerCase();

  const sectionOne: NarrativeSection = {
    heading: `Why ${config.city} companies invest in ${config.categoryDisplay}`,
    body: [
      `${config.city} has matured into one of ${
        config.country
      }'s most competitive hubs. Growth teams are commissioning ${config.categoryDisplay.toLowerCase()} work to differentiate faster than national brands.`,
      `Local decision makers want partners who understand ${
        config.state
      } buyer behaviour, regulatory guardrails, and the realities of hiring talent in ${
        config.city
      }. Our playbooks blend that local context with ${config.benefit.toLowerCase()}.`,
    ],
    image: createSectionIllustration(config, "why", {
      title: `${config.categoryDisplay} · ${config.city}`,
      lines: [`${config.benefit}`, `${config.targetAudience}`],
    }),
  };

  const sectionTwo: NarrativeSection = {
    heading: `${config.categoryDisplay} engagement roadmap`,
    body: [
      `Kickoff focuses on diagnosing what already performs in ${config.city}. Discovery dives into existing funnels, analytics, and customer interviews before we sprint into design and build.`,
      `Implementation runs on a ${config.timeline.toLowerCase()} cadence with weekly checkpoints. Retainers starting around ${
        config.priceRange.split("–")[0]
      } cover optimisation, growth experiments, and enablement for ${config.targetAudience.toLowerCase()}.`,
    ],
    image: createSectionIllustration(config, "roadmap", {
      title: `${config.timeline} rollout`,
      lines: [
        `Investment: ${config.priceRange}`,
        `Operators: ${config.targetAudience}`,
      ],
    }),
  };

  const sectionThree: NarrativeSection = {
    heading: `What ${config.city} teams expect inside the scope`,
    body: [
      `Briefs usually include ${primaryServiceList}${
        services.length ? "" : ""
      }. We also align on attribution, documentation, and team training so ${
        config.city
      } stakeholders stay confident after launch.`,
      `Reporting hooks into the tools your operators already trust, combining qualitative insights with measurable lifts in pipeline, retention, and share of voice across ${config.state}.`,
    ],
    image: createSectionIllustration(config, "scope", {
      title: `${config.city} delivery stack`,
      lines: [
        services.slice(0, 2).join(" • ") || config.categoryDisplay,
        services[2] ?? `${config.state} coverage`,
      ],
    }),
  };

  const sectionsByVariant: Record<SectionVariant, NarrativeSection> = {
    why: sectionOne,
    roadmap: sectionTwo,
    scope: sectionThree,
  };

  const selectedVariant = selectSectionVariantForCategory(
    categoryData?.key || config.category
  );

  const selectedSection =
    sectionsByVariant[selectedVariant] ?? sectionsByVariant["why"];

  return [selectedSection];
}

function createSectionIllustration(
  config: SnippetConfig,
  _variant: SectionVariant,
  meta: { title: string; lines: Array<string | undefined> }
): NarrativeSection["image"] {
  const normalizedSlug =
    config.category?.toLowerCase().replace(/[^a-z0-9-]+/g, "-") ||
    config.categoryDisplay?.toLowerCase().replace(/[^a-z0-9-]+/g, "-") ||
    "marketing";

  const imageCandidate = getRandomImage(normalizedSlug || "marketing");
  const resolvedImage = imageCandidate.endsWith(".svg")
    ? getRandomImage("marketing")
    : imageCandidate;
  const altText = meta?.title?.trim()
    ? `${meta.title} — ${config.categoryDisplay} in ${config.city}`
    : `${config.categoryDisplay} in ${config.city}`;

  return {
    src: resolvedImage,
    alt: altText,
  };
}

// Backward compatibility export
export const geoSnippets = enhancedGeoSnippets;
export const generateGEOContent = generateEnhancedGEOContent;
