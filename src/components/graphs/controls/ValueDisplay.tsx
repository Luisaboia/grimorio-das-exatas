"use client";

interface ValueDisplayProps {
  label: string;
  value: number | string;
  color?: string;
  unit?: string;
}

export function ValueDisplay({
  label,
  value,
  unit,
}: ValueDisplayProps) {
  const displayValue = typeof value === "number" ? value.toFixed(2) : value;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-surface-700 bg-surface-800/80 px-2.5 py-1">
      <span className="text-xs text-surface-200/70">{label}</span>
      <span className="font-mono text-xs font-medium text-primary-300">
        {displayValue}
        {unit && <span className="ml-0.5 text-surface-200/60">{unit}</span>}
      </span>
    </div>
  );
}
