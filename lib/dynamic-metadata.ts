import { generateContentVariations, selectVariation, generateKeywords } from './content-variations';

export interface LocationData {
  city: string;
  state: string;
  country: string;
  countryCode: string;
  locale: string;
  category: string;
  latitude?: number;
  longitude?: number;
}

export interface CategoryData {
  display: string;
  benefit: string;
  timeline: string;
  price: string;
  targetAudience: string;
  snippet: string;
}

export function generateDynamicMetadata(location: LocationData, categoryData: CategoryData) {
  const { city, state, country, locale, category } = location;
  const variationSeed = `${city}|${category}|${country}`;
  
  // Generate content variations
  const variations = generateContentVariations(city, categoryData.display);
  const selectedHeadline = selectVariation(variations.headlines, variationSeed);
  const selectedIntro = selectVariation(variations.introductions, variationSeed);
  const selectedBenefit = selectVariation(variations.benefits, variationSeed);
  
  // Generate keywords
  const keywords = generateKeywords(city, categoryData.display, country);
  
  const currentYear = new Date().getFullYear();
  const baseUrl = "https://moydus.com";
  
  return {
    // Basic metadata
    title: selectedHeadline,
    description: `${selectedIntro} ${categoryData.timeline} delivery, ${categoryData.price} pricing. Local expertise meets proven results.`,
    
    // Open Graph
    openGraph: {
      title: selectedHeadline,
      description: `Professional ${categoryData.display} services in ${city}. ${categoryData.timeline} delivery, local expertise, conversion-focused results.`,
      url: `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`,
      siteName: 'Moydus',
      images: [
        {
          url: `${baseUrl}/og-images/${city.toLowerCase()}-${category}.png`,
          width: 1200,
          height: 630,
          alt: `${categoryData.display} Services in ${city}, ${state}`
        }
      ],
      locale: `${locale}_${location.countryCode}`,
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${categoryData.display} in ${city} — Fast & Effective`,
      description: `${categoryData.targetAudience} in ${city}. ${categoryData.timeline} launch. Proven results.`,
      images: [`${baseUrl}/twitter-cards/${city.toLowerCase()}-${category}.png`],
      creator: '@moydus',
      site: '@moydus',
    },
    
    // Additional metadata
    keywords: [...keywords.primary, ...keywords.countrySpecific, ...keywords.longTail].join(', '),
    authors: [{ name: 'Moydus Team' }],
    creator: 'Moydus',
    publisher: 'Moydus',
    
    // Canonical URL
    alternates: {
      canonical: `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`,
    },
    
    // Additional SEO metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Structured data for rich snippets
    other: {
      'article:published_time': new Date().toISOString(),
      'article:modified_time': new Date().toISOString(),
      'article:author': 'Moydus',
      'article:section': categoryData.display,
      'article:tag': keywords.primary.join(','),
      'og:updated_time': new Date().toISOString(),
    },
  };
}

// Generate JSON-LD structured data
export function generateStructuredData(location: LocationData, categoryData: CategoryData, faqs?: any[]) {
  const { city, state, country, category } = location;
  const baseUrl = "https://moydus.com";
  const currentYear = new Date().getFullYear();
  
  const schemas = [];
  
  // Article Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${categoryData.display} Services in ${city}, ${state} (${currentYear})`,
    "description": `Professional ${categoryData.display} services in ${city}, ${state}. Local expertise, proven results.`,
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/og-images/${city.toLowerCase()}-${category}.jpg`,
      "width": 1200,
      "height": 630
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Moydus",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      },
      "sameAs": [
        "https://www.linkedin.com/company/moydus",
        "https://twitter.com/moydus",
        "https://github.com/moydus",
        "https://www.facebook.com/moydus"
      ]
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Moydus",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`
    }
  });
  
  // Local Business Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${categoryData.display} Services in ${city}`,
    "description": `Professional ${categoryData.display} services in ${city}, ${state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": country
    },
    "geo": location.latitude && location.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    } : undefined,
    "areaServed": [
      {
        "@type": "City",
        "name": city
      },
      {
        "@type": "State", 
        "name": state
      }
    ],
    "serviceType": categoryData.display,
    "priceRange": categoryData.price,
    "telephone": "+1-555-0123",
    "email": "hello@moydus.com",
    "url": baseUrl,
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    "paymentAccepted": "Cash, Credit Card, PayPal",
    "currenciesAccepted": "USD, EUR, GBP"
  });
  
  // Service Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${categoryData.display} in ${city}`,
    "description": `Professional ${categoryData.display} services for businesses in ${city}, ${state}`,
    "provider": {
      "@type": "Organization",
      "name": "Moydus",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "City", 
      "name": city
    },
    "serviceType": categoryData.display,
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${categoryData.display} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Custom ${categoryData.display}`,
            "description": `Tailored ${categoryData.display} solutions for ${city} businesses`
          },
          "priceRange": categoryData.price
        }
      ]
    }
  });
  
  // FAQ Schema (if FAQs provided)
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    });
  }
  
  // Breadcrumb Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": country,
        "item": `${baseUrl}/${country.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3, 
        "name": state,
        "item": `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": city,
        "item": `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": categoryData.display,
        "item": `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`
      }
    ]
  });
  
  return schemas;
}
