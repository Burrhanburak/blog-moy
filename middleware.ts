import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import countries from "@/lib/countries.json";

export const config = {
  matcher: "/",
};

export function middleware(req: NextRequest) {
  const geo = geolocation(req);
  const url = req.nextUrl.clone();

  const country = geo.country || "US";
  const city = geo.city || "San Francisco";
  let region = geo.countryRegion?.split("-").pop() || geo.region || "CA";

  // Fix invalid region codes
  if (region === "dev1" || region === "dev" || !region || region.length < 2) {
    region = country === "US" ? "CA" : "ON";
  }

  const countryInfo = countries.find((entry) => entry.cca2 === country);
  const fallbackInfo =
    countries.find((entry) => entry.cca2 === "US") ?? countries[0];
  const info = countryInfo ?? fallbackInfo;

  const currencyEntries = info?.currencies
    ? Object.entries(info.currencies)
    : [];
  const defaultCurrency = { symbol: "$", name: "US Dollar" };
  const [currencyCode, currencyDetailsRaw] = currencyEntries[0] ?? [
    "USD",
    defaultCurrency,
  ];
  const currencyDetails = (currencyDetailsRaw || defaultCurrency) as {
    symbol?: string;
    name?: string;
  };
  const languages = info?.languages
    ? Object.values(info.languages).join(", ")
    : "English";

  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("currencyCode", currencyCode);
  url.searchParams.set(
    "currencySymbol",
    currencyDetails.symbol || defaultCurrency.symbol
  );
  url.searchParams.set(
    "currencyName",
    currencyDetails.name || defaultCurrency.name
  );
  url.searchParams.set("languages", languages);

  const response = NextResponse.rewrite(url);

  // Add geo headers for server-side access
  response.headers.set("x-geo-country", country);
  response.headers.set("x-geo-city", city);
  response.headers.set("x-geo-country-region", `${country}-${region}`);

  return response;
}
