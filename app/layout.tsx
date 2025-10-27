import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProcessEnvInitializer } from "@/components/ProcessEnvInitializer";
import { DynamicLocationProvider } from "@/components/DynamicLocationProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moydus - Best Web Design & SEO Services",
  description:
    "Moydus is a digital marketing agency that helps businesses grow online.",
  keywords: [
    "Moydus",
    "Web Design",
    "SEO",
    "Digital Marketing",
    "E-commerce Web Development",
    "Local SEO",
    "Social Media Marketing",
    "Social Media Optimization",
    "Social Media Advertising",
    "Social Media Management",
    "Social Media Strategy",
    "Social Media Campaign",
    "Social Media Engagement",
    "Social Media Growth",
    "Social Media Analytics",
    "Social Media Insights",
    "Social Media Tools",
    "Social Media Platforms",
    "Social Media Tools",
    "Social Media Analytics",
    "Social Media Insights",
    "Social Media Growth",
    "Social Media Campaign",
    "Social Media Engagement",
    "Social Media Strategy",
    "Social Media Management",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// helper

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get current pathname and dynamic data
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const userAgent = headersList.get("user-agent") || "";

  // Determine if this is a location-based page
  const isLocationPage = pathname.match(
    /^\/[^\/]+\/[^\/]+(?:\/[^\/]+)?(?:\/[^\/]+)?$/
  );

  // Extract location info from pathname if it's a location page
  let locationData = null;
  if (isLocationPage) {
    const pathParts = pathname.split("/").filter(Boolean);
    locationData = {
      country: pathParts[0] || null,
      state: pathParts[1] || null,
      city: pathParts[2] || null,
      category: pathParts[3] || null,
    };
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dynamic canonical link for SEO */}
        <link rel="canonical" href={`https://moydus.com${pathname}`} />

        {/* Hreflang for international SEO */}
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://moydus.com${pathname}`}
        />

        {/* Dynamic meta for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Dynamic schema markup for location pages */}
        {isLocationPage && locationData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Moydus",
                url: "https://moydus.com",
                logo: "https://moydus.com/logo.png",
                description:
                  "Professional digital marketing and web design services",
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: locationData.state || locationData.country,
                },
                serviceArea: {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    addressCountry: locationData.country,
                    addressRegion: locationData.state,
                    addressLocality: locationData.city,
                  },
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Digital Marketing Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Web Design Services",
                        description:
                          "Professional web design and development services",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "SEO Services",
                        description:
                          "Search engine optimization and local SEO services",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Digital Marketing",
                        description:
                          "Comprehensive digital marketing and online advertising",
                      },
                    },
                  ],
                },
              }),
            }}
          />
        )}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-pathname={pathname}
        data-location={isLocationPage ? "true" : "false"}
      >
        <ProcessEnvInitializer />

        {/* Dynamic Location Provider for context */}
        <DynamicLocationProvider
          locationData={locationData}
          pathname={pathname}
        >
          <Header />

          <SpeedInsights />
          <Analytics />
          {/* Main content with dynamic wrapper */}
          <main className="min-h-screen">{children}</main>

          <Footer />
        </DynamicLocationProvider>

        {/* Dynamic analytics and tracking */}
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: '${pathname}',
                    custom_map: {
                      'dimension1': '${locationData?.country || "global"}',
                      'dimension2': '${locationData?.state || "none"}',
                      'dimension3': '${locationData?.city || "none"}',
                      'dimension4': '${locationData?.category || "none"}',
                    }
                  });
                `,
                }}
              />
            </>
          )}
      </body>
    </html>
  );
}
