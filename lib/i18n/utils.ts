import { messages, type Locale, type Messages } from './messages';

/**
 * Get localized message by key path
 */
export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages.en;
}

/**
 * Get a specific message by dot notation path
 */
export function getMessage(
  locale: Locale, 
  key: string, 
  params?: Record<string, string | number>
): string {
  const msgs = getMessages(locale);
  
  // Navigate through nested object using dot notation
  const keys = key.split('.');
  let value: any = msgs;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      const enMsgs = messages.en;
      let enValue: any = enMsgs;
      for (const k2 of keys) {
        if (enValue && typeof enValue === 'object' && k2 in enValue) {
          enValue = enValue[k2];
        } else {
          return key; // Return key if not found in fallback
        }
      }
      value = enValue;
      break;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  if (params) {
    return interpolateMessage(value, params);
  }
  
  return value;
}

/**
 * Interpolate message with parameters
 */
export function interpolateMessage(
  message: string, 
  params: Record<string, string | number>
): string {
  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}

/**
 * Get variation seed for content diversification
 */
export function getVariationSeed(city: string, category: string, variants = 5): number {
  let hash = 0;
  const str = city + '|' + category;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
  }
  return Math.abs(hash) % variants;
}

/**
 * Generate localized content variations
 */
export function getContentVariation(
  locale: Locale,
  type: 'intro' | 'cta' | 'benefit',
  seed: number,
  params: Record<string, string>
): string {
  const variations = {
    intro: {
      en: [
        `Looking for top-quality {category} in {city}? You're in the right place.`,
        `{city} is a hub for {category} — here's what makes our service special.`,
        `Discover why people in {city} trust us for {category}.`,
        `{city}'s best-rated {category} services are just a click away.`,
        `If you're in {city} and need {category}, here's your complete guide.`
      ],
      de: [
        `Suchen Sie nach hochwertigen {category} in {city}? Sie sind am richtigen Ort.`,
        `{city} ist ein Zentrum für {category} — hier ist, was unseren Service besonders macht.`,
        `Entdecken Sie, warum Menschen in {city} uns für {category} vertrauen.`,
        `{city}s bestbewertete {category}-Dienste sind nur einen Klick entfernt.`,
        `Wenn Sie in {city} sind und {category} benötigen, hier ist Ihr kompletter Leitfaden.`
      ],
      fr: [
        `Vous cherchez des services {category} de qualité supérieure à {city} ? Vous êtes au bon endroit.`,
        `{city} est un centre pour {category} — voici ce qui rend notre service spécial.`,
        `Découvrez pourquoi les gens de {city} nous font confiance pour {category}.`,
        `Les services {category} les mieux notés de {city} ne sont qu'à un clic.`,
        `Si vous êtes à {city} et avez besoin de {category}, voici votre guide complet.`
      ],
      ar: [
        `تبحث عن خدمات {category} عالية الجودة في {city}؟ أنت في المكان الصحيح.`,
        `{city} مركز لـ {category} — إليك ما يجعل خدمتنا مميزة.`,
        `اكتشف لماذا يثق الناس في {city} بنا لـ {category}.`,
        `خدمات {category} الأعلى تقييماً في {city} على بُعد نقرة واحدة.`,
        `إذا كنت في {city} وتحتاج إلى {category}، إليك دليلك الكامل.`
      ],
      nl: [
        `Op zoek naar hoogwaardige {category} in {city}? Je bent op de juiste plek.`,
        `{city} is een centrum voor {category} — dit maakt onze service bijzonder.`,
        `Ontdek waarom mensen in {city} ons vertrouwen voor {category}.`,
        `{city}'s best beoordeelde {category} diensten zijn slechts een klik weg.`,
        `Als je in {city} bent en {category} nodig hebt, hier is je complete gids.`
      ],
      ja: [
        `{city}で高品質な{category}をお探しですか？正しい場所にいらっしゃいます。`,
        `{city}は{category}のハブです — 私たちのサービスが特別な理由はこちらです。`,
        `{city}の人々が{category}で私たちを信頼する理由を発見してください。`,
        `{city}の最高評価の{category}サービスはワンクリックです。`,
        `{city}にいて{category}が必要な場合、これが完全なガイドです。`
      ],
      ko: [
        `{city}에서 고품질 {category}를 찾고 계신가요? 올바른 곳에 오셨습니다.`,
        `{city}는 {category}의 허브입니다 — 우리 서비스가 특별한 이유는 다음과 같습니다.`,
        `{city} 사람들이 {category}에서 우리를 신뢰하는 이유를 알아보세요.`,
        `{city}의 최고 평점 {category} 서비스가 클릭 한 번 거리에 있습니다.`,
        `{city}에 있고 {category}가 필요하다면, 여기 완전한 가이드가 있습니다.`
      ],
      sv: [
        `Letar du efter högkvalitativa {category} i {city}? Du är på rätt plats.`,
        `{city} är ett nav för {category} — här är vad som gör vår service speciell.`,
        `Upptäck varför folk i {city} litar på oss för {category}.`,
        `{city}s bäst betygsatta {category} tjänster är bara ett klick bort.`,
        `Om du är i {city} och behöver {category}, här är din kompletta guide.`
      ],
      no: [
        `Leter etter høykvalitets {category} i {city}? Du er på rett sted.`,
        `{city} er et knutepunkt for {category} — her er hva som gjør vår tjeneste spesiell.`,
        `Oppdag hvorfor folk i {city} stoler på oss for {category}.`,
        `{city}s best vurderte {category} tjenester er bare et klikk unna.`,
        `Hvis du er i {city} og trenger {category}, her er din komplette guide.`
      ]
    }
  };

  const localeVariations = variations[type]?.[locale] || variations[type]?.en || [];
  const selectedVariation = localeVariations[seed] || localeVariations[0] || '';
  
  return interpolateMessage(selectedVariation, params);
}