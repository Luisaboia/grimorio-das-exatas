import Link from "next/link";
import { Input } from "@/components/ui";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";
import { categories } from "@/lib/categories";

export default function Home() {
  return (
    <div className="px-6 py-10 lg:px-10">
      {/* Hero section */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-surface-800 dark:text-surface-50 sm:text-5xl">
          Fórmulas de Matemática e Física
        </h1>
        <p className="mt-4 text-lg text-surface-800/60 dark:text-surface-50/60">
          Catálogo completo de fórmulas para estudo e consulta
        </p>

        {/* Prominent search bar */}
        <div className="mx-auto mt-8 max-w-lg">
          <Input
            type="search"
            placeholder="Buscar fórmulas, conceitos, equações..."
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            className="!py-3.5 !text-lg"
          />
        </div>
      </section>

      {/* Category cards */}
      <section className="mx-auto mt-14 max-w-4xl">
        <h2 className="mb-6 text-xl font-semibold text-surface-800 dark:text-surface-50">
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
                    <h3 className="text-xl font-bold text-surface-800 dark:text-surface-50">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-surface-800/60 dark:text-surface-50/60">
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
