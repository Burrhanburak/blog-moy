import { clsx } from "clsx";
import React, { ReactNode } from "react";

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={clsx("font-semibold text-lg text-slate-800 dark:text-white", className)}>
      {children}
    </h3>
  );
}
