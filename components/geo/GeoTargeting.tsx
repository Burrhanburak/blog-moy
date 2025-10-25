'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { currencyTargeting, GeoTargetingResult } from '@/lib/currency-targeting';

interface GeoTargetingProps {
  currentPath: string;
  currentCountry: string;
  currentCity: string;
  currentLocale: string;
}

export function GeoTargeting({ currentPath, currentCountry, currentCity, currentLocale }: GeoTargetingProps) {
  const [geoData, setGeoData] = useState<GeoTargetingResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('');

  useEffect(() => {
    // Detect user's country (in production, use IP geolocation service)
    const detectUserCountry = async () => {
      try {
        // This would be replaced with actual IP geolocation
        // For now, we'll use browser timezone as a rough indicator
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const countryGuess = getCountryFromTimezone(timezone);
        setUserCountry(countryGuess);
        
        // Get geo targeting data
        const targeting = await currencyTargeting.getGeoTargeting(
          countryGuess,
          currentLocale,
          currentPath
        );
        
        setGeoData(targeting);
        
        // Only show if there's a suggestion and user is from different country
        if (targeting.redirectSuggestion && countryGuess !== getCurrentCountryCode(currentCountry)) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Geo targeting detection failed:', error);
      }
    };

    detectUserCountry();
  }, [currentPath, currentCountry, currentLocale]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to avoid showing again
    localStorage.setItem('geo-suggestion-dismissed', Date.now().toString());
  };

  const handleAccept = () => {
    if (geoData?.redirectSuggestion) {
      window.location.href = geoData.redirectSuggestion;
    }
  };

  if (!isVisible || !geoData || !geoData.redirectSuggestion) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌍</span>
              <div>
                <p className="text-sm font-medium">
                  Looks like you're visiting from {userCountry}
                </p>
                <p className="text-xs opacity-90">
                  See local prices in {geoData.currency.symbol} and {geoData.suggestedLocale.toUpperCase()} content
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAccept}
              className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Switch Region
            </button>
            <button
              onClick={handleDismiss}
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CurrencyBadgeProps {
  value: string;
  country: string;
  updated?: string;
  className?: string;
}

export function CurrencyBadge({ value, country, updated, className = '' }: CurrencyBadgeProps) {
  return (
    <div className={`inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm ${className}`}>
      <span className="font-semibold">{value}</span>
      {updated && (
        <span className="text-xs opacity-75">
          Updated {new Date(updated).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}

interface MarketInsightBadgeProps {
  insight: string;
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

export function MarketInsightBadge({ insight, priority, className = '' }: MarketInsightBadgeProps) {
  const priorityColors = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const priorityIcons = {
    high: '🔥',
    medium: '📈',
    low: '💡'
  };

  return (
    <div className={`inline-flex items-center space-x-2 border rounded-lg px-3 py-2 text-sm ${priorityColors[priority]} ${className}`}>
      <span>{priorityIcons[priority]}</span>
      <span>{insight}</span>
    </div>
  );
}

interface LocalizedPricingProps {
  basePrice: number;
  geoData: GeoTargetingResult;
  category: string;
  className?: string;
}

export function LocalizedPricing({ basePrice, geoData, category, className = '' }: LocalizedPricingProps) {
  const localizedPrice = currencyTargeting.getLocalizedPricing(geoData.currency, basePrice);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Local Pricing for {category}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{geoData.currency.symbol}</span>
          <span className="text-sm text-gray-500">{geoData.currency.code}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-blue-600">
            {localizedPrice}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Typical range for {category} projects
          </p>
        </div>
        
        {geoData.marketInsights.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Market Insights:</p>
            {geoData.marketInsights.slice(0, 2).map((insight, index) => (
              <MarketInsightBadge 
                key={index} 
                insight={insight} 
                priority={geoData.marketPriority}
                className="block w-full"
              />
            ))}
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Prices based on local market conditions and {geoData.currency.name} purchasing power.
            Exchange rates updated daily.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getCountryFromTimezone(timezone: string): string {
  const timezoneToCountry: Record<string, string> = {
    'America/New_York': 'US',
    'America/Los_Angeles': 'US',
    'America/Chicago': 'US',
    'America/Denver': 'US',
    'Europe/London': 'GB',
    'Europe/Berlin': 'DE',
    'Europe/Paris': 'FR',
    'Europe/Zurich': 'CH',
    'Europe/Oslo': 'NO',
    'Europe/Stockholm': 'SE',
    'Europe/Copenhagen': 'DK',
    'Asia/Tokyo': 'JP',
    'Asia/Seoul': 'KR',
    'Asia/Singapore': 'SG',
    'Australia/Sydney': 'AU',
    'Australia/Melbourne': 'AU',
    'America/Toronto': 'CA',
    'America/Vancouver': 'CA',
    'Asia/Dubai': 'AE',
    'Asia/Riyadh': 'SA',
  };
  
  return timezoneToCountry[timezone] || 'US';
}

function getCurrentCountryCode(countryName: string): string {
  const countryToCode: Record<string, string> = {
    'United States': 'US',
    'Germany': 'DE',
    'United Kingdom': 'GB',
    'Canada': 'CA',
    'Australia': 'AU',
    'Switzerland': 'CH',
    'Norway': 'NO',
    'Sweden': 'SE',
    'Denmark': 'DK',
    'Japan': 'JP',
    'Singapore': 'SG',
    'South Korea': 'KR',
    'Saudi Arabia': 'SA',
    'UAE': 'AE',
  };
  
  return countryToCode[countryName] || 'US';
}