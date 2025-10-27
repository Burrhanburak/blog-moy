import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { categories, getBenefitText } from "@/config/categories-new";
import {
  buildLocationUrl,
  getCountryByCode,
  getStateByCode,
  generateStateParams,
} from "@/lib/url-utils";
import CardGrid from "@/components/CardGrid";
import { getCategoryIcon } from "@/lib/category-icons";
import Accordion from "@/components/mintlify/Accordion";
import { ArrowUpRight, Megaphone, Rocket } from "lucide-react";

function buildStateNarrativeSections({
  state,
  country,
  stateData,
  primaryCategory,
  linkClass,
}: {
  state: string;
  country: string;
  stateData: { cities?: { name: string; slug: string }[]; name: string };
  primaryCategory?: (typeof categories)[number];
  linkClass: string;
}) {
  const firstCity = stateData.cities?.[0]?.name ?? state;
  const sampleCities = stateData.cities
    ?.slice(0, 3)
    .map((city) => city.name)
    .join(", ");
  const servicePillarUrl = primaryCategory
    ? buildLocationUrl(
        undefined,
        country,
        state,
        firstCity,
        primaryCategory.key
      )
    : "/services";
  const blogCategoryUrl = primaryCategory
    ? `/blog/category/${primaryCategory.key}`
    : "/blog";
  const serviceOverviewUrl = primaryCategory
    ? `/${primaryCategory.key}`
    : "/services";

  return [
    {
      heading: `${state}, ${country} Web Design & Digital Solutions`,
      body: [
        <div key="state-overview">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tailored {state} Web Design & SEO Services
          </h3>
          <p>
            Businesses across {state}, including {sampleCities || state}, trust
            Moydus for high-performance <strong>{state} web design</strong>,
            marketing funnels, and automation programs that deliver measurable
            results. Our {state} digital solutions are tailored to local market
            trends, ensuring seamless handoffs to your team.
          </p>
        </div>,
        <div key="state-outline">
          <p>
            Kick off with a discovery sprint to benchmark competitors and
            customer journeys in {state}. Review our{" "}
            <Link href={servicePillarUrl} className={linkClass}>
              {state} project outline
            </Link>{" "}
            for scope, pricing, and timelines designed for {firstCity} and other{" "}
            {state} organizations. Boost your visibility with{" "}
            <strong>{state} SEO services</strong>.
          </p>
        </div>,
      ],
    },
    {
      heading: `${state} Website Development & Optimization`,
      body: [
        <div key="state-delivery">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Streamlined Delivery for {state} Teams
          </h3>
          <p>
            Our {state} website development process runs in short, transparent
            sprints. We conduct analytics, CMS, and content audits in week one,
            followed by two-week sprints with async updates for stakeholders
            across {state}.
          </p>
        </div>,
        <div key="state-optimise">
          <p>
            Post-launch, our {state} optimization retainers include A/B testing,
            content support, and analytics reviews to ensure your digital assets
            grow. Our <strong>{state} digital marketing</strong> strategies keep
            your momentum compounding without delays.
          </p>
        </div>,
      ],
    },
    {
      heading: `Strengthen Your ${state} SEO & Topic Cluster`,
      body: [
        <div key="state-cluster">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Build Authority with {state} SEO
          </h3>
          <p>
            Anchor your {state} digital strategy with a{" "}
            <Link href={servicePillarUrl} className={linkClass}>
              {state} service page
            </Link>
            . Support it with fresh content from our{" "}
            <Link href={blogCategoryUrl} className={linkClass}>
              {state} blog category
            </Link>
            . Each article includes a CTA to your{" "}
            <Link href={serviceOverviewUrl} className={linkClass}>
              core {state} digital services
            </Link>
            , driving authority and conversions across {state}.
          </p>
        </div>,
      ],
    },
    {
      heading: `Why ${state} Chooses Moydus for Digital Success`,
      body: [
        <div key="state-why">
          <p>
            From <strong>{state} web design</strong> to{" "}
            <strong>{state} SEO services</strong>, Moydus delivers solutions
            that resonate with {state} audiences. Our data-driven approach
            aligns your {state} digital strategy with local trends, ensuring
            projects stay on track.{" "}
            <Link href="/contact" className={linkClass}>
              Contact us today
            </Link>{" "}
            to start your {state} project.
          </p>
        </div>,
      ],
    },
  ];
}

interface StatePageProps {
  params: Promise<{
    country: string;
    state: string;
  }>;
}

// Generate static params for priority states only
export async function generateStaticParams() {
  const allParams = generateStateParams();
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
  console.log(`Generating ${priorityParams.length} priority state pages...`);
  return priorityParams.slice(0, 5000); // Limit to 5K states
}

// Generate metadata with top keywords
export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);
  const stateData = getStateByCode(
    resolvedParams.country,
    resolvedParams.state
  );

  if (!countryData || !stateData) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    };
  }

  const title = `${stateData.name}, ${countryData.name} Web Design, SEO & Digital Marketing | Moydus`;
  const description = `Transform your ${stateData.name} business with Moydus' expert web design, SEO, and digital marketing services tailored for local success.`;
  const canonicalUrl = `https://moydus.com${buildLocationUrl(
    undefined,
    countryData.name,
    stateData.name
  )}`;

  return {
    title,
    description,
    keywords: [
      `${stateData.name} web design`,
      `${stateData.name} SEO services`,
      `${stateData.name} digital marketing`,
      `${stateData.name} website development`,
      `${stateData.name} local SEO`,
      `${stateData.name} marketing strategy`,
      `${stateData.name} website redesign`,
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
          url: `https://moydus.com/og-image-${resolvedParams.state}.jpg`,
          width: 1200,
          height: 630,
          alt: `Web Design and SEO Services in ${stateData.name}, ${countryData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://moydus.com/og-image-${resolvedParams.state}.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
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

export default async function StatePage({ params }: StatePageProps) {
  const linkClass =
    "underline decoration-dotted underline-offset-4 text-[#ff4d00] hover:text-[#ff4d00] ";

  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);
  const stateData = getStateByCode(
    resolvedParams.country,
    resolvedParams.state
  );

  if (!countryData || !stateData) {
    return notFound();
  }

  const cities = stateData.cities ?? [];
  type City = { name: string; slug: string };
  // Filter out counties and dedupe by city name
  const filteredCities: City[] = Array.from(
    new Map<string, City>(
      (cities as City[])
        .filter((c: City) => !/county/i.test(c.name))
        .map((c: City) => [c.name.toLowerCase(), c])
    ).values()
  );
  const firstCityName = filteredCities[0]?.name || stateData.name;
  const totalCities = filteredCities.length;

  // Generate varied, non-duplicated blurbs for service cards
  const getServiceBlurb = (
    service: {
      key: string;
      title: string;
      priceRange: string;
      timeline: string;
    },
    stateName: string
  ) => {
    const benefit = getBenefitText(service.key);
    const titleLower = service.title.toLowerCase();
    const templates = [
      `${stateName} ${titleLower} by Moydus. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `Moydus delivers ${titleLower} across ${stateName}. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `${service.title} tailored for ${stateName} teams. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `Build ${titleLower} in ${stateName} with Moydus. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `${stateName} organisations choose Moydus for ${titleLower}. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `Launch ${titleLower} programmes in ${stateName}. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `Scale ${titleLower} in ${stateName} with a clear plan. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `${service.title} for ${stateName} businesses—measurable and fast. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `Modern ${titleLower}, purpose-built for ${stateName}. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
      `From discovery to launch, ${titleLower} in ${stateName}. ${benefit}. ${service.priceRange} • ${service.timeline}.`,
    ];
    const seed = `${service.key}|${stateName}`;
    const hash = seed
      .split("")
      .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
    return templates[Math.abs(hash) % templates.length];
  };

  // Pick a category icon key per city name for visual variety
  const iconKeyPool = [
    "local-seo",
    "seo-services",
    "digital-marketing",
    "web-design",
    "branding",
    "ppc-ads",
  ] as const;
  const hashString = (value: string) =>
    value.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  const getIconKeyForCity = (cityName: string) => {
    const hash = hashString(cityName);
    return iconKeyPool[Math.abs(hash) % iconKeyPool.length];
  };
  // Ensure unique icons for the first page of cities (up to 20)
  const firstPageCities: City[] = filteredCities.slice(0, 20);
  const iconKeyByCity = (() => {
    const used = new Set<string>();
    const map = new Map<string, string>();
    for (const city of firstPageCities) {
      const start = Math.abs(hashString(city.name)) % iconKeyPool.length;
      let assigned: string | null = null;
      for (let i = 0; i < iconKeyPool.length; i++) {
        const candidate = iconKeyPool[(start + i) % iconKeyPool.length];
        if (!used.has(candidate)) {
          used.add(candidate);
          assigned = candidate;
          break;
        }
      }
      // If pool exhausted, fall back to hash-based (may repeat beyond pool size)
      map.set(city.name, assigned ?? getIconKeyForCity(city.name));
    }
    return map;
  })();

  // Generate varied descriptions for cities
  const getCityDescription = (cityName: string) => {
    const descriptions = [
      `${cityName} businesses partner with Moydus for tailored ${stateData.name} web design, SEO, and digital marketing programs.`,
      `Professional web design and digital marketing services for ${cityName} companies looking to grow their online presence.`,
      `${cityName} organizations trust Moydus for custom web development, SEO optimization, and digital strategy solutions.`,
      `Local ${cityName} businesses choose Moydus for comprehensive digital marketing and web design services.`,
      `Expert web design and SEO services tailored specifically for ${cityName} market needs and business goals.`,
      `${cityName} companies rely on Moydus for modern web solutions, search optimization, and digital growth strategies.`,
      `Transform your ${cityName} business with Moydus's proven web design, SEO, and digital marketing expertise.`,
      `Leading ${cityName} businesses partner with Moydus for innovative web design and digital marketing solutions.`,
      `Custom web development and SEO services designed for ${cityName} businesses seeking digital growth.`,
      `${cityName} enterprises choose Moydus for strategic web design, SEO, and comprehensive digital marketing programs.`,
    ];

    // Use city name hash to consistently assign same description to same city
    const hash = cityName.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    return descriptions[Math.abs(hash) % descriptions.length];
  };
  const homePath = "/";
  const countryPath = buildLocationUrl(undefined, countryData.name);
  const statePath = buildLocationUrl(
    undefined,
    countryData.name,
    stateData.name
  );
  const blogPath = "/blog";
  const primaryCategory = categories[0];
  const topicCluster =
    primaryCategory && firstCityName
      ? {
          categoryTitle: primaryCategory.title,
          blogCategoryUrl: `/blog/category/${primaryCategory.key}`,
          serviceUrl: `/${primaryCategory.key}`,
          pillarUrl: buildLocationUrl(
            undefined,
            countryData.name,
            stateData.name,
            firstCityName,
            primaryCategory.key
          ),
        }
      : null;
  const stateFaqs = [
    {
      question: `How do you keep ${stateData.name} stakeholders aligned?`,
      answer: `Weekly async standups, shared dashboards, and sprint notes keep teams across ${stateData.name} aligned without adding meetings to their calendars.`,
      schemaAnswer: `Weekly async standups, shared dashboards, and sprint notes keep teams across ${stateData.name} aligned without adding meetings to their calendars.`,
    },
    {
      question: `Can you support regulated or enterprise organisations in ${stateData.name}?`,
      answer: `Yes. We map compliance and security requirements up front, work in dedicated environments, and document every integration so audits stay simple.`,
      schemaAnswer: `Yes. We map compliance and security requirements up front, work in dedicated environments, and document every integration so audits stay simple.`,
    },
    {
      question: `What happens once the new experience goes live?`,
      answer: `Optimisation retainers cover experimentation, content expansion, and analytics reviews so momentum in ${stateData.name} compounds after launch.`,
      schemaAnswer: `Optimisation retainers cover experimentation, content expansion, and analytics reviews so momentum in ${stateData.name} compounds after launch.`,
    },
    {
      question: `What makes ${stateData.name} web design unique?`,
      answer: `Our ${stateData.name} web design services focus on local market trends, user behavior, and SEO optimization to ensure your website resonates with ${stateData.name} audiences.`,
      schemaAnswer: `Our ${stateData.name} web design services focus on local market trends, user behavior, and SEO optimization to ensure your website resonates with ${stateData.name} audiences.`,
    },
  ];

  const faqSchemaEntities = stateFaqs
    .filter((faq) => faq.schemaAnswer.trim().length > 0)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.schemaAnswer,
      },
    }));

  return (
    <main className="min-h-screen bg-white py-24 sm:py-24 lg:py-28 xl:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* JSON-LD: LocalBusiness + Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Moydus",
              areaServed: {
                "@type": "AdministrativeArea",
                name: `${stateData.name}, ${countryData.name}`,
              },
              url: `https://moydus.com${statePath}`,
              sameAs: ["https://moydus.com"],
              address: {
                "@type": "PostalAddress",
                addressLocality: stateData.name,
                addressCountry: countryData.name,
              },
              description: `Moydus delivers expert ${stateData.name} web design, SEO, and digital marketing services for businesses across ${stateData.name}, ${countryData.name}.`,
              serviceType: ["Web Design", "SEO Services", "Digital Marketing"],
              keywords: [
                `${stateData.name} web design`,
                `${stateData.name} SEO`,
                `${stateData.name} digital marketing`,
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
                  item: `https://moydus.com${countryPath}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: stateData.name,
                  item: `https://moydus.com${statePath}`,
                },
              ],
            }),
          }}
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
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href={homePath} className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">•</span>
              <Link href={countryPath} className="hover:text-gray-700">
                {countryData.name}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">•</span>
              <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                {stateData.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            Web Design, SEO & Digital Marketing in {stateData.name},{" "}
            {countryData.name}
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl">
            Transform your {stateData.name} business with Moydus’ expert{" "}
            <strong>{stateData.name} web design</strong>, SEO, and digital
            marketing services. We deliver measurable outcomes for teams in{" "}
            {firstCityName} and across {stateData.name}, with seamless handoffs
            to your in-house crew.
          </p>
        </header>

        {/* Narrative Sections */}
        <section className="space-y-10 mb-12">
          {buildStateNarrativeSections({
            state: stateData.name,
            country: countryData.name,
            stateData,
            primaryCategory,
            linkClass,
          }).map((section, index) => (
            <article key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {section.heading}
              </h2>
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

        {/* Topic Cluster Section */}
        {topicCluster ? (
          <section className="mb-12 rounded-xl border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Build Topic Clusters for {stateData.name} SEO
            </h2>
            <p className="text-base leading-7 text-gray-700 mb-3">
              Anchor your {stateData.name} digital strategy with a{" "}
              <Link href={topicCluster.pillarUrl} className={linkClass}>
                {stateData.name} service page
              </Link>
              . Link supporting posts to drive authority to your core CTA.
            </p>
            <p className="text-base leading-7 text-gray-700">
              Keep your {stateData.name} topic cluster fresh with articles in
              the{" "}
              <Link href={topicCluster.blogCategoryUrl} className={linkClass}>
                blog category
              </Link>
              . Each post links to your{" "}
              <Link href={topicCluster.serviceUrl} className={linkClass}>
                {topicCluster.categoryTitle} offer
              </Link>
              , ensuring Google sees topical depth while guiding{" "}
              {stateData.name} prospects to convert.
            </p>
          </section>
        ) : null}

        {/* Cities Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Cities We Support Across {stateData.name}
          </h2>
          <CardGrid
            cards={filteredCities.slice(0, 20).map((city: City) => ({
              href: buildLocationUrl(
                undefined,
                countryData.name,
                stateData.name,
                city.name
              ),
              icon: getCategoryIcon(
                iconKeyByCity.get(city.name) || getIconKeyForCity(city.name)
              ),
              title: city.name,
              description: (() => {
                const text = getCityDescription(city.name);

                const linkify = (
                  keyword: string,
                  href: string,
                  label?: string
                ) => {
                  const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
                  if (idx === -1) return null;
                  const before = text.slice(0, idx);
                  const match = text.slice(idx, idx + keyword.length);
                  const after = text.slice(idx + keyword.length);
                  return (
                    <>
                      <span>{before}</span>
                      <Link href={href} className="">
                        {label || match}
                      </Link>
                      <span>{after}</span>
                    </>
                  );
                };

                // Priority: web design > SEO > digital marketing
                const web = linkify(
                  "web design",
                  buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    city.name,
                    "web-design"
                  ),
                  "web design"
                );
                if (web) return web;

                const seo = linkify(
                  "SEO",
                  buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    city.name,
                    "seo-services"
                  ),
                  "SEO"
                );
                if (seo) return seo;

                const dm = linkify(
                  "digital marketing",
                  buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    city.name,
                    "digital-marketing"
                  ),
                  "digital marketing"
                );
                if (dm) return dm;

                return text;
              })(),
            }))}
          />
          {totalCities > 20 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm font-medium">
                Discover {totalCities - 20} more cities in {stateData.name}.
              </p>
            </div>
          )}
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Digital Services in {stateData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 9).map((service) => {
              const href = buildLocationUrl(
                undefined,
                countryData.name,
                stateData.name,
                firstCityName,
                service.key
              );
              const CardInner = (
                <div className="bg-white border border-gray-200 rounded-lg p-4 ">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title} in {stateData.name}
                  </h3>
                  <div className="flex items-center justify-end text-sm">
                    <Link
                      href={href}
                      className="text-[#ff4d00] hover:text-[#ff4d00]"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {getServiceBlurb(service, stateData.name)}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[#ff4d00] ">
                      {service.priceRange}
                    </span>
                    <span className="text-gray-500">{service.timeline}</span>
                  </div>
                </div>
              );
              return href ? (
                <Link key={service.key} href={href} className="block">
                  {CardInner}
                </Link>
              ) : (
                <div key={service.key}>{CardInner}</div>
              );
            })}
          </div>
          {totalCities > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <Megaphone className="w-4 h-4 inline-block mr-2 text-[#ff4d00]" />{" "}
                Popular Digital Services in {stateData.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 8).map((c) => (
                  <Link
                    key={c.key}
                    href={buildLocationUrl(
                      undefined,
                      countryData.name,
                      stateData.name,
                      firstCityName,
                      c.key
                    )}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-gray-700">
                Building an online store? Explore our{" "}
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    firstCityName,
                    "ecommerce-development"
                  )}
                  className={linkClass}
                >
                  {stateData.name} e-commerce solutions
                </Link>
                . Need local leads? Review our{" "}
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.name,
                    stateData.name,
                    firstCityName,
                    "local-seo"
                  )}
                  className={linkClass}
                >
                  {stateData.name} local SEO playbook
                </Link>{" "}
                and insights in our{" "}
                <Link href={blogPath} className={linkClass}>
                  {stateData.name} strategy notes
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Questions from {stateData.name} Businesses
          </h2>
          <div className="space-y-6">
            {stateFaqs.map((faq, index) => (
              <Accordion
                key={index}
                title={faq.question}
                defaultOpen={false}
                icon={<Rocket className="w-4 h-4" />}
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
              Get Started with {stateData.name} Digital Strategy Today
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-blue-50">
              Ready to elevate your {stateData.name} business? Let’s craft a
              tailored {stateData.name} web design and SEO plan with a clear
              timeline and investment range. Get started today with our free
              consultation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your {stateData.name} Project
              </Link>
              <Link
                href="/portfolio"
                className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                See {stateData.name} Case Studies
              </Link>
            </div>
            <div className="mt-4 text-xs uppercase tracking-wide text-gray-200">
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
              <Link href={blogPath} className="underline">
                Read {stateData.name} Strategy Guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
