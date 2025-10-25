#!/usr/bin/env tsx
// Test script for dynamic GEO content generation

import { generateEnhancedGEOContent } from "../lib/geo-snippets-enhanced";
import { categories } from "../config/categories-new";

// Test configuration
const testConfigs = [
  {
    city: "Los Angeles",
    state: "California",
    country: "United States",
    category: "web-design",
    categoryDisplay: "Web Design",
    priceRange: "$2,500–$8,000",
    timeline: "3–6 weeks",
    targetAudience: "Local businesses, startups, restaurants, clinics",
    description:
      "Custom, SEO-optimized websites that convert visitors into customers",
    benefit: "Custom, Conversion-Focused Design",
  },
  {
    city: "Austin",
    state: "Texas",
    country: "United States",
    category: "digital-marketing",
    categoryDisplay: "Digital Marketing",
    priceRange: "$2,000–$10,000/month",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "All business types looking to grow online",
    description:
      "Performance marketing, paid ads, and growth strategies for brands in all industries",
    benefit: "ROI-Focused Marketing",
  },
  {
    city: "Miami",
    state: "Florida",
    country: "United States",
    category: "saas-development",
    categoryDisplay: "SaaS Development",
    priceRange: "$15,000–$80,000+",
    timeline: "3–9 months",
    targetAudience: "Startups, tech companies, enterprise businesses",
    description:
      "Develop scalable SaaS platforms with subscription billing, dashboards, and cloud-based multi-tenant architecture",
    benefit: "Scalable SaaS Products",
  },
];

function testDynamicGeneration() {
  console.log("🧪 Testing Dynamic GEO Content Generation");
  console.log(`📊 Available Categories: ${categories.length}`);
  console.log(`🧪 Test Configurations: ${testConfigs.length}\n`);

  testConfigs.forEach((config, index) => {
    console.log(
      `\n🔍 Test ${index + 1}: ${config.categoryDisplay} in ${config.city}, ${
        config.state
      }`
    );
    console.log("=".repeat(60));

    try {
      const geoContent = generateEnhancedGEOContent(config);

      console.log(`\n📝 Snippet (${geoContent.snippet.length} chars):`);
      console.log(`"${geoContent.snippet}"`);

      console.log(`\n❓ FAQs (${geoContent.faqs.length} items):`);
      geoContent.faqs.forEach((faq, i) => {
        console.log(`   ${i + 1}. ${faq.q}`);
        console.log(`      → ${faq.a.substring(0, 100)}...`);
      });

      console.log(
        `\n⭐ Testimonials (${geoContent.testimonials.length} items):`
      );
      geoContent.testimonials.forEach((testimonial, i) => {
        console.log(
          `   ${i + 1}. ${testimonial.name} (${testimonial.city}) - Rating: ${
            testimonial.rating
          }`
        );
        console.log(`      → "${testimonial.text.substring(0, 80)}..."`);
      });

      console.log(
        `\n📊 Success Metrics (${geoContent.successMetrics.length} items):`
      );
      geoContent.successMetrics.forEach((metric, i) => {
        console.log(`   ${i + 1}. ${metric}`);
      });

      console.log(
        `\n🔗 Related Services (${geoContent.relatedServices.length} items):`
      );
      geoContent.relatedServices.forEach((service, i) => {
        console.log(`   ${i + 1}. ${service.name} - ${service.description}`);
        console.log(`      URL: ${service.url}`);
      });

      console.log(`\n✅ Test ${index + 1} completed successfully!`);
    } catch (error) {
      console.error(`❌ Test ${index + 1} failed:`, error);
    }
  });

  console.log("\n🎉 Dynamic content generation testing completed!");
}

// Test category coverage
function testCategoryCoverage() {
  console.log("\n📊 Testing Category Coverage");
  console.log("=".repeat(40));

  console.log(`\nAvailable Categories (${categories.length}):`);
  categories.forEach((cat, index) => {
    console.log(
      `${(index + 1).toString().padStart(2)}. ${cat.key.padEnd(25)} → ${
        cat.display
      }`
    );
    console.log(
      `    Pricing: ${cat.priceRange.padEnd(20)} Timeline: ${cat.timeline}`
    );
    console.log(`    Audience: ${cat.targetAudience}`);
    console.log(`    Benefit: ${cat.benefit}\n`);
  });
}

// Test related services algorithm
function testRelatedServices() {
  console.log("\n🔗 Testing Related Services Algorithm");
  console.log("=".repeat(45));

  const testCategories = [
    "web-design",
    "digital-marketing",
    "saas-development",
    "local-seo",
  ];

  testCategories.forEach((categoryKey) => {
    const category = categories.find((cat) => cat.key === categoryKey);
    if (!category) return;

    const testConfig = {
      city: "Test City",
      state: "Test State",
      country: "United States",
      category: categoryKey,
      categoryDisplay: category.display,
      priceRange: category.priceRange,
      timeline: category.timeline,
      targetAudience: category.targetAudience,
      description: category.description,
      benefit: category.benefit,
    };

    const geoContent = generateEnhancedGEOContent(testConfig);

    console.log(`\n${category.display}:`);
    geoContent.relatedServices.forEach((service, i) => {
      console.log(`  ${i + 1}. ${service.name}`);
    });
  });
}

// Run all tests
if (require.main === module) {
  testDynamicGeneration();
  testCategoryCoverage();
  testRelatedServices();
}
