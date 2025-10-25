import Link from 'next/link';
import { generatePageSchemas, AdvancedSchemaGenerator } from '@/lib/advanced-schema';

interface CategoryHubProps {
  category: {
    name: string;
    slug: string;
    display: string;
    description: string;
    icon: string;
  };
  cities: Array<{
    name: string;
    slug: string;
    state: string;
    country: string;
    countrySlug: string;
    stateSlug: string;
    population?: number;
    gdpPerCapita?: number;
    marketSize?: 'small' | 'medium' | 'large';
    pricing?: {
      min: number;
      max: number;
      currency: string;
    };
  }>;
  stats: {
    totalProviders: number;
    avgProjectCost: string;
    topMarkets: string[];
    yearlyGrowth: string;
  };
  locale: string;
}

export function CategoryHub({ category, cities, stats, locale }: CategoryHubProps) {
  // Generate schema for this hub page
  const schemaContext = {
    pageType: 'hub' as const,
    category: category.slug,
    locale,
    url: `https://moydus.com/${category.slug}/`,
    cities: cities.map(c => c.name),
    categories: [category.slug]
  };

  const schemas = generatePageSchemas(schemaContext);

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="text-6xl mb-6">{category.icon}</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {category.display} Services
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {category.description}
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">{stats.totalProviders}+</div>
                  <div className="text-sm text-blue-200">Verified Providers</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">{stats.avgProjectCost}</div>
                  <div className="text-sm text-blue-200">Average Cost</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">{cities.length}</div>
                  <div className="text-sm text-blue-200">Cities Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-2xl font-bold">{stats.yearlyGrowth}</div>
                  <div className="text-sm text-blue-200">Market Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Markets Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏆 Top Markets for {category.display}
            </h2>
            <p className="text-lg text-gray-600">
              Leading cities with the highest demand and best opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities
              .sort((a, b) => {
                // Sort by market size, then by GDP per capita
                const sizeOrder = { large: 3, medium: 2, small: 1 };
                const sizeA = sizeOrder[a.marketSize || 'small'];
                const sizeB = sizeOrder[b.marketSize || 'small'];
                
                if (sizeA !== sizeB) return sizeB - sizeA;
                return (b.gdpPerCapita || 0) - (a.gdpPerCapita || 0);
              })
              .slice(0, 20) // Show top 20 cities
              .map((city, index) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/${city.countrySlug}/${city.stateSlug}/${city.slug}/${category.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {city.name}
                      </h3>
                      {index < 3 && (
                        <span className="text-lg">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      📍 {city.state}, {city.country}
                    </div>
                    
                    <div className="space-y-2">
                      {city.population && (
                        <div className="flex items-center text-xs text-gray-500">
                          👥 <span className="ml-1">{city.population.toLocaleString()} people</span>
                        </div>
                      )}
                      
                      {city.marketSize && (
                        <div className="flex items-center text-xs text-gray-500">
                          📊 <span className="ml-1 capitalize">{city.marketSize} market</span>
                        </div>
                      )}
                      
                      {city.pricing && (
                        <div className="flex items-center text-xs text-blue-600 font-medium">
                          💰 <span className="ml-1">
                            {city.pricing.currency}{city.pricing.min.toLocaleString()}–{city.pricing.currency}{city.pricing.max.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      View {category.display} Services
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Market Analysis Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                📊 Market Analysis & Trends
              </h2>
              <p className="text-lg text-gray-600">
                Data-driven insights for {category.display} services worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Regional Breakdown */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  🌍 Regional Market Distribution
                </h3>
                
                <div className="space-y-4">
                  {stats.topMarkets.map((market, index) => (
                    <div key={market} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">
                          {index === 0 ? '🇺🇸' : index === 1 ? '🇩🇪' : index === 2 ? '🇬🇧' : '🌍'}
                        </span>
                        <span className="font-medium">{market}</span>
                      </div>
                      <div className="text-blue-600 font-semibold">
                        {40 - (index * 10)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Trends */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  📈 Growth & Opportunities
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Market Growth</span>
                      <span className="text-green-600 font-bold">{stats.yearlyGrowth}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Demand Level</span>
                      <span className="text-green-600 font-bold">High</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Competition</span>
                      <span className="text-yellow-600 font-bold">Medium</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Cities Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🗺️ All Available Locations
            </h2>
            <p className="text-lg text-gray-600">
              {category.display} services available in {cities.length} cities worldwide
            </p>
          </div>

          {/* Country-grouped city listing */}
          <div className="space-y-12">
            {Object.entries(
              cities.reduce((acc, city) => {
                if (!acc[city.country]) acc[city.country] = [];
                acc[city.country].push(city);
                return acc;
              }, {} as Record<string, typeof cities>)
            ).map(([country, countryCities]) => (
              <div key={country}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">
                    {country === 'United States' ? '🇺🇸' : 
                     country === 'Germany' ? '🇩🇪' : 
                     country === 'United Kingdom' ? '🇬🇧' : 
                     country === 'Canada' ? '🇨🇦' : '🌍'}
                  </span>
                  {country} ({countryCities.length} cities)
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {countryCities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(city => (
                      <Link
                        key={city.slug}
                        href={`/${locale}/${city.countrySlug}/${city.stateSlug}/${city.slug}/${category.slug}`}
                        className="group bg-white rounded-lg border hover:border-blue-300 hover:shadow-md transition-all p-4 text-center"
                      >
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                          {city.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {city.state}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Find the Perfect {category.display} Provider?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Compare providers, read reviews, and get quotes from verified professionals in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                Read Our Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}