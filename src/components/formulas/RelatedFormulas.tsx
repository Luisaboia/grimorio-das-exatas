import type { FormulaFrontmatter } from "@/types/formula";

import { FormulaCard } from "./FormulaCard";

interface RelatedFormulasProps {
  formulas: FormulaFrontmatter[];
}

export function RelatedFormulas({ formulas }: RelatedFormulasProps) {
  if (formulas.length === 0) return null;

  return (
    <section className="mt-12 border-t border-surface-700 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-surface-50">
        Fórmulas Relacionadas
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {formulas.map((formula, index) => (
          <FormulaCard key={formula.slug} formula={formula} index={index} />
        ))}
      </div>
    </section>
  );
}
