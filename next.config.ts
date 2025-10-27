import path from "node:path";
import createMDX from "@next/mdx";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  // Make sure locale is properly passed
  reactStrictMode: true,
  // Next.js 16: React Compiler (stable) - disabled for now
  // reactCompiler: true,
  env: {
    CONTENTLAYER_LOCALES: process.env.CONTENTLAYER_LOCALES,
    CONTENTLAYER_CATEGORIES: process.env.CONTENTLAYER_CATEGORIES,
  },
  webpack(config: any) {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    Object.assign(config.resolve.alias, {
      "contentlayer/generated": path.join(
        process.cwd(),
        ".contentlayer/generated"
      ),
      "next-intl/config": path.join(process.cwd(), "i18n/request.ts"),
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve("process/browser"),
    };

    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(withContentlayer(nextConfig));
