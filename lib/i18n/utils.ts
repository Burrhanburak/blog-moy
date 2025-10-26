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
    },
    cta: {
      en: [
        `Get started with {category} in {city} today`,
        `Contact our {city} {category} experts`,
        `Request a quote for {category} in {city}`,
        `Start your {category} project in {city}`,
        `Learn more about our {city} {category} services`
      ],
      de: [
        `Starten Sie heute mit {category} in {city}`,
        `Kontaktieren Sie unsere {city} {category} Experten`,
        `Fordern Sie ein Angebot für {category} in {city} an`,
        `Starten Sie Ihr {category} Projekt in {city}`,
        `Erfahren Sie mehr über unsere {city} {category} Services`
      ],
      fr: [
        `Commencez avec {category} à {city} aujourd'hui`,
        `Contactez nos experts {category} de {city}`,
        `Demandez un devis pour {category} à {city}`,
        `Lancez votre projet {category} à {city}`,
        `En savoir plus sur nos services {category} à {city}`
      ],
      ar: [
        `ابدأ مع {category} في {city} اليوم`,
        `اتصل بخبراء {category} في {city}`,
        `اطلب عرض أسعار لـ {category} في {city}`,
        `ابدأ مشروع {category} في {city}`,
        `تعرف على المزيد حول خدمات {category} في {city}`
      ],
      nl: [
        `Begin vandaag met {category} in {city}`,
        `Neem contact op met onze {city} {category} experts`,
        `Vraag een offerte aan voor {category} in {city}`,
        `Start uw {category} project in {city}`,
        `Meer informatie over onze {city} {category} diensten`
      ],
      ja: [
        `{city}で{category}を今日始めましょう`,
        `{city}の{category}専門家にお問い合わせください`,
        `{city}の{category}の見積もりをリクエスト`,
        `{city}で{category}プロジェクトを開始`,
        `{city}の{category}サービスについて詳しく知る`
      ],
      ko: [
        `오늘 {city}에서 {category}를 시작하세요`,
        `{city} {category} 전문가에게 문의하세요`,
        `{city}의 {category} 견적을 요청하세요`,
        `{city}에서 {category} 프로젝트를 시작하세요`,
        `{city}의 {category} 서비스에 대해 자세히 알아보세요`
      ],
      sv: [
        `Kom igång med {category} i {city} idag`,
        `Kontakta våra {city} {category} experter`,
        `Begär en offert för {category} i {city}`,
        `Starta ditt {category} projekt i {city}`,
        `Läs mer om våra {city} {category} tjänster`
      ],
      no: [
        `Kom i gang med {category} i {city} i dag`,
        `Kontakt våre {city} {category} eksperter`,
        `Be om tilbud for {category} i {city}`,
        `Start ditt {category} prosjekt i {city}`,
        `Lær mer om våre {city} {category} tjenester`
      ]
    },
    benefit: {
      en: [
        `Professional {category} services in {city}`,
        `Experienced {category} team in {city}`,
        `Top-rated {category} solutions for {city}`,
        `Custom {category} approach in {city}`,
        `Proven {category} results in {city}`
      ],
      de: [
        `Professionelle {category} Services in {city}`,
        `Erfahrenes {category} Team in {city}`,
        `Top-bewertete {category} Lösungen für {city}`,
        `Maßgeschneiderter {category} Ansatz in {city}`,
        `Bewährte {category} Ergebnisse in {city}`
      ],
      fr: [
        `Services {category} professionnels à {city}`,
        `Équipe {category} expérimentée à {city}`,
        `Solutions {category} les mieux notées pour {city}`,
        `Approche {category} personnalisée à {city}`,
        `Résultats {category} prouvés à {city}`
      ],
      ar: [
        `خدمات {category} احترافية في {city}`,
        `فريق {category} ذو خبرة في {city}`,
        `حلول {category} عالية التقييم لـ {city}`,
        `نهج {category} مخصص في {city}`,
        `نتائج {category} مثبتة في {city}`
      ],
      nl: [
        `Professionele {category} diensten in {city}`,
        `Ervaren {category} team in {city}`,
        `Top-beoordeelde {category} oplossingen voor {city}`,
        `Op maat gemaakte {category} aanpak in {city}`,
        `Bewezen {category} resultaten in {city}`
      ],
      ja: [
        `{city}のプロフェッショナル{category}サービス`,
        `{city}の経験豊富な{category}チーム`,
        `{city}向けトップ評価{category}ソリューション`,
        `{city}でのカスタム{category}アプローチ`,
        `{city}での実証済み{category}結果`
      ],
      ko: [
        `{city}의 전문 {category} 서비스`,
        `{city}의 경험 많은 {category} 팀`,
        `{city}를 위한 최고 평점 {category} 솔루션`,
        `{city}에서의 맞춤형 {category} 접근법`,
        `{city}에서 입증된 {category} 결과`
      ],
      sv: [
        `Professionella {category} tjänster i {city}`,
        `Erfaret {category} team i {city}`,
        `Toppbetyg {category} lösningar för {city}`,
        `Skräddarsydd {category} metod i {city}`,
        `Beprövade {category} resultat i {city}`
      ],
      no: [
        `Profesjonelle {category} tjenester i {city}`,
        `Erfart {category} team i {city}`,
        `Toppvurderte {category} løsninger for {city}`,
        `Skreddersydd {category} tilnærming i {city}`,
        `Dokumenterte {category} resultater i {city}`
      ]
    }
  };

  const localeVariations = variations[type]?.[locale] || variations[type]?.en || [];
  const selectedVariation = localeVariations[seed] || localeVariations[0] || '';
  
  return interpolateMessage(selectedVariation, params);
}