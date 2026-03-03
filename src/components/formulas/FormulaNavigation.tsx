import Link from "next/link";

interface FormulaLink {
  slug: string;
  title: string;
}

interface FormulaNavigationProps {
  previous: FormulaLink | null;
  next: FormulaLink | null;
  categorySlug: string;
  categoryName: string;
}

export function FormulaNavigation({
  previous,
  next,
  categorySlug,
  categoryName,
}: FormulaNavigationProps) {
  return (
    <div className="mt-12 space-y-6">
      {/* Back to category */}
      <div className="text-center">
        <Link
          href={`/formulas/${categorySlug}`}
          className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
        >
          ← Voltar para {categoryName}
        </Link>
      </div>

      {/* Prev / Next */}
      <div className="flex items-stretch justify-between gap-4 border-t border-surface-700 pt-6">
        {previous ? (
          <Link
            href={`/formula/${previous.slug}`}
            className="group flex flex-1 flex-col items-start rounded-lg border border-surface-700 p-4 transition-colors hover:border-primary-700"
          >
            <span className="text-xs text-surface-50/60">
              ← Anterior
            </span>
            <span className="mt-1 text-sm font-medium text-surface-50 group-hover:text-primary-400">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/formula/${next.slug}`}
            className="group flex flex-1 flex-col items-end rounded-lg border border-surface-700 p-4 text-right transition-colors hover:border-primary-700"
          >
            <span className="text-xs text-surface-50/60">
              Próxima →
            </span>
            <span className="mt-1 text-sm font-medium text-surface-50 group-hover:text-primary-400">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
