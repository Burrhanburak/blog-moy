interface ProcessProps {
  city: string;
  categoryDisplay: string;
  dynamicProcessSteps: string;
}

export function Process({ city, categoryDisplay, dynamicProcessSteps }: ProcessProps) {
  return (
    <section className="mb-12">
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Proven Process
        </h2>

        <div dangerouslySetInnerHTML={{ __html: dynamicProcessSteps }} />
      </div>
    </section>
  );
}
