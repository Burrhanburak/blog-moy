import fs from "fs";
import path from "path";
import OpenAI from "openai";
import sharp from "sharp";

export async function generateImage({
  prompt,
  outputPath,
}: {
  prompt: string;
  outputPath: string;
}) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return "/moy-black.svg";
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x576",
      n: 1,
    });

    const imageUrl = response.data[0].url;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // Process with Sharp for optimization and metadata
    const processedBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 90, progressive: true })
      .toBuffer();

    // Get metadata for SEO
    const metadata = await sharp(processedBuffer).metadata();
    console.log(
      `AI Image generated: ${metadata.width}x${metadata.height} - ${outputPath}`
    );

    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, processedBuffer);

    return outputPath;
  } catch (error) {
    console.error("AI image generation failed:", error);
    return "/moy-black.svg";
  }
}
