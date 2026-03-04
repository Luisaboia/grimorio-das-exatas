import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryFilter } from "@/components/formulas/CategoryFilter";
import { FormulaGrid } from "@/components/formulas/FormulaGrid";
import { categories } from "@/lib/categories";
import { getFormulasByCategory } from "@/lib/mdx";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const dificuldade = typeof resolvedSearchParams.dificuldade === "string"
    ? resolvedSearchParams.dificuldade
    : undefined;

  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const formulas = getFormulasByCategory(category);
  let frontmatters = formulas.map((f) => f.frontmatter);

  if (dificuldade) {
    frontmatters = frontmatters.filter((f) => f.difficulty === dificuldade);
  }

  return (
    <div className="max-w-full overflow-x-hidden px-4 py-10 sm:px-6 lg:px-10">
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
          <h1 className="text-3xl font-bold tracking-tight text-surface-50 sm:text-4xl">
            {cat.name}
          </h1>
        </div>
        <p className="mt-2 text-lg text-surface-50/60">
          {cat.subcategories.length} subcategorias disponíveis
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <CategoryFilter currentCategory={category} basePath={`/formulas/${category}`} currentDifficulty={dificuldade} />
      </div>

      {/* Grid */}
      <FormulaGrid formulas={frontmatters} />
    </div>
  );
}
