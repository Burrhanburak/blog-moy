import Link from "next/link";
import { getMessage } from "@/lib/i18n/utils";
import { buildLocationUrl } from "@/lib/url-utils";
import type { Locale } from "@/lib/i18n/messages";

interface GeoCTAProps {
  locale?: Locale;
  categoryTitle: string;
  cityName: string;
  countryName: string;
  stateName: string;
}

export function GeoCTA({
  locale,
  categoryTitle,
  cityName,
  countryName,
  stateName,
}: GeoCTAProps) {
  const activeLocale: Locale = locale ?? "en";

  return (
    <section className="bg-blue-600 rounded-lg p-8 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        {getMessage(activeLocale, "common.readyToGetStarted")}{" "}
        {getMessage(activeLocale, "cities.in")} {cityName}?
      </h2>
      <p className="text-xl mb-6 opacity-90">
        {getMessage(activeLocale, "common.letsDiscussHow")} {categoryTitle}{" "}
        {getMessage(activeLocale, "common.helpYourBusiness")}.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/contact"
          className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          {getMessage(activeLocale, "common.getFreeConsultation")}
        </Link>
        <Link
          href="/portfolio"
          className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
        >
          {getMessage(activeLocale, "common.viewWork")}
        </Link>
      </div>
      <div className="mt-6 text-sm opacity-90">
        <Link
          href={buildLocationUrl(undefined, countryName, stateName)}
          className="underline"
        >
          {getMessage(activeLocale, "common.backTo")} {stateName}
        </Link>
        <span className="mx-2">•</span>
        <Link
          href={buildLocationUrl(undefined, countryName, stateName, cityName)}
          className="underline"
        >
          {getMessage(activeLocale, "common.backTo")} {cityName}
        </Link>
        <span className="mx-2">•</span>
        <Link href="/blog" className="underline">
          {getMessage(activeLocale, "common.readGuides")}
        </Link>
      </div>
    </section>
  );
}
