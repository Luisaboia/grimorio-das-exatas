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
  {
    label: "Básico",
    value: "basico",
    activeColor: "bg-green-800 text-green-100 ring-2 ring-green-400",
    inactiveColor: "bg-green-900/60 text-green-300 hover:bg-green-900",
  },
  {
    label: "Intermediário",
    value: "intermediario",
    activeColor: "bg-yellow-800 text-yellow-100 ring-2 ring-yellow-400",
    inactiveColor: "bg-yellow-900/60 text-yellow-300 hover:bg-yellow-900",
  },
  {
    label: "Avançado",
    value: "avancado",
    activeColor: "bg-red-800 text-red-100 ring-2 ring-red-400",
    inactiveColor: "bg-red-900/60 text-red-300 hover:bg-red-900",
  },
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
        <span className="mr-1 text-sm font-medium text-surface-50/60">
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
          <span className="mr-1 text-sm font-medium text-surface-50/60">
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
        <span className="mr-1 text-sm font-medium text-surface-50/60">
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
            activeClassName={d.activeColor}
            inactiveClassName={d.inactiveColor}
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
  activeClassName,
  inactiveClassName,
  children,
}: {
  href: string;
  active: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  children: React.ReactNode;
}) {
  const defaultActive = "bg-primary-600 text-white shadow-sm";
  const defaultInactive =
    "bg-surface-800 text-surface-50/70 hover:bg-surface-700";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
        active
          ? activeClassName || defaultActive
          : inactiveClassName || defaultInactive
      }`}
    >
      {children}
    </Link>
  );
}
