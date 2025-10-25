import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { categories } from "@/config/categories-new";
import { generateCityServiceSchemas } from "@/lib/schema";
import {
  buildLocationUrl,
  getCountryByCode,
  getStateByCode,
  getCityByCode,
  generateCityParams,
} from "@/lib/url-utils";
import CardGrid from "@/components/CardGrid";
import { getCategoryIcon } from "@/lib/category-icons";
import Accordion from "@/components/mintlify/Accordion";
import { Atom, MapPin, Rocket, Zap } from "lucide-react";
import Image from "next/image";
import { getRandomImage } from "@/lib/getRandomImage";

interface CityPageProps {
  params: Promise<{
    country: string;
    state: string;
    city: string;
  }>;
}

// Next.js 16: Enhanced ISR with cache tags
export const revalidate = 60 * 60 * 24 * 30; // 30 days
export const dynamic = "force-static";

// Generate static params for priority cities only
export async function generateStaticParams() {
  const allParams = generateCityParams();
  const priorityCountries = [
    "united-states",
    "germany",
    "united-kingdom",
    "france",
    "canada",
    "australia",
  ];
  const priorityParams = allParams.filter((param) =>
    priorityCountries.includes(param.country)
  );
  console.log(`Generating ${priorityParams.length} priority city pages...`);
  return priorityParams.slice(0, 10000); // Limit to 10K cities
}

// Generate metadata with hreflang support
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);
  const stateData = getStateByCode(
    resolvedParams.country,
    resolvedParams.state
  );
  const cityData = getCityByCode(
    resolvedParams.country,
    resolvedParams.state,
    resolvedParams.city
  );

  if (!countryData || !stateData || !cityData) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    };
  }

  const title = `${cityData.name}, ${stateData.name} Web Design, SEO & Digital Marketing | Moydus`;
  const description = `Transform your ${cityData.name} business with Moydus' expert web design, SEO, and digital marketing services tailored for local success.`;
  const canonicalUrl = `https://moydus.com${buildLocationUrl(
    undefined,
    countryData.name,
    stateData.name,
    cityData.name
  )}`;

  return {
    title,
    description,
    keywords: [
      `${cityData.name} web design`,
      `${cityData.name} SEO services`,
      `${cityData.name} digital marketing`,
      `${cityData.name} website development`,
      `${cityData.name} local SEO`,
      `${cityData.name} marketing strategy`,
      `${cityData.name} website redesign`,
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Moydus",
      locale: "en_US",
      images: [
        {
          url: `https://moydus.com/og-image-${resolvedParams.city}.jpg`,
          width: 1200,
          height: 630,
          alt: `Web Design & SEO Services in ${cityData.name}, ${stateData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://moydus.com/og-image-${resolvedParams.city}.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {},
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function buildCityNarrativeSections({
  city,
  state,
  country,
  primaryCategory,
  linkClass,
}: {
  city: string;
  state: string;
  country: string;
  primaryCategory?: (typeof categories)[number];
  linkClass: string;
}) {
  const servicePillarUrl = primaryCategory
    ? buildLocationUrl(undefined, country, state, city, primaryCategory.key)
    : "/services";
  const blogCategoryUrl = primaryCategory
    ? `/blog/category/${primaryCategory.key}`
    : "/blog";
  const serviceOverviewUrl = primaryCategory
    ? `/${primaryCategory.key}`
    : "/services";

  return [
    {
      heading: `${city}, ${state} Web Design & Digital Solutions`,
      body: [
        <div key="city-overview">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tailored {city} Web Design & SEO Services
          </h3>
          <p>
            Businesses in {city}, {state} rely on Moydus for high-performance{" "}
            <strong>{city} web design</strong>, marketing funnels, and lifecycle
            programs that drive measurable results. Our {city} digital solutions
            are customized to local buyer behavior, ensuring seamless handoffs
            to your in-house team.
          </p>
        </div>,
        <div key="city-outline">
          <p>
            Start with a discovery sprint to align on goals, then explore our{" "}
            <Link href={servicePillarUrl} className={linkClass}>
              {city} project outline
            </Link>{" "}
            for detailed scope, pricing, and timelines tailored to {city}{" "}
            organizations. Boost your local presence with our{" "}
            <strong>{city} SEO services</strong> and digital strategy.
          </p>
        </div>,
      ],
    },
    {
      heading: `Scalable ${city} Website Development & Optimization`,
      body: [
        <div key="city-delivery">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Agile Delivery for {city} Businesses
          </h3>
          <p>
            Our {city} website development process uses short, transparent
            sprints. Each milestone includes documentation, quality assurance,
            and analytics, keeping {city} stakeholders informed on live updates
            and next steps.
          </p>
        </div>,
        <div key="city-optimise">
          <p>
            Post-launch, we offer {city} optimization retainers, A/B testing,
            and content support to ensure your website remains a growing asset.
            Our <strong>{city} digital marketing</strong> strategies drive
            continuous improvement without stalling momentum.
          </p>
        </div>,
      ],
    },
    {
      heading: `Strengthen Your ${city} SEO & Topic Cluster`,
      body: [
        <div key="city-cluster">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Build Authority with {city} SEO
          </h3>
          <p>
            Establish topical authority with a{" "}
            <Link href={servicePillarUrl} className={linkClass}>
              {city} service page
            </Link>{" "}
            as the anchor. Support it with fresh, relevant content from our{" "}
            <Link href={blogCategoryUrl} className={linkClass}>
              {city} blog category
            </Link>
            . Each article includes a strong CTA linking to your{" "}
            <Link href={serviceOverviewUrl} className={linkClass}>
              core {city} digital services
            </Link>
            , driving both authority and conversions for {city} businesses.
          </p>
        </div>,
      ],
    },
    {
      heading: `Why ${city} Chooses Moydus for Digital Success`,
      body: [
        <div key="city-why">
          <p>
            From <strong>{city} web design</strong> to{" "}
            <strong>{city} SEO services</strong>, Moydus delivers tailored
            solutions that resonate with local audiences. Our data-driven
            approach ensures your {city} digital strategy aligns with market
            trends, while our agile process keeps projects on track.{" "}
            <Link href="/contact" className={linkClass}>
              Contact us today
            </Link>{" "}
            to start your {city} project.
          </p>
        </div>,
      ],
    },
  ];
}

export default async function CityPage({ params }: CityPageProps) {
  const linkClass =
    "underline decoration-dotted underline-offset-4 text-[#ff4d00] hover:text-[#ff4d00]";

  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);
  const stateData = getStateByCode(
    resolvedParams.country,
    resolvedParams.state
  );
  const cityData = getCityByCode(
    resolvedParams.country,
    resolvedParams.state,
    resolvedParams.city
  );

  if (!countryData || !stateData || !cityData) {
    return notFound();
  }

  const primaryCategory = categories[0];
  const narrativeSections = buildCityNarrativeSections({
    city: cityData.name,
    state: stateData.name,
    country: countryData.name,
    primaryCategory,
    linkClass,
  });

  const faqs = [
    {
      question: `How do you keep ${cityData.name} projects moving quickly?`,
      answer: `We run short sprints with shared dashboards, async updates, and approvals so ${cityData.name} stakeholders stay aligned without adding meetings.`,
      schemaAnswer: `We run short sprints with shared dashboards, async updates, and approvals so ${cityData.name} stakeholders stay aligned without adding meetings.`,
    },
    {
      question: `Can you migrate an existing ${cityData.name} site without downtime?`,
      answer: `Yes. We audit redirects, integrations, and hosting up front so the new ${cityData.name} experience goes live once everything is verified.`,
      schemaAnswer: `Yes. We audit redirects, integrations, and hosting up front so the new ${cityData.name} experience goes live once everything is verified.`,
    },
    {
      question: `Do you stay involved after launch?`,
      answer: `Optimisation retainers cover experimentation, content, and analytics reviews so the new ${cityData.name} experience keeps compounding.`,
      schemaAnswer: `Optimisation retainers cover experimentation, content, and analytics reviews so the new ${cityData.name} experience keeps compounding.`,
    },
    {
      question: `What makes ${cityData.name} web design unique?`,
      answer: `Our ${cityData.name} web design services focus on local market trends, user behavior, and SEO optimization to ensure your website resonates with ${cityData.name} audiences.`,
      schemaAnswer: `Our ${cityData.name} web design services focus on local market trends, user behavior, and SEO optimization to ensure your website resonates with ${cityData.name} audiences.`,
    },
  ];

  const faqSchemaEntities = faqs
    .filter((faq) => faq.schemaAnswer.trim().length > 0)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.schemaAnswer,
      },
    }));

  const schema = generateCityServiceSchemas({
    title: `${cityData.name} Digital Services | Moydus`,
    description: `Web design, automation, and SEO programmes for organisations in ${cityData.name}, ${stateData.name}.`,
    snippetSummary: `Website, automation, and SEO support in ${cityData.name}`,
    city: cityData.name,
    state: stateData.name,
    stateCode: stateData.code || resolvedParams.state.toUpperCase().slice(0, 2),
    country: countryData.name,
    countryCode: countryData.code.toUpperCase(),
    locale: "en",
    category: "Digital Services",
    slug: `${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}`,
    priceRange: "$1,500–$50,000",
    faqs: faqs.map(({ question, schemaAnswer }) => ({
      q: question,
      a: schemaAnswer,
    })),
    testimonials: [
      {
        name: "Jennifer Thompson",
        rating: 5,
        text: `Our ${cityData.name} launch shipped faster than expected with cleaner analytics instrumentation.`,
      },
      {
        name: "David Chen",
        rating: 5,
        text: `The ${cityData.name} SEO programme delivered steady growth without adding overhead for our internal team.`,
      },
    ],
    author: { name: "Moydus", sameAs: ["https://linkedin.com/company/moydus"] },
    lastUpdated: new Date().toISOString().split("T")[0],
    primaryKeywords: [
      `${cityData.name} web design`,
      `${cityData.name} SEO`,
      `${cityData.name} digital services`,
    ],
  });

  const cities = stateData.cities ?? [];
  const sortedCities = [...cities].sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );
  const currentIndex = sortedCities.findIndex(
    (c: { slug: string }) => c.slug === cityData.slug
  );
  const nearbyCities =
    currentIndex === -1
      ? sortedCities.slice(0, 6)
      : sortedCities
          .slice(Math.max(0, currentIndex - 3), currentIndex)
          .concat(sortedCities.slice(currentIndex + 1, currentIndex + 4));

  const topicCluster = primaryCategory
    ? {
        categoryTitle: primaryCategory.title,
        blogCategoryUrl: `/blog/category/${primaryCategory.key}`,
        serviceUrl: `/${primaryCategory.key}`,
        pillarUrl: buildLocationUrl(
          undefined,
          countryData.name,
          stateData.name,
          cityData.name,
          primaryCategory.key
        ),
      }
    : null;

  return (
    <>
      {/* JSON-LD: LocalBusiness + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Moydus",
            areaServed: `${cityData.name}, ${stateData.name}`,
            url: `https://moydus.com/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}`,
            sameAs: ["https://moydus.com"],
            address: {
              "@type": "PostalAddress",
              addressLocality: cityData.name,
              addressRegion: stateData.name,
              addressCountry: countryData.name,
            },
            description: `Moydus delivers expert ${cityData.name} web design, SEO, and digital marketing services for local businesses.`,
            serviceType: ["Web Design", "SEO Services", "Digital Marketing"],
            keywords: [
              `${cityData.name} web design`,
              `${cityData.name} SEO`,
              `${cityData.name} digital marketing`,
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://moydus.com`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: countryData.name,
                item: `https://moydus.com/${resolvedParams.country}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: stateData.name,
                item: `https://moydus.com/${resolvedParams.country}/${resolvedParams.state}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: cityData.name,
                item: `https://moydus.com/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSchemaEntities,
          }),
        }}
      />

      <main className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4 max-w-6xl prose prose-gray dark:prose-invert">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <Link
                  href={buildLocationUrl(undefined)}
                  className="hover:text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">•</span>
                <Link
                  href={buildLocationUrl(undefined, countryData.name)}
                  className="hover:text-gray-700"
                >
                  {countryData.name}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1 ">•</span>
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name
                  )}
                  className="hover:text-gray-700"
                >
                  {stateData.name}
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">•</span>
                <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                  {cityData.name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200 mb-2">
              Web Design, SEO & Digital Marketing in {cityData.name},{" "}
              {stateData.name}
            </h1>
            <p className="mt-2 text-lg text-gray-700">
              Transform your {cityData.name} business with Moydus’ expert{" "}
              <strong>{cityData.name} web design</strong>, SEO, and digital
              marketing services tailored for local success.
            </p>
          </header>

          {/* Narrative Sections */}
          <section className="space-y-10 mb-12">
            {narrativeSections.map((section, index) => (
              <article key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.heading}
                </h2>
                {index === 0 ? (
                  <div className="w-full overflow-hidden rounded-lg border border-gray-100">
                    {(() => {
                      // Use primary category key for consistent image selection
                      const categoryKey = primaryCategory?.key || "web-design";
                      const dynamicSrc = getRandomImage(categoryKey);
                      return (
                        <Image
                          src={dynamicSrc}
                          alt={`${cityData.name} services`}
                          width={1200}
                          height={240}
                          className="object-contain bg-white p-2 rounded-lg"
                          priority={false}
                        />
                      );
                    })()}
                  </div>
                ) : null}
                {section.body.map((paragraph, paragraphIndex) => (
                  <div
                    key={paragraphIndex}
                    className="text-base leading-7 text-gray-700"
                  >
                    {paragraph}
                  </div>
                ))}
              </article>
            ))}
          </section>

          {topicCluster ? (
            <section className="mb-12 rounded-xl border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Build Topic Clusters for {cityData.name} SEO
              </h2>
              <p className="text-base leading-7 text-gray-700 mb-3">
                Anchor your {cityData.name} digital strategy with a{" "}
                <Link href={topicCluster.pillarUrl} className={linkClass}>
                  {cityData.name} service page
                </Link>
                . Link supporting posts to drive authority to your core CTA.
              </p>
              <p className="text-base leading-7 text-gray-700">
                Keep your {cityData.name} topic cluster fresh with articles in
                the{" "}
                <Link href={topicCluster.blogCategoryUrl} className={linkClass}>
                  blog category
                </Link>
                . Each post links to your{" "}
                <Link href={topicCluster.serviceUrl} className={linkClass}>
                  {topicCluster.categoryTitle} offer
                </Link>
                , ensuring Google sees topical depth while guiding{" "}
                {cityData.name} prospects to convert.
              </p>
            </section>
          ) : null}

          {/* Services Grid */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-5 text-center">
              Digital Services for {cityData.name} Businesses
            </h2>
            <div className="flex items-center justify-center">
              <p className="text-gray-600 mb-4">
                Discover our tailored {cityData.name} programs:
              </p>
            </div>
            <CardGrid
              className="px-1"
              cards={categories.slice(0, 6).map((service) => ({
                href: buildLocationUrl(
                  undefined,
                  countryData.name,
                  stateData.name,
                  cityData.name,
                  service.key
                ),
                icon: getCategoryIcon(service.key),
                title: `${service.title} in ${cityData.name}, ${stateData.name}`,
                description: `Launch ${
                  cityData.name
                } ${service.title.toLowerCase()} with Moydus. Tailored for local businesses with ${
                  service.priceRange
                } and ${service.timeline}.`,
              }))}
            />
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                <span className="mr-2">
                  <Zap className="w-6 h-6 inline-block mr-2 text-[#ff4d00]" />
                </span>
                Need more options? Explore additional {cityData.name} programs:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(6).map((service) => (
                  <Link
                    key={service.key}
                    href={buildLocationUrl(
                      undefined,
                      countryData.name,
                      stateData.name,
                      cityData.name,
                      service.key
                    )}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Nearby Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <MapPin className="w-6 h-6 inline-block mr-2 text-[#ff4d00]" />{" "}
              Nearby Cities
            </h2>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((c: { slug: string; name: string }) => (
                <Link
                  key={c.slug}
                  href={buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    c.name
                  )}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Questions from {cityData.name} Businesses
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  title={faq.question}
                  icon={<Rocket className="w-4 h-4" />}
                  variant="rounded"
                  defaultOpen={false}
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Accordion>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 max-w-6xl mx-auto container">
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
              <h2 className="text-3xl font-semibold">
                Launch Your {cityData.name} Digital Strategy Today
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-blue-50">
                Ready to elevate your {cityData.name} business? Let’s craft a
                tailored {cityData.name} web design and SEO plan with a clear
                timeline and investment range.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Your {cityData.name} Project
                </Link>
                <Link
                  href=""
                  className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  See {cityData.name} Case Studies
                </Link>
              </div>
              <div className="mt-4 text-xs uppercase tracking-wide text-blue-100">
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name
                  )}
                  className="underline"
                >
                  Back to {stateData.name}
                </Link>
                <span className="mx-2">•</span>
                <Link href="/blog" className="underline">
                  Read {cityData.name} Strategy Guides
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
