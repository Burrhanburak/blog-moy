// AI-powered content generation for dynamic depth and insights
export interface AIContentRequest {
  city: string;
  state: string;
  country: string;
  category: string;
  locale: string;
  context?: {
    competitors?: string[];
    marketSize?: number;
    averagePricing?: string;
    trends?: string[];
  };
}

export interface AIInsight {
  type: 'market-analysis' | 'pricing-trends' | 'competitive-landscape' | 'local-trends';
  title: string;
  content: string;
  confidence: number;
  sources?: string[];
  lastUpdated: string;
}

export interface AIGeneratedContent {
  insights: AIInsight[];
  keyTakeaways: string[];
  marketAnalysis: {
    marketSize: string;
    growth: string;
    keyPlayers: string[];
    opportunities: string[];
  };
  pricingAnalysis: {
    averageRange: string;
    factors: string[];
    comparison: string;
    trends: string;
  };
  competitorAnalysis: {
    topCompetitors: Array<{
      name: string;
      strength: string;
      weakness: string;
      marketShare?: string;
    }>;
    gaps: string[];
    opportunities: string[];
  };
  localTrends: {
    emerging: string[];
    declining: string[];
    seasonal: string[];
  };
  faqs: Array<{
    q: string;
    a: string;
    confidence: number;
  }>;
}

export class AIContentGenerator {
  private apiKey: string;
  private baseUrl: string;
  private cache: Map<string, AIGeneratedContent> = new Map();
  private cacheExpiry: number = 24 * 60 * 60 * 1000; // 24 hours

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async generateContent(request: AIContentRequest): Promise<AIGeneratedContent> {
    const cacheKey = this.generateCacheKey(request);
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const content = await this.generateAIContent(request);
      this.cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.error('AI content generation failed:', error);
      return this.getFallbackContent(request);
    }
  }

  private async generateAIContent(request: AIContentRequest): Promise<AIGeneratedContent> {
    const { city, state, country, category, locale, context } = request;
    
    const prompt = this.buildPrompt(request);
    
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert business analyst specializing in local market research and digital services. Generate comprehensive, accurate, and actionable insights for businesses. Always provide specific, data-driven responses when possible.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    return this.parseAIResponse(aiResponse, request);
  }

  private buildPrompt(request: AIContentRequest): string {
    const { city, state, country, category, locale } = request;
    
    return `Generate comprehensive business intelligence for ${category} services in ${city}, ${state}, ${country}.

Please provide:

1. **Market Analysis**:
   - Current market size and growth trends
   - Key market drivers and opportunities
   - Business landscape overview

2. **Pricing Analysis**:
   - Typical price ranges for ${category} services
   - Factors affecting pricing in ${city}
   - Cost comparison with similar markets

3. **Competitive Landscape**:
   - Top 3-5 service providers (generic types, not specific companies)
   - Market gaps and opportunities
   - Competitive advantages to focus on

4. **Local Trends**:
   - Emerging trends in ${category} for ${country}
   - Seasonal patterns
   - Technology adoption trends

5. **Key Takeaways** (3-5 bullet points):
   - Most important insights for businesses
   - Actionable recommendations

6. **FAQs** (5 questions):
   - Common questions businesses have about ${category} in ${city}
   - Practical, helpful answers

Format the response as valid JSON with the following structure:
{
  "marketAnalysis": {
    "marketSize": "string",
    "growth": "string", 
    "keyPlayers": ["string"],
    "opportunities": ["string"]
  },
  "pricingAnalysis": {
    "averageRange": "string",
    "factors": ["string"],
    "comparison": "string",
    "trends": "string"
  },
  "competitorAnalysis": {
    "topCompetitors": [{"name": "string", "strength": "string", "weakness": "string"}],
    "gaps": ["string"],
    "opportunities": ["string"]
  },
  "localTrends": {
    "emerging": ["string"],
    "declining": ["string"], 
    "seasonal": ["string"]
  },
  "keyTakeaways": ["string"],
  "faqs": [{"q": "string", "a": "string"}]
}`;
  }

  private parseAIResponse(response: string, request: AIContentRequest): AIGeneratedContent {
    try {
      const parsed = JSON.parse(response);
      
      // Generate insights from the parsed data
      const insights: AIInsight[] = [
        {
          type: 'market-analysis',
          title: `${request.category} Market in ${request.city}`,
          content: `${parsed.marketAnalysis?.marketSize || 'Growing market'} with ${parsed.marketAnalysis?.growth || 'steady growth'}. Key opportunities include ${parsed.marketAnalysis?.opportunities?.slice(0, 2)?.join(' and ') || 'digital transformation'}.`,
          confidence: 0.8,
          lastUpdated: new Date().toISOString()
        },
        {
          type: 'pricing-trends',
          title: 'Pricing Insights',
          content: `Average pricing: ${parsed.pricingAnalysis?.averageRange || '$1,000-$10,000'}. ${parsed.pricingAnalysis?.trends || 'Prices are influenced by local market dynamics'}.`,
          confidence: 0.7,
          lastUpdated: new Date().toISOString()
        },
        {
          type: 'competitive-landscape',
          title: 'Competitive Landscape',
          content: `Market gaps include ${parsed.competitorAnalysis?.gaps?.slice(0, 2)?.join(' and ') || 'specialized services'}. ${parsed.competitorAnalysis?.opportunities?.slice(0, 1)?.[0] || 'Focus on local expertise for competitive advantage'}.`,
          confidence: 0.75,
          lastUpdated: new Date().toISOString()
        },
        {
          type: 'local-trends',
          title: 'Local Market Trends',
          content: `Emerging trends: ${parsed.localTrends?.emerging?.slice(0, 2)?.join(', ') || 'AI integration, mobile-first approaches'}. ${parsed.localTrends?.seasonal?.length ? 'Seasonal patterns affect demand.' : ''}`,
          confidence: 0.7,
          lastUpdated: new Date().toISOString()
        }
      ];

      return {
        insights,
        keyTakeaways: parsed.keyTakeaways || [
          `${request.city} offers strong opportunities for ${request.category} services`,
          'Local market knowledge provides competitive advantage',
          'Digital transformation driving demand growth'
        ],
        marketAnalysis: parsed.marketAnalysis || {
          marketSize: 'Growing market',
          growth: 'Steady growth expected',
          keyPlayers: ['Local agencies', 'National providers'],
          opportunities: ['Digital transformation', 'Local expertise']
        },
        pricingAnalysis: parsed.pricingAnalysis || {
          averageRange: '$1,000-$10,000',
          factors: ['Project scope', 'Timeline', 'Complexity'],
          comparison: 'Competitive with national averages',
          trends: 'Increasing demand for premium services'
        },
        competitorAnalysis: parsed.competitorAnalysis || {
          topCompetitors: [
            { name: 'Local Agencies', strength: 'Market knowledge', weakness: 'Limited resources' },
            { name: 'National Providers', strength: 'Scalability', weakness: 'Less local focus' }
          ],
          gaps: ['Specialized expertise', 'Local market focus'],
          opportunities: ['Digital transformation', 'Small business market']
        },
        localTrends: parsed.localTrends || {
          emerging: ['AI integration', 'Mobile-first design'],
          declining: ['Traditional approaches'],
          seasonal: ['Q4 budget spending', 'New year initiatives']
        },
        faqs: (parsed.faqs || []).map((faq: any) => ({
          ...faq,
          confidence: 0.8
        }))
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return this.getFallbackContent(request);
    }
  }

  private getFallbackContent(request: AIContentRequest): AIGeneratedContent {
    const { city, category } = request;
    
    return {
      insights: [
        {
          type: 'market-analysis',
          title: `${category} Market Overview`,
          content: `${city} presents strong opportunities for ${category} services with growing business demand and digital transformation trends.`,
          confidence: 0.6,
          lastUpdated: new Date().toISOString()
        }
      ],
      keyTakeaways: [
        `Strong demand for ${category} services in ${city}`,
        'Local expertise provides competitive advantage',
        'Growing market with digital transformation opportunities'
      ],
      marketAnalysis: {
        marketSize: 'Growing market with strong potential',
        growth: 'Steady growth driven by digital transformation',
        keyPlayers: ['Local agencies', 'Regional providers'],
        opportunities: ['Small business digitization', 'E-commerce growth']
      },
      pricingAnalysis: {
        averageRange: '$1,500-$15,000',
        factors: ['Project complexity', 'Timeline requirements', 'Ongoing support'],
        comparison: 'Competitive with regional markets',
        trends: 'Increasing value recognition for quality services'
      },
      competitorAnalysis: {
        topCompetitors: [
          { name: 'Local Specialists', strength: 'Market knowledge', weakness: 'Limited scale' },
          { name: 'Regional Agencies', strength: 'Resources', weakness: 'Less local focus' }
        ],
        gaps: ['Specialized industry expertise', 'Full-service offerings'],
        opportunities: ['Underserved small businesses', 'Emerging technologies']
      },
      localTrends: {
        emerging: ['AI-powered solutions', 'Mobile-first strategies'],
        declining: ['Traditional marketing approaches'],
        seasonal: ['End-of-year budget cycles', 'Q1 new initiatives']
      },
      faqs: [
        {
          q: `What should I expect to pay for ${category} in ${city}?`,
          a: `Pricing typically ranges from $1,500-$15,000 depending on scope and complexity. Local providers often offer competitive rates with personalized service.`,
          confidence: 0.7
        },
        {
          q: `How long do ${category} projects typically take?`,
          a: `Most projects are completed within 4-12 weeks, depending on requirements and complexity. Rush projects may be available for additional fees.`,
          confidence: 0.7
        }
      ]
    };
  }

  private generateCacheKey(request: AIContentRequest): string {
    return `${request.city}-${request.state}-${request.country}-${request.category}-${request.locale}`;
  }

  private getFromCache(key: string): AIGeneratedContent | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if cache is expired (simple implementation)
    const now = Date.now();
    const cacheTime = new Date(cached.insights[0]?.lastUpdated || 0).getTime();
    
    if (now - cacheTime > this.cacheExpiry) {
      this.cache.delete(key);
      return null;
    }

    return cached;
  }

  // Method to generate insights for multiple cities in batch
  async generateBatchInsights(requests: AIContentRequest[]): Promise<Map<string, AIGeneratedContent>> {
    const results = new Map<string, AIGeneratedContent>();
    
    // Process in batches to respect API limits
    const batchSize = 5;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(request => 
        this.generateContent(request).then(content => ({
          key: this.generateCacheKey(request),
          content
        }))
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach(result => {
        if (result.status === 'fulfilled') {
          results.set(result.value.key, result.value.content);
        }
      });
      
      // Add delay between batches
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  // Method to refresh stale content
  async refreshStaleContent(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
    const now = Date.now();
    const staleKeys: string[] = [];
    
    this.cache.forEach((content, key) => {
      const cacheTime = new Date(content.insights[0]?.lastUpdated || 0).getTime();
      if (now - cacheTime > maxAge) {
        staleKeys.push(key);
      }
    });
    
    // Remove stale entries
    staleKeys.forEach(key => this.cache.delete(key));
    
    console.log(`Refreshed ${staleKeys.length} stale content entries`);
  }
}

// Helper function to integrate with existing page generation
export async function enhancePageWithAI(
  city: string,
  state: string,
  country: string,
  category: string,
  locale: string = 'en'
): Promise<AIGeneratedContent | null> {
  const generator = new AIContentGenerator();
  
  try {
    return await generator.generateContent({
      city,
      state,
      country,
      category,
      locale
    });
  } catch (error) {
    console.error('Failed to enhance page with AI:', error);
    return null;
  }
}

// Export singleton instance
export const aiContentGenerator = new AIContentGenerator();