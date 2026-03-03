import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import type { FormulaData, FormulaFrontmatter } from "@/types/formula";

const contentDirectory = path.join(process.cwd(), "src/content");

function getMDXFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMDXFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllFormulas(): FormulaData[] {
  const files = getMDXFiles(contentDirectory);

  const formulas = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as FormulaFrontmatter;

    return {
      frontmatter,
      content,
      slug: frontmatter.slug,
    };
  });

  return formulas.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title, "pt-BR"),
  );
}

export async function getFormulaBySlug(slug: string) {
  const allFormulas = getAllFormulas();
  const formula = allFormulas.find((f) => f.slug === slug);

  if (!formula) {
    return null;
  }

  const mdxSource = await serialize(formula.content, {
    parseFrontmatter: false,
  });

  return {
    frontmatter: formula.frontmatter,
    mdxSource,
    slug: formula.slug,
  };
}

export function getFormulasByCategory(category: string): FormulaData[] {
  return getAllFormulas().filter((f) => f.frontmatter.category === category);
}

export function getFormulasBySubcategory(
  category: string,
  subcategory: string,
): FormulaData[] {
  return getAllFormulas().filter(
    (f) =>
      f.frontmatter.category === category &&
      f.frontmatter.subcategory === subcategory,
  );
}
