"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

interface DemonstrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "deducao" | "historia" | "mista";
  children: ReactNode;
}

const typeConfig = {
  deducao: { icon: "🔍", label: "Dedução", color: "bg-primary-900 text-primary-200" },
  historia: { icon: "📜", label: "História", color: "bg-amber-900 text-amber-200" },
  mista: { icon: "🔍📜", label: "Mista", color: "bg-violet-900 text-violet-200" },
};

export function DemonstrationModal({
  isOpen,
  onClose,
  title,
  type,
  children,
}: DemonstrationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  // Focus trap and escape handler
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Focus the modal
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const config = typeConfig[type];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-16"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

      {/* Modal panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Demonstração: ${title}`}
        className="relative z-10 w-full max-w-4xl rounded-2xl border border-surface-700 bg-surface-950 shadow-2xl animate-[scaleIn_0.2s_ease-out] sm:my-8"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between rounded-t-2xl border-b border-surface-800 bg-surface-950/95 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl" aria-hidden="true">{config.icon}</span>
            <h2 className="truncate text-lg font-bold text-surface-50">{title}</h2>
            <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
              {config.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 rounded-lg p-2 text-surface-50/60 transition-colors hover:bg-surface-800 hover:text-surface-50"
            aria-label="Fechar demonstração"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable content */}
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <div className="mdx-content">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-surface-800 px-6 py-4 text-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-surface-800 px-6 py-2 text-sm font-medium text-surface-50 transition-colors hover:bg-surface-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
