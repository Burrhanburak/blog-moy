"use client";
import React from "react";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  hreflangAlternates?: { hreflang: string; href: string }[];
  pageSchema?: object;
  breadcrumbList?: object;
  organizationSchema?: object;
}

export default function HeadScripts({
  title,
  description,
  keywords,
  hreflangAlternates = [],
  pageSchema,
  breadcrumbList,
  organizationSchema,
}: Props) {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(", ")} />
      <meta name="robots" content="index, follow" />

      {/* hreflang */}
      {hreflangAlternates.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}

      {/* JSON-LD */}
      {[pageSchema, breadcrumbList, organizationSchema].map(
        (schema, i) =>
          schema && (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          )
      )}
    </head>
  );
}
