interface LocationFAQParams {
  city?: string;
  state: string;
  country: string;
  locationLevel: 'state' | 'city';
}

export function generateLocationFAQs(params: LocationFAQParams) {
  const { city, state, country, locationLevel } = params;
  const location = city || state;
  const locationWithState = city ? `${city}, ${state}` : state;
  
  const seed = `${location}-${locationLevel}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const faqTemplates = {
    state: [
      {
        q: `What digital services are available across ${state}?`,
        a: `${state} offers comprehensive digital services including web design, development, SEO, digital marketing, e-commerce solutions, and business automation. Our team serves all major cities across ${state} with local expertise and proven results.`
      },
      {
        q: `How long do digital projects typically take in ${state}?`,
        a: `Most digital projects in ${state} are completed within 4-12 weeks, depending on scope and complexity. Simple websites launch in 3-4 weeks, while complex e-commerce or custom applications may take 8-12 weeks. We provide transparent timelines upfront.`
      },
      {
        q: `What's the investment range for digital services in ${state}, ${country}?`,
        a: `Digital service pricing in ${state} typically ranges from $2,500 for basic websites to $50,000+ for enterprise solutions. Most businesses invest $5,000-$15,000 for professional web design and digital marketing packages.`
      },
      {
        q: `Do you work with businesses across all cities in ${state}?`,
        a: `Yes, we serve businesses throughout ${state}, from major metropolitan areas to smaller communities. We offer both remote collaboration and on-site meetings when needed, ensuring every ${state} business receives the same high-quality service.`
      },
      {
        q: `What makes digital marketing different in ${state} compared to other regions?`,
        a: `${state} has unique market dynamics, customer behavior patterns, and competitive landscapes. Our digital strategies are tailored to ${state} audiences, incorporating local search optimization, regional marketing trends, and ${country}-specific best practices.`
      },
      {
        q: `How do you ensure projects succeed for ${state} businesses?`,
        a: `Success in ${state} comes from understanding local market conditions, customer preferences, and business environments. We combine technical expertise with ${state} market knowledge, provide ongoing support, and measure results that matter to ${state} businesses.`
      }
    ],
    city: [
      {
        q: `What digital services do you offer in ${locationWithState}?`,
        a: `In ${locationWithState}, we provide complete digital solutions: web design, development, SEO, digital marketing, e-commerce, and automation. Our ${city} team understands local market dynamics and customer behavior patterns.`
      },
      {
        q: `How quickly can you launch a project in ${city}?`,
        a: `Most ${city} projects launch within 3-8 weeks. Simple websites and landing pages can go live in 2-3 weeks, while comprehensive e-commerce or custom applications typically take 6-8 weeks. We prioritize speed without compromising quality.`
      },
      {
        q: `What do digital services cost in ${locationWithState}?`,
        a: `Digital service investment in ${city} ranges from $2,500 for professional websites to $25,000+ for comprehensive digital transformations. Most ${city} businesses invest $5,000-$12,000 for web design with integrated marketing.`
      },
      {
        q: `Do you meet in person with ${city} clients?`,
        a: `Yes, we offer both in-person meetings and remote collaboration for ${city} businesses. Many projects can be completed entirely remotely, but we're available for on-site consultations, strategy sessions, and team training in ${city}.`
      },
      {
        q: `Why choose local digital services in ${city} over national agencies?`,
        a: `Local ${city} expertise means understanding your specific market, customer base, and competitive landscape. We combine technical excellence with ${city} market knowledge, provide personalized service, and build long-term partnerships with local businesses.`
      },
      {
        q: `What ongoing support do you provide after launch in ${city}?`,
        a: `${city} clients receive comprehensive post-launch support including performance monitoring, content updates, technical maintenance, and digital marketing optimization. We ensure your digital presence continues driving results for your ${city} business.`
      }
    ]
  };

  const availableFAQs = faqTemplates[locationLevel];
  return seedBasedSelection(availableFAQs, seed, 4, 5);
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