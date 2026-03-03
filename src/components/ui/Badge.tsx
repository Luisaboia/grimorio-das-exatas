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
  fisica: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200",
  matematica:
    "bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-200",
  default:
    "bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-100",
  basico: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  intermediario:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  avancado: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
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
