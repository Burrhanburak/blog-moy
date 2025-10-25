// Test script for dynamic image system
const { getDynamicImage } = require("./lib/getDynamicImage.ts");
const { getRandomImage } = require("./lib/getRandomImage.ts");

async function testDynamicImages() {
  console.log("🧪 Testing Dynamic Image System...\n");

  // Test 1: Random image from existing categories
  console.log("1️⃣ Testing Random Images:");
  const webDesignRandom = getRandomImage("web-design");
  const seoRandom = getRandomImage("seo-services");
  const ecommerceRandom = getRandomImage("ecommerce");

  console.log(`   Web Design: ${webDesignRandom}`);
  console.log(`   SEO Services: ${seoRandom}`);
  console.log(`   E-commerce: ${ecommerceRandom}\n`);

  // Test 2: Dynamic image generation
  console.log("2️⃣ Testing Dynamic Image Generation:");

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

  for (const testCase of testCases) {
    try {
      const result = await getDynamicImage(testCase);
      console.log(
        `   ${testCase.city.name} + ${testCase.category.title}: ${result}`
      );
    } catch (error) {
      console.log(
        `   ${testCase.city.name} + ${testCase.category.title}: Error - ${error.message}`
      );
    }
  }

  console.log("\n✅ Dynamic Image System Test Complete!");
}

// Run the test
testDynamicImages().catch(console.error);
