import { getMessage } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/messages";

interface GeoFAQProps {
  locale: Locale;
  categoryTitle: string;
  cityName: string;
  stateName: string;
  timeline: string;
  priceRange: string;
}

export function GeoFAQ({
  locale,
  categoryTitle,
  cityName,
  stateName,
  timeline,
  priceRange,
}: GeoFAQProps) {
  return (
    <section className="mb-12 bg-gray-50 rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {getMessage(locale, "common.frequentlyAskedQuestions")}
      </h2>
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {getMessage(locale, "faqs.howLongQuestion", {
              category: categoryTitle,
              city: cityName,
            })}
          </h3>
          <p className="text-gray-700">
            {getMessage(locale, "common.typicalTimeframe")} {timeline}.{" "}
            {getMessage(locale, "common.prioritizeFastDelivery")} {cityName}.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {getMessage(locale, "faqs.costQuestion", {
              category: categoryTitle,
              city: cityName,
              state: stateName,
            })}
          </h3>
          <p className="text-gray-700">
            {getMessage(locale, "common.pricingRanges")} {priceRange}{" "}
            {getMessage(locale, "common.dependingProjectScope")} {cityName}.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {getMessage(locale, "faqs.localSeoQuestion", { city: cityName })}
          </h3>
          <p className="text-gray-700">
            {getMessage(locale, "common.everyProjectIncludes")}.
          </p>
        </div>
      </div>
    </section>
  );
}
