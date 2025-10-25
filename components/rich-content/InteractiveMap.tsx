'use client';

import { useState, useEffect } from 'react';

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'city' | 'provider' | 'competitor';
  description?: string;
  url?: string;
}

interface InteractiveMapProps {
  center: {
    lat: number;
    lng: number;
  };
  locations: Location[];
  city: string;
  category: string;
  className?: string;
}

export function InteractiveMap({ center, locations, city, category, className = '' }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fallback to static map if Google Maps not available
  const generateStaticMapUrl = () => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const markers = locations.map(loc => 
      `markers=color:red%7C${loc.lat},${loc.lng}`
    ).join('&');
    
    return `${baseUrl}?center=${center.lat},${center.lng}&zoom=12&size=600x400&${markers}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}`;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {category} Providers in {city}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Explore local service providers and market coverage
        </p>
      </div>
      
      <div className="relative">
        {/* Static Map Fallback */}
        <div className="h-96 bg-gray-100 flex items-center justify-center">
          {typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
            <img
              src={generateStaticMapUrl()}
              alt={`Map of ${category} providers in ${city}`}
              className="w-full h-full object-cover"
              onLoad={() => setMapLoaded(true)}
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-gray-600">Interactive map showing {category} providers in {city}</p>
              <p className="text-sm text-gray-500 mt-2">Configure Google Maps API for interactive features</p>
            </div>
          )}
        </div>
        
        {/* Location Info Overlay */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900">{selectedLocation.name}</h4>
            {selectedLocation.description && (
              <p className="text-sm text-gray-600 mt-1">{selectedLocation.description}</p>
            )}
            {selectedLocation.url && (
              <a
                href={selectedLocation.url}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                Learn more →
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* Location List */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Featured Locations ({locations.length})
        </h4>
        <div className="space-y-2">
          {locations.slice(0, 5).map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{location.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{location.type}</p>
                </div>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                View
              </button>
            </div>
          ))}
        </div>
        
        {locations.length > 5 && (
          <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all {locations.length} locations
          </button>
        )}
      </div>
    </div>
  );
}

interface MapLocationGeneratorProps {
  city: string;
  state: string;
  country: string;
  category: string;
}

// Generate mock locations for demonstration
export function generateMapLocations({ city, state, country, category }: MapLocationGeneratorProps): Location[] {
  // In production, this would fetch real business data
  const baseCoords = getCityCoordinates(city, state, country);
  
  const locations: Location[] = [
    {
      name: city,
      lat: baseCoords.lat,
      lng: baseCoords.lng,
      type: 'city',
      description: `${category} services available in ${city}`,
    }
  ];
  
  // Add some mock provider locations around the city
  for (let i = 0; i < 8; i++) {
    const offset = 0.02; // ~2km radius
    const angle = (i / 8) * 2 * Math.PI;
    
    locations.push({
      name: `${category} Provider ${i + 1}`,
      lat: baseCoords.lat + Math.cos(angle) * offset,
      lng: baseCoords.lng + Math.sin(angle) * offset,
      type: 'provider',
      description: `Professional ${category} services`,
      url: `/contact`
    });
  }
  
  return locations;
}

// Helper function to get approximate city coordinates
function getCityCoordinates(city: string, state: string, country: string): { lat: number; lng: number } {
  // This would typically use a geocoding service
  // For now, return approximate coordinates for major cities
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    'new-york': { lat: 40.7128, lng: -74.0060 },
    'los-angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'houston': { lat: 29.7604, lng: -95.3698 },
    'berlin': { lat: 52.5200, lng: 13.4050 },
    'munich': { lat: 48.1351, lng: 11.5820 },
    'hamburg': { lat: 53.5511, lng: 9.9937 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'manchester': { lat: 53.4808, lng: -2.2426 },
    'toronto': { lat: 43.6532, lng: -79.3832 },
    'vancouver': { lat: 49.2827, lng: -123.1207 },
    'sydney': { lat: -33.8688, lng: 151.2093 },
    'melbourne': { lat: -37.8136, lng: 144.9631 },
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'osaka': { lat: 34.6937, lng: 135.5023 },
    'singapore': { lat: 1.3521, lng: 103.8198 },
    'zurich': { lat: 47.3769, lng: 8.5417 },
    'oslo': { lat: 59.9139, lng: 10.7522 },
    'stockholm': { lat: 59.3293, lng: 18.0686 },
  };
  
  const key = city.toLowerCase().replace(/\s+/g, '-');
  return cityCoords[key] || { lat: 40.7128, lng: -74.0060 }; // Default to NYC
}