export interface SchemaContext {
  pageType: 'city' | 'category' | 'hub' | 'comparison' | 'blog';
  city?: string;
  state?: string;
  country?: string;
  category?: string;
  locale: string;
  url: string;
  cities?: string[];
  categories?: string[];
}

export class AdvancedSchemaGenerator {
  private baseUrl = "https://moydus.com";
  private organizationSchema = {
    "@type": "Organization",
    "name": "Moydus",
    "url": this.baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${this.baseUrl}/logo.png`,
      "width": 200,
      "height": 60
    },
    "sameAs": [
      "https://www.linkedin.com/company/moydus",
      "https://twitter.com/moydus",
      "https://github.com/moydus",
      "https://www.facebook.com/moydus"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "hello@moydus.com",
      "availableLanguage": ["en", "de", "fr", "es"]
    }
  };

  generateSchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    // Always include Organization schema
    schemas.push({
      "@context": "https://schema.org",
      ...this.organizationSchema
    });

    // WebPage schema (always)
    schemas.push(this.generateWebPageSchema(context));

    // BreadcrumbList schema (always)
    schemas.push(this.generateBreadcrumbSchema(context));

    // Page type specific schemas
    switch (context.pageType) {
      case 'city':
        schemas.push(...this.generateCitySchemas(context));
        break;
      case 'category':
        schemas.push(...this.generateCategorySchemas(context));
        break;
      case 'hub':
        schemas.push(...this.generateHubSchemas(context));
        break;
      case 'comparison':
        schemas.push(...this.generateComparisonSchemas(context));
        break;
      case 'blog':
        schemas.push(...this.generateBlogSchemas(context));
        break;
    }

    return schemas;
  }

  private generateWebPageSchema(context: SchemaContext) {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": context.url,
      "url": context.url,
      "name": this.generatePageTitle(context),
      "description": this.generatePageDescription(context),
      "inLanguage": context.locale,
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${this.baseUrl}/#website`,
        "url": this.baseUrl,
        "name": "Moydus"
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "publisher": this.organizationSchema
    };
  }

  private generateBreadcrumbSchema(context: SchemaContext) {
    const items: any[] = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": this.baseUrl
      }
    ];

    let position = 2;

    if (context.country) {
      items.push({
        "@type": "ListItem",
        "position": position++,
        "name": context.country,
        "item": `${this.baseUrl}/${context.locale}/${context.country.toLowerCase()}`
      });
    }

    if (context.state) {
      items.push({
        "@type": "ListItem",
        "position": position++,
        "name": context.state,
        "item": `${this.baseUrl}/${context.locale}/${context.country?.toLowerCase()}/${context.state.toLowerCase()}`
      });
    }

    if (context.city) {
      items.push({
        "@type": "ListItem",
        "position": position++,
        "name": context.city,
        "item": `${this.baseUrl}/${context.locale}/${context.country?.toLowerCase()}/${context.state?.toLowerCase()}/${context.city.toLowerCase()}`
      });
    }

    if (context.category) {
      items.push({
        "@type": "ListItem",
        "position": position++,
        "name": context.category.charAt(0).toUpperCase() + context.category.slice(1),
        "item": context.url
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  }

  private generateCitySchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    // Place schema for the city
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Place",
      "name": context.city,
      "containedInPlace": {
        "@type": "State",
        "name": context.state,
        "containedInPlace": {
          "@type": "Country",
          "name": context.country
        }
      },
      "description": `Professional business services in ${context.city}, ${context.state}`,
      "url": context.url
    });

    // LocalBusiness schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Business Services in ${context.city}`,
      "description": `Professional digital services for businesses in ${context.city}, ${context.state}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": context.city,
        "addressRegion": context.state,
        "addressCountry": context.country
      },
      "areaServed": [
        {
          "@type": "City",
          "name": context.city
        },
        {
          "@type": "State",
          "name": context.state
        }
      ],
      "url": context.url,
      "telephone": "+1-555-0123",
      "email": "hello@moydus.com",
      "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00"
    });

    // ItemList for categories in this city
    if (context.categories) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Services Available in ${context.city}`,
        "description": `List of professional services available in ${context.city}, ${context.state}`,
        "numberOfItems": context.categories.length,
        "itemListElement": context.categories.map((category, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": `${category} in ${context.city}`,
            "url": `${this.baseUrl}/${context.locale}/${context.country?.toLowerCase()}/${context.state?.toLowerCase()}/${context.city?.toLowerCase()}/${category.toLowerCase()}`
          }
        }))
      });
    }

    return schemas;
  }

  private generateCategorySchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    // Service schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${context.category} Services in ${context.city}`,
      "description": `Professional ${context.category} services for businesses in ${context.city}, ${context.state}`,
      "provider": this.organizationSchema,
      "areaServed": {
        "@type": "City",
        "name": context.city,
        "containedInPlace": {
          "@type": "State",
          "name": context.state
        }
      },
      "serviceType": context.category,
      "url": context.url,
      "offers": {
        "@type": "Offer",
        "description": `Professional ${context.category} services`,
        "priceCurrency": "USD",
        "priceRange": "$1000-$10000"
      }
    });

    // LocalBusiness with specific service focus
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `${context.category} Services in ${context.city}`,
      "description": `Leading ${context.category} provider in ${context.city}, ${context.state}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": context.city,
        "addressRegion": context.state,
        "addressCountry": context.country
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 40.7128, // Would be dynamic based on city
          "longitude": -74.0060
        },
        "geoRadius": "50000" // 50km radius
      },
      "priceRange": "$1000-$10000",
      "telephone": "+1-555-0123",
      "email": "hello@moydus.com",
      "url": context.url,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${context.category} Services`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `Professional ${context.category}`,
              "description": `Custom ${context.category} solutions`
            }
          }
        ]
      }
    });

    return schemas;
  }

  private generateHubSchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    if (context.cities && context.category) {
      // ItemList for cities offering this category
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${context.category} Services by City`,
        "description": `Professional ${context.category} services available across multiple cities`,
        "numberOfItems": context.cities.length,
        "itemListElement": context.cities.map((city, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": `${context.category} in ${city}`,
            "url": `${this.baseUrl}/${context.locale}/${context.country?.toLowerCase()}/${context.state?.toLowerCase()}/${city.toLowerCase()}/${context.category?.toLowerCase()}`,
            "provider": this.organizationSchema
          }
        }))
      });

      // CollectionPage schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${context.category} Services Directory`,
        "description": `Complete directory of ${context.category} services across all locations`,
        "url": context.url,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${context.category} Providers`,
          "numberOfItems": context.cities.length
        }
      });
    }

    return schemas;
  }

  private generateComparisonSchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    // Article schema for comparison content
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": this.generatePageTitle(context),
      "description": this.generatePageDescription(context),
      "author": this.organizationSchema,
      "publisher": this.organizationSchema,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "image": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/og-images/comparison-${context.category}.jpg`,
        "width": 1200,
        "height": 630
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": context.url
      }
    });

    // Comparison schema (using Review type)
    if (context.cities && context.cities.length >= 2) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": `${context.category} Services Comparison`
        },
        "reviewBody": `Comprehensive comparison of ${context.category} services across ${context.cities.join(', ')}`,
        "author": this.organizationSchema,
        "datePublished": new Date().toISOString()
      });
    }

    return schemas;
  }

  private generateBlogSchemas(context: SchemaContext): any[] {
    const schemas: any[] = [];

    // Article schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": this.generatePageTitle(context),
      "description": this.generatePageDescription(context),
      "author": this.organizationSchema,
      "publisher": this.organizationSchema,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "image": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/og-images/blog-${context.category}.jpg`,
        "width": 1200,
        "height": 630
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": context.url
      },
      "articleSection": context.category,
      "wordCount": 1500, // Estimate
      "inLanguage": context.locale
    });

    return schemas;
  }

  generateFAQSchema(faqs: Array<{q: string, a: string}>): any {
    return {
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
    };
  }

  generateHowToSchema(title: string, steps: Array<{name: string, text: string}>): any {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": title,
      "description": `Step-by-step guide: ${title}`,
      "image": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/og-images/howto.jpg`
      },
      "totalTime": "PT30M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
      }))
    };
  }

  private generatePageTitle(context: SchemaContext): string {
    if (context.pageType === 'city') {
      return `Professional Business Services in ${context.city}, ${context.state}`;
    }
    if (context.pageType === 'category') {
      return `${context.category} Services in ${context.city}, ${context.state}`;
    }
    if (context.pageType === 'hub') {
      return `${context.category} Services Directory`;
    }
    if (context.pageType === 'comparison') {
      return `Compare ${context.category} Services: ${context.cities?.join(' vs ')}`;
    }
    return 'Professional Business Services';
  }

  private generatePageDescription(context: SchemaContext): string {
    if (context.pageType === 'city') {
      return `Find professional business services in ${context.city}, ${context.state}. Local expertise, proven results.`;
    }
    if (context.pageType === 'category') {
      return `Professional ${context.category} services in ${context.city}, ${context.state}. Fast delivery, competitive pricing.`;
    }
    if (context.pageType === 'hub') {
      return `Complete directory of ${context.category} services across all locations. Compare providers and pricing.`;
    }
    if (context.pageType === 'comparison') {
      return `Compare ${context.category} services across ${context.cities?.join(', ')}. Find the best option for your business.`;
    }
    return 'Professional business services with proven results.';
  }
}

// Usage helper
export function generatePageSchemas(context: SchemaContext, faqs?: Array<{q: string, a: string}>): string {
  const generator = new AdvancedSchemaGenerator();
  const schemas = generator.generateSchemas(context);
  
  // Add FAQ schema if provided
  if (faqs && faqs.length > 0) {
    schemas.push(generator.generateFAQSchema(faqs));
  }
  
  return schemas.map(schema => 
    JSON.stringify(schema, null, 2)
  ).join('\n\n');
}