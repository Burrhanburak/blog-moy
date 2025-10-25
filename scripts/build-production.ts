#!/usr/bin/env bun

import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";
import { join } from "path";

console.log("🚀 Starting production build process...");

// Step 1: Clean previous builds
console.log("🧹 Cleaning previous builds...");
if (existsSync(".contentlayer")) {
  rmSync(".contentlayer", { recursive: true });
}
if (existsSync("build")) {
  rmSync("build", { recursive: true });
}

// Step 2: Generate content (with all files)
console.log("📝 Generating content with Contentlayer...");
try {
  execSync("bunx contentlayer build", { stdio: "inherit" });
  console.log("✅ Content generation completed");
} catch (error) {
  console.error("❌ Content generation failed:", error);
  process.exit(1);
}

// Step 3: Build Next.js app
console.log("🏗️ Building Next.js application...");
try {
  execSync("bun run build", { stdio: "inherit" });
  console.log("✅ Next.js build completed");
} catch (error) {
  console.error("❌ Next.js build failed:", error);
  process.exit(1);
}

console.log("🎉 Production build completed successfully!");
console.log("📦 Build output: ./build");
