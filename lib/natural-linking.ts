interface NaturalLinkingParams {
  city?: string;
  state: string;
  country: string;
  category?: string;
  locationLevel: 'state' | 'city';
}

export function generateNaturalLinkingContent(params: NaturalLinkingParams) {
  const { city, state, country, category, locationLevel } = params;
  const location = city || state;
  const locationWithState = city ? `${city}, ${state}` : state;
  
  // For category pages, focus on specific service linking
  if (category && city) {
    return generateCategoryNaturalLinks({ city, state, country, category });
  }
  
  // For location pages, focus on service discovery
  return generateLocationNaturalLinks({ city, state, country, locationLevel });
}

function generateCategoryNaturalLinks(params: { city: string; state: string; country: string; category: string }) {
  const { city, state, category } = params;
  
  const linkingStrategies = [
    {
      heading: `${category} Success Stories in ${city}`,
      body: [
        `Local ${city} businesses are seeing remarkable results with professional ${category.toLowerCase()}. Modern approaches to ${category.toLowerCase()} combine user experience design with conversion optimization to drive measurable growth.`,
        `If you're considering ${category.toLowerCase()} for your ${city} business, our recent case studies show the impact of data-driven strategies on local market penetration and customer acquisition.`
      ],
      naturalLinks: [
        {
          context: `professional ${category.toLowerCase()}`,
          anchor: `${category} services`,
          url: `/${category.toLowerCase().replace(/\s+/g, '-')}`,
          type: 'contextual'
        }
      ]
    },
    {
      heading: `Market Insights for ${city} Businesses`,
      body: [
        `${city} market dynamics require tailored approaches to digital growth. Customer behavior patterns in ${state} show increasing demand for mobile-first experiences and local search optimization.`,
        `Successful ${city} companies integrate ${category.toLowerCase()} with comprehensive digital strategies. This includes connecting web design with local SEO efforts and ensuring brand consistency across all touchpoints.`
      ],
      naturalLinks: [
        {
          context: 'local search optimization',
          anchor: 'Local SEO services',
          url: '/local-seo',
          type: 'contextual'
        },
        {
          context: 'web design',
          anchor: 'professional web design',
          url: '/web-design',
          type: 'contextual'
        }
      ]
    }
  ];

  return {
    sections: linkingStrategies,
    cta: {
      title: `Ready to transform your ${city} business?`,
      description: `Discover how our ${category.toLowerCase()} approach drives real results for ${city} companies.`,
      primaryAction: {
        text: `Explore ${category} Solutions`,
        url: `/${category.toLowerCase().replace(/\s+/g, '-')}`
      },
      secondaryAction: {
        text: 'View Case Studies',
        url: '/portfolio'
      }
    }
  };
}

function generateLocationNaturalLinks(params: { city?: string; state: string; country: string; locationLevel: 'state' | 'city' }) {
  const { city, state, country, locationLevel } = params;
  const location = city || state;
  const locationWithState = city ? `${city}, ${state}` : state;
  
  const linkingStrategies = [
    {
      heading: `Digital Growth Opportunities in ${location}`,
      body: [
        `${location} businesses are leveraging modern web design and digital marketing to compete effectively in ${country}'s evolving marketplace. The combination of responsive design, search engine optimization, and conversion-focused user experiences drives sustainable growth.`,
        `Smart ${location} companies understand that successful digital transformation requires more than just a new website. Integrated approaches combining professional web design with local SEO and digital marketing deliver compound results over time.`
      ],
      naturalLinks: [
        {
          context: 'modern web design',
          anchor: 'professional web design services',
          url: '/web-design',
          type: 'contextual'
        },
        {
          context: 'search engine optimization',
          anchor: 'SEO services',
          url: '/seo-services',
          type: 'contextual'
        },
        {
          context: 'digital marketing',
          anchor: 'digital marketing solutions',
          url: '/digital-marketing',
          type: 'contextual'
        }
      ]
    },
    {
      heading: `Technology Trends Shaping ${location}`,
      body: [
        `E-commerce growth in ${locationWithState} reflects broader ${country} trends toward online business models. Companies investing in custom e-commerce development and conversion optimization see significantly higher customer lifetime values.`,
        `The rise of mobile commerce in ${location} makes responsive design and mobile optimization critical success factors. Businesses combining mobile-first web design with local SEO strategies capture more qualified traffic and convert at higher rates.`
      ],
      naturalLinks: [
        {
          context: 'custom e-commerce development',
          anchor: 'e-commerce development services',
          url: '/ecommerce-development',
          type: 'contextual'
        },
        {
          context: 'conversion optimization',
          anchor: 'conversion optimization',
          url: '/conversion-optimization',
          type: 'contextual'
        },
        {
          context: 'local SEO strategies',
          anchor: 'local SEO',
          url: '/local-seo',
          type: 'contextual'
        }
      ]
    },
    {
      heading: `Strategic Partnerships in ${location}`,
      body: [
        `Successful ${location} businesses choose digital partners who understand local market dynamics and customer behavior. The most effective collaborations combine technical expertise with ${state} market knowledge and ongoing optimization support.`,
        `Whether you need comprehensive web development, targeted digital marketing, or specialized automation solutions, the key is finding partners who align with your ${location} business goals and growth timeline.`
      ],
      naturalLinks: [
        {
          context: 'web development',
          anchor: 'custom web development',
          url: '/custom-web-development',
          type: 'contextual'
        },
        {
          context: 'automation solutions',
          anchor: 'business automation',
          url: '/automation',
          type: 'contextual'
        }
      ]
    }
  ];

  return {
    sections: linkingStrategies,
    cta: {
      title: `Transform your ${location} business digitally`,
      description: `Discover comprehensive digital solutions tailored for ${locationWithState} companies.`,
      primaryAction: {
        text: 'Explore Our Services',
        url: city ? `/services` : `/services`
      },
      secondaryAction: {
        text: 'Schedule Consultation',
        url: '/contact'
      }
    }
  };
}