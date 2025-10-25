// Anti-duplicate content strategies
export interface ContentVariations {
  headlines: string[];
  introductions: string[];
  benefits: string[];
  processSteps: string[];
  closingStatements: string[];
}

export function generateContentVariations(city: string, category: string): ContentVariations {
  return {
    headlines: [
      `Professional ${category} Services in ${city} (2025)`,
      `Top-Rated ${city} ${category} Experts — Quality Results`,
      `${city}'s Leading ${category} Solutions for Growing Businesses`,
      `Expert ${category} in ${city} — Fast & Effective`,
      `${category} Excellence in ${city} — Proven Track Record`
    ],
    
    introductions: [
      `${city} businesses trust our ${category} expertise to drive real results.`,
      `Looking for top ${category} services in ${city}? You've found the right team.`,
      `${city} is a thriving market for digital innovation — especially in ${category}.`,
      `Transform your ${city} business with our proven ${category} solutions.`,
      `Join successful ${city} companies who choose our ${category} services.`
    ],
    
    benefits: [
      `Custom, Conversion-Focused Solutions`,
      `Proven Results for ${city} Businesses`,
      `Fast Delivery with Local Expertise`,
      `Modern Approaches That Drive Growth`,
      `Strategic Solutions Built for Success`
    ],
    
    processSteps: [
      {
        step1: `Discovery & ${city} Market Analysis`,
        step2: `Strategic Planning & Design`,
        step3: `Implementation & Launch`
      },
      {
        step1: `Consultation & Goal Setting`,
        step2: `Development & Optimization`, 
        step3: `Launch & Performance Monitoring`
      },
      {
        step1: `Research & Competitive Analysis`,
        step2: `Custom Solution Development`,
        step3: `Testing & Deployment`
      }
    ],
    
    closingStatements: [
      `Ready to grow your ${city} business with ${category}?`,
      `Let's build something amazing for your ${city} company.`,
      `Join hundreds of ${city} businesses that trust our expertise.`,
      `Take your ${city} business to the next level.`,
      `Start your ${category} project in ${city} today.`
    ]
  };
}

// Hash-based content selection for consistency
export function selectVariation<T>(variations: T[], seed: string): T {
  const hash = seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(hash) % variations.length;
  return variations[index];
}

// Dynamic keyword generation
export function generateKeywords(city: string, category: string, country: string) {
  const baseKeywords = [
    `${category} ${city}`,
    `${city} ${category}`,
    `${category} services ${city}`,
    `best ${category} ${city}`,
    `${category} company ${city}`,
    `${category} agencies ${city}`,
    `professional ${category} ${city}`,
    `${city} ${category} experts`,
    `${category} solutions ${city}`,
    `top ${category} providers ${city}`
  ];

  const countrySpecific = [
    `${category} ${city} ${country}`,
    `${country} ${category} services`,
    `${city} ${country} ${category}`
  ];

  const longTail = [
    `affordable ${category} services in ${city}`,
    `best ${category} company near me ${city}`,
    `${category} consultation ${city}`,
    `custom ${category} solutions ${city}`,
    `${category} optimization ${city}`,
    `professional ${category} help ${city}`,
    `${category} strategy ${city}`,
    `${category} implementation ${city}`
  ];

  return {
    primary: baseKeywords,
    countrySpecific,
    longTail
  };
}

// Dynamic meta generation
export function generateMeta(city: string, category: string, state: string, variation: string) {
  const variations = generateContentVariations(city, category);
  const selectedHeadline = selectVariation(variations.headlines, variation);
  const selectedIntro = selectVariation(variations.introductions, variation);
  
  return {
    title: selectedHeadline,
    description: `${selectedIntro} Fast delivery, proven results, local expertise. Get started today.`,
    openGraph: {
      title: selectedHeadline,
      description: selectedIntro,
      image: `/og-images/${city.toLowerCase()}-${category}.png`
    },
    twitter: {
      title: `${category} in ${city} — Fast & Effective`,
      description: `Professional ${category} for ${city} businesses. Proven results.`,
      image: `/twitter-cards/${city.toLowerCase()}-${category}.png`
    }
  };
}