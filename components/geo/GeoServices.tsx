import { getMessage } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/messages";

interface GeoServicesProps {
  locale: Locale;
  categoryTitle: string;
  services: string[];
  cityName: string;
}

export function GeoServices({
  locale,
  categoryTitle,
  services,
  cityName,
}: GeoServicesProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {getMessage(locale, "common.ourServices")} {categoryTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service} className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service}
            </h3>
            <p className="text-gray-600">
              {getMessage(locale, "common.professionalServicesTailored")}{" "}
              {cityName}.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
