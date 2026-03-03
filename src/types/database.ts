export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  parent_id: string | null;
  display_order: number;
  created_at: string;
}

export interface DbFormula {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  formula_preview: string;
  category_id: string;
  subcategory: string;
  difficulty: "basico" | "intermediario" | "avancado";
  tags: string[];
  mdx_path: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
