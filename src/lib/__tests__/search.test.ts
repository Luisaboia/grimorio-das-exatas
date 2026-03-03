import { searchFormulas } from "../search";

// The search function tries Supabase first, then falls back to MDX.
// In the test environment Supabase is not available, so we are testing the
// MDX-based fallback search which uses getAllFormulas() under the hood.

describe("searchFormulas", () => {
  it("returns results for a known physics term", async () => {
    const results = await searchFormulas("Newton");
    expect(results.length).toBeGreaterThan(0);
    const titles = results.map((r) => r.title.toLowerCase());
    expect(titles.some((t) => t.includes("newton"))).toBe(true);
  });

  it("returns results for a known math term", async () => {
    const results = await searchFormulas("Bhaskara");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns empty array for empty query", async () => {
    const results = await searchFormulas("");
    expect(results).toEqual([]);
  });

  it("returns empty array for whitespace-only query", async () => {
    const results = await searchFormulas("   ");
    expect(results).toEqual([]);
  });

  it("returns empty array for nonsense query", async () => {
    const results = await searchFormulas("xyznonexistent123");
    expect(results).toEqual([]);
  });

  it("performs accent-insensitive search", async () => {
    const results = await searchFormulas("energia");
    expect(results.length).toBeGreaterThan(0);
  });

  it("result objects have expected shape", async () => {
    const results = await searchFormulas("força");
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r).toHaveProperty("title");
      expect(r).toHaveProperty("slug");
      expect(r).toHaveProperty("category");
      expect(r).toHaveProperty("tags");
    }
  });
});
