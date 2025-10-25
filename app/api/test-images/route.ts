import { NextResponse } from "next/server";
import { getDynamicImage } from "@/lib/getDynamicImage";
import { getRandomImage } from "@/lib/getRandomImage";

export async function GET() {
  try {
    console.log("🧪 Testing Dynamic Image System...");

    // Test 1: Random images
    const webDesignRandom = getRandomImage("web-design");
    const seoRandom = getRandomImage("seo-services");
    const ecommerceRandom = getRandomImage("ecommerce");

    // Test 2: Dynamic image generation
    const testCases = [
      {
        city: { name: "Istanbul", slug: "istanbul" },
        category: { title: "Web Design", slug: "web-design" },
      },
      {
        city: { name: "London", slug: "london" },
        category: { title: "SEO Services", slug: "seo-services" },
      },
      {
        city: { name: "New York", slug: "new-york" },
        category: { title: "E-commerce", slug: "ecommerce" },
      },
    ];

    const results = [];

    for (const testCase of testCases) {
      try {
        const result = await getDynamicImage(testCase);
        results.push({
          city: testCase.city.name,
          category: testCase.category.title,
          image: result,
          status: "success",
        });
      } catch (error) {
        results.push({
          city: testCase.city.name,
          category: testCase.category.title,
          image: null,
          status: "error",
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      randomImages: {
        webDesign: webDesignRandom,
        seo: seoRandom,
        ecommerce: ecommerceRandom,
      },
      dynamicImages: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
