// Currency-based targeting and geo-optimization system
export interface CurrencyData {
  code: string;
  symbol: string;
  name: string;
  valueIndex: number; // 1-10 scale (10 = highest value)
  exchangeRate: number; // vs USD
  purchasingPower: number; // PPP index
  priority: number; // SEO priority based on economic value
}

export interface CountryEconomicData {
  country: string;
  countryCode: string;
  currency: CurrencyData;
  gdpPerCapita: number;
  digitalMarketSize: number; // in billion USD
  businessDensity: number; // businesses per 1000 people
  internetPenetration: number; // percentage
  ecommerceAdoption: number; // percentage
  seoOpportunityScore: number; // 1-100
  languageMarkets: string[];
  timezone: string;
  businessHours: string;
}

export interface GeoTargetingResult {
  suggestedLocale: string;
  currency: CurrencyData;
  marketPriority: 'high' | 'medium' | 'low';
  redirectSuggestion?: string;
  localizedPricing?: string;
  marketInsights: string[];
}

export class CurrencyTargetingSystem {
  private currencyData: Map<string, CurrencyData> = new Map();
  private countryData: Map<string, CountryEconomicData> = new Map();
  private exchangeRateApi: string = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor() {
    this.initializeCurrencyData();
    this.initializeCountryData();
  }

  private initializeCurrencyData() {
    const currencies: CurrencyData[] = [
      // Tier 1: Highest value currencies
      { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', valueIndex: 10, exchangeRate: 0.91, purchasingPower: 1.2, priority: 10 },
      { code: 'USD', symbol: '$', name: 'US Dollar', valueIndex: 9, exchangeRate: 1.0, purchasingPower: 1.0, priority: 10 },
      { code: 'EUR', symbol: '€', name: 'Euro', valueIndex: 9, exchangeRate: 0.85, purchasingPower: 0.95, priority: 9 },
      { code: 'GBP', symbol: '£', name: 'British Pound', valueIndex: 8, exchangeRate: 0.79, purchasingPower: 0.92, priority: 9 },
      { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', valueIndex: 8, exchangeRate: 10.5, purchasingPower: 0.88, priority: 8 },
      { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', valueIndex: 8, exchangeRate: 10.2, purchasingPower: 0.85, priority: 8 },
      { code: 'DKK', symbol: 'kr', name: 'Danish Krone', valueIndex: 8, exchangeRate: 6.8, purchasingPower: 0.87, priority: 8 },
      
      // Tier 2: High value currencies
      { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', valueIndex: 7, exchangeRate: 1.35, purchasingPower: 0.82, priority: 7 },
      { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', valueIndex: 7, exchangeRate: 1.52, purchasingPower: 0.81, priority: 7 },
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen', valueIndex: 7, exchangeRate: 149, purchasingPower: 0.78, priority: 7 },
      { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', valueIndex: 7, exchangeRate: 1.36, purchasingPower: 0.85, priority: 7 },
      
      // Tier 3: Medium-high value currencies
      { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', valueIndex: 6, exchangeRate: 1.68, purchasingPower: 0.79, priority: 6 },
      { code: 'KRW', symbol: '₩', name: 'South Korean Won', valueIndex: 6, exchangeRate: 1340, purchasingPower: 0.72, priority: 6 },
      { code: 'AED', symbol: 'AED', name: 'UAE Dirham', valueIndex: 6, exchangeRate: 3.67, purchasingPower: 0.75, priority: 6 },
      { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', valueIndex: 6, exchangeRate: 3.75, purchasingPower: 0.73, priority: 6 },
      
      // Tier 4: Medium value currencies
      { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', valueIndex: 5, exchangeRate: 7.8, purchasingPower: 0.68, priority: 5 },
      { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', valueIndex: 5, exchangeRate: 32, purchasingPower: 0.65, priority: 5 },
    ];

    currencies.forEach(currency => {
      this.currencyData.set(currency.code, currency);
    });
  }

  private initializeCountryData() {
    const countries: CountryEconomicData[] = [
      // Tier 1 Markets
      {
        country: 'Switzerland',
        countryCode: 'CH',
        currency: this.currencyData.get('CHF')!,
        gdpPerCapita: 93457,
        digitalMarketSize: 25.8,
        businessDensity: 89,
        internetPenetration: 95,
        ecommerceAdoption: 87,
        seoOpportunityScore: 95,
        languageMarkets: ['de', 'fr', 'it', 'en'],
        timezone: 'CET',
        businessHours: '09:00-17:00'
      },
      {
        country: 'United States',
        countryCode: 'US',
        currency: this.currencyData.get('USD')!,
        gdpPerCapita: 76398,
        digitalMarketSize: 875.0,
        businessDensity: 78,
        internetPenetration: 92,
        ecommerceAdoption: 83,
        seoOpportunityScore: 100,
        languageMarkets: ['en', 'es'],
        timezone: 'Multiple',
        businessHours: '09:00-17:00'
      },
      {
        country: 'Norway',
        countryCode: 'NO',
        currency: this.currencyData.get('NOK')!,
        gdpPerCapita: 89154,
        digitalMarketSize: 12.5,
        businessDensity: 95,
        internetPenetration: 98,
        ecommerceAdoption: 91,
        seoOpportunityScore: 92,
        languageMarkets: ['no', 'en'],
        timezone: 'CET',
        businessHours: '08:00-16:00'
      },
      
      // Tier 2 Markets
      {
        country: 'Germany',
        countryCode: 'DE',
        currency: this.currencyData.get('EUR')!,
        gdpPerCapita: 54263,
        digitalMarketSize: 95.2,
        businessDensity: 72,
        internetPenetration: 94,
        ecommerceAdoption: 79,
        seoOpportunityScore: 88,
        languageMarkets: ['de', 'en'],
        timezone: 'CET',
        businessHours: '09:00-17:00'
      },
      {
        country: 'United Kingdom',
        countryCode: 'GB',
        currency: this.currencyData.get('GBP')!,
        gdpPerCapita: 47334,
        digitalMarketSize: 78.4,
        businessDensity: 84,
        internetPenetration: 95,
        ecommerceAdoption: 85,
        seoOpportunityScore: 90,
        languageMarkets: ['en'],
        timezone: 'GMT',
        businessHours: '09:00-17:00'
      },
      {
        country: 'Canada',
        countryCode: 'CA',
        currency: this.currencyData.get('CAD')!,
        gdpPerCapita: 52051,
        digitalMarketSize: 48.7,
        businessDensity: 76,
        internetPenetration: 94,
        ecommerceAdoption: 81,
        seoOpportunityScore: 85,
        languageMarkets: ['en', 'fr'],
        timezone: 'Multiple',
        businessHours: '09:00-17:00'
      },
      
      // Tier 3 Markets
      {
        country: 'Australia',
        countryCode: 'AU',
        currency: this.currencyData.get('AUD')!,
        gdpPerCapita: 61963,
        digitalMarketSize: 35.6,
        businessDensity: 81,
        internetPenetration: 89,
        ecommerceAdoption: 78,
        seoOpportunityScore: 82,
        languageMarkets: ['en'],
        timezone: 'Multiple',
        businessHours: '09:00-17:00'
      },
      {
        country: 'Japan',
        countryCode: 'JP',
        currency: this.currencyData.get('JPY')!,
        gdpPerCapita: 42940,
        digitalMarketSize: 156.8,
        businessDensity: 68,
        internetPenetration: 91,
        ecommerceAdoption: 74,
        seoOpportunityScore: 78,
        languageMarkets: ['ja', 'en'],
        timezone: 'JST',
        businessHours: '09:00-17:00'
      },
      {
        country: 'Singapore',
        countryCode: 'SG',
        currency: this.currencyData.get('SGD')!,
        gdpPerCapita: 72795,
        digitalMarketSize: 8.9,
        businessDensity: 92,
        internetPenetration: 92,
        ecommerceAdoption: 86,
        seoOpportunityScore: 80,
        languageMarkets: ['en'],
        timezone: 'SGT',
        businessHours: '09:00-18:00'
      },
      {
        country: 'South Korea',
        countryCode: 'KR',
        currency: this.currencyData.get('KRW')!,
        gdpPerCapita: 35196,
        digitalMarketSize: 67.8,
        businessDensity: 64,
        internetPenetration: 96,
        ecommerceAdoption: 82,
        seoOpportunityScore: 75,
        languageMarkets: ['ko', 'en'],
        timezone: 'KST',
        businessHours: '09:00-18:00'
      },
      
      // Emerging Markets
      {
        country: 'Saudi Arabia',
        countryCode: 'SA',
        currency: this.currencyData.get('SAR')!,
        gdpPerCapita: 23186,
        digitalMarketSize: 28.5,
        businessDensity: 45,
        internetPenetration: 98,
        ecommerceAdoption: 71,
        seoOpportunityScore: 70,
        languageMarkets: ['ar', 'en'],
        timezone: 'AST',
        businessHours: '08:00-17:00'
      },
      {
        country: 'UAE',
        countryCode: 'AE',
        currency: this.currencyData.get('AED')!,
        gdpPerCapita: 37749,
        digitalMarketSize: 18.2,
        businessDensity: 67,
        internetPenetration: 99,
        ecommerceAdoption: 76,
        seoOpportunityScore: 73,
        languageMarkets: ['ar', 'en'],
        timezone: 'GST',
        businessHours: '09:00-18:00'
      }
    ];

    countries.forEach(country => {
      this.countryData.set(country.countryCode, country);
    });
  }

  // Get targeting recommendations based on user's IP/location
  async getGeoTargeting(
    userCountryCode?: string,
    userLocale?: string,
    currentPath?: string
  ): Promise<GeoTargetingResult> {
    let targetCountry = userCountryCode;
    
    // If no country provided, try to determine from current path
    if (!targetCountry && currentPath) {
      const pathParts = currentPath.split('/');
      const possibleCountry = pathParts[2]; // assuming /locale/country/...
      targetCountry = this.getCountryCodeFromSlug(possibleCountry);
    }

    // Default to US if no country detected
    targetCountry = targetCountry || 'US';
    
    const countryData = this.countryData.get(targetCountry);
    if (!countryData) {
      return this.getDefaultTargeting();
    }

    const marketPriority = this.getMarketPriority(countryData);
    const localizedPricing = this.getLocalizedPricing(countryData.currency);
    const marketInsights = this.generateMarketInsights(countryData);

    return {
      suggestedLocale: this.getSuggestedLocale(countryData, userLocale),
      currency: countryData.currency,
      marketPriority,
      localizedPricing,
      marketInsights,
      redirectSuggestion: this.getRedirectSuggestion(countryData, currentPath)
    };
  }

  // Generate country priority list for SEO
  getCountryPriorities(): Array<{countryCode: string, priority: number, seoOpportunity: number}> {
    return Array.from(this.countryData.values())
      .map(country => ({
        countryCode: country.countryCode,
        priority: country.currency.priority,
        seoOpportunity: country.seoOpportunityScore
      }))
      .sort((a, b) => (b.priority + b.seoOpportunity) - (a.priority + a.seoOpportunity));
  }

  // Get pricing for specific currency/market
  getLocalizedPricing(
    currency: CurrencyData,
    basePriceUSD: number = 5000
  ): string {
    const localPrice = basePriceUSD * currency.exchangeRate;
    const adjustedPrice = localPrice * currency.purchasingPower;
    
    // Format based on currency
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const lowEnd = Math.round(adjustedPrice * 0.3);
    const highEnd = Math.round(adjustedPrice * 2.5);

    return `${formatter.format(lowEnd)} – ${formatter.format(highEnd)}`;
  }

  // Update exchange rates (call periodically)
  async updateExchangeRates(): Promise<void> {
    try {
      const response = await fetch(this.exchangeRateApi);
      const data = await response.json();
      
      if (data.rates) {
        this.currencyData.forEach((currency, code) => {
          if (data.rates[code]) {
            currency.exchangeRate = 1 / data.rates[code]; // Convert to USD base
          }
        });
      }
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
    }
  }

  // Get market insights for content generation
  private generateMarketInsights(countryData: CountryEconomicData): string[] {
    const insights: string[] = [];
    
    if (countryData.digitalMarketSize > 50) {
      insights.push(`Large digital market worth $${countryData.digitalMarketSize}B annually`);
    }
    
    if (countryData.businessDensity > 80) {
      insights.push('High business density creates strong demand for digital services');
    }
    
    if (countryData.ecommerceAdoption > 80) {
      insights.push('High e-commerce adoption indicates digital-ready market');
    }
    
    if (countryData.internetPenetration > 95) {
      insights.push('Excellent internet infrastructure supports digital transformation');
    }
    
    if (countryData.currency.valueIndex >= 8) {
      insights.push('Strong currency enables premium pricing for quality services');
    }

    return insights;
  }

  private getMarketPriority(countryData: CountryEconomicData): 'high' | 'medium' | 'low' {
    const score = (countryData.currency.priority + countryData.seoOpportunityScore) / 2;
    
    if (score >= 85) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
  }

  private getSuggestedLocale(countryData: CountryEconomicData, userLocale?: string): string {
    if (userLocale && countryData.languageMarkets.includes(userLocale)) {
      return userLocale;
    }
    return countryData.languageMarkets[0];
  }

  private getRedirectSuggestion(countryData: CountryEconomicData, currentPath?: string): string | undefined {
    if (!currentPath) return undefined;
    
    const suggestedLocale = countryData.languageMarkets[0];
    const pathParts = currentPath.split('/');
    
    if (pathParts[1] !== suggestedLocale) {
      pathParts[1] = suggestedLocale;
      return pathParts.join('/');
    }
    
    return undefined;
  }

  private getCountryCodeFromSlug(slug?: string): string | undefined {
    const countryMap: Record<string, string> = {
      'united-states': 'US',
      'germany': 'DE',
      'united-kingdom': 'GB',
      'canada': 'CA',
      'australia': 'AU',
      'switzerland': 'CH',
      'norway': 'NO',
      'sweden': 'SE',
      'denmark': 'DK',
      'japan': 'JP',
      'singapore': 'SG',
      'south-korea': 'KR',
      'saudi-arabia': 'SA',
      'united-arab-emirates': 'AE',
    };
    
    return slug ? countryMap[slug] : undefined;
  }

  private getDefaultTargeting(): GeoTargetingResult {
    return {
      suggestedLocale: 'en',
      currency: this.currencyData.get('USD')!,
      marketPriority: 'medium',
      localizedPricing: '$1,500 – $12,500',
      marketInsights: ['Global market with diverse opportunities']
    };
  }
}

// Helper component for geo-targeting suggestions
export interface GeoSuggestionProps {
  geoData: GeoTargetingResult;
  currentCountry: string;
  currentCity: string;
}

export function generateGeoSuggestionText(props: GeoSuggestionProps): string {
  const { geoData, currentCountry, currentCity } = props;
  
  if (geoData.redirectSuggestion) {
    return `Looks like you're visiting from ${currentCountry}. See local prices in ${geoData.currency.symbol} → [Switch Region](${geoData.redirectSuggestion})`;
  }
  
  if (geoData.marketPriority === 'high') {
    return `${currentCity} is a high-opportunity market for digital services. ${geoData.marketInsights[0]}`;
  }
  
  return `Professional services in ${currentCity} - ${geoData.localizedPricing} typical range.`;
}

// Export singleton instance
export const currencyTargeting = new CurrencyTargetingSystem();