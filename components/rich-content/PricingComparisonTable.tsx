interface PricingTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  description: string;
  cta: string;
}

interface PricingComparisonTableProps {
  city: string;
  category: string;
  currency: string;
  tiers: PricingTier[];
  className?: string;
}

export function PricingComparisonTable({ 
  city, 
  category, 
  currency, 
  tiers, 
  className = '' 
}: PricingComparisonTableProps) {
  return (
    <div className={`bg-white ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {category} Pricing in {city}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Transparent pricing for {category} services. Choose the plan that fits your business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`relative rounded-2xl border ${
              tier.popular
                ? 'border-blue-500 shadow-lg scale-105'
                : 'border-gray-200 shadow-sm'
            } bg-white p-8`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{tier.description}</p>
              
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-lg text-gray-600 ml-2">
                  {currency}
                </span>
                <p className="text-sm text-gray-500 mt-1">{tier.duration}</p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why Choose {category} Services in {city}?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Local market expertise</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Transparent, fair pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Proven results for {city} businesses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate pricing tiers based on location and category
export function generatePricingTiers(
  city: string,
  category: string,
  basePriceMultiplier: number = 1
): PricingTier[] {
  const categoryPricing: Record<string, { base: number; mid: number; premium: number }> = {
    'web-design': { base: 1500, mid: 5000, premium: 15000 },
    'seo-services': { base: 800, mid: 2500, premium: 8000 },
    'app-development': { base: 5000, mid: 15000, premium: 50000 },
    'digital-marketing': { base: 1000, mid: 3500, premium: 12000 },
    'ecommerce-development': { base: 3000, mid: 8000, premium: 25000 },
    'ui-ux-design': { base: 2000, mid: 6000, premium: 18000 },
    'content-marketing': { base: 600, mid: 2000, premium: 6000 },
    'ppc-ads': { base: 500, mid: 2000, premium: 8000 },
    'social-media-marketing': { base: 400, mid: 1500, premium: 5000 },
    'automation': { base: 2500, mid: 8000, premium: 25000 },
  };

  const pricing = categoryPricing[category] || categoryPricing['web-design'];
  
  const adjustedPricing = {
    base: Math.round(pricing.base * basePriceMultiplier),
    mid: Math.round(pricing.mid * basePriceMultiplier),
    premium: Math.round(pricing.premium * basePriceMultiplier),
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  return [
    {
      name: 'Starter',
      price: formatPrice(adjustedPricing.base),
      duration: 'one-time',
      description: `Essential ${category} for small businesses`,
      features: [
        'Initial consultation and strategy',
        'Basic implementation',
        'Standard features included',
        'Email support',
        '30-day warranty',
        'Basic analytics setup',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: formatPrice(adjustedPricing.mid),
      duration: 'one-time',
      description: `Comprehensive ${category} for growing businesses`,
      popular: true,
      features: [
        'Everything in Starter',
        'Advanced customization',
        'Premium features included',
        'Priority support',
        '90-day warranty',
        'Advanced analytics & reporting',
        'Performance optimization',
        'Ongoing consultation',
      ],
      cta: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: formatPrice(adjustedPricing.premium),
      duration: 'one-time',
      description: `Complete ${category} solution for large businesses`,
      features: [
        'Everything in Professional',
        'Full customization',
        'Enterprise-grade features',
        'Dedicated account manager',
        '1-year warranty',
        'Custom integrations',
        'White-label solutions',
        'Training & onboarding',
        'Priority phone support',
      ],
      cta: 'Contact Sales',
    },
  ];
}

interface PricingFactorsProps {
  city: string;
  category: string;
  factors: Array<{
    factor: string;
    impact: 'low' | 'medium' | 'high';
    description: string;
  }>;
  className?: string;
}

export function PricingFactors({ city, category, factors, className = '' }: PricingFactorsProps) {
  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        What Affects {category} Pricing in {city}?
      </h3>
      
      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-start space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
              {factor.impact} impact
            </span>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{factor.factor}</h4>
              <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Pro tip:</strong> Get quotes from 3-5 {category} providers in {city} to ensure competitive pricing. 
          Most agencies offer free consultations to discuss your specific needs.
        </p>
      </div>
    </div>
  );
}

// Generate pricing factors based on category and location
export function generatePricingFactors(city: string, category: string) {
  const commonFactors = [
    {
      factor: 'Project Scope & Complexity',
      impact: 'high' as const,
      description: 'Larger, more complex projects require more time and expertise, increasing costs proportionally.'
    },
    {
      factor: 'Timeline Requirements',
      impact: 'medium' as const,
      description: 'Rush jobs often require premium pricing due to resource allocation and overtime work.'
    },
    {
      factor: 'Local Market Competition',
      impact: 'medium' as const,
      description: `${city} market dynamics affect pricing. High competition can lower prices, while specialized expertise commands premium rates.`
    },
    {
      factor: 'Provider Experience Level',
      impact: 'high' as const,
      description: 'Senior experts and established agencies typically charge more but deliver higher quality and reliability.'
    },
    {
      factor: 'Ongoing Support Requirements',
      impact: 'medium' as const,
      description: 'Maintenance, updates, and long-term support add to total project cost but ensure continued success.'
    },
    {
      factor: 'Integration Complexity',
      impact: 'high' as const,
      description: 'Projects requiring integration with existing systems or third-party tools increase development time and cost.'
    }
  ];

  return commonFactors;
}