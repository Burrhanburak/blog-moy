import { clsx } from "clsx";
import React, { ReactNode } from "react";

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx("px-6 py-4", className)}>
      {children}
    </div>
  );
}
