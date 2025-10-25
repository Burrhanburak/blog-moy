import { AIInsight as AIInsightType } from '@/lib/ai-content-generator';

interface AIInsightProps {
  insight: AIInsightType;
  className?: string;
}

export function AIInsight({ insight, className = '' }: AIInsightProps) {
  const getInsightIcon = (type: AIInsightType['type']) => {
    switch (type) {
      case 'market-analysis':
        return '📊';
      case 'pricing-trends':
        return '💰';
      case 'competitive-landscape':
        return '🏆';
      case 'local-trends':
        return '📈';
      default:
        return '💡';
    }
  };

  const getInsightColor = (type: AIInsightType['type']) => {
    switch (type) {
      case 'market-analysis':
        return 'border-blue-200 bg-blue-50';
      case 'pricing-trends':
        return 'border-green-200 bg-green-50';
      case 'competitive-landscape':
        return 'border-purple-200 bg-purple-50';
      case 'local-trends':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`rounded-lg border p-6 ${getInsightColor(insight.type)} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getInsightIcon(insight.type)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs uppercase tracking-wide text-gray-500">
                AI Insight
              </span>
              <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                {Math.round(insight.confidence * 100)}% confidence
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Updated: {new Date(insight.lastUpdated).toLocaleDateString()}
        </div>
      </div>
      
      <p className="mt-4 text-gray-700 leading-relaxed">{insight.content}</p>
      
      {insight.sources && insight.sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Sources: {insight.sources.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}

interface AIInsightGridProps {
  insights: AIInsightType[];
  className?: string;
}

export function AIInsightGrid({ insights, className = '' }: AIInsightGridProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Market Intelligence</h2>
        <p className="mt-2 text-gray-600">
          AI-powered insights to help you make informed business decisions
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((insight, index) => (
          <AIInsight key={index} insight={insight} />
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Insights generated using AI analysis of market data and trends. 
          Always verify information with local sources for critical business decisions.
        </p>
      </div>
    </section>
  );
}