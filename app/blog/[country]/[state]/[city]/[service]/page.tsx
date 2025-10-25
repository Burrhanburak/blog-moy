// @ts-ignore - generated at build time
import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CustomCard } from "@/components/CustomCard";

interface LocationBlogPageProps {
  params: Promise<{
    country: string;
    state: string;
    city: string;
    service: string;
  }>;
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: LocationBlogPageProps): Promise<Metadata> {
  const { country, state, city, service } = await params;

  const cityName = formatTitle(city);
  const serviceName = formatTitle(service);
  const countryName = formatTitle(country);

  const title = `${serviceName} Blog Posts for ${cityName} | Expert Insights & Tips`;
  const description = `Discover expert ${serviceName.toLowerCase()} insights for businesses in ${cityName}, ${countryName}. Latest trends, tips, and strategies from industry professionals.`;
  const canonicalUrl = `https://moydus.com/blog/${country}/${state}/${city}/${service}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LocationBlogPage({
  params,
}: LocationBlogPageProps) {
  const { country, state, city, service } = await params;

  // Filter blog posts for this specific location and service
  const locationPosts = allBlogPosts.filter((post: any) => {
    return (
      post.country === country &&
      post.state === state &&
      post.city === city &&
      post.service === service
    );
  });

  if (locationPosts.length === 0) {
    notFound();
  }

  // Sort posts by date (newest first)
  const sortedPosts = locationPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const cityName = formatTitle(city);
  const serviceName = formatTitle(service);
  const stateName = formatTitle(state);
  const countryName = formatTitle(country);

  return (
    <>
      {/* JSON-LD Schema for Location Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${serviceName} Blog - ${cityName}`,
            description: `Expert ${serviceName.toLowerCase()} insights for ${cityName} businesses`,
            url: `https://moydus.com/blog/${country}/${state}/${city}/${service}`,
            publisher: {
              "@type": "Organization",
              name: "Moydus",
              logo: {
                "@type": "ImageObject",
                url: "https://moydus.com/logo.png",
              },
            },
            mainEntity: {
              "@type": "Place",
              name: cityName,
              address: {
                "@type": "PostalAddress",
                addressLocality: cityName,
                addressRegion: stateName,
                addressCountry: countryName,
              },
            },
            blogPost: sortedPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              url: `https://moydus.com/blog/${post._raw.flattenedPath.replace(
                "blog/",
                ""
              )}`,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: post.author || "Moydus Team",
              },
              about: {
                "@type": "Service",
                name: serviceName,
                areaServed: {
                  "@type": "Place",
                  name: cityName,
                },
              },
            })),
          }),
        }}
      />

      <main className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <Link
                href="/blog"
                className="hover:text-gray-700 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <Link
                href={`/blog/${country}`}
                className="hover:text-gray-700 transition-colors"
              >
                {countryName}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <Link
                href={`/blog/${country}/${state}`}
                className="hover:text-gray-700 transition-colors"
              >
                {stateName}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <Link
                href={`/blog/${country}/${state}/${city}`}
                className="hover:text-gray-700 transition-colors"
              >
                {cityName}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                {serviceName}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {serviceName} Insights for {cityName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert {serviceName.toLowerCase()} insights, tips, and strategies
            specifically for businesses in {cityName}, {stateName}. Stay ahead
            with our comprehensive guides and best practices.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sortedPosts.map((post: any) => {
            const slug = post._raw.flattenedPath.replace("blog/", "");
            return (
              <CustomCard
                key={post._id}
                title={post.title}
                description={post.description}
                href={`/blog/${slug}`}
                date={post.date}
                author={post.author || "Moydus Team"}
                tags={post.tags}
                image={post.image}
              />
            );
          })}
        </div>

        {/* Related Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Other Services in {cityName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "web-design",
              "seo-services",
              "digital-marketing",
              "ecommerce-development",
            ].map((serviceSlug) => {
              if (serviceSlug === service) return null;
              return (
                <Link
                  key={serviceSlug}
                  href={`/blog/${country}/${state}/${city}/${serviceSlug}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#ff4d00] hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">
                    {formatTitle(serviceSlug)}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Expert insights & tips
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Location CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Need {serviceName} in {cityName}?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Our expert team provides professional {serviceName.toLowerCase()}{" "}
            services to businesses throughout {cityName} and the greater{" "}
            {stateName} area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-black hover:bg-[#ff4d00] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href={`/${country}/${state}/${city}/${service}`}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#ff4d00] transition-colors font-semibold"
            >
              View {serviceName} Services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
