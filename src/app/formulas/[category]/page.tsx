import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryFilter } from "@/components/formulas/CategoryFilter";
import { FormulaGrid } from "@/components/formulas/FormulaGrid";
import { categories } from "@/lib/categories";
import { getFormulasByCategory } from "@/lib/mdx";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `${cat.name} — Fórmulas`,
    description: `Fórmulas de ${cat.name}: explore ${cat.subcategories.length} subcategorias.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const formulas = getFormulasByCategory(category);
  const frontmatters = formulas.map((f) => f.frontmatter);

  return (
    <div className="px-6 py-10 lg:px-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Fórmulas", href: "/formulas" },
          { label: cat.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {cat.icon}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            {cat.name}
          </h1>
        </div>
        <p className="mt-2 text-lg text-surface-800/60 dark:text-surface-50/60">
          {cat.subcategories.length} subcategorias disponíveis
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <CategoryFilter currentCategory={category} />
      </div>

      {/* Grid */}
      <FormulaGrid formulas={frontmatters} />
    </div>
  );
}
