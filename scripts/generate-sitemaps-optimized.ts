import fs from "fs";
import path from "path";
import { locales } from "../config/locales";

const BASE = process.env.SITEMAP_BASE_URL || "https://moydus.com";
const BATCH = 50000; // Google limits
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITEMAPS_DIR = path.join(PUBLIC_DIR, "sitemaps");

// Priority countries for crawl budget optimization
const PRIORITY_COUNTRIES = [
  "united-states",
  "germany", 
  "united-kingdom",
  "france",
  "canada",
  "australia",
  "netherlands",
  "sweden",
  "norway",
  "denmark"
];

// Priority categories for crawl budget optimization  
const PRIORITY_CATEGORIES = [
  "web-design",
  "local-seo", 
  "ecommerce-development",
  "digital-marketing",
  "conversion-optimization"
];

type UrlEntry = {
  loc: string;
  lastmod: string;
  changefreq?: string;
  priority?: string;
  alternates: { hreflang: string; href: string }[];
};

type SitemapTier = "tier1" | "tier2" | "tier3";

function ensureDirs() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
  if (!fs.existsSync(SITEMAPS_DIR)) fs.mkdirSync(SITEMAPS_DIR);
}

function walkContent(): string[] {
  const contentRoot = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentRoot)) return [];

  const mdxPaths: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && p.endsWith(".mdx")) mdxPaths.push(p);
    }
  }

  walk(contentRoot);
  return mdxPaths;
}

function toRoute(p: string): { route: string; locale: string; country: string; category: string } | null {
  // content/{locale}/{country}/{state}/{city}/{category}.mdx
  const rel = path.relative(path.join(process.cwd(), "content"), p);
  const parts = rel.split(path.sep);
  if (parts.length < 5) return null;
  
  const locale = parts[0];
  const country = parts[1];
  const category = parts[4].replace(".mdx", "");
  const route = `/${parts.join("/")}`.replace(/\.mdx$/, "");
  
  return { 
    route: route, 
    locale, 
    country, 
    category 
  };
}

function getTier(country: string, category: string): SitemapTier {
  const isPriorityCountry = PRIORITY_COUNTRIES.includes(country);
  const isPriorityCategory = PRIORITY_CATEGORIES.includes(category);
  
  if (isPriorityCountry && isPriorityCategory) return "tier1";
  if (isPriorityCountry || isPriorityCategory) return "tier2";
  return "tier3";
}

function getPriority(tier: SitemapTier): string {
  switch(tier) {
    case "tier1": return "1.0";
    case "tier2": return "0.8";
    case "tier3": return "0.5";
    default: return "0.5";
  }
}

function getChangeFreq(tier: SitemapTier): string {
  switch(tier) {
    case "tier1": return "weekly";
    case "tier2": return "monthly";
    case "tier3": return "yearly";
    default: return "monthly";
  }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildEntries(): Record<SitemapTier, UrlEntry[]> {
  const files = walkContent();
  const urlsByTier: Record<SitemapTier, UrlEntry[]> = {
    tier1: [],
    tier2: [],
    tier3: []
  };
  const now = new Date().toISOString().split("T")[0];

  for (const f of files) {
    const res = toRoute(f);
    if (!res) continue;
    const { route, locale, country, category } = res;

    // Determine tier for crawl budget optimization
    const tier = getTier(country, category);
    
    // Build canonical loc
    const loc = `${BASE}${route}`;

    // Hreflang alternates - only for same country/region content
    const segs = route.split("/").filter(Boolean);
    if (segs.length === 0) continue;
    
    const alternates = locales.map((l) => ({
      hreflang: l,
      href: `${BASE}/${[l, ...segs.slice(1)].join("/")}`
    }));
    
    // x-default pointing to English version
    alternates.push({ 
      hreflang: "x-default", 
      href: `${BASE}/${["en", ...segs.slice(1)].join("/")}` 
    });

    urlsByTier[tier].push({ 
      loc, 
      lastmod: now, 
      changefreq: getChangeFreq(tier),
      priority: getPriority(tier),
      alternates 
    });
  }

  return urlsByTier;
}

function writeTieredSitemaps(urlsByTier: Record<SitemapTier, UrlEntry[]>) {
  const indexEntries: { loc: string; lastmod: string; tier: SitemapTier }[] = [];

  // Write tier 1 (priority) sitemaps first
  Object.entries(urlsByTier).forEach(([tier, urls]) => {
    if (urls.length === 0) return;
    
    console.log(`Generating ${tier} sitemap with ${urls.length} URLs`);
    
    const chunks = chunk(urls, BATCH);
    
    chunks.forEach((chunkUrls, idx) => {
      const lines: string[] = [];
      lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
      lines.push(
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`
      );
      
      for (const u of chunkUrls) {
        lines.push("  <url>");
        lines.push(`    <loc>${u.loc}</loc>`);
        lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
        lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
        lines.push(`    <priority>${u.priority}</priority>`);
        
        for (const alt of u.alternates) {
          lines.push(
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
          );
        }
        lines.push("  </url>");
      }
      lines.push("</urlset>");

      const name = `sitemap-${tier}-${idx + 1}.xml`;
      fs.writeFileSync(path.join(SITEMAPS_DIR, name), lines.join("\n"), "utf8");
      
      indexEntries.push({
        loc: `${BASE}/sitemaps/${name}`,
        lastmod: new Date().toISOString(),
        tier: tier as SitemapTier
      });
    });
  });

  // Sort index entries by tier priority (tier1 first for crawl budget)
  indexEntries.sort((a, b) => {
    const tierOrder = { tier1: 1, tier2: 2, tier3: 3 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  // Write sitemap index
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

  console.log(`\n✅ Sitemap generation complete:`);
  console.log(`📊 Total sitemaps: ${indexEntries.length}`);
  console.log(`🥇 Tier 1 (Priority): ${urlsByTier.tier1.length} URLs`);
  console.log(`🥈 Tier 2 (Important): ${urlsByTier.tier2.length} URLs`);
  console.log(`🥉 Tier 3 (Standard): ${urlsByTier.tier3.length} URLs`);
  console.log(`🔗 Sitemap index: ${BASE}/sitemap-index.xml`);
}

// Add robots.txt generation
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Crawl-delay for better server performance
Crawl-delay: 1

# Sitemap reference
Sitemap: ${BASE}/sitemap-index.xml

# Block admin/API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /build/

# Allow important bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robotsContent, "utf8");
  console.log(`🤖 robots.txt generated at ${BASE}/robots.txt`);
}

function main() {
  console.log("🚀 Starting optimized sitemap generation...");
  
  ensureDirs();
  const urlsByTier = buildEntries();
  
  const totalUrls = Object.values(urlsByTier).reduce((sum, urls) => sum + urls.length, 0);
  if (totalUrls === 0) {
    console.log("❌ No URLs found under content/. Nothing to generate.");
    return;
  }
  
  writeTieredSitemaps(urlsByTier);
  generateRobotsTxt();
  
  console.log("\n🎉 All done! Your sitemaps are optimized for crawl budget management.");
}

main();