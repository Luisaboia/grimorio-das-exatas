import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryFilter } from "@/components/formulas/CategoryFilter";
import { FormulaGrid } from "@/components/formulas/FormulaGrid";
import { getAllFormulas } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Catálogo de Fórmulas",
  description:
    "Explore todas as fórmulas de Matemática e Física. Filtre por categoria, subcategoria e dificuldade.",
  openGraph: {
    title: "Catálogo de Fórmulas | Grimório das Exatas",
    description:
      "Explore todas as fórmulas de Matemática e Física. Filtre por categoria, subcategoria e dificuldade.",
  },
};

export default async function FormulasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const dificuldade = typeof resolvedSearchParams.dificuldade === "string"
    ? resolvedSearchParams.dificuldade
    : undefined;

  const allFormulas = getAllFormulas();
  let frontmatters = allFormulas.map((f) => f.frontmatter);

  if (dificuldade) {
    frontmatters = frontmatters.filter((f) => f.difficulty === dificuldade);
  }

  return (
    <div className="px-6 py-10 lg:px-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Fórmulas" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-surface-50 sm:text-4xl">
          Catálogo de Fórmulas
        </h1>
        <p className="mt-2 text-lg text-surface-50/60">
          Todas as fórmulas de Matemática e Física em um só lugar.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <CategoryFilter basePath="/formulas" currentDifficulty={dificuldade} />
      </div>

      {/* Grid */}
      <FormulaGrid formulas={frontmatters} />
    </div>
  );
}
