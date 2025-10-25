import React from "react";
import type { QAItem } from "@/lib/human-content";

interface HumanContentProps {
  intro: string;
  qas: QAItem[];
  outro: string;
  showOutro?: boolean;
}

export function HumanContent({
  intro,
  qas,
  outro,
  showOutro = true,
}: HumanContentProps) {
  return (
    <section className="mt-8 space-y-10">
      <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
        <p>{intro}</p>
      </div>

      <div className="space-y-6">
        {qas.map((qa, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {qa.question}
            </h3>
            <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
            {qa.category ? (
              <span
                className={`inline-flex items-center mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                  qa.category === "pricing"
                    ? "bg-green-100 text-green-800"
                    : qa.category === "process"
                    ? "bg-blue-100 text-blue-800"
                    : qa.category === "technology"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {qa.category}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {showOutro ? (
        <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
          <p>{outro}</p>
        </div>
      ) : null}
    </section>
  );
}
