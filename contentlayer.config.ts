import fs from "node:fs";
import path from "node:path";
import {
  contentDirExcludeDefault,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import { getDynamicImage } from "./lib/getDynamicImage";

const localeFilter = (process.env.CONTENTLAYER_LOCALES || "")
  .split(",")
  .map((locale) => locale.trim().toLowerCase())
  .filter(Boolean);

const hasLocaleFilter = localeFilter.length > 0;

const categoryFilter = (process.env.CONTENTLAYER_CATEGORIES || "")
  .split(",")
  .map((category) => category.trim().toLowerCase())
  .filter(Boolean);

const hasCategoryFilter = categoryFilter.length > 0;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const SUPPORTED_LOCALES = ["en"];

const contentRoot = path.join(process.cwd(), "content");

const availableLocales = fs.existsSync(contentRoot)
  ? fs
      .readdirSync(contentRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .filter((locale) => SUPPORTED_LOCALES.includes(locale))
  : [];

const normalizedLocaleFilter = hasLocaleFilter
  ? localeFilter.filter((locale) => SUPPORTED_LOCALES.includes(locale))
  : SUPPORTED_LOCALES;

const contentDirInclude =
  normalizedLocaleFilter.length > 0
    ? Array.from(new Set([...normalizedLocaleFilter, "_templates", "blog"]))
    : ["_templates", "blog"];

const normalizedCategoryFilter = hasCategoryFilter
  ? Array.from(
      new Set(
        categoryFilter.map((category) => slugify(category)).filter(Boolean)
      )
    )
  : [];

const allowedCategories = new Set(normalizedCategoryFilter);
const maxDocs = Number(process.env.CONTENTLAYER_MAX_DOCS || "0");
const hasMaxDocs = Number.isFinite(maxDocs) && maxDocs > 0;

function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

const localesToScanForCategories =
  normalizedLocaleFilter.length > 0
    ? normalizedLocaleFilter
    : SUPPORTED_LOCALES;

function collectCategoryExcludes(): string[] {
  if (!hasCategoryFilter || allowedCategories.size === 0) {
    return [];
  }

  const excludes = new Set<string>();
  let keptDocs = 0;

  const visit = (absoluteDir: string, relativeDir: string) => {
    if (!fs.existsSync(absoluteDir)) {
      return;
    }

    for (const entry of fs.readdirSync(absoluteDir, {
      withFileTypes: true,
    })) {
      const absolutePath = path.join(absoluteDir, entry.name);
      const relativePath = relativeDir
        ? `${relativeDir}/${entry.name}`
        : entry.name;

      if (entry.isDirectory()) {
        if (relativePath.startsWith("_templates")) {
          continue;
        }

        // Keep blog content untouched
        if (relativePath.includes("/blog")) {
          continue;
        }

        visit(absolutePath, relativePath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".mdx")) {
        continue;
      }

      if (relativePath.startsWith("_templates/")) {
        continue;
      }
      
      // Don't exclude blog files - we want them to be processed
      // if (relativePath.includes("/blog/")) {
      //   continue;
      // }

      const segments = relativePath.split("/");
      const fileName = segments.at(-1) ?? "";
      const baseName = fileName.slice(0, -4); // remove .mdx

      // Only filter deeply nested city/service pages
      if (segments.length < 5) {
        continue;
      }

      const normalizedBase = slugify(baseName);
      if (!allowedCategories.has(normalizedBase)) {
        excludes.add(toPosixPath(relativePath));
        continue;
      }

      if (hasMaxDocs) {
        if (keptDocs >= maxDocs) {
          excludes.add(toPosixPath(relativePath));
          continue;
        }
        keptDocs += 1;
      }
    }
  };

  for (const locale of localesToScanForCategories) {
    const absoluteLocaleDir = path.join(contentRoot, locale);
    if (fs.existsSync(absoluteLocaleDir)) {
      visit(absoluteLocaleDir, locale);
    }
  }

  return Array.from(excludes);
}

const manualExcludes = [
  "generation-stats.json",
  path.join("content", "generation-stats.json"),
].map((entry) => toPosixPath(entry));

const baseContentDirExclude = Array.from(
  new Set([...contentDirExcludeDefault, ...manualExcludes])
);

const categoryExcludes = collectCategoryExcludes();

const contentDirExclude =
  categoryExcludes.length > 0
    ? Array.from(new Set([...baseContentDirExclude, ...categoryExcludes]))
    : baseContentDirExclude;

if (process.env.DEBUG_CONTENTLAYER_FILTERS === "true") {
  console.log("[contentlayer] contentDirInclude:", contentDirInclude);
  console.log("[contentlayer] category excludes:", categoryExcludes.length);
}

export const City = defineDocumentType(() => ({
  name: "City",
  filePathPattern: `!(blog)/**/*/*/*/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: false },
    description: { type: "string", required: false },
    snippetSummary: { type: "string", required: false },

    city: { type: "string", required: false },
    state: { type: "string", required: false },
    country: { type: "string", required: false },
    locale: { type: "string", required: false },
    category: { type: "string", required: false },
    slug: { type: "string", required: false },

    canonicalUrl: { type: "string", required: false },
    metaTitle: { type: "string", required: false },
    metaDescription: { type: "string", required: false },

    openGraph: { type: "json", required: false },
    twitterCard: { type: "json", required: false },
    geo: { type: "json", required: false },
    author: { type: "json", required: false },
    faqs: { type: "json", required: false },
    testimonials: { type: "json", required: false },
    cta: { type: "json", required: false },

    primaryKeywords: { type: "list", of: { type: "string" } },
    secondaryKeywords: { type: "list", of: { type: "string" } },
    categories: { type: "list", of: { type: "string" } },
    services: { type: "list", of: { type: "string" } },
    relatedServices: { type: "list", of: { type: "string" } },

    lastUpdated: { type: "date", required: false },
    snippable: { type: "boolean", required: false },
    structuredData: { type: "boolean", required: false },

    priceRange: { type: "string", required: false },
    timeline: { type: "string", required: false },
    targetAudience: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.slug || doc._raw.flattenedPath}`,
    },
    dynamicImage: {
      type: "string",
      resolve: async (doc) => {
        try {
          // Extract city and category from the document path
          const pathSegments = doc._raw.flattenedPath.split("/");
          const cityName = pathSegments[pathSegments.length - 2] || "unknown";
          const categoryName =
            pathSegments[pathSegments.length - 1] || "unknown";

          // Create slug versions
          const citySlug = cityName.toLowerCase().replace(/[^a-z0-9]/g, "-");
          const categorySlug = categoryName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");

          const dynamicSrc = await getDynamicImage({
            city: { name: cityName, slug: citySlug },
            category: { title: categoryName, slug: categorySlug },
          });

          return dynamicSrc;
        } catch (error) {
          console.error("Error generating dynamic image:", error);
          return "/images/default-fallback.jpg";
        }
      },
    },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: false },
    image: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" } },
    relatedLinks: { type: "list", of: { type: "string" } },
    snippable: { type: "boolean", required: false },
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (post) => "en", // Default to English since we removed locale structure
    },
    country: {
      type: "string",
      resolve: (post) => {
        const dir = post._raw.sourceFileDir || "";
        const afterBlog = dir.startsWith("blog/") ? dir.slice(5) : dir;
        return afterBlog.split("/")[0] || "";
      },
    },
    state: {
      type: "string", 
      resolve: (post) => {
        const dir = post._raw.sourceFileDir || "";
        const afterBlog = dir.startsWith("blog/") ? dir.slice(5) : dir;
        return afterBlog.split("/")[1] || "";
      },
    },
    city: {
      type: "string",
      resolve: (post) => {
        const dir = post._raw.sourceFileDir || "";
        const afterBlog = dir.startsWith("blog/") ? dir.slice(5) : dir;
        return afterBlog.split("/")[2] || "";
      },
    },
    service: {
      type: "string",
      resolve: (post) => {
        const dir = post._raw.sourceFileDir || "";
        const afterBlog = dir.startsWith("blog/") ? dir.slice(5) : dir;
        return afterBlog.split("/")[3] || "";
      },
    },
    url: {
      type: "string",
      resolve: (post) =>
        `/blog/${post._raw.flattenedPath.replace("blog/", "")}`,
    },
  },
}));

export const PageTemplate = defineDocumentType(() => ({
  name: "PageTemplate",
  filePathPattern: `_templates/**/*.mdx`,
  contentType: "mdx",
  fields: {
    templateKey: { type: "string", required: true },
    description: { type: "string", required: false },
    keywords: { type: "list", of: { type: "string" }, required: false },
    title: { type: "string", required: false },
    dynamicTitle: { type: "string", required: false },
    dynamicMetaTitle: { type: "string", required: false },
    dynamicMetaDescription: { type: "string", required: false },
    dynamicOGTitle: { type: "string", required: false },
    dynamicOGDescription: { type: "string", required: false },
    dynamicPrimaryKeywords: { type: "list", of: { type: "string" }, required: false },
    dynamicSecondaryKeywords: { type: "list", of: { type: "string" }, required: false },
    dynamicCategories: { type: "list", of: { type: "string" }, required: false },
    dynamicServices: { type: "list", of: { type: "string" }, required: false },
    dynamicRelatedServices: { type: "list", of: { type: "string" }, required: false },
    dynamicFAQs: { type: "list", of: { type: "string" }, required: false },
    dynamicTestimonials: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [City, BlogPost, PageTemplate],
  contentDirInclude,
  contentDirExclude,
  disableImportAliasWarning: true,
  mdx: {
    esbuildOptions(options) {
      const external = new Set(options.external ?? []);
      [
        "next",
        "next/*",
        "react",
        "react-dom",
        "next/navigation",
        "next-intl",
        // Removed alias externals so esbuild bundles them and resolves paths
      ].forEach((pkg) => external.add(pkg));
      options.external = Array.from(external);
      options.define = {
        ...options.define,
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV ?? "development"
        ),
      };
      return options;
    },
  },
});
