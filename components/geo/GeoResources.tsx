import Link from "next/link";
import { getMessage } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/messages";

interface GeoResourcesProps {
  locale?: Locale;
}

export function GeoResources({ locale }: GeoResourcesProps) {
  const activeLocale: Locale = locale ?? "en";

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {getMessage(activeLocale, "common.resources")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/blog"
          className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {getMessage(activeLocale, "common.readGuides")}
            </h3>
          </div>
          <p className="text-gray-600">
            {getMessage(activeLocale, "common.readLatestGuides")}
          </p>
        </Link>

        <Link
          href="/contact"
          className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
              {getMessage(activeLocale, "common.getFreeConsultation")}
            </h3>
          </div>
          <p className="text-gray-600">
            {getMessage(activeLocale, "common.talkToExpert")}
          </p>
        </Link>
      </div>
    </section>
  );
}
