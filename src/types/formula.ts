export interface FormulaFrontmatter {
  title: string;
  slug: string;
  category: "fisica" | "matematica";
  subcategory: string;
  tags: string[];
  difficulty: "basico" | "intermediario" | "avancado";
  description: string;
  formula_preview: string;
}

export interface FormulaData {
  frontmatter: FormulaFrontmatter;
  content: string; // raw MDX content
  slug: string;
}

export interface DemonstracaoFrontmatter {
  title: string;
  slug: string;
  type: "deducao" | "historia" | "mista";
}

export interface DemonstracaoData {
  frontmatter: DemonstracaoFrontmatter;
  content: string;
  slug: string;
}
