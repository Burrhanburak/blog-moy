interface WhyChooseProps {
  city: string;
  categoryDisplay: string;
  dynamicBenefit: string;
  dynamicValueProposition: string;
  dynamicBenefitsGrid: string;
}

export function WhyChoose({ 
  city, 
  categoryDisplay, 
  dynamicBenefit, 
  dynamicValueProposition,
  dynamicBenefitsGrid 
}: WhyChooseProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Why Choose Moydus for {categoryDisplay} in {city}?
      </h2>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {dynamicBenefit}
        </h3>
        <p className="text-gray-700 mb-4">
          {dynamicValueProposition}
        </p>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          dangerouslySetInnerHTML={{ __html: dynamicBenefitsGrid }}
        />
      </div>
    </section>
  );
}
