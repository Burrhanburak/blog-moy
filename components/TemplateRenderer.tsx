"use client";

import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import { MDX_COMPONENTS } from "@/mdx-components";

function ensureProcessPolyfill() {
  if (typeof globalThis.process === "undefined") {
    (globalThis as any).process = { env: { NODE_ENV: "production" } };
    return;
  }

  if (
    typeof globalThis.process.env === "undefined" ||
    globalThis.process.env === null
  ) {
    globalThis.process.env = { NODE_ENV: "production" };
    return;
  }

  if (typeof globalThis.process.env.NODE_ENV === "undefined") {
    globalThis.process.env.NODE_ENV = "production";
  }
}

interface TemplateRendererProps {
  code: string;
  components?: MDXComponents;
  templateProps?: Record<string, unknown>;
}

export function TemplateRenderer({
  code,
  components,
  templateProps = {},
}: TemplateRendererProps) {
  ensureProcessPolyfill();

  let MDXContent: ReturnType<typeof useMDXComponent> | null = null;
  try {
    MDXContent = useMDXComponent(code);
  } catch (error) {
    console.error("❌ MDX compile error:", error);
    return <div className="text-red-500">MDX render error</div>;
  }

  if (!MDXContent) {
    return <div className="text-red-500">MDX render error</div>;
  }

  const mergedComponents: MDXComponents = {
    ...MDX_COMPONENTS,
    ...(components || {}),
  };

  if (typeof globalThis !== "undefined") {
    const globalAny = globalThis as Record<string, any>;
    Object.entries(mergedComponents).forEach(([key, value]) => {
      if (value && !globalAny[key]) {
        globalAny[key] = value;
      }
    });

    // Template props'ları global scope'a ekle
    Object.entries(templateProps).forEach(([key, value]) => {
      if (value !== undefined) {
        globalAny[key] = value;
      }
    });

    // servicesCollection'ı category.services'den oluştur
    if (
      templateProps.category &&
      typeof templateProps.category === "object" &&
      "services" in templateProps.category
    ) {
      const cat = templateProps.category as any;
      globalAny.servicesCollection = cat.services || [];
      globalAny.categoryPrice = cat.priceRange || "";
      globalAny.categoryTitle = cat.title || "";
      globalAny.categoryDescription = cat.description || "";
      globalAny.categoryTimeline = cat.timeline || "";
    }

    // MDX'te kullanılan yaygın variables'ları global scope'a ekle
    if (templateProps.categoryData) {
      const cat = templateProps.categoryData as any;
      globalAny.servicesCollection = cat.services || [];
      globalAny.categoryDisplay = cat.title || "";
      globalAny.categoryBenefit = templateProps.categoryBenefit || "";
      globalAny.categoryTimeline = cat.timeline || "";
      globalAny.categoryPrice = cat.priceRange || "";
      globalAny.categoryTargetAudience = cat.targetAudience || "";
    }
  }

  return <MDXContent components={mergedComponents} {...templateProps} />;
}
