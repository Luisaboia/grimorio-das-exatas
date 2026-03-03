"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/categories";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-surface-950 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Menu de navegação"
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-surface-800 px-4">
          <Link href="/" className="text-lg font-bold text-primary-400" onClick={onClose}>
            Grimório das Exatas
          </Link>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-surface-50 transition-colors hover:bg-surface-800"
            aria-label="Fechar menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-surface-800 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch?.();
            }}
            className="flex w-full items-center gap-3 rounded-full border border-surface-800 bg-surface-900 px-4 py-2.5 text-left text-sm text-surface-50/40 transition-colors hover:border-primary-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar fórmulas...
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Navegação mobile">
          <ul className="space-y-2">
            {categories.map((category) => (
              <MobileCategory
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
      </div>
    </>
  );
}

function MobileCategory({
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
