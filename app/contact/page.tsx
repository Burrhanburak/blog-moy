import { Metadata } from "next";
import ContactForm from "@/components/ContactFrom";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { buildLocationUrl } from "@/lib/url-utils";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Contact Moydus - Get Your Project Started Today",
  description:
    "Ready to transform your business? Contact Moydus for expert web design, SEO, and digital marketing services. Get your free consultation today.",
  keywords: [
    "contact moydus",
    "web design consultation",
    "SEO services contact",
    "digital marketing agency",
    "project consultation",
    "business transformation",
  ],
  openGraph: {
    title: "Contact Moydus - Get Your Project Started Today",
    description:
      "Ready to transform your business? Contact Moydus for expert web design, SEO, and digital marketing services.",
    url: "https://moydus.com/contact",
    type: "website",
    siteName: "Moydus",
    images: [
      {
        url: "https://moydus.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Moydus - Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Moydus - Get Your Project Started Today",
    description:
      "Ready to transform your business? Contact Moydus for expert web design, SEO, and digital marketing services.",
    images: ["https://moydus.com/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://moydus.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ContactPage() {
  // Get location data from headers
  const headersList = await headers();
  const country = headersList.get("x-geo-country") || "Global";
  const city = headersList.get("x-geo-city") || "Global";
  const state = headersList.get("x-geo-country-region") || "Global";

  const countryData = {
    name: country,
    countryName: country,
    cityName: city,
    stateName: state,
  };

  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#ff4d00] via-background to-background py-17 lg:mx-4 dark:from-amber-950">
      <main className="container max-w-2xl mx-auto text-center px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Build Something
              <span className="text-white"> Amazing</span>
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
              Ready to transform your business? Get in touch with our team of
              experts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-16">
            {/* Contact Information */}
            <div className=" flex flex-col justify-between">
              {/* Contact Details */}
              <div className=" flex justify-between max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
                <div>
                  <h2 className="font-semibold text-white">Online</h2>
                  <p className="mt-3 text-white">
                    Serving clients worldwide
                    <br />
                  </p>
                </div>

                <div>
                  <h2 className="font-semibold text-white">Office</h2>
                  <p className="mt-3 text-white">
                    Remote & Global
                    <br />
                    Serving clients worldwide
                  </p>
                </div>

                <div>
                  <h2 className="font-semibold text-white"> Email</h2>

                  <div className="mt-3">
                    <div>
                      <Link
                        href="mailto:hello@moydus.com"
                        className="text-white hover:text-white"
                      >
                        info@moydus.com
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-white">moydus</h2>
                  <div className="mt-3 flex gap-6 lg:gap-10 justify-center">
                    <Link
                      href="https://www.instagram.com/moydus/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white"
                      aria-label="Instagram"
                    >
                      <Instagram className="size-5" />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/company/moydus/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative text-muted-foreground h-px w-full my-12">
                <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,white_4px,white_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
              </div>
              {/* Services Overview */}
              <div className="text-left rounded-lg p-3">
                <p className="text-white">
                  We can help you with Web Design - SEO - Digital Marketing -
                  Ecommerce - Saas Panel management - App development - CRM -
                  ERP - Social Media Marketing - Content Marketing - Email
                  Marketing - Ads Management - Panel management and more in your
                  local area.📍
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl py-10">
              <ContactForm />
            </div>
          </div>

          {/* CTA Section */}
          <section className="mb-12 max-w-6xl mx-auto container">
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-lg">
              <h2 className="text-3xl font-semibold">
                Get Started with {countryData.countryName || countryData.name}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-blue-50">
                Ready to elevate your {countryData.cityName || countryData.name}{" "}
                business? Let&apos;s craft a tailored{" "}
                {countryData.countryName || countryData.name} Saas, Ecommerce,
                Web Design and SEO, Panel management, App development, CRM, ERP,
                with a clear timeline and investment range. Get started today
                with our free consultation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="bg-white text-black hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Your {countryData.cityName || countryData.name} Project
                </Link>
                <Link
                  href="/portfolio"
                  className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  See {countryData.countryName || countryData.name} Case Studies
                </Link>
              </div>
              <div className="mt-4 text-xs uppercase tracking-wide text-gray-200">
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.countryName || countryData.name,
                    countryData.stateName,
                    countryData.cityName,
                    "web-design"
                  )}
                  className="underline hover:text-white"
                >
                  {countryData.countryName || countryData.name} Web Design, SEO,
                  Digital Marketing, Ecommerce, Saas, Panel management, App
                  development, CRM, ERP, and more
                </Link>
                <span className="mx-2">•</span>
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.countryName || countryData.name,
                    countryData.stateName,
                    countryData.cityName,
                    "seo-services"
                  )}
                  className="underline hover:text-white"
                >
                  {countryData.countryName || countryData.name} SEO Services
                </Link>
                <span className="mx-2">•</span>
                <Link
                  href={buildLocationUrl(
                    undefined,
                    countryData.countryName || countryData.name,
                    countryData.stateName,
                    countryData.cityName,
                    "digital-marketing"
                  )}
                  className="underline hover:text-white"
                >
                  {countryData.countryName || countryData.name} Marketing,
                  Social Media Marketing, Content Marketing, Email Marketing,
                  PPC Ads, and more
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}
