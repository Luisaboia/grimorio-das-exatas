import { searchFormulas } from "@/lib/search";
import { FormulaCard } from "@/components/formulas/FormulaCard";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/lib/categories";
import Link from "next/link";

interface BuscaPageProps {
  searchParams: Promise<{ q?: string; category?: string; difficulty?: string }>;
}

export const metadata = {
  title: "Busca",
};

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const categoryFilter = params.category ?? "";
  const difficultyFilter = params.difficulty ?? "";

  const allResults = query.trim() ? await searchFormulas(query) : [];

  // Apply client-side filters on the results
  const results = allResults.filter((f) => {
    if (categoryFilter && f.category !== categoryFilter) return false;
    if (difficultyFilter && f.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-800 text-surface-50">
            Resultados da busca
          </h1>
          {query && (
            <p className="mt-2 text-surface-800/60 text-surface-50/60">
              {results.length}{" "}
              {results.length === 1 ? "resultado" : "resultados"} para{" "}
              <span className="font-semibold text-surface-800 text-surface-50">
                &quot;{query}&quot;
              </span>
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-surface-800/60 text-surface-50/60">
              Categoria:
            </span>
            <Link
              href={buildFilterUrl(query, "", difficultyFilter)}
              className="inline-block"
            >
              <Badge
                variant={!categoryFilter ? "fisica" : "default"}
                className={!categoryFilter ? "ring-2 ring-primary-400/30" : ""}
              >
                Todas
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={buildFilterUrl(query, cat.slug, difficultyFilter)}
                className="inline-block"
              >
                <Badge
                  variant={
                    categoryFilter === cat.slug ? cat.slug as "fisica" | "matematica" : "default"
                  }
                  className={
                    categoryFilter === cat.slug
                      ? "ring-2 ring-primary-400/30"
                      : ""
                  }
                >
                  {cat.icon} {cat.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-surface-800/60 text-surface-50/60">
              Dificuldade:
            </span>
            <Link
              href={buildFilterUrl(query, categoryFilter, "")}
              className="inline-block"
            >
              <Badge
                variant={!difficultyFilter ? "fisica" : "default"}
                className={
                  !difficultyFilter ? "ring-2 ring-primary-400/30" : ""
                }
              >
                Todas
              </Badge>
            </Link>
            {(
              [
                ["basico", "Básico"],
                ["intermediario", "Intermediário"],
                ["avancado", "Avançado"],
              ] as const
            ).map(([value, label]) => (
              <Link
                key={value}
                href={buildFilterUrl(query, categoryFilter, value)}
                className="inline-block"
              >
                <Badge
                  variant={difficultyFilter === value ? value : "default"}
                  className={
                    difficultyFilter === value
                      ? "ring-2 ring-primary-400/30"
                      : ""
                  }
                >
                  {label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((formula, i) => (
              <FormulaCard key={formula.slug} formula={formula} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-surface-200 bg-surface-50 px-6 py-16 text-center border-surface-800 bg-surface-900">
            <p className="text-4xl">🔍</p>
            <h2 className="mt-4 text-lg font-semibold text-surface-800 text-surface-50">
              {query
                ? "Nenhuma fórmula encontrada"
                : "Digite algo para buscar"}
            </h2>
            <p className="mt-2 text-sm text-surface-800/60 text-surface-50/60">
              {query
                ? "Tente usar termos diferentes ou remova os filtros."
                : "Busque por nome, conceito ou equação."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-surface-800/40 text-surface-50/40">
                Sugestões:
              </span>
              {["Newton", "Bhaskara", "Cinemática", "Energia"].map((term) => (
                <Link
                  key={term}
                  href={`/busca?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-surface-300 bg-surface-100 px-3 py-1 text-sm text-surface-800 transition-colors hover:border-primary-400 hover:text-primary-600 border-surface-700 bg-surface-800 text-surface-50 hover:border-primary-500 hover:text-primary-400"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function buildFilterUrl(
  query: string,
  category: string,
  difficulty: string,
): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  if (difficulty) params.set("difficulty", difficulty);
  const qs = params.toString();
  return `/busca${qs ? `?${qs}` : ""}`;
}
