// app/api/geo/route.ts
// Enhanced GEO API for Dynamic H1 Generation

import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const isDevelopment = process.env.NODE_ENV === "development";
  const geo = geolocation(request);

  // Get various headers for location detection
  const vercelCountryHeader = request.headers.get("x-vercel-ip-country");
  const vercelCityHeader = request.headers.get("x-vercel-ip-city");
  const vercelRegionHeader = request.headers.get("x-vercel-ip-region");
  const cfCountryHeader = request.headers.get("cf-ipcountry");
  const cfCityHeader = request.headers.get("cf-ipcity");

  // URL overrides for testing
  const overrideCountry = url.searchParams.get("country");
  const overrideCity = url.searchParams.get("city");

  let finalCountry: string | null = null;
  let finalCity: string | null = null;
  let finalRegion: string | null = null;
  let source: string = "unknown";

  // Priority order for location detection
  if (overrideCountry && overrideCity) {
    finalCountry = overrideCountry.toUpperCase();
    finalCity = overrideCity;
    source = "URL Override (Test)";
  } else if (vercelCityHeader && vercelCountryHeader) {
    finalCountry = vercelCountryHeader;
    finalCity = vercelCityHeader;
    finalRegion = vercelRegionHeader;
    source = "Vercel Headers (Production)";
  } else if (cfCityHeader && cfCountryHeader) {
    finalCountry = cfCountryHeader;
    finalCity = cfCityHeader;
    source = "Cloudflare Headers";
  } else if (geo.city && geo.country) {
    finalCountry = geo.country;
    finalCity = geo.city;
    finalRegion = geo.region;
    source = "Vercel Geolocation";
  } else if (isDevelopment) {
    // Development fallbacks based on accept-language
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.startsWith("tr")) {
      finalCountry = "TR";
      finalCity = "Istanbul";
      finalRegion = "Istanbul";
    } else if (acceptLanguage.startsWith("de")) {
      finalCountry = "DE";
      finalCity = "Berlin";
      finalRegion = "Berlin";
    } else if (acceptLanguage.startsWith("ru")) {
      finalCountry = "RU";
      finalCity = "Moscow";
      finalRegion = "Moscow";
    } else {
      finalCountry = "US";
      finalCity = "New York";
      finalRegion = "New York";
    }
    source = "Accept-Language Fallback (Dev)";
  } else {
    // Production fallback
    finalCountry = "US";
    finalCity = "New York";
    finalRegion = "New York";
    source = "Default Fallback (Production)";
  }

  // Enhanced response for dynamic H1 generation
  const locationData = {
    city: finalCity,
    state: finalRegion,
    country: getCountryName(finalCountry),
    countryCode: finalCountry,
    source,
    isDevelopment,
    timestamp: new Date().toISOString(),
  };

  // Get IP for additional detection if needed
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfIP = request.headers.get("cf-connecting-ip");
  const clientIP = cfIP || realIP || forwarded?.split(",")[0];

  // Try additional IP-based detection if primary methods failed
  if (!finalCity && clientIP) {
    try {
      const detector = GEOLocationDetector.getInstance();
      const ipLocation = await detector.getLocationFromIP(clientIP);
      if (ipLocation) {
        locationData.city = ipLocation.city;
        locationData.state = ipLocation.state;
        locationData.country = ipLocation.country;
        locationData.countryCode = ipLocation.countryCode;
        locationData.source = "IP Geolocation Service";
      }
    } catch (error) {
      console.warn("IP geolocation failed:", error);
    }
  }

  const responseData = {
    ...locationData,
    debug: {
      environment: process.env.NODE_ENV,
      override: { country: overrideCountry, city: overrideCity },
      vercelGeo: geo,
      vercelHeaders: {
        "x-vercel-ip-country": vercelCountryHeader,
        "x-vercel-ip-city": vercelCityHeader,
        "x-vercel-ip-region": vercelRegionHeader,
      },
      cloudflareHeaders: {
        "cf-ipcountry": cfCountryHeader,
        "cf-ipcity": cfCityHeader,
      },
      clientIP,
      acceptLanguage: request.headers.get("accept-language"),
      userAgent: request.headers.get("user-agent"),
    },
  };

  return NextResponse.json(responseData, {
    headers: {
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}

// Helper function to get full country names
function getCountryName(countryCode: string | null): string {
  const countryNames: { [key: string]: string } = {
    TR: "Turkey",
    US: "United States",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    RU: "Russia",
    AZ: "Azerbaijan",
    GR: "Greece",
    NL: "Netherlands",
    BE: "Belgium",
    CH: "Switzerland",
    AT: "Austria",
    PL: "Poland",
    CZ: "Czech Republic",
    HU: "Hungary",
    RO: "Romania",
    BG: "Bulgaria",
    HR: "Croatia",
    RS: "Serbia",
    UA: "Ukraine",
    BY: "Belarus",
    LT: "Lithuania",
    LV: "Latvia",
    EE: "Estonia",
  };

  return countryNames[countryCode || "TR"] || "Turkey";
}
