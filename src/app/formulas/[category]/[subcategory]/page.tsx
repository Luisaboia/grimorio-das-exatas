import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryFilter } from "@/components/formulas/CategoryFilter";
import { FormulaGrid } from "@/components/formulas/FormulaGrid";
import { categories } from "@/lib/categories";
import { getFormulasBySubcategory } from "@/lib/mdx";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateStaticParams() {
  const result: { category: string; subcategory: string }[] = [];

  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      result.push({ category: cat.slug, subcategory: sub.slug });
    }
  }

  return result;
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const cat = categories.find((c) => c.slug === category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);

  if (!cat || !sub) return {};

  return {
    title: `${sub.name} — ${cat.name}`,
    description: `Fórmulas de ${sub.name} (${cat.name}). Consulte equações e conceitos.`,
  };
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { category, subcategory } = await params;

  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const sub = cat.subcategories.find((s) => s.slug === subcategory);
  if (!sub) notFound();

  const formulas = getFormulasBySubcategory(category, subcategory);
  const frontmatters = formulas.map((f) => f.frontmatter);

  return (
    <div className="px-6 py-10 lg:px-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Fórmulas", href: "/formulas" },
          { label: cat.name, href: `/formulas/${cat.slug}` },
          { label: sub.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {cat.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
              {sub.name}
            </h1>
            <p className="mt-1 text-lg text-surface-800/60 dark:text-surface-50/60">
              {cat.name}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <CategoryFilter
          currentCategory={category}
          currentSubcategory={subcategory}
        />
      </div>

      {/* Grid */}
      <FormulaGrid formulas={frontmatters} />
    </div>
  );
}
