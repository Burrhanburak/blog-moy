import { NextRequest, NextResponse } from 'next/server';
import { advancedMonitoring } from '@/lib/advanced-monitoring';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const url = searchParams.get('url');

  try {
    switch (action) {
      case 'decay-signals':
        if (!url) {
          return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
        }
        const decaySignals = await advancedMonitoring.detectContentDecay([url]);
        return NextResponse.json({ signals: decaySignals });

      case 'competitor-activities':
        const competitorActivities = await advancedMonitoring.monitorCompetitorActivities();
        return NextResponse.json({ activities: competitorActivities });

      case 'full-report':
        const report = await advancedMonitoring.generateMonitoringReport();
        return NextResponse.json(report);

      default:
        return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Monitoring API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { urls, options } = await request.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 });
    }

    // Run monitoring for multiple URLs
    const decaySignals = await advancedMonitoring.detectContentDecay(urls);
    const competitorActivities = await advancedMonitoring.monitorCompetitorActivities();

    return NextResponse.json({
      decaySignals,
      competitorActivities,
      processedUrls: urls.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Monitoring batch API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}