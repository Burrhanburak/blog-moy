interface ContentParams {
  city: string;
  state: string;
  country: string;
  category: {
    key: string;
    title: string;
    description: string;
    priceRange: string;
    timeline: string;
  };
  year: number;
}

export function generateUniqueContent(params: ContentParams) {
  const { city, state, country, category, year } = params;
  
  // Seed based on city + category for consistent but unique content
  const seed = `${city}-${category.key}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return {
    sections: generateSections(params, seed),
    faqs: generateFAQs(params, seed),
    keyTakeaways: generateKeyTakeaways(params, seed),
    insights: generateInsights(params, seed),
  };
}

function generateSections(params: ContentParams, seed: string) {
  const { city, category } = params;
  
  const sectionTemplates = [
    {
      heading: `Why Choose Professional ${category.title} in ${city}?`,
      body: [
        `${city} businesses need ${category.title.toLowerCase()} solutions that understand the local market dynamics and customer behavior.`,
        `Our ${category.title.toLowerCase()} approach combines industry best practices with ${city}-specific insights to deliver measurable results.`,
        `From initial consultation to project completion, we ensure your ${category.title.toLowerCase()} investment drives real business growth in ${city}.`
      ]
    },
    {
      heading: `${category.title} Process That Works in ${city}`,
      body: [
        `We start every ${category.title.toLowerCase()} project with a comprehensive analysis of your ${city} market position and competitive landscape.`,
        `Our team develops custom strategies that align with ${city} business goals and customer expectations.`,
        `Implementation follows proven methodologies while remaining flexible to ${city} market opportunities and challenges.`
      ]
    },
    {
      heading: `Measuring ${category.title} Success in ${city}`,
      body: [
        `Every ${category.title.toLowerCase()} project includes clear success metrics and regular performance reporting.`,
        `We track key indicators that matter to ${city} businesses: conversion rates, customer acquisition, and ROI.`,
        `Ongoing optimization ensures your ${category.title.toLowerCase()} continues delivering value as your ${city} business grows.`
      ]
    }
  ];

  // Use seed to select which sections to include (2-3 sections per page)
  const selectedSections = seedBasedSelection(sectionTemplates, seed, 2, 3);
  return selectedSections;
}

function generateFAQs(params: ContentParams, seed: string) {
  const { city, state, category } = params;
  
  const faqTemplates = [
    {
      q: `How long does a typical ${category.title.toLowerCase()} project take in ${city}?`,
      a: `Most ${category.title.toLowerCase()} projects in ${city} are completed within ${category.timeline}. Timeline depends on project scope, client requirements, and any custom integrations needed for your ${city} business.`
    },
    {
      q: `What's the investment for ${category.title.toLowerCase()} services in ${city}, ${state}?`,
      a: `${category.title} pricing in ${city} typically ranges ${category.priceRange}, depending on project complexity and specific business requirements. We provide transparent quotes with no hidden fees.`
    },
    {
      q: `Do you work with ${city} businesses remotely or on-site?`,
      a: `We offer both remote and on-site ${category.title.toLowerCase()} services for ${city} clients. Many projects can be completed remotely, with in-person meetings available when needed.`
    },
    {
      q: `What makes your ${category.title.toLowerCase()} different in ${city}?`,
      a: `Our ${category.title.toLowerCase()} approach focuses on ${city} market dynamics, local customer behavior, and proven strategies that work for businesses in ${state}. We combine technical expertise with local market knowledge.`
    },
    {
      q: `Do you provide ongoing support after ${category.title.toLowerCase()} completion?`,
      a: `Yes, we offer comprehensive post-launch support including performance monitoring, updates, and optimization services to ensure your ${category.title.toLowerCase()} continues delivering results for your ${city} business.`
    }
  ];

  return seedBasedSelection(faqTemplates, seed, 3, 4);
}

function generateKeyTakeaways(params: ContentParams, seed: string) {
  const { city, category } = params;
  
  const takeawayTemplates = [
    `Professional ${category.title.toLowerCase()} drives measurable business growth for ${city} companies.`,
    `Local expertise combined with proven methodologies delivers superior results in ${city} market.`,
    `Transparent pricing and clear timelines make ${category.title.toLowerCase()} accessible for ${city} businesses.`,
    `Ongoing optimization ensures long-term success and ROI for your ${city} investment.`,
    `Custom strategies address unique challenges and opportunities in ${city} market.`
  ];

  return seedBasedSelection(takeawayTemplates, seed, 2, 3);
}

function generateInsights(params: ContentParams, seed: string) {
  const { city, category } = params;
  
  const insightTemplates = [
    {
      title: "Pro Tip",
      variant: "tip",
      body: `${city} businesses that invest in professional ${category.title.toLowerCase()} see 3x better results than DIY approaches.`
    },
    {
      title: "Important Note",
      variant: "warning", 
      body: `Don't delay ${category.title.toLowerCase()} implementation - ${city} market competition is increasing rapidly.`
    },
    {
      title: "Success Factor",
      variant: "success",
      body: `${city} companies with optimized ${category.title.toLowerCase()} report 40% higher customer satisfaction.`
    },
    {
      title: "Market Insight",
      variant: "note",
      body: `${city} customers expect modern, professional ${category.title.toLowerCase()} - outdated approaches lose business.`
    }
  ];

  return seedBasedSelection(insightTemplates, seed, 1, 2);
}

// Deterministic selection based on seed
function seedBasedSelection<T>(items: T[], seed: string, min: number, max: number): T[] {
  const hash = simpleHash(seed);
  const count = min + (hash % (max - min + 1));
  const selected: T[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = (hash + i * 7) % items.length;
    if (!selected.includes(items[index])) {
      selected.push(items[index]);
    }
  }
  
  return selected.slice(0, count);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}