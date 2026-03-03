"use client";

import "katex/dist/katex.min.css";

import { InlineMath } from "react-katex";

import { Badge } from "@/components/ui/Badge";

interface VariableProps {
  symbol: string;
  description: string;
  unit?: string;
}

export function Variable({ symbol, description, unit }: VariableProps) {
  return (
    <div className="flex items-center gap-4 border-b border-surface-800 py-3 last:border-b-0">
      <span className="flex w-16 shrink-0 justify-center text-lg">
        <InlineMath math={symbol} />
      </span>

      <span className="flex-1 text-sm text-surface-200">
        {description}
      </span>

      {unit && <Badge variant="default">{unit}</Badge>}
    </div>
  );
}
