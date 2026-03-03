import { SkeletonCard } from "@/components/ui/Skeleton";
import type { FormulaFrontmatter } from "@/types/formula";

import { FormulaCard } from "./FormulaCard";

interface FormulaGridProps {
  formulas: FormulaFrontmatter[];
  loading?: boolean;
}

export function FormulaGrid({ formulas, loading = false }: FormulaGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (formulas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="mb-4 h-16 w-16 text-surface-800/20 text-surface-50/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        <p className="text-lg font-semibold text-surface-800/60 text-surface-50/60">
          Nenhuma fórmula encontrada
        </p>
        <p className="mt-1 text-sm text-surface-800/40 text-surface-50/40">
          Tente ajustar os filtros ou buscar por outro termo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {formulas.map((formula, index) => (
        <FormulaCard key={formula.slug} formula={formula} index={index} />
      ))}
    </div>
  );
}
