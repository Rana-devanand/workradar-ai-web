"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md border border-transparent",
      secondary:
        "bg-surface-container-high text-on-surface hover:bg-surface-variant border border-outline-variant/60 shadow-xs",
      outline:
        "bg-white/80 backdrop-blur-xs text-on-surface border border-outline-variant hover:bg-surface-container-low hover:border-primary/50 text-on-surface shadow-xs",
      ghost:
        "bg-transparent text-secondary hover:text-primary hover:bg-surface-container-low",
      glass:
        "bg-white/80 backdrop-blur-md text-on-surface border border-white/60 shadow-sm hover:bg-white/95 hover:border-outline-variant",
      danger:
        "bg-error text-white shadow-sm hover:opacity-90",
    };

    const sizeStyles = {
      sm: "text-xs font-semibold px-3 py-1.5 gap-1.5 tracking-wide",
      md: "text-sm font-semibold px-4 py-2.5 gap-2",
      lg: "text-base font-semibold px-6 py-3.5 gap-2.5 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

