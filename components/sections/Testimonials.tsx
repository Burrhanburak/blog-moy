import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialsProps {
  city: string;
  dynamicTestimonialsSection: string;
}

export function Testimonials({ city, dynamicTestimonialsSection }: TestimonialsProps) {
  return (
    <section className="mb-12">
      <div dangerouslySetInnerHTML={{ __html: dynamicTestimonialsSection }} />
    </section>
  );
}
