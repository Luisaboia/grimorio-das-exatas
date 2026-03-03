import type { FormulaFrontmatter } from "@/types/formula";
import type { DbFormula } from "@/types/database";
import { getSupabaseClient } from "./supabase";
import { getAllFormulas } from "./mdx";

/**
 * Normalise a string for accent-insensitive comparison.
 */
function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Convert a DbFormula row into a FormulaFrontmatter object.
 */
function dbFormulaToFrontmatter(row: DbFormula): FormulaFrontmatter {
  return {
    title: row.title,
    slug: row.slug,
    category: row.mdx_path.startsWith("fisica/") ? "fisica" : "matematica",
    subcategory: row.subcategory,
    tags: row.tags,
    difficulty: row.difficulty,
    description: row.description ?? "",
    formula_preview: row.formula_preview,
  };
}

/**
 * Search formulas using Supabase full-text search when available,
 * falling back to MDX metadata filtering otherwise.
 *
 * Results are sorted by relevance.
 */
export async function searchFormulas(
  query: string,
): Promise<FormulaFrontmatter[]> {
  if (!query.trim()) return [];

  // --- Try Supabase first ---
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      // Build a tsquery-compatible string: split words and join with &
      const tsQuery = query
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .join(" & ");

      const { data, error } = await supabase
        .from("formulas")
        .select("*")
        .textSearch(
          "title",
          tsQuery,
          { config: "portuguese", type: "websearch" },
        )
        .eq("is_published", true)
        .limit(50);

      // If the simple textSearch on title didn't work well, fall back to
      // a raw RPC call that uses the composite GIN index.
      if (!error && data && data.length > 0) {
        return (data as DbFormula[]).map(dbFormulaToFrontmatter);
      }

      // Fallback: use the full GIN index via rpc
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "search_formulas",
        { search_query: tsQuery },
      );

      if (!rpcError && rpcData && (rpcData as DbFormula[]).length > 0) {
        return (rpcData as DbFormula[]).map(dbFormulaToFrontmatter);
      }
    } catch {
      // Supabase unavailable — fall through to MDX fallback
    }
  }

  // --- MDX fallback ---
  const all = getAllFormulas();
  const normQuery = normalise(query);
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);

  const scored = all
    .map(({ frontmatter }) => {
      const titleNorm = normalise(frontmatter.title);
      const descNorm = normalise(frontmatter.description);
      const tagsNorm = frontmatter.tags.map(normalise);

      let score = 0;

      for (const token of queryTokens) {
        if (titleNorm.includes(token)) score += 3;
        if (descNorm.includes(token)) score += 2;
        if (tagsNorm.some((t) => t.includes(token))) score += 1;
      }

      return { frontmatter, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ frontmatter }) => frontmatter);
}
