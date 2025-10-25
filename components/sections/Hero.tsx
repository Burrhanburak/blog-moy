import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

interface HeroProps {
  city: string;
  dynamicHeadline: string;
  dynamicSubheadline: string;
  categoryDisplay: string;
  categoryTargetAudience: string;
}

export function Hero({ 
  city, 
  dynamicHeadline, 
  dynamicSubheadline, 
  categoryDisplay, 
  categoryTargetAudience 
}: HeroProps) {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{dynamicHeadline}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {dynamicSubheadline}
        </p>
      </div>

      <Alert className="mb-8">
        <Lightbulb className="h-4 w-4 text-blue-500" />
        <AlertDescription>
          For {categoryTargetAudience} in {city}, working with local experts ensures
          faster communication and better understanding of your market needs.
        </AlertDescription>
      </Alert>
    </>
  );
}
