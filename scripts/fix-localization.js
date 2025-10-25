#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Since we can't import TypeScript modules directly, we'll embed the required functions
function getVariationSeed(city, category, locale = 'en', variants = 5) {
  let hash = 0;
  const s = `${city}|${category}|${locale}`;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash) % variants;
  return seed;
}

function getVariationText(locale, section, seed, city, category) {
  const localeVariations = variations[locale];
  if (!localeVariations) return '';
  
  const sectionVariations = localeVariations[section];
  if (!sectionVariations) return '';
  
  const selectedVariation = sectionVariations[seed % sectionVariations.length];
  
  if (typeof selectedVariation === 'function' && city && category) {
    return selectedVariation(city, category);
  }
  
  let text = selectedVariation;
  
  // Replace placeholders
  if (city) text = text.replace(/{city}/g, city);
  if (category) text = text.replace(/{category}/g, category);
  
  return text;
}

const variations = {
  de: {
    intro: [
      (city, category) => `Professionelle ${category.toLowerCase()}-Lösungen jetzt in ${city} verfügbar.`,
      (city, category) => `${city} - Ihr Partner für erstklassige ${category.toLowerCase()}-Services.`,
      (city, category) => `Maßgeschneiderte ${category.toLowerCase()}-Dienstleistungen speziell für ${city}.`,
      (city, category) => `${city}: Wo Innovation auf bewährte ${category.toLowerCase()}-Expertise trifft.`,
      (city, category) => `Entdecken Sie führende ${category.toLowerCase()}-Services in ${city}.`
    ],
    whyChoose: [
      'Warum uns für {category} in {city} wählen?',
      'Ihre Vorteile bei {category} in {city}',
      'Unser Versprechen für {city}',
      'Was uns in {city} auszeichnet',
      'Warum wir die richtige Wahl für {city} sind'
    ],
    benefits: [
      'Modernste, skalierbare Lösungen',
      'Innovative, zukunftssichere Systeme',
      'Bewährte, leistungsstarke Technologien',
      'Professionelle, maßgeschneiderte Services',
      'Erstklassige, zuverlässige Lösungen'
    ],
    timeline: [
      'Schnelle 6–12 Wochen Lieferung',
      'Zügige 6–12 Wochen Umsetzung',
      'Effiziente 6–12 Wochen Entwicklung',
      'Rasche 6–12 Wochen Realisierung',
      'Prompte 6–12 Wochen Fertigstellung'
    ],
    expertise: [
      'Lokale {city} Expertise',
      'Regionale {city} Kompetenz',
      'Ortskundige {city} Erfahrung',
      '{city} Marktkenntnis',
      'Lokales {city} Know-how'
    ]
  },
  fr: {
    intro: [
      (city, category) => `Solutions professionnelles de ${category.toLowerCase()} maintenant disponibles à ${city}.`,
      (city, category) => `${city} - Votre partenaire pour des services ${category.toLowerCase()} de premier plan.`,
      (city, category) => `Services ${category.toLowerCase()} sur mesure spécialement pour ${city}.`,
      (city, category) => `${city} : Où l'innovation rencontre l'expertise ${category.toLowerCase()} éprouvée.`,
      (city, category) => `Découvrez les services ${category.toLowerCase()} de pointe à ${city}.`
    ],
    whyChoose: [
      'Pourquoi choisir Moydus pour {category} à {city} ?',
      'Vos avantages avec {category} à {city}',
      'Notre promesse pour {city}',
      'Ce qui nous distingue à {city}',
      'Pourquoi nous sommes le bon choix pour {city}'
    ],
    benefits: [
      'Solutions modernes et évolutives',
      'Systèmes innovants et pérennes',
      'Technologies éprouvées haute performance',
      'Services professionnels sur mesure',
      'Solutions excellentes et fiables'
    ],
    timeline: [
      'Livraison rapide 6–12 semaines',
      'Mise en œuvre rapide 6–12 semaines',
      'Développement efficace 6–12 semaines',
      'Réalisation rapide 6–12 semaines',
      'Achèvement prompt 6–12 semaines'
    ],
    expertise: [
      'Expertise locale {city}',
      'Compétence régionale {city}',
      'Expérience locale {city}',
      'Connaissance du marché {city}',
      'Savoir-faire local {city}'
    ]
  },
  ar: {
    intro: [
      (city, category) => `حلول ${category} احترافية متاحة الآن في ${city}.`,
      (city, category) => `${city} - شريكك في خدمات ${category} المتميزة.`,
      (city, category) => `خدمات ${category} مخصصة خصيصاً لـ ${city}.`,
      (city, category) => `${city}: حيث تلتقي الابتكار بخبرة ${category} المؤكدة.`,
      (city, category) => `اكتشف خدمات ${category} الرائدة في ${city}.`
    ],
    whyChoose: [
      'لماذا تختار Moydus لـ {category} في {city}؟',
      'مزاياكم مع {category} في {city}',
      'وعدنا لعملاء {city}',
      'ما يميزنا في {city}',
      'لماذا نحن الخيار الصحيح لـ {city}'
    ],
    benefits: [
      'حلول حديثة قابلة للتوسع',
      'أنظمة مبتكرة مستقبلية',
      'تقنيات مؤكدة عالية الأداء',
      'خدمات احترافية مخصصة',
      'حلول ممتازة موثوقة'
    ],
    timeline: [
      'تسليم سريع ٦-١٢ أسبوع',
      'تنفيذ سريع ٦-١٢ أسبوع',
      'تطوير فعال ٦-١٢ أسبوع',
      'إنجاز سريع ٦-١٢ أسبوع',
      'إتمام فوري ٦-١٢ أسبوع'
    ],
    expertise: [
      'خبرة محلية في {city}',
      'كفاءة إقليمية في {city}',
      'تجربة محلية في {city}',
      'معرفة سوق {city}',
      'خبرة {city} المحلية'
    ]
  }
};

const categoryTranslations = {
  de: {
    'custom-web-development': 'Maßgeschneiderte Webentwicklung',
    'web-design': 'Webdesign',
    'local-seo': 'Lokale SEO',
    'ecommerce-development': 'E-Commerce Entwicklung',
    'app-development': 'App-Entwicklung',
    'digital-marketing': 'Digital Marketing',
    'ppc-ads': 'PPC-Werbung',
    'social-media-marketing': 'Social Media Marketing',
    'content-marketing': 'Content Marketing',
    'email-marketing': 'E-Mail Marketing',
    'automation': 'Automatisierung',
    'crm-development': 'CRM-Entwicklung',
    'saas-development': 'SaaS-Entwicklung',
    'ui-ux-design': 'UI/UX Design',
    'branding': 'Branding',
    'seo-services': 'SEO-Services',
    'conversion-optimization': 'Conversion-Optimierung',
    'landing-page-design': 'Landing Page Design',
    'wordpress-development': 'WordPress-Entwicklung',
    'shopify-development': 'Shopify-Entwicklung',
    'ai-integration': 'KI-Integration',
    'erp-software': 'ERP-Software',
    'software-consulting': 'Software-Beratung'
  },
  fr: {
    'custom-web-development': 'Développement Web Sur Mesure',
    'web-design': 'Conception Web',
    'local-seo': 'SEO Local',
    'ecommerce-development': 'Développement E-commerce',
    'app-development': 'Développement d\'Applications',
    'digital-marketing': 'Marketing Digital',
    'ppc-ads': 'Publicité PPC',
    'social-media-marketing': 'Marketing des Médias Sociaux',
    'content-marketing': 'Marketing de Contenu',
    'email-marketing': 'Marketing par E-mail',
    'automation': 'Automatisation',
    'crm-development': 'Développement CRM',
    'saas-development': 'Développement SaaS',
    'ui-ux-design': 'Design UI/UX',
    'branding': 'Image de Marque',
    'seo-services': 'Services SEO',
    'conversion-optimization': 'Optimisation de Conversion',
    'landing-page-design': 'Conception de Pages d\'Atterrissage',
    'wordpress-development': 'Développement WordPress',
    'shopify-development': 'Développement Shopify',
    'ai-integration': 'Intégration IA',
    'erp-software': 'Logiciel ERP',
    'software-consulting': 'Conseil en Logiciels'
  },
  ar: {
    'custom-web-development': 'تطوير المواقع المخصصة',
    'web-design': 'تصميم المواقع',
    'local-seo': 'SEO المحلي',
    'ecommerce-development': 'تطوير التجارة الإلكترونية',
    'app-development': 'تطوير التطبيقات',
    'digital-marketing': 'التسويق الرقمي',
    'ppc-ads': 'إعلانات PPC',
    'social-media-marketing': 'تسويق وسائل التواصل الاجتماعي',
    'content-marketing': 'تسويق المحتوى',
    'email-marketing': 'التسويق عبر البريد الإلكتروني',
    'automation': 'الأتمتة',
    'crm-development': 'تطوير CRM',
    'saas-development': 'تطوير SaaS',
    'ui-ux-design': 'تصميم UI/UX',
    'branding': 'العلامة التجارية',
    'seo-services': 'خدمات SEO',
    'conversion-optimization': 'تحسين التحويل',
    'landing-page-design': 'تصميم صفحات الهبوط',
    'wordpress-development': 'تطوير WordPress',
    'shopify-development': 'تطوير Shopify',
    'ai-integration': 'تكامل الذكاء الاصطناعي',
    'erp-software': 'برامج ERP',
    'software-consulting': 'استشارات البرمجيات'
  },
  nl: {
    'custom-web-development': 'Maatwerk Webontwikkeling',
    'web-design': 'Webdesign',
    'local-seo': 'Lokale SEO',
    'ecommerce-development': 'E-commerce Ontwikkeling',
    'app-development': 'App Ontwikkeling',
    'digital-marketing': 'Digitale Marketing',
    'ppc-ads': 'PPC Advertenties',
    'social-media-marketing': 'Social Media Marketing',
    'content-marketing': 'Content Marketing',
    'email-marketing': 'E-mail Marketing',
    'automation': 'Automatisering',
    'crm-development': 'CRM Ontwikkeling',
    'saas-development': 'SaaS Ontwikkeling',
    'ui-ux-design': 'UI/UX Design',
    'branding': 'Branding',
    'seo-services': 'SEO Services',
    'conversion-optimization': 'Conversie Optimalisatie',
    'landing-page-design': 'Landing Page Design',
    'wordpress-development': 'WordPress Ontwikkeling',
    'shopify-development': 'Shopify Ontwikkeling',
    'ai-integration': 'AI Integratie',
    'erp-software': 'ERP Software',
    'software-consulting': 'Software Consultancy'
  },
  sv: {
    'custom-web-development': 'Skräddarsydd Webbutveckling',
    'web-design': 'Webbdesign',
    'local-seo': 'Lokal SEO',
    'ecommerce-development': 'E-handel Utveckling',
    'app-development': 'Apputveckling',
    'digital-marketing': 'Digital Marknadsföring',
    'ppc-ads': 'PPC Annonser',
    'social-media-marketing': 'Social Media Marknadsföring',
    'content-marketing': 'Innehållsmarknadsföring',
    'email-marketing': 'E-post Marknadsföring',
    'automation': 'Automatisering',
    'crm-development': 'CRM Utveckling',
    'saas-development': 'SaaS Utveckling',
    'ui-ux-design': 'UI/UX Design',
    'branding': 'Varumärkning',
    'seo-services': 'SEO Tjänster',
    'conversion-optimization': 'Konverteringsoptimering',
    'landing-page-design': 'Landing Page Design',
    'wordpress-development': 'WordPress Utveckling',
    'shopify-development': 'Shopify Utveckling',
    'ai-integration': 'AI Integration',
    'erp-software': 'ERP Programvara',
    'software-consulting': 'Mjukvarukonsultation'
  },
  no: {
    'custom-web-development': 'Skreddersydd Webutvikling',
    'web-design': 'Webdesign',
    'local-seo': 'Lokal SEO',
    'ecommerce-development': 'E-handel Utvikling',
    'app-development': 'App Utvikling',
    'digital-marketing': 'Digital Markedsføring',
    'ppc-ads': 'PPC Annonser',
    'social-media-marketing': 'Sosiale Medier Markedsføring',
    'content-marketing': 'Innholdsmarkedsføring',
    'email-marketing': 'E-post Markedsføring',
    'automation': 'Automatisering',
    'crm-development': 'CRM Utvikling',
    'saas-development': 'SaaS Utvikling',
    'ui-ux-design': 'UI/UX Design',
    'branding': 'Merkevarebygging',
    'seo-services': 'SEO Tjenester',
    'conversion-optimization': 'Konverteringsoptimalisering',
    'landing-page-design': 'Landing Page Design',
    'wordpress-development': 'WordPress Utvikling',
    'shopify-development': 'Shopify Utvikling',
    'ai-integration': 'AI Integrasjon',
    'erp-software': 'ERP Programvare',
    'software-consulting': 'Programvare Konsultasjon'
  },
  ja: {
    'custom-web-development': 'カスタムウェブ開発',
    'web-design': 'ウェブデザイン',
    'local-seo': 'ローカルSEO',
    'ecommerce-development': 'Eコマース開発',
    'app-development': 'アプリ開発',
    'digital-marketing': 'デジタルマーケティング',
    'ppc-ads': 'PPC広告',
    'social-media-marketing': 'ソーシャルメディアマーケティング',
    'content-marketing': 'コンテンツマーケティング',
    'email-marketing': 'メールマーケティング',
    'automation': '自動化',
    'crm-development': 'CRM開発',
    'saas-development': 'SaaS開発',
    'ui-ux-design': 'UI/UXデザイン',
    'branding': 'ブランディング',
    'seo-services': 'SEOサービス',
    'conversion-optimization': 'コンバージョン最適化',
    'landing-page-design': 'ランディングページデザイン',
    'wordpress-development': 'WordPress開発',
    'shopify-development': 'Shopify開発',
    'ai-integration': 'AI統合',
    'erp-software': 'ERPソフトウェア',
    'software-consulting': 'ソフトウェアコンサルティング'
  },
  ko: {
    'custom-web-development': '맞춤형 웹 개발',
    'web-design': '웹 디자인',
    'local-seo': '로컬 SEO',
    'ecommerce-development': '이커머스 개발',
    'app-development': '앱 개발',
    'digital-marketing': '디지털 마케팅',
    'ppc-ads': 'PPC 광고',
    'social-media-marketing': '소셜 미디어 마케팅',
    'content-marketing': '콘텐츠 마케팅',
    'email-marketing': '이메일 마케팅',
    'automation': '자동화',
    'crm-development': 'CRM 개발',
    'saas-development': 'SaaS 개발',
    'ui-ux-design': 'UI/UX 디자인',
    'branding': '브랜딩',
    'seo-services': 'SEO 서비스',
    'conversion-optimization': '전환 최적화',
    'landing-page-design': '랜딩 페이지 디자인',
    'wordpress-development': 'WordPress 개발',
    'shopify-development': 'Shopify 개발',
    'ai-integration': 'AI 통합',
    'erp-software': 'ERP 소프트웨어',
    'software-consulting': '소프트웨어 컨설팅'
  }
};

// Country data for proper localization
const countryData = {
  'de': {
    currency: '€',
    priceRange: '8.000–25.000€',
    phone: '+49',
    businessHours: '08:00–18:00 Uhr',
    timezone: 'Europe/Berlin'
  },
  'fr': {
    currency: '€',
    priceRange: '8 000–25 000€',
    phone: '+33',
    businessHours: '08h00–18h00',
    timezone: 'Europe/Paris'
  },
  'ar': {
    currency: 'ر.س',
    priceRange: '30,000–95,000 ر.س',
    phone: '+966',
    businessHours: '08:00–18:00',
    timezone: 'Asia/Riyadh'
  }
};

function generateLocalizedContent(locale, country, state, city, category) {
  const seed = getVariationSeed(city, category, locale);
  const translatedCategory = categoryTranslations[locale]?.[category] || category;
  
  // Generate varied content using the variation system
  const intro = getVariationText(locale, 'intro', seed, city, translatedCategory);
  const whyChoose = getVariationText(locale, 'whyChoose', seed + 1, city, translatedCategory);
  const benefits = getVariationText(locale, 'benefits', seed + 2, city, translatedCategory);
  const timeline = getVariationText(locale, 'timeline', seed + 3, city, translatedCategory);
  const expertise = getVariationText(locale, 'expertise', seed + 4, city, translatedCategory);
  
  const localeData = countryData[locale] || countryData['de'];
  
  // Generate localized pricing
  const basePriceMin = 8000;
  const basePriceMax = 25000;
  const priceVariation = (seed % 3) * 1000;
  const finalMin = basePriceMin + priceVariation;
  const finalMax = basePriceMax + priceVariation;
  
  let localizedPrice;
  if (locale === 'ar') {
    const sarMin = Math.round(finalMin * 3.75);
    const sarMax = Math.round(finalMax * 3.75);
    localizedPrice = `${sarMin.toLocaleString('ar-SA')}–${sarMax.toLocaleString('ar-SA')} ر.س`;
  } else {
    localizedPrice = `${finalMin.toLocaleString(locale)}–${finalMax.toLocaleString(locale)}${localeData.currency}`;
  }

  // Generate FAQ content based on locale
  const faqContent = generateFAQ(locale, city, translatedCategory, localizedPrice);
  
  // Generate testimonials
  const testimonials = generateTestimonials(locale, city, seed);
  
  return {
    intro,
    whyChoose,
    benefits,
    timeline,
    expertise,
    localizedPrice,
    faqContent,
    testimonials,
    localeData
  };
}

function generateFAQ(locale, city, category, price) {
  const faqs = {
    'de': [
      {
        q: `Was kostet ${category} in ${city}?`,
        a: `Die Kosten für ${category} in ${city} beginnen bei ${price}. Der finale Preis hängt von Ihren spezifischen Anforderungen und dem Projektumfang ab.`
      },
      {
        q: `Wie lange dauert die Entwicklung?`,
        a: `Typische Projekte in ${city} dauern 6-12 Wochen, abhängig von der Komplexität und den gewünschten Features.`
      },
      {
        q: `Bieten Sie lokalen Support in ${city}?`,
        a: `Ja, wir bieten vollständigen lokalen Support für alle unsere Kunden in ${city} und Umgebung.`
      }
    ],
    'fr': [
      {
        q: `Combien coûte ${category} à ${city} ?`,
        a: `Les coûts pour ${category} à ${city} commencent à ${price}. Le prix final dépend de vos exigences spécifiques et de la portée du projet.`
      },
      {
        q: `Combien de temps prend le développement ?`,
        a: `Les projets typiques à ${city} prennent 6-12 semaines, selon la complexité et les fonctionnalités désirées.`
      },
      {
        q: `Offrez-vous un support local à ${city} ?`,
        a: `Oui, nous offrons un support local complet pour tous nos clients à ${city} et dans les environs.`
      }
    ],
    'ar': [
      {
        q: `كم تكلفة ${category} في ${city}؟`,
        a: `تبدأ تكاليف ${category} في ${city} من ${price}. السعر النهائي يعتمد على متطلباتك المحددة ونطاق المشروع.`
      },
      {
        q: `كم من الوقت يستغرق التطوير؟`,
        a: `المشاريع النموذجية في ${city} تستغرق 6-12 أسبوع، حسب التعقيد والميزات المطلوبة.`
      },
      {
        q: `هل تقدمون دعم محلي في ${city}؟`,
        a: `نعم، نقدم دعم محلي كامل لجميع عملائنا في ${city} والمناطق المحيطة.`
      }
    ]
  };
  
  return faqs[locale] || faqs['de'];
}

function generateTestimonials(locale, city, seed) {
  const testimonials = {
    'de': [
      {
        name: "Thomas M.",
        company: `Lokales Unternehmen ${city}`,
        text: "Exzellente Arbeit und professionelle Betreuung. Sehr empfehlenswert!"
      },
      {
        name: "Sarah K.",
        company: `${city} Solutions GmbH`,
        text: "Schnelle Umsetzung und hervorragende Qualität. Genau was wir brauchten."
      }
    ],
    'fr': [
      {
        name: "Pierre D.",
        company: `Entreprise locale ${city}`,
        text: "Excellent travail et accompagnement professionnel. Très recommandé !"
      },
      {
        name: "Marie L.",
        company: `${city} Solutions SARL`,
        text: "Mise en œuvre rapide et qualité exceptionnelle. Exactement ce dont nous avions besoin."
      }
    ],
    'ar': [
      {
        name: "أحمد م.",
        company: `شركة محلية في ${city}`,
        text: "عمل ممتاز ومتابعة احترافية. أنصح به بشدة!"
      },
      {
        name: "فاطمة ك.",
        company: `${city} للحلول المحدودة`,
        text: "تنفيذ سريع وجودة استثنائية. بالضبط ما احتجناه."
      }
    ]
  };
  
  const localeTestimonials = testimonials[locale] || testimonials['de'];
  return localeTestimonials.slice(0, 2);
}

function createMDXContent(locale, country, state, city, category, content) {
  const { intro, whyChoose, benefits, timeline, expertise, localizedPrice, faqContent, testimonials, localeData } = content;
  const translatedCategory = categoryTranslations[locale]?.[category] || category;
  
  const canonicalUrl = `https://moydus.com/${locale}/${country}/${state}/${city}/${category}`;
  const title = locale === 'ar' 
    ? `${translatedCategory} في ${city} - حلول احترافية | Moydus`
    : locale === 'fr'
    ? `${translatedCategory} à ${city} - Solutions Professionnelles | Moydus`
    : `${translatedCategory} in ${city} - Professionelle Lösungen | Moydus`;
  
  const description = locale === 'ar'
    ? `خدمات ${translatedCategory} احترافية في ${city}. حلول مخصصة وتنفيذ سريع من ${localizedPrice}.`
    : locale === 'fr'
    ? `Services ${translatedCategory} professionnels à ${city}. Solutions sur mesure et mise en œuvre rapide à partir de ${localizedPrice}.`
    : `Professionelle ${translatedCategory} Services in ${city}. Maßgeschneiderte Lösungen und schnelle Umsetzung ab ${localizedPrice}.`;

  return `---
title: "${title}"
description: "${description}"
locale: "${locale}"
canonical: "${canonicalUrl}"
alternates:
  canonical: "${canonicalUrl}"
  languages:
    en: "https://moydus.com/en/${country}/${state}/${city}/${category}"
    de: "https://moydus.com/de/${country}/${state}/${city}/${category}"
    fr: "https://moydus.com/fr/${country}/${state}/${city}/${category}"
    ar: "https://moydus.com/ar/${country}/${state}/${city}/${category}"
openGraph:
  title: "${title}"
  description: "${description}"
  url: "${canonicalUrl}"
  siteName: "Moydus"
  images:
    - url: "https://moydus.com/og-image.jpg"
      width: 1200
      height: 630
      alt: "${translatedCategory} ${city}"
  locale: "${locale}"
  type: "website"
twitter:
  card: "summary_large_image"
  title: "${title}"
  description: "${description}"
  images: ["https://moydus.com/og-image.jpg"]
robots:
  index: true
  follow: true
  googleBot:
    index: true
    follow: true
jsonLd:
  - "@context": "https://schema.org"
    "@type": "LocalBusiness"
    "name": "Moydus ${translatedCategory}"
    "description": "${description}"
    "url": "${canonicalUrl}"
    "address":
      "@type": "PostalAddress"
      "addressLocality": "${city}"
      "addressRegion": "${state}"
      "addressCountry": "${country.toUpperCase()}"
    "geo":
      "@type": "GeoCoordinates"
      "latitude": "0"
      "longitude": "0"
    "telephone": "${localeData.phone}"
    "priceRange": "${localizedPrice}"
    "openingHours": "Mo-Fr ${localeData.businessHours}"
---

# ${intro}

${whyChoose}

## ${benefits}

${locale === 'ar' ? 'خدماتنا تشمل:' : locale === 'fr' ? 'Nos services incluent :' : 'Unsere Services umfassen:'}

- ${locale === 'ar' ? 'تطوير مخصص بالكامل' : locale === 'fr' ? 'Développement entièrement personnalisé' : 'Vollständig maßgeschneiderte Entwicklung'}
- ${locale === 'ar' ? 'تصميم responsive متقدم' : locale === 'fr' ? 'Design responsive avancé' : 'Fortschrittliches responsives Design'}
- ${locale === 'ar' ? 'تحسين محركات البحث SEO' : locale === 'fr' ? 'Optimisation SEO' : 'SEO-Optimierung'}
- ${locale === 'ar' ? 'تكامل أنظمة CMS' : locale === 'fr' ? 'Intégration CMS' : 'CMS-Integration'}
- ${locale === 'ar' ? 'دعم وصيانة مستمرة' : locale === 'fr' ? 'Support et maintenance continus' : 'Kontinuierlicher Support und Wartung'}

## ${timeline}

${expertise}

## ${locale === 'ar' ? 'الأسئلة الشائعة' : locale === 'fr' ? 'Questions Fréquentes' : 'Häufig gestellte Fragen'}

${faqContent.map(faq => `
### ${faq.q}

${faq.a}
`).join('')}

## ${locale === 'ar' ? 'شهادات العملاء' : locale === 'fr' ? 'Témoignages Clients' : 'Kundenstimmen'}

${testimonials.map(testimonial => `
> "${testimonial.text}"
> 
> **${testimonial.name}** - ${testimonial.company}
`).join('')}

## ${locale === 'ar' ? 'ابدأ مشروعك اليوم' : locale === 'fr' ? 'Commencez Votre Projet Aujourd\'hui' : 'Starten Sie Ihr Projekt heute'}

${locale === 'ar' ? 'اتصل بنا للحصول على استشارة مجانية وعرض أسعار مخصص لمشروعك.' : locale === 'fr' ? 'Contactez-nous pour une consultation gratuite et un devis personnalisé pour votre projet.' : 'Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot für Ihr Projekt.'}

${locale === 'ar' ? '📞 **هاتف:**' : locale === 'fr' ? '📞 **Téléphone :**' : '📞 **Telefon:**'} ${localeData.phone}
${locale === 'ar' ? '⏰ **ساعات العمل:**' : locale === 'fr' ? '⏰ **Heures d\'ouverture :**' : '⏰ **Öffnungszeiten:**'} ${localeData.businessHours}
${locale === 'ar' ? '💰 **نطاق الأسعار:**' : locale === 'fr' ? '💰 **Gamme de prix :**' : '💰 **Preisspanne:**'} ${localizedPrice}
`;
}

function processDirectory(basePath, locale) {
  let processedCount = 0;
  
  function walkDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDirectory(fullPath);
      } else if (item.endsWith('.mdx')) {
        // Extract location info from path
        const relativePath = path.relative(basePath, fullPath);
        const pathParts = relativePath.split(path.sep);
        
        if (pathParts.length >= 4) {
          const country = pathParts[1];
          const state = pathParts[2];
          const city = pathParts[3];
          const category = pathParts[4] ? pathParts[4].replace('.mdx', '') : item.replace('.mdx', '');
          
          // Generate localized content
          const content = generateLocalizedContent(locale, country, state, city, category);
          const mdxContent = createMDXContent(locale, country, state, city, category, content);
          
          // Write the file
          fs.writeFileSync(fullPath, mdxContent, 'utf8');
          processedCount++;
          
          if (processedCount % 100 === 0) {
            console.log(`Processed ${processedCount} files for ${locale}...`);
          }
        }
      }
    }
  }
  
  walkDirectory(basePath);
  return processedCount;
}

// Main execution
const contentDir = path.join(__dirname, '../content');
const languages = ['de', 'fr', 'ar', 'nl', 'sv', 'no', 'ja', 'ko']; // All languages that need fixing

console.log('Starting localization fix...');

for (const locale of languages) {
  const localePath = path.join(contentDir, locale);
  
  if (fs.existsSync(localePath)) {
    console.log(`\nProcessing ${locale} language...`);
    const count = processDirectory(localePath, locale);
    console.log(`✅ Completed ${locale}: ${count} files processed`);
  } else {
    console.log(`⚠️  Directory not found: ${localePath}`);
  }
}

console.log('\n🎉 Localization fix completed!');