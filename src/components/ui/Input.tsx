import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-surface-800/50 dark:text-surface-50/50">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-full border border-surface-200 bg-surface-50 px-5 py-2.5 text-base text-surface-800 transition-all duration-200 placeholder:text-surface-800/40 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 focus:outline-none dark:border-surface-800 dark:bg-surface-900 dark:text-surface-50 dark:placeholder:text-surface-50/40 dark:focus:border-primary-500 dark:focus:ring-primary-500/30 ${
            icon ? "pl-11" : ""
          } ${className}`}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
