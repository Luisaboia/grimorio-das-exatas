import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/layout/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Example } from "@/components/formulas/Example";
import { Formula } from "@/components/formulas/Formula";
import { FormulaBlock } from "@/components/formulas/FormulaBlock";
import { FormulaNavigation } from "@/components/formulas/FormulaNavigation";
import { Note } from "@/components/formulas/Note";
import { RelatedFormulas } from "@/components/formulas/RelatedFormulas";
import { TableOfContents } from "@/components/formulas/TableOfContents";
import type { Heading } from "@/components/formulas/TableOfContents";
import { Variable } from "@/components/formulas/Variable";
import { categories } from "@/lib/categories";
import {
  getAllFormulas,
  getFormulaBySlug,
  getFormulasBySubcategory,
} from "@/lib/mdx";

interface FormulaDetailPageProps {
  params: Promise<{ slug: string }>;
}

/* ---------- helpers ---------- */

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getTextContent(
      (node as { props: { children?: ReactNode } }).props.children,
    );
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      text: match[2].trim(),
      level: match[1].length,
      id: slugify(match[2].trim()),
    });
  }

  return headings;
}

/* ---------- MDX components (RSC-compatible) ---------- */

const mdxComponents = {
  Formula,
  FormulaBlock,
  Variable,
  Example,
  Note,
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mb-4 mt-8 text-3xl font-bold text-surface-900 first:mt-0 dark:text-surface-50"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h2
        id={id}
        className="mb-3 mt-6 scroll-mt-24 text-2xl font-semibold text-surface-800 dark:text-surface-100"
        {...props}
      />
    );
  },
  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h3
        id={id}
        className="mb-2 mt-5 scroll-mt-24 text-xl font-semibold text-surface-800 dark:text-surface-100"
        {...props}
      />
    );
  },
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="my-3 leading-relaxed text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-3 list-disc space-y-1 pl-6 text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-3 list-decimal space-y-1 pl-6 text-surface-800 dark:text-surface-200"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className="font-semibold text-surface-900 dark:text-surface-50"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-sm dark:bg-surface-800"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-4 border-l-4 border-primary-300 pl-4 italic text-surface-800 dark:border-primary-700 dark:text-surface-200"
      {...props}
    />
  ),
};

const difficultyLabels: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const categoryLabels: Record<string, string> = {
  fisica: "Física",
  matematica: "Matemática",
};

/* ---------- static generation ---------- */

export async function generateStaticParams() {
  const formulas = getAllFormulas();
  return formulas.map((f) => ({ slug: f.slug }));
}

/* ---------- SEO metadata ---------- */

export async function generateMetadata({
  params,
}: FormulaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formula = await getFormulaBySlug(slug);

  if (!formula) return {};

  return {
    title: formula.frontmatter.title,
    description: formula.frontmatter.description,
    openGraph: {
      title: `${formula.frontmatter.title} | Fórmulas IFPR`,
      description: formula.frontmatter.description,
      type: "article",
    },
  };
}

/* ---------- page ---------- */

export default async function FormulaDetailPage({
  params,
}: FormulaDetailPageProps) {
  const { slug } = await params;

  // Get raw formula data
  const allFormulas = getAllFormulas();
  const rawFormula = allFormulas.find((f) => f.slug === slug);

  if (!rawFormula) notFound();

  const { frontmatter, content } = rawFormula;

  // Category & subcategory info
  const cat = categories.find((c) => c.slug === frontmatter.category);
  const sub = cat?.subcategories.find(
    (s) => s.slug === frontmatter.subcategory,
  );

  // Related formulas (same subcategory, excluding current)
  const subcategoryFormulas = getFormulasBySubcategory(
    frontmatter.category,
    frontmatter.subcategory,
  );
  const relatedFormulas = subcategoryFormulas
    .filter((f) => f.slug !== slug)
    .map((f) => f.frontmatter);

  // Previous / Next navigation within subcategory
  const currentIndex = subcategoryFormulas.findIndex((f) => f.slug === slug);
  const previous =
    currentIndex > 0
      ? {
          slug: subcategoryFormulas[currentIndex - 1].slug,
          title: subcategoryFormulas[currentIndex - 1].frontmatter.title,
        }
      : null;
  const next =
    currentIndex < subcategoryFormulas.length - 1
      ? {
          slug: subcategoryFormulas[currentIndex + 1].slug,
          title: subcategoryFormulas[currentIndex + 1].frontmatter.title,
        }
      : null;

  // Extract headings from raw MDX for Table of Contents
  const headings = extractHeadings(content);

  return (
    <div className="px-6 py-10 lg:px-10">
      {/* JSON-LD Structured Data */}
      <JsonLd formula={frontmatter} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Fórmulas", href: "/formulas" },
          ...(cat
            ? [{ label: cat.name, href: `/formulas/${cat.slug}` }]
            : []),
          ...(cat && sub
            ? [
                {
                  label: sub.name,
                  href: `/formulas/${cat.slug}/${sub.slug}`,
                },
              ]
            : []),
          { label: frontmatter.title },
        ]}
      />

      {/* Header area */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-lg text-surface-800/60 dark:text-surface-50/60">
          {frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={frontmatter.category}>
            {categoryLabels[frontmatter.category]}
          </Badge>
          <Badge variant={frontmatter.difficulty}>
            {difficultyLabels[frontmatter.difficulty]}
          </Badge>
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main formula — prominently displayed */}
      <FormulaBlock
        math={frontmatter.formula_preview}
        label={frontmatter.title}
      />

      {/* Content + optional Table of Contents */}
      <div className="mt-8 flex gap-10">
        {/* MDX Content */}
        <div className="min-w-0 flex-1">
          <div className="mdx-content">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>

        {/* Table of Contents (desktop only) */}
        {headings.length > 0 && (
          <aside className="hidden w-56 shrink-0 xl:block">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>

      {/* Related formulas */}
      <RelatedFormulas formulas={relatedFormulas} />

      {/* Previous / Next navigation */}
      <FormulaNavigation
        previous={previous}
        next={next}
        categorySlug={frontmatter.category}
        categoryName={cat?.name ?? categoryLabels[frontmatter.category]}
      />
    </div>
  );
}
