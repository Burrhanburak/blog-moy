import { notFound } from "next/navigation";
import type { Metadata } from "next";
import React from "react";
import {
  getCategoryByKey,
  getBenefitText,
  categories as allCategories,
} from "@/config/categories-new";
import {
  buildLocationUrl,
  getCountryByCode,
  getStateByCode,
  getCityByCode,
  generateCategoryParams,
} from "@/lib/url-utils";
import { buildCityCategoryTemplateProps } from "@/lib/city-category-template";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { CtaMiniForm } from "@/shared/CtaMiniForm";
import { generateHumanContent } from "@/lib/human-content";
import { HumanContent } from "@/components/HumanContent";
import { GeoBreadcrumb } from "@/components/geo";
import {
  allCities,
  allPageTemplates,
  City as CityDoc,
  PageTemplate,
} from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { getRandomImage } from "@/lib/getRandomImage";

interface CategoryPageProps {
  params: Promise<{
    country: string;
    state: string;
    city: string;
    category: string;
  }>;
}

// Next.js 16: Enhanced ISR with cache tags
export const revalidate = 60 * 60 * 24 * 30; // 30 days
export const dynamic = "force-static";

// Generate static params for priority categories only (top 50k)
export async function generateStaticParams() {
  const allParams = generateCategoryParams();

  const priorityCountries = [
    "united-states",
    "germany",
    "united-kingdom",
    "france",
    "canada",
    "australia",
  ];

  const priorityCategories = [
    "web-design",
    "local-seo",
    "digital-marketing",
    "ecommerce-development",
    "conversion-optimization",
  ];

  const priorityParams = allParams.filter(
    (param) =>
      priorityCountries.includes(param.country) &&
      priorityCategories.includes(param.category)
  );

  console.log(`Generating ${priorityParams.length} priority category pages...`);

  return priorityParams.slice(0, 50000);
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = "en";

  const docSlug = `${locale}/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}/${resolvedParams.category}`;
  const cityDoc = allCities.find((doc) => doc.slug === docSlug);

  const categoryData = getCategoryByKey(resolvedParams.category);
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

  if (!categoryData || !countryData || !stateData || !cityData) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    };
  }

  const benefit = getBenefitText(categoryData.key);
  const fallbackTitle = `${categoryData.title} in ${cityData.name}, ${stateData.name} — ${benefit} | Moydus`;
  const fallbackDescription = `Compare top-rated ${categoryData.title.toLowerCase()} specialists in ${
    cityData.name
  }, ${
    stateData.name
  }. Pricing, FAQs, and nearby cities updated for ${new Date().getFullYear()}.`;
  const fallbackCanonical = `https://moydus.com/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}/${resolvedParams.category}`;
  const canonicalUrl = cityDoc?.canonicalUrl || fallbackCanonical;
  const hreflangAlternates: Record<string, string> = {
    en: canonicalUrl,
  };

  const ogFallbackImage = `https://moydus.com/og/${resolvedParams.city}-${resolvedParams.category}.png`;
  const ogData = (cityDoc?.openGraph as Record<string, unknown>) || {};
  const twitterData = (cityDoc?.twitterCard as Record<string, unknown>) || {};

  const title = (cityDoc?.metaTitle as string | undefined) || fallbackTitle;
  const description =
    (cityDoc?.metaDescription as string | undefined) || fallbackDescription;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: (ogData.title as string | undefined) || title,
      description: (ogData.description as string | undefined) || description,
      url: canonicalUrl,
      type:
        (ogData.type as
          | "article"
          | "website"
          | "book"
          | "profile"
          | "music.song"
          | "music.album"
          | "music.playlist"
          | "music.radio_station"
          | "video.movie"
          | "video.episode"
          | "video.tv_show"
          | "video.other"
          | undefined) || "article",
      locale: (ogData.locale as string | undefined) || `${locale}_US`,
      images: (() => {
        const imageField = ogData.image;
        if (Array.isArray(imageField)) {
          return imageField as Array<string | { url: string }>;
        }
        if (typeof imageField === "string") {
          return [imageField];
        }
        if (
          imageField &&
          typeof imageField === "object" &&
          "url" in (imageField as Record<string, unknown>)
        ) {
          return [imageField as { url: string }];
        }
        return [ogFallbackImage];
      })(),
    },
    twitter: {
      card:
        (twitterData.card as "summary" | "summary_large_image" | undefined) ||
        "summary_large_image",
      title: (twitterData.title as string | undefined) || title,
      description:
        (twitterData.description as string | undefined) || description,
      images: (() => {
        const imageField = twitterData.image;
        if (Array.isArray(imageField)) {
          return imageField as Array<string>;
        }
        if (typeof imageField === "string") {
          return [imageField];
        }
        return [ogFallbackImage];
      })(),
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

  return metadata;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const locale = "en";

  const categoryData = getCategoryByKey(resolvedParams.category);
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

  if (!categoryData || !countryData || !stateData || !cityData) {
    return notFound();
  }

  const docSlug = `${locale}/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}/${resolvedParams.category}`;
  const cityDoc: CityDoc | undefined = allCities.find(
    (doc) => doc.slug === docSlug
  );
  const templateDoc: PageTemplate | undefined = cityDoc
    ? undefined
    : allPageTemplates.find(
        (template) => template.templateKey === "city-category"
      );

  let renderedContent: React.ReactElement;

  if (cityDoc) {
    const sortedCities = [...stateData.cities].sort(
      (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
    );
    const currentIndex = sortedCities.findIndex(
      (c: { slug: string }) => c.slug === cityData.slug
    );
    const nearbyCities = sortedCities
      .slice(Math.max(0, currentIndex - 3), currentIndex)
      .concat(sortedCities.slice(currentIndex + 1, currentIndex + 4));

    const templateProps = buildCityCategoryTemplateProps({
      country: {
        name: countryData.name,
        slug: countryData.slug,
        code: countryData.code,
      },
      state: {
        name: stateData.name,
        slug: stateData.slug,
        code: stateData.code,
      },
      city: {
        name: cityData.name,
        slug: cityData.slug,
        latitude: cityData.lat,
        longitude: cityData.lng,
      },
      category: categoryData,
      allCategories,
      nearbyCities,
      comparisonTargets: nearbyCities,
      dynamicImage: getRandomImage(categoryData.key),
    });

    renderedContent = (
      <div className="mt-8 space-y-10">
        <TemplateRenderer
          code={cityDoc.body.code}
          templateProps={templateProps as unknown as Record<string, unknown>}
        />
      </div>
    );
  } else if (templateDoc) {
    const sortedCities = [...stateData.cities].sort(
      (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
    );
    const currentIndex = sortedCities.findIndex(
      (c: { slug: string }) => c.slug === cityData.slug
    );
    const nearbyCities = sortedCities
      .slice(Math.max(0, currentIndex - 3), currentIndex)
      .concat(sortedCities.slice(currentIndex + 1, currentIndex + 4));

    const templateProps = buildCityCategoryTemplateProps({
      country: {
        name: countryData.name,
        slug: countryData.slug,
        code: countryData.code,
      },
      state: {
        name: stateData.name,
        slug: stateData.slug,
        code: stateData.code,
      },
      city: {
        name: cityData.name,
        slug: cityData.slug,
        latitude: cityData.lat,
        longitude: cityData.lng,
      },
      category: categoryData,
      allCategories,
      nearbyCities,
      comparisonTargets: nearbyCities,
      dynamicImage: getRandomImage(categoryData.key),
    });

    renderedContent = (
      <div className="mt-8 space-y-10">
        <TemplateRenderer
          code={templateDoc.body.code}
          templateProps={templateProps as unknown as Record<string, unknown>}
        />
      </div>
    );
  } else {
    const human = generateHumanContent(
      locale,
      cityData.name,
      categoryData.title
    );
    renderedContent = (
      <>
        <div>
          <h1 className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200">
            Best {categoryData.title} Services in {cityData.name},{" "}
            {stateData.name}
          </h1>
          <div className="mt-4 w-full overflow-hidden rounded-lg border border-gray-100">
            <Image
              src={getRandomImage(categoryData.key)}
              alt={`${categoryData.title} services in ${cityData.name}`}
              width={1200}
              height={240}
              className="object-contain bg-white p-2 rounded-lg"
              priority={false}
            />
          </div>
          <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
            <p>
              Professional {categoryData.title.toLowerCase()} services with
              custom UI/UX, branding, and conversion optimization. Transform
              your {cityData.name} presence.
            </p>
          </div>
        </div>

        <HumanContent intro={human.intro} qas={human.qas} outro={human.outro} />

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
          <h2
            className="flex whitespace-pre-wrap group font-semibold"
            id="need-a-second-opinion"
          >
            <div className="absolute" tabIndex={-1}>
              <Link
                href="#need-a-second-opinion"
                className="-ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100 focus:opacity-100 focus:outline-0 group/link"
                aria-label="Navigate to header"
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray"
                    height="12px"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 256C0 167.6 71.6 96 160 96h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C98.1 144 48 194.1 48 256s50.1 112 112 112h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c61.9 0 112-50.1 112-112s-50.1-112-112-112H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c88.4 0 160 71.6 160 160zM184 232H392c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <span className="cursor-pointer">Need a second opinion?</span>
          </h2>
          <div className="mt-2 text-gray-600">
            Share your brief and we&apos;ll benchmark the best{" "}
            {categoryData.title.toLowerCase()} fit for {cityData.name}.
          </div>
          <div className="mt-6 max-w-3xl">
            <CtaMiniForm city={cityData.name} category={categoryData.title} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
            <Link
              href={buildLocationUrl(
                undefined,
                countryData.name,
                stateData.name,
                cityData.name
              )}
              className="underline decoration-dotted underline-offset-4 hover:text-blue-700"
            >
              Explore more services in {cityData.name}
            </Link>
            <span>•</span>
            <Link
              href="/blog"
              className="underline decoration-dotted underline-offset-4 hover:text-blue-700"
            >
              Read the latest guides
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto max-w-6xl px-5 pt-13 pb-5 sm:pb-24 lg:pb-28 xl:pb-10">
        <GeoBreadcrumb
          countryName={countryData.name}
          stateName={stateData.name}
          cityName={cityData.name}
          categoryTitle={categoryData.title}
        />
        {renderedContent}
      </div>
    </main>
  );
}
