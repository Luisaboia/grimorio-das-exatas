"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/categories";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 left-0 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-surface-800 bg-surface-950 px-4 py-6 lg:block">
      <nav aria-label="Navegação principal">
        <ul className="space-y-2">
          {categories.map((category) => (
            <SidebarCategory
              key={category.slug}
              name={category.name}
              slug={category.slug}
              icon={category.icon}
              subcategories={category.subcategories}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SidebarCategory({
  name,
  slug,
  icon,
  subcategories,
  pathname,
}: {
  name: string;
  slug: string;
  icon: string;
  subcategories: { name: string; slug: string }[];
  pathname: string;
}) {
  const categoryPath = `/formulas/${slug}`;
  const isActive = pathname.startsWith(categoryPath);
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors duration-150 ${
          isActive
            ? "bg-primary-900/40 text-primary-300"
            : "text-surface-50 hover:bg-surface-800"
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true">{icon}</span>
          {name}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="ml-5 mt-1 space-y-0.5 border-l border-surface-800 pl-3">
          {subcategories.map((sub) => {
            const subPath = `/formulas/${slug}/${sub.slug}`;
            const subActive = pathname === subPath;

            return (
              <li key={sub.slug}>
                <Link
                  href={subPath}
                  className={`block rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ${
                    subActive
                      ? "bg-primary-900/30 font-medium text-primary-400"
                      : "text-surface-50/70 hover:bg-surface-800/50 hover:text-surface-50"
                  }`}
                >
                  {sub.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
