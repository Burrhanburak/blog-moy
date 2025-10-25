export interface TopicCluster {
  hub: HubPage;
  spokes: SpokePage[];
  supportingContent: SupportingContent[];
}

export interface HubPage {
  type: 'category' | 'country' | 'comparison';
  url: string;
  title: string;
  authority: number;
  targetKeywords: string[];
}

export interface SpokePage {
  type: 'city-category' | 'state' | 'guide';
  url: string;
  title: string;
  hubUrl: string;
  internalLinks: InternalLink[];
  topicalRelevance: number;
}

export interface SupportingContent {
  type: 'blog' | 'faq' | 'guide' | 'comparison';
  url: string;
  title: string;
  linkedHubs: string[];
  linkedSpokes: string[];
}

export interface InternalLink {
  url: string;
  anchor: string;
  context: string;
  strength: number;
}

export class TopicClusterManager {
  
  // Generate complete topic cluster architecture
  generateClusterArchitecture(countries: string[], categories: string[]): TopicCluster[] {
    const clusters: TopicCluster[] = [];
    
    // Category-based clusters (strongest)
    categories.forEach(category => {
      clusters.push(this.generateCategoryCluster(category, countries));
    });
    
    // Country-based clusters  
    countries.forEach(country => {
      clusters.push(this.generateCountryCluster(country, categories));
    });
    
    // Comparison clusters
    clusters.push(...this.generateComparisonClusters(categories, countries));
    
    return clusters;
  }
  
  private generateCategoryCluster(category: string, countries: string[]): TopicCluster {
    // Hub page: /web-design/ or /seo-services/
    const hub: HubPage = {
      type: 'category',
      url: `/${category}/`,
      title: `${this.formatCategory(category)} Services - Global Directory`,
      authority: 95,
      targetKeywords: [
        `${category} services`,
        `best ${category} companies`,
        `${category} agencies worldwide`,
        `professional ${category}`,
        `${category} pricing guide`,
        `${category} comparison 2025`
      ]
    };
    
    // Spoke pages: City-category combinations
    const spokes: SpokePage[] = [];
    countries.forEach(country => {
      const cities = this.getCitiesByCountry(country);
      cities.slice(0, 20).forEach(city => { // Top 20 cities per country
        spokes.push({
          type: 'city-category',
          url: `/${country.toLowerCase()}/${city.state.toLowerCase()}/${city.name.toLowerCase()}/${category}/`,
          title: `${this.formatCategory(category)} in ${city.name}, ${city.state}`,
          hubUrl: hub.url,
          internalLinks: [
            {
              url: hub.url,
              anchor: `${category} services`,
              context: `professional ${category} providers`,
              strength: 9
            },
            {
              url: `/${country.toLowerCase()}/${city.state.toLowerCase()}/`,
              anchor: `${city.state} services`,
              context: `other services in ${city.state}`,
              strength: 7
            }
          ],
          topicalRelevance: this.calculateTopicalRelevance(city, category)
        });
      });
    });
    
    // Supporting content
    const supportingContent: SupportingContent[] = [
      {
        type: 'guide',
        url: `/blog/how-to-choose-${category}-provider/`,
        title: `How to Choose the Right ${this.formatCategory(category)} Provider (2025)`,
        linkedHubs: [hub.url],
        linkedSpokes: spokes.slice(0, 10).map(s => s.url)
      },
      {
        type: 'comparison',
        url: `/blog/${category}-pricing-guide-2025/`,
        title: `${this.formatCategory(category)} Pricing Guide (2025)`,
        linkedHubs: [hub.url],
        linkedSpokes: spokes.slice(0, 15).map(s => s.url)
      },
      {
        type: 'blog',
        url: `/blog/${category}-trends-2025/`,
        title: `Top ${this.formatCategory(category)} Trends for 2025`,
        linkedHubs: [hub.url],
        linkedSpokes: spokes.slice(0, 8).map(s => s.url)
      }
    ];
    
    return { hub, spokes, supportingContent };
  }
  
  private generateCountryCluster(country: string, categories: string[]): TopicCluster {
    // Hub page: /germany/ or /united-states/
    const hub: HubPage = {
      type: 'country',
      url: `/${country.toLowerCase()}/`,
      title: `Professional Business Services in ${country}`,
      authority: 85,
      targetKeywords: [
        `business services ${country}`,
        `digital agencies ${country}`,
        `${country} business directory`,
        `professional services ${country}`,
        `best companies ${country}`
      ]
    };
    
    // Spoke pages: State/region pages
    const spokes: SpokePage[] = [];
    const states = this.getStatesByCountry(country);
    states.forEach(state => {
      spokes.push({
        type: 'state',
        url: `/${country.toLowerCase()}/${state.toLowerCase()}/`,
        title: `Business Services in ${state}, ${country}`,
        hubUrl: hub.url,
        internalLinks: [
          {
            url: hub.url,
            anchor: `${country} services`,
            context: `services throughout ${country}`,
            strength: 8
          }
        ],
        topicalRelevance: 8
      });
    });
    
    const supportingContent: SupportingContent[] = [
      {
        type: 'guide',
        url: `/blog/doing-business-in-${country.toLowerCase()}/`,
        title: `Complete Guide to Doing Business in ${country} (2025)`,
        linkedHubs: [hub.url],
        linkedSpokes: spokes.slice(0, 5).map(s => s.url)
      }
    ];
    
    return { hub, spokes, supportingContent };
  }
  
  private generateComparisonClusters(categories: string[], countries: string[]): TopicCluster[] {
    const clusters: TopicCluster[] = [];
    
    // City vs City comparisons for high-value categories
    const highValueCategories = ['web-design', 'seo-services', 'app-development'];
    const highValueCities = ['new-york', 'san-francisco', 'berlin', 'london', 'toronto'];
    
    highValueCategories.forEach(category => {
      for (let i = 0; i < highValueCities.length - 1; i++) {
        for (let j = i + 1; j < highValueCities.length; j++) {
          const city1 = highValueCities[i];
          const city2 = highValueCities[j];
          
          const hub: HubPage = {
            type: 'comparison',
            url: `/compare/${category}/${city1}-vs-${city2}/`,
            title: `${this.formatCategory(category)}: ${this.formatCity(city1)} vs ${this.formatCity(city2)}`,
            authority: 70,
            targetKeywords: [
              `${category} ${city1} vs ${city2}`,
              `compare ${category} ${city1} ${city2}`,
              `best ${category} ${city1} or ${city2}`
            ]
          };
          
          clusters.push({
            hub,
            spokes: [],
            supportingContent: []
          });
        }
      }
    });
    
    return clusters;
  }
  
  // Generate intelligent internal linking strategy
  generateInternalLinkingStrategy(clusters: TopicCluster[]): {
    hubToSpoke: InternalLink[];
    spokeToHub: InternalLink[];
    spokeToSpoke: InternalLink[];
    supportingToCluster: InternalLink[];
  } {
    const hubToSpoke: InternalLink[] = [];
    const spokeToHub: InternalLink[] = [];
    const spokeToSpoke: InternalLink[] = [];
    const supportingToCluster: InternalLink[] = [];
    
    clusters.forEach(cluster => {
      // Hub to top spokes (authority distribution)
      const topSpokes = cluster.spokes
        .sort((a, b) => b.topicalRelevance - a.topicalRelevance)
        .slice(0, 15); // Max 15 links from hub
      
      topSpokes.forEach((spoke, index) => {
        hubToSpoke.push({
          url: spoke.url,
          anchor: this.generateContextualAnchor(spoke.title),
          context: `top ${cluster.hub.title.toLowerCase()} providers`,
          strength: 10 - Math.floor(index / 3) // Decreasing strength
        });
      });
      
      // Spokes to hub (topic reinforcement)
      cluster.spokes.forEach(spoke => {
        spokeToHub.push({
          url: cluster.hub.url,
          anchor: this.generateHubAnchor(cluster.hub),
          context: `explore all ${cluster.hub.title.toLowerCase()}`,
          strength: 9
        });
      });
      
      // Spoke to spoke (related entities)
      cluster.spokes.forEach(spoke => {
        const relatedSpokes = this.findRelatedSpokes(spoke, cluster.spokes);
        relatedSpokes.slice(0, 5).forEach(relatedSpoke => {
          spokeToSpoke.push({
            url: relatedSpoke.url,
            anchor: this.generateSpokeAnchor(relatedSpoke),
            context: `similar services in the area`,
            strength: 6
          });
        });
      });
      
      // Supporting content to cluster
      cluster.supportingContent.forEach(content => {
        // Link to hub
        supportingToCluster.push({
          url: cluster.hub.url,
          anchor: this.generateHubAnchor(cluster.hub),
          context: `professional services directory`,
          strength: 8
        });
        
        // Link to top spokes
        content.linkedSpokes.slice(0, 8).forEach(spokeUrl => {
          const spoke = cluster.spokes.find(s => s.url === spokeUrl);
          if (spoke) {
            supportingToCluster.push({
              url: spoke.url,
              anchor: this.generateSpokeAnchor(spoke),
              context: `local service providers`,
              strength: 6
            });
          }
        });
      });
    });
    
    return { hubToSpoke, spokeToHub, spokeToSpoke, supportingToCluster };
  }
  
  // Calculate GDP/cost-based city relationships
  generateGDPBasedRelations(cities: Array<{name: string, gdpPerCapita: number, costIndex: number}>): Array<{
    city1: string;
    city2: string;
    relation: 'similar-market' | 'cost-comparison' | 'tier-upgrade';
    strength: number;
  }> {
    const relations: any[] = [];
    
    cities.forEach(city1 => {
      cities.forEach(city2 => {
        if (city1.name !== city2.name) {
          const gdpDiff = Math.abs(city1.gdpPerCapita - city2.gdpPerCapita);
          const costDiff = Math.abs(city1.costIndex - city2.costIndex);
          
          if (gdpDiff < 5000 && costDiff < 0.2) {
            relations.push({
              city1: city1.name,
              city2: city2.name,
              relation: 'similar-market',
              strength: 9
            });
          } else if (costDiff < 0.3) {
            relations.push({
              city1: city1.name,
              city2: city2.name,
              relation: 'cost-comparison',
              strength: 7
            });
          } else if (gdpDiff > 10000) {
            relations.push({
              city1: city1.name,
              city2: city2.name,
              relation: 'tier-upgrade',
              strength: 5
            });
          }
        }
      });
    });
    
    return relations;
  }
  
  // Helper methods
  private formatCategory(category: string): string {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  private formatCity(city: string): string {
    return city.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  private getCitiesByCountry(country: string): Array<{name: string, state: string}> {
    // This would come from your database
    const cityData: Record<string, Array<{name: string, state: string}>> = {
      'united-states': [
        {name: 'new-york', state: 'new-york'},
        {name: 'los-angeles', state: 'california'},
        {name: 'chicago', state: 'illinois'},
        {name: 'houston', state: 'texas'},
        {name: 'phoenix', state: 'arizona'}
      ],
      'germany': [
        {name: 'berlin', state: 'berlin'},
        {name: 'munich', state: 'bavaria'},
        {name: 'hamburg', state: 'hamburg'},
        {name: 'cologne', state: 'north-rhine-westphalia'}
      ]
    };
    
    return cityData[country] || [];
  }
  
  private getStatesByCountry(country: string): string[] {
    const stateData: Record<string, string[]> = {
      'united-states': ['california', 'texas', 'new-york', 'florida', 'illinois'],
      'germany': ['bavaria', 'berlin', 'hamburg', 'baden-wurttemberg'],
      'canada': ['ontario', 'quebec', 'british-columbia', 'alberta']
    };
    
    return stateData[country] || [];
  }
  
  private calculateTopicalRelevance(city: {name: string, state: string}, category: string): number {
    // This would use real data about market size, competition, etc.
    const baseScore = 5;
    const cityBonus = city.name.includes('new-york') || city.name.includes('san-francisco') ? 3 : 0;
    const categoryBonus = ['web-design', 'seo-services'].includes(category) ? 2 : 0;
    
    return Math.min(10, baseScore + cityBonus + categoryBonus);
  }
  
  private findRelatedSpokes(spoke: SpokePage, allSpokes: SpokePage[]): SpokePage[] {
    return allSpokes
      .filter(s => s.url !== spoke.url)
      .filter(s => this.calculateSpokeRelatedness(spoke, s) > 5)
      .sort((a, b) => this.calculateSpokeRelatedness(spoke, b) - this.calculateSpokeRelatedness(spoke, a));
  }
  
  private calculateSpokeRelatedness(spoke1: SpokePage, spoke2: SpokePage): number {
    let score = 0;
    
    // Same category = high relatedness
    if (spoke1.url.includes(spoke2.url.split('/').pop()?.split('/')[0] || '')) {
      score += 5;
    }
    
    // Geographic proximity (simplified)
    const spoke1Parts = spoke1.url.split('/');
    const spoke2Parts = spoke2.url.split('/');
    if (spoke1Parts[1] === spoke2Parts[1]) { // Same country
      score += 3;
      if (spoke1Parts[2] === spoke2Parts[2]) { // Same state
        score += 2;
      }
    }
    
    return score;
  }
  
  private generateContextualAnchor(title: string): string {
    const variations = [
      title,
      title.replace(' in ', ' '),
      title.replace(' Services', ''),
      title.toLowerCase()
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
  }
  
  private generateHubAnchor(hub: HubPage): string {
    const category = hub.url.replace(/\//g, '');
    const variations = [
      `${category} services`,
      `professional ${category}`,
      `${category} providers`,
      `${category} directory`
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
  }
  
  private generateSpokeAnchor(spoke: SpokePage): string {
    return spoke.title.replace(' Services', '').replace(' - ', ' ');
  }
}