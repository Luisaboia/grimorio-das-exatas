"use client";

import Link from "next/link";

import { categories } from "@/lib/categories";

interface CategoryFilterProps {
  /** The currently selected category slug (null = "Todas") */
  currentCategory?: string | null;
  /** The currently selected subcategory slug */
  currentSubcategory?: string | null;
  /** The currently selected difficulty from the search param */
  currentDifficulty?: string;
  /** The base path for the current page (e.g. "/formulas", "/formulas/fisica") */
  basePath: string;
}

const difficultyOptions = [
  { label: "Básico", value: "basico", color: "bg-green-100 text-green-700 bg-green-900 text-green-200" },
  { label: "Intermediário", value: "intermediario", color: "bg-yellow-100 text-yellow-700 bg-yellow-900 text-yellow-200" },
  { label: "Avançado", value: "avancado", color: "bg-red-100 text-red-700 bg-red-900 text-red-200" },
];

export function CategoryFilter({
  currentCategory = null,
  currentSubcategory = null,
  currentDifficulty,
  basePath,
}: CategoryFilterProps) {
  const activeCategory = categories.find((c) => c.slug === currentCategory);

  return (
    <div className="space-y-4">
      {/* Category chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-surface-800/60 text-surface-50/60">
          Categoria:
        </span>
        <FilterChip href="/formulas" active={!currentCategory}>
          Todas
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip
            key={cat.slug}
            href={`/formulas/${cat.slug}`}
            active={currentCategory === cat.slug}
          >
            <span aria-hidden="true">{cat.icon}</span> {cat.name}
          </FilterChip>
        ))}
      </div>

      {/* Subcategory chips (show when a category is selected) */}
      {activeCategory && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-surface-800/60 text-surface-50/60">
            Subcategoria:
          </span>
          <FilterChip
            href={`/formulas/${activeCategory.slug}`}
            active={!currentSubcategory}
          >
            Todas
          </FilterChip>
          {activeCategory.subcategories.map((sub) => (
            <FilterChip
              key={sub.slug}
              href={`/formulas/${activeCategory.slug}/${sub.slug}`}
              active={currentSubcategory === sub.slug}
            >
              {sub.name}
            </FilterChip>
          ))}
        </div>
      )}

      {/* Difficulty filter — shown on all catalog pages */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-surface-800/60 text-surface-50/60">
          Dificuldade:
        </span>
        <FilterChip href={basePath} active={!currentDifficulty}>
          Todas
        </FilterChip>
        {difficultyOptions.map((d) => (
          <FilterChip
            key={d.value}
            href={`${basePath}?dificuldade=${d.value}`}
            active={currentDifficulty === d.value}
            className={d.color}
          >
            {d.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  active,
  className = "",
  children,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-primary-500 text-white shadow-sm bg-primary-600"
          : className ||
            "bg-surface-100 text-surface-800/70 hover:bg-surface-200 bg-surface-800 text-surface-50/70 hover:bg-surface-700"
      }`}
    >
      {children}
    </Link>
  );
}
