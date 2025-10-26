import { getVariationSeed, pickVariant } from "@/lib/variation";

interface VariationProps {
  city: string;
  category: string;
}

export default function Variation({ city, category }: VariationProps) {
  const variants = [
    `Looking for top-quality ${category} in ${city}? You’re in the right place.`,
    `${city} is a hub for ${category} — here’s what makes our service special.`,
    `Discover why people in ${city} trust us for ${category}.`,
    `${city}’s best-rated ${category} services are just a click away.`,
    `If you’re in ${city} and need ${category}, here’s your complete guide.`
  ];

  const seed = getVariationSeed(city, category, 'en', variants.length);
  const variantText = pickVariant(variants, seed);

  return <p>{variantText}</p>;
}
