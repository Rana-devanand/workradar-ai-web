import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "success" | "warning" | "error" | "neutral" | "glow" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  size = "md",
  dot = false,
  pulse = false,
  icon,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-primary-fixed text-on-primary-fixed border-primary/20",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-error-container text-on-error-container border-error/20",
    neutral: "bg-surface-container-high text-on-surface-variant border-outline-variant/50",
    glow: "bg-white/90 text-primary border-primary/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]",
    outline: "bg-transparent text-secondary border-outline-variant",
  };

  const dotColors = {
    primary: "bg-primary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-error",
    neutral: "bg-secondary",
    glow: "bg-primary",
    outline: "bg-secondary",
  };

  const sizeStyles = {
    sm: "text-[11px] font-medium px-2 py-0.5 gap-1.5",
    md: "text-xs font-semibold px-2.5 py-1 gap-2",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          )}
          <span
            className={cn("relative inline-flex rounded-full h-2 w-2", dotColors[variant])}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};

