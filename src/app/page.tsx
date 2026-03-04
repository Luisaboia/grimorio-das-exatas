import Link from "next/link";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";
import { categories } from "@/lib/categories";
import { HeroSearch } from "./HeroSearch";
import { FormulaTypewriter } from "@/components/home/FormulaTypewriter";

export default function Home() {
  return (
    <div className="max-w-full overflow-x-hidden px-4 py-10 sm:px-6 lg:px-10">
      {/* Hero section */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-surface-50 sm:text-5xl">
          Grimório das Exatas
        </h1>
        <p className="mt-4 text-base text-surface-50/60 sm:text-lg">
          Seu catálogo de fórmulas de Matemática e Física
        </p>

        {/* Formula typing animation */}
        <FormulaTypewriter />

        {/* Prominent search bar — triggers command palette */}
        <div className="mx-auto mt-8 max-w-lg">
          <HeroSearch />
        </div>
      </section>

      {/* Category cards */}
      <section className="mx-auto mt-14 max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold text-surface-50">
          Categorias
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <Link key={category.slug} href={`/formulas/${category.slug}`}>
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <span className="text-4xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-surface-50">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-surface-50/60">
                      {category.subcategories.length} subcategorias
                    </p>
                  </div>
                </div>

                {/* Subcategory chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.subcategories.map((sub) => (
                    <Badge
                      key={sub.slug}
                      variant={category.slug === "matematica" ? "matematica" : "fisica"}
                    >
                      {sub.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
