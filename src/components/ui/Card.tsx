import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({
  children,
  hover = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-sm transition-all duration-300 ${
        hover
          ? "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
