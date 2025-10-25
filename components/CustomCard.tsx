import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Code,
  Search,
  ShoppingCart,
  Smartphone,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

interface CustomCardProps {
  title: string;
  description: string;
  href: string;
  date?: string;
  author?: string;
  tags?: string[];
  image?: string;
  icon?: ReactNode;
}

// Icon seçimi için fonksiyon
const getCategoryIcon = (tags?: string[], title?: string) => {
  if (!tags && !title) return <Code className="h-6 w-6" />;

  const allText = [...(tags || []), title || ""].join(" ").toLowerCase();

  if (allText.includes("web-design") || allText.includes("design")) {
    return <Palette className="h-6 w-6" />;
  }
  if (allText.includes("seo") || allText.includes("search")) {
    return <Search className="h-6 w-6" />;
  }
  if (allText.includes("ecommerce") || allText.includes("shop")) {
    return <ShoppingCart className="h-6 w-6" />;
  }
  if (allText.includes("app") || allText.includes("mobile")) {
    return <Smartphone className="h-6 w-6" />;
  }
  if (allText.includes("digital-marketing") || allText.includes("marketing")) {
    return <Code className="h-6 w-6" />;
  }

  // Varsayılan icon
  return <Code className="h-6 w-6" />;
};

export function CustomCard({
  title,
  description,
  href,
  date,
  author,
  tags,
  image,
  icon,
}: CustomCardProps) {
  return (
    <Link
      className="block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-gray-800 border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer hover:!border-[#ff4d00] dark:hover:!border-[#ff4d00]"
      href={href}
    >
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="p-0">
          {image && (
            <div className="aspect-video overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width={1000}
                height={1000}
              />
            </div>
          )}
          <div className="px-6 py-5 relative flex flex-col gap-y-4">
            <div className="absolute text-gray-400 dark:text-gray-500 group-hover:text-[#ff4d00] dark:group-hover:text-blue-400 top-5 right-5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="h-6 w-6 text-[#ff4d00] dark:text-[#ff4d00]">
              {icon || getCategoryIcon(tags, title)}
            </div>
            <div>
              <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white">
                {title}
              </h2>
              <div className="font-normal text-sm text-gray-600 dark:text-gray-400 leading-6 mt-2">
                <p className="line-clamp-3">{description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#ff4d00] text-white rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  {date && (
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  {author && <span>By {author}</span>}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
