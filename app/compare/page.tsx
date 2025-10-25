import Link from "next/link";
import type { Metadata } from "next";
import { generateComparisonStaticParams } from "@/lib/comparison-data";
import type { Locale } from "@/lib/i18n/messages";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { GitCompareArrows } from "lucide-react";

interface CompareIndexProps {
  params: Promise<{}>;
}

const countryName = "Canada";
// Next.js 16: Enhanced revalidation
export const revalidate = 60 * 60 * 24; // 1 day
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Compare Markets & Services in ${countryName} | Moydus`,
    description:
      "Benchmark cities, services, and providers side-by-side to choose the best digital partner for your roadmap.",
  };
}

export default async function CompareIndexPage() {
  const comparisons = generateComparisonStaticParams();

  return (
    <main className="min-h-screen bg-white py-16 sm:py-24 lg:py-32 xl:py-36 container mx-auto max-w-6xl ">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6 px-2" aria-label="Breadcrumb">
          <BreadcrumbList className="flex items-center space-x-2 text-sm text-gray-500">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${locale}`}
                  className="hover:text-gray-700 transition-colors"
                >
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="mx-1">•</span>
              <BreadcrumbPage className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
                Compare
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-10 space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Compare {countryName} with other cities & services before you invest
          </h1>
          <p className="text-lg text-gray-600">
            Use these deep dives to benchmark cost, expertise, and market
            readiness before you sign a statement of work.
          </p>
        </header>

        <section className="space-y-6">
          {comparisons.map((slug) => {
            const [left, right] = slug.split("-vs-");
            const title = `${left.replace(/-/g, " ")} vs ${right.replace(
              /-/g,
              " "
            )}`;
            return (
              <Link
                key={slug}
                href={`compare/${slug}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 "
              >
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  See pricing benchmarks, pros & cons, and decision matrix.
                </p>

                <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#ff4d00]">
                  View comparison →
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
