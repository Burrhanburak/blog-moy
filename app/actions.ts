"use server";

import { revalidatePath } from "next/cache";

export async function updateArticle(articleId: string) {
  // Mark article data as stale - article readers see stale data while it revalidates
  try {
    revalidatePath(`/article/${articleId}`);
  } catch (error) {
    console.error('Revalidation error:', error);
  }
}

export async function updateCityPage(citySlug: string) {
  // Revalidate city-specific content
  try {
    revalidatePath(`/united-states/california/${citySlug}`);
  } catch (error) {
    console.error('Revalidation error:', error);
  }
}

export async function updateCategoryPage(categorySlug: string) {
  // Revalidate category-specific content
  revalidatePath(`/${categorySlug}`);
}

export async function updateComparisonPage(slug: string) {
  // Revalidate comparison pages
  revalidatePath(`/compare/${slug}`);
}

export async function updateBlogPost(slug: string) {
  // Revalidate blog posts
  revalidatePath(`/blog/${slug}`);
}

export async function updateAllContent() {
  // Revalidate all content
  revalidatePath("/", "layout");
}

// Next.js 16: Contact form server action
export async function submitContactForm(formData: {
  name: string;
  email: string;
  company?: string;
  serviceType?: string;
  budget?: string;
  message: string;
}) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    await response.json();

    if (response.ok) {
      // Revalidate contact page cache
      revalidatePath("/contact");
      return { success: true, message: "Message sent successfully!" };
    } else {
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      };
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
}
