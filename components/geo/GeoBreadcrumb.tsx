import Link from "next/link";
import { buildLocationUrl } from "@/lib/url-utils";

interface GeoBreadcrumbProps {
  countryName: string;
  stateName: string;
  cityName: string;
  categoryTitle: string;
}

export function GeoBreadcrumb({
  countryName,
  stateName,
  cityName,
  categoryTitle,
}: GeoBreadcrumbProps) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        <li>
          <Link
            href={buildLocationUrl(undefined)}
            className="hover:text-gray-700"
          >
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1">•</span>
          <Link
            href={buildLocationUrl(undefined, countryName)}
            className="hover:text-gray-700"
          >
            {countryName}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1">•</span>
          <Link
            href={buildLocationUrl(undefined, countryName, stateName)}
            className="hover:text-gray-700"
          >
            {stateName}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1">•</span>
          <Link
            href={buildLocationUrl(undefined, countryName, stateName, cityName)}
            className="hover:text-gray-700"
          >
            {cityName}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-1">•</span>
          <span className="text-gray-900 font-medium underline decoration-dotted underline-offset-4">
            {categoryTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
