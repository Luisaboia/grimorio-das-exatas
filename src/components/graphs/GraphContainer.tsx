"use client";
import { type ReactNode } from "react";

interface GraphContainerProps {
  children: ReactNode;
  label?: string;
}

export function GraphContainer({ children, label }: GraphContainerProps) {
  return (
    <div className="relative my-6 rounded-lg border-l-4 border-accent-500 bg-accent-950/20 px-3 py-4 sm:px-6 sm:py-5">
      {label && (
        <p className="mb-3 text-sm font-semibold text-accent-300">{label}</p>
      )}
      <div className="overflow-hidden rounded" role="img" aria-label={label ?? "Gráfico interativo"}>
        {children}
      </div>
    </div>
  );
}
