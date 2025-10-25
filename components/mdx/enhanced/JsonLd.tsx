interface JsonLdProps {
  type:
    | "Article"
    | "LocalBusiness"
    | "Service"
    | "FAQPage"
    | "BreadcrumbList"
    | "VideoObject"
    | "ImageObject";
  city: string;
  state: string;
  country: string;
  category: string;
  data?: {
    priceRange?: string;
    faqs?: Array<{ q: string; a: string }>;
  };
  imageUrl?: string;
  site?: { name: string };
}

export function JsonLd({
  type,
  city,
  state,
  country,
  category,
  data,
  imageUrl,
  site,
}: JsonLdProps) {
  const baseUrl = "https://moydus.com";
  const currentYear = new Date().getFullYear();

  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
    };

    switch (type) {
      case "Article":
        return {
          ...baseSchema,
          headline: `${category} Services in ${city}, ${state} (${currentYear})`,
          description: `Professional ${category} services in ${city}, ${state}. Local expertise, proven results.`,
          image: `${baseUrl}/og-images/${city.toLowerCase()}-${category}.jpg`,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            "@type": "Organization",
            name: "Moydus",
            url: baseUrl,
            sameAs: [
              "https://www.linkedin.com/company/moydus",
              "https://twitter.com/moydus",
              "https://github.com/moydus",
            ],
          },
          publisher: {
            "@type": "Organization",
            name: "Moydus",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`,
          },
        };

      case "LocalBusiness":
        return {
          ...baseSchema,
          name: `${category} Services in ${city}`,
          description: `Professional ${category} services in ${city}, ${state}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: city,
            addressRegion: state,
            addressCountry: country,
          },
          areaServed: {
            "@type": "City",
            name: city,
          },
          serviceArea: {
            "@type": "State",
            name: state,
          },
          priceRange: data?.priceRange || "$1000-$10000",
          telephone: "+1-555-0123",
          email: "hello@moydus.com",
          url: baseUrl,
          openingHours: "Mo,Tu,We,Th,Fr 09:00-17:00",
        };

      case "Service":
        return {
          ...baseSchema,
          name: `${category} in ${city}`,
          description: `Professional ${category} services for businesses in ${city}, ${state}`,
          provider: {
            "@type": "Organization",
            name: "Moydus",
          },
          areaServed: {
            "@type": "City",
            name: city,
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${category} Services`,
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: `Custom ${category}`,
                },
              },
            ],
          },
        };

      case "FAQPage":
        return {
          ...baseSchema,
          mainEntity:
            data?.faqs?.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })) || [],
        };

      case "BreadcrumbList":
        return {
          ...baseSchema,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: country,
              item: `${baseUrl}/${country.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: state,
              item: `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: city,
              item: `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: category,
              item: `${baseUrl}/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}/${category}`,
            },
          ],
        };

      case "VideoObject":
        return {
          ...baseSchema,
          name: `${category} in ${city}`,
          description: `${category} overview for ${city}, ${state}`,
          thumbnailUrl:
            imageUrl ||
            `${baseUrl}/og-images/${city.toLowerCase()}-${category}.jpg`,
          uploadDate: new Date().toISOString(),
          contentUrl: `${baseUrl}/video.mp4`,
          embedUrl: `${baseUrl}/video`,
        };

      case "ImageObject":
        return {
          ...baseSchema,
          url:
            imageUrl ||
            `${baseUrl}/og-images/${city.toLowerCase()}-${category}.jpg`,
          caption: `${category} in ${city}`,
          creator: {
            "@type": "Organization",
            name: site?.name || "Moydus",
          },
        };

      default:
        return baseSchema;
    }
  };

  const schema = generateSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
