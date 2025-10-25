// Improved category configuration - single source of truth
// All category data including keywords, pricing, timeline in one place

export interface CategoryConfig {
  key: string;
  title: string;
  description: string;
  services: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  priceRange: string;
  timeline: string;
  targetAudience: string;
}

export const categories: CategoryConfig[] = [
  {
    key: "web-design",
    title: "Web Design",
    description:
      "Professional web design services focused on modern, responsive, and SEO-friendly websites that drive conversions.",
    services: [
      "Custom Website Design",
      "Responsive Website Design",
      "Website Redesign Services",
      "UI/UX Web Design",
      "Landing Page Web Design",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "{category} in {city}",
    ],
    secondaryKeywords: [
      "custom website design {city}",
      "responsive web design {city}",
      "website redesign {city}",
      "ui ux design {city}",
      "landing page design {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$2,500–$8,000",
    timeline: "3–6 weeks",
    targetAudience: "Local businesses, startups, restaurants, clinics",
  },
  {
    key: "custom-web-development",
    title: "Custom Web Development",
    description:
      "Build fast, scalable, and secure web applications using Next.js, React, Node.js, and modern tech stacks.",
    services: [
      "Next.js Development",
      "React Development",
      "Node.js Development",
      "Modern Tech Stack Development",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "custom web app {city}",
    ],
    secondaryKeywords: [
      "next.js development {city}",
      "react developers {city}",
      "web app development {city}",
      "api integration {city}",
      "full stack development {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$10,000–$50,000",
    timeline: "8–16 weeks",
    targetAudience: "Tech startups, enterprises, SaaS companies",
  },
  {
    key: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "Build high-converting online stores and marketplaces with Shopify, WooCommerce, or custom eCommerce platforms.",
    services: [
      "E-commerce Website Design",
      "Online Shop Setup",
      "Multi-Vendor Marketplace",
      "Payment Gateway Integration",
      "E-commerce SEO Services",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "online store {city}",
    ],
    secondaryKeywords: [
      "ecommerce website design {city}",
      "shopify store {city}",
      "woocommerce development {city}",
      "multi vendor marketplace {city}",
      "payment gateway {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$5,000–$25,000",
    timeline: "6–12 weeks",
    targetAudience: "Online retailers, e-commerce brands, marketplaces",
  },
  {
    key: "shopify-development",
    title: "Shopify Development",
    description:
      "End-to-end Shopify solutions including store setup, theme customization, app integrations, and optimization.",
    services: [
      "Shopify Theme Customization",
      "Shopify Store Setup",
      "Shopify Plus Development",
      "Shopify SEO Optimization",
      "Shopify App Integration",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} expert",
      "shopify store {city}",
    ],
    secondaryKeywords: [
      "shopify theme customization {city}",
      "shopify plus agency {city}",
      "shopify seo {city}",
      "shopify app integration {city}",
      "custom shopify development {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$3,000–$15,000",
    timeline: "4–8 weeks",
    targetAudience: "E-commerce businesses, DTC brands, retail stores",
  },
  {
    key: "wordpress-development",
    title: "WordPress Development",
    description:
      "Custom WordPress websites with Elementor, WooCommerce, and SEO-optimized design for small businesses and blogs.",
    services: [
      "Custom WordPress Site",
      "Elementor Development",
      "WooCommerce Setup",
      "WordPress SEO",
      "WordPress Maintenance",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "wordpress website {city}",
    ],
    secondaryKeywords: [
      "custom wordpress site {city}",
      "elementor developer {city}",
      "woocommerce setup {city}",
      "wordpress seo {city}",
      "wordpress maintenance {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$2,000–$10,000",
    timeline: "2–6 weeks",
    targetAudience: "Small businesses, bloggers, content creators",
  },
  {
    key: "saas-development",
    title: "SaaS Development",
    description:
      "Develop scalable SaaS platforms with subscription billing, dashboards, and cloud-based multi-tenant architecture.",
    services: [
      "Multi-Tenant SaaS Development",
      "Subscription App Development",
      "SaaS Dashboard UI",
      "B2B SaaS Platform",
      "User Management System",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "saas app {city}",
    ],
    secondaryKeywords: [
      "multi tenant saas {city}",
      "subscription app {city}",
      "b2b saas {city}",
      "saas dashboard {city}",
      "saas product development {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$15,000–$100,000+",
    timeline: "3–9 months",
    targetAudience: "Startups, tech companies, enterprise businesses",
  },
  {
    key: "app-development",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile app development for iOS and Android with React Native and Flutter.",
    services: [
      "React Native App Development",
      "Flutter App Development",
      "iOS App Development",
      "Android App Development",
      "Mobile UI Design",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "mobile app {city}",
    ],
    secondaryKeywords: [
      "react native app {city}",
      "flutter app {city}",
      "ios app development {city}",
      "android app development {city}",
      "mobile ui design {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$20,000–$150,000",
    timeline: "4–12 months",
    targetAudience: "Startups, enterprises, consumer brands",
  },
  {
    key: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "End-to-end product design with user research, wireframing, prototyping, and usability testing for web and mobile apps.",
    services: [
      "UI/UX Audit",
      "Product Design Sprints",
      "Interactive Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "ui ux design {city}",
    ],
    secondaryKeywords: [
      "user experience design {city}",
      "user interface design {city}",
      "product design {city}",
      "design system {city}",
      "ux research {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$5,000–$25,000",
    timeline: "4–10 weeks",
    targetAudience: "SaaS products, mobile apps, digital products, scale-ups",
  },
  {
    key: "landing-page-design",
    title: "Landing Page Design",
    description:
      "Conversion-focused landing pages optimized for advertising, lead generation, and product launches.",
    services: [
      "High-Converting Landing Pages",
      "A/B Tested Landing Pages",
      "Lead Capture Page Design",
      "Responsive Landing Page Design",
      "Marketing Funnel Landing Page",
      "Product Launch Landing Page",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "landing page {city}",
    ],
    secondaryKeywords: [
      "high converting landing page {city}",
      "a/b testing landing page {city}",
      "lead capture page {city}",
      "marketing funnel page {city}",
      "product launch page {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,500–$5,000",
    timeline: "1–3 weeks",
    targetAudience: "Marketing campaigns, product launches, lead generation",
  },
  {
    key: "branding",
    title: "Branding & Identity",
    description:
      "Craft visual brand identity systems with logo, color palette, typography, and brand guidelines.",
    services: [
      "Logo Design",
      "Brand Identity Design",
      "Rebranding Services",
      "Brand Strategy",
      "Brand Guidelines",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "branding {city}",
    ],
    secondaryKeywords: [
      "logo design {city}",
      "brand identity {city}",
      "rebranding services {city}",
      "brand strategy {city}",
      "brand guidelines {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$3,000–$15,000",
    timeline: "4–8 weeks",
    targetAudience: "Startups, rebrands, new businesses",
  },
  {
    key: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Performance marketing, paid ads, and growth strategies for brands in all industries.",
    services: [
      "Performance Marketing",
      "Paid Media Campaigns",
      "Google Ads Management",
      "Meta Ads Management",
      "Digital Growth Strategy",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "digital marketing {city}",
    ],
    secondaryKeywords: [
      "performance marketing {city}",
      "google ads {city}",
      "meta ads {city}",
      "digital growth strategy {city}",
      "paid media {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,500–$10,000/mo",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "All business types, especially e-commerce and B2B",
  },
  {
    key: "social-media-marketing",
    title: "Social Media Marketing",
    description:
      "Grow your brand across Instagram, TikTok, YouTube, and LinkedIn with strategy, content, and ads.",
    services: [
      "Instagram Marketing",
      "TikTok Content Strategy",
      "UGC Content Creation",
      "Social Media Management",
      "Video Content Production",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "social media {city}",
    ],
    secondaryKeywords: [
      "instagram marketing {city}",
      "tiktok marketing {city}",
      "ugc content {city}",
      "social media management {city}",
      "video content {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,000–$5,000/mo",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "E-commerce brands, local businesses, personal brands",
  },
  {
    key: "seo-services",
    title: "SEO Services",
    description:
      "Technical SEO, on-page optimization, backlink building, and keyword strategy for global search ranking.",
    services: [
      "Technical SEO Audit",
      "Keyword Research",
      "On-Page Optimization",
      "Link Building Services",
      "Search Visibility Improvement",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "seo {city}",
    ],
    secondaryKeywords: [
      "technical seo {city}",
      "keyword research {city}",
      "on-page seo {city}",
      "link building {city}",
      "search ranking {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,000–$5,000/mo",
    timeline: "Ongoing (min. 6 months)",
    targetAudience: "Businesses seeking organic growth, content publishers",
  },
  {
    key: "local-seo",
    title: "Local SEO",
    description:
      "Optimize Google Maps listings and local search presence with Google Business Profile management.",
    services: [
      "Google Business Profile Optimization",
      "Maps Ranking Improvement",
      "Local Citations",
      "Near Me SEO",
      "Review Management",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} expert",
      "local seo {city}",
    ],
    secondaryKeywords: [
      "google maps optimization {city}",
      "gmb ranking {city}",
      "local citations {city}",
      "near me seo {city}",
      "review management {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$800–$3,000/mo",
    timeline: "2–4 weeks setup + ongoing",
    targetAudience: "Local service providers, retail stores, restaurants",
  },
  {
    key: "content-marketing",
    title: "Content Marketing",
    description:
      "SEO-driven content strategy, blog writing, and AI-powered copywriting for brand visibility.",
    services: [
      "Blog Writing Services",
      "SEO Content Strategy",
      "AI Content Writing",
      "Copywriting for Landing Pages",
      "Content Performance Audit",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "content marketing {city}",
    ],
    secondaryKeywords: [
      "seo blog writing {city}",
      "ai copywriting {city}",
      "content strategy {city}",
      "copywriting services {city}",
      "content audit {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,500–$6,000/mo",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "B2B companies, SaaS, thought leaders",
  },
  {
    key: "email-marketing",
    title: "Email Marketing",
    description:
      "Automated email sequences, newsletters, and CRM-based marketing workflows for customer retention.",
    services: [
      "Email Automation Setup",
      "Newsletter Creation",
      "Klaviyo Expert Services",
      "Drip Campaigns",
      "CRM Email Marketing",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "email marketing {city}",
    ],
    secondaryKeywords: [
      "email automation {city}",
      "newsletter design {city}",
      "klaviyo automation {city}",
      "drip campaigns {city}",
      "crm email {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$500–$3,000/mo",
    timeline: "2–4 weeks setup + ongoing",
    targetAudience: "E-commerce, SaaS, subscription businesses",
  },
  {
    key: "crm-development",
    title: "CRM Development",
    description:
      "Build custom CRM platforms with lead management, automation, and analytics dashboards.",
    services: [
      "Custom CRM Development",
      "Sales Dashboard",
      "HubSpot Alternative",
      "CRM API Integration",
      "Lead Management System",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "crm software {city}",
    ],
    secondaryKeywords: [
      "custom crm {city}",
      "sales dashboard {city}",
      "hubspot alternative {city}",
      "crm api integration {city}",
      "lead management {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$10,000–$50,000",
    timeline: "8–16 weeks",
    targetAudience: "Sales teams, service businesses, B2B companies",
  },
  {
    key: "erp-software",
    title: "ERP Software Development",
    description:
      "Enterprise resource planning systems for inventory, HR, accounting, and business automation.",
    services: [
      "Inventory Management System",
      "Accounting Software",
      "HR Management App",
      "Business Automation ERP",
      "Custom ERP Module Development",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "erp software {city}",
    ],
    secondaryKeywords: [
      "inventory management {city}",
      "accounting software {city}",
      "hr management app {city}",
      "business automation erp {city}",
      "custom erp {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$25,000–$200,000",
    timeline: "6–18 months",
    targetAudience: "Manufacturing, distribution, enterprise businesses",
  },
  {
    key: "ai-integration",
    title: "AI Integration",
    description:
      "Integrate AI technologies like ChatGPT and OpenAI API into your products for automation and insights.",
    services: [
      "ChatGPT Integration",
      "AI Chatbot Development",
      "OpenAI API Integration",
      "AI-Powered Automation",
      "Machine Learning Tools",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "ai integration {city}",
    ],
    secondaryKeywords: [
      "chatgpt integration {city}",
      "ai chatbot {city}",
      "openai api {city}",
      "ai automation {city}",
      "machine learning {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$5,000–$50,000",
    timeline: "4–12 weeks",
    targetAudience: "Tech companies, automation seekers, innovators",
  },
  {
    key: "automation",
    title: "Workflow Automation",
    description:
      "Automate repetitive business processes using Zapier, Make.com, and custom API integrations.",
    services: [
      "Zapier Automation",
      "Make.com Workflows",
      "API-Based Automation",
      "CRM Workflow Automation",
      "Business Process Automation",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} expert",
      "workflow automation {city}",
    ],
    secondaryKeywords: [
      "zapier automation {city}",
      "make.com workflows {city}",
      "api automation {city}",
      "crm automation {city}",
      "business process automation {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$2,000–$15,000",
    timeline: "2–8 weeks",
    targetAudience: "Businesses with repetitive processes, agencies",
  },
  {
    key: "software-consulting",
    title: "Software Consulting",
    description:
      "Technology strategy, system architecture design, and digital transformation advisory.",
    services: [
      "IT Consulting Services",
      "System Architecture Design",
      "Digital Transformation Strategy",
      "Technology Stack Planning",
      "Scalability and Security Audit",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "software consulting {city}",
    ],
    secondaryKeywords: [
      "it consulting {city}",
      "system architecture {city}",
      "digital transformation {city}",
      "tech stack planning {city}",
      "security audit {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$150–$300/hr",
    timeline: "Project-based",
    targetAudience: "Enterprises, startups, digital transformation projects",
  },
  {
    key: "crm-portal-apps",
    title: "CRM & Portal Apps",
    description:
      "Custom CRM and portal applications for business automation and customer engagement.",
    services: [
      "Custom CRM Development",
      "Sales Dashboard",
      "HubSpot Alternative",
      "CRM API Integration",
      "Lead Management System",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} company",
      "crm portal {city}",
    ],
    secondaryKeywords: [
      "custom crm {city}",
      "sales dashboard {city}",
      "hubspot alternative {city}",
      "crm api integration {city}",
      "lead management {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$10,000–$50,000",
    timeline: "8–16 weeks",
    targetAudience: "Sales teams, service businesses, B2B companies",
  },
  {
    key: "conversion-optimization",
    title: "Conversion Rate Optimization",
    description:
      "Optimize websites and funnels with A/B testing, analytics, and user behavior analysis to boost conversions.",
    services: [
      "A/B Testing",
      "User Behavior Analysis",
      "Funnel Optimization",
      "Landing Page Optimization",
      "Conversion Tracking Setup",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "conversion optimization {city}",
    ],
    secondaryKeywords: [
      "a/b testing {city}",
      "user behavior analysis {city}",
      "funnel optimization {city}",
      "landing page optimization {city}",
      "conversion tracking {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$2,000–$10,000/mo",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "E-commerce, SaaS, lead generation campaigns",
  },
  {
    key: "ppc-ads",
    title: "PPC Advertising",
    description:
      "Targeted pay-per-click campaigns on Google Ads, Meta, and other platforms for instant traffic and leads.",
    services: [
      "Google Ads Campaigns",
      "Meta Ads Management",
      "PPC Campaign Optimization",
      "Retargeting Ads",
      "Ad Copywriting",
    ],
    primaryKeywords: [
      "{category} {city}",
      "{city} {category} agency",
      "ppc advertising {city}",
    ],
    secondaryKeywords: [
      "google ads {city}",
      "meta ads {city}",
      "ppc campaign {city}",
      "retargeting ads {city}",
      "ad copywriting {city}",
      "best {category} {city}",
      "{category} near me {city}",
    ],
    priceRange: "$1,000–$7,000/mo",
    timeline: "Ongoing (min. 3 months)",
    targetAudience: "E-commerce, local businesses, B2B companies",
  },
  {
    key: "custom-panel-development",
    title: "Custom Panel & Dashboard Development",
    description:
      "Develop secure, scalable, and intuitive admin panels, dashboards, and SaaS control systems for your business processes.",
    services: [
      "Admin Panel Development",
      "Custom Dashboard Design",
      "Student or Bursary System Panels",
      "Analytics Dashboard Development",
      "SaaS Control Panel UI/UX",
    ],
    primaryKeywords: [
      "custom panel development {city}",
      "admin dashboard {city}",
      "{city} panel development company",
    ],
    secondaryKeywords: [
      "saas panel development {city}",
      "dashboard design {city}",
      "admin dashboard development {city}",
      "custom admin panel {city}",
      "bursary system panel {city}",
      "crm dashboard {city}",
      "best dashboard development {city}",
    ],
    priceRange: "$5,000–$50,000",
    timeline: "6–12 weeks",
    targetAudience:
      "Startups, SaaS companies, educational platforms, businesses needing custom control systems",
  },
];

export const PRIORITY_CATEGORY_KEYS = [
  "web-design",
  "custom-web-development",
  "digital-marketing",
  "seo-services",
  "local-seo",
  "ecommerce-development",
  "branding",
  "content-marketing",
  "app-development",
  "ui-ux-design",
  "conversion-optimization",
  "ppc-ads",
  "custom-panel-development",
] as const;

export type PriorityCategoryKey = (typeof PRIORITY_CATEGORY_KEYS)[number];

const priorityCategoryLookup = new Set<string>(PRIORITY_CATEGORY_KEYS);

export const priorityCategories = categories.filter((category) =>
  priorityCategoryLookup.has(category.key)
);

/**
 * Fill keyword templates with actual location data
 * Replaces {category}, {city}, {state}, {country} with real values
 */
export function fillKeywords(
  keywords: string[],
  categoryTitle: string,
  city: string,
  state: string,
  country: string
): string[] {
  return keywords.map((kw) =>
    kw
      .replace(/{category}/g, categoryTitle.toLowerCase())
      .replace(/{city}/g, city)
      .replace(/{state}/g, state)
      .replace(/{country}/g, country)
  );
}

/**
 * Get category by key
 */
export function getCategoryByKey(key: string): CategoryConfig | undefined {
  return categories.find((cat) => cat.key === key);
}

/**
 * Get benefit text for meta titles
 */
export function getBenefitText(categoryKey: string): string {
  const benefits: Record<string, string> = {
    "web-design": "Custom, Conversion-Focused Design",
    "custom-web-development": "Scalable, Modern Solutions",
    "ecommerce-development": "High-Converting Online Stores",
    "shopify-development": "E-commerce Stores That Sell",
    "wordpress-development": "SEO-Optimized WordPress Sites",
    "saas-development": "Scalable SaaS Products",
    "app-development": "Native & Cross-Platform Apps",
    "ui-ux-design": "User-Centered Design",
    "landing-page-design": "High-Converting Pages",
    branding: "Strategic Brand Identity",
    "digital-marketing": "ROI-Focused Marketing",
    "social-media-marketing": "Engaging Social Presence",
    "seo-services": "Top Search Rankings",
    "local-seo": "Dominate Local Search",
    "content-marketing": "Authority-Building Content",
    "email-marketing": "Automated Email Campaigns",
    "crm-development": "Custom CRM Solutions",
    "erp-software": "Enterprise Resource Planning",
    "ai-integration": "AI-Powered Automation",
    automation: "Workflow Automation",
    "software-consulting": "Expert Tech Strategy",
    "crm-portal-apps": "Business Automation Platforms",
    "conversion-optimization": "Data-Driven Growth",
    "ppc-ads": "ROI-Focused Advertising",
  };
  return benefits[categoryKey] || "Professional Digital Services";
}
