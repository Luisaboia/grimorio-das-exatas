"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { FormulaFrontmatter } from "@/types/formula";

const categoryLabels: Record<FormulaFrontmatter["category"], string> = {
  fisica: "Física",
  matematica: "Matemática",
};

const difficultyLabels: Record<FormulaFrontmatter["difficulty"], string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

interface SearchResultsProps {
  results: FormulaFrontmatter[];
  query: string;
  selectedIndex?: number;
  onSelect?: () => void;
}

/**
 * Highlight matched terms in text.
 */
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (tokens.length === 0) return text;

  const regex = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="rounded bg-primary-800/60 px-0.5 text-inherit"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function SearchResults({
  results,
  query,
  selectedIndex = -1,
  onSelect,
}: SearchResultsProps) {
  if (results.length === 0 && query.trim()) {
    return (
      <div className="px-4 py-8 text-center text-sm text-surface-50/50">
        <p className="text-lg">🔍</p>
        <p className="mt-2 font-medium">Nenhum resultado encontrado</p>
        <p className="mt-1">
          Tente buscar por &quot;Newton&quot;, &quot;Bhaskara&quot; ou
          &quot;cinemática&quot;
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-surface-800">
      {results.map((formula, index) => (
        <li key={formula.slug}>
          <Link
            href={`/formula/${formula.slug}`}
            onClick={onSelect}
            className={`flex items-start gap-3 px-4 py-3 transition-colors duration-100 hover:bg-surface-800/60 ${
              selectedIndex === index
                ? "bg-primary-900/30"
                : ""
            }`}
            data-selected={selectedIndex === index}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-50">
                {highlightMatch(formula.title, query)}
              </p>
              <p className="mt-0.5 line-clamp-1 text-xs text-surface-50/60">
                {highlightMatch(formula.description, query)}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5 pt-0.5">
              <Badge variant={formula.category} className="!text-[10px] !px-2 !py-0.5">
                {categoryLabels[formula.category]}
              </Badge>
              <Badge
                variant={formula.difficulty}
                className="!text-[10px] !px-2 !py-0.5"
              >
                {difficultyLabels[formula.difficulty]}
              </Badge>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
