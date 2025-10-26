// GEO-Optimized Analytics & Performance Monitoring System
// Supports: Google Analytics 4, Search Console API, Core Web Vitals, Custom GEO Metrics

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface GeoPageView {
  page_title: string;
  page_location: string;
  city: string;
  state: string;
  country: string;
  locale: string;
  category?: string;
  content_group1?: string; // Category
  content_group2?: string; // Geography Level (city/state/country)
  content_group3?: string; // Content Type (service/blog/landing)
}

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  page_url: string;
  device_type: 'mobile' | 'desktop' | 'tablet';
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class AnalyticsManager {
  private isInitialized: boolean = false;
  private gaId: string = '';
  private debugMode: boolean = false;

  init(gaId: string, debugMode = false) {
    this.gaId = gaId;
    this.debugMode = debugMode;
    
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Initialize Google Analytics 4
    this.initGA4();
    
    // Initialize Web Vitals monitoring
    this.initWebVitals();
    
    // Initialize custom GEO events
    this.initGeoTracking();
    
    this.isInitialized = true;
    this.log('Analytics initialized successfully');
  }

  private initGA4() {
    // Load GA4 script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_dimension_1': 'city',
        'custom_dimension_2': 'state', 
        'custom_dimension_3': 'country',
        'custom_dimension_4': 'locale',
        'custom_dimension_5': 'category',
        'custom_dimension_6': 'content_type'
      }
    });
  }

  private async initWebVitals() {
    try {
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
      
      const sendVitalMetric = (metric: any) => {
        const webVital: WebVitalsMetric = {
          name: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating,
          page_url: window.location.pathname,
          device_type: this.getDeviceType()
        };

        this.trackEvent({
          action: 'web_vital',
          category: 'Performance',
          label: metric.name,
          value: Math.round(metric.value),
          custom_parameters: webVital
        });

        this.log('Web Vital recorded:', webVital);
      };

      onCLS(sendVitalMetric);
      onFCP(sendVitalMetric);
      onLCP(sendVitalMetric);
      onTTFB(sendVitalMetric);
      onINP(sendVitalMetric);
      
    } catch (error) {
      this.log('Web Vitals library not available:', error);
    }
  }

  private initGeoTracking() {
    // Track scroll depth for engagement
    this.trackScrollDepth();
    
    // Track CTA clicks
    this.trackCTAClicks();
    
    // Track form submissions
    this.trackFormSubmissions();
  }

  // Track GEO-specific page view
  trackGeoPageView(data: GeoPageView) {
    if (!this.isInitialized) return;

    window.gtag('event', 'page_view', {
      page_title: data.page_title,
      page_location: data.page_location,
      city: data.city,
      state: data.state,
      country: data.country,
      locale: data.locale,
      category: data.category,
      content_group1: data.content_group1,
      content_group2: data.content_group2,
      content_group3: data.content_group3,
      custom_dimension_1: data.city,
      custom_dimension_2: data.state,
      custom_dimension_3: data.country,
      custom_dimension_4: data.locale,
      custom_dimension_5: data.category,
      custom_dimension_6: data.content_group3
    });

    this.log('GEO page view tracked:', data);
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) return;

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    });

    this.log('Event tracked:', event);
  }

  // Track lead generation (form submissions)
  trackLead(data: {
    city: string;
    state: string;
    country: string;
    category: string;
    lead_source: string;
    form_name: string;
  }) {
    this.trackEvent({
      action: 'generate_lead',
      category: 'Lead Generation',
      label: `${data.city} - ${data.category}`,
      custom_parameters: {
        city: data.city,
        state: data.state,
        country: data.country,
        category: data.category,
        lead_source: data.lead_source,
        form_name: data.form_name,
        value: 1
      }
    });
  }

  // Track search queries (for GEO keyword insights)
  trackSearch(query: string, results_count: number, location: string) {
    this.trackEvent({
      action: 'search',
      category: 'Site Search',
      label: query,
      value: results_count,
      custom_parameters: {
        search_term: query,
        results_count,
        location
      }
    });
  }

  // Track external link clicks (for referral insights)
  trackExternalClick(url: string, context: string) {
    this.trackEvent({
      action: 'click',
      category: 'External Link',
      label: url,
      custom_parameters: {
        link_url: url,
        link_context: context
      }
    });
  }

  private trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90];
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        const milestone = milestones.find(m => scrollPercent >= m && maxScroll < m);
        if (milestone) {
          this.trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: `${milestone}%`,
            value: milestone
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private trackCTAClicks() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const cta = target.closest('[data-cta], .cta, [href*="contact"], [href*="quote"]');
      
      if (cta) {
        const ctaText = cta.textContent?.trim() || 'Unknown CTA';
        const ctaType = cta.getAttribute('data-cta') || 'generic';
        
        this.trackEvent({
          action: 'click',
          category: 'CTA',
          label: ctaText,
          custom_parameters: {
            cta_type: ctaType,
            cta_text: ctaText,
            page_url: window.location.pathname
          }
        });
      }
    });
  }

  private trackFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.name || form.id || 'unknown_form';
      
      this.trackEvent({
        action: 'submit',
        category: 'Form',
        label: formName,
        custom_parameters: {
          form_name: formName,
          form_method: form.method,
          page_url: window.location.pathname
        }
      });
    });
  }

  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private log(...args: any[]) {
    if (this.debugMode && typeof console !== 'undefined') {
      console.log('[Analytics]', ...args);
    }
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// React Hook for easy analytics usage
export function useAnalytics() {
  const trackGeoPageView = (data: GeoPageView) => analytics.trackGeoPageView(data);
  const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
  const trackLead = (data: Parameters<typeof analytics.trackLead>[0]) => analytics.trackLead(data);
  
  return {
    trackGeoPageView,
    trackEvent,
    trackLead,
    trackSearch: analytics.trackSearch.bind(analytics),
    trackExternalClick: analytics.trackExternalClick.bind(analytics)
  };
}

// Utility functions for GEO analytics
export function extractGeoFromUrl(pathname: string) {
  // Extract locale/country/state/city/category from URL
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length >= 4) {
    return {
      locale: segments[0],
      country: segments[1],
      state: segments[2],
      city: segments[3],
      category: segments[4]
    };
  }
  
  return null;
}

export function getContentType(pathname: string): 'service' | 'blog' | 'landing' | 'other' {
  if (pathname.includes('/blog/')) return 'blog';
  if (pathname.split('/').filter(Boolean).length >= 5) return 'service';
  if (pathname.split('/').filter(Boolean).length >= 2) return 'landing';
  return 'other';
}

// Initialize analytics (call this in your root layout)
export function initAnalytics(gaId: string, debugMode = false) {
  if (typeof window !== 'undefined') {
    analytics.init(gaId, debugMode);
  }
}