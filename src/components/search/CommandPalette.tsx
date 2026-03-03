"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { SearchResults } from "./SearchResults";
import type { FormulaFrontmatter } from "@/types/formula";
import { categories } from "@/lib/categories";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FormulaFrontmatter[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const router = useRouter();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input after animation
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Debounced search
  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Navigate to selected result
  const navigateTo = useCallback(
    (path: string) => {
      onClose();
      router.push(path);
    },
    [onClose, router],
  );

  // Total navigable items: results + quick actions (categories)
  const quickActions = categories.map((c) => ({
    label: `${c.icon} ${c.name}`,
    path: `/formulas/${c.slug}`,
  }));

  const showQuickActions = !query.trim();
  const totalItems = showQuickActions ? quickActions.length : results.length;

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      if (showQuickActions) {
        navigateTo(quickActions[selectedIndex].path);
      } else if (results[selectedIndex]) {
        navigateTo(`/formula/${results[selectedIndex].slug}`);
      }
    } else if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      navigateTo(`/busca?q=${encodeURIComponent(query)}`);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-surface-200 bg-surface-50 shadow-2xl dark:border-surface-700 dark:bg-surface-900 animate-[scaleIn_0.15s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
      >
        {/* Search input */}
        <div className="flex items-center border-b border-surface-200 px-4 dark:border-surface-800">
          <svg
            className="mr-3 h-5 w-5 shrink-0 text-surface-800/40 dark:text-surface-50/40"
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
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar fórmulas, conceitos, equações..."
            aria-label="Buscar fórmulas"
            className="flex-1 bg-transparent py-4 text-base text-surface-800 placeholder:text-surface-800/40 focus:outline-none dark:text-surface-50 dark:placeholder:text-surface-50/40"
          />
          <kbd className="ml-2 shrink-0 rounded-md border border-surface-300 bg-surface-100 px-2 py-0.5 text-xs font-medium text-surface-800/60 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-50/60">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-6">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
            </div>
          )}

          {!loading && query.trim() && (
            <SearchResults
              results={results}
              query={query}
              selectedIndex={selectedIndex}
              onSelect={onClose}
            />
          )}

          {/* Quick actions when no query */}
          {!loading && showQuickActions && (
            <div className="p-2">
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-surface-800/40 dark:text-surface-50/40">
                Ações rápidas
              </p>
              <ul>
                {quickActions.map((action, index) => (
                  <li key={action.path}>
                    <button
                      onClick={() => navigateTo(action.path)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-100 hover:bg-surface-100 dark:hover:bg-surface-800 ${
                        selectedIndex === index
                          ? "bg-primary-50 dark:bg-primary-900/30"
                          : ""
                      }`}
                    >
                      <span className="text-surface-800 dark:text-surface-50">
                        {action.label}
                      </span>
                      <span className="ml-auto text-xs text-surface-800/40 dark:text-surface-50/40">
                        Ir para categoria
                      </span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() =>
                      query.trim()
                        ? navigateTo(`/busca?q=${encodeURIComponent(query)}`)
                        : navigateTo("/formulas")
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-surface-800/60 transition-colors duration-100 hover:bg-surface-100 dark:text-surface-50/60 dark:hover:bg-surface-800"
                  >
                    Ver todas as fórmulas →
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-surface-200 px-4 py-2 text-xs text-surface-800/40 dark:border-surface-800 dark:text-surface-50/40">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-surface-300 bg-surface-100 px-1.5 py-0.5 text-[10px] font-medium dark:border-surface-700 dark:bg-surface-800">
              ↑↓
            </kbd>
            navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-surface-300 bg-surface-100 px-1.5 py-0.5 text-[10px] font-medium dark:border-surface-700 dark:bg-surface-800">
              ↵
            </kbd>
            abrir
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-surface-300 bg-surface-100 px-1.5 py-0.5 text-[10px] font-medium dark:border-surface-700 dark:bg-surface-800">
              esc
            </kbd>
            fechar
          </span>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

/**
 * Global keyboard listener wrapper.
 * Renders CommandPalette and listens for Ctrl+K / Cmd+K.
 */
export function CommandPaletteProvider() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
