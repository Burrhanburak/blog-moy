import fs from "fs";
import path from "path";
import { generateImage } from "./ai/generateImage";
import { getRandomImage } from "./getRandomImage";

// Cache for build-time performance
const cache = new Map<string, string>();

export async function getDynamicImage({
  city,
  category,
  fallbackDir = "public/generated",
  manualImage,
}: {
  city: { name: string; slug?: string };
  category: { title: string; slug?: string };
  fallbackDir?: string;
  manualImage?: string;
}) {
  const key = `${city.slug || city.name.toLowerCase().replace(/\s+/g, "-")}-${
    category.slug || category.title.toLowerCase().replace(/\s+/g, "-")
  }`;

  // Check cache first
  if (cache.has(key)) {
    return cache.get(key)!;
  }
  // 1️⃣ Manuel olarak MDX'te varsa, onu kullan
  if (manualImage && manualImage.startsWith("/")) {
    return manualImage;
  }

  // 2️⃣ public/images klasöründe mevcut mu?
  const possibleNames = [
    `${category.slug}-${city.slug}.jpg`,
    `${city.slug}-${category.slug}.jpg`,
    `${category.slug}.jpg`,
    `${city.slug}.jpg`,
  ];

  for (const name of possibleNames) {
    const filePath = path.join(process.cwd(), "public/images", name);
    if (fs.existsSync(filePath)) {
      return `/images/${name}`;
    }
  }

  // 2.5️⃣ Çoklu görsel desteği - kategori klasöründe random seçim
  const randomImage = getRandomImage(
    category.slug || category.title.toLowerCase().replace(/\s+/g, "-")
  );
  if (randomImage !== "/images/default-fallback.jpg") {
    return randomImage;
  }

  // 3️⃣ Eğer hiçbir şey bulunmadıysa → AI ile üret
  const promptOptions = [
    `Modern ${category.title} agency in ${city.name}, professional workspace, clean design, bright lighting`,
    `${city.name} ${category.title} professionals at work, modern office, realistic lighting`,
    `Creative ${category.title} workspace, ${city.name} skyline background, natural light, portfolio style`,
    `Professional ${category.title} services in ${city.name}, contemporary design, bright studio lighting`,
    `${category.title} experts in ${city.name}, modern aesthetic, clean background, professional photography`,
  ];

  const prompt =
    promptOptions[Math.floor(Math.random() * promptOptions.length)];

  const aiImagePath = await generateImage({
    prompt,
    outputPath: path.join(
      fallbackDir,
      `${city.slug || city.name.toLowerCase().replace(/\s+/g, "-")}-${
        category.slug || category.title.toLowerCase().replace(/\s+/g, "-")
      }.jpg`
    ),
  });

  const resultPath = aiImagePath.startsWith("/")
    ? aiImagePath
    : "/" + aiImagePath.replace(/^public\//, "");

  // Cache the result
  cache.set(key, resultPath);
  return resultPath;
}
