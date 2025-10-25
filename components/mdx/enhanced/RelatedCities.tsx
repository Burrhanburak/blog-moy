import { Building2, MapPin } from "lucide-react";
import Link from "next/link";
export interface RelatedCityItem {
  name: string;
  slug: string;
  distance?: string;
  highlight?: string;
  href?: string;
}

interface RelatedCitiesProps {
  title?: string;
  currentCity?: string;
  currentState?: string;
  currentCountry?: string;
  locale?: string;
  category?: string;
  items: RelatedCityItem[];
}

function buildUrl(
  citySlug: string,
  currentCountry?: string,
  currentState?: string,
  category?: string
): string {
  if (!currentCountry || !currentState || !category) {
    return "#";
  }
  const countrySlug = currentCountry.toLowerCase().replace(/\s+/g, "-");
  const stateSlug = currentState.toLowerCase().replace(/\s+/g, "-");
  return `/${countrySlug}/${stateSlug}/${citySlug}/${category}`;
}

function formatCategoryLabel(category?: string): string {
  if (!category) return "Digital";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function RelatedCities({
  title,
  currentCity,
  currentState,
  currentCountry,
  locale,
  category,
  items,
}: RelatedCitiesProps) {
  const displayTitle =
    title ??
    `${formatCategoryLabel(category)} Services` +
      (currentCity ? ` Near ${currentCity}` : " Nearby");

  return (
    <div className="my-8 bg-white rounded-lg ">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="mr-2">
          <MapPin className="w-6 h-6 text-[#ff4d00]" />
        </span>
        {displayTitle}
      </h3>

      <div className="flex flex-wrap  gap-2">
        {items.map((city, index) => {
          const href =
            city.href ??
            buildUrl(city.slug, currentCountry, currentState, category);

          return (
            <Link
              key={index}
              href={href}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {city.name}

              {city.highlight && city.highlight}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 flex items-center">
          <span className="mr-2">
            <Building2 className="w-6 h-6 text-[#ff4d00]" />
          </span>
          Can&apos;t find your city? We serve the entire{" "}
          {currentState ?? "region"} area.
          <Link
            href="/contact"
            className="ml-2 text-[#ff4d00] hover:text-[#ff4d00] underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
