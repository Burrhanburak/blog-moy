// @ts-ignore - generated at build time
import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CustomCard } from "@/components/CustomCard";

interface CountryBlogPageProps {
  params: Promise<{
    country: string;
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
}: CountryBlogPageProps): Promise<Metadata> {
  const { country } = await params;

  const countryName = formatTitle(country);

  const title = `Blog Posts from ${countryName} | Digital Marketing Insights`;
  const description = `Expert digital marketing, web development, and SEO insights for businesses in ${countryName}. Latest trends, tips, and strategies.`;
  const canonicalUrl = `https://moydus.com/blog/${country}`;

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

export default async function CountryBlogPage({
  params,
}: CountryBlogPageProps) {
  const { country } = await params;

  // Filter blog posts for this country
  const countryPosts = allBlogPosts.filter((post: any) => {
    return post.country === country;
  });

  if (countryPosts.length === 0) {
    notFound();
  }

  // Sort posts by date (newest first)
  const sortedPosts = countryPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const countryName = formatTitle(country);

  // Group posts by state
  const postsByState = countryPosts.reduce((acc: any, post: any) => {
    if (!acc[post.state]) {
      acc[post.state] = [];
    }
    acc[post.state].push(post);
    return acc;
  }, {});

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
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
              <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                {countryName}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Marketing Insights from {countryName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and strategies for businesses across{" "}
            {countryName}. Discover location-specific content tailored to your
            market.
          </p>
        </header>

        {/* States Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by State/Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(postsByState).map((state) => {
              const stateName = formatTitle(state);
              const statePostCount = postsByState[state].length;

              return (
                <Link
                  key={state}
                  href={`/blog/${country}/${state}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{stateName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {statePostCount} posts
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Posts from {countryName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.slice(0, 6).map((post: any) => {
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
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Need Digital Services in {countryName}?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Our expert team provides professional digital marketing and web
            development services to businesses throughout {countryName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              View Services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
