import type { ReactNode } from "react";

type BadgeVariant =
  | "fisica"
  | "matematica"
  | "default"
  | "basico"
  | "intermediario"
  | "avancado";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  fisica: "bg-primary-900 text-primary-200",
  matematica: "bg-secondary-900 text-secondary-200",
  default: "bg-surface-800 text-surface-100",
  basico: "bg-green-900 text-green-200",
  intermediario: "bg-yellow-900 text-yellow-200",
  avancado: "bg-red-900 text-red-200",
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
