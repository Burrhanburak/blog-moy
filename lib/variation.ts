export function getVariationSeed(
  city: string,
  category: string,
  locale: string = 'en',
  variants = 5
): number {
  let hash = 0;
  const s = `${city}|${category}|${locale}`;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash) % variants;
  return seed;
}

export function pickVariant<T>(variants: T[], seed: number): T {
  if (variants.length === 0) throw new Error("variants is empty");
  return variants[seed % variants.length];
}

export const variations = {
  de: {
    intro: [
      (city: string, category: string) => `Professionelle ${category.toLowerCase()}-Lösungen jetzt in ${city} verfügbar.`,
      (city: string, category: string) => `${city} - Ihr Partner für erstklassige ${category.toLowerCase()}-Services.`,
      (city: string, category: string) => `Maßgeschneiderte ${category.toLowerCase()}-Dienstleistungen speziell für ${city}.`,
      (city: string, category: string) => `${city}: Wo Innovation auf bewährte ${category.toLowerCase()}-Expertise trifft.`,
      (city: string, category: string) => `Entdecken Sie führende ${category.toLowerCase()}-Services in ${city}.`
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
  ar: {
    intro: [
      (city: string, category: string) => `حلول ${category} احترافية متاحة الآن في ${city}.`,
      (city: string, category: string) => `${city} - شريكك في خدمات ${category} المتميزة.`,
      (city: string, category: string) => `خدمات ${category} مخصصة خصيصاً لـ ${city}.`,
      (city: string, category: string) => `${city}: حيث تلتقي الابتكار بخبرة ${category} المؤكدة.`,
      (city: string, category: string) => `اكتشف خدمات ${category} الرائدة في ${city}.`
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
  },
  fr: {
    intro: [
      (city: string, category: string) => `Solutions professionnelles de ${category.toLowerCase()} maintenant disponibles à ${city}.`,
      (city: string, category: string) => `${city} - Votre partenaire pour des services ${category.toLowerCase()} de premier plan.`,
      (city: string, category: string) => `Services ${category.toLowerCase()} sur mesure spécialement pour ${city}.`,
      (city: string, category: string) => `${city} : Où l'innovation rencontre l'expertise ${category.toLowerCase()} éprouvée.`,
      (city: string, category: string) => `Découvrez les services ${category.toLowerCase()} de pointe à ${city}.`
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
  }
};

export const categoryTranslations = {
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
  }
};

export function getVariationText(
  locale: string,
  section: string,
  seed: number,
  city?: string,
  category?: string
): string {
  const localeVariations = variations[locale as keyof typeof variations];
  if (!localeVariations) return '';
  
  const sectionVariations = localeVariations[section as keyof typeof localeVariations];
  if (!sectionVariations) return '';
  
  const selectedVariation = sectionVariations[seed % sectionVariations.length];
  
  if (typeof selectedVariation === 'function' && city && category) {
    return selectedVariation(city, category);
  }
  
  let text = selectedVariation as string;
  
  // Replace placeholders
  if (city) text = text.replace(/{city}/g, city);
  if (category) text = text.replace(/{category}/g, category);
  
  return text;
}
