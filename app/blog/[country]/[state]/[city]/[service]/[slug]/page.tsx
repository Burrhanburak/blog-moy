// @ts-ignore - generated at build time
import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
// No need for MDX import, we'll use dangerouslySetInnerHTML for now

interface BlogPostPageProps {
  params: Promise<{
    country: string;
    state: string;
    city: string;
    service: string;
    slug: string;
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
}: BlogPostPageProps): Promise<Metadata> {
  const { country, state, city, service, slug } = await params;

  const post = allBlogPosts.find((post: any) => {
    const postSlug = post._raw.flattenedPath
      .split("/")
      .pop()
      ?.replace(".mdx", "");
    return (
      post.country === country &&
      post.state === state &&
      post.city === city &&
      post.service === service &&
      postSlug === slug
    );
  });

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const canonicalUrl = `https://moydus.com/blog/${country}/${state}/${city}/${service}/${slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Moydus Team"],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { country, state, city, service, slug } = await params;

  const post = allBlogPosts.find((post: any) => {
    const postSlug = post._raw.flattenedPath
      .split("/")
      .pop()
      ?.replace(".mdx", "");
    return (
      post.country === country &&
      post.state === state &&
      post.city === city &&
      post.service === service &&
      postSlug === slug
    );
  });

  if (!post) {
    notFound();
  }

  const cityName = formatTitle(city);
  const serviceName = formatTitle(service);
  const stateName = formatTitle(state);
  const countryName = formatTitle(country);

  return (
    <>
      {/* JSON-LD Schema for Blog Post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            url: `https://moydus.com/blog/${country}/${state}/${city}/${service}/${slug}`,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author || "Moydus Team",
            },
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
            about: {
              "@type": "Service",
              name: serviceName,
              areaServed: {
                "@type": "Place",
                name: cityName,
              },
            },
            image: post.image ? `https://moydus.com${post.image}` : undefined,
          }),
        }}
      />

      <main className="container mx-auto px-4 py-25 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 " aria-label="Breadcrumb">
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
              <Link
                href={`/blog/${country}/${state}/${city}/${service}`}
                className="hover:text-gray-700 transition-colors"
              >
                {serviceName}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">•</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="mb-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{post.author || "Moydus Team"}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  post.body.html || post.content || "Content not available",
              }}
            />
          </div>
        </article>

        {/* Related Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More {serviceName} insights for {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allBlogPosts
              .filter(
                (relatedPost: any) =>
                  relatedPost.country === country &&
                  relatedPost.state === state &&
                  relatedPost.city === city &&
                  relatedPost.service === service &&
                  relatedPost._id !== post._id
              )
              .slice(0, 4)
              .map((relatedPost: any) => (
                <Link
                  key={relatedPost._id}
                  href={relatedPost.url}
                  className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started with {serviceName} in {cityName}?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Our expert team is ready to help your {cityName} business succeed
            with professional {serviceName.toLowerCase()} solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-black hover:bg-[#ff4d00] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Get Free Consultation
            </Link>
            <Link
              href={`/${country}/${state}/${city}/${service}`}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-center"
            >
              View {serviceName} Services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
