"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { PRIORITY_CATEGORY_KEYS } from "@/config/categories-new";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Priority categories with display names and click counts
  const navCategories = PRIORITY_CATEGORY_KEYS.map((key, index) => {
    const categoryNames: Record<string, string> = {
      "web-design": "Web Design",
      "custom-web-development": "Development",
      "digital-marketing": "Marketing",
      "seo-services": "SEO Services",
      "local-seo": "Local SEO",
      "ecommerce-development": "E-commerce",
      branding: "Branding",
      "content-marketing": "Content",
      "app-development": "App Dev",
      "ui-ux-design": "UI/UX",
      "conversion-optimization": "CRO",
      "ppc-ads": "PPC Ads",
      "custom-panel-development": "Panels",
    };

    const counts = [
      "21.1k",
      "15.2k",
      "10.3k",
      "8.4k",
      "6.5k",
      "4.6k",
      "2.7k",
      "1.8k",
      "1.2k",
      "0.9k",
      "0.7k",
      "0.5k",
      "0.3k",
    ];

    return {
      key,
      name: categoryNames[key] || key,
      count: counts[index] || "0.1k",
      href: `/united-states/california/los-angeles/${key}`,
    };
  });

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 mx-auto flex w-full justify-center overflow-hidden transition-all duration-300 pointer-events-none ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ height: isMenuOpen ? "100vh" : "79px" }}
    >
      <div
        className="flex h-full w-full max-w-md flex-col p-4 pointer-events-auto"
        style={{ gap: "1px" }}
      >
        <nav className="flex w-full items-center justify-between rounded-2xl bg-[#121212]/80 px-7 py-5 text-white backdrop-blur-sm">
          <Link
            href="/"
            onClick={closeMenu}
            className="relative w-[42px] h-[22px] flex-shrink-0"
          >
            <Image
              src="/m.svg"
              alt="Moydus"
              fill
              className="object-contain"
              sizes="42px"
            />
          </Link>
          <button
            className="text-sm font-bold uppercase text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </nav>
        {isMenuOpen && (
          <>
            <ul className="flex w-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#121212]/80 px-7 py-5 text-[#ff4d00]  backdrop-blur-sm">
              {navCategories.map((category) => (
                <li
                  key={category.key}
                  className="relative flex cursor-pointer flex-col items-center overflow-hidden"
                >
                  <Link
                    href={category.href}
                    className="flex items-start gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] md:text-2xl">
                      {category.name}
                    </span>
                    <span className="text-sm font-bold leading-[0.9] tracking-tighter">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex w-full items-center justify-between rounded-2xl bg-[#121212]/80 p-4 text-sm tracking-tight text-white/60 backdrop-blur-sm">
              <Link href="/privacy-policy" onClick={closeMenu}>
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" onClick={closeMenu}>
                Terms of Service
              </Link>
            </div>
            <div className="flex w-full items-center justify-center rounded-2xl bg-[#ff4d00] p-4 text-sm font-bold text-white backdrop-blur-sm">
              <Link
                href="https://app.moydus.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-2"
              >
                📦 Choose Package
              </Link>
            </div>
            <LocaleSwitcher />
          </>
        )}
      </div>
    </div>
  );
}
