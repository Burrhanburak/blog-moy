import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { Metadata } from "next";
import { categories } from "@/config/categories-new";
import CardGrid, { CardGridItem } from "@/components/CardGrid";
import {
  MapPin,
  Building2,
  Users,
  ArrowUpRight,
  Megaphone,
} from "lucide-react";
import { buildLocationUrl, getCountryByCode, slugify } from "@/lib/url-utils";
import CustomAccordion from "@/components/Accordion";

function buildTopicCluster(location: ResolvedLocation | null) {
  const primaryService = categories[0];
  if (!primaryService || !location) return null;

  const pillarUrl = buildLocationUrl(
    undefined,
    location.countryName,
    location.stateName,
    location.cityName,
    primaryService.key
  );

  return {
    location,
    pillarUrl,
    blogCategoryUrl: `/blog/category/${primaryService.key}`,
    serviceUrl: `/${primaryService.key}`,
  };
}

/* --------------------------------
 * GEO LOCATION INTERFACE
 * -------------------------------- */
interface ResolvedLocation {
  countryName: string;
  countrySlug: string;
  stateName: string;
  stateSlug: string;
  cityName: string;
  citySlug: string;
}

type HomePageProps = {
  searchParams?: Promise<{
    country?: string;
    city?: string;
    region?: string;
  }>;
};

/* --------------------------------
 * GEO RESOLVER (from IP headers)
 * -------------------------------- */
async function resolveLocationFromHeaders() {
  const headerList = await headers();
  const geoCountry = headerList.get("x-geo-country");
  const geoState = headerList.get("x-geo-country-region");
  const geoCity = headerList.get("x-geo-city");

  if (!geoCountry || !geoState || !geoCity) return null;
  const resolvedCountry = getCountryByCode(geoCountry.toLowerCase());
  if (!resolvedCountry) return null;

  const geoStateCode = geoState.split("-").pop()?.toUpperCase();
  const resolvedState = resolvedCountry.states.find(
    (state: any) =>
      state.code?.toUpperCase() === geoStateCode ||
      state.slug === slugify(state.name)
  );

  const resolvedCity =
    resolvedState?.cities.find((city: any) => city.slug === slugify(geoCity)) ||
    resolvedState?.cities[0];

  if (!resolvedState || !resolvedCity) return null;

  return {
    countryName: resolvedCountry.name,
    countrySlug: resolvedCountry.slug,
    stateName: resolvedState.name,
    stateSlug: resolvedState.slug,
    cityName: resolvedCity.name,
    citySlug: resolvedCity.slug,
  };
}

/* --------------------------------
 * FALLBACK LOCATION
 * -------------------------------- */
function getDefaultLocation(): ResolvedLocation | null {
  const fallbackCountry = getCountryByCode("us");
  const fallbackState = fallbackCountry?.states[0];
  const fallbackCity = fallbackState?.cities[0];

  if (!fallbackCountry || !fallbackState || !fallbackCity) return null;

  return {
    countryName: fallbackCountry.name,
    countrySlug: fallbackCountry.slug,
    stateName: fallbackState.name,
    stateSlug: fallbackState.slug,
    cityName: fallbackCity.name,
    citySlug: fallbackCity.slug,
  };
}

/* --------------------------------
 * METADATA
 * -------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const location = (await resolveLocationFromHeaders()) || getDefaultLocation();

  const title = location
    ? `Top ${location.cityName} Web Design, SEO & Digital Marketing Agency | Moydus`
    : "Best Web Design, SEO & Digital Marketing Agency | Moydus";

  const description = location
    ? `Moydus provides ${location.cityName}, ${location.stateName} businesses with Web Design, SEO, Shopify, WordPress, SaaS, CRM, ERP, App Development, and performance-driven Digital Marketing services.`
    : "Moydus offers Web Design, SEO, Shopify, WordPress, SaaS, CRM, ERP, App Development, and Digital Marketing services worldwide.";

  const canonicalUrl = location
    ? `https://moydus.com${buildLocationUrl(
        undefined,
        location.countryName,
        location.stateName,
        location.cityName
      )}`
    : "https://moydus.com";

  return {
    title,
    description,
    keywords: [
      "web design",
      "SEO services",
      "digital marketing",
      "Shopify development",
      "WordPress development",
      "eCommerce solutions",
      "SaaS panel management",
      "CRM solutions",
      "ERP integration",
      "App development",
      "mobile app development",
      "social media marketing",
      "content marketing",
      "email marketing",
      "ads management",
      "Google Ads",
      "PPC marketing",
      "UX design",
      "conversion optimization",
      "branding agency",
      "digital transformation",
      "growth marketing",
      "automation solutions",
      "web analytics",
      "AI marketing",
      "local SEO",
      "global SEO agency",
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Moydus",
      images: [
        {
          url: location
            ? `https://moydus.com/og-image-${location.citySlug}.jpg`
            : "https://moydus.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Web Design & SEO in ${location?.cityName || "Global"}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        location
          ? `https://moydus.com/og-image-${location.citySlug}.jpg`
          : "https://moydus.com/og-image.jpg",
      ],
    },
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

/* --------------------------------
 * PAGE COMPONENT
 * -------------------------------- */
export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const location = (await resolveLocationFromHeaders()) || getDefaultLocation();
  const linkClass =
    "underline decoration-dotted underline-offset-4 text-[#ff4d00] hover:text-blue-700";

  const heroTitle = location
    ? `Top ${location.cityName} Web Design, SEO & Digital Marketing Agency`
    : "Award-Winning Web Design, SEO & Digital Marketing Agency";

  const heroSubtitle = location
    ? `Moydus helps ${location.cityName}, ${location.stateName} businesses with <strong>Web Design</strong>, <strong>SEO Services</strong>, <strong>Shopify Development</strong>, <strong>WordPress Optimization</strong>, <strong>SaaS Management</strong>, <strong>CRM & ERP Integration</strong>, <strong>App Development</strong>, <strong>Content Marketing</strong>, <strong>Social Media</strong>, <strong>Email Campaigns</strong> and <strong>Ads Management</strong>.`
    : `Moydus is a global leader in <strong>Web Design</strong>, <strong>SEO</strong>, <strong>Digital Marketing</strong>, <strong>Shopify & WordPress Development</strong>, <strong>E-commerce</strong>, <strong>SaaS Management</strong>, <strong>CRM & ERP Solutions</strong>, <strong>App Development</strong>, <strong>Social Media Marketing</strong>, <strong>Content Marketing</strong>, and <strong>Ads Management</strong>.`;

  const topicCluster = buildTopicCluster(location);

  /* -------------------------------
   * SCHEMA JSON-LD
   * ------------------------------- */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Moydus",
        url: "https://moydus.com",
        logo: "https://moydus.com/logo.png",
        sameAs: [
          "https://www.linkedin.com/company/moydus",
          "https://x.com/moydus",
        ],
      },
      {
        "@type": "WebSite",
        name: "Moydus",
        url: "https://moydus.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://moydus.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "Moydus",
        image: "https://moydus.com/logo.png",
        address: location
          ? {
              "@type": "PostalAddress",
              addressLocality: location.cityName,
              addressRegion: location.stateName,
              addressCountry: location.countryName,
            }
          : {
              "@type": "PostalAddress",
              addressCountry: "United States",
            },
        telephone: "+1 (505) 460-5392",
        areaServed: location
          ? `${location.cityName}, ${location.stateName}, ${location.countryName}`
          : "Worldwide",
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        url: "https://moydus.com",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://moydus.com",
          },
          location && {
            "@type": "ListItem",
            position: 2,
            name: `${location.cityName}`,
            item: `https://moydus.com/${location.countrySlug}/${location.stateSlug}/${location.citySlug}`,
          },
        ].filter(Boolean),
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What makes ${location?.cityName || "Moydus"} web design unique?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Moydus delivers custom ${
            location?.cityName || ""
          } web design and SEO solutions optimized for conversions, UX, and performance.`,
        },
      },
      {
        "@type": "Question",
        name: "What services does Moydus provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer Web Design, SEO, Shopify, WordPress, SaaS, CRM, ERP, App Development, Social Media, Email, and Ads Management.",
        },
      },
    ],
  };

  /* -------------------------------
   * PAGE RENDER
   * ------------------------------- */
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="relative z-10 rounded-t-sm rounded-b-[36px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-32 pt-28">
        {" "}
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroTitle}
          </h1>
          <p
            className="text-lg text-blue-50 max-w-3xl mb-8"
            dangerouslySetInnerHTML={{ __html: heroSubtitle }}
          />
          {/* Narrative */}
          <div className="mt-16 space-y-8">
            <h2 className="text-3xl font-semibold">
              Why Businesses in {location?.cityName || "Your City"} Choose
              Moydus
            </h2>
            <p className="text-blue-50 leading-relaxed">
              We combine design and development, performance, and conversion{" "}
              strategy. From{" "}
              <strong>{location?.cityName || "global"} web design</strong> and{" "}
              <strong>SEO & GEO optimization</strong> to{" "}
              <strong className="underline text-[#ff4d00]">
                Shopify & WordPress development
              </strong>
              , we deliver measurable growth with{" "}
              <strong className="underline text-[#ff4d00]">CRM</strong>,{" "}
              <strong className="underline text-[#ff4d00]">ERP</strong>, and{" "}
              <strong className="underline text-[#ff4d00]">SaaS</strong>{" "}
              integrations.
              <strong className="font-bold">
                {" "}
                Automation for your business
              </strong>{" "}
              ,Panel management
            </p>
          </div>
          {/* Services */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Full-Service Digital Solutions
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.key}
                  href={buildLocationUrl(
                    undefined,
                    location?.countryName || "united-states",
                    location?.stateName || "california",
                    location?.cityName || "los-angeles",
                    category.key
                  )}
                  className="group block bg-white/10 rounded-xl p-6 hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ArrowUpRight className="w-4 h-4 text-[#ff4d00]" />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-blue-50 text-sm leading-relaxed">
                    {category.description} — tailored for{" "}
                    {location?.cityName || "global"} businesses.
                  </p>
                </Link>
              ))}
            </div>
          </section>
          {/* Topic Cluster Section */}{" "}
          {topicCluster ? (
            <section className="mt-16 rounded-xl border border-white/20 bg-white/10 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Dominate {topicCluster.location.cityName} Search Rankings
              </h2>
              <p className="text-base leading-7 text-blue-50 mb-4">
                <strong>Top {topicCluster.location.cityName} SEO agency</strong>{" "}
                with proven results. Our <strong>local SEO strategy</strong>{" "}
                targets high-value keywords like{" "}
                <strong>"web design {topicCluster.location.cityName}"</strong>,{" "}
                <strong>"SEO services {topicCluster.location.cityName}"</strong>
                , and{" "}
                <strong>
                  "digital marketing {topicCluster.location.cityName}"
                </strong>{" "}
                to drive qualified traffic.
              </p>
              <p className="text-base leading-7 text-blue-50 mb-4">
                Build authority with our{" "}
                <Link href={topicCluster.pillarUrl} className={linkClass}>
                  <strong>{topicCluster.location.cityName} service hub</strong>
                </Link>{" "}
                and supporting content that ranks for{" "}
                <strong>
                  &quot;{topicCluster.location.cityName} web design&quot;
                </strong>
                ,{" "}
                <strong>
                  &quot;{topicCluster.location.cityName} SEO company&quot;
                </strong>
                , and{" "}
                <strong>
                  &quot;{topicCluster.location.cityName} digital agency&quot;
                </strong>
                .
              </p>
              <p className="text-base leading-7 text-blue-50">
                Our{" "}
                <Link href={topicCluster.blogCategoryUrl} className={linkClass}>
                  <strong>SEO content strategy</strong>
                </Link>{" "}
                targets long-tail keywords and drives conversions to your{" "}
                <Link href={topicCluster.serviceUrl} className={linkClass}>
                  <strong>
                    core {topicCluster.location.cityName} services
                  </strong>
                </Link>{" "}
                — boosting rankings and revenue.
              </p>
            </section>
          ) : null}
          {/* Popular Locations */}
          <section className="mt-20">
            <h2 className="text-3xl font-semibold text-center mb-6">
              <Megaphone className="w-4 h-4 inline-block mr-2 text-[#ff4d00]" />{" "}
              Popular Locations for Digital Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={buildLocationUrl(
                  undefined,
                  location?.countryName || "",
                  location?.stateName || "",
                  location?.cityName || ""
                )}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#ff4d00]" />
                {`${location?.cityName || ""}, ${
                  location?.stateSlug.toUpperCase() || ""
                }`}
              </Link>
              <Link
                href="/united-states/california/los-angeles"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#ff4d00]" />
                Los Angeles, CA
              </Link>
              <Link
                href="/canada/ontario/toronto"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#ff4d00]" />
                Toronto, ON
              </Link>
              <Link
                href="/united-states/new-york/new-york"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <Users className="w-4 h-4 text-[#ff4d00]" />
                New York, NY
              </Link>
              <Link
                href="/united-states/california/san-francisco"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#ff4d00]" />
                San Francisco, CA
              </Link>
              <Link
                href="/united-states/texas/houston"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#ff4d00]" />
                Houston, TX
              </Link>
              <Link
                href="/united-states/florida/miami"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <Users className="w-4 h-4 text-[#ff4d00]" />
                Miami, FL
              </Link>
              <Link
                href="/united-states/illinois/chicago"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#ff4d00]" />
                Chicago, IL
              </Link>
              <Link
                href="/united-states/washington/seattle"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#ff4d00]" />
                Seattle, WA
              </Link>
            </div>
          </section>
          {/* Accordion */}
          <div className="flex justify-center ">
            <div className="max-w-4xl mx-auto container">
              <h2 className="text-3xl font-semibold text-center mb-10 mt-10">
                Frequently Asked Questions
              </h2>
              <CustomAccordion />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
