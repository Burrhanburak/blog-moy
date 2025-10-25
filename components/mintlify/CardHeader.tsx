import { clsx } from "clsx";
import React, { ReactNode } from "react";

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx("px-6 py-4 border-b border-zinc-200 dark:border-zinc-800", className)}>
      {children}
    </div>
  );
}
