import { getVariationSeed } from "./i18n/utils";

export interface QAItem {
  question: string;
  answer: string;
  category?: "pricing" | "process" | "technology" | "general";
}

export interface HumanContentPayload {
  intro: string;
  qas: QAItem[];
  outro: string;
}

function interpolate(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "");
}

export function generateHumanContent(
  locale: string,
  city: string,
  category: string
): HumanContentPayload {
  const seed = getVariationSeed(
    `${city}:${category}`,
    locale,
    category.length + city.length || 7
  );

  const introVariants: Record<string, string[]> = {
    en: [
      "Professional {category} in {city} that puts people first — clear pricing, fast delivery, measurable outcomes.",
      "Human-first {category} for {city} teams — no jargon, just results.",
      "Results-focused {category} in {city}. We plan with you, ship fast, iterate based on data.",
      "Modern {category} for {city} companies — strategy, execution, and support that scales.",
      "Your partner for {category} in {city} — transparent, practical, effective.",
    ],
  };

  const qaVariants: Array<QAItem[]> = [
    [
      {
        question: "How much does it cost?",
        answer:
          "We scope based on outcomes — typical projects range from $2k–$15k. You'll get a fixed, transparent quote before we start.",
        category: "pricing",
      },
      {
        question: "How long does a project take?",
        answer:
          "Most websites launch in 2–6 weeks. Complex apps can take 8–12 weeks. We work in weekly milestones so you see progress.",
        category: "process",
      },
      {
        question: "What does the process look like?",
        answer:
          "Discovery → plan → design → build → launch → measure. You'll have a single point of contact and clear deliverables each week.",
        category: "process",
      },
    ],
    [
      {
        question: "Do you handle SEO and performance?",
        answer:
          "Yes. We ship Core Web Vitals-friendly pages, structured data, and on-page SEO best practices by default.",
        category: "technology",
      },
      {
        question: "Can you migrate or redesign an existing site?",
        answer:
          "Absolutely. We audit what to keep, improve, or remove — then migrate with zero downtime and redirects in place.",
        category: "process",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "We offer maintenance and growth plans — updates, A/B tests, content, and improvements based on actual analytics.",
        category: "general",
      },
    ],
  ];

  const outroVariants: string[] = [
    "Ready to start? Share your goals — we’ll propose a clear plan and quote.",
    "Let’s scope your {category} project for {city} — timeline, budget, and next steps.",
    "We’ll help you choose the fastest path to results — book a short call.",
  ];

  const introList = introVariants[locale] || introVariants.en;
  const intro = interpolate(introList[seed % introList.length], {
    city,
    category,
  });
  const qas = qaVariants[seed % qaVariants.length];
  const outro = interpolate(outroVariants[seed % outroVariants.length], {
    city,
    category,
  });

  return { intro, qas, outro };
}
