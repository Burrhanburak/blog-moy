import React from "react";

interface BuildLocationUrlProps {
  locale?: string;
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  children: (url: string) => React.ReactNode;
}

export function BuildLocationUrl({
  locale,
  country,
  state,
  city,
  category,
  children,
}: BuildLocationUrlProps) {
  const buildLocationUrl = (
    _locale: string | undefined,
    country?: string,
    state?: string,
    city?: string,
    category?: string
  ): string => {
    const segments: string[] = [];
    
    if (country) {
      segments.push(country.toLowerCase().replace(/\s+/g, '-'));
    }
    if (state) {
      segments.push(state.toLowerCase().replace(/\s+/g, '-'));
    }
    if (city) {
      segments.push(city.toLowerCase().replace(/\s+/g, '-'));
    }
    if (category) {
      segments.push(category);
    }
    
    return segments.length > 0 ? `/${segments.join("/")}` : "/";
  };

  const url = buildLocationUrl(locale, country, state, city, category);
  return <>{children(url)}</>;
}
