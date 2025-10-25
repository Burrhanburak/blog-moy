import { MetadataRoute } from "next";
import { allBlogPosts } from "contentlayer/generated";
import { generateComparisonStaticParams } from "@/lib/comparison-data";
import { getAllCountries } from "@/lib/url-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://moydus.com";
  const currentDate = new Date();
  const MAX_SITEMAP_ENTRIES = 50000;

  const parseDate = (value?: string | Date) => {
    if (!value) {
      return currentDate;
    }
    const parsed = value instanceof Date ? value : new Date(value);
    return Number.isNaN(parsed.getTime()) ? currentDate : parsed;
  };

  const updateMostRecent = (map: Map<string, Date>, key: string, date: Date) => {
    const existing = map.get(key);
    if (!existing || date > existing) {
      map.set(key, date);
    }
  };

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: parseDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog listing pages (country/state/city/service)
  const blogCountryDates = new Map<string, Date>();
  const blogStateDates = new Map<string, Date>();
  const blogCityDates = new Map<string, Date>();
  const blogServiceDates = new Map<string, Date>();

  for (const post of allBlogPosts) {
    const lastModified = parseDate(post.date);
    const { country, state, city, service } = post;

    if (country) {
      updateMostRecent(blogCountryDates, country, lastModified);
    }
    if (country && state) {
      updateMostRecent(blogStateDates, `${country}|${state}`, lastModified);
    }
    if (country && state && city) {
      updateMostRecent(blogCityDates, `${country}|${state}|${city}`, lastModified);
    }
    if (country && state && city && service) {
      updateMostRecent(
        blogServiceDates,
        `${country}|${state}|${city}|${service}`,
        lastModified
      );
    }
  }

  const blogCountryPages: MetadataRoute.Sitemap = [];
  for (const [countrySlug, lastModified] of blogCountryDates) {
    blogCountryPages.push({
      url: `${baseUrl}/blog/${countrySlug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  const blogStatePages: MetadataRoute.Sitemap = [];
  for (const [key, lastModified] of blogStateDates) {
    const [countrySlug, stateSlug] = key.split("|");
    if (!countrySlug || !stateSlug) continue;
    blogStatePages.push({
      url: `${baseUrl}/blog/${countrySlug}/${stateSlug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  const blogCityPages: MetadataRoute.Sitemap = [];
  for (const [key, lastModified] of blogCityDates) {
    const [countrySlug, stateSlug, citySlug] = key.split("|");
    if (!countrySlug || !stateSlug || !citySlug) continue;
    blogCityPages.push({
      url: `${baseUrl}/blog/${countrySlug}/${stateSlug}/${citySlug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.55,
    });
  }

  const blogServicePages: MetadataRoute.Sitemap = [];
  for (const [key, lastModified] of blogServiceDates) {
    const [countrySlug, stateSlug, citySlug, serviceSlug] = key.split("|");
    if (!countrySlug || !stateSlug || !citySlug || !serviceSlug) continue;
    blogServicePages.push({
      url: `${baseUrl}/blog/${countrySlug}/${stateSlug}/${citySlug}/${serviceSlug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  // Compare pages
  const compareParams = generateComparisonStaticParams();
  const comparePages: MetadataRoute.Sitemap = compareParams.map((param) => ({
    url: `${baseUrl}/compare/${param}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Location hierarchy (priority markets to avoid exceeding 50k entry limit)
  const priorityCountrySlugs = new Set([
    "united-states",
    "germany",
    "united-kingdom",
    "france",
    "canada",
    "australia",
  ]);

  const priorityCountries = getAllCountries().filter((country) =>
    priorityCountrySlugs.has(country.slug)
  );

  const countryPages: MetadataRoute.Sitemap = priorityCountries.map(
    (country) => ({
      url: `${baseUrl}/${country.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const statePages: MetadataRoute.Sitemap = priorityCountries.flatMap(
    (country) =>
      country.states.map((state) => ({
        url: `${baseUrl}/${country.slug}/${state.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
  );

  const cityPagesAll: MetadataRoute.Sitemap = priorityCountries.flatMap(
    (country) =>
      country.states.flatMap((state) =>
        state.cities.map((city) => ({
          url: `${baseUrl}/${country.slug}/${state.slug}/${city.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.5,
        }))
      )
  );

  const baseEntries = [
    ...staticPages,
    ...blogPages,
    ...blogCountryPages,
    ...blogStatePages,
    ...blogCityPages,
    ...blogServicePages,
    ...comparePages,
    ...countryPages,
    ...statePages,
  ];

  const remainingSlots = MAX_SITEMAP_ENTRIES - baseEntries.length;
  const cityPages =
    remainingSlots > 0 ? cityPagesAll.slice(0, remainingSlots) : [];

  if (process.env.NODE_ENV !== "production" && cityPages.length < cityPagesAll.length) {
    console.warn(
      `[sitemap] Trimmed ${cityPagesAll.length - cityPages.length} city entries to respect the ${MAX_SITEMAP_ENTRIES} URL cap.`
    );
  }

  // NOTE: City-category combinations (1M+ URLs) continue to live under public/sitemaps/
  // via the generated sitemap-index.xml to keep the main sitemap performant.

  return [...baseEntries, ...cityPages];
}
