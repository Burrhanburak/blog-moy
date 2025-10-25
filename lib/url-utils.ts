// URL utility functions for dynamic routing
import fs from "fs";
import path from "path";
import { categories, priorityCategories } from "@/config/categories-new";

// Load location data
const RAW_LOCATION_DATA = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/filtered.json"), "utf8")
);

// Load priority countries data for locale mapping
const PRIORITY_COUNTRIES_DATA = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/priorityCountries.json"), "utf8")
);

const SUPPORTED_COUNTRY_CODES = new Set([
  "US", // United States
  "GB", // United Kingdom
  "CA", // Canada
  "AU", // Australia
  "SG", // Singapore
  "AE", // United Arab Emirates
]);

const locationData = RAW_LOCATION_DATA.filter((country: any) =>
  SUPPORTED_COUNTRY_CODES.has(String(country.iso2).toUpperCase())
);

// Country name mapping
const countryNames: Record<string, string> = {
  us: "United States",
  ca: "Canada",
  au: "Australia",
  gb: "United Kingdom",
  sg: "Singapore",
  ae: "United Arab Emirates",
};

const DEFAULT_COUNTRY_NAMES = {
  sg: "Singapore",
};

/**
 * Get country name from country code
 */
export function getCountryName(countryCode: string): string {
  return countryNames[countryCode] || countryCode.toUpperCase();
}

/**
 * Convert string to slug format (Next.js 16 enhanced)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .replace(/-+/g, "-"); // Remove multiple consecutive dashes
}

/**
 * Convert slug back to readable format
 */
export function unslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Build location URL (Next.js 16 enhanced)
 */
export function buildLocationUrl(
  _locale: string | undefined,
  country?: string,
  state?: string,
  city?: string,
  category?: string
): string {
  const segments: string[] = [];

  if (country) {
    segments.push(slugify(country));
  }
  if (state) {
    segments.push(slugify(state));
  }
  if (city) {
    segments.push(slugify(city));
  }
  if (category) {
    // Category is already a slug, no need to slugify
    segments.push(category);
  }

  return segments.length > 0 ? `/${segments.join("/")}` : "/";
}

/**
 * Get all countries with their states and cities
 */
export function getAllCountries() {
  return locationData.map((country: any) => ({
    code: country.iso2.toLowerCase(),
    name: country.name,
    slug: slugify(country.name),
    states:
      country.states?.map((state: any) => ({
        code: state.iso2,
        name: state.name,
        slug: slugify(state.name),
        cities:
          state.cities?.map((city: any) => ({
            name: city.name,
            slug: slugify(city.name),
            lat: city.latitude,
            lng: city.longitude,
          })) || [],
      })) || [],
  }));
}

/**
 * Get country by code
 */
export function getCountryByCode(countrySlug: string) {
  // First try to find by slug
  let country = locationData.find(
    (c: any) => slugify(c.name) === countrySlug.toLowerCase()
  );

  // If not found by slug, try by ISO2 code
  if (!country) {
    country = locationData.find(
      (c: any) => c.iso2.toLowerCase() === countrySlug.toLowerCase()
    );
  }

  if (!country) return null;

  return {
    code: country.iso2.toLowerCase(),
    name: country.name,
    slug: slugify(country.name),
    states:
      country.states?.map((state: any) => ({
        code: state.iso2,
        name: state.name,
        slug: slugify(state.name),
        cities:
          state.cities?.map((city: any) => ({
            name: city.name,
            slug: slugify(city.name),
            lat: city.latitude,
            lng: city.longitude,
          })) || [],
      })) || [],
  };
}

/**
 * Get state by country and state slug
 */
export function getStateByCode(countryCode: string, stateSlug: string) {
  const country = getCountryByCode(countryCode);
  if (!country) {
    return null;
  }

  const state = country.states.find(
    (s: any) => s.slug === stateSlug.toLowerCase()
  );

  return state || null;
}

/**
 * Get city by country, state, and city slug
 */
export function getCityByCode(
  countryCode: string,
  stateSlug: string,
  citySlug: string
) {
  const state = getStateByCode(countryCode, stateSlug);
  if (!state) return null;

  const city = state.cities.find((c: any) => c.slug === citySlug.toLowerCase());

  return city || null;
}

/**
 * Get available locales for a country
 */
export function getAvailableLocales(countryCode: string): string[] {
  // Site only supports English content, no locales
  return [];
}

/**
 * Get primary locale for a country (first in the array)
 */
export function getPrimaryLocale(countryCode: string): string {
  const locales = getAvailableLocales(countryCode);
  return locales[0] || "en";
}

/**
 * Check if a locale is the primary locale for a country
 */
export function isPrimaryLocale(countryCode: string, locale: string): boolean {
  return getPrimaryLocale(countryCode) === locale;
}

/**
 * Check if locale is valid for country
 */
export function isValidLocaleForCountry(
  countrySlug: string,
  locale: string
): boolean {
  // Site only supports English content, no locales
  return false;
}

/**
 * Generate static params for all countries with all supported locales
 */
export function generateCountryParams() {
  return getAllCountries().map((country) => ({
    country: country.slug,
  }));
}

/**
 * Generate static params for all states with all supported locales
 */
export function generateStateParams() {
  const params: Array<{ country: string; state: string }> = [];

  getAllCountries().forEach((country) => {
    country.states.forEach((state) => {
      params.push({
        country: country.slug,
        state: state.slug,
      });
    });
  });

  return params;
}

/**
 * Generate static params for all cities with all supported locales
 */
export function generateCityParams() {
  const params: Array<{ country: string; state: string; city: string }> = [];

  getAllCountries().forEach((country) => {
    country.states.forEach((state) => {
      state.cities.forEach((city) => {
        params.push({
          country: country.slug,
          state: state.slug,
          city: city.slug,
        });
      });
    });
  });

  return params;
}

/**
 * Generate static params for all categories in all cities with all supported locales
 */
export function generateCategoryParams() {
  const categoryList =
    priorityCategories.length > 0 ? priorityCategories : categories;
  const params: Array<{
    country: string;
    state: string;
    city: string;
    category: string;
  }> = [];

  getAllCountries().forEach((country) => {
    country.states.forEach((state) => {
      state.cities.forEach((city) => {
        categoryList.forEach((category) => {
          params.push({
            country: country.slug,
            state: state.slug,
            city: city.slug,
            category: category.key,
          });
        });
      });
    });
  });

  return params;
}

/**
 * Generate static params for all categories in all countries with all supported locales
 */
export function generateCountryCategoryParams() {
  const categoryList =
    priorityCategories.length > 0 ? priorityCategories : categories;
  const params: Array<{
    country: string;
    category: string;
  }> = [];

  getAllCountries().forEach((country) => {
    categoryList.forEach((category) => {
      params.push({
        country: country.slug,
        category: category.key,
      });
    });
  });

  return params;
}

/**
 * Generate static params for country-level slugs (states and categories)
 */
export function generateCountrySlugParams() {
  const categoryList =
    priorityCategories.length > 0 ? priorityCategories : categories;
  const params: Array<{
    country: string;
    slug: string;
  }> = [];

  getAllCountries().forEach((country) => {
    country.states.forEach((state) => {
      params.push({
        country: country.slug,
        slug: state.slug,
      });
    });

    categoryList.forEach((category) => {
      params.push({
        country: country.slug,
        slug: category.key,
      });
    });
  });

  return params;
}
