export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

export interface SEOMetrics {
  url: string;
  title: string;
  metaDescription: string;
  h1Count: number;
  imageCount: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  loadTime: number;
  mobileScore: number;
  desktopScore: number;
}

export interface TrafficData {
  url: string;
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgTimeOnPage: number;
  conversionRate: number;
  organicTraffic: number;
  directTraffic: number;
  referralTraffic: number;
}

export interface ContentDecayDetection {
  url: string;
  lastUpdated: string;
  trafficTrend: 'increasing' | 'stable' | 'declining';
  rankingChanges: number[];
  competitorActivity: boolean;
  freshnessTriggers: string[];
  priorityScore: number;
}

export class PerformanceMonitor {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  // Monitor Core Web Vitals for programmatic pages
  async monitorCoreWebVitals(urls: string[]): Promise<Map<string, PerformanceMetrics>> {
    const results = new Map<string, PerformanceMetrics>();
    
    // Use Google PageSpeed Insights API
    for (const url of urls) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/pagespeed/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${this.apiKey}&category=performance&strategy=mobile`
        );
        
        const data = await response.json();
        const metrics = this.extractWebVitals(data);
        results.set(url, metrics);
        
        // Add delay to respect API limits
        await this.delay(1000);
      } catch (error) {
        console.error(`Error monitoring ${url}:`, error);
      }
    }
    
    return results;
  }

  private extractWebVitals(data: any): PerformanceMetrics {
    const audits = data.lighthouseResult?.audits || {};
    
    return {
      pageLoadTime: audits['speed-index']?.numericValue || 0,
      firstContentfulPaint: audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint: audits['largest-contentful-paint']?.numericValue || 0,
      cumulativeLayoutShift: audits['cumulative-layout-shift']?.numericValue || 0,
      firstInputDelay: audits['max-potential-fid']?.numericValue || 0,
      timeToInteractive: audits['interactive']?.numericValue || 0
    };
  }

  // Audit SEO health of programmatic pages
  async auditSEOHealth(urls: string[]): Promise<Map<string, SEOMetrics>> {
    const results = new Map<string, SEOMetrics>();
    
    for (const url of urls) {
      try {
        // This would integrate with your chosen SEO tool (Screaming Frog, Sitebulb, etc.)
        const seoData = await this.analyzeSEOMetrics(url);
        results.set(url, seoData);
        
        await this.delay(500);
      } catch (error) {
        console.error(`Error auditing SEO for ${url}:`, error);
      }
    }
    
    return results;
  }

  private async analyzeSEOMetrics(url: string): Promise<SEOMetrics> {
    // This is a simplified version - you'd integrate with actual tools
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse HTML for SEO elements
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const metaDescMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
      const h1Matches = html.match(/<h1[^>]*>/gi) || [];
      const imgMatches = html.match(/<img[^>]*>/gi) || [];
      const internalLinkMatches = html.match(/<a[^>]*href=["\'][^"\']*["\'][^>]*>/gi) || [];
      const wordCount = html.replace(/<[^>]*>/g, '').split(/\s+/).length;
      
      return {
        url,
        title: titleMatch?.[1] || '',
        metaDescription: metaDescMatch?.[1] || '',
        h1Count: h1Matches.length,
        imageCount: imgMatches.length,
        internalLinks: internalLinkMatches.filter(link => 
          link.includes(this.baseUrl) || link.includes('href="/')
        ).length,
        externalLinks: internalLinkMatches.length - internalLinkMatches.filter(link => 
          link.includes(this.baseUrl) || link.includes('href="/')
        ).length,
        wordCount,
        loadTime: 0, // Would be measured
        mobileScore: 0, // Would come from PageSpeed
        desktopScore: 0 // Would come from PageSpeed
      };
    } catch (error) {
      console.error(`Error analyzing ${url}:`, error);
      return this.getDefaultSEOMetrics(url);
    }
  }

  private getDefaultSEOMetrics(url: string): SEOMetrics {
    return {
      url,
      title: '',
      metaDescription: '',
      h1Count: 0,
      imageCount: 0,
      internalLinks: 0,
      externalLinks: 0,
      wordCount: 0,
      loadTime: 0,
      mobileScore: 0,
      desktopScore: 0
    };
  }

  // Detect content decay and optimization opportunities
  async detectContentDecay(urls: string[]): Promise<ContentDecayDetection[]> {
    const decayData: ContentDecayDetection[] = [];
    
    for (const url of urls) {
      try {
        // This would integrate with Google Search Console API and analytics
        const trafficData = await this.getTrafficTrends(url);
        const rankingData = await this.getRankingTrends(url);
        const competitorData = await this.checkCompetitorActivity(url);
        
        const decay: ContentDecayDetection = {
          url,
          lastUpdated: await this.getLastModified(url),
          trafficTrend: this.analyzeTrafficTrend(trafficData),
          rankingChanges: rankingData,
          competitorActivity: competitorData.hasNewContent,
          freshnessTriggers: this.identifyFreshnessTriggers(url),
          priorityScore: this.calculatePriorityScore(trafficData, rankingData, competitorData)
        };
        
        decayData.push(decay);
      } catch (error) {
        console.error(`Error detecting decay for ${url}:`, error);
      }
    }
    
    return decayData.sort((a, b) => b.priorityScore - a.priorityScore);
  }

  private async getTrafficTrends(url: string): Promise<number[]> {
    // Mock data - would integrate with Google Analytics 4 API
    return Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500);
  }

  private async getRankingTrends(url: string): Promise<number[]> {
    // Mock data - would integrate with ranking tracking tool
    return Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 1);
  }

  private async checkCompetitorActivity(url: string): Promise<{hasNewContent: boolean, newPages: number}> {
    // Mock data - would use competitor monitoring tools
    return {
      hasNewContent: Math.random() > 0.7,
      newPages: Math.floor(Math.random() * 5)
    };
  }

  private async getLastModified(url: string): Promise<string> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.headers.get('last-modified') || new Date().toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  private analyzeTrafficTrend(data: number[]): 'increasing' | 'stable' | 'declining' {
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const earlier = data.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    
    if (recent > earlier * 1.1) return 'increasing';
    if (recent < earlier * 0.9) return 'declining';
    return 'stable';
  }

  private identifyFreshnessTriggers(url: string): string[] {
    const triggers: string[] = [];
    
    // Extract location and category from URL
    const pathParts = url.split('/');
    const hasYear = url.includes('2025') || url.includes('2024');
    const hasLocation = pathParts.length > 4;
    const hasCategory = pathParts.length > 5;
    
    if (!hasYear) {
      triggers.push('Add current year to title and content');
    }
    
    if (hasLocation) {
      triggers.push('Update local market data and statistics');
    }
    
    if (hasCategory) {
      triggers.push('Refresh industry trends and pricing information');
    }
    
    triggers.push('Update testimonials and case studies');
    triggers.push('Refresh competitor analysis');
    
    return triggers;
  }

  private calculatePriorityScore(
    trafficData: number[], 
    rankingData: number[], 
    competitorData: {hasNewContent: boolean, newPages: number}
  ): number {
    let score = 0;
    
    // Traffic importance (0-40 points)
    const avgTraffic = trafficData.reduce((a, b) => a + b, 0) / trafficData.length;
    score += Math.min(40, avgTraffic / 25);
    
    // Ranking importance (0-30 points)
    const avgRanking = rankingData.reduce((a, b) => a + b, 0) / rankingData.length;
    score += Math.max(0, 30 - avgRanking);
    
    // Competition pressure (0-20 points)
    if (competitorData.hasNewContent) score += 15;
    score += Math.min(5, competitorData.newPages);
    
    // Trend penalties (0-10 points)
    const trafficTrend = this.analyzeTrafficTrend(trafficData);
    if (trafficTrend === 'declining') score += 10;
    else if (trafficTrend === 'stable') score += 5;
    
    return Math.round(score);
  }

  // Generate optimization recommendations
  generateOptimizationReport(
    performanceData: Map<string, PerformanceMetrics>,
    seoData: Map<string, SEOMetrics>,
    trafficData: Map<string, TrafficData>,
    decayData: ContentDecayDetection[]
  ): OptimizationReport {
    const recommendations: Recommendation[] = [];
    
    // Performance recommendations
    performanceData.forEach((metrics, url) => {
      if (metrics.largestContentfulPaint > 2500) {
        recommendations.push({
          type: 'performance',
          priority: 'high',
          url,
          issue: 'Large Contentful Paint too slow',
          recommendation: 'Optimize images, reduce server response time, eliminate render-blocking resources',
          estimatedImpact: 'high'
        });
      }
      
      if (metrics.cumulativeLayoutShift > 0.1) {
        recommendations.push({
          type: 'performance',
          priority: 'medium',
          url,
          issue: 'Layout shift detected',
          recommendation: 'Add size attributes to images, reserve space for dynamic content',
          estimatedImpact: 'medium'
        });
      }
    });
    
    // SEO recommendations
    seoData.forEach((metrics, url) => {
      if (metrics.wordCount < 800) {
        recommendations.push({
          type: 'content',
          priority: 'medium',
          url,
          issue: 'Content too short',
          recommendation: 'Expand content to at least 1000 words with relevant information',
          estimatedImpact: 'medium'
        });
      }
      
      if (metrics.internalLinks < 3) {
        recommendations.push({
          type: 'seo',
          priority: 'low',
          url,
          issue: 'Insufficient internal links',
          recommendation: 'Add 3-5 relevant internal links to improve site structure',
          estimatedImpact: 'low'
        });
      }
    });
    
    // Content freshness recommendations
    decayData.slice(0, 20).forEach(decay => {
      recommendations.push({
        type: 'content',
        priority: decay.priorityScore > 70 ? 'high' : decay.priorityScore > 40 ? 'medium' : 'low',
        url: decay.url,
        issue: 'Content needs refreshing',
        recommendation: decay.freshnessTriggers.join('; '),
        estimatedImpact: decay.priorityScore > 70 ? 'high' : 'medium'
      });
    });
    
    return {
      generatedAt: new Date().toISOString(),
      totalPages: performanceData.size,
      recommendations: recommendations.slice(0, 50), // Top 50 recommendations
      summary: this.generateSummary(recommendations)
    };
  }

  private generateSummary(recommendations: Recommendation[]): ReportSummary {
    const high = recommendations.filter(r => r.priority === 'high').length;
    const medium = recommendations.filter(r => r.priority === 'medium').length;
    const low = recommendations.filter(r => r.priority === 'low').length;
    
    const types = recommendations.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      highPriority: high,
      mediumPriority: medium,
      lowPriority: low,
      byType: types,
      topIssues: Object.entries(types)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([type]) => type)
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export interface Recommendation {
  type: 'performance' | 'seo' | 'content' | 'technical';
  priority: 'high' | 'medium' | 'low';
  url: string;
  issue: string;
  recommendation: string;
  estimatedImpact: 'high' | 'medium' | 'low';
}

export interface OptimizationReport {
  generatedAt: string;
  totalPages: number;
  recommendations: Recommendation[];
  summary: ReportSummary;
}

export interface ReportSummary {
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  byType: Record<string, number>;
  topIssues: string[];
}

// Usage example
export async function runOptimizationScan(baseUrl: string, apiKey: string) {
  const monitor = new PerformanceMonitor(apiKey, baseUrl);
  
  // Get list of URLs to monitor (could come from sitemap)
  const urls = [
    `${baseUrl}/web-design/`,
    `${baseUrl}/en/germany/berlin/web-design/`,
    `${baseUrl}/en/united-states/california/san-francisco/seo-services/`
    // ... more URLs
  ];
  
  // Run all monitoring tasks
  const [performanceData, seoData, decayData] = await Promise.all([
    monitor.monitorCoreWebVitals(urls),
    monitor.auditSEOHealth(urls),
    monitor.detectContentDecay(urls)
  ]);
  
  // Generate comprehensive report
  const report = monitor.generateOptimizationReport(
    performanceData,
    seoData,
    new Map(), // Traffic data would be filled from analytics
    decayData
  );
  
  return report;
}