"use client";

import "katex/dist/katex.min.css";

import { useCallback, useState } from "react";
import { BlockMath } from "react-katex";

interface FormulaBlockProps {
  math: string;
  label?: string;
}

export function FormulaBlock({ math, label }: FormulaBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(math);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = math;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [math]);

  return (
    <div className="relative my-6 rounded-lg border-l-4 border-primary-500 bg-primary-50 px-6 py-5 dark:bg-primary-950/40">
      {label && (
        <p className="mb-3 text-sm font-semibold text-primary-700 dark:text-primary-300">
          {label}
        </p>
      )}

      <div className="flex items-center justify-center py-2 text-xl">
        <BlockMath math={math} />
      </div>

      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 cursor-pointer rounded-md border border-primary-200 bg-white/80 px-2.5 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-100 dark:border-primary-800 dark:bg-surface-900/80 dark:text-primary-400 dark:hover:bg-primary-900/60"
        title="Copiar LaTeX"
      >
        {copied ? "Copiado!" : "Copiar LaTeX"}
      </button>
    </div>
  );
}
