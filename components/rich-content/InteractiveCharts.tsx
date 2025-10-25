'use client';

import { useState } from 'react';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

interface InteractiveBarChartProps {
  title: string;
  data: ChartDataPoint[];
  yAxisLabel: string;
  className?: string;
}

export function InteractiveBarChart({ title, data, yAxisLabel, className = '' }: InteractiveBarChartProps) {
  const [selectedBar, setSelectedBar] = useState<ChartDataPoint | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute -left-12 top-1/2 transform -rotate-90 text-sm text-gray-600 whitespace-nowrap">
          {yAxisLabel}
        </div>
        
        {/* Chart area */}
        <div className="ml-16 mb-12">
          <div className="flex items-end justify-between h-64 space-x-2">
            {data.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              const isSelected = selectedBar?.label === item.label;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full transition-all duration-200 cursor-pointer rounded-t ${
                      item.color || 'bg-blue-500'
                    } ${isSelected ? 'opacity-100 ring-2 ring-blue-300' : 'opacity-80 hover:opacity-100'}`}
                    style={{ height: `${height}%` }}
                    onClick={() => setSelectedBar(isSelected ? null : item)}
                    onMouseEnter={() => setSelectedBar(item)}
                    onMouseLeave={() => setSelectedBar(null)}
                  />
                  
                  {/* Value label */}
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </div>
                  
                  {/* X-axis label */}
                  <div className="text-xs text-gray-600 text-center mt-1 leading-tight">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected item details */}
        {selectedBar && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900">{selectedBar.label}</h4>
            <p className="text-sm text-blue-800 mt-1">
              {yAxisLabel}: <strong>{selectedBar.value.toLocaleString()}</strong>
            </p>
            {selectedBar.description && (
              <p className="text-sm text-blue-700 mt-2">{selectedBar.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface PieChartProps {
  title: string;
  data: ChartDataPoint[];
  className?: string;
}

export function InteractivePieChart({ title, data, className = '' }: PieChartProps) {
  const [selectedSlice, setSelectedSlice] = useState<ChartDataPoint | null>(null);
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate angles for pie slices
  let currentAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
      color: item.color || `hsl(${index * 360 / data.length}, 70%, 50%)`
    };
  });
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Chart */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {slices.map((slice, index) => {
              const isSelected = selectedSlice?.label === slice.label;
              const radius = isSelected ? 85 : 80;
              const largeArcFlag = slice.percentage > 50 ? 1 : 0;
              
              const startX = 100 + radius * Math.cos((slice.startAngle * Math.PI) / 180);
              const startY = 100 + radius * Math.sin((slice.startAngle * Math.PI) / 180);
              const endX = 100 + radius * Math.cos((slice.endAngle * Math.PI) / 180);
              const endY = 100 + radius * Math.sin((slice.endAngle * Math.PI) / 180);
              
              const pathData = [
                `M 100 100`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={slice.color}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedSlice(isSelected ? null : slice)}
                  onMouseEnter={() => setSelectedSlice(slice)}
                  onMouseLeave={() => setSelectedSlice(null)}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex-1">
          <div className="space-y-2">
            {slices.map((slice, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                  selectedSlice?.label === slice.label ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSlice(selectedSlice?.label === slice.label ? null : slice)}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{slice.label}</div>
                  <div className="text-xs text-gray-600">
                    {slice.value.toLocaleString()} ({slice.percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedSlice && selectedSlice.description && (
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-800">{selectedSlice.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TrendChartProps {
  title: string;
  data: Array<{
    period: string;
    value: number;
    trend?: 'up' | 'down' | 'stable';
  }>;
  yAxisLabel: string;
  className?: string;
}

export function TrendChart({ title, data, yAxisLabel, className = '' }: TrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;
  
  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 20;
  
  // Generate SVG path for line
  const pathData = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - 2 * padding);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={chartWidth} height={chartHeight} fill="url(#grid)" />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
            const y = chartHeight - padding - ((point.value - minValue) / valueRange) * (chartHeight - 2 * padding);
            const isHovered = hoveredPoint === index;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 8 : 5}
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Trend indicator */}
                {point.trend && (
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    className="text-xs fill-current"
                    fill={point.trend === 'up' ? '#10b981' : point.trend === 'down' ? '#ef4444' : '#6b7280'}
                  >
                    {point.trend === 'up' ? '↗' : point.trend === 'down' ? '↘' : '→'}
                  </text>
                )}
                
                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x - 40}
                      y={y - 45}
                      width="80"
                      height="30"
                      fill="black"
                      fillOpacity="0.8"
                      rx="4"
                    />
                    <text
                      x={x}
                      y={y - 35}
                      textAnchor="middle"
                      className="text-xs fill-white"
                    >
                      {point.period}
                    </text>
                    <text
                      x={x}
                      y={y - 22}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {point.value.toLocaleString()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-5">
          {data.map((point, index) => (
            <div key={index} className="text-xs text-gray-600">
              {point.period}
            </div>
          ))}
        </div>
        
        {/* Y-axis label */}
        <div className="absolute -left-6 top-1/2 transform -rotate-90 text-sm text-gray-600 whitespace-nowrap">
          {yAxisLabel}
        </div>
      </div>
    </div>
  );
}

// Helper functions to generate chart data
export function generateMarketSizeData(city: string) {
  return [
    { 
      label: 'Web Design',
      value: 2400000,
      color: 'bg-blue-500',
      description: 'Largest segment with high demand from businesses of all sizes'
    },
    { 
      label: 'SEO Services',
      value: 1800000,
      color: 'bg-green-500',
      description: 'Growing segment as businesses focus on organic visibility'
    },
    { 
      label: 'App Development',
      value: 3200000,
      color: 'bg-purple-500',
      description: 'Premium segment with mobile-first business needs'
    },
    { 
      label: 'Digital Marketing',
      value: 1600000,
      color: 'bg-orange-500',
      description: 'Steady demand across all business verticals'
    },
    { 
      label: 'E-commerce',
      value: 2800000,
      color: 'bg-red-500',
      description: 'High-growth segment driven by online retail expansion'
    }
  ];
}

export function generateBusinessDistributionData(city: string) {
  return [
    { 
      label: 'Small Business (1-10 employees)',
      value: 68,
      color: '#3b82f6',
      description: 'Majority of businesses, often need affordable digital solutions'
    },
    { 
      label: 'Medium Business (11-50 employees)',
      value: 22,
      color: '#10b981',
      description: 'Growing businesses with moderate budgets for digital transformation'
    },
    { 
      label: 'Large Business (51+ employees)',
      value: 10,
      color: '#f59e0b',
      description: 'Enterprises with substantial budgets for comprehensive solutions'
    }
  ];
}

export function generateDemandTrendData(city: string, category: string) {
  return [
    { period: 'Q1 2023', value: 100, trend: 'stable' as const },
    { period: 'Q2 2023', value: 115, trend: 'up' as const },
    { period: 'Q3 2023', value: 108, trend: 'down' as const },
    { period: 'Q4 2023', value: 135, trend: 'up' as const },
    { period: 'Q1 2024', value: 142, trend: 'up' as const },
    { period: 'Q2 2024', value: 155, trend: 'up' as const },
    { period: 'Q3 2024', value: 148, trend: 'down' as const },
    { period: 'Q4 2024', value: 168, trend: 'up' as const },
  ];
}