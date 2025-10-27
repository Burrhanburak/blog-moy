import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { categories } from "@/config/categories-new";
import { getVariationSeed, pickVariant } from "@/lib/variation";
import {
  getCountryByCode,
  buildLocationUrl,
  generateCountryParams,
} from "@/lib/url-utils";
import CardGrid from "@/components/CardGrid";
import { getStateIcon } from "@/lib/category-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Accordion from "@/components/mintlify/Accordion";
import { Rocket } from "lucide-react";

// Helper function to generate unique state descriptions
function generateStateDescription(state: string, country: string) {
  const descriptions = [
    `${state} businesses trust Moydus for custom ${country} web design and SEO strategies that drive local engagement and conversions.`,
    `In ${state}, Moydus delivers tailored ${country} digital marketing and website development to boost your brand’s visibility.`,
    `Moydus partners with ${state} organizations to create high-performance ${country} web design and SEO solutions for local markets.`,
    `${state} companies rely on Moydus for agile ${country} website development and digital strategies that align with market trends.`,
    `Transform your ${state} business with Moydus’ expert ${country} SEO services and custom web design for maximum impact.`,
    `Moydus helps ${state} businesses grow with data-driven ${country} digital marketing and website optimization programs.`,
  ];
  const hash = state
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return descriptions[hash % descriptions.length];
}

function buildCountryNarrativeSections({
  country,
  linkClass,
}: {
  country: string;
  linkClass: string;
}) {
  const isCanada = country.toLowerCase() === "canada";
  const localContext = isCanada
    ? `${country}’s thriving tech hubs and tourism markets`
    : `${country}’s dynamic business landscape`;

  return [
    {
      heading: `Web Design & Digital Solutions in ${country}`,
      body: [
        <div key="country-web-design">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Custom Web Design in {country}
          </h3>
          <p className="mb-4">
            Our <strong>web design in {country}</strong> delivers custom,
            mobile-optimized websites tailored for {localContext}. Partner with
            Moydus for high-converting solutions that resonate with {country}{" "}
            audiences.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Custom designs for {country} businesses.</li>
            <li>Mobile-first approach for {country}’s digital users.</li>
            <li>SEO integration for top rankings in {country}.</li>
          </ul>
          <p>
            Explore our{" "}
            <Link
              href={buildLocationUrl(
                undefined,
                country,
                undefined,
                undefined,
                "web-design"
              )}
              className={linkClass}
            >
              web design services in {country}
            </Link>
            .
          </p>
        </div>,
      ],
    },
    {
      heading: `SEO Services in ${country}`,
      body: [
        <div key="country-seo">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drive Traffic with {country} SEO
          </h3>
          <p className="mb-4">
            Our <strong>SEO services in {country}</strong> drive targeted
            traffic with strategies tailored to {country}’s market. As a leading
            SEO provider, we ensure top Google rankings for businesses across{" "}
            {country}.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              Local citations for <strong>local SEO in {country}</strong>.
            </li>
            <li>Content optimized for {country}’s audience.</li>
            <li>Analytics-driven performance tracking.</li>
          </ul>
          <p>
            Discover our{" "}
            <Link
              href={buildLocationUrl(
                undefined,
                country,
                undefined,
                undefined,
                "local-seo"
              )}
              className={linkClass}
            >
              SEO services in {country}
            </Link>
            .
          </p>
        </div>,
      ],
    },
    {
      heading: `E-commerce Web Development in ${country}`,
      body: [
        <div key="country-ecommerce">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Build Online Stores for {country}
          </h3>
          <p className="mb-4">
            Our <strong>e-commerce web development in {country}</strong> creates
            user-friendly online stores optimized for {country} shoppers,
            driving sales and engagement.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Mobile-optimized checkout for {country} customers.</li>
            <li>Local payment gateway integration.</li>
            <li>Personalized shopping experiences for {country} markets.</li>
          </ul>
          <p>
            Start selling with our{" "}
            <Link
              href={buildLocationUrl(
                undefined,
                country,
                undefined,
                undefined,
                "ecommerce-development"
              )}
              className={linkClass}
            >
              e-commerce solutions in {country}
            </Link>
            .
          </p>
        </div>,
      ],
    },
    {
      heading: `Digital Marketing in ${country}`,
      body: [
        <div key="country-digital-marketing">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Engage {country} Audiences
          </h3>
          <p className="mb-4">
            Our <strong>digital marketing in {country}</strong> engages
            audiences with targeted campaigns, driving traffic and conversions
            for businesses across {country}.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Social media strategies tailored for {country}.</li>
            <li>Local event-based marketing campaigns.</li>
            <li>Data-driven ROI tracking for {country} businesses.</li>
          </ul>
          <p>
            Grow with our{" "}
            <Link href="/digital-marketing" className={linkClass}>
              digital marketing services in {country}
            </Link>
            .
          </p>
        </div>,
      ],
    },
    {
      heading: `Why Choose Moydus for ${country} Digital Success`,
      body: [
        <div key="country-why">
          <p>
            From <strong>web design in {country}</strong> to{" "}
            <strong>SEO services in {country}</strong>, Moydus delivers tailored
            solutions that align with {country}’s market trends. Our data-driven
            approach ensures measurable results with seamless project execution.{" "}
            <Link href="/contact" className={linkClass}>
              Contact us today
            </Link>{" "}
            to start your {country} digital transformation.
          </p>
        </div>,
      ],
    },
  ];
}

interface CountryPageProps {
  params: Promise<{
    locale: string;
    country: string;
  }>;
}

// Generate static params for all countries
export async function generateStaticParams() {
  return generateCountryParams();
}

// Generate metadata
export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);

  if (!countryData) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }

  const title = `${countryData.name} Web Design, SEO & Digital Marketing | Moydus`;
  const description = `Transform your ${countryData.name} business with Moydus’ expert web design, SEO, and digital marketing services tailored for local success.`;
  const canonicalUrl = `https://moydus.com${buildLocationUrl(
    undefined,
    countryData.name
  )}`;

  return {
    title,
    description,
    keywords: [
      `web design ${countryData.name}`,
      `SEO services ${countryData.name}`,
      `digital marketing ${countryData.name}`,
      `custom web development ${countryData.name}`,
      `local SEO ${countryData.name}`,
      `e-commerce web development ${countryData.name}`,
      `website redesign ${countryData.name}`,
      `best SEO agency ${countryData.name}`,
      `marketing strategy ${countryData.name}`,
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
          url: `https://moydus.com/og-image-${resolvedParams.country}.jpg`,
          width: 1200,
          height: 630,
          alt: `Web Design & SEO Services in ${countryData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://moydus.com/og-image-${resolvedParams.country}.jpg`],
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

export default async function CountryPage({ params }: CountryPageProps) {
  const linkClass =
    "underline decoration-dotted underline-offset-4 text-[#ff4d00] hover:text-blue-700";

  const resolvedParams = await params;
  const countryData = getCountryByCode(resolvedParams.country);
  if (!countryData) return notFound();

  const homePath = "/";
  const countryPath = buildLocationUrl(undefined, countryData.name);
  const blogPath = "/blog";
  const contactPath = "/contact";
  const portfolioPath = "/portfolio";

  // Variation paragraph
  const vSeed = getVariationSeed(countryData.name, "digital-services");
  const vText = pickVariant(
    [
      (c: string) =>
        `Launch your ${c} business with expert <strong>web design in ${c}</strong> and <strong>SEO services in ${c}</strong> tailored for local markets.`,
      (c: string) =>
        `Grow faster with <strong>digital marketing in ${c}</strong> and high-impact websites built for ${c} audiences.`,
      (c: string) =>
        `Boost sales with <strong>e-commerce web development in ${c}</strong> and targeted <strong>local SEO in ${c}</strong>.`,
      (c: string) =>
        `High-converting <strong>web design in ${c}</strong> and data-driven strategies for ${c} businesses.`,
      (c: string) =>
        `Achieve measurable results with <strong>SEO services in ${c}</strong> and customized digital campaigns.`,
    ],
    vSeed
  )(countryData.name);

  const narrativeSections = buildCountryNarrativeSections({
    country: countryData.name,
    linkClass,
  });

  const faqs = [
    {
      question: `What makes ${countryData.name} web design unique with Moydus?`,
      answer: (
        <>
          Our <strong>web design in {countryData.name}</strong> offers custom,
          mobile-optimized websites tailored for {countryData.name} businesses,
          ensuring high engagement and conversions.{" "}
          <Link
            href={buildLocationUrl(
              undefined,
              countryData.name,
              undefined,
              undefined,
              "web-design"
            )}
            className={linkClass}
          >
            Explore web design in {countryData.name}
          </Link>
          .
        </>
      ),
      schemaAnswer: `Our web design in ${countryData.name} offers custom, mobile-optimized websites tailored for ${countryData.name} businesses, ensuring high engagement and conversions.`,
    },
    {
      question: `How can SEO services in ${countryData.name} help my business?`,
      answer: (
        <>
          Our <strong>SEO services in {countryData.name}</strong> boost Google
          rankings with local citations and content optimized for{" "}
          {countryData.name}’s market.{" "}
          <Link
            href={buildLocationUrl(
              undefined,
              countryData.name,
              undefined,
              undefined,
              "local-seo"
            )}
            className={linkClass}
          >
            Discover SEO services in {countryData.name}
          </Link>
          .
        </>
      ),
      schemaAnswer: `Our SEO services in ${countryData.name} boost Google rankings with local citations and content optimized for ${countryData.name}’s market.`,
    },
    {
      question: `What is e-commerce web development in ${countryData.name}?`,
      answer: (
        <>
          Our <strong>e-commerce web development in {countryData.name}</strong>{" "}
          creates user-friendly online stores optimized for {countryData.name}{" "}
          shoppers, with local payment integrations.{" "}
          <Link
            href={buildLocationUrl(
              undefined,
              countryData.name,
              undefined,
              undefined,
              "ecommerce-development"
            )}
            className={linkClass}
          >
            Start with e-commerce solutions in {countryData.name}
          </Link>
          .
        </>
      ),
      schemaAnswer: `Our e-commerce web development in ${countryData.name} creates user-friendly online stores optimized for ${countryData.name} shoppers, with local payment integrations.`,
    },
    {
      question: `How does digital marketing in ${countryData.name} work?`,
      answer: (
        <>
          Our <strong>digital marketing in {countryData.name}</strong> includes
          social media, local campaigns, and analytics tailored for{" "}
          {countryData.name} audiences.{" "}
          <Link href="/digital-marketing" className={linkClass}>
            Grow with digital marketing in {countryData.name}
          </Link>
          .
        </>
      ),
      schemaAnswer: `Our digital marketing in ${countryData.name} includes social media, local campaigns, and analytics tailored for ${countryData.name} audiences.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Moydus",
    areaServed: {
      "@type": "Country",
      name: countryData.name,
    },
    url: `https://moydus.com${buildLocationUrl(undefined, countryData.name)}`,
    sameAs: ["https://moydus.com"],
    address: {
      "@type": "PostalAddress",
      addressCountry: countryData.name,
    },
    description: `Moydus delivers expert web design, SEO, and digital marketing services for businesses across ${countryData.name}.`,
    serviceType: [
      "Web Design",
      "SEO Services",
      "Digital Marketing",
      "E-commerce Development",
    ],
    keywords: [
      `web design ${countryData.name}`,
      `SEO services ${countryData.name}`,
      `digital marketing ${countryData.name}`,
      `e-commerce web development ${countryData.name}`,
    ],
    faqs: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.schemaAnswer,
      },
    })),
    testimonials: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jennifer Thompson" },
        reviewRating: { "@type": "Rating", ratingValue: 5 },
        reviewBody: `Moydus provided the best web design in ${countryData.name}, delivering stunning results for our business.`,
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "David Chen" },
        reviewRating: { "@type": "Rating", ratingValue: 5 },
        reviewBody: `Their SEO services in ${countryData.name} skyrocketed our rankings, driving more traffic than ever.`,
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 max-w-6xl pt-28 sm:pt-24 lg:pt-32 pb-8">
      {/* JSON-LD: LocalBusiness + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
                item: `https://moydus.com${buildLocationUrl(
                  undefined,
                  countryData.name
                )}`,
              },
            ],
          }),
        }}
      />

      <section className="mb-12 max-w-6xl mx-auto container">
        {/* Breadcrumb */}
        <Breadcrumb
          className="max-w-3xl mx-auto text-left justify-start"
          aria-label="Breadcrumb"
        >
          <BreadcrumbList className="flex items-center space-x-2 text-sm text-gray-500 justify-start">
            <BreadcrumbItem>
              <Link
                href={buildLocationUrl(undefined)}
                className="hover:text-gray-700 transition-colors"
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="mx-1">•</span>
              <span className="text-gray-900  underline decoration-dotted underline-offset-4 font-medium">
                {countryData.name}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <header id="header" className="relative mt-5">
          <div className="mt-0.5 space-y-2.5">
            <div className="eyebrow h-5 text-[#ff4d00] dark:text-[#ff4d00] text-sm font-semibold ">
              Web Design - SEO - Digital Marketing - Ecommerce - Saas Panel
              management - App development - CRM - ERP - Social Media Marketing
              - Content Marketing - Email Marketing - Ads Management - and more
              in {countryData.name}
            </div>
          </div>
          <div className="mt-18 text-lg text-gray-500 dark:prose-invert">
            <p dangerouslySetInnerHTML={{ __html: vText }} />
          </div>
        </header>

        {/* Narrative Sections */}
        <section className="space-y-10 mb-12 mt-5">
          {narrativeSections.map((section, index) => (
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

        {/* States Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Digital Services Across {countryData.name}
          </h2>
          <CardGrid
            cards={countryData.states.map(
              (state: {
                slug: string;
                name: string;
                cities: { slug: string; name: string }[];
              }) => ({
                href: buildLocationUrl(undefined, countryData.name, state.name),
                icon: getStateIcon(),
                title: state.name,
                description: generateStateDescription(
                  state.name,
                  countryData.name
                ),
              })
            )}
          />
        </section>

        {/* Services Overview */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Digital Services in {countryData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <div key={category.key} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title} in {countryData.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {category.description} Tailored for {countryData.name}{" "}
                  businesses.
                </p>
                <div className="text-xs text-gray-500">
                  Starting from {category.priceRange.split("–")[0]}
                </div>
              </div>
            ))}
          </div>
          {countryData.states?.length > 0 &&
            countryData.states[0].cities?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Popular Digital Services in {countryData.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.slice(0, 10).map((c) => (
                    <Link
                      key={c.key}
                      href={buildLocationUrl(
                        undefined,
                        countryData.name,
                        countryData.states[0].name,
                        countryData.states[0].cities[0].name,
                        c.key
                      )}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-center text-gray-700">
                  Planning an e-commerce launch? Explore our{" "}
                  <Link
                    href={buildLocationUrl(
                      undefined,
                      countryData.name,
                      countryData.states[0].name,
                      countryData.states[0].cities[0].name,
                      "ecommerce-development"
                    )}
                    className={linkClass}
                  >
                    e-commerce web development in {countryData.name}
                  </Link>
                  . Want more traffic? See our{" "}
                  <Link
                    href={buildLocationUrl(
                      undefined,
                      countryData.name,
                      countryData.states[0].name,
                      countryData.states[0].cities[0].name,
                      "local-seo"
                    )}
                    className={linkClass}
                  >
                    SEO services in {countryData.name}
                  </Link>{" "}
                  and compare options in our{" "}
                  <Link href={blogPath} className={linkClass}>
                    {countryData.name} strategy guides
                  </Link>
                  .
                </p>
              </div>
            )}
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ❓ FAQs about Web Design, SEO, Digital Marketing, Ecommerce, Saas,
            Panel management, App development, CRM, ERP, and more in{" "}
            {countryData.name}
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
              Get Started with {countryData.name}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-blue-50">
              Ready to elevate your {countryData.name} business? Let&apos;s
              craft a tailored {countryData.name} Saas, Ecommerce, Web Design
              and SEO,Panel management, App development, CRM, ERP, with a clear
              timeline and investment range. Get started today with our free
              consultation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your {countryData.name} Project
              </Link>
              <Link
                href="/portfolio"
                className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                See {countryData.name} Case Studies
              </Link>
            </div>
            <div className="mt-4 text-xs uppercase tracking-wide text-gray-200">
              <Link
                href={buildLocationUrl(
                  undefined,
                  countryData.name,
                  undefined,
                  undefined,
                  "web-design"
                )}
                className="underline hover:text-white"
              >
                {countryData.name} Web Design, SEO, Digital Marketing,
                Ecommerce, Saas, Panel management, App development, CRM, ERP,
                and more
              </Link>
              <span className="mx-2">•</span>
              <Link
                href={buildLocationUrl(
                  undefined,
                  countryData.name,
                  undefined,
                  undefined,
                  "seo-services"
                )}
                className="underline hover:text-white"
              >
                {countryData.name} SEO Services
              </Link>
              <span className="mx-2">•</span>
              <Link
                href={buildLocationUrl(
                  undefined,
                  countryData.name,
                  undefined,
                  undefined,
                  "digital-marketing"
                )}
                className="underline hover:text-white"
              >
                {countryData.name}Marketing,Social Media Marketing,Content
                Marketing,Email Marketing,PPC Ads, and more
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
