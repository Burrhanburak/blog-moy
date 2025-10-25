interface FAQProps {
  city: string;
  categoryDisplay: string;
  dynamicFAQSection: string;
}

export function FAQ({ city, categoryDisplay, dynamicFAQSection }: FAQProps) {
  return (
    <section className="mb-12">
      <div dangerouslySetInnerHTML={{ __html: dynamicFAQSection }} />
    </section>
  );
}
