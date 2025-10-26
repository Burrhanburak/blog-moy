import fs from "fs";
import path from "path";
import {
  categories as allCategories,
  fillKeywords,
  getBenefitText,
  type CategoryConfig,
} from "../config/categories-new";

export const topCategories = [
  "web-design",
  "custom-web-development",
  "digital-marketing",
  "seo-services",
  "local-seo",
  "ecommerce-development",
  "branding",
  "content-marketing",
  "app-development",
  "ui-ux-design",
  "custom-panel-development", // 👈 yeni eklendi
];

// ✅ Load data and template
const data = JSON.parse(fs.readFileSync("data/priorityCountries.json", "utf8"));
const template = fs.readFileSync(
  "scripts/templates/enhanced-template-v3.mdx",
  "utf8"
);
const outDir = "content";
const locationDataset = JSON.parse(
  fs.readFileSync("data/filtered.json", "utf8")
);

const categories = allCategories; // Use all 25 categories

let totalGenerated = 0;
let totalSkipped = 0;

// Dynamic content generation functions
function generateDynamicTitle(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const variations = [
    `Best ${
      category.title
    } Services in ${city}, ${state} (${new Date().getFullYear()})`,
    `Professional ${category.title} in ${city} - Local Experts | Moydus`,
    `${category.title} Agency in ${city}, ${state} - Fast & Reliable`,
    `Top-Rated ${category.title} Services for ${city} Businesses`,
    `${category.title} Solutions in ${city} - Proven Results`,
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

function generateDynamicMetaTitle(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const variations = [
    `${category.title} in ${city}, ${state} — ${getBenefitText(
      category.key
    )} | Moydus`,
    `Professional ${category.title} Services in ${city} - Local Experts`,
    `${category.title} Agency ${city} ${state} - Fast Delivery & Results`,
    `Best ${category.title} in ${city} - ${category.timeline} Launch | Moydus`,
    `${category.title} Services ${city} - ${category.priceRange} Pricing`,
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

function generateDynamicMetaDescription(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const variations = [
    `Professional ${category.title.toLowerCase()} in ${city}, ${state}. ${
      category.timeline
    } delivery, ${
      category.priceRange
    } pricing. Local expertise meets proven results. Get started today.`,
    `Transform your ${city} business with expert ${category.title.toLowerCase()}. ${
      category.timeline
    } launch, transparent ${
      category.priceRange
    } pricing. Trusted by local businesses.`,
    `Leading ${category.title} agency in ${city}, ${state}. ${category.timeline} delivery, ${category.priceRange} investment. Local market expertise + modern solutions.`,
    `Get professional ${category.title.toLowerCase()} for your ${city} business. ${
      category.timeline
    } timeline, ${category.priceRange} pricing. Local experts, proven results.`,
    `${category.title} services in ${city} that deliver results. ${category.timeline} delivery, ${category.priceRange} investment. Trusted by ${city} businesses.`,
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

function generateDynamicValueProposition(
  city: string,
  category: CategoryConfig
): string {
  const variations = [
    `We help ${city} businesses succeed online with modern ${category.title.toLowerCase()} solutions. Our local expertise combined with cutting-edge technology delivers results that matter.`,
    `Transform your ${city} business with our proven ${category.title.toLowerCase()} approach. We combine local market knowledge with industry-leading techniques for maximum impact.`,
    `Empowering ${city} businesses with professional ${category.title.toLowerCase()} services. Our team understands the local market and delivers solutions that drive real growth.`,
    `Leading ${city} businesses to digital success through expert ${category.title.toLowerCase()}. We blend local insights with modern strategies for exceptional results.`,
    `Your trusted ${category.title.toLowerCase()} partner in ${city}. We deliver fast, effective solutions that help local businesses thrive in the digital landscape.`,
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

function generateDynamicFAQs(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const faqTemplates = [
    {
      q: `How long does a ${category.title} project take in ${city}?`,
      a: `Typical timeframe is ${category.timeline}. We prioritize fast delivery while maintaining quality for ${city} businesses.`,
    },
    {
      q: `What's the cost of ${category.title} services in ${city}, ${state}?`,
      a: `Pricing ranges from ${category.priceRange} depending on project scope. We offer transparent pricing with no hidden fees for ${city} clients.`,
    },
    {
      q: `Do you offer local SEO for ${city} businesses?`,
      a: `Yes — every ${category.title} project includes basic local SEO optimization, Google Business Profile setup, and local citation building for ${city} market visibility.`,
    },
    {
      q: `What makes your ${category.title} different in ${city}?`,
      a: `We combine local ${city} market expertise with modern ${category.title} best practices. Our focus is on fast delivery, mobile-first design, and conversion optimization that drives real results.`,
    },
    {
      q: `Do you serve businesses outside ${city}?`,
      a: `While we specialize in ${city}, we also serve clients throughout ${state} and beyond. Remote collaboration is seamless with our proven process.`,
    },
    {
      q: `What's included in your ${category.title} package?`,
      a: `Our ${category.title} services include ${category.services
        .join(", ")
        .toLowerCase()}, plus ongoing support and optimization for ${city} businesses.`,
    },
    {
      q: `How do you ensure quality for ${city} projects?`,
      a: `We use proven methodologies, local market research, and continuous testing to ensure every ${category.title} project meets the highest standards for ${city} businesses.`,
    },
  ];

  // Randomly select 5-6 FAQs
  const selectedFAQs = faqTemplates
    .sort(() => 0.5 - Math.random())
    .slice(0, 5 + Math.floor(Math.random() * 2));

  return selectedFAQs
    .map((faq) => `  - q: "${faq.q}"\n    a: "${faq.a}"`)
    .join("\n");
}

function generateDynamicTestimonials(
  city: string,
  category: CategoryConfig
): string {
  const names = [
    "Sarah Martinez",
    "Michael Rodriguez",
    "Jennifer Lee",
    "David Chen",
    "Lisa Johnson",
    "Robert Wilson",
    "Maria Garcia",
    "James Brown",
  ];
  const surnames = [
    "Martinez",
    "Rodriguez",
    "Lee",
    "Chen",
    "Johnson",
    "Wilson",
    "Garcia",
    "Brown",
    "Davis",
    "Miller",
  ];

  const testimonialTemplates = [
    `Working with Moydus transformed our online presence. The ${category.title} project delivered exactly what we needed for our ${city} business.`,
    `Fast, professional, and results-driven. Our business saw immediate improvements after launch. Highly recommend for ${city} businesses.`,
    `Local expertise combined with modern ${category.title} techniques. The team understood the ${city} market perfectly.`,
    `Outstanding ${category.title} service in ${city}. The team delivered beyond our expectations and helped us grow significantly.`,
    `Professional, reliable, and effective. Our ${category.title} project was completed on time and within budget. Perfect for ${city} businesses.`,
    `The best ${category.title} agency in ${city}. They understood our needs and delivered exceptional results that exceeded our goals.`,
    `Excellent ${category.title} services for our ${city} business. Fast delivery, great communication, and outstanding results.`,
    `Moydus made our ${category.title} project seamless. Their local expertise in ${city} really shows in the quality of their work.`,
  ];

  const selectedTestimonials = testimonialTemplates
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return selectedTestimonials
    .map((testimonial, index) => {
      const name = names[Math.floor(Math.random() * names.length)];
      return `  - name: "${name}"\n    city: "${city}"\n    rating: 5\n    text: "${testimonial}"`;
    })
    .join("\n");
}

function generateDynamicBenefitsGrid(
  city: string,
  category: CategoryConfig
): string {
  const benefitTemplates = [
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      text: `Fast ${category.timeline} delivery`,
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      text: `Local ${city} expertise`,
    },
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      text: "Proven results",
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      text: `Transparent ${category.priceRange} pricing`,
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      text: "24/7 support",
    },
    {
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      text: "Analytics & reporting",
    },
  ];

  const selectedBenefits = benefitTemplates
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
${selectedBenefits
  .map(
    (benefit) => `    <div className="flex items-center">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="${benefit.icon}"
          />
        </svg>
      </div>
      <span className="text-gray-700">${benefit.text}</span>
    </div>`
  )
  .join("\n")}
  </div>`;
}

function generateDynamicCategories(
  city: string,
  state: string,
  country: string,
  category: CategoryConfig
): string {
  const baseCategories = [
    `"${category.title}"`,
    `"Local Business Services"`,
    `"${state} Services"`,
    `"${country} Business"`,
  ];

  // Add related categories based on the main category
  const relatedCategories = [];
  if (category.key.includes("web") || category.key.includes("design")) {
    relatedCategories.push(
      '"Web Development"',
      '"UI/UX Design"',
      '"Digital Design"'
    );
  }
  if (category.key.includes("seo") || category.key.includes("marketing")) {
    relatedCategories.push(
      '"Digital Marketing"',
      '"SEO Services"',
      '"Local SEO"'
    );
  }
  if (category.key.includes("ecommerce") || category.key.includes("commerce")) {
    relatedCategories.push(
      '"E-commerce Development"',
      '"Online Business"',
      '"Digital Commerce"'
    );
  }
  if (category.key.includes("app") || category.key.includes("mobile")) {
    relatedCategories.push(
      '"Mobile App Development"',
      '"App Design"',
      '"Mobile Solutions"'
    );
  }

  // Add location-specific categories
  const locationCategories = [
    `"${city} Business Services"`,
    `"${state} Digital Services"`,
    `"${country} Technology Services"`,
  ];

  const allCategories = [
    ...baseCategories,
    ...relatedCategories,
    ...locationCategories,
  ];

  // Remove duplicates and limit to 8 categories
  const uniqueCategories = [...new Set(allCategories)].slice(0, 8);

  return uniqueCategories.map((cat) => `  - ${cat}`).join("\n");
}

function generateDynamicRelatedServices(category: CategoryConfig): string {
  // Get all categories except the current one
  const allCategories = categories.filter((cat) => cat.key !== category.key);

  // Define related services based on category type
  let relatedServices = [];

  if (category.key.includes("web") || category.key.includes("design")) {
    relatedServices = [
      "Local SEO",
      "Digital Marketing",
      "Conversion Optimization",
      "Branding",
    ];
  } else if (
    category.key.includes("seo") ||
    category.key.includes("marketing")
  ) {
    relatedServices = [
      "Web Design",
      "Content Marketing",
      "PPC Ads",
      "Conversion Optimization",
    ];
  } else if (category.key.includes("ecommerce")) {
    relatedServices = [
      "Web Design",
      "Local SEO",
      "Digital Marketing",
      "Conversion Optimization",
    ];
  } else if (category.key.includes("app")) {
    relatedServices = [
      "Web Design",
      "UI/UX Design",
      "Digital Marketing",
      "Branding",
    ];
  } else if (category.key.includes("branding")) {
    relatedServices = [
      "Web Design",
      "Content Marketing",
      "Digital Marketing",
      "Local SEO",
    ];
  } else {
    // Default related services
    relatedServices = [
      "Web Design",
      "Local SEO",
      "Digital Marketing",
      "Conversion Optimization",
    ];
  }

  // Add some random additional services from the category list
  const additionalServices = allCategories
    .filter((cat) => !relatedServices.includes(cat.title))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((cat) => cat.title);

  const finalServices = [...relatedServices, ...additionalServices].slice(0, 6);

  return finalServices.map((service) => `  - "${service}"`).join("\n");
}

function generateDynamicProcessSteps(
  city: string,
  category: CategoryConfig
): string {
  const processTemplates = {
    "web-design": [
      {
        title: "Discovery & Strategy",
        description: `We analyze your ${city} business needs and create a custom design strategy that resonates with your local market.`,
      },
      {
        title: "Design & Development",
        description: `Our team creates stunning, mobile-first designs optimized for ${city} businesses and their customers.`,
      },
      {
        title: "Launch & Optimization",
        description: `We launch your site and continuously optimize based on ${city} market performance and user feedback.`,
      },
    ],
    seo: [
      {
        title: "Audit & Analysis",
        description: `We conduct a comprehensive SEO audit of your ${city} business and identify growth opportunities.`,
      },
      {
        title: "Strategy & Implementation",
        description: `We develop and implement a custom SEO strategy tailored to your ${city} market and industry.`,
      },
      {
        title: "Monitoring & Growth",
        description: `We track performance and continuously optimize to improve your ${city} search rankings.`,
      },
    ],
    marketing: [
      {
        title: "Market Research",
        description: `We research your ${city} target audience and develop data-driven marketing strategies.`,
      },
      {
        title: "Campaign Creation",
        description: `We create compelling campaigns that resonate with ${city} customers and drive conversions.`,
      },
      {
        title: "Analysis & Optimization",
        description: `We monitor results and optimize campaigns for maximum ROI in the ${city} market.`,
      },
    ],
    ecommerce: [
      {
        title: "Platform Setup",
        description: `We set up your e-commerce platform optimized for ${city} customers and local market needs.`,
      },
      {
        title: "Design & Integration",
        description: `We create a seamless shopping experience and integrate with local payment methods.`,
      },
      {
        title: "Launch & Growth",
        description: `We launch your store and implement growth strategies to maximize ${city} sales.`,
      },
    ],
  };

  const steps =
    processTemplates[category.key as keyof typeof processTemplates] ||
    processTemplates["web-design"];

  return `<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${steps
  .map(
    (step, index) => `    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-2xl font-bold">${index + 1}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        ${step.title}
      </h3>
      <p className="text-gray-600">${step.description}</p>
    </div>`
  )
  .join("\n")}
  </div>`;
}

function generateDynamicPricingSection(
  city: string,
  category: CategoryConfig
): string {
  const priceRange = category.priceRange;
  const [lowPrice, highPrice] = priceRange.split("–").map((p) => p.trim());

  const pricingTemplates = {
    "web-design": {
      starter: {
        name: "Starter",
        price: lowPrice,
        features: [
          "Basic Website Design",
          "Mobile Optimization",
          "Local SEO Setup",
          "30-day Support",
        ],
      },
      professional: {
        name: "Professional",
        price: priceRange,
        features: [
          "Custom Design",
          "Full SEO Optimization",
          "Analytics Setup",
          "60-day Support",
          "Performance Monitoring",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Custom Development",
          "Advanced Integrations",
          "Priority Support",
          "Ongoing Optimization",
          "Dedicated Manager",
        ],
      },
    },
    seo: {
      starter: {
        name: "Local SEO",
        price: lowPrice,
        features: [
          "Google Business Profile",
          "Local Citations",
          "Basic Keyword Research",
          "Monthly Reports",
        ],
      },
      professional: {
        name: "Full SEO",
        price: priceRange,
        features: [
          "Complete SEO Audit",
          "Technical Optimization",
          "Content Strategy",
          "Link Building",
          "Advanced Analytics",
        ],
      },
      enterprise: {
        name: "Enterprise SEO",
        price: "Custom",
        features: [
          "Custom Strategy",
          "Advanced Tools",
          "Dedicated Team",
          "White-label Reports",
          "Priority Support",
        ],
      },
    },
    marketing: {
      starter: {
        name: "Social Media",
        price: lowPrice,
        features: [
          "Platform Setup",
          "Content Creation",
          "Community Management",
          "Basic Analytics",
        ],
      },
      professional: {
        name: "Digital Marketing",
        price: priceRange,
        features: [
          "Multi-channel Strategy",
          "Paid Advertising",
          "Email Marketing",
          "Conversion Tracking",
          "ROI Optimization",
        ],
      },
      enterprise: {
        name: "Full Marketing",
        price: "Custom",
        features: [
          "Complete Strategy",
          "Advanced Automation",
          "Dedicated Team",
          "Custom Tools",
          "Priority Support",
        ],
      },
    },
  };

  const packages =
    pricingTemplates[category.key as keyof typeof pricingTemplates] ||
    pricingTemplates["web-design"];

  return `<div className="bg-white rounded-lg shadow-md p-8 mb-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
    Transparent Pricing for ${city} Businesses
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="border border-gray-200 rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">${
        packages.starter.name
      }</h3>
      <div className="text-3xl font-bold text-blue-600 mb-4">
        ${packages.starter.price}
      </div>
      <p className="text-gray-600 mb-4">Perfect for new ${city} businesses</p>
      <ul className="text-sm text-gray-600 space-y-2">
        ${packages.starter.features
          .map((feature) => `<li>✓ ${feature}</li>`)
          .join("\n        ")}
      </ul>
    </div>

    <div className="border-2 border-blue-600 rounded-lg p-6 text-center relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">${
        packages.professional.name
      }</h3>
      <div className="text-3xl font-bold text-blue-600 mb-4">
        ${packages.professional.price}
      </div>
      <p className="text-gray-600 mb-4">Our most popular package</p>
      <ul className="text-sm text-gray-600 space-y-2">
        ${packages.professional.features
          .map((feature) => `<li>✓ ${feature}</li>`)
          .join("\n        ")}
      </ul>
    </div>

    <div className="border border-gray-200 rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">${
        packages.enterprise.name
      }</h3>
      <div className="text-3xl font-bold text-blue-600 mb-4">${
        packages.enterprise.price
      }</div>
      <p className="text-gray-600 mb-4">For established brands</p>
      <ul className="text-sm text-gray-600 space-y-2">
        ${packages.enterprise.features
          .map((feature) => `<li>✓ ${feature}</li>`)
          .join("\n        ")}
      </ul>
    </div>
  </div>

  <div className="text-center mt-8">
    <a
      href="https://moydus.com/contact"
      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
    >
      Get Custom Quote
    </a>
  </div>
</div>`;
}

function generateDynamicMarketInsights(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const marketInsights = [
    `The ${category.title.toLowerCase()} market in ${city} is experiencing significant growth, with local businesses increasingly investing in digital solutions.`,
    `Recent data shows that ${city} businesses using professional ${category.title.toLowerCase()} services see 40% higher conversion rates compared to DIY solutions.`,
    `The average project timeline for ${category.title.toLowerCase()} in ${city} is ${
      category.timeline
    }, with most businesses seeing results within the first month.`,
    `Local competition in ${city} is moderate, creating opportunities for businesses that invest in quality ${category.title.toLowerCase()} services.`,
    `Market trends indicate that mobile-first ${category.title.toLowerCase()} approaches are essential for success in the ${city} market.`,
  ];

  const selectedInsights = marketInsights
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return `<div className="bg-blue-50 rounded-lg p-6 mb-8">
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
    ${city} Market Analysis
  </h2>
  <div className="space-y-4">
    ${selectedInsights
      .map((insight) => `<p className="text-gray-700">${insight}</p>`)
      .join("\n    ")}
  </div>
</div>

<div className="bg-white rounded-lg shadow-md p-6 mb-8">
  <h3 className="text-xl font-semibold text-gray-900 mb-4">
    Pricing Insights for ${city}
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h4 className="font-semibold text-gray-900">Average Investment</h4>
      <p className="text-gray-600">${category.priceRange}</p>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">Typical Timeline</h4>
      <p className="text-gray-600">${category.timeline}</p>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">ROI Timeline</h4>
      <p className="text-gray-600">3-6 months</p>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">Success Rate</h4>
      <p className="text-gray-600">95% of ${city} clients</p>
    </div>
  </div>
</div>`;
}

function generateDynamicCTAConfig(
  city: string,
  category: CategoryConfig
): string {
  const ctaVariations = [
    {
      primary: `Start Your ${category.title} Project in ${city}`,
      secondary: `View ${category.title} Portfolio`,
      ctaUrl: "https://moydus.com/contact",
    },
    {
      primary: `Get Free ${category.title} Consultation`,
      secondary: `See ${city} Success Stories`,
      ctaUrl: "https://moydus.com/contact",
    },
    {
      primary: `Transform Your ${city} Business`,
      secondary: `Learn About ${category.title}`,
      ctaUrl: "https://moydus.com/contact",
    },
  ];

  const selectedCTA =
    ctaVariations[Math.floor(Math.random() * ctaVariations.length)];

  return `  primary: "${selectedCTA.primary}"
  secondary: "${selectedCTA.secondary}"
  ctaUrl: "${selectedCTA.ctaUrl}"`;
}

function generateDynamicTestimonialsSection(
  city: string,
  category: CategoryConfig
): string {
  const testimonials = generateDynamicTestimonials(city, category).split("\n");
  const testimonialObjects = [];

  for (let i = 0; i < testimonials.length; i += 4) {
    if (testimonials[i] && testimonials[i].includes("name:")) {
      const name = testimonials[i].split('"')[1];
      const cityName = testimonials[i + 1].split('"')[1];
      const text = testimonials[i + 3].split('"')[1];
      testimonialObjects.push({ name, city: cityName, text });
    }
  }

  return `<div className="mb-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
    What ${city} Businesses Say
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
${testimonialObjects
  .map(
    (
      testimonial,
      index
    ) => `    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-blue-600 font-semibold">${testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">${testimonial.name}</h4>
          <p className="text-sm text-gray-600">${city} Business Owner</p>
        </div>
      </div>
      <p className="text-gray-700 italic">
        "${testimonial.text}"
      </p>
      <div className="flex text-yellow-400 mt-3">{"★".repeat(5)}</div>
    </div>`
  )
  .join("\n")}
  </div>
</div>`;
}

function generateDynamicFAQSection(
  city: string,
  state: string,
  category: CategoryConfig
): string {
  const faqs = generateDynamicFAQs(city, state, category).split("\n");
  const faqObjects = [];

  for (let i = 0; i < faqs.length; i += 2) {
    if (faqs[i] && faqs[i].includes("q:")) {
      const question = faqs[i].split('"')[1];
      const answer = faqs[i + 1].split('"')[1];
      faqObjects.push({ question, answer });
    }
  }

  return `<div className="bg-gray-50 rounded-lg p-8 mb-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
    Common Questions About ${category.title} in ${city}
  </h2>

  <div className="space-y-6">
${faqObjects
  .map(
    (faq) => `    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        ${faq.question}
      </h3>
      <p className="text-gray-700">
        ${faq.answer}
      </p>
    </div>`
  )
  .join("\n")}
  </div>
</div>`;
}

interface Country {
  name: string;
  iso2?: string;
  currency?: string;
  languages?: string[];
  topStatesCities: { state: string; cities: string[] }[];
  locale?: string;
}

interface StateMeta {
  isoCode?: string;
  iso31662?: string;
}

interface CityMeta {
  latitude?: string;
  longitude?: string;
}

const stateIndex = new Map<string, StateMeta>();
const cityIndex = new Map<string, CityMeta>();

locationDataset.forEach((country: any) => {
  const countryName = country?.name;
  if (!countryName) return;

  (country.states || []).forEach((state: any) => {
    const stateName = state?.name;
    if (!stateName) return;

    const iso31662 =
      typeof state?.iso3166_2 === "string" ? state.iso3166_2 : undefined;
    const isoCode =
      typeof state?.iso2 === "string" && state.iso2
        ? state.iso2
        : typeof state?.state_code === "string" && state.state_code
        ? state.state_code
        : iso31662
        ? iso31662.split("-").pop()
        : undefined;

    const stateKey = makeLocationKey(countryName, stateName);
    stateIndex.set(stateKey, { isoCode, iso31662 });

    (state.cities || []).forEach((city: any) => {
      const cityName = city?.name;
      if (!cityName) return;

      const cityKey = makeLocationKey(countryName, stateName, cityName);

      cityIndex.set(cityKey, {
        latitude: city?.latitude,
        longitude: city?.longitude,
      });
    });
  });
});

const todayISO = new Date().toISOString().slice(0, 10);
const todayISOWithSpaces = todayISO.replace(/-/g, " - ");

console.log(`🚀 Starting optimized MDX generation...`);
console.log(`📊 Found ${categories.length} categories`);
console.log(`🌐 All content will be in English only (no locales)`);

// ✅ All countries use English content only
const countries = (data.priorityCountries || []).map((country: Country) => ({
  ...country,
  locale: "en", // English content only, no localization
}));

// ✅ Filter only countries with existing states/cities
const filteredData = countries.filter(
  (c: any) => c.topStatesCities && c.topStatesCities.length > 0
);

console.log(`📍 Processing ${filteredData.length} countries...`);

// ✅ No limit on cities per state - use all cities from priorityCountries.json

filteredData.forEach((country: Country) => {
  if (!country.topStatesCities || country.topStatesCities.length === 0) {
    console.log(`⚠️ Skipping ${country.name} (no states/cities)`);
    return;
  }

  const countrySlug = slugify(country.name);
  const locale = "en"; // English-only output for all content

  console.log(`\n🌍 Processing ${country.name} (${locale})...`);

  (country.topStatesCities || []).forEach((state) => {
    const stateSlug = slugify(state.state);
    const limitedCities = state.cities || [];

    // Skip states with no cities
    if (!limitedCities.length) {
      console.log(`  ⚠️ Skipping ${state.state} (no cities found)`);
      return;
    }

    console.log(`  📍 ${state.state} (${limitedCities.length} cities)`);

    limitedCities.forEach((city) => {
      const cityName =
        typeof city === "string" ? city : (city as { name: string }).name;
      if (!cityName) return;

      const locationMeta = getGeoMetadata(country.name, state.state, cityName);

      const citySlug = slugify(cityName);

      categories.forEach((cat: CategoryConfig) => {
        if (!cat.key || !cat.title) {
          totalSkipped++;
          return;
        }

        const servicesArray = JSON.stringify(cat.services);

        try {
          // All content is English, no locale folders needed
          const fileDir = path.join(outDir, countrySlug, stateSlug, citySlug);

          fs.mkdirSync(fileDir, { recursive: true });

          const primaryKeywords = fillKeywords(
            cat.primaryKeywords,
            cat.title,
            cityName,
            state.state,
            country.name
          );
          const secondaryKeywords = fillKeywords(
            cat.secondaryKeywords,
            cat.title,
            cityName,
            state.state,
            country.name
          );

          const primaryKeywordsList = primaryKeywords
            .map((kw) => `  - "${kw}"`)
            .join("\n");
          const secondaryKeywordsList = secondaryKeywords
            .map((kw) => `  - "${kw}"`)
            .join("\n");
          const servicesList = cat.services
            .map((service) => `  - "${service}"`)
            .join("\n");

          const categorySnippet = `Professional ${cat.title} for ${cityName} businesses — ${cat.timeline} launch, proven results.`;
          const categoryBenefit = getBenefitText(cat.key);

          // Generate dynamic content
          const dynamicTitle = generateDynamicTitle(cityName, state.state, cat);
          const dynamicMetaTitle = generateDynamicMetaTitle(
            cityName,
            state.state,
            cat
          );
          const dynamicMetaDescription = generateDynamicMetaDescription(
            cityName,
            state.state,
            cat
          );
          const dynamicValueProposition = generateDynamicValueProposition(
            cityName,
            cat
          );
          const dynamicFAQs = generateDynamicFAQs(cityName, state.state, cat);
          const dynamicTestimonials = generateDynamicTestimonials(
            cityName,
            cat
          );
          const dynamicBenefitsGrid = generateDynamicBenefitsGrid(
            cityName,
            cat
          );
          const dynamicCategories = generateDynamicCategories(
            cityName,
            state.state,
            country.name,
            cat
          );
          const dynamicRelatedServices = generateDynamicRelatedServices(cat);
          const dynamicProcessSteps = generateDynamicProcessSteps(
            cityName,
            cat
          );
          const dynamicMarketInsights = generateDynamicMarketInsights(
            cityName,
            state.state,
            cat
          );
          const dynamicCTAConfig = generateDynamicCTAConfig(cityName, cat);

          const filled = template
            .replace(/{dynamicTitle}/g, dynamicTitle)
            .replace(/{dynamicMetaTitle}/g, dynamicMetaTitle)
            .replace(/{dynamicMetaDescription}/g, dynamicMetaDescription)
            .replace(/{dynamicValueProposition}/g, dynamicValueProposition)
            .replace(/{dynamicFAQs}/g, dynamicFAQs)
            .replace(/{dynamicTestimonials}/g, dynamicTestimonials)
            .replace(/{dynamicBenefitsGrid}/g, dynamicBenefitsGrid)
            .replace(/{dynamicHeadline}/g, dynamicTitle)
            .replace(/{dynamicSubheadline}/g, dynamicMetaDescription)
            .replace(/{dynamicBenefit}/g, categoryBenefit)
            .replace(/{dynamicSnippet}/g, categorySnippet)
            .replace(/{dynamicPrimaryKeywords}/g, primaryKeywordsList)
            .replace(/{dynamicSecondaryKeywords}/g, secondaryKeywordsList)
            .replace(/{dynamicCategories}/g, dynamicCategories)
            .replace(/{dynamicRelatedServices}/g, dynamicRelatedServices)
            .replace(/{dynamicProcessSteps}/g, dynamicProcessSteps)
            .replace(/{dynamicMarketInsights}/g, dynamicMarketInsights)
            .replace(/{dynamicCTAConfig}/g, dynamicCTAConfig)
            .replace(
              /{dynamicTestimonialsSection}/g,
              generateDynamicTestimonialsSection(cityName, cat)
            )
            .replace(
              /{dynamicFAQSection}/g,
              generateDynamicFAQSection(cityName, state.state, cat)
            )
            .replace(/{categoryTitle}/g, cat.title)
            .replace(/{categoryDisplay}/g, cat.title)
            .replace(/{categoryKey}/g, cat.key)
            .replace(/{categoryPrice}/g, cat.priceRange)
            .replace(/{categoryTimeline}/g, cat.timeline)
            .replace(/{categoryTargetAudience}/g, cat.targetAudience)
            .replace(/{categorySnippet}/g, categorySnippet)
            .replace(/{categoryBenefit}/g, categoryBenefit)
            .replace(/{locale}/g, locale)
            .replace(/{countrySlug}/g, countrySlug)
            .replace(/{stateSlug}/g, stateSlug)
            .replace(/{citySlug}/g, citySlug)
            .replace(/{city}/g, cityName)
            .replace(/{state}/g, state.state)
            .replace(/{countryName}/g, country.name)
            .replace(/{countryCode}/g, country.iso2 || "US")
            .replace(/{primaryKeywordsList}/g, primaryKeywordsList)
            .replace(/{secondaryKeywordsList}/g, secondaryKeywordsList)
            .replace(/{servicesList}/g, servicesList)
            .replace(/{servicesArray}/g, servicesArray)
            .replace(/{latitude}/g, locationMeta.latitude)
            .replace(/{longitude}/g, locationMeta.longitude)
            .replace(/{stateCode}/g, locationMeta.stateCode)
            .replace(/{currentDate}/g, todayISO)
            .replace(/{YYYY-MM-DD}/g, todayISO)
            .replace(/{YYYY - MM - DD}/g, todayISOWithSpaces);

          const outPath = path.join(fileDir, `${cat.key}.mdx`);
          fs.writeFileSync(outPath, filled, "utf8");
          totalGenerated++;

          if (totalGenerated % 1000 === 0) {
            console.log(`    ✅ Generated ${totalGenerated} pages...`);
          }
        } catch (error) {
          console.error(
            `❌ Error generating ${cat.key} for ${cityName}: ${error}`
          );
          totalSkipped++;
        }
      });
    });
  });
});

function slugify(str?: string): string {
  if (!str) return "unknown";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function normalizeForKey(value?: string): string {
  if (!value) return "";
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function makeLocationKey(...parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .map((part) => normalizeForKey(part))
    .join("|");
}

function formatCoordinate(value?: string | number): string {
  if (value === undefined || value === null || value === "") return "0";
  const numericValue =
    typeof value === "number" ? value : parseFloat(String(value));
  if (!Number.isFinite(numericValue)) return "0";
  return numericValue.toFixed(6);
}

function getGeoMetadata(
  countryName: string,
  stateName: string,
  cityName: string
) {
  const stateMeta = stateIndex.get(makeLocationKey(countryName, stateName));
  const cityMeta = cityIndex.get(
    makeLocationKey(countryName, stateName, cityName)
  );

  const stateCode =
    stateMeta?.isoCode ||
    (stateMeta?.iso31662
      ? stateMeta.iso31662.split("-").pop() || stateMeta.iso31662
      : undefined) ||
    stateName;

  return {
    latitude: formatCoordinate(cityMeta?.latitude),
    longitude: formatCoordinate(cityMeta?.longitude),
    stateCode,
  };
}

console.log("\n" + "=".repeat(50));
console.log("🎉 Optimized MDX Generation Complete!");
console.log("=".repeat(50));
console.log(`📊 Statistics:`);
console.log(`   ✅ Generated: ${totalGenerated} pages`);
console.log(`   ⚠️ Skipped: ${totalSkipped} invalid categories`);
console.log(`   📁 Output: ${outDir}/`);
console.log(`   🗂️ Categories: ${categories.length}`);
console.log(`   🌐 Countries: ${filteredData.length}`);
console.log(`   🏙️ Cities per state: All cities from priorityCountries.json`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Review: tree ${outDir} -L 4`);
console.log(`   2. Test: bun run dev`);
console.log(`   3. Deploy: vercel --prod`);
console.log("=".repeat(50));

const summaryStats = {
  generated: totalGenerated,
  skipped: totalSkipped,
  categories: categories.length,
  countries: filteredData.length,
  maxCitiesPerState: "All cities from priorityCountries.json",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(
  path.join(outDir, "generation-stats.json"),
  JSON.stringify(summaryStats, null, 2),
  "utf8"
);
console.log(`📄 Summary written to ${outDir}/generation-stats.json`);
