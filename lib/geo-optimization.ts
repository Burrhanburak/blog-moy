export interface GeoTargeting {
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  timeZone: string;
  language: string;
  locale: string;
  priority: number;
  marketValue: 'high' | 'medium' | 'low';
}

export interface CurrencyData {
  code: string;
  symbol: string;
  name: string;
  exchangeRate?: number;
}

// High-value markets prioritized for full content generation
export const HIGH_VALUE_MARKETS: GeoTargeting[] = [
  {
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    currencySymbol: '$',
    timeZone: 'America/New_York',
    language: 'English',
    locale: 'en-US',
    priority: 100,
    marketValue: 'high'
  },
  {
    country: 'Germany',
    countryCode: 'DE', 
    currency: 'EUR',
    currencySymbol: '€',
    timeZone: 'Europe/Berlin',
    language: 'German',
    locale: 'de-DE',
    priority: 95,
    marketValue: 'high'
  },
  {
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    timeZone: 'Europe/London',
    language: 'English',
    locale: 'en-GB',
    priority: 90,
    marketValue: 'high'
  },
  {
    country: 'Switzerland',
    countryCode: 'CH',
    currency: 'CHF',
    currencySymbol: 'CHF',
    timeZone: 'Europe/Zurich',
    language: 'German',
    locale: 'de-CH',
    priority: 95,
    marketValue: 'high'
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    timeZone: 'America/Toronto',
    language: 'English',
    locale: 'en-CA',
    priority: 85,
    marketValue: 'high'
  },
  {
    country: 'Australia',
    countryCode: 'AU',
    currency: 'AUD',
    currencySymbol: 'A$',
    timeZone: 'Australia/Sydney',
    language: 'English',
    locale: 'en-AU',
    priority: 80,
    marketValue: 'high'
  },
  {
    country: 'Japan',
    countryCode: 'JP',
    currency: 'JPY',
    currencySymbol: '¥',
    timeZone: 'Asia/Tokyo',
    language: 'Japanese',
    locale: 'ja-JP',
    priority: 85,
    marketValue: 'high'
  },
  {
    country: 'Netherlands',
    countryCode: 'NL',
    currency: 'EUR',
    currencySymbol: '€',
    timeZone: 'Europe/Amsterdam',
    language: 'Dutch',
    locale: 'nl-NL',
    priority: 80,
    marketValue: 'high'
  },
  {
    country: 'Sweden',
    countryCode: 'SE',
    currency: 'SEK',
    currencySymbol: 'kr',
    timeZone: 'Europe/Stockholm',
    language: 'Swedish',
    locale: 'sv-SE',
    priority: 75,
    marketValue: 'high'
  },
  {
    country: 'Norway',
    countryCode: 'NO',
    currency: 'NOK',
    currencySymbol: 'kr',
    timeZone: 'Europe/Oslo',
    language: 'Norwegian',
    locale: 'no-NO',
    priority: 75,
    marketValue: 'high'
  }
];

// Medium-value markets get lightweight content
export const MEDIUM_VALUE_MARKETS: GeoTargeting[] = [
  {
    country: 'France',
    countryCode: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    timeZone: 'Europe/Paris',
    language: 'French',
    locale: 'fr-FR',
    priority: 70,
    marketValue: 'medium'
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    currency: 'EUR',
    currencySymbol: '€',
    timeZone: 'Europe/Madrid',
    language: 'Spanish',
    locale: 'es-ES',
    priority: 65,
    marketValue: 'medium'
  },
  {
    country: 'Italy',
    countryCode: 'IT',
    currency: 'EUR',
    currencySymbol: '€',
    timeZone: 'Europe/Rome',
    language: 'Italian',
    locale: 'it-IT',
    priority: 60,
    marketValue: 'medium'
  },
  {
    country: 'South Korea',
    countryCode: 'KR',
    currency: 'KRW',
    currencySymbol: '₩',
    timeZone: 'Asia/Seoul',
    language: 'Korean',
    locale: 'ko-KR',
    priority: 70,
    marketValue: 'medium'
  },
  {
    country: 'Singapore',
    countryCode: 'SG',
    currency: 'SGD',
    currencySymbol: 'S$',
    timeZone: 'Asia/Singapore',
    language: 'English',
    locale: 'en-SG',
    priority: 75,
    marketValue: 'medium'
  }
];

// Get geo configuration for a country
export function getGeoConfig(country: string): GeoTargeting | null {
  const allMarkets = [...HIGH_VALUE_MARKETS, ...MEDIUM_VALUE_MARKETS];
  return allMarkets.find(market => 
    market.country.toLowerCase() === country.toLowerCase()
  ) || null;
}

// Determine content generation strategy based on market value
export function getContentStrategy(country: string): {
  strategy: 'full' | 'lightweight' | 'basic';
  priority: number;
  generateOG: boolean;
  generateSchema: boolean;
  includeAI: boolean;
} {
  const geo = getGeoConfig(country);
  
  if (!geo) {
    return {
      strategy: 'basic',
      priority: 10,
      generateOG: false,
      generateSchema: false,
      includeAI: false
    };
  }
  
  if (geo.marketValue === 'high') {
    return {
      strategy: 'full',
      priority: geo.priority,
      generateOG: true,
      generateSchema: true,
      includeAI: true
    };
  }
  
  if (geo.marketValue === 'medium') {
    return {
      strategy: 'lightweight',
      priority: geo.priority,
      generateOG: true,
      generateSchema: true,
      includeAI: false
    };
  }
  
  return {
    strategy: 'basic',
    priority: geo.priority || 20,
    generateOG: false,
    generateSchema: false,
    includeAI: false
  };
}

// Localize pricing based on market
export function localizePricing(basePrice: string, country: string): string {
  const geo = getGeoConfig(country);
  if (!geo) return basePrice;
  
  // Price adjustments by market (simplified)
  const adjustments: Record<string, number> = {
    'US': 1.0,
    'CH': 1.3,  // Switzerland premium
    'NO': 1.2,  // Norway premium
    'AU': 0.9,  // Australia slight discount
    'CA': 0.85, // Canada discount
    'GB': 0.95, // UK slight discount
    'DE': 0.9,  // Germany discount
    'JP': 1.1,  // Japan premium
    'SE': 0.85, // Sweden discount
    'NL': 0.9   // Netherlands discount
  };
  
  const multiplier = adjustments[geo.countryCode] || 0.8;
  
  // Extract numbers from price range like "$2,500–$8,000"
  const priceRegex = /[\d,]+/g;
  const prices = basePrice.match(priceRegex);
  
  if (prices && prices.length >= 2) {
    const min = parseInt(prices[0].replace(/,/g, '')) * multiplier;
    const max = parseInt(prices[1].replace(/,/g, '')) * multiplier;
    
    return `${geo.currencySymbol}${Math.round(min).toLocaleString()}–${geo.currencySymbol}${Math.round(max).toLocaleString()}`;
  }
  
  return basePrice;
}

// Generate hreflang links for international SEO
export function generateHreflangLinks(basePath: string): Array<{
  hreflang: string;
  href: string;
}> {
  const hreflangs = [];
  
  // Add all high-value markets
  HIGH_VALUE_MARKETS.forEach(market => {
    hreflangs.push({
      hreflang: market.locale,
      href: `https://moydus.com${basePath.replace('/en/', `/${market.locale.split('-')[0]}/`)}`
    });
  });
  
  // Add x-default
  hreflangs.push({
    hreflang: 'x-default',
    href: `https://moydus.com${basePath}`
  });
  
  return hreflangs;
}

// Get market-specific meta optimizations
export function getMarketMeta(country: string, category: string, city: string) {
  const geo = getGeoConfig(country);
  if (!geo) return {};
  
  const marketSpecificMeta: Record<string, any> = {
    'US': {
      keywords: [`${category} near me`, `local ${category}`, `${category} company`],
      description: `Professional ${category} services in ${city}. Fast delivery, competitive pricing.`
    },
    'DE': {
      keywords: [`${category} Dienstleistungen`, `${category} Agentur`, `professionelle ${category}`],
      description: `Professionelle ${category} Dienstleistungen in ${city}. Schnelle Lieferung, bewährte Ergebnisse.`
    },
    'GB': {
      keywords: [`${category} services`, `${category} agency`, `professional ${category}`],
      description: `Professional ${category} services in ${city}. Fast delivery, proven results.`
    },
    'CH': {
      keywords: [`${category} Schweiz`, `${category} Dienstleistungen`, `${category} Agentur`],
      description: `Professionelle ${category} Dienstleistungen in ${city}. Premium Qualität, schnelle Lieferung.`
    },
    'AU': {
      keywords: [`${category} Australia`, `${category} services`, `local ${category}`],
      description: `Professional ${category} services in ${city}. Fast delivery, Australian expertise.`
    },
    'CA': {
      keywords: [`${category} Canada`, `${category} services`, `Canadian ${category}`],
      description: `Professional ${category} services in ${city}. Fast delivery, Canadian expertise.`
    }
  };
  
  return marketSpecificMeta[geo.countryCode] || {};
}

// Performance optimization based on geo
export function getGeoPerformanceConfig(country: string) {
  const geo = getGeoConfig(country);
  
  return {
    // CDN regions to prioritize
    cdnRegions: getCDNRegions(geo?.countryCode),
    
    // Image optimization settings
    imageOptimization: {
      webp: geo?.marketValue === 'high',
      avif: geo?.marketValue === 'high',
      quality: geo?.marketValue === 'high' ? 85 : 75
    },
    
    // Preload settings
    preload: {
      fonts: geo?.marketValue === 'high',
      criticalCSS: geo?.marketValue !== 'low',
      images: geo?.marketValue === 'high'
    }
  };
}

function getCDNRegions(countryCode?: string): string[] {
  const regionMap: Record<string, string[]> = {
    'US': ['us-east-1', 'us-west-2'],
    'DE': ['eu-central-1', 'eu-west-1'],
    'GB': ['eu-west-2', 'eu-west-1'],
    'CH': ['eu-central-1', 'eu-west-1'],
    'CA': ['ca-central-1', 'us-east-1'],
    'AU': ['ap-southeast-2', 'ap-southeast-1'],
    'JP': ['ap-northeast-1', 'ap-northeast-2'],
    'SG': ['ap-southeast-1', 'ap-southeast-2']
  };
  
  return regionMap[countryCode || 'US'] || ['us-east-1'];
}