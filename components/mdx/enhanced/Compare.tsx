import Link from "next/link";
import { ArrowUpRight, GitCompareArrows } from "lucide-react";

interface CompareProps {
  title: string;
  description?: string;
  href: string;
  items?: {
    option1: string;
    option2: string;
    option1Description?: string;
    option2Description?: string;
    winner?: string;
    reasons?: string[];
  };
}

export function Compare({ title, description, href }: CompareProps) {
  return (
    <div className="w-full">
      <Link
        href={href}
        className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:border-[#ff4d00] hover:shadow-md transition-all duration-200 h-full"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <GitCompareArrows className="w-4 h-4 md:w-5 md:h-5 text-[#ff4d00]" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              {description || "Compare the two options"}
            </p>
          </div>
          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
        </div>
      </Link>
    </div>
  );
}
