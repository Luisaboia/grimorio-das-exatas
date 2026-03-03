import { getAllFormulas, getFormulasByCategory } from "../mdx";

describe("mdx utilities", () => {
  describe("getAllFormulas", () => {
    it("returns an array of formulas", () => {
      const formulas = getAllFormulas();
      expect(Array.isArray(formulas)).toBe(true);
      expect(formulas.length).toBeGreaterThan(0);
    });

    it("each formula has required frontmatter fields", () => {
      const formulas = getAllFormulas();
      for (const formula of formulas) {
        expect(formula.frontmatter).toBeDefined();
        expect(formula.frontmatter.title).toBeTruthy();
        expect(formula.frontmatter.slug).toBeTruthy();
        expect(formula.frontmatter.category).toMatch(/^(fisica|matematica)$/);
        expect(formula.frontmatter.tags).toBeInstanceOf(Array);
        expect(formula.frontmatter.difficulty).toMatch(
          /^(basico|intermediario|avancado)$/,
        );
      }
    });

    it("returns formulas sorted alphabetically by title", () => {
      const formulas = getAllFormulas();
      const titles = formulas.map((f) => f.frontmatter.title);
      const sorted = [...titles].sort((a, b) => a.localeCompare(b, "pt-BR"));
      expect(titles).toEqual(sorted);
    });

    it("each formula has a slug matching frontmatter slug", () => {
      const formulas = getAllFormulas();
      for (const formula of formulas) {
        expect(formula.slug).toBe(formula.frontmatter.slug);
      }
    });
  });

  describe("getFormulasByCategory", () => {
    it("returns only fisica formulas", () => {
      const fisica = getFormulasByCategory("fisica");
      expect(fisica.length).toBeGreaterThan(0);
      for (const f of fisica) {
        expect(f.frontmatter.category).toBe("fisica");
      }
    });

    it("returns only matematica formulas", () => {
      const mat = getFormulasByCategory("matematica");
      expect(mat.length).toBeGreaterThan(0);
      for (const f of mat) {
        expect(f.frontmatter.category).toBe("matematica");
      }
    });

    it("returns empty array for unknown category", () => {
      const empty = getFormulasByCategory("quimica");
      expect(empty).toEqual([]);
    });
  });
});
