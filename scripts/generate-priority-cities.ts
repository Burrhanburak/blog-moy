import fs from "fs";
import path from "path";

// Priority cities to generate (1-2 per country)
const priorityCities = [
  // USA
  { country: "united-states", countryName: "United States", state: "new-york", stateName: "New York", city: "new-york-city", cityName: "New York City", lat: 40.7128, lon: -74.0060, region: "NY", countryCode: "US" },
  { country: "united-states", countryName: "United States", state: "california", stateName: "California", city: "los-angeles", cityName: "Los Angeles", lat: 34.0522, lon: -118.2437, region: "CA", countryCode: "US" },

  // UK
  { country: "united-kingdom", countryName: "United Kingdom", state: "england", stateName: "England", city: "london", cityName: "London", lat: 51.5074, lon: -0.1278, region: "ENG", countryCode: "GB" },

  // Canada
  { country: "canada", countryName: "Canada", state: "ontario", stateName: "Ontario", city: "toronto", cityName: "Toronto", lat: 43.6532, lon: -79.3832, region: "ON", countryCode: "CA" },
  { country: "canada", countryName: "Canada", state: "british-columbia", stateName: "British Columbia", city: "vancouver", cityName: "Vancouver", lat: 49.2827, lon: -123.1207, region: "BC", countryCode: "CA" },

  // Australia
  { country: "australia", countryName: "Australia", state: "new-south-wales", stateName: "New South Wales", city: "sydney", cityName: "Sydney", lat: -33.8688, lon: 151.2093, region: "NSW", countryCode: "AU" },
  { country: "australia", countryName: "Australia", state: "victoria", stateName: "Victoria", city: "melbourne", cityName: "Melbourne", lat: -37.8136, lon: 144.9631, region: "VIC", countryCode: "AU" },

  // France
  { country: "france", countryName: "France", state: "ile-de-france", stateName: "Île-de-France", city: "paris", cityName: "Paris", lat: 48.8566, lon: 2.3522, region: "IDF", countryCode: "FR" },

  // Germany
  { country: "germany", countryName: "Germany", state: "berlin", stateName: "Berlin", city: "berlin", cityName: "Berlin", lat: 52.5200, lon: 13.4050, region: "BE", countryCode: "DE" },

  // Netherlands
  { country: "netherlands", countryName: "Netherlands", state: "north-holland", stateName: "North Holland", city: "amsterdam", cityName: "Amsterdam", lat: 52.3676, lon: 4.9041, region: "NH", countryCode: "NL" },

  // UAE
  { country: "united-arab-emirates", countryName: "United Arab Emirates", state: "dubai", stateName: "Dubai", city: "dubai", cityName: "Dubai", lat: 25.2048, lon: 55.2708, region: "DU", countryCode: "AE" },

  // Saudi Arabia
  { country: "saudi-arabia", countryName: "Saudi Arabia", state: "riyadh", stateName: "Riyadh", city: "riyadh", cityName: "Riyadh", lat: 24.7136, lon: 46.6753, region: "01", countryCode: "SA" },

  // Singapore
  { country: "singapore", countryName: "Singapore", state: "central-singapore", stateName: "Central Singapore", city: "singapore", cityName: "Singapore", lat: 1.3521, lon: 103.8198, region: "SG", countryCode: "SG" },
];

// Key services/categories
const categories = [
  { key: "web-design", display: "Web Design", price: "$2,000–$10,000", timeline: "2–4 weeks", audience: "Small to mid-sized businesses" },
  { key: "seo-services", display: "SEO Services", price: "$800–$3,000/mo", timeline: "2–4 weeks setup + ongoing", audience: "E-commerce stores, service providers" },
  { key: "app-development", display: "App Development", price: "$15,000–$100,000+", timeline: "3–6 months", audience: "Startups, enterprises" },
  { key: "digital-marketing", display: "Digital Marketing", price: "$1,500–$5,000/mo", timeline: "Ongoing", audience: "B2B and B2C companies" },
  { key: "ecommerce-development", display: "E-Commerce Development", price: "$5,000–$50,000", timeline: "4–8 weeks", audience: "Retail businesses, online stores" },
];

let generated = 0;
const year = new Date().getFullYear();

for (const location of priorityCities) {
  for (const category of categories) {
    const outputDir = path.join(
      process.cwd(),
      "content",
      location.country,
      location.state,
      location.city
    );

    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${category.key}.mdx`);

    const title = `Best ${category.display} Services in ${location.cityName}, ${location.stateName} (${year})`;
    const description = `Discover expert ${category.display} services in ${location.cityName}, ${location.stateName}. ${category.timeline} delivery, ${category.price} investment. Local market expertise + modern solutions.`;
    const slug = `${location.country}/${location.state}/${location.city}/${category.key}`;
    const canonicalUrl = `https://moydus.com/${slug}`;

    // Generate MDX content using city-category template
    const content = `---
title: "${title}"
description: "${description}"
city: "${location.cityName}"
state: "${location.stateName}"
country: "${location.countryName}"
locale: "en"
category: "${category.key}"
slug: "${slug}"
canonicalUrl: "${canonicalUrl}"

snippable: true
structuredData: true
---

import CityCategoryTemplate from "@/content/_templates/city-category.mdx"

export default (props) => (
  <CityCategoryTemplate
    {...props}
    city={{ name: "${location.cityName}", slug: "${location.city}" }}
    state={{ name: "${location.stateName}", slug: "${location.state}" }}
    country={{ name: "${location.countryName}", slug: "${location.country}" }}
    category={{ title: "${category.display}", key: "${category.key}" }}
    year="${year}"
    intro="Discover expert ${category.display} services in ${location.cityName}, ${location.stateName}. We deliver ${category.timeline.toLowerCase()} solutions with transparent pricing for ${category.audience.toLowerCase()}."
    pricing={{
      startingFrom: "${category.price}",
      timeline: "${category.timeline}",
      retainer: "$1,500–$5,000/month"
    }}
    pricingRange="${category.price}"
    cta={{
      title: "Ready to transform your ${location.cityName} business?",
      body: "Partner with Moydus for professional ${category.display} services in ${location.cityName}. Fast delivery, transparent pricing, proven results.",
      primary: { label: "Start Your Project", href: "https://moydus.com/contact" },
      secondary: { label: "View Portfolio", href: "https://moydus.com/portfolio" },
      footer: "Trusted by ${location.cityName} businesses"
    }}
  />
)
`;

    fs.writeFileSync(outputPath, content, "utf-8");
    generated++;
  }
}

console.log(`✅ Successfully generated ${generated} MDX files for ${priorityCities.length} priority cities`);
