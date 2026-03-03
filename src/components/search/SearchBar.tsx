"use client";

import { useCallback } from "react";

interface SearchBarProps {
  onOpenPalette: () => void;
  className?: string;
  size?: "default" | "large";
}

export function SearchBar({
  onOpenPalette,
  className = "",
  size = "default",
}: SearchBarProps) {
  const handleClick = useCallback(() => {
    onOpenPalette();
  }, [onOpenPalette]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpenPalette();
      }
    },
    [onOpenPalette],
  );

  const isLarge = size === "large";

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex w-full items-center rounded-full border border-surface-200 bg-surface-50 text-left transition-all duration-200 hover:border-primary-400 hover:ring-2 hover:ring-primary-400/30 border-surface-800 bg-surface-900 hover:border-primary-500 hover:ring-primary-500/30 ${
        isLarge ? "px-5 py-3.5" : "px-4 py-2.5"
      } ${className}`}
      aria-label="Buscar fórmulas (Ctrl+K)"
    >
      <svg
        className={`shrink-0 text-surface-50/50 ${
          isLarge ? "mr-3 h-5 w-5" : "mr-3 h-4 w-4"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span
        className={`flex-1 text-surface-50/40 ${
          isLarge ? "text-lg" : "text-base"
        }`}
      >
        Buscar fórmulas...
      </span>
      <kbd className="ml-2 hidden shrink-0 items-center gap-0.5 rounded-md border border-surface-300 bg-surface-100 px-2 py-0.5 text-xs font-medium text-surface-800/50 border-surface-700 bg-surface-800 text-surface-50/50 sm:flex">
        Ctrl+K
      </kbd>
    </button>
  );
}
