import fs from "fs";
import path from "path";
import { blogCategories, BlogCategoryConfig } from "../config/blog-categories";
import { locales } from "../config/locales";

// Blog topics for each category
const blogTopics: Record<string, string[]> = {
  seo: [
    "Local SEO for Small Businesses",
    "Technical SEO Audit Checklist",
    "Keyword Research Strategies",
    "Link Building Techniques",
    "SEO for E-commerce",
    "Voice Search Optimization",
    "Mobile SEO Best Practices",
    "Core Web Vitals Optimization",
  ],
  "web-design": [
    "Responsive Design Principles",
    "UI/UX Design Trends 2024",
    "Conversion Rate Optimization",
    "Accessibility in Web Design",
    "Performance Optimization",
    "Design Systems",
    "Mobile-First Design",
    "User Experience Research",
  ],
  "digital-marketing": [
    "Social Media Marketing Strategy",
    "Email Marketing Automation",
    "PPC Campaign Optimization",
    "Marketing Analytics",
    "Customer Journey Mapping",
    "Marketing Attribution",
    "Marketing Automation",
    "Growth Hacking Techniques",
  ],
  ecommerce: [
    "E-commerce Conversion Optimization",
    "Shopify Store Optimization",
    "Product Page Design",
    "Checkout Process Optimization",
    "Mobile Commerce Strategy",
    "E-commerce SEO",
    "Customer Retention",
    "Inventory Management",
  ],
  "content-marketing": [
    "Content Strategy Planning",
    "Blog Writing Best Practices",
    "Video Content Creation",
    "Content Distribution",
    "Content Calendar Management",
    "Content Performance Analysis",
    "Storytelling in Marketing",
    "Content Personalization",
  ],
};

const template = fs.readFileSync("scripts/templates/blog-template.mdx", "utf8");
const outDir = "content/blog";

let totalGenerated = 0;
let totalSkipped = 0;

console.log(
  `📝 Generating blog posts for ${blogCategories.length} categories across ${locales.length} locales...`
);

locales.forEach((locale) => {
  console.log(`\n🌐 Processing locale: ${locale}`);

  blogCategories.forEach((category: BlogCategoryConfig) => {
    const topics = blogTopics[category.key as keyof typeof blogTopics] || [];
    console.log(`  📚 ${category.title} (${topics.length} topics)`);

    topics.forEach((topic) => {
      try {
        const blogSlug = slugify(topic);
        const blogDate = new Date();
        blogDate.setDate(blogDate.getDate() - Math.floor(Math.random() * 30));

        const blogTitle = `${topic} - Complete Guide | ${category.title}`;
        const blogDescription = `Learn everything about ${topic} with our comprehensive guide. Expert insights, best practices, and actionable strategies for ${category.title.toLowerCase()}.`;

        const blogTags = category.primaryKeywords
          .slice(0, 5)
          .map((tag) => `"${tag}"`)
          .join(", ");
        const blogPrimaryKeywords = category.primaryKeywords
          .map((kw) => `  - "${kw}"`)
          .join("\n");
        const blogSecondaryKeywords = category.secondaryKeywords
          .map((kw) => `  - "${kw}"`)
          .join("\n");
        const blogRelatedServices = category.relatedServices
          .map((service) => `  - "${service}"`)
          .join("\n");
        const blogRelatedLinks = [
          `"https://developers.google.com/search/docs"`,
          `"https://moz.com/learn/seo"`,
          `"https://web.dev/"`,
        ].join(", ");

        const blogRelatedServicesContent = category.relatedServices
          .map((service) => {
            const serviceName = service
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            return `- **[${serviceName}](/services/${locale}/${service})** - Professional ${serviceName.toLowerCase()} services`;
          })
          .join("\n");

        const filled = template
          .replace(/{blogTitle}/g, blogTitle)
          .replace(/{blogDescription}/g, blogDescription)
          .replace(/{blogSlug}/g, blogSlug)
          .replace(/{blogDate}/g, blogDate.toISOString().split("T")[0])
          .replace(/{blogAuthor}/g, "Moydus Team")
          .replace(/{blogImage}/g, `/images/blog/${locale}/${blogSlug}.jpg`)
          .replace(/{blogCategory}/g, category.key)
          .replace(/{blogCategoryDisplay}/g, category.title)
          .replace(/{blogTags}/g, `[${blogTags}]`)
          .replace(/{blogPrimaryKeywords}/g, blogPrimaryKeywords)
          .replace(/{blogSecondaryKeywords}/g, blogSecondaryKeywords)
          .replace(/{blogRelatedServices}/g, blogRelatedServices)
          .replace(/{blogRelatedLinks}/g, `[${blogRelatedLinks}]`)
          .replace(
            /{blogIntroduction}/g,
            category.contentTemplates.introduction
          )
          .replace(/{blogKeyPoints}/g, category.contentTemplates.keyPoints)
          .replace(
            /{blogDetailedContent}/g,
            category.contentTemplates.detailedContent
          )
          .replace(
            /{blogBestPractices}/g,
            category.contentTemplates.bestPractices
          )
          .replace(
            /{blogToolsResources}/g,
            category.contentTemplates.toolsResources
          )
          .replace(/{blogCaseStudies}/g, category.contentTemplates.caseStudies)
          .replace(
            /{blogFutureOutlook}/g,
            category.contentTemplates.futureOutlook
          )
          .replace(/{blogConclusion}/g, category.contentTemplates.conclusion)
          .replace(/{blogRelatedServicesContent}/g, blogRelatedServicesContent)
          .replace(/{locale}/g, locale)
          .replace(/{YYYY-MM-DD}/g, new Date().toISOString().slice(0, 10));

        const outPath = path.join(outDir, locale, `${blogSlug}.mdx`);
        fs.mkdirSync(path.join(outDir, locale), { recursive: true });
        fs.writeFileSync(outPath, filled, "utf8");

        totalGenerated++;
        console.log(`    ✅ ${locale}/${blogSlug}.mdx`);
      } catch (error) {
        console.log(`    ❌ Error generating ${topic} for ${locale}: ${error}`);
        totalSkipped++;
      }
    });
  });
});

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

console.log("\n" + "=".repeat(50));
console.log("🎉 Optimized Blog Generation Complete!");
console.log("=".repeat(50));
console.log(`📊 Statistics:`);
console.log(`   ✅ Generated: ${totalGenerated} blog posts`);
console.log(`   ⚠️ Skipped: ${totalSkipped} posts`);
console.log(`   📁 Output: ${outDir}/`);
console.log(`   🌐 Locales: ${locales.length}`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Review: ls ${outDir}`);
console.log(`   2. Test: npm run dev`);
console.log(`   3. Check: /blog page`);
console.log("=".repeat(50));
