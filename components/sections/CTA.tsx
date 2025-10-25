import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CTAProps {
  city: string;
  categoryDisplay: string;
  dynamicCTAConfig: string;
}

export function CTA({ city, categoryDisplay, dynamicCTAConfig }: CTAProps) {
  // Parse dynamic CTA config
  const ctaData = dynamicCTAConfig
    .split('\n')
    .reduce((acc, line) => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        acc[key] = value.replace(/"/g, '');
      }
      return acc;
    }, {} as Record<string, string>);

  return (
    <Card className="bg-blue-600 text-white text-center mb-12">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-4">
          Let's Build Something Amazing Together
        </CardTitle>
        <p className="text-xl mb-6 opacity-90">
          Join hundreds of {city} businesses that trust Moydus for their digital success.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            {ctaData.primary || 'Get Free Consultation'}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            {ctaData.secondary || 'View Our Work'}
          </Button>
        </div>

        <div className="mt-8 text-sm opacity-75">
          <p>📧 hello@moydus.com | 📍 Serving {city} and surrounding areas</p>
          <p>⏰ Response time: Within 24 hours</p>
        </div>
      </CardContent>
    </Card>
  );
}
