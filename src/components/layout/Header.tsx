"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-surface-200 bg-surface-50/80 px-4 backdrop-blur-md dark:border-surface-800 dark:bg-surface-950/80 lg:px-6">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-full text-surface-800 transition-colors hover:bg-surface-200 dark:text-surface-50 dark:hover:bg-surface-800 lg:hidden"
          aria-label="Abrir menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-primary-600 dark:text-primary-400"
        >
          Fórmulas IFPR
        </Link>

        {/* Search — desktop only */}
        <div className="mx-6 hidden max-w-md flex-1 lg:block">
          <Input
            type="search"
            placeholder="Buscar fórmulas..."
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 lg:flex-none" />

        {/* Theme toggle */}
        <ThemeToggle />
      </header>

      {/* Mobile navigation drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
