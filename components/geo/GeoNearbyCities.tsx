import Link from "next/link";
import { buildLocationUrl } from "@/lib/url-utils";

interface City {
  slug: string;
  name: string;
}

interface GeoNearbyCitiesProps {
  locale: string;
  countryName: string;
  stateName: string;
  categoryKey: string;
  nearbyCities: City[];
}

export function GeoNearbyCities({
  locale,
  countryName,
  stateName,
  categoryKey,
  nearbyCities,
}: GeoNearbyCitiesProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby cities</h2>
      <div className="flex flex-wrap gap-2">
        {nearbyCities.map((city) => (
          <Link
            key={city.slug}
            href={buildLocationUrl(
              locale,
              countryName,
              stateName,
              city.name,
              categoryKey
            )}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
