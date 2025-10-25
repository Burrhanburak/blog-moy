// OG Image URL generator with dynamic parameters
export interface OGImageParams {
  city: string;
  category: string;
  country: string;
  state?: string;
  template?: 'default' | 'city-category' | 'comparison' | 'blog';
  currency?: string;
  price?: string;
  year?: string;
  // For comparison template
  option1?: string;
  option2?: string;
  // For blog template
  title?: string;
  readTime?: string;
}

export class OGImageGenerator {
  private baseUrl: string;

  constructor(baseUrl = 'https://moydus.com') {
    this.baseUrl = baseUrl;
  }

  // Generate OG image URL for city-category pages
  generateCityCategoryImage(params: OGImageParams): string {
    const searchParams = new URLSearchParams({
      template: 'city-category',
      city: params.city,
      category: params.category,
      country: params.country,
      year: params.year || new Date().getFullYear().toString(),
    });

    if (params.state) {
      searchParams.set('state', params.state);
    }

    if (params.currency) {
      searchParams.set('currency', params.currency);
    }

    if (params.price) {
      searchParams.set('price', params.price);
    }

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  // Generate OG image URL for comparison pages
  generateComparisonImage(params: OGImageParams & { option1: string; option2: string }): string {
    const searchParams = new URLSearchParams({
      template: 'comparison',
      option1: params.option1,
      option2: params.option2,
      year: params.year || new Date().getFullYear().toString(),
    });

    if (params.city) {
      searchParams.set('city', params.city);
    }

    if (params.category) {
      searchParams.set('category', params.category);
    }

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  // Generate OG image URL for blog posts
  generateBlogImage(params: OGImageParams & { title: string }): string {
    const searchParams = new URLSearchParams({
      template: 'blog',
      title: params.title,
      year: params.year || new Date().getFullYear().toString(),
    });

    if (params.readTime) {
      searchParams.set('readTime', params.readTime);
    }

    if (params.category) {
      searchParams.set('category', params.category);
    }

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  // Generate default OG image URL
  generateDefaultImage(params: OGImageParams): string {
    const searchParams = new URLSearchParams({
      template: 'default',
      city: params.city,
      category: params.category,
      country: params.country,
      year: params.year || new Date().getFullYear().toString(),
    });

    if (params.state) {
      searchParams.set('state', params.state);
    }

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  // Auto-generate image based on content type
  generateAutoImage(params: OGImageParams): string {
    if (params.option1 && params.option2) {
      return this.generateComparisonImage(params as any);
    }

    if (params.title && params.template === 'blog') {
      return this.generateBlogImage(params as any);
    }

    if (params.city && params.category) {
      return this.generateCityCategoryImage(params);
    }

    return this.generateDefaultImage(params);
  }

  // Generate social sharing URLs
  generateSocialSharingUrls(pageUrl: string, ogImageUrl: string, title: string) {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedImage = encodeURIComponent(ogImageUrl);

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    };
  }

  // Pre-generate images for critical pages (for build-time optimization)
  async preGenerateImages(pages: Array<{
    url: string;
    params: OGImageParams;
  }>): Promise<Array<{ url: string; ogImageUrl: string; success: boolean }>> {
    const results = [];

    for (const page of pages) {
      try {
        const ogImageUrl = this.generateAutoImage(page.params);
        
        // Optionally, you could pre-fetch the image to warm the cache
        // await fetch(ogImageUrl);
        
        results.push({
          url: page.url,
          ogImageUrl,
          success: true,
        });
      } catch (error) {
        console.error(`Failed to generate OG image for ${page.url}:`, error);
        results.push({
          url: page.url,
          ogImageUrl: this.generateDefaultImage(page.params),
          success: false,
        });
      }
    }

    return results;
  }

  // Batch generate images with different variations
  generateImageVariations(baseParams: OGImageParams): Array<{
    name: string;
    url: string;
    description: string;
  }> {
    const variations = [];

    // Primary image
    variations.push({
      name: 'primary',
      url: this.generateCityCategoryImage(baseParams),
      description: 'Main page image with location and service info',
    });

    // Twitter optimized (different aspect ratio consideration)
    variations.push({
      name: 'twitter',
      url: this.generateCityCategoryImage({
        ...baseParams,
        template: 'city-category',
      }),
      description: 'Optimized for Twitter sharing',
    });

    // Facebook optimized
    variations.push({
      name: 'facebook',
      url: this.generateCityCategoryImage(baseParams),
      description: 'Optimized for Facebook sharing',
    });

    return variations;
  }

  // Generate structured data for images
  generateImageStructuredData(ogImageUrl: string, params: OGImageParams) {
    const { city, category, country, state } = params;
    const locationString = state ? `${city}, ${state}` : `${city}, ${country}`;
    
    return {
      '@type': 'ImageObject',
      url: ogImageUrl,
      width: 1200,
      height: 630,
      caption: `${category} services in ${locationString}`,
      description: `Professional ${category} services available in ${locationString}. Get quotes and compare providers.`,
      keywords: [
        category,
        city,
        country,
        'professional services',
        'business services',
      ].join(', '),
    };
  }
}

// Helper functions for integration
export function generateMetaWithOGImage(params: OGImageParams, title: string, description: string) {
  const ogGenerator = new OGImageGenerator();
  const ogImageUrl = ogGenerator.generateAutoImage(params);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://moydus.com/${params.country}/${params.state}/${params.city}/${params.category}`,
      siteName: 'Moydus',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@moydus',
      site: '@moydus',
    },
  };
}

// Export singleton instance
export const ogImageGenerator = new OGImageGenerator();

// Pre-defined image configurations for common use cases
export const OG_IMAGE_PRESETS = {
  cityCategory: (city: string, category: string, country: string, state?: string) => ({
    city,
    category,
    country,
    state,
    template: 'city-category' as const,
  }),
  
  comparison: (option1: string, option2: string, category?: string) => ({
    option1,
    option2,
    category,
    template: 'comparison' as const,
    city: '',
    country: '',
  }),
  
  blogPost: (title: string, readTime?: string, category?: string) => ({
    title,
    readTime,
    category,
    template: 'blog' as const,
    city: '',
    country: '',
  }),
  
  categoryHub: (category: string) => ({
    category,
    city: 'Global',
    country: 'Worldwide',
    template: 'default' as const,
  }),
} as const;

// Batch processing utilities
export async function generateImagesForSitemap(sitemapUrls: string[]): Promise<void> {
  const ogGenerator = new OGImageGenerator();
  const batchSize = 10;
  
  for (let i = 0; i < sitemapUrls.length; i += batchSize) {
    const batch = sitemapUrls.slice(i, i + batchSize);
    
    const promises = batch.map(async (url) => {
      try {
        // Extract parameters from URL
        const urlParts = url.split('/');
        const city = urlParts[urlParts.length - 2];
        const category = urlParts[urlParts.length - 1];
        const country = urlParts[urlParts.length - 4];
        const state = urlParts[urlParts.length - 3];
        
        const params: OGImageParams = {
          city,
          category,
          country,
          state,
          template: 'city-category',
        };
        
        const ogImageUrl = ogGenerator.generateCityCategoryImage(params);
        
        // Pre-warm the image by fetching it
        await fetch(ogImageUrl);
        
        console.log(`Generated OG image for: ${url}`);
      } catch (error) {
        console.error(`Failed to generate OG image for ${url}:`, error);
      }
    });
    
    await Promise.allSettled(promises);
    
    // Add delay between batches to avoid overwhelming the server
    if (i + batchSize < sitemapUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}