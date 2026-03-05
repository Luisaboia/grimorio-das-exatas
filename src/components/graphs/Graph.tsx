"use client";

import { Suspense } from "react";
import type { GraphProps } from "./types";
import { graphRegistry } from "./registry";

interface Props extends GraphProps {
  type: string;
}

function GraphFallback() {
  return (
    <div className="my-6 flex h-[300px] items-center justify-center rounded-lg border border-dashed border-surface-800 bg-surface-900/30">
      <p className="text-sm text-surface-200/60">
        🔮 Gráfico em desenvolvimento...
      </p>
    </div>
  );
}

function GraphSkeleton() {
  return (
    <div className="my-6 h-[300px] animate-pulse rounded-lg bg-surface-800/50" />
  );
}

export function Graph({ type, interactive = true }: Props) {
  const LazyComponent = graphRegistry[type];

  if (!LazyComponent) {
    return <GraphFallback />;
  }

  return (
    <Suspense fallback={<GraphSkeleton />}>
      <LazyComponent interactive={interactive} />
    </Suspense>
  );
}
