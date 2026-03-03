"use client";

import "katex/dist/katex.min.css";

import { BlockMath, InlineMath } from "react-katex";

interface FormulaProps {
  math: string;
  block?: boolean;
}

export function Formula({ math, block = false }: FormulaProps) {
  if (block) {
    return (
      <span className="my-4 block text-center text-lg">
        <BlockMath math={math} />
      </span>
    );
  }

  return <InlineMath math={math} />;
}
