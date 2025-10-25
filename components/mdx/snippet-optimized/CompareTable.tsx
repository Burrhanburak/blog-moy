import { Scale } from "lucide-react";

interface CompareTableProps {
  title: string;
  description?: string;
  items: Array<{
    name: string;
    pros: string[];
    cons: string[];
    bestFor: string;
    price?: string;
    rating?: number;
  }>;
  category?: string;
}

export function CompareTable({
  title,
  description,
  items,
  category,
}: CompareTableProps) {
  return (
    <div
      className="my-8 bg-white rounded-lg  overflow-hidden"
      itemScope
      itemType="https://schema.org/Table"
    >
      <div className="bg-[#ff4d00] text-white p-6">
        <h3 className="text-xl font-bold mb-2" itemProp="name">
          <Scale className="w-6 h-6 text-white inline-block mr-2" /> {title}
        </h3>
        {description && (
          <p className="text-white" itemProp="description">
            {description}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">
                Option
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">
                Pros
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">
                Cons
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900">
                Best For
              </th>
              {items.some((item) => item.price) && (
                <th className="px-6 py-4 text-left font-semibold text-gray-900">
                  Price
                </th>
              )}
              {items.some((item) => item.rating) && (
                <th className="px-6 py-4 text-left font-semibold text-gray-900">
                  Rating
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                itemScope
                itemType="https://schema.org/Product"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900" itemProp="name">
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <ul className="space-y-1">
                    {item.pros.map((pro, proIndex) => (
                      <li
                        key={proIndex}
                        className="flex items-start text-sm text-green-700"
                      >
                        <span className="mr-2 text-green-500">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  <ul className="space-y-1">
                    {item.cons.map((con, conIndex) => (
                      <li
                        key={conIndex}
                        className="flex items-start text-sm text-red-700"
                      >
                        <span className="mr-2 text-red-500">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 font-medium">
                    {item.bestFor}
                  </div>
                </td>
                {item.price && (
                  <td className="px-6 py-4">
                    <div
                      className="text-sm font-semibold text-blue-600"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <span itemProp="price">{item.price}</span>
                    </div>
                  </td>
                )}
                {item.rating && (
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center"
                      itemProp="aggregateRating"
                      itemScope
                      itemType="https://schema.org/AggregateRating"
                    >
                      <span className="text-yellow-400 mr-1">
                        {"★".repeat(Math.floor(item.rating))}
                      </span>
                      <span
                        className="text-sm text-gray-600"
                        itemProp="ratingValue"
                      >
                        {item.rating}
                      </span>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t">
        <p className="text-xs text-gray-600">
          💡 This comparison is based on current market analysis and user
          feedback as of {new Date().getFullYear()}.
        </p>
      </div>
    </div>
  );
}

// Specialized comparison for services
export function ServiceCompareTable({
  title,
  services,
  city,
}: {
  title: string;
  services: Array<{
    name: string;
    timeline: string;
    price: string;
    features: string[];
    limitations?: string[];
  }>;
  city: string;
}) {
  const comparisonItems = services.map((service) => ({
    name: service.name,
    pros: service.features,
    cons: service.limitations || ["Limited customization"],
    bestFor: `${service.timeline} projects in ${city}`,
    price: service.price,
  }));

  return (
    <CompareTable
      title={title}
      description={`Compare ${services.length} service options available in ${city}`}
      items={comparisonItems}
    />
  );
}
