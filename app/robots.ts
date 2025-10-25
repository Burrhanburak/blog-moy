import type { MetadataRoute } from "next";

const baseUrl = "https://moydus.com";

const disallowedPaths = ["/api/", "/build/", "/.cursor/", "/node_modules/"];

const aiAgents = [
  "GPTBot",
  "ChatGPT-User",
  "OpenAI",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity",
  "FacebookBot",
  "meta-externalagent",
  "Bingbot",
  "CCBot",
  "Applebot",
  "Applebot-Extended",
  "cohere-ai",
  "YouBot",
  "Brave-Indexer",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      ...aiAgents.map((agent) => ({
        userAgent: agent,
        allow: "/",
        crawlDelay: 1,
      })),
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-index.xml`],
  };
}
