// Blog categories configuration - dynamic blog content generation
export interface BlogCategoryConfig {
  key: string;
  title: string;
  description: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  relatedServices: string[];
  seoFocus: 'traditional' | 'modern' | 'multi-surface';
  intent: 'informational' | 'commercial' | 'transactional';
  questionTypes: string[];
  contentTemplates: {
    introduction: string;
    keyPoints: string;
    detailedContent: string;
    bestPractices: string;
    toolsResources: string;
    caseStudies: string;
    futureOutlook: string;
    conclusion: string;
  };
}

// Question-based blog categories for location-specific content
export interface QuestionBasedCategory {
  key: string;
  title: string;
  description: string;
  questionTypes: string[];
  seoFocus: 'traditional' | 'modern' | 'multi-surface';
  intent: string;
  contentStructure: string[];
}

export const questionBasedCategories: QuestionBasedCategory[] = [
  {
    key: 'how-to',
    title: 'How-To Guides',
    description: 'Step-by-step guides and tutorials for implementing solutions',
    questionTypes: [
      'How to {service} in {city}',
      'How to choose the best {service} in {city}',
      'How to get started with {service} in {city}',
      'How does {service} work in {city}',
      'How much does {service} cost in {city}'
    ],
    seoFocus: 'multi-surface',
    intent: 'informational',
    contentStructure: ['introduction', 'step-by-step-guide', 'examples', 'local-considerations', 'conclusion']
  },
  {
    key: 'what-is',
    title: 'What Is',
    description: 'Comprehensive explanations and definitions',
    questionTypes: [
      'What is {service} in {city}',
      'What are the benefits of {service} in {city}',
      'What to expect from {service} in {city}',
      'What makes {service} different in {city}',
      'What are the requirements for {service} in {city}'
    ],
    seoFocus: 'traditional',
    intent: 'informational',
    contentStructure: ['definition', 'key-features', 'local-context', 'benefits', 'next-steps']
  },
  {
    key: 'best',
    title: 'Best Practices & Recommendations',
    description: 'Expert recommendations and best practices',
    questionTypes: [
      'Best {service} in {city}',
      'Best practices for {service} in {city}',
      'Best time to use {service} in {city}',
      'Best companies for {service} in {city}',
      'Best strategies for {service} in {city}'
    ],
    seoFocus: 'multi-surface',
    intent: 'commercial',
    contentStructure: ['criteria', 'top-recommendations', 'comparison', 'local-insights', 'expert-tips']
  },
  {
    key: 'why',
    title: 'Why Choose',
    description: 'Reasons and benefits for choosing specific solutions',
    questionTypes: [
      'Why choose {service} in {city}',
      'Why is {service} important in {city}',
      'Why businesses need {service} in {city}',
      'Why {service} works better in {city}',
      'Why invest in {service} in {city}'
    ],
    seoFocus: 'modern',
    intent: 'commercial',
    contentStructure: ['problem-identification', 'solution-benefits', 'local-advantages', 'case-studies', 'call-to-action']
  },
  {
    key: 'cost',
    title: 'Cost & Pricing',
    description: 'Pricing information and cost considerations',
    questionTypes: [
      'How much does {service} cost in {city}',
      '{service} pricing in {city}',
      'Cost of {service} in {city}',
      'Affordable {service} in {city}',
      '{service} budget planning in {city}'
    ],
    seoFocus: 'traditional',
    intent: 'commercial',
    contentStructure: ['pricing-overview', 'factors-affecting-cost', 'local-market-rates', 'value-proposition', 'budget-tips']
  },
  {
    key: 'compare',
    title: 'Comparisons',
    description: 'Compare different solutions and providers',
    questionTypes: [
      '{service} vs {alternative} in {city}',
      'Compare {service} providers in {city}',
      '{service} comparison in {city}',
      'Which is better {service} or {alternative} in {city}',
      'Local {service} provider comparison in {city}'
    ],
    seoFocus: 'multi-surface',
    intent: 'commercial',
    contentStructure: ['comparison-criteria', 'detailed-comparison', 'pros-and-cons', 'local-recommendations', 'decision-guide']
  }
];

export const blogCategories: BlogCategoryConfig[] = [
  {
    key: "seo",
    title: "SEO",
    description: "Search Engine Optimization strategies and techniques",
    primaryKeywords: [
      "SEO tips",
      "search engine optimization",
      "SEO guide",
      "SEO best practices",
    ],
    secondaryKeywords: [
      "local SEO",
      "technical SEO",
      "SEO tools",
      "keyword research",
      "link building",
      "on-page SEO",
    ],
    relatedServices: ["seo-services", "local-seo", "content-marketing"],
    seoFocus: 'multi-surface',
    intent: 'informational',
    questionTypes: [
      'How to improve SEO in {city}',
      'What is SEO for {city} businesses',
      'Best SEO practices in {city}',
      'Why choose professional SEO in {city}',
      'SEO costs in {city}'
    ],
    contentTemplates: {
      introduction:
        "Search Engine Optimization (SEO) is crucial for improving your website's visibility in search results. In this comprehensive guide, we'll explore the latest SEO strategies that can help your business rank higher and attract more organic traffic.",
      keyPoints:
        "Key SEO strategies include keyword research, on-page optimization, technical SEO, link building, and content marketing. Each element plays a vital role in improving your search rankings and driving qualified traffic to your website.",
      detailedContent:
        "SEO involves multiple components working together. Technical SEO ensures your website is crawlable and indexable by search engines. On-page optimization focuses on content quality and keyword placement. Off-page SEO builds authority through backlinks and social signals.",
      bestPractices:
        "Focus on user experience, create high-quality content, optimize for mobile devices, use proper heading structure, and build natural backlinks. Avoid keyword stuffing and focus on providing value to your users.",
      toolsResources:
        "Essential SEO tools include Google Search Console, Google Analytics, Ahrefs, SEMrush, and Screaming Frog. These tools help you analyze your website's performance and identify optimization opportunities.",
      caseStudies:
        "Our SEO strategies have helped businesses increase organic traffic by 200-400% within 6-12 months. One client saw a 350% increase in qualified leads after implementing our comprehensive SEO approach.",
      futureOutlook:
        "SEO is evolving with AI and machine learning. Voice search, featured snippets, and user experience signals will become increasingly important. Focus on creating content that answers user questions comprehensively.",
      conclusion:
        "SEO is a long-term strategy that requires consistent effort and adaptation. By following these best practices and staying updated with algorithm changes, you can improve your search rankings and drive sustainable organic growth.",
    },
  },
  {
    key: "web-design",
    title: "Web Design",
    description: "Modern web design trends, techniques, and best practices",
    primaryKeywords: [
      "web design trends",
      "responsive design",
      "UI/UX design",
      "web design guide",
    ],
    secondaryKeywords: [
      "mobile-first design",
      "user experience",
      "conversion optimization",
      "design systems",
      "accessibility",
      "performance",
    ],
    relatedServices: ["web-design", "ui-ux-design", "landing-page-design"],
    seoFocus: 'modern',
    intent: 'commercial',
    questionTypes: [
      'How to create modern web design in {city}',
      'What makes great web design in {city}',
      'Best web design trends for {city}',
      'Why invest in professional web design in {city}',
      'Web design costs in {city}'
    ],
    contentTemplates: {
      introduction:
        "Web design is constantly evolving, with new trends and technologies shaping how users interact with websites. This guide covers the latest design trends, best practices, and techniques that can help create engaging and effective websites.",
      keyPoints:
        "Modern web design focuses on user experience, mobile-first approach, accessibility, and performance. Key trends include minimalism, bold typography, micro-interactions, and sustainable design practices.",
      detailedContent:
        "Effective web design combines aesthetics with functionality. It involves understanding user behavior, creating intuitive navigation, optimizing for different devices, and ensuring fast loading times. Design systems help maintain consistency across all pages.",
      bestPractices:
        "Start with mobile-first design, use clear typography, maintain consistent branding, optimize images, and test across different devices. Focus on user needs and create intuitive user journeys.",
      toolsResources:
        "Popular design tools include Figma, Adobe XD, Sketch, and Webflow. For development, consider React, Next.js, and modern CSS frameworks. Testing tools like Lighthouse help ensure optimal performance.",
      caseStudies:
        "Our web design projects have resulted in 40-60% improvements in user engagement and conversion rates. One e-commerce client saw a 45% increase in sales after implementing our conversion-optimized design.",
      futureOutlook:
        "Web design will continue evolving with AI-powered design tools, voice interfaces, and immersive technologies. Focus on creating accessible, sustainable, and user-centered designs.",
      conclusion:
        "Great web design balances aesthetics with functionality. By staying updated with trends and focusing on user needs, you can create websites that not only look great but also drive business results.",
    },
  },
  {
    key: "digital-marketing",
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies and tactics",
    primaryKeywords: [
      "digital marketing",
      "online marketing",
      "marketing strategy",
      "digital advertising",
    ],
    secondaryKeywords: [
      "social media marketing",
      "email marketing",
      "content marketing",
      "PPC advertising",
      "marketing automation",
      "analytics",
    ],
    relatedServices: [
      "digital-marketing",
      "social-media-marketing",
      "ppc-ads",
      "email-marketing",
    ],
    seoFocus: 'multi-surface',
    intent: 'commercial',
    questionTypes: [
      'How to improve digital marketing in {city}',
      'What is digital marketing for {city} businesses',
      'Best digital marketing strategies in {city}',
      'Why digital marketing works in {city}',
      'Digital marketing pricing in {city}'
    ],
    contentTemplates: {
      introduction:
        "Digital marketing encompasses all marketing efforts that use digital channels to reach customers. This comprehensive guide covers the essential strategies and tactics that can help your business grow in the digital landscape.",
      keyPoints:
        "Digital marketing includes SEO, social media, email marketing, content marketing, and paid advertising. A successful strategy integrates multiple channels to create a cohesive customer experience.",
      detailedContent:
        "Digital marketing allows for precise targeting, real-time analytics, and cost-effective reach. It includes both organic strategies like SEO and content marketing, and paid strategies like PPC and social media advertising.",
      bestPractices:
        "Define clear goals, know your audience, create valuable content, use data to make decisions, and maintain consistent branding across all channels. Focus on building relationships rather than just selling.",
      toolsResources:
        "Essential tools include Google Analytics, Facebook Ads Manager, Mailchimp, Hootsuite, and HubSpot. These platforms help you manage campaigns, track performance, and optimize results.",
      caseStudies:
        "Our digital marketing campaigns have generated 300-500% ROI for clients. One B2B company achieved 400% increase in qualified leads through our integrated digital marketing approach.",
      futureOutlook:
        "Digital marketing will become more personalized and automated. AI and machine learning will play larger roles in targeting and optimization. Privacy regulations will require more transparent data practices.",
      conclusion:
        "Digital marketing success requires a strategic approach, consistent execution, and continuous optimization. By focusing on your audience's needs and leveraging the right tools, you can achieve significant business growth.",
    },
  },
  {
    key: "ecommerce",
    title: "E-commerce",
    description: "E-commerce strategies, optimization, and growth tactics",
    primaryKeywords: [
      "ecommerce optimization",
      "online store",
      "ecommerce strategy",
      "conversion optimization",
    ],
    secondaryKeywords: [
      "shopify optimization",
      "woocommerce",
      "cart abandonment",
      "product pages",
      "checkout optimization",
      "mobile commerce",
    ],
    relatedServices: [
      "ecommerce-development",
      "shopify-development",
      "conversion-optimization",
    ],
    seoFocus: 'traditional',
    intent: 'commercial',
    questionTypes: [
      'How to build ecommerce store in {city}',
      'What is ecommerce development in {city}',
      'Best ecommerce platforms for {city}',
      'Why choose ecommerce solutions in {city}',
      'Ecommerce development costs in {city}'
    ],
    contentTemplates: {
      introduction:
        "E-commerce success requires more than just having an online store. This guide covers the essential strategies for optimizing your e-commerce website, improving conversions, and growing your online business.",
      keyPoints:
        "Key e-commerce success factors include user experience, mobile optimization, fast loading times, secure checkout, and effective product presentation. Conversion optimization is crucial for maximizing sales.",
      detailedContent:
        "E-commerce optimization involves improving every aspect of the customer journey, from product discovery to checkout completion. This includes site speed, mobile responsiveness, product photography, and checkout flow optimization.",
      bestPractices:
        "Optimize for mobile, use high-quality product images, implement secure payment methods, provide clear product information, and streamline the checkout process. Focus on reducing cart abandonment rates.",
      toolsResources:
        "Essential e-commerce tools include Google Analytics, Hotjar, Optimizely, and various payment processors. Platforms like Shopify and WooCommerce offer built-in optimization features.",
      caseStudies:
        "Our e-commerce optimizations have resulted in 25-50% increases in conversion rates. One client saw a 60% improvement in mobile conversions after implementing our mobile-first optimization strategy.",
      futureOutlook:
        "E-commerce will continue evolving with AI-powered personalization, voice commerce, and augmented reality shopping experiences. Focus on creating seamless, personalized shopping experiences.",
      conclusion:
        "E-commerce success requires continuous optimization and adaptation to changing consumer behaviors. By focusing on user experience and conversion optimization, you can build a thriving online business.",
    },
  },
  {
    key: "content-marketing",
    title: "Content Marketing",
    description: "Content marketing strategies, creation, and distribution",
    primaryKeywords: [
      "content marketing",
      "content strategy",
      "blog marketing",
      "content creation",
    ],
    secondaryKeywords: [
      "content calendar",
      "blog writing",
      "content distribution",
      "content optimization",
      "storytelling",
      "brand voice",
    ],
    relatedServices: ["content-marketing", "seo-services", "digital-marketing"],
    seoFocus: 'modern',
    intent: 'informational',
    questionTypes: [
      'How to create content marketing strategy in {city}',
      'What is content marketing for {city} businesses',
      'Best content marketing practices in {city}',
      'Why content marketing works in {city}',
      'Content marketing costs in {city}'
    ],
    contentTemplates: {
      introduction:
        "Content marketing is about creating and distributing valuable content to attract and engage your target audience. This guide covers the strategies and tactics that can help you build authority and drive business growth through content.",
      keyPoints:
        "Effective content marketing requires understanding your audience, creating valuable content, maintaining consistency, and measuring results. It's about building relationships rather than just promoting products.",
      detailedContent:
        "Content marketing involves planning, creating, distributing, and measuring content across multiple channels. It includes blog posts, videos, podcasts, infographics, and social media content that provides value to your audience.",
      bestPractices:
        "Know your audience, create valuable content, maintain consistent publishing schedule, optimize for SEO, and promote across multiple channels. Focus on quality over quantity and measure what matters.",
      toolsResources:
        "Essential tools include WordPress, Canva, Hootsuite, Google Analytics, and content planning tools like CoSchedule. These help you create, schedule, and measure your content performance.",
      caseStudies:
        "Our content marketing strategies have helped businesses increase organic traffic by 200-400% and generate 300% more qualified leads. One client achieved 500% increase in brand awareness through our content strategy.",
      futureOutlook:
        "Content marketing will become more personalized and interactive. Video content, podcasts, and interactive content will play larger roles. AI will help with content creation and optimization.",
      conclusion:
        "Content marketing is a long-term strategy that builds trust and authority. By consistently creating valuable content that serves your audience, you can drive sustainable business growth.",
    },
  },
];

/**
 * Get blog category by key
 */
export function getBlogCategoryByKey(
  key: string
): BlogCategoryConfig | undefined {
  return blogCategories.find((cat) => cat.key === key);
}

/**
 * Get all blog categories
 */
export function getAllBlogCategories(): BlogCategoryConfig[] {
  return blogCategories;
}

/**
 * Generate blog content based on category and topic
 */
export function generateBlogContent(
  categoryKey: string,
  topic: string,
  locale: string = "en"
): {
  title: string;
  description: string;
  content: any;
} {
  const category = getBlogCategoryByKey(categoryKey);
  if (!category) {
    throw new Error(`Blog category not found: ${categoryKey}`);
  }

  // Generate dynamic title and description
  const title = `${topic} - Complete Guide | ${category.title}`;
  const description = `Learn everything about ${topic} with our comprehensive guide. Expert insights, best practices, and actionable strategies for ${category.title.toLowerCase()}.`;

  return {
    title,
    description,
    content: category.contentTemplates,
  };
}

// SEO strategy mapping based on modern vs traditional approach
export const seoStrategies = {
  traditional: {
    focus: 'keyword-first',
    metrics: ['traffic', 'rankings'],
    contentType: 'keyword-optimized',
    linkBuilding: 'backlinks-focused'
  },
  modern: {
    focus: 'intent-driven',
    metrics: ['visibility', 'brand-mentions', 'conversions'],
    contentType: 'semantic-structure',
    linkBuilding: 'co-citations'
  },
  'multi-surface': {
    focus: 'cross-platform',
    metrics: ['multi-channel-visibility', 'ai-mentions', 'social-shares'],
    contentType: 'ai-optimized',
    linkBuilding: 'brand-mentions'
  }
};

// Question intent mapping for better content optimization
export const questionIntents = {
  informational: {
    purpose: 'educate',
    contentFocus: 'comprehensive-explanation',
    callToAction: 'soft-lead-generation'
  },
  commercial: {
    purpose: 'influence-decision',
    contentFocus: 'value-proposition',
    callToAction: 'strong-conversion'
  },
  transactional: {
    purpose: 'drive-action',
    contentFocus: 'solution-focused',
    callToAction: 'immediate-contact'
  }
};

// Helper function to generate blog post questions for a location and service
export function generateBlogQuestions(city: string, state: string, service: string): Array<{category: string, question: string, intent: string}> {
  const questions: Array<{category: string, question: string, intent: string}> = [];
  
  questionBasedCategories.forEach(category => {
    category.questionTypes.forEach(template => {
      const question = template
        .replace(/{city}/g, city)
        .replace(/{state}/g, state)
        .replace(/{service}/g, service)
        .replace(/{alternative}/g, getAlternativeService(service));
      
      questions.push({
        category: category.key,
        question,
        intent: category.intent
      });
    });
  });
  
  return questions;
}

// Helper function to get alternative service for comparison posts
function getAlternativeService(service: string): string {
  const alternatives: Record<string, string> = {
    'web design': 'web development',
    'seo services': 'ppc advertising',
    'digital marketing': 'content marketing',
    'app development': 'web development',
    'ecommerce development': 'shopify development'
  };
  
  return alternatives[service.toLowerCase()] || 'custom solutions';
}
