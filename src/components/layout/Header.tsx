"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { CommandPalette } from "@/components/search/CommandPalette";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-surface-800 bg-surface-950/80 px-4 backdrop-blur-md lg:px-6">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-full text-surface-50 transition-colors hover:bg-surface-800 lg:hidden"
          aria-label="Abrir menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-primary-400"
        >
          Grimório das Exatas
        </Link>

        {/* Search — desktop only */}
        <div className="mx-6 hidden max-w-md flex-1 lg:block">
          <SearchBar onOpenPalette={openPalette} />
        </div>

        {/* Spacer */}
        <div className="flex-1 lg:flex-none" />
      </header>

      {/* Mobile navigation drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} onOpenSearch={openPalette} />

      {/* Command palette (header-triggered) */}
      <CommandPalette isOpen={paletteOpen} onClose={closePalette} />
    </>
  );
}
