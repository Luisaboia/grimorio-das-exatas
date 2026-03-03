import type { MetadataRoute } from "next";
import { getAllFormulas } from "@/lib/mdx";
import { categories } from "@/lib/categories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formulas-ifpr.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const formulas = getAllFormulas();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/formulas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/busca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.flatMap((cat) => [
    {
      url: `${BASE_URL}/formulas/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...cat.subcategories.map((sub) => ({
      url: `${BASE_URL}/formulas/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  // Formula detail routes
  const formulaRoutes: MetadataRoute.Sitemap = formulas.map((f) => ({
    url: `${BASE_URL}/formula/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...formulaRoutes];
}
