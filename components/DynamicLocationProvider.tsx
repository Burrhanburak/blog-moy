'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface LocationData {
  country: string | null;
  state: string | null;
  city: string | null;
  category: string | null;
}

interface LocationContextType {
  locationData: LocationData | null;
  pathname: string;
  isLocationPage: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface DynamicLocationProviderProps {
  children: ReactNode;
  locationData: LocationData | null;
  pathname: string;
}

export function DynamicLocationProvider({ 
  children, 
  locationData, 
  pathname 
}: DynamicLocationProviderProps) {
  const isLocationPage = Boolean(locationData);

  const contextValue: LocationContextType = {
    locationData,
    pathname,
    isLocationPage,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a DynamicLocationProvider');
  }
  return context;
}

// Helper hooks for specific location data
export function useLocationData() {
  const { locationData } = useLocation();
  return locationData;
}

export function useIsLocationPage() {
  const { isLocationPage } = useLocation();
  return isLocationPage;
}

export function usePathname() {
  const { pathname } = useLocation();
  return pathname;
}