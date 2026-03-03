"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { CommandPalette } from "@/components/search/CommandPalette";

export function HeroSearch() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <SearchBar
        onOpenPalette={() => setPaletteOpen(true)}
        size="large"
      />
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
