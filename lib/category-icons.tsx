import React from "react";
import {
  BookOpen,
  BrainIcon,
  Code,
  MapPin,
  Megaphone,
  MessageCircle,
  Mail,
  Paintbrush,
  Pencil,
  Rocket,
  Search,
  ShoppingCart,
  Target,
  ShoppingBagIcon,
  Smartphone,
  LandmarkIcon,
  BotIcon,
  WholeWord,
  Database,
  Settings,
  Zap,
  Cpu,
  Workflow,
  Building,
} from "lucide-react";

export function getCategoryIcon(categoryKey: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    "web-design": <Paintbrush className="w-6 h-6 text-[#ff4d00] " />,
    "custom-web-development": <Code className="w-6 h-6 text-[#ff4d00]" />,
    "ecommerce-development": (
      <ShoppingCart className="w-6 h-6 text-[#ff4d00]" />
    ),
    "digital-marketing": <Rocket className="w-6 h-6 text-[#ff4d00]" />,
    "seo-services": <Search className="w-6 h-6 text-[#ff4d00]" />,
    "local-seo": <MapPin className="w-6 h-6 text-[#ff4d00]" />,
    "ui-ux-design": <Pencil className="w-6 h-6 text-[#ff4d00]" />,
    "ppc-ads": <Megaphone className="w-6 h-6 text-[#ff4d00]" />,
    "social-media-marketing": (
      <MessageCircle className="w-6 h-6 text-[#ff4d00]" />
    ),
    "email-marketing": <Mail className="w-6 h-6 text-[#ff4d00]" />,
    "content-marketing": <BookOpen className="w-6 h-6 text-[#ff4d00]" />,
    "conversion-optimization": <Target className="w-6 h-6 text-[#ff4d00]" />,
    branding: <BrainIcon className="w-6 h-6 text-[#ff4d00]" />,
    "wordpress-development": <WholeWord className="w-6 h-6 text-[#ff4d00]" />,
    "shopify-development": (
      <ShoppingBagIcon className="w-6 h-6 text-[#ff4d00]" />
    ),
    "app-development": <Smartphone className="w-6 h-6 text-[#ff4d00]" />,
    "saas-development": <BotIcon className="w-6 h-6 text-[#ff4d00]" />,
    "crm-development": <Database className="w-6 h-6 text-[#ff4d00]" />,
    "crm-portal-apps": <Settings className="w-6 h-6 text-[#ff4d00]" />,
    "erp-software": <Workflow className="w-6 h-6 text-[#ff4d00]" />,
    automation: <Zap className="w-6 h-6 text-[#ff4d00]" />,
    "ai-integration": <Cpu className="w-6 h-6 text-[#ff4d00]" />,
    "landing-page-design": <LandmarkIcon className="w-6 h-6 text-[#ff4d00]" />,
    "software-consulting": <Building className="w-6 h-6 text-[#ff4d00]" />,
  };

  // Return category-specific icon or default icon
  return (
    iconMap[categoryKey] || (
      <svg
        className="w-4 h-4 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
          clipRule="evenodd"
        />
      </svg>
    )
  );
}

export function getCityIcon(): React.ReactNode {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function getStateIcon(): React.ReactNode {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
