import fs from "fs";
import path from "path";

const CATEGORY_IMAGE_MAP: Record<string, string[]> = {
  "web-design": ["web-design.png", "web-desing-2.png", "web-design-3.png"],
  "custom-web-development": [
    "custom-web-development.png",
    "web-desing-2.png",
    "web-design-3.png",
  ],
  "ecommerce-development": [
    "ecommerce/ecommerce-1.png",
    "ecommerce/ecommer-2.png",
  ],
  "shopify-development": [
    "shopfiy-development/shopify-development-services.png",
    "ecommerce/ecommerce-1.png",
  ],
  "wordpress-development": ["web-design-3.png", "web-design.png"],
  "saas-development": [
    "saas-development/saas-development-services.png",
    "custom-web-development.png",
  ],
  "app-development": ["mobile-app-development/mobile-app-development-1.png"],
  "ui-ux-design": ["web-desing-2.png", "web-design-3.png", "web-design.png"],
  "landing-page-design": ["web-design-3.png", "web-design.png"],
  branding: ["marketing/marketing.png", "digital-service..png"],
  "digital-marketing": ["marketing/marketing.png", "digital-service..png"],
  "social-media-marketing": [
    "marketing/marketing.png",
    "digital-service..png",
  ],
  "seo-services": ["seo-services/seo-1.png"],
  "local-seo": ["seo-services/seo-1.png", "marketing/marketing.png"],
  "content-marketing": ["digital-service..png", "marketing/marketing.png"],
  "email-marketing": ["marketing/marketing.png", "digital-service..png"],
  "crm-development": [
    "custom-web-development.png",
    "saas-development/saas-development-services.png",
  ],
  "erp-software": [
    "custom-web-development.png",
    "saas-development/saas-development-services.png",
  ],
  "ai-integration": [
    "saas-development/saas-development-services.png",
    "custom-web-development.png",
  ],
  automation: [
    "saas-development/saas-development-services.png",
    "digital-service..png",
  ],
  "software-consulting": ["custom-web-development.png", "web-design-3.png"],
  "crm-portal-apps": [
    "custom-web-development.png",
    "saas-development/saas-development-services.png",
  ],
  "conversion-optimization": ["digital-service..png", "marketing/marketing.png"],
  "ppc-ads": ["marketing/marketing.png", "digital-service..png"],
  "custom-panel-development": [
    "custom-web-development.png",
    "saas-development/saas-development-services.png",
  ],
};

const DEFAULT_FALLBACK = CATEGORY_IMAGE_MAP["web-design"][0] ?? "web-design.png";

export function getRandomImage(categorySlug: string): string {
  try {
    const baseDir = path.join(process.cwd(), "public/images");
    const normalizedSlug = categorySlug?.toLowerCase() || "";

    const mappedCandidates =
      CATEGORY_IMAGE_MAP[normalizedSlug] ??
      CATEGORY_IMAGE_MAP[normalizedSlug.replace(/-services?$/, "")] ??
      CATEGORY_IMAGE_MAP[normalizedSlug.replace(/-marketing$/, "")];

    if (Array.isArray(mappedCandidates) && mappedCandidates.length > 0) {
      const existing = mappedCandidates
        .map((relativePath) => relativePath.replace(/^\/+/, ""))
        .filter((relativePath) =>
          fs.existsSync(path.join(baseDir, relativePath))
        );

      if (existing.length > 0) {
        const randomImage =
          existing[Math.floor(Math.random() * existing.length)];
        return `/images/${randomImage}`;
      }
    }

    const tryDirs = [
      normalizedSlug,
      // common synonyms
      normalizedSlug === "seo-services" ? "seo" : undefined,
      normalizedSlug === "digital-marketing" ? "marketing" : undefined,
      normalizedSlug === "web-design" ? "web" : undefined,
    ].filter(Boolean) as string[];

    for (const dir of tryDirs) {
      const categoryDir = path.join(baseDir, dir);
      if (!fs.existsSync(categoryDir)) continue;
      const files = fs
        .readdirSync(categoryDir)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
      if (files.length) {
        const randomImage = files[Math.floor(Math.random() * files.length)];
        return `/images/${dir}/${randomImage}`;
      }
    }

    // Fallback: pick any image directly under public/images
    if (fs.existsSync(baseDir)) {
      const all = fs
        .readdirSync(baseDir)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
      if (all.length) {
        const randomImage = all[Math.floor(Math.random() * all.length)];
        return `/images/${randomImage}`;
      }
    }

    // Final fallback: use category-specific image if exists
    if (categorySlug) {
      const categoryImageFile = `${categorySlug}.png`;
      const categoryImagePath = path.join(baseDir, categoryImageFile);
      if (fs.existsSync(categoryImagePath)) {
        return `/images/${categoryImageFile}`;
      }
    }

    return `/images/${DEFAULT_FALLBACK}`;
  } catch (error) {
    console.error("Error getting random image:", error);
    return `/images/${DEFAULT_FALLBACK}`;
  }
}
