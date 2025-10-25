import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark";
}

export const Logo = ({ className, variant = "default" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className || ""}`}>
      {/* Wrapper sabit oranlı olsun */}
      <div className="relative w-[42px] h-[22px] flex-shrink-0 flex items-center justify-center">
        {/* Light mode logo */}
        <Image
          src="/m.svg"
          alt="Moydus"
          fill
          className={`object-contain ${
            variant === "dark" ? "hidden" : "block dark:hidden"
          }`}
          sizes="42px"
        />

        {/* Dark mode logo */}
        <Image
          src="/moy-black.svg"
          alt="Moydus"
          fill
          className={`object-contain ${
            variant === "dark" ? "block" : "hidden dark:block"
          }`}
          sizes="42px"
        />
      </div>

      <span className="text-xl font-medium text-current leading-none select-none">
        Moydus
      </span>
    </div>
  );
};
