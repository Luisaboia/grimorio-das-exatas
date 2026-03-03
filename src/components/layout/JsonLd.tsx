import type { FormulaFrontmatter } from "@/types/formula";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formulas-ifpr.vercel.app";

interface JsonLdProps {
  formula: FormulaFrontmatter;
}

export function JsonLd({ formula }: JsonLdProps) {
  const categoryLabel = formula.category === "fisica" ? "Física" : "Matemática";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: formula.title,
    headline: formula.title,
    description: formula.description,
    url: `${BASE_URL}/formula/${formula.slug}`,
    author: {
      "@type": "Organization",
      name: "Grimório das Exatas",
    },
    publisher: {
      "@type": "Organization",
      name: "Grimório das Exatas",
    },
    educationalLevel: formula.difficulty === "basico"
      ? "Beginner"
      : formula.difficulty === "intermediario"
        ? "Intermediate"
        : "Advanced",
    learningResourceType: "Formula",
    about: {
      "@type": "Thing",
      name: categoryLabel,
    },
    keywords: formula.tags.join(", "),
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
