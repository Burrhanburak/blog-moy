import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface CardGridItem {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  external?: boolean;
}

export interface CardGridProps {
  cards: CardGridItem[];
  className?: string;
  cardClassName?: string; // optional per-card class override
}

export default function CardGrid({
  cards,
  className = "",
  cardClassName = "",
}: CardGridProps) {
  return (
    <div
      className={`card-group not-prose grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {cards?.map((card, i) => (
        <Link
          key={i}
          href={card.href}
          {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={`card block font-normal group relative rounded-2xl overflow-hidden w-full cursor-pointer transition-all duration-200 border border-gray-200 bg-white dark:bg-background-dark hover:border-[#ff4d00] hover:shadow-lg ${className}`}
        >
          <div className="px-6 py-5 relative">
            <div className="absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5 transition-colors duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            {card.icon && (
              <div className="h-8 w-8 text-[#ff4d00] mb-4">
                <div className="rounded-lg flex items-center justify-center h-full w-full">
                  {card.icon}
                </div>
              </div>
            )}

            <div className={card.icon ? "mt-4" : ""}>
              <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white leading-tight">
                {card.title}
              </h2>

              <div className="prose mt-2 font-normal text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
