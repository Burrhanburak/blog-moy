// @ts-ignore - generated at build time
import { allBlogPosts } from "contentlayer/generated";
import Link from "next/link";
import { Metadata } from "next";
import { CustomCard } from "@/components/CustomCard";

interface BlogPageProps {}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog | Moydus - Digital Marketing & Web Development Insights";
  const description =
    "Stay updated with the latest trends in digital marketing, web development, SEO, and business growth strategies from Moydus experts.";
  const canonicalUrl = `https://moydus.com/blog`;

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

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = allBlogPosts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* JSON-LD Schema for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Moydus Blog",
            description: "Digital marketing and web development insights",
            url: `https://moydus.com/blog`,
            publisher: {
              "@type": "Organization",
              name: "Moydus",
              logo: {
                "@type": "ImageObject",
                url: "https://moydus.com/logo.png",
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
            })),
          }),
        }}
      />

      <main className="container mx-auto px-4  max-w-6xl py-28">
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
              <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                Blog
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Moydus Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in Digital Marketing, Web
            development, SEO, and business growth strategies from Moydus
            experts.
          </p>
        </header>

        {/* Blog Posts Grid */}
        {sortedPosts.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Blog Posts Yet
            </h2>
            <p className="text-gray-600">
              We're working on creating valuable content for you. Check back
              soon!
            </p>
          </div>
        )}

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Let&apos;s discuss how our digital solutions can help you achieve
            your goals.
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
              View Our Work
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
