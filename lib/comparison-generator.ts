// Dynamic comparison page generator for cities, services, and providers
export interface ComparisonItem {
  name: string;
  slug: string;
  type: 'service' | 'provider' | 'technology';
  description: string;
  image?: string;
  metadata: {
    // For cities
    population?: number;
    gdpPerCapita?: number;
    businessDensity?: number;
    costOfLiving?: number;
    digitalIndex?: number;
    
    // For services
    averagePrice?: string;
    timeframe?: string;
    complexity?: 'low' | 'medium' | 'high';
    marketDemand?: number;
    
    // For providers
    experience?: string;
    pricing?: string;
    specialization?: string[];
    rating?: number;
    
    // For technologies
    learningCurve?: 'easy' | 'medium' | 'hard';
    marketShare?: number;
    yearCreated?: number;
    maintenance?: 'low' | 'medium' | 'high';
  };
}

export interface ComparisonCriteria {
  name: string;
  weight: number; // 1-10 importance
  description: string;
  getValue: (item: ComparisonItem) => number | string;
  isNumeric: boolean;
  higherIsBetter?: boolean; // For numeric values
}

export interface ComparisonResult {
  winner: ComparisonItem;
  items: Array<{
    item: ComparisonItem;
    scores: Array<{
      criteria: string;
      value: string | number;
      score: number; // 0-10
      description: string;
    }>;
    totalScore: number;
    rank: number;
    verdict: string;
  }>;
  summary: {
    bestFor: Array<{
      scenario: string;
      recommendation: string;
      item: ComparisonItem;
    }>;
    keyDifferences: string[];
    bottomLine: string;
  };
}

export class ComparisonGenerator {
  private baseUrl: string;

  constructor(baseUrl = 'https://moydus.com') {
    this.baseUrl = baseUrl;
  }

  // Generate city vs city comparison
  generateCityComparison(
    city1: ComparisonItem,
    city2: ComparisonItem,
    category: string
  ): ComparisonResult {
    const criteria: ComparisonCriteria[] = [
      {
        name: 'Market Size',
        weight: 8,
        description: 'Size of the local market for digital services',
        getValue: (item) => item.metadata.population || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Economic Strength',
        weight: 9,
        description: 'GDP per capita indicating purchasing power',
        getValue: (item) => item.metadata.gdpPerCapita || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Business Density',
        weight: 7,
        description: 'Number of businesses per capita',
        getValue: (item) => item.metadata.businessDensity || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Cost Efficiency',
        weight: 6,
        description: 'Lower cost of living means better value',
        getValue: (item) => item.metadata.costOfLiving || 100,
        isNumeric: true,
        higherIsBetter: false,
      },
      {
        name: 'Digital Readiness',
        weight: 8,
        description: 'Digital infrastructure and adoption',
        getValue: (item) => item.metadata.digitalIndex || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
    ];

    return this.runComparison([city1, city2], criteria, 'city');
  }

  // Generate service vs service comparison
  generateServiceComparison(
    service1: ComparisonItem,
    service2: ComparisonItem,
    context: { city: string; budget: string }
  ): ComparisonResult {
    const criteria: ComparisonCriteria[] = [
      {
        name: 'Cost Effectiveness',
        weight: 8,
        description: 'Value for money considering typical pricing',
        getValue: (item) => this.parsePriceRange(item.metadata.averagePrice || '0'),
        isNumeric: true,
        higherIsBetter: false,
      },
      {
        name: 'Time to Results',
        weight: 7,
        description: 'How quickly you can see results',
        getValue: (item) => this.parseTimeframe(item.metadata.timeframe || '12 weeks'),
        isNumeric: true,
        higherIsBetter: false,
      },
      {
        name: 'Market Demand',
        weight: 6,
        description: 'Current market demand and opportunity',
        getValue: (item) => item.metadata.marketDemand || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Implementation Complexity',
        weight: 5,
        description: 'How complex it is to implement',
        getValue: (item) => this.complexityToScore(item.metadata.complexity || 'medium'),
        isNumeric: true,
        higherIsBetter: false,
      },
    ];

    return this.runComparison([service1, service2], criteria, 'service');
  }

  // Generate technology comparison (e.g., WordPress vs Shopify)
  generateTechnologyComparison(
    tech1: ComparisonItem,
    tech2: ComparisonItem,
    useCase: string
  ): ComparisonResult {
    const criteria: ComparisonCriteria[] = [
      {
        name: 'Ease of Use',
        weight: 8,
        description: 'How easy it is to learn and use',
        getValue: (item) => this.learningCurveToScore(item.metadata.learningCurve || 'medium'),
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Market Adoption',
        weight: 7,
        description: 'Market share and community support',
        getValue: (item) => item.metadata.marketShare || 0,
        isNumeric: true,
        higherIsBetter: true,
      },
      {
        name: 'Maintenance Requirements',
        weight: 6,
        description: 'Ongoing maintenance and updates needed',
        getValue: (item) => this.maintenanceToScore(item.metadata.maintenance || 'medium'),
        isNumeric: true,
        higherIsBetter: false,
      },
      {
        name: 'Maturity',
        weight: 5,
        description: 'How long the technology has been around',
        getValue: (item) => new Date().getFullYear() - (item.metadata.yearCreated || 2020),
        isNumeric: true,
        higherIsBetter: true,
      },
    ];

    return this.runComparison([tech1, tech2], criteria, 'technology');
  }

  // Core comparison engine
  private runComparison(
    items: ComparisonItem[],
    criteria: ComparisonCriteria[],
    type: string
  ): ComparisonResult {
    // Calculate scores for each item
    const scoredItems = items.map(item => {
      const scores = criteria.map(criterion => {
        const rawValue = criterion.getValue(item);
        const score = this.normalizeScore(rawValue, criterion, items);
        const weightedScore = score * criterion.weight;
        
        return {
          criteria: criterion.name,
          value: rawValue,
          score: weightedScore,
          description: this.generateScoreDescription(score, criterion),
        };
      });

      const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
      
      return {
        item,
        scores,
        totalScore,
        rank: 0, // Will be set after sorting
        verdict: this.generateVerdict(totalScore, criteria),
      };
    });

    // Sort by total score and assign ranks
    scoredItems.sort((a, b) => b.totalScore - a.totalScore);
    scoredItems.forEach((item, index) => {
      item.rank = index + 1;
    });

    const winner = scoredItems[0].item;
    const summary = this.generateSummary(scoredItems, criteria, type);

    return {
      winner,
      items: scoredItems,
      summary,
    };
  }

  // Normalize scores to 0-10 scale
  private normalizeScore(
    value: string | number,
    criterion: ComparisonCriteria,
    allItems: ComparisonItem[]
  ): number {
    if (!criterion.isNumeric) {
      return 5; // Default score for non-numeric values
    }

    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    const allValues = allItems.map(item => {
      const val = criterion.getValue(item);
      return typeof val === 'string' ? parseFloat(val) || 0 : val;
    });

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    
    if (min === max) return 5; // All values are the same
    
    const normalized = (numValue - min) / (max - min);
    
    // Invert if lower is better
    const score = criterion.higherIsBetter ? normalized : 1 - normalized;
    
    return Math.round(score * 10);
  }

  // Generate description for score
  private generateScoreDescription(score: number, criterion: ComparisonCriteria): string {
    if (score >= 8) return `Excellent ${criterion.name.toLowerCase()}`;
    if (score >= 6) return `Good ${criterion.name.toLowerCase()}`;
    if (score >= 4) return `Average ${criterion.name.toLowerCase()}`;
    if (score >= 2) return `Below average ${criterion.name.toLowerCase()}`;
    return `Poor ${criterion.name.toLowerCase()}`;
  }

  // Generate overall verdict
  private generateVerdict(totalScore: number, criteria: ComparisonCriteria[]): string {
    const maxPossibleScore = criteria.reduce((sum, c) => sum + c.weight * 10, 0);
    const percentage = (totalScore / maxPossibleScore) * 100;
    
    if (percentage >= 80) return 'Excellent choice';
    if (percentage >= 65) return 'Very good option';
    if (percentage >= 50) return 'Good choice';
    if (percentage >= 35) return 'Decent option';
    return 'Consider alternatives';
  }

  // Generate summary insights
  private generateSummary(
    scoredItems: Array<any>,
    criteria: ComparisonCriteria[],
    type: string
  ): ComparisonResult['summary'] {
    const winner = scoredItems[0];
    const runnerUp = scoredItems[1];
    
    const bestFor: any[] = [];
    const keyDifferences: any[] = [];
    
    // Find what each option is best for
    criteria.forEach(criterion => {
      const winnerScore = winner.scores.find((s: any) => s.criteria === criterion.name);
      const runnerUpScore = runnerUp?.scores.find((s: any) => s.criteria === criterion.name);
      
      if (runnerUpScore && runnerUpScore.score > winnerScore.score) {
        bestFor.push({
          scenario: `When ${criterion.name.toLowerCase()} is priority`,
          recommendation: `Consider ${runnerUp.item.name}`,
          item: runnerUp.item,
        });
      }
    });

    // If winner dominates, add scenarios where it excels
    if (bestFor.length === 0) {
      const topCriteria = criteria
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2);
      
      topCriteria.forEach(criterion => {
        bestFor.push({
          scenario: `For ${criterion.name.toLowerCase()}-focused projects`,
          recommendation: `${winner.item.name} is the clear choice`,
          item: winner.item,
        });
      });
    }

    // Identify key differences
    const significantDifferences = winner.scores.filter((score: any) => {
      const otherScore = runnerUp?.scores.find((s: any) => s.criteria === score.criteria);
      return otherScore && Math.abs(score.score - otherScore.score) > 20;
    });

    significantDifferences.forEach((diff: any) => {
      keyDifferences.push(
        `${winner.item.name} significantly outperforms in ${diff.criteria.toLowerCase()}`
      );
    });

    const bottomLine = this.generateBottomLine(winner, runnerUp, type);

    return {
      bestFor: bestFor.slice(0, 3),
      keyDifferences: keyDifferences.slice(0, 3),
      bottomLine,
    };
  }

  // Generate bottom line recommendation
  private generateBottomLine(winner: any, runnerUp: any, type: string): string {
    const scoreDiff = winner.totalScore - (runnerUp?.totalScore || 0);
    const winnerName = winner.item.name;
    const runnerUpName = runnerUp?.item.name || '';
    
    if (scoreDiff > 50) {
      return `${winnerName} is the clear winner with superior performance across most criteria.`;
    }
    
    if (scoreDiff > 20) {
      return `${winnerName} edges out ${runnerUpName} in most areas, making it the safer choice.`;
    }
    
    return `Both ${winnerName} and ${runnerUpName} are competitive options. Your specific needs and priorities should drive the final decision.`;
  }

  // Helper methods for value parsing
  private parsePriceRange(priceStr: string): number {
    // Extract number from price range like "$1,500-$15,000"
    const matches = priceStr.match(/[\d,]+/g);
    if (!matches) return 0;
    
    const numbers = matches.map(m => parseInt(m.replace(/,/g, '')));
    return numbers.length > 1 ? (numbers[0] + numbers[1]) / 2 : numbers[0];
  }

  private parseTimeframe(timeStr: string): number {
    // Convert timeframe to weeks
    const weekMatch = timeStr.match(/(\d+)\s*week/i);
    if (weekMatch) return parseInt(weekMatch[1]);
    
    const monthMatch = timeStr.match(/(\d+)\s*month/i);
    if (monthMatch) return parseInt(monthMatch[1]) * 4;
    
    return 12; // Default 12 weeks
  }

  private complexityToScore(complexity: string): number {
    switch (complexity) {
      case 'low': return 2;
      case 'medium': return 5;
      case 'high': return 8;
      default: return 5;
    }
  }

  private learningCurveToScore(curve: string): number {
    switch (curve) {
      case 'easy': return 9;
      case 'medium': return 6;
      case 'hard': return 3;
      default: return 6;
    }
  }

  private maintenanceToScore(maintenance: string): number {
    switch (maintenance) {
      case 'low': return 2;
      case 'medium': return 5;
      case 'high': return 8;
      default: return 5;
    }
  }

  // Generate popular comparison combinations
  generatePopularComparisons(category: string): Array<{
    title: string;
    slug: string;
    description: string;
    type: 'service' | 'technology' | 'provider';
  }> {
    const comparisons = [];
    
    if (category === 'web-design') {
      comparisons.push(
        {
          title: 'WordPress vs Shopify for E-commerce',
          slug: 'wordpress-vs-shopify',
          description: 'Compare the two most popular platforms for online stores',
          type: 'technology' as const,
        },
        {
          title: 'Custom Development vs Website Builders',
          slug: 'custom-vs-builder',
          description: 'When to choose custom development over drag-and-drop builders',
          type: 'service' as const,
        },
        {
          title: 'New York vs San Francisco Web Design Markets',
          slug: 'nyc-vs-sf-web-design',
          description: 'Compare costs, talent, and opportunities in major tech hubs',
          type: 'provider' as const,
        }
      );
    }
    
    if (category === 'seo-services') {
      comparisons.push(
        {
          title: 'Local SEO vs National SEO Strategy',
          slug: 'local-vs-national-seo',
          description: 'Which SEO approach is right for your business?',
          type: 'service' as const,
        },
        {
          title: 'In-house SEO Team vs SEO Agency',
          slug: 'inhouse-vs-agency-seo',
          description: 'Compare costs and benefits of different SEO approaches',
          type: 'service' as const,
        }
      );
    }
    
    return comparisons;
  }
}

// Pre-defined comparison data
export const COMPARISON_DATA = {
  cities: {
    'new-york': {
      name: 'New York',
      slug: 'new-york',
      type: 'provider' as const,
      description: 'The financial capital with huge market opportunities',
      metadata: {
        population: 8336000,
        gdpPerCapita: 65000,
        businessDensity: 95,
        costOfLiving: 185,
        digitalIndex: 92,
      },
    },
    'san-francisco': {
      name: 'San Francisco',
      slug: 'san-francisco',
      type: 'provider' as const,
      description: 'Tech hub with high-value digital service demand',
      metadata: {
        population: 875000,
        gdpPerCapita: 85000,
        businessDensity: 98,
        costOfLiving: 230,
        digitalIndex: 98,
      },
    },
    'berlin': {
      name: 'Berlin',
      slug: 'berlin',
      type: 'provider' as const,
      description: 'European startup capital with growing tech scene',
      metadata: {
        population: 3700000,
        gdpPerCapita: 45000,
        businessDensity: 78,
        costOfLiving: 95,
        digitalIndex: 85,
      },
    },
  },
  
  services: {
    'web-design': {
      name: 'Web Design',
      slug: 'web-design',
      type: 'service' as const,
      description: 'Custom website design and development',
      metadata: {
        averagePrice: '$3000-$15000',
        timeframe: '6-12 weeks',
        complexity: 'medium' as const,
        marketDemand: 85,
      },
    },
    'seo-services': {
      name: 'SEO Services',
      slug: 'seo-services',
      type: 'service' as const,
      description: 'Search engine optimization and digital marketing',
      metadata: {
        averagePrice: '$1500-$8000',
        timeframe: '12-24 weeks',
        complexity: 'medium' as const,
        marketDemand: 90,
      },
    },
  },
  
  technologies: {
    'wordpress': {
      name: 'WordPress',
      slug: 'wordpress',
      type: 'technology' as const,
      description: 'Popular content management system',
      metadata: {
        learningCurve: 'medium' as const,
        marketShare: 43,
        yearCreated: 2003,
        maintenance: 'medium' as const,
      },
    },
    'shopify': {
      name: 'Shopify',
      slug: 'shopify',
      type: 'technology' as const,
      description: 'E-commerce platform for online stores',
      metadata: {
        learningCurve: 'easy' as const,
        marketShare: 25,
        yearCreated: 2006,
        maintenance: 'low' as const,
      },
    },
  },
} as const;

// Export singleton instance
export const comparisonGenerator = new ComparisonGenerator();