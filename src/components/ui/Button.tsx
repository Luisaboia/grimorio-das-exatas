import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent text-surface-800 hover:bg-surface-100 text-surface-50 hover:bg-surface-800",
  outline:
    "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 text-primary-400 hover:bg-primary-950",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-7 py-3.5 text-lg rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:outline-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus:ring-offset-surface-950 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
