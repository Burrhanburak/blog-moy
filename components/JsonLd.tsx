interface JsonLdProps {
  data: Array<Record<string, any>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}

// Helper function to generate structured data
export function generateStructuredData({
  city,
  state,
  country,
  category,
  faqs,
  canonicalUrl,
  lastUpdated
}: {
  city: string;
  state: string;
  country: string;
  category: string;
  faqs: Array<{ q: string; a: string }>;
  canonicalUrl: string;
  lastUpdated: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Best ${category} Services in ${city}, ${state}`,
      "description": `Professional ${category} services in ${city}, ${state}. Local expertise meets proven results.`,
      "author": {
        "@type": "Organization",
        "name": "Moydus",
        "url": "https://moydus.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Moydus",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moydus.com/logo.png"
        }
      },
      "datePublished": lastUpdated,
      "dateModified": lastUpdated,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "about": {
        "@type": "Thing",
        "name": category
      },
      "mentions": [
        {
          "@type": "Place",
          "name": city,
          "containedInPlace": {
            "@type": "Place",
            "name": state
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Moydus",
      "description": `Professional ${category} services in ${city}, ${state}`,
      "url": "https://moydus.com",
      "telephone": "+1-555-0123",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressRegion": state,
        "addressCountry": country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.7128",
        "longitude": "-74.0060"
      },
      "openingHours": "Mo-Fr 09:00-18:00",
      "priceRange": "$$",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "40.7128",
          "longitude": "-74.0060"
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": category,
              "description": `Professional ${category} services for ${city} businesses`
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://moydus.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": country,
          "item": `https://moydus.com/${country.toLowerCase()}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": state,
          "item": `https://moydus.com/${country.toLowerCase()}/${state.toLowerCase()}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": city,
          "item": `https://moydus.com/${country.toLowerCase()}/${state.toLowerCase()}/${city.toLowerCase()}`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": category,
          "item": canonicalUrl
        }
      ]
    },
    {
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
    }
  ];
}
