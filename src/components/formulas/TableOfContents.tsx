"use client";

import { useEffect, useState } from "react";

export interface Heading {
  text: string;
  level: number;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Sumário">
      <div className="sticky top-24">
        <h4 className="mb-3 text-sm font-semibold text-surface-800 text-surface-50">
          Nesta página
        </h4>
        <ul className="space-y-2 border-l-2 border-surface-200 border-surface-700">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`-ml-[2px] block border-l-2 text-sm transition-colors ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "border-primary-500 text-primary-600 text-primary-400"
                    : "border-transparent text-surface-800/60 hover:text-surface-800 text-surface-50/60 hover:text-surface-50"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
