import { createNavigation } from "next-intl/navigation";

export const locales = [
  "en",
] as const;
export const defaultLocale = "en";
export const localePrefix = "never";

// The `pathnames` object holds pairs of internal names and translated paths.
export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/about/company": "/about/company",
  "/about/team": "/about/team",
  "/about/careers": "/about/careers",
  "/about/story": "/about/story",
  "/about/partners": "/about/partners",
  "/about/awards": "/about/awards",
  "/about/press": "/about/press",
  "/contact": "/contact",
  "/services": "/services",
  "/services/consulting": "/services/consulting",
  "/services/development": "/services/development",
  "/services/design": "/services/design",
} satisfies Record<string, string>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales,
    pathnames,
    localePrefix,
  });
