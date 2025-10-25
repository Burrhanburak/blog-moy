import fs from "fs";
import path from "path";
import { getAllCountries, buildLocationUrl, getAvailableLocales } from "../lib/url-utils";
import { categories } from "../config/categories-new";

const BASE = process.env.SITEMAP_BASE_URL || "https://moydus.com";
const BATCH = 50000; // Google limits
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITEMAPS_DIR = path.join(PUBLIC_DIR, "sitemaps");

type UrlEntry = {
  loc: string;
  lastmod: string;
  alternates: { hreflang: string; href: string }[];
};

function ensureDirs() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
  if (!fs.existsSync(SITEMAPS_DIR)) fs.mkdirSync(SITEMAPS_DIR);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildEntries(): UrlEntry[] {
  const allCountries = getAllCountries();
  const urls: UrlEntry[] = [];
  const now = new Date().toISOString().split("T")[0];

  for (const country of allCountries) {
    const availableLocales = getAvailableLocales(country.code);

    for (const state of country.states) {
      for (const city of state.cities) {
        for (const category of categories) {
          // Each combination of locale/country/state/city/category gets an entry
          const firstLocale = availableLocales[0] || 'en';
          
          const canonicalUrl = `${BASE}${buildLocationUrl(
            firstLocale,
            country.name,
            state.name,
            city.name,
            category.key
          )}`;

          const alternates = availableLocales.map(locale => ({
            hreflang: locale,
            href: `${BASE}${buildLocationUrl(
              locale,
              country.name,
              state.name,
              city.name,
              category.key
            )}`,
          }));

          // Add x-default hreflang
          alternates.push({ hreflang: 'x-default', href: canonicalUrl });

          urls.push({
            loc: canonicalUrl,
            lastmod: now,
            alternates,
          });
        }
      }
    }
  }

  return urls;
}

function writeSitemaps(urls: UrlEntry[]) {
  const urlChunks = chunk(urls, BATCH);
  const indexEntries: { loc: string; lastmod: string }[] = [];

  urlChunks.forEach((chunkUrls, idx) => {
    const lines: string[] = [];
    lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
    lines.push(
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`
    );
    for (const u of chunkUrls) {
      lines.push("  <url>");
      lines.push(`    <loc>${u.loc}</loc>`);
      lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
      for (const alt of u.alternates) {
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
        );
      }
      lines.push("  </url>");
    }
    lines.push("</urlset>");

    const name = `sitemap-${idx + 1}.xml`;
    fs.writeFileSync(path.join(SITEMAPS_DIR, name), lines.join("\n"), "utf8");
    indexEntries.push({
      loc: `${BASE}/sitemaps/${name}`,
      lastmod: new Date().toISOString(),
    });
  });

  const index: string[] = [];
  index.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  index.push(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);
  for (const e of indexEntries) {
    index.push("  <sitemap>");
    index.push(`    <loc>${e.loc}</loc>`);
    index.push(`    <lastmod>${e.lastmod}</lastmod>`);
    index.push("  </sitemap>");
  }
  index.push(`</sitemapindex>`);
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-index.xml"), index.join("\n"), "utf8");

  console.log(`Sitemaps generated: ${indexEntries.length} file(s)`);
}

function main() {
  ensureDirs();
  console.log("Building sitemap entries...");
  const urls = buildEntries();
  if (urls.length === 0) {
    console.log("No URLs found. Nothing to generate.");
    return;
  }
  console.log(`Found ${urls.length} total URLs. Writing sitemaps...`);
  writeSitemaps(urls);
}

main();