import type { ReactNode } from "react";

interface ExampleProps {
  title?: string;
  children: ReactNode;
}

export function Example({ title = "Exemplo", children }: ExampleProps) {
  return (
    <div className="my-6 rounded-lg border border-accent-200 bg-accent-50/50 p-5 border-accent-500/20 bg-accent-500/5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">📝</span>
        <h4 className="text-sm font-bold text-accent-500 text-accent-400">
          {title}
        </h4>
      </div>

      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
