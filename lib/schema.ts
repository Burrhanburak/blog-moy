// Dynamic Schema Generation for GEO (Generative Engine Optimization)
// Supports: LocalBusiness, Service, FAQ, Review, BreadcrumbList, HowTo, ItemList, Author

interface SchemaOrgBase {
  "@context": string;
  "@type": string;
}

interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

interface LocalBusinessSchema extends SchemaOrgBase {
  "@type": "LocalBusiness" | "ProfessionalService";
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  priceRange?: string;
  image?: string;
  areaServed?: {
    "@type": "City" | "State";
    name: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
  sameAs?: string[];
}

interface ServiceSchema extends SchemaOrgBase {
  "@type": "Service";
  serviceType: string;
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  areaServed: {
    "@type": "City";
    name: string;
  };
  description: string;
  offers?: {
    "@type": "Offer";
    priceCurrency: string;
    price?: string;
    priceRange?: string;
  };
}

interface FAQPageSchema extends SchemaOrgBase {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

interface BreadcrumbListSchema extends SchemaOrgBase {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

interface PersonSchema extends SchemaOrgBase {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
}

interface ReviewSchema extends SchemaOrgBase {
  "@type": "Review";
  author: {
    "@type": "Person";
    name: string;
  };
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating?: number;
  };
  reviewBody: string;
  datePublished?: string;
}

interface ItemListSchema extends SchemaOrgBase {
  "@type": "ItemList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    url?: string;
    description?: string;
  }>;
}

interface HowToSchema extends SchemaOrgBase {
  "@type": "HowTo";
  name: string;
  description: string;
  step: Array<{
    "@type": "HowToStep";
    name: string;
    text: string;
    position: number;
  }>;
  totalTime?: string;
}

interface BlogPostingSchema extends SchemaOrgBase {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: PersonSchema;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: string;
  relatedLink?: string[];
  keywords?: string[];
}

// Main Schema Generator Class
export class SchemaGenerator {
  private baseUrl: string;

  constructor(baseUrl: string = "https://moydus.com") {
    this.baseUrl = baseUrl;
  }

  // Generate LocalBusiness schema for service pages
  generateLocalBusiness(data: {
    name: string;
    description: string;
    url: string;
    city: string;
    state: string;
    stateCode: string;
    country: string;
    countryCode: string;
    latitude?: number;
    longitude?: number;
    priceRange?: string;
    email?: string;
    phone?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    sameAs?: string[];
  }): LocalBusinessSchema {
    const schema: LocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: data.name,
      description: data.description,
      url: `${this.baseUrl}${data.url}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: data.city,
        addressRegion: data.stateCode,
        addressCountry: data.countryCode,
      },
      areaServed: {
        "@type": "City",
        name: data.city,
      },
    };

    if (data.latitude && data.longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }

    if (data.priceRange) {
      schema.priceRange = data.priceRange;
    }

    if (data.email) {
      schema.email = data.email;
    }

    if (data.phone) {
      schema.telephone = data.phone;
    }

    if (data.image) {
      schema.image = data.image;
    }

    if (data.rating && data.reviewCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: data.rating,
        reviewCount: data.reviewCount,
      };
    }

    if (data.sameAs && data.sameAs.length > 0) {
      schema.sameAs = data.sameAs;
    }

    return schema;
  }

  // Generate Service schema
  generateService(data: {
    serviceType: string;
    description: string;
    city: string;
    priceRange?: string;
    priceCurrency?: string;
  }): ServiceSchema {
    const schema: ServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: data.serviceType,
      provider: {
        "@type": "Organization",
        name: "Moydus",
        url: this.baseUrl,
      },
      areaServed: {
        "@type": "City",
        name: data.city,
      },
      description: data.description,
    };

    if (data.priceRange) {
      schema.offers = {
        "@type": "Offer",
        priceCurrency: data.priceCurrency || "USD",
        priceRange: data.priceRange,
      };
    }

    return schema;
  }

  // Generate FAQ schema from frontmatter
  generateFAQ(faqs: Array<{ q: string; a: string }>): FAQPageSchema {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    };
  }

  // Generate Breadcrumb schema
  generateBreadcrumbs(
    items: Array<{ name: string; url?: string }>
  ): BreadcrumbListSchema {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url ? `${this.baseUrl}${item.url}` : undefined,
      })),
    };
  }

  // Generate Author schema
  generateAuthor(data: {
    name: string;
    jobTitle?: string;
    url?: string;
    sameAs?: string[];
  }): PersonSchema {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: data.name,
      jobTitle: data.jobTitle,
      url: data.url,
      sameAs: data.sameAs,
    };
  }

  // Generate Review schemas
  generateReviews(
    reviews: Array<{
      name: string;
      rating: number;
      text: string;
      date?: string;
    }>
  ): ReviewSchema[] {
    return reviews.map((review) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
      datePublished: review.date,
    }));
  }

  // Generate ItemList schema (for "Best X in City" pages)
  generateItemList(data: {
    items: Array<{
      name: string;
      url?: string;
      description?: string;
    }>;
  }): ItemListSchema {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: data.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    };
  }

  // Generate HowTo schema
  generateHowTo(data: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string }>;
    totalTime?: string;
  }): HowToSchema {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: data.name,
      description: data.description,
      step: data.steps.map((step, index) => ({
        "@type": "HowToStep",
        name: step.name,
        text: step.text,
        position: index + 1,
      })),
      totalTime: data.totalTime,
    };
  }

  // Generate BlogPosting schema with GEO optimization
  generateBlogPosting(data: {
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    author: { name: string; sameAs?: string[] };
    image?: string;
    relatedLinks?: string[];
    keywords?: string[];
  }): BlogPostingSchema {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.headline,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.author.name,
        sameAs: data.author.sameAs,
      },
      publisher: {
        "@type": "Organization",
        name: "Moydus",
        logo: {
          "@type": "ImageObject",
          url: `${this.baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: `${this.baseUrl}${data.url}`,
      relatedLink: data.relatedLinks,
      keywords: data.keywords,
    };
  }

  // Combine multiple schemas into a single JSON-LD script
  combineSchemas(...schemas: any[]): string {
    const validSchemas = schemas.filter((s) => s !== null && s !== undefined);

    if (validSchemas.length === 0) {
      return "";
    }

    if (validSchemas.length === 1) {
      return JSON.stringify(validSchemas[0], null, 2);
    }

    // Multiple schemas in an array
    return JSON.stringify(validSchemas, null, 2);
  }
}

// Export a singleton instance
export const schemaGenerator = new SchemaGenerator("https://moydus.com");

// Helper function to sanitize text for schema
function sanitizeSchemaText(text: string): string {
  return text
    .replace(/[\"']/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper function to generate all schemas for a city service page
export function generateCityServiceSchemas(data: {
  title: string;
  description: string;
  snippetSummary: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  locale: string;
  category: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  priceRange?: string;
  faqs?: Array<{ q: string; a: string }>;
  testimonials?: Array<{ name: string; rating: number; text: string }>;
  author?: { name: string; sameAs?: string[] };
  lastUpdated?: string;
  primaryKeywords?: string[];
}) {
  const schemas: any[] = [];

  // 1. LocalBusiness Schema
  schemas.push(
    schemaGenerator.generateLocalBusiness({
      name: data.title,
      description: data.description || data.snippetSummary,
      url: `/${data.slug}`,
      city: data.city,
      state: data.state,
      stateCode: data.stateCode,
      country: data.country,
      countryCode: data.countryCode,
      latitude: data.latitude,
      longitude: data.longitude,
      priceRange: data.priceRange,
      email: "hello@moydus.com",
      sameAs: [
        "https://www.linkedin.com/company/moydus",
        "https://github.com/moydus",
        "https://twitter.com/moydus",
      ],
      rating:
        data.testimonials && data.testimonials.length > 0
          ? data.testimonials.reduce((sum, t) => sum + t.rating, 0) /
            data.testimonials.length
          : undefined,
      reviewCount: data.testimonials?.length,
    })
  );

  // 2. Service Schema
  schemas.push(
    schemaGenerator.generateService({
      serviceType: data.category,
      description: data.snippetSummary,
      city: data.city,
      priceRange: data.priceRange,
      priceCurrency: "USD",
    })
  );

  // 3. Breadcrumb Schema
  schemas.push(
    schemaGenerator.generateBreadcrumbs([
      { name: "Home", url: "/" },
      { name: data.country, url: `/${data.locale}` },
      {
        name: data.state,
        url: `/${
          data.locale
        }/${data.countryCode.toLowerCase()}/${data.stateCode.toLowerCase()}`,
      },
      {
        name: data.city,
        url: `/${
          data.locale
        }/${data.countryCode.toLowerCase()}/${data.stateCode.toLowerCase()}/${
          data.city?.toLowerCase() || ""
        }`,
      },
      { name: data.category, url: `/${data.slug}` },
    ])
  );

  // 4. FAQ Schema
  if (data.faqs && data.faqs.length > 0) {
    schemas.push(schemaGenerator.generateFAQ(data.faqs));
  }

  // 5. Review Schemas
  if (data.testimonials && data.testimonials.length > 0) {
    const reviews = schemaGenerator.generateReviews(
      data.testimonials.map((t) => ({
        name: t.name,
        rating: t.rating,
        text: t.text,
        date: data.lastUpdated,
      }))
    );
    schemas.push(...reviews);
  }

  // 6. Author Schema (for E-E-A-T)
  if (data.author) {
    schemas.push(
      schemaGenerator.generateAuthor({
        name: data.author.name,
        jobTitle: "Digital Marketing Expert",
        url: "https://moydus.com",
        sameAs: data.author.sameAs,
      })
    );
  }

  return schemaGenerator.combineSchemas(...schemas);
}

// Helper function for blog post schema generation
export function generateBlogSchemas(data: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; sameAs?: string[] };
  image?: string;
  relatedLinks?: string[];
  keywords?: string[];
  faqs?: Array<{ q: string; a: string }>;
}) {
  const schemas: any[] = [];

  // Blog Posting Schema
  schemas.push(
    schemaGenerator.generateBlogPosting({
      headline: data.title,
      description: data.description,
      url: data.url,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: data.author,
      image: data.image,
      relatedLinks: data.relatedLinks,
      keywords: data.keywords,
    })
  );

  // FAQ Schema (if available)
  if (data.faqs && data.faqs.length > 0) {
    schemas.push(schemaGenerator.generateFAQ(data.faqs));
  }

  return schemaGenerator.combineSchemas(...schemas);
}

// Helper function for listicle pages ("Best X in City")
export function generateListicleSchemas(data: {
  title: string;
  description: string;
  city: string;
  state: string;
  items: Array<{ name: string; description: string; url?: string }>;
  faqs?: Array<{ q: string; a: string }>;
}) {
  const schemas: any[] = [];

  // ItemList Schema for "Best X in City" pages
  schemas.push(
    schemaGenerator.generateItemList({
      items: data.items,
    })
  );

  // FAQ Schema
  if (data.faqs && data.faqs.length > 0) {
    schemas.push(schemaGenerator.generateFAQ(data.faqs));
  }

  return schemaGenerator.combineSchemas(...schemas);
}
