import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonGenerator } from "@/components/hub-pages/ComparisonGenerator";
import {
  buildComparisonFromSlug,
  generateComparisonStaticParams,
} from "@/lib/comparison-data";

interface ComparePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = generateComparisonStaticParams();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const comparison = buildComparisonFromSlug(resolvedParams.slug);
    const description =
      comparison.comparison_type === "city_vs_city"
        ? `Compare ${comparison.entities[0].name} vs ${comparison.entities[1].name} for ${comparison.category}. Pricing, market data, and pros & cons.`
        : `See how ${comparison.entities[0].name} stacks up against ${comparison.entities[1].name}. Use the decision matrix to choose the right service.`;

    const canonical = `https://moydus.com/compare/${resolvedParams.slug}`;

    return {
      title: `${comparison.title} | Moydus Compare ${comparison.entities[0].name} with other cities & services before you invest`,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title: comparison.title,
        description,
        url: canonical,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: comparison.title,
        description,
      },
    };
  } catch (error) {
    return {
      title: "Comparison Not Found",
      description: "The requested comparison could not be generated.",
    };
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const resolvedParams = await params;

  let comparison;
  try {
    comparison = buildComparisonFromSlug(resolvedParams.slug);
  } catch (error) {
    return notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://moydus.com/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: `https://moydus.com/compare ${comparison.entities[0].name} with other cities & services before you invest`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comparison.title,
        item: `https://moydus.com/compare/${resolvedParams.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description:
      comparison.comparison_type === "city_vs_city"
        ? `Market comparison for ${comparison.entities[0].name} and ${comparison.entities[1].name}.`
        : `Service comparison for ${comparison.entities[0].name} and ${comparison.entities[1].name}.`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Moydus",
    },
    publisher: {
      "@type": "Organization",
      name: "Moydus",
      logo: {
        "@type": "ImageObject",
        url: "https://moydus.com/logo.png",
      },
    },
    mainEntityOfPage: `https://moydus.com/compare/${resolvedParams.slug}`,
  };

  return (
    <main className="min-h-screen bg-white py-14">
      <div className="container mx-auto max-w-6xl px-4 py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema, null, 2),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema, null, 2),
          }}
        />

        <nav className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={`/`} className="hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>•</li>
            <li>
              <Link href={`/compare`} className="hover:text-gray-800">
                Compare
              </Link>
            </li>
            <li>•</li>
            <li className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
              {comparison.title}
            </li>
          </ol>
        </nav>

        <ComparisonGenerator comparison={comparison} />
      </div>
    </main>
  );
}
