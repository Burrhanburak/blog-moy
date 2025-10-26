import type { MDXComponents } from "mdx/types";
import React from "react";
import { CustomCard } from "@/components/CustomCard";
import CardGrid from "@/components/CardGrid";
// Lucide React Icons
import * as LucideIcons from "lucide-react";
// Mintlify Components kaldırıldı - React uyumluluk sorunu nedeniyle
import {
  Compare,
  PricingInsight,
  LocalData,
  RelatedCities,
  JsonLd,
  SnippetCallout,
  QuickCallout,
  WarningCallout,
  ProCallout,
} from "@/components/mdx/enhanced";
// Mintlify Components
import {
  Info,
  Warning,
  Note,
  Tip,
  Check,
} from "@/components/mintlify/Callouts";
import Accordion from "@/components/mintlify/Accordion";
import { Card } from "@/components/mintlify/Card";
import { CardGroup } from "@/components/mintlify/CardGroup";
import { CardHeader } from "@/components/mintlify/CardHeader";
import { CardContent } from "@/components/mintlify/CardContent";
import { CardTitle } from "@/components/mintlify/CardTitle";
import { Button } from "@/components/mintlify/Button";
import { Frame } from "@/components/mintlify/Frame";
import { Tooltip } from "@/components/mintlify/Tooltip";
import Link from "next/link";
// buildLocationUrl function for MDX components
const buildLocationUrl = (
  _locale: string | undefined,
  country?: string,
  state?: string,
  city?: string,
  category?: string
): string => {
  const segments: string[] = [];

  if (country) {
    segments.push(country.toLowerCase().replace(/\s+/g, "-"));
  }
  if (state) {
    segments.push(state.toLowerCase().replace(/\s+/g, "-"));
  }
  if (city) {
    segments.push(city.toLowerCase().replace(/\s+/g, "-"));
  }
  if (category) {
    segments.push(category);
  }

  return segments.length > 0 ? `/${segments.join("/")}` : "/";
};

// generateServiceDescription function for MDX components
const generateServiceDescription = (
  city: string,
  state: string,
  service: string
): string => {
  const descriptions = [
    `${city}, ${state} businesses trust our ${service} to drive local engagement and conversions.`,
    `Our ${service} in ${city}, ${state} delivers tailored solutions for maximum impact.`,
    `Transform your ${city} business with our expert ${service} designed for ${state} markets.`,
    `High-performance ${service} for ${city}, ${state} companies seeking measurable results.`,
    `${city} organizations rely on our ${service} to boost visibility and growth in ${state}.`,
  ];
  const hash = city
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return descriptions[hash % descriptions.length];
};

function extractText(content: React.ReactNode): string {
  if (typeof content === "string" || typeof content === "number") {
    return String(content);
  }
  if (Array.isArray(content)) {
    return content.map(extractText).join("");
  }
  if (React.isValidElement(content)) {
    const element = content as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    return extractText(element.props?.children as React.ReactNode);
  }
  return "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function H1({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200"
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const rawText = extractText(children);
  const id = slugify(rawText);
  return (
    <h2
      id={id}
      className="flex whitespace-pre-wrap group font-semibold"
      {...props}
    >
      <div className="absolute" tabIndex={-1}>
        <Link
          href={`#${id}`}
          className="-ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100 focus:opacity-100 focus:outline-0 group/link"
          aria-label="Navigate to header"
        >
          <div className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              height="12px"
              viewBox="0 0 576 512"
            >
              <path d="M0 256C0 167.6 71.6 96 160 96h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C98.1 144 48 194.1 48 256s50.1 112 112 112h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c61.9 0 112-50.1 112-112s-50.1-112-112-112H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c88.4 0 160 71.6 160 160zM184 232H392c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"></path>
            </svg>
          </div>
        </Link>
      </div>
      <span className="cursor-pointer">{children}</span>
    </h2>
  );
}

function P({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
      <p {...props}>{children}</p>
    </div>
  );
}

const components: MDXComponents = {
  // Custom Components
  CustomCard,
  CardGrid,
  Compare,
  PricingInsight,
  LocalData,
  RelatedCities,
  JsonLd,
  SnippetCallout,
  QuickCallout,
  WarningCallout,
  ProCallout,
  // Mintlify Components
  Info,
  Warning,
  Note,
  Tip,
  Check,
  Accordion,
  Card,
  CardGroup,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Frame,
  Tooltip,
  // Lucide React Icons (only components)
  ...Object.fromEntries(
    Object.entries(LucideIcons).filter(([key, value]) => 
      typeof value === 'function' && key !== 'createLucideIcon'
    )
  ),
  // Alias commonly used MDX tag to our snippet callout
  Callout: SnippetCallout,
  h1: H1,
  h2: H2,
  p: P,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

export const MDX_COMPONENTS = components;
