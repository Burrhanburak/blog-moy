// "use client";

// import { useEffect } from 'react';
// import { usePathname } from '@/navigation';
// import { initAnalytics, analytics, extractGeoFromUrl, getContentType } from '@/lib/analytics';

// interface AnalyticsProviderProps {
//   children: React.ReactNode;
// }

// export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
//   const pathname = usePathname();

//   useEffect(() => {
//     // Initialize analytics with your GA4 ID
//     const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
//     const isDev = typeof process !== 'undefined' ? process.env.NODE_ENV === 'development' : false;

//     initAnalytics(GA_ID, isDev);
//   }, []);

//   useEffect(() => {
//     // Track page views with GEO data
//     const geoData = extractGeoFromUrl(pathname);
//     const contentType = getContentType(pathname);

//     if (geoData) {
//       analytics.trackGeoPageView({
//         page_title: document.title,
//         page_location: window.location.href,
//         city: geoData.city || '',
//         state: geoData.state || '',
//         country: geoData.country || '',
//         locale: geoData.locale || 'en',
//         category: geoData.category,
//         content_group1: geoData.category,
//         content_group2: geoData.city ? 'city' : geoData.state ? 'state' : 'country',
//         content_group3: contentType
//       });
//     }
//   }, [pathname]);

//   return <>{children}</>;
// }
