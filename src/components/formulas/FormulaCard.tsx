"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { FormulaFrontmatter } from "@/types/formula";

interface FormulaCardProps {
  formula: FormulaFrontmatter;
  index?: number;
}

const difficultyLabels: Record<FormulaFrontmatter["difficulty"], string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const categoryLabels: Record<FormulaFrontmatter["category"], string> = {
  fisica: "Física",
  matematica: "Matemática",
};

export function FormulaCard({ formula, index = 0 }: FormulaCardProps) {
  return (
    <Link
      href={`/formula/${formula.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Card
        hover
        className="flex h-full animate-[fadeInUp_0.4s_ease-out_both] flex-col"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        {/* KaTeX preview */}
        <div className="mb-4 flex min-h-[3.5rem] items-center justify-center overflow-hidden rounded-lg bg-surface-900 px-3 py-3">
          <div className="text-base text-surface-50">
            <KaTeXPreview math={formula.formula_preview} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-surface-50 group-hover:text-primary-400">
          {formula.title}
        </h3>

        {/* Description (2-line clamp) */}
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-surface-50/60">
          {formula.description}
        </p>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={formula.category}>
            {categoryLabels[formula.category]}
          </Badge>
          <Badge variant={formula.difficulty}>
            {difficultyLabels[formula.difficulty]}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}

class KaTeXErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("KaTeX render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <span className="text-sm italic text-surface-50/40">
          Pré-visualização indisponível
        </span>
      );
    }
    return this.props.children;
  }
}

function KaTeXPreview({ math }: { math: string }) {
  return (
    <KaTeXErrorBoundary>
      <BlockMath math={math} />
    </KaTeXErrorBoundary>
  );
}
