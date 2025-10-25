import fs from 'fs';
import path from 'path';
import { categories } from '../config/categories-new';
import { questionBasedCategories, generateBlogQuestions } from '../config/blog-categories';

interface LocationData {
  country: string;
  state: string;
  city: string;
}

// Sample locations to generate blog posts for
const sampleLocations: LocationData[] = [
  { country: 'united-states', state: 'california', city: 'san-francisco' },
  { country: 'united-states', state: 'new-york', city: 'new-york-city' },
  { country: 'united-states', state: 'texas', city: 'austin' },
  { country: 'united-kingdom', state: 'westminster', city: 'london' },
  { country: 'canada', state: 'ontario', city: 'toronto' },
];

// Priority services to create blogs for
const priorityServices = [
  'web-design',
  'seo-services',
  'digital-marketing',
  'ecommerce-development',
  'app-development'
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function formatCityName(citySlug: string): string {
  return citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatServiceName(serviceKey: string): string {
  const service = categories.find(cat => cat.key === serviceKey);
  return service ? service.title : serviceKey.replace(/-/g, ' ');
}

function getServiceImage(serviceKey: string): string {
  // Map service keys to existing images in the public folder
  const imageMap: Record<string, string> = {
    'web-design': 'web-design.png',
    'digital-marketing': 'marketing/marketing.png',
    'seo-services': 'seo-services/seo-1.png', 
    'ecommerce-development': 'ecommerce/ecommerce-1.png',
    'app-development': 'mobile-app-development/mobile-app-development-1.png',
    'custom-web-development': 'custom-web-development.png',
    'shopify-development': 'shopfiy-development/shopify-development-services.png',
    'saas-development': 'saas-development/saas-development-services.png'
  };
  
  return imageMap[serviceKey] || 'web-design.png'; // fallback to web-design.png
}

function generateBlogPostContent(
  location: LocationData,
  serviceKey: string,
  questionCategory: string,
  question: string,
  intent: string
): string {
  const service = categories.find(cat => cat.key === serviceKey);
  const cityName = formatCityName(location.city);
  const serviceName = formatServiceName(serviceKey);
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const contentStructure = questionBasedCategories.find(cat => cat.key === questionCategory)?.contentStructure || [];
  
  // Generate SEO-optimized content based on question type and intent
  const generateContentSection = (sectionType: string): string => {
    switch (sectionType) {
      case 'introduction':
        return `${question} is a common question among businesses in ${cityName}. This comprehensive guide will provide you with expert insights and actionable strategies to help you understand and implement ${serviceName.toLowerCase()} effectively in your ${cityName} business.`;
      
      case 'step-by-step-guide':
        return `## Step-by-Step Guide to ${serviceName} in ${cityName}\n\n1. **Assessment**: Evaluate your current ${serviceName.toLowerCase()} needs\n2. **Planning**: Develop a strategy tailored to the ${cityName} market\n3. **Implementation**: Execute your ${serviceName.toLowerCase()} plan\n4. **Optimization**: Continuously improve your results\n5. **Monitoring**: Track performance and ROI`;
      
      case 'definition':
        return `## What is ${serviceName}?\n\n${serviceName} involves creating solutions that help businesses achieve their digital goals. In ${cityName}, businesses are increasingly recognizing the importance of professional ${serviceName.toLowerCase()} to stay competitive in the market.`;
      
      case 'local-considerations':
        return `## ${serviceName} Considerations for ${cityName} Businesses\n\nWhen implementing ${serviceName.toLowerCase()} in ${cityName}, consider:\n- Local market dynamics\n- Target audience preferences\n- Competitive landscape\n- Regulatory requirements\n- Cultural factors`;
      
      case 'pricing-overview':
        return `## ${serviceName} Pricing in ${cityName}\n\nThe cost of ${serviceName.toLowerCase()} in ${cityName} varies based on several factors:\n- Project scope and complexity\n- Timeline requirements\n- Provider experience\n- Market conditions\n\nTypical investment ranges from ${service?.priceRange || '$2,000-$10,000'} depending on your specific needs.`;
      
      case 'comparison-criteria':
        return `## How to Compare ${serviceName} Options in ${cityName}\n\nWhen evaluating ${serviceName.toLowerCase()} providers in ${cityName}, consider:\n- Experience and portfolio\n- Client testimonials\n- Technical expertise\n- Communication and support\n- Pricing and value proposition`;
      
      default:
        return `## ${sectionType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n\nExpert insights on ${serviceName.toLowerCase()} for ${cityName} businesses.`;
    }
  };

  const contentSections = contentStructure.map(section => generateContentSection(section)).join('\n\n');
  
  const callToAction = intent === 'commercial' ? 
    `Ready to get started with ${serviceName.toLowerCase()} in ${cityName}? Contact our team for a free consultation.` :
    `Learn more about our ${serviceName.toLowerCase()} services and how we can help your ${cityName} business succeed.`;

  return `---
title: "${question}"
description: "Expert guide to ${serviceName.toLowerCase()} in ${cityName}. Learn best practices, pricing, and strategies for ${cityName} businesses."
date: "${currentDate}"
author: "Moydus Team"
tags: ["${serviceKey}", "${location.city}", "${location.state}", "${questionCategory}"]
image: "/images/${getServiceImage(serviceKey)}"
snippable: true
---

# ${question}

${generateContentSection('introduction')}

${contentSections}

## Why Choose Professional ${serviceName} in ${cityName}?

Professional ${serviceName.toLowerCase()} providers in ${cityName} offer:
- Local market expertise
- Proven track record
- Ongoing support
- Competitive pricing
- Quality assurance

## Next Steps

${callToAction}

<GeoCTA 
  city="${cityName}"
  service="${serviceName}"
  ctaText="Get Started Today"
/>
`;
}

function generateLocationBlogs() {
  console.log('🚀 Starting location-based blog generation...');
  
  let generatedCount = 0;
  
  sampleLocations.forEach(location => {
    priorityServices.forEach(serviceKey => {
      const questions = generateBlogQuestions(
        formatCityName(location.city),
        location.state,
        formatServiceName(serviceKey)
      );
      
      // Generate 2-3 blog posts per location/service combination
      const selectedQuestions = questions.slice(0, 3);
      
      selectedQuestions.forEach((q, index) => {
        const blogSlug = slugify(q.question);
        const blogDir = path.join(
          'content/blog',
          location.country,
          location.state,
          location.city,
          serviceKey
        );
        
        // Create directory if it doesn't exist
        fs.mkdirSync(blogDir, { recursive: true });
        
        const blogPath = path.join(blogDir, `${q.category}-${index + 1}.mdx`);
        const blogContent = generateBlogPostContent(
          location,
          serviceKey,
          q.category,
          q.question,
          q.intent
        );
        
        fs.writeFileSync(blogPath, blogContent);
        generatedCount++;
        
        console.log(`✅ Generated: ${blogPath}`);
      });
    });
  });
  
  console.log(`🎉 Generated ${generatedCount} location-based blog posts!`);
  
  // Update generation stats
  const statsPath = 'content/generation-stats.json';
  const stats = fs.existsSync(statsPath) ? JSON.parse(fs.readFileSync(statsPath, 'utf8')) : {};
  stats.blogPosts = {
    ...stats.blogPosts,
    generated: generatedCount,
    lastUpdate: new Date().toISOString()
  };
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
}

// Run the generator
if (require.main === module) {
  generateLocationBlogs();
}

export { generateLocationBlogs };