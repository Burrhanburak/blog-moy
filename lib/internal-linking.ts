export interface InternalLink {
  url: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  anchor?: string;
}

export interface LinkingContext {
  currentCity: string;
  currentState: string;
  currentCountry: string;
  currentCategory: string;
  locale: string;
}

// Generate intelligent internal links based on location and category
export function generateInternalLinks(context: LinkingContext): {
  relatedCities: InternalLink[];
  relatedCategories: InternalLink[];
  relatedGuides: InternalLink[];
  nearbyAreas: InternalLink[];
} {
  const { currentCity, currentState, currentCountry, currentCategory, locale } = context;
  
  // Related cities in the same state
  const relatedCities = generateRelatedCityLinks(currentState, currentCountry, currentCategory, locale);
  
  // Related service categories in the same city
  const relatedCategories = generateRelatedCategoryLinks(currentCity, currentState, currentCountry, locale);
  
  // Blog guides and comparison pages
  const relatedGuides = generateRelatedGuideLinks(currentCategory, currentCity);
  
  // Nearby geographic areas
  const nearbyAreas = generateNearbyAreaLinks(currentCity, currentState, currentCountry, currentCategory, locale);
  
  return {
    relatedCities,
    relatedCategories,
    relatedGuides,
    nearbyAreas
  };
}

function generateRelatedCityLinks(state: string, country: string, category: string, locale: string): InternalLink[] {
  // This would typically come from a database or API
  // For now, we'll use common city patterns
  const commonCities = getCitiesByState(state);
  
  return commonCities.slice(0, 6).map((city, index) => ({
    url: `/${locale}/${country.toLowerCase()}/${state.toLowerCase()}/${city.slug}/${category}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} in ${city.name}`,
    description: `Professional ${category} services in ${city.name}, ${state}`,
    category: 'related-city',
    priority: 10 - index,
    anchor: `${category} ${city.name}`
  }));
}

function generateRelatedCategoryLinks(city: string, state: string, country: string, locale: string): InternalLink[] {
  const relatedCategories = [
    { key: 'web-design', display: 'Web Design', description: 'Modern, conversion-focused websites' },
    { key: 'local-seo', display: 'Local SEO', description: 'Dominate local search results' },
    { key: 'ppc-ads', display: 'PPC Advertising', description: 'Targeted ads that drive leads' },
    { key: 'social-media-marketing', display: 'Social Media Marketing', description: 'Engaging social media strategies' },
    { key: 'content-marketing', display: 'Content Marketing', description: 'Content that converts' },
    { key: 'conversion-optimization', display: 'Conversion Optimization', description: 'Optimize for better results' }
  ];
  
  return relatedCategories.slice(0, 5).map((cat, index) => ({
    url: `/${locale}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${cat.key}`,
    title: `${cat.display} Services in ${city}`,
    description: cat.description,
    category: 'related-service',
    priority: 8 - index,
    anchor: cat.display
  }));
}

function generateRelatedGuideLinks(category: string, city: string): InternalLink[] {
  const guides = [
    {
      slug: `how-to-choose-${category}-provider`,
      title: `How to Choose the Right ${category.charAt(0).toUpperCase() + category.slice(1)} Provider`,
      description: `Complete guide to selecting the best ${category} services for your business`
    },
    {
      slug: `${category}-pricing-guide-2025`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Pricing Guide (2025)`,
      description: `Understanding costs and getting the best value for ${category} services`
    },
    {
      slug: `${category}-vs-alternatives`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} vs Alternatives: What's Best?`,
      description: `Compare different approaches to ${category} for your business`
    },
    {
      slug: `${category}-trends-2025`,
      title: `Top ${category.charAt(0).toUpperCase() + category.slice(1)} Trends for 2025`,
      description: `Latest innovations and trends in ${category} to watch`
    }
  ];
  
  return guides.map((guide, index) => ({
    url: `/blog/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    category: 'guide',
    priority: 6 - index,
    anchor: guide.title
  }));
}

function generateNearbyAreaLinks(city: string, state: string, country: string, category: string, locale: string): InternalLink[] {
  // Get nearby cities/areas (this would typically use geographic data)
  const nearbyAreas = getNearbyAreas(city, state);
  
  return nearbyAreas.slice(0, 4).map((area, index) => ({
    url: `/${locale}/${country.toLowerCase()}/${state.toLowerCase()}/${area.slug}/${category}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} in ${area.name}`,
    description: `${area.description} - ${area.distance} from ${city}`,
    category: 'nearby-area',
    priority: 5 - index,
    anchor: `${area.name} ${category}`
  }));
}

// Helper functions (would typically come from a database)
function getCitiesByState(state: string): Array<{name: string, slug: string}> {
  const cityData: Record<string, Array<{name: string, slug: string}>> = {
    'California': [
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'Sacramento', slug: 'sacramento' },
      { name: 'Oakland', slug: 'oakland' },
      { name: 'Fresno', slug: 'fresno' }
    ],
    'Texas': [
      { name: 'Houston', slug: 'houston' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Austin', slug: 'austin' },
      { name: 'San Antonio', slug: 'san-antonio' },
      { name: 'Fort Worth', slug: 'fort-worth' },
      { name: 'El Paso', slug: 'el-paso' }
    ],
    'Berlin': [
      { name: 'Mitte', slug: 'mitte' },
      { name: 'Kreuzberg', slug: 'kreuzberg' },
      { name: 'Prenzlauer Berg', slug: 'prenzlauer-berg' },
      { name: 'Charlottenburg', slug: 'charlottenburg' },
      { name: 'Friedrichshain', slug: 'friedrichshain' },
      { name: 'Neukölln', slug: 'neukolln' }
    ]
  };
  
  return cityData[state] || [];
}

function getNearbyAreas(city: string, state: string): Array<{name: string, slug: string, description: string, distance: string}> {
  // This would typically use geographic calculation
  const nearbyData: Record<string, Array<{name: string, slug: string, description: string, distance: string}>> = {
    'Berlin': [
      { name: 'Potsdam', slug: 'potsdam', description: 'Historic city with government offices', distance: '35 km' },
      { name: 'Brandenburg', slug: 'brandenburg', description: 'Industrial center', distance: '65 km' },
      { name: 'Frankfurt (Oder)', slug: 'frankfurt-oder', description: 'Border city with Poland', distance: '85 km' },
      { name: 'Cottbus', slug: 'cottbus', description: 'University city', distance: '120 km' }
    ]
  };
  
  return nearbyData[city] || nearbyData[state] || [];
}

// Generate contextual anchor text variations
export function generateAnchorVariations(keyword: string, city: string): string[] {
  return [
    keyword,
    `${keyword} in ${city}`,
    `${city} ${keyword}`,
    `professional ${keyword}`,
    `best ${keyword} ${city}`,
    `${keyword} services`,
    `${keyword} experts`,
    `${keyword} providers`,
    `${keyword} solutions`,
    `${keyword} specialists`
  ];
}

// Auto-link content with contextual internal links
export function autoLinkContent(content: string, context: LinkingContext): string {
  const links = generateInternalLinks(context);
  const allLinks = [...links.relatedCities, ...links.relatedCategories, ...links.relatedGuides];
  
  let processedContent = content;
  
  // Process links in order of priority
  allLinks
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 15) // Limit to 15 internal links max
    .forEach(link => {
      if (link.anchor) {
        const anchorVariations = generateAnchorVariations(link.anchor, context.currentCity);
        
        anchorVariations.forEach(anchor => {
          const regex = new RegExp(`\\b${anchor}\\b`, 'gi');
          const match = processedContent.match(regex);
          
          if (match && !processedContent.includes(`href="${link.url}"`)) {
            processedContent = processedContent.replace(
              regex,
              `[${match[0]}](${link.url})`
            );
            return; // Only replace first occurrence
          }
        });
      }
    });
  
  return processedContent;
}

// Smart internal linking for MDX components
export function generateSmartLinks(context: LinkingContext) {
  const links = generateInternalLinks(context);
  
  return {
    // Top 3 related services in same city
    relatedServices: links.relatedCategories.slice(0, 3),
    
    // Top 3 same service in nearby cities  
    nearbyCities: links.relatedCities.slice(0, 3),
    
    // Educational content
    guides: links.relatedGuides.slice(0, 2),
    
    // Geographic expansion
    nearbyAreas: links.nearbyAreas.slice(0, 2)
  };
}